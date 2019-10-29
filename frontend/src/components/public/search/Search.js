import React, { useState } from "react";
import { connect } from "react-redux";
import { searchForItem } from "../../../reducers/searchReducer";
import { setNotification } from "../../../reducers/notificationReducer";
import Loading from "../../Loading";

const Search = ({ items, searchForItem, setNotification }) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = event => {
        event.preventDefault();
        setLoading(true);
        try {
            searchForItem(search);
            setLoading(false);
        } catch {
            setNotification("Something went wrong with the search", "error", 2);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSearch} style={{ marginTop: "1rem" }}>
                <div className="search">
                    <input
                        type="text"
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                        placeholder="Search"
                    />
                    <button style={{ marginTop: "1rem" }} type="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
            <div style={{ marginTop: "2rem" }}>
                {items.map(i => (
                    <div
                        key={i._id}
                        className="card"
                        style={{ marginTop: "0.5rem " }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <p className="card-text">
                                {i.description.slice(0, 50)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        items: state.search
    };
};

export default connect(
    mapStateToProps,
    { searchForItem, setNotification }
)(Search);
