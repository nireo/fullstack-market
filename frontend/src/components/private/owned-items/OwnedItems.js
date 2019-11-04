import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const OwnedItems = ({ user }) => {
    const [viewContent, setViewContent] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded && allItems === []) {
            setLoaded(true);
            setAllItems(user.communityItemsBought.concat(user.mainItemsBought));
        }
    }, [user]);

    if (!user) {
        return null;
    }

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
                        onClick={() => setViewContent(i)}
                    >
                        View Content
                    </button>
                </div>
            ))}
            <div className="mt-5">
                <div className="text-center">
                    {!viewContent ? (
                        <p>No content selected</p>
                    ) : (
                        <div>
                            <p>{viewContent.content}</p>
                            <button
                                className="btn btn-outline-danger mt-2"
                                onClick={() => setViewContent(null)}
                            >
                                Hide content
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    null
)(OwnedItems);
