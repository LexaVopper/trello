import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

function Portal({ children, classModal }) {
  return ReactDOM.createPortal(
    <div className={cn('portal', { active: classModal === false })}>
      <div className='portal__content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,

    document.body,
  );
}

export default Portal;
