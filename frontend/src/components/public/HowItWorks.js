import React from 'react';
import { ReactComponent as Invest } from '../../svg/invest.svg';

const HowItWorks = () => {
  return (
    <div className="container">
      <div className="row how-it-works-animation">
        <div className="col-md-4">
          <Invest style={{ width: '250px', height: '250px' }} />
        </div>
        <div className="col-md-8">
          <h2>how it works</h2>
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
