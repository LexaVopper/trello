/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../../FirebaseApi';
import { toggleModalOpen } from '../../../../Modal/openModal';
import Modal from '../../../../Modal/Modal';
import { tieTagWithTask } from '../../../../Content/SingleBoard/action';

import { CreateEditTag } from '../CreateEditTag';
import { TagForm } from './TagForm';

export const Tags = ({ taskId }) => {
  const dispatch = useDispatch();
  const [mode, createTag] = useState('main');
  const firebase = React.useContext(FirebaseContext);
  const { id } = useParams();

  const [chosenTag, takeTag] = useState(null);
  const tags = useSelector((state) => state.getBoard.page?.tags);
  const tagsInTask = useSelector(
    (state) => state.getBoard.page?.task[taskId]?.tags || {}
  );

  const EditMode = (a) => {
    takeTag(tags[a]);
    createTag('edit');
  };

  const ChooseTag = (tagId) => {
    if (!tagsInTask[tagId]) {
      dispatch(tieTagWithTask(taskId, tagId));
      firebase.tieTagWithTask(id, taskId, tagId);
    } else {
      firebase.deleteTagFromTask(id, taskId, tagId);
      delete tagsInTask[tagId];
    }
  };

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
