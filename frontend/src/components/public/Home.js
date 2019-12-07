import React from 'react';
import Welcome from './Welcome';
import About from './About';
import HowItWorks from './HowItWorks';
import { Footer } from './Footer';

const Home = () => {
  return (
    <div>
      <div>
        <Welcome />
      </div>
      <div style={{ paddingTop: '4rem' }}>
        <About />
      </div>
      <div style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
