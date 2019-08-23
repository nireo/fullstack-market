import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotification } from '../../../reducers/notificationReducer';
import { addItemToCart } from '../../../reducers/cartReducer';

const SinglePost = props => {
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
      <div class="row">
        <div class="col">
          <h1>{props.post.title}</h1>
          <h3 style={{ color: 'green' }}>{props.post.price} $</h3>
          <p>{props.post.description}</p>
          <Link onClick={() => addToCart(props.post)}>Add to cart</Link>
        </div>
        {!props.type && (
          <div class="col">
            <div class="card" style={{ width: '15rem' }}>
              <div class="card-body">
                <h5 class="card-title">Posted by</h5>
                <h6 class="card-subtitle">
                  <Link
                    to={`/profile/${props.post.postedBy._id}`}
                    class="text-muted"
                  >
                    {props.post.postedBy.username}
                  </Link>
                </h6>
                <div class="row" style={{ paddingTop: '1rem' }}>
                  <div class="col">
                    <h6 style={{ color: '#4f81c7' }}>Posts</h6>
                    {props.post.postedBy.posts.length}
                  </div>
                  <div class="col">
                    <h6 style={{ color: '#4f81c7' }}>Reviews</h6>
                    {props.post.postedBy.reviewsPosted.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
  { setNotification, addItemToCart }
)(SinglePost);
