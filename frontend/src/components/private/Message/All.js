import React from 'react';

const All = ({ messages, removeMessage, setSelected }) => {
  return (
    <div className="container" style={{ paddingTop: '0', marginTop: '0' }}>
      <hr />
      {messages.map(i => (
        <div>
          <h5 style={{ padding: '0', fontSize: '18px' }}>{i.title}</h5>
          <button
            className="tutorial-button button-blue"
            style={{ marginTop: '0', marginRight: '0.25rem' }}
            onClick={() => setSelected(i)}
          >
            View message
          </button>
          <button
            className="tutorial-button button-blue"
            style={{ margin: '0' }}
            onClick={() => removeMessage(i._id, i.title)}
          >
            Remove message
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default All;
