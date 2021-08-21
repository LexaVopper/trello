/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { toggleModalOpen } from '../../../../Modal/openModal';
import Modal from '../../../../Modal/Modal';

import { TagForm } from './TagForm';

export const Tags = ({ taskId }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(toggleModalOpen(''));
    };
  }, []);

  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faTag} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Метки</div>
          </div>
        )}
        currentId='tags'
      >
        <TagForm taskId={taskId} />
      </Modal>
    </div>
  );
};
