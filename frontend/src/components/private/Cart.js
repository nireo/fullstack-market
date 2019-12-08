import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearCart, removeItemFromCart } from '../../reducers/cartReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import userService from '../../services/user';
import { setUserInfo } from '../../reducers/userReducer';
import { Helmet } from 'react-helmet';

const Cart = props => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (props.cart !== null) {
      setTotal(
        props.cart.reduce((acc, obj) => {
          return acc + obj.price;
        }, 0)
      );
    }
  }, [props]);
  if (props.cart === null || props.cart === []) {
    return (
      <div className="container">
        <h2>Your cart</h2>
        <p>
          Your cart is empty, you can add items from the{' '}
          <Link to="/community">community</Link> page or the{' '}
          <Link to="/official">official</Link> page
        </p>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (props.cart.length === 0) {
      return null;
    }
    let objectToSend = {
      ids: []
    };
    props.cart.forEach(i => {
      objectToSend.ids = objectToSend.ids.concat(i._id);
    });
    try {
      const newInfo = await userService.buyCommunityItems(objectToSend);
      if (!newInfo) {
        return null;
      }
      props.setUserInfo(newInfo);
      props.setNotification(
        'Purchase has been completed successfully',
        'success',
        2
      );
    } catch {
      props.setNotification('Something went while adding post', 'error', 2);
    }
  };

  const handleSinglePurchase = async id => {
    if (!id || props.cart.length === 0) {
      return null;
    }
    try {
      const objectToSend = {
        ids: [id]
      };
      // store return in a variable so that we can update the users owned items
      const newInfo = await userService.buyCommunityItems(objectToSend);
      if (!newInfo) {
        return null;
      }
      props.setNotification(
        'Purchase has been completed successfully',
        'success',
        2
      );
      props.removeItemFromCart(id);
      props.setUserInfo(newInfo);
    } catch {
      props.setNotification(
        'Something went wrong while processing',
        'error',
        2
      );
    }
  };

  const renderCartItems = props.cart.map(i => (
    <div key={i._id}>
      <hr />
      <div className="row">
        <div className="col-9">
          <h5>{i.title}</h5>
          <p>{i.description}</p>
        </div>
        <div className="col-3">
          <h6 style={{ color: 'green' }}>
            <strong>{i.price} $</strong>{' '}
          </h6>
          <div>
            <button
              onClick={() => handleSinglePurchase(i._id)}
              className="btn btn-outline-success"
            >
              Buy
            </button>
            {'  '}
            <button
              onClick={() => props.removeItemFromCart(i._id)}
              className="btn btn-outline-danger"
            >
              Remove item
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart - benevol</title>
      </Helmet>
      <h2 style={{ paddingBottom: '2em' }}>Your cart</h2>
      <h5>Items in cart: {props.cart.length}</h5>
      {renderCartItems}
      <hr />
      <div>
        <h5>Your total is: {total} $</h5>
      </div>
      <div>
        <button
          className="btn btn-outline-success"
          onClick={() => handlePurchase}
        >
          Buy items
        </button>{' '}
        <button onClick={props.clearCart} className="btn btn-outline-danger">
          Clear cart
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, {
  clearCart,
  setNotification,
  removeItemFromCart,
  setUserInfo
})(Cart);
