import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../reducers/cartReducer";

const PostTemplate = ({ post, user, cart, addItemToCart }) => {
    const addToCart = event => {
        event.preventDefault();
        let checkForItem;
        if (cart !== null) {
            checkForItem = props.cart.find(i => i._id === post._id);
        }
        if (checkForItem) {
            return;
        }
        addItemToCart(post);
    };

    return (
        <div className="col-md 4">
            <div className="card" style={{ marginTop: "1rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle" style={{ color: "#42b883" }}>
                        {post.price}
                    </h6>
                    <p className="card-text" style={{ paddingBottom: "1rem" }}>
                        {p.description.slice(0, 250)}
                    </p>
                    {user && (
                        <Link className="card-link" onClick={addToCart}></Link>
                    )}
                    <Link
                        to={`/community/post/${post._id}`}
                        className="card-link"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        cart: state.cart
    };
};

export default connect(
    mapStateToProps,
    { addItemToCart }
)(PostTemplate);
