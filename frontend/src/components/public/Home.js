import React from "react";
import Welcome from "./Welcome";
import About from "./About";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
      <div>
        <Welcome />
      </div>
      <div style={{ paddingTop: "4rem" }}>
        <About />
      </div>
      <div style={{ paddingTop: "3rem" }}>
        <HowItWorks />
      </div>
    </div>
  );
};

export default Home;
