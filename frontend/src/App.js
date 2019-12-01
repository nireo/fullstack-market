import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import { checkLocalStorage } from './reducers/userReducer';
import { getMessages } from './reducers/messageReducer';
import './components/styles.css';

const App = ({ user, checkLocalStorage, getMessages }) => {
  // loaded variable for loading messages
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (user === null) {
      checkLocalStorage();
    }

    if (user !== null && loaded === false) {
      getMessages();
      setLoaded(true);
    }
  }, [user, checkLocalStorage]);

  return (
    <div className="animation-delays animate fadeIn">
      <Routes />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { checkLocalStorage, getMessages })(
  App
);
