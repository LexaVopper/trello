import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import Modal from '../../../Modal/Modal';
import { toggleModalOpen } from '../../../Modal/openModal';

export const Tags = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModalOpen(''));
  };

  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faTag} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Участники</div>
          </div>
        )}
        currentId='tags'
      >
        <div className='sidebar-tile' onClick={() => closeModal()}>
          <div className='sidebar-tile__icon'>
            <FontAwesomeIcon icon={faTag} className='menu-icon' />
          </div>
          <div className='sidebar-tile__name'>Участники</div>
        </div>
      </Modal>
    </div>
  );
};
