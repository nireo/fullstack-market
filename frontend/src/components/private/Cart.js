import React from 'react';
import { connect } from 'react-redux';

const Cart = props => {
  if (props.cart === null) {
    return (
      <div class="container text-center">
        <h2>Your cart is empty</h2>
      </div>
    );
  }
  console.log(props.cart);
  const renderCartItems = props.cart.map(i => (
    <div>
      <hr />
      <h5>{i.title}</h5>
      <h6>{i.price}</h6>
      <p>{i.description}</p>
    </div>
  ));
  return (
    <div class="container">
      <h2 style={{ paddingBottom: '2em' }}>Your cart</h2>
      {renderCartItems}
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
  null
)(Cart);
