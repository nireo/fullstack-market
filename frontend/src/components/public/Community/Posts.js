import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { initPosts } from '../../../reducers/postReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import { addItemToCart } from '../../../reducers/cartReducer';
import Loading from '../../Loading';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const Posts = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountInPage] = useState(3);
  const [allPostAmount, setAllPostAmount] = useState(0);
  const [pagesWithContent, setPagesWithContent] = useState([]);

  useEffect(() => {
    if (props.posts === null || !pagesWithContent.includes(currentPage)) {
      props.initPosts(String(currentPage));
      setPagesWithContent(pagesWithContent.concat(currentPage));
    }

    if (allPostAmount == 0) {
      axios
        .get('/api/post/amount/all')
        .then(response => {
          setAllPostAmount(response.data.count);
        })
        .catch(() => {
          props.setNotification('Problem with loading posts', 'error', 3);
        });
    }
  }, [props, currentPage]);

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

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = props.posts.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderPosts = currentPosts.map(p => (
    <div key={p._id} className="col-md 4">
      <div className="card box" style={{ marginTop: '1em' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 250)}
          </p>
          {props.user && (
            <button
              className="tutorial-button button-pink"
              onClick={() => addToCart(p)}
              style={{ marginTop: '0' }}
            >
              Add to cart
            </button>
          )}
          <Link to={`/community/post/${p._id}`}>
            <button
              style={{ marginTop: '0', marginLeft: '1rem' }}
              className="tutorial-button button-pink"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community - benevol</title>
      </Helmet>
      {renderPosts.length === 0 ? (
        <div className="text-center">
          <p>No items have been posted</p>
        </div>
      ) : (
        renderPosts
      )}
      <hr />
      <div class="container" style={{ paddingTop: '1rem' }}>
        <Pagination
          amountInPage={amountInPage}
          totalPosts={allPostAmount}
          paginate={paginate}
        />
      </div>
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

export default connect(mapStateToProps, {
  initPosts,
  setNotification,
  addItemToCart
})(Posts);
