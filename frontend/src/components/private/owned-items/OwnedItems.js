import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../Modal";

const OwnedItems = ({ user }) => {
    const [viewContent, setViewContent] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!loaded && allItems === []) {
            setLoaded(true);
            setAllItems(user.communityItemsBought.concat(user.mainItemsBought));
        }
    }, [user, allItems, loaded]);

    if (!user) {
        return null;
    }

    const handleClose = event => {
        event.preventDefault();

        setShowModal(false);
        setViewContent(null);
    };

    return (
        <div className="container">
            <h2>Owned community items</h2>
            {user.communityItemsBought.map(i => (
                <div
                    className="box col-12 col-md-12 col-lg-12 mb-3"
                    style={{
                        marginTop: "0.25rem",
                        marginLeft: "0.25rem",
                        marginRight: "0.25rem"
                    }}
                    key={i._id}
                >
                    <h6
                        style={{
                            width: "100%",
                            paddingTop: "0.5rem",
                            paddingLeft: "0.5rem",
                            color: "#2196f3"
                        }}
                        className="d-flex position-relative"
                    >
                        {i.title}
                    </h6>
                    <p
                        style={{
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem"
                        }}
                    >
                        {i.description.slice(0, 50)}
                    </p>
                    <button
                        className="button-blue size-small"
                        style={{
                            border: "none",
                            padding: "2px 4px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            borderRadius: "5px",
                            marginBottom: "0.25rem"
                        }}
                        onClick={() => {
                            setShowModal(true);
                            setViewContent(i);
                        }}
                    >
                        View Content
                    </button>
                </div>
            ))}
            {viewContent && (
                <Modal show={showModal} handleClose={handleClose}>
                    <div className="container">
                        <h4>{viewContent.title}</h4>
                        <p>{viewContent.content}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(OwnedItems);
