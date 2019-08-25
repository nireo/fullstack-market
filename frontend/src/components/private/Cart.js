import React from 'react';
import { connect } from 'react-redux';
import { clearCart, removeItemFromCart } from '../../reducers/cartReducer';
import { setNotification } from '../../reducers/notificationReducer';

const Cart = props => {
  if (props.cart === null) {
    return (
      <div className="container text-center">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  const renderCartItems = props.cart.map(i => (
    <div>
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
      {renderCartItems}
      <hr />
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
