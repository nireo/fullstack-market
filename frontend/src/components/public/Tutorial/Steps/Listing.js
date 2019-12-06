import React from 'react';
import { Link } from 'react-router-dom';

const Listing = () => {
  return (
    <div style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
      <p>
        Since anyone can create postings in the community tab. You should know
        the basics of how to correctly make them. Benelov uses{' '}
        <a
          target="_blank"
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          rel="noopener noreferrer"
        >
          markdown
        </a>{' '}
        for rendering content and descriptions. Markdown makes it easier to
        display information to the buyer. Posts can been created in the{' '}
        <Link to="/create">create tab.</Link>. Rules about postings are simple:
        First, you need to provide clear information about the product you're
        selling. Second, you must provide a descriptive title and a fitting
        price.
      </p>
      <p>
        Make sure you have added the needed information in the settings tab, so
        that you can receive the payments properly. I don't take a share of the
        bought item, since this is a non-profit store. Payments here are handled
        through{' '}
        <a target="_blank" href="https://stripe.com" rel="noopener noreferrer">
          stripe
        </a>
        , which makes the payment processing super secure.
      </p>
    </div>
  );
};

export default Listing;
