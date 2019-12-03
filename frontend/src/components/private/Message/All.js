import React from 'react';

const All = ({ messages }) => {
  console.log(messages);
  return (
    <div className="container">
      {messages.map(i => (
        <div>
          <p>{i.content}</p>
        </div>
      ))}
    </div>
  );
};

export default All;
