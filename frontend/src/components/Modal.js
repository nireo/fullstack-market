import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="mt-4">{children}</div>
        <div className="container mb-4">
          <button onClick={handleClose} className="button-basic button-blue">
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
