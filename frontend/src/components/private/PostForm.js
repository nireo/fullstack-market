import React from 'react';

const PostForm = props => {
  return (
    <div className="container">
      <form onSubmit={props.handleCreation}>
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
          />
        </div>
        {props.type === 'edit' ? (
          <button type="submit" className="btn btn-primary">
            Commit changes
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Create post
          </button>
        )}
      </form>
    </div>
  );
};

export default PostForm;
