import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalOpen } from './openModal';

const Modal = React.memo(function Modal({
  children,
  currentId,
  target: TargetComponent,
}) {
  const dispatch = useDispatch();
  const currentModalId = useSelector((state) => state?.checkModalOpen?.modalId);
  const [toggle, setState] = useState(false);
  const openModalWindow = () => {
    if (!toggle) {
      setState(true);
      dispatch(toggleModalOpen(currentId));
    } else {
      setState(false);
      dispatch(toggleModalOpen(''));
    }
  };

  return (
    <>
      <TargetComponent onClick={() => openModalWindow()} />
      {currentModalId === currentId && (
        <div className='modal'>
          <div className='modal__content'>{children}</div>
        </div>
      )}
    </>
  );
});

export default Modal;
