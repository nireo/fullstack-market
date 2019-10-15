import React from "react";
import ExploreCommunity from "./explore-page/ExploreCommunity";
import ExploreOfficial from "./explore-page/ExploreOfficial";

const Explore = () => {
  return (
    <div>
      <div className="jumbotron">
        <div className="text-center">
          <h2>Explore</h2>
          <p>
            From this page you can explore official and community postings and
            also other statistics.
          </p>
        </div>
      </div>
      <div className="container">
        <ExploreOfficial />
        <ExploreCommunity />
      </div>
    </div>
  );
};

export default Explore;
