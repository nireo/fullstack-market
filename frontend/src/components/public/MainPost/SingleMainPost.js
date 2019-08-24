import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItemToCart } from '../../../reducers/cartReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import ReviewForm from '../../private/ReviewForm';
import { addReview } from '../../../reducers/mainReducer';

const SingleMainPost = props => {
  const [stars, setStars] = useState(0.0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  if (props.post === null) {
    return null;
  }

  const clearFields = () => {
    setTitle('');
    setStars(0.0);
    setContent('');
  };

  const addToCart = toAdd => {
    let checkForItem;
    if (props.cart !== null) {
      checkForItem = props.cart.find(i => i._id === toAdd._id);
    }
    if (checkForItem) {
      props.setNotification('Already in cart', 'error', 2);
    } else {
      props.addItemToCart(toAdd);
      props.setNotification('Item added to cart', 'success', 2);
    }
  };

  const addReview = review => {
    try {
      props.addReview(props.post._id, review);
      clearFields();
    } catch {
      props.setNotification('Already in cart', 'error', 4);
      clearFields();
    }
  };

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      <h1>{props.post.title}</h1>
      <h3 style={{ color: 'green' }}>{props.post.price} $</h3>
      <p>{props.post.description}</p>
      <Link onClick={() => addToCart(props.post)}>Add to cart</Link>
      <h3 style={{ paddingTop: '2rem' }}>Reviews</h3>
      {props.user && (
        <ReviewForm
          stars={stars}
          setStars={setStars}
          content={content}
          setContent={setContent}
          title={title}
          setTitle={setTitle}
          addReview={addReview}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { addItemToCart, setNotification, addReview }
)(SingleMainPost);
