import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotification } from '../../../reducers/notificationReducer';
import { addItemToCart } from '../../../reducers/cartReducer';
import ReviewForm from '../../private/ReviewForm';
import { addReview } from '../../../reducers/postReducer';
import Review from '../Review';
import Pagination from '../Pagination';
import Markdown from 'markdown-to-jsx';
import { Helmet } from 'react-helmet';
import userService from '../../../services/user';
import ReactTooltip from 'react-tooltip';

const SinglePost = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(0.0);
  const [recommended, setRecommended] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountInPage] = useState(3);
  const [userOwns, setUserOwns] = useState(false);
  const [checked, setCheck] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(null);
  const [alreadyWish, setAlreadyWish] = useState(null);

  useEffect(() => {
    if (props.post !== null && props.user !== null) {
      if (userOwns === false && checked === false) {
        if (props.user.communityItemsBought === undefined) {
          props.user.communityItemsBought = [];
        }
        const ownedItem = props.user.communityItemsBought.find(
          p => p._id === props.post._id
        );
        setCheck(true);
        if (ownedItem) {
          setUserOwns(true);
        }
      }
    }

    if (alreadyInCart === null && props.user !== null) {
      const found = props.cart.find(item => item._id === props.post._id);
      if (found) {
        setAlreadyInCart(true);
      } else {
        setAlreadyInCart(false);
      }
    }

    if (props.user !== null && alreadyWish === null) {
      const found = props.user.wishlist.map(p => p._id === props.post._id);
      if (found) {
        setAlreadyWish(true);
      } else {
        setAlreadyWish(false);
      }
    }
  }, [checked, props, userOwns]);

  if (props.post === null) {
    return <Redirect to="/community" />;
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

  const addToWishList = async id => {
    try {
      await userService.addItemToWishlist(id);
      props.setNotification('Item has been added wishlist', 'success', 2);
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
  };

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentReviews = props.post.reviews.slice(
    firstPostIndex,
    lastPostIndex
  );
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Post - benevol</title>
      </Helmet>
      <ReactTooltip />
      <div className="row">
        <div className="col">
          <h1>{props.post.title}</h1>
          <h3 style={{ color: 'green' }}>{props.post.price} $</h3>
          <div style={{ marginBottom: '3rem' }}>
            <Markdown>{props.post.description}</Markdown>
          </div>
          {props.user ? (
            <div>
              {alreadyInCart === null || alreadyInCart ? (
                <button
                  className={`tutorial-button ${
                    alreadyInCart === false || alreadyInCart === null
                      ? 'button-pink'
                      : ''
                  }`}
                  style={{ marginRight: '1rem' }}
                  disabled={true}
                  data-tip="Already in cart"
                >
                  Add to cart
                </button>
              ) : (
                <button
                  className={`tutorial-button ${
                    alreadyInCart === false || alreadyInCart === null
                      ? 'button-pink'
                      : ''
                  }`}
                  style={{ marginRight: '1rem' }}
                  onClick={() => addToCart(props.post)}
                  disabled={alreadyInCart === null || alreadyInCart}
                  data-tip="Add to cart"
                >
                  Add to cart
                </button>
              )}
              {alreadyWish === null || alreadyWish ? (
                <button
                  className={`tutorial-button ${
                    alreadyWish === false || alreadyWish === null
                      ? 'button-pink'
                      : ''
                  }`}
                  disabled={true}
                  data-tip="Already in your wishlist"
                >
                  Add to wishlist
                </button>
              ) : (
                <button
                  className={`tutorial-button ${
                    alreadyWish === false || alreadyWish === null
                      ? 'button-pink'
                      : ''
                  }`}
                  disabled={alreadyWish === null || alreadyWish}
                  onClick={() => addToWishList(props.post._id)}
                >
                  Add to wishlist
                </button>
              )}
            </div>
          ) : (
            <p>
              <strong>You need to be logged in to buy</strong>
            </p>
          )}
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
      {props.user &&
        userOwns &&
        (showReviewForm === false ? (
          <button
            onClick={() => setShowReviewForm(true)}
            className="tutorial-button button-pink"
            style={{ marginTop: '0' }}
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
              addReview={addReviewToPost}
              recommended={recommended}
              setRecommended={setRecommended}
            />
            <button
              className="btn btn-outline-danger mt-2"
              onClick={() => setShowReviewForm(false)}
            >
              Hide review form
            </button>
          </div>
        ))}
      <hr />
      <div style={{ paddingTop: '2rem' }}>
        {props.post.reviews.length < 1 ? (
          <p>No reviews posted.</p>
        ) : (
          currentReviews.map(r => <Review review={r} />)
        )}
      </div>
      <div class="container" style={{ paddingTop: '1rem' }}>
        {props.post.reviews.length < 1 ? (
          <div></div>
        ) : (
          <Pagination
            amountInPage={amountInPage}
            totalPosts={props.post.reviews.length}
            paginate={paginate}
          />
        )}
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

export default connect(mapStateToProps, {
  setNotification,
  addItemToCart,
  addReview
})(SinglePost);
