import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, refer }) {
  if (!refer) {
    return <div></div>;
  }
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='modal__content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,

    refer,
  );
}

export default Modal;
