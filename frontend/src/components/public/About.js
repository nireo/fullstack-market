import React from 'react';
import image1 from '../../images/home/home-image-1.png';

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h2>What is Benelov market</h2>
          <p style={{ fontSize: '1.25rem' }}>
            Benelov market is a marketplace for selling virtual items, from PDFs
            to game items. This site consists of an official tab, which contains
            products from the creators of Benelov market. Also a community tab
            for selling and buying items from fellow community members.
          </p>
        </div>
        <div className="col-md-3">
          <img src={image1} alt="desktop-logo"></img>
        </div>
      </div>
    </div>
  );
};

export default About;
