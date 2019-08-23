import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItemToCart } from '../../../reducers/cartReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import ReviewForm from '../../private/ReviewForm';

const SingleMainPost = props => {
  if (props.post === null) {
    return null;
  }

  const addToCart = toAdd => {
    let checkForItem;
    if (props.cart !== null) {
      checkForItem = props.cart.find(i => i._id === toAdd._id);
    }
    if (checkForItem) {
      props.setNotification('Already in cart', 'error', 2);
    }
    props.addItemToCart(toAdd);
    props.setNotification('Item added to cart', 'success', 2);
  };

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      <h1>{props.post.title}</h1>
      <h3 style={{ color: 'green' }}>{props.post.price} $</h3>
      <p>{props.post.description}</p>
      <Link onClick={() => addToCart(props.post)}>Add to cart</Link>
      <ReviewForm />
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
  { addItemToCart, setNotification }
)(SingleMainPost);
