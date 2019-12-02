import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Message = ({ messages }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      <div className="box">
        <div className="container">
          <h5 style={{ marginTop: '0.5rem' }}>Messages</h5>
          <div className="row">
            <div className="col-md-3">
              <div>
                <Link>All</Link>
              </div>
              <div>
                <Link>Reviews</Link>
              </div>
            </div>
            <div className="col-md-9">
              {selected === false && <div>this is the bigger grid</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, null)(Message);
