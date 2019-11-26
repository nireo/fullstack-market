import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer footer-animation">
            <div
                className="container"
                style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
            >
                <a
                    href="https://github.com/nireo/fullstack-market"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: "none",
                        color: "black",
                        paddingRight: "1rem",
                        fontFamily: "Montserrat, sans-serif",
                        weight: 900
                    }}
                >
                    github
                </a>
                <a
                    href="https://discordapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Montserrat, sans-serif",
                        weight: 900
                    }}
                >
                    discord
                </a>
                <div style={{ float: "right" }}>
                    <Link
                        to="/contact"
                        style={{
                            textDecoration: "none",
                            color: "black",
                            fontFamily: "Montserrat, sans-serif",
                            weight: 900
                        }}
                    >
                        contact
                    </Link>
                    <a
                        href="https://github.com/nireo"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: "none",
                            color: "black",
                            paddingLeft: "1rem",
                            fontFamily: "Montserrat, sans-serif",
                            weight: 900
                        }}
                    >
                        <strong>creator</strong>
                    </a>
                </div>
            </div>
        </footer>
    );
};
