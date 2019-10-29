import React, { useState } from "react";
import { connect } from "react-redux";
import { searchForItem } from "../../../reducers/searchReducer";
import { setNotification } from "../../../reducers/notificationReducer";

const Search = ({ searchForItem, setNotification }) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = event => {
        event.preventDefault();
        try {
            searchForItem(search);
        } catch {
            setNotification("Something went wrong with the search", "error", 2);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <div className="form-row align-items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                        className="form-control"
                        placeholder="Search"
                    />
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        search: state.search
    };
};

export default connect(
    mapStateToProps,
    { searchForItem, setNotification }
)(Search);
