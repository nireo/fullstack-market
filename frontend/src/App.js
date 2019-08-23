import React, { useEffect } from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import { checkLocalStorage } from './reducers/userReducer';
import './components/styles.css';

const App = props => {
  useEffect(() => {
    if (props.user === null) {
      props.checkLocalStorage();
    }
  }, [props]);

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
