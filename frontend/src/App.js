import React, { useEffect } from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { checkLocalStorage } from './reducers/userReducer';
import './components/styles.css';

const App = props => {
  useEffect(() => {
    if (props.user === null) {
      props.checkLocalStorage();
    }
  }, []);

  return (
    <div class="animation-delays animate fadeIn">
      <Routes />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { checkLocalStorage }
)(App);
