import React from 'react';
import Welcome from './Welcome';
import About from './About';
import HowItWorks from './HowItWorks';
import { Footer } from './Footer';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - benevol</title>
      </Helmet>
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
