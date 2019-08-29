import React from 'react';
import image2 from '../../images/home/home-image-2.png';

const HowItWorks = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <img src={image2} alt="howitworks-img"></img>
        </div>
        <div className="col-md-9">
          <h2>How it works</h2>
          <p style={{ fontSize: '1.25rem' }}>
            Anyone can signup for a free account and start posting and buying
            products. Since this site is 100% free please consider donating to
            improve the project. Since this site is only for digital products,
            all your purchased products can be found here at all times. If you
            have any questions, you can ask them in the chat section, which can
            be accessed after logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
