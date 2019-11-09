import React, { useState, useEffect } from "react";
import userService from "../../services/user";
import { connect } from "react-redux";

const Signup = props => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [startedPassword, setStartedPassword] = useState(false);
    const [allFields, setAllFields] = useState(false);

    useEffect(() => {
        if (
            email !== "" &&
            username !== "" &&
            password !== "" &&
            confirm !== "" &&
            allFields === false
        ) {
            setAllFields(true);
        }
    }, []);

    if (props.user !== null) {
        return null;
    }

    const handleSignup = event => {
        event.preventDefault();
        if (
            email === "" ||
            username === "" ||
            confirm === "" ||
            password === ""
        ) {
            return null;
        }

        const credentials = {
            email,
            username,
            password
        };
        if (password === confirm) {
            userService.makeNewUser(credentials);
        }
    };

    const handleChange = event => {
        event.preventDefault();
        setPassword(event.target.value);
        if (startedPassword === false) {
            setStartedPassword(true);
        }
    };

    return (
        <div className="text-center container">
            <form onSubmit={handleSignup} className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal animate-fade-in">
                    Signup
                </h1>
                <div className="form-group animated-text-right">
                    <input
                        style={{ width: "50%", display: "inline-block" }}
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div className="form-group animated-text-left">
                    <input
                        style={{ width: "50%", display: "inline-block" }}
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="form-group animated-text-right">
                    <input
                        style={{ width: "50%", display: "inline-block" }}
                        type="password"
                        className="form-control animate-text-right  "
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handleChange}
                    />
                    {startedPassword &&
                        (!/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/.test(
                            password
                        ) && (
                            <small className="form-text ">
                                Minimum eight characters, at least one letter,
                                one number and one special character
                            </small>
                        ))}
                </div>
                <div className="form-group animated-text-left">
                    <input
                        style={{ width: "50%", display: "inline-block" }}
                        type="password"
                        className="form-control animate-text-left"
                        placeholder="Confirm Password"
                        required
                        value={confirm}
                        onChange={({ target }) => setConfirm(target.value)}
                    />
                </div>
                <div>
                    <button
                        style={{ width: "50%" }}
                        className="button button-animated button-pink"
                        type="submit"
                    >
                        Signup
                    </button>
                </div>
                <p className="mt-5 mb-3 text-muted animate-fade-in">
                    &copy;2019 Benelov Software
                </p>
            </form>
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
)(Signup);
