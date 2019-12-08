import React from 'react';
import { ReactComponent as Shop } from '../../svg/bus-shop.svg';

const About = () => {
  return (
    <div className="container">
      <div className="row about-animation">
        <div className="col-md-8">
          <h2>what is benevol</h2>
          <p style={{ fontSize: '1.25rem' }}>
            Benelov market is a marketplace for selling virtual items, from PDFs
            to game items. This site consists of an official tab, which contains
            products from the creators of Benelov market. Also a community tab
            for selling and buying items from fellow community members.
          </p>
        </div>
        <div className="col-md-4">
          <Shop style={{ width: '250px', height: '250px' }} />
        </div>
      </div>
    </div>
  );
};

export default About;
