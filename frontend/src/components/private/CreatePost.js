import React, { useState } from 'react';
import { connect } from 'react-redux';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  return (
    <div class="container">
      <form>
        <div class="form-group">
          <label>Title</label>
          <input
            class="form-control"
            placeholder="Enter title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter price"
            value={price}
            onChange={({ target }) => setPrice(target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Create post
        </button>
      </form>
    </div>
  );
};

export default connect(
  null,
  null
)(CreatePost);
