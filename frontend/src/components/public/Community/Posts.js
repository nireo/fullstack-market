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
  }, [props]);

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
    <div key={p._id} className="col-md 4">
      <div className="card" style={{ marginTop: '1em' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 250)}
          </p>
          {props.user && (
            <Link className="card-link" onClick={() => addToCart(p)}>
              Add to cart
            </Link>
          )}
          <Link to={`/community/post/${p._id}`} className="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      {renderPosts}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    cart: state.cart,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { initPosts, setNotification, addItemToCart }
)(Posts);
