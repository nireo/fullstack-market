import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initPosts } from '../../../reducers/postReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import { addItemToCart } from '../../../reducers/cartReducer';
import Loading from '../../Loading';

const Posts = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts();
    }
  }, []);

  if (props.posts === null) {
    return <Loading />;
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

  const renderPosts = props.posts.map(p => (
    <div class="col-md 4">
      <div class="card" style={{ marginTop: '1em' }}>
        <div class="card-body">
          <h5 class="card-title">{p.title}</h5>
          <h6 class="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p class="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 250)}
          </p>
          <Link class="card-link" onClick={() => addToCart(p)}>
            Add to cart
          </Link>
          <Link to={`/community/post/${p._id}`} class="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      {renderPosts}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    cart: state.cart
  };
};

export default connect(
  mapStateToProps,
  { initPosts, setNotification, addItemToCart }
)(Posts);
