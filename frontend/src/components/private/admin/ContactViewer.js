import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setNotification } from "../../../reducers/notificationReducer";

// don't really want to make a new reducer for a feature this small.
const ContactsViewer = ({ user }) => {
    const [messages, setMessages] = useState([]);

    const getConfig = () => ({
        header: { Authorization: user.token }
    });

    useEffect(() => {
        if (messages.length === 0) {
            axios
                .get("/api/contacts", getConfig())
                .then(response => {
                    setMessages(response.data);
                    console.log(response.data);
                })
                .catch(() => {
                    setNotification(
                        "Problem with loading messages",
                        "error",
                        3
                    );
                });
        }
    }, [messages, setMessages]);
    return <div></div>;
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ContactsViewer);
