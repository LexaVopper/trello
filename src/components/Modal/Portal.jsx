/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

function Portal({ children, classModal, openModal }) {
  const ref = useRef(null);
  const handleOutsideClick = useCallback((e) => {
    openModal(e.path.includes(ref.current));
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', handleOutsideClick);

    return () =>
      document.body.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return ReactDOM.createPortal(
    <div
      className={cn('portal', {
        none: !classModal,
      })}
    >
      <div className='portal__content' onClick={(e) => e.stopPropagation()}>
        <div ref={ref}>{children}</div>
      </div>
    </div>,

    document.body
  );
}

export default Portal;
