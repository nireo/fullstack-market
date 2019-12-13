import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import axios from 'axios';

const Contact = ({ setNotification }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);

  const createMessage = event => {
    event.preventDefault();
    if (window.confirm('Are you sure you want to send this message?')) {
      const messageObject = {
        name,
        content
      };
      axios
        .post('/api/contact', messageObject)
        .then(() => {
          setNotification(
            'Message sent, admins will review it soon.',
            'success',
            2
          );
          setSent(true);
        })
        .catch(() => {
          setNotification('Error sending message', 'error', 2);
        });
    }
    return;
  };

  return (
    <div style={{ paddingTop: '4rem' }} className="container">
      <form onSubmit={createMessage}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            placeholder="Enter optional name."
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={({ target }) => setContent(target.value)}
            placeholder="Enter content."
            required
            rows="7"
          />
        </div>
        {sent === true && (
          <button
            type="submit"
            className="tutorial-button button-blue"
            disabled="true"
          ></button>
        )}
        {sent === false && (
          <button type="submit" className="tutorial-button button-blue">
            send
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { setNotification })(Contact);
