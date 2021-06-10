import React from 'react';
import ReactDOM from 'react-dom';

function Portal({ children }) {
  return ReactDOM.createPortal(
    <div className='portal'>
      <div className='portal__content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,

    document.body,
  );
}

export default Portal;
