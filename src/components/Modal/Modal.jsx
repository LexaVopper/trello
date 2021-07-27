/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalOpen } from './openModal';

const Modal = React.memo(function Modal({
  children,
  currentId,
  target: TargetComponent,
}) {
  const dispatch = useDispatch();
  const currentModalId = useSelector((state) => state?.checkModalOpen?.modalId);

  const openModalWindow = () => {
    if (currentModalId === currentId) {
      dispatch(toggleModalOpen(''));
    } else {
      dispatch(toggleModalOpen(currentId));
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
