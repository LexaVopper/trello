/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Modal/Modal';
import { TagForm } from './SideBar/TagForm';

export const TagsMainBoard = ({ tags, taskId }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.getBoard.page?.tags || {});

  return (
    <div className='tags-main'>
      <div className='tags-main__title'>Метки</div>
      <div className='tags-main__colors'>
        {Object.values(tags).map((tag, index) => (
          <Modal
            target={({ onClick }) => (
              <div
                className='tags-main__color'
                key={tag.id}
                style={{ backgroundColor: allTags[tag.id].color }}
                onClick={onClick}
              >
                {allTags[tag.id].title}
              </div>
            )}
            currentId={`${taskId + tag.id}`}
          >
            <TagForm taskId={taskId} />
          </Modal>
        ))}
      </div>
    </div>
  );
};
