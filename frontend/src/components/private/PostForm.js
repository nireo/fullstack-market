import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';

const PostForm = props => {
  const { price, title, description } = props;
  const checkNextStep = () => {
    if (title === '' || price === 0 || description === '') {
      props.setNotification('You need to fill out all the fields', 'error', 3);
      return null;
    } else {
      props.setStep(2);
    }
  };

  const createPost = event => {
    event.preventDefault();

    if (props.type === 'create') {
      return;
    } else {
      props.handleCreation();
    }
  };

  return (
    <div className="container">
      <form onSubmit={createPost}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            placeholder="Enter title"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={props.price}
            onChange={({ target }) => props.setPrice(target.value)}
            required
            min={0}
            step={0.01}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={props.description}
            onChange={({ target }) => props.setDescription(target.value)}
            placeholder="Enter description"
            required
            rows="7"
          />
          <p style={{ fontSize: '12px' }}>You can try using markdown.</p>
        </div>
        {props.type === 'edit' ? (
          <div>
            <button type="submit" className="btn btn-outline-primary">
              Commit changes
            </button>
            {'  '}
            <button
              onClick={() => props.setPost(null)}
              className="tutorial-button button-pink"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={checkNextStep}
              className="tutorial-button button-pink"
              style={{ marginTop: '0.5rem', marginRight: '0.75rem' }}
            >
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default connect(null, { setNotification })(PostForm);
