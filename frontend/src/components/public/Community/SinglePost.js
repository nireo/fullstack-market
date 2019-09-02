import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotification } from '../../../reducers/notificationReducer';
import { addItemToCart } from '../../../reducers/cartReducer';
import ReviewForm from '../../private/ReviewForm';
import { addReview } from '../../../reducers/postReducer';
import Review from '../Review';

const SinglePost = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(0.0);
  const [recommended, setRecommended] = useState(false);
  if (props.post === null) {
    return null;
  }

  const clearFields = () => {
    setStars(0.0);
    setContent('');
    setTitle('');
  };

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

  const addReviewToPost = review => {
    try {
      props.setNotification('Review has been posted', 'success', 2);
      props.addReview(props.post._id, review);
      clearFields();
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
      clearFields();
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <div className="row">
        <div className="col">
          <h1>{props.post.title}</h1>
          <h3 style={{ color: 'green' }}>{props.post.price} $</h3>
          <p>{props.post.description}</p>
          <Link onClick={() => addToCart(props.post)}>Add to cart</Link>
        </div>
        {!props.type && (
          <div className="col">
            <div className="card" style={{ width: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Posted by</h5>
                <h6 className="card-subtitle">
                  <Link
                    to={`/profile/${props.post.postedBy._id}`}
                    className="text-muted"
                  >
                    {props.post.postedBy.username}
                  </Link>
                </h6>
                <div className="row" style={{ paddingTop: '1rem' }}>
                  <div className="col">
                    <h6 style={{ color: '#4f81c7' }}>Posts</h6>
                    {props.post.postedBy.posts.length}
                  </div>
                  <div className="col">
                    <h6 style={{ color: '#4f81c7' }}>Reviews</h6>
                    {props.post.postedBy.reviewsPosted.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 style={{ paddingTop: '2rem' }}>Reviews</h3>
      {props.user && (
        <ReviewForm
          stars={stars}
          setStars={setStars}
          content={content}
          setContent={setContent}
          title={title}
          setTitle={setTitle}
          addReview={addReviewToPost}
          recommended={recommended}
          setRecommended={setRecommended}
        />
      )}
      <div style={{ paddingTop: '2rem' }}>
        {props.post.reviews.map(r => (
          <Review review={r} />
        ))}
      </div>
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
  { setNotification, addItemToCart, addReview }
)(SinglePost);
