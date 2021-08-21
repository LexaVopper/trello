/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../../../Modal/Modal';
import { CheckForm } from './CheckForm';

export const CheckList = ({ taskId }) => {
  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faTag} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Чек-Лист</div>
          </div>
        )}
        currentId='check-list'
      >
        <CheckForm taskId={taskId} />
      </Modal>
    </div>
  );
};
