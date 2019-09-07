import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItemToCart } from '../../../reducers/cartReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import { initMainPosts } from '../../../reducers/mainReducer';
import ReviewForm from '../../private/ReviewForm';
import { addReview } from '../../../reducers/mainReducer';
import Review from '../Review';
import Loading from '../../Loading';

const SingleMainPost = props => {
  const [post, setPost] = useState(null);
  const [stars, setStars] = useState(0.0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  useEffect(() => {
    if (props.posts === null) {
      props.initMainPosts();
    }
    if (props.posts && post === null) {
      setPost(props.posts.find(p => p._id === props.id));
    }
  }, [props, post]);
  if (props.posts === null) {
    return <Loading />;
  }

  if (post === null) {
    return (
      <div class="container">
        <h3>Post has not been found</h3>
      </div>
    );
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
      props.addReview(post._id, review);
      clearFields();
    } catch {
      props.setNotification('Already in cart', 'error', 4);
      clearFields();
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1>{post.title}</h1>
      <h3 style={{ color: 'green' }}>{post.price} $</h3>
      <p>{post.description}</p>
      <Link onClick={() => addToCart(post)}>Add to cart</Link>
      <h3 style={{ paddingTop: '2rem' }}>Reviews</h3>
      {props.user &&
        (showReviewForm === false ? (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn btn-outline-primary"
          >
            Create review
          </button>
        ) : (
          <div>
            <ReviewForm
              stars={stars}
              setStars={setStars}
              content={content}
              setContent={setContent}
              title={title}
              setTitle={setTitle}
              addReview={addReview}
              recommended={recommended}
              setRecommended={setRecommended}
            />
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowReviewForm(false)}
            >
              Hide review form
            </button>
          </div>
        ))}
      <div style={{ paddingTop: '2rem' }}>
        {post.reviews.map(r => (
          <Review review={r} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    posts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { addItemToCart, setNotification, addReview, initMainPosts }
)(SingleMainPost);
