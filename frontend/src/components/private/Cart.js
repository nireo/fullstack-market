import React from 'react';
import { connect } from 'react-redux';
import { clearCart, removeItemFromCart } from '../../reducers/cartReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { Link } from 'react-router-dom';

const Cart = props => {
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

  //const total = props.cart.reduce((a, b) => ({ price: a.price + b.price }));
  const total = props.cart.reduce((acc, obj) => {
    return acc + obj.price;
  }, 0);

  const renderCartItems = props.cart.map(i => (
    <div key={i._id}>
      <hr />
      <div className="row">
        <div className="col-10">
          <h5>{i.title}</h5>
          <p>{i.description}</p>
        </div>
        <div className="col-2">
          <h6 style={{ color: 'green' }}>{i.price}$</h6>
          <button
            onClick={() => props.removeItemFromCart(i._id)}
            className="btn btn-danger"
          >
            Remove item
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container">
      <h2 style={{ paddingBottom: '2em' }}>Your cart</h2>
      <h5>Items in cart: {props.cart.length}</h5>
      {renderCartItems}
      <hr />
      <div>
        <h5>Your total is: {total} $</h5>
      </div>
      <button onClick={props.clearCart} className="btn btn-danger">
        Clear cart
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(
  mapStateToProps,
  { clearCart, setNotification, removeItemFromCart }
)(Cart);
