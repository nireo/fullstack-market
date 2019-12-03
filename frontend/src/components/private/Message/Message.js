import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import All from './All';
import Reviews from './Reviews';
import { removeMessage } from '../../../reducers/messageReducer';
import { setNotification } from '../../../reducers/notificationReducer';

const Message = ({ messages, removeMessage, setNotification }) => {
  const [selected, setSelected] = useState(false);

  // define these here so we don't need to use 'connect' everywhere
  const [review, setReview] = useState([]);
  const [loadedReview, setLoadedReview] = useState(false);

  const [selectedWindow, setSelectedWindow] = useState('all');

  useEffect(() => {
    if (review === [] && loadedReview === false) {
      setReview(messages.filter(m => m.title.includes('Review')));
      setLoadedReview(true);
    }
  }, [review, messages, setReview]);

  const handleRemoveMessage = (id, name) => {
    // check if they're valid to provide a proper message
    if (!id || !name) {
      return;
    }

    if (window.confirm(`Are you sure you want to delete message: '${name}'`)) {
      try {
        removeMessage(id);
        setNotification('Successfully removed message', 'success', 2);
      } catch (error) {
        setNotification('Problem with removing message', 'error', 2);
      }
    }
  };

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
              {selectedWindow === 'all' && (
                <All messages={messages} removeMessage={handleRemoveMessage} />
              )}
              {selectedWindow === 'review' && <Reviews messages={review} />}
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

export default connect(mapStateToProps, { removeMessage, setNotification })(
  Message
);
