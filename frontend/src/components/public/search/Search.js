import React, { useState } from "react";
import { connect } from "react-redux";
import { searchForItem, clearSearch } from "../../../reducers/searchReducer";
import { setNotification } from "../../../reducers/notificationReducer";
import Loading from "../../Loading";
import { Link } from "react-router-dom";

const Search = ({ items, searchForItem, setNotification, clearSearch }) => {
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

    const clearResults = event => {
        event.preventDefault();
        clearSearch();
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
                {items.length > 0 &&
                    items.map(i => (
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
                                <Link to={`/post/${i._id}`}>
                                    <button className="btn btn-primary">
                                        Read more
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                {loading && <Loading />}
            </div>
            {items.length > 0 && (
                <button onClick={clearResults} className="btn btn-primary">
                    Clear results
                </button>
            )}
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
    { searchForItem, setNotification, clearSearch }
)(Search);
