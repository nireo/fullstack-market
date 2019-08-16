import React from 'react';

const PostForm = props => {
  return (
    <div class="container">
      <form onSubmit={props.handleCreation}>
        <div class="form-group">
          <label>Title</label>
          <input
            class="form-control"
            placeholder="Enter title"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            class="form-control"
            placeholder="Enter price"
            value={props.price}
            onChange={({ target }) => props.setPrice(target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            value={props.description}
            onChange={({ target }) => props.setDescription(target.value)}
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

export default PostForm;
