import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initMainPosts } from "../../../reducers/mainReducer";
import "../../../utils/loadingBar.css";
import Loading from "../../Loading";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../../reducers/cartReducer";
import { setNotification } from "../../../reducers/notificationReducer";
import Pagination from "../Pagination";

const MainPosts = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountInPage] = useState(3);
  useEffect(() => {
    if (props.mainPost === null) {
      props.initMainPosts(String(currentPage));
    }
  }, [props]);

  if (props.mainPost === null) {
    return <Loading />;
  }

  const addToCart = toAdd => {
    let checkForItem;
    if (props.cart !== null) {
      checkForItem = props.cart.find(i => i._id === toAdd._id);
    }
    if (checkForItem) {
      props.setNotification("Already in cart", "error", 2);
    }
    props.addItemToCart(toAdd);
    props.setNotification("Item added to cart", "success", 2);
  };

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = props.mainPost.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderPosts = currentPosts.map(p => (
    <div key={p._id} className="col-md 4">
      <div className="card" style={{ marginTop: "1em" }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: "green" }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: "1rem" }}>
            {p.description.slice(0, 250)}
          </p>
          {props.user && (
            <Link className="card-link" onClick={() => addToCart(p)}>
              Add to cart
            </Link>
          )}

          <Link to={`/official/post/${p._id}`} className="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <hr />
      {renderPosts.length === 0 ? (
        <div className="text-center">
          <p>No items have been posted</p>
        </div>
      ) : (
        renderPosts
      )}
      <hr />
      <div className="container" style={{ paddingTop: "1rem" }}>
        <Pagination
          amountInPage={amountInPage}
          totalPosts={props.mainPost.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mainPost: state.mainPosts,
    cart: state.cart,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts, addItemToCart, setNotification }
)(MainPosts);
