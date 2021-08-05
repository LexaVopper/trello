/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../FirebaseApi';

import { tieTagWithTask } from '../../../Content/SingleBoard/action';

import { CreateEditTag } from './CreateEditTag';

export const TagForm = ({ taskId }) => {
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
  return (
    <div className='form-taskInfo'>
      {mode === 'main' && (
        <>
          <span className='form-taskInfo__title'>Метки</span>
          <input
            placeholder='Поиск меток...'
            className='form-taskInfo__search'
          />
          <span className='form-taskInfo__secTitle'>Метки</span>
          <div className='form-taskInfo-tags tags'>
            {Object.values(tags).map((tag, index) => (
              <div className='tags__single' key={tag.id + index}>
                <div
                  className={cn('tags__body', {
                    active: '',
                  })}
                  style={{ backgroundColor: tag.color }}
                  onClick={() => ChooseTag(tag.id)}
                >
                  <div className='tags__title'> {tag.title} </div>
                  <div
                    className={cn('tags__select', {
                      active: tagsInTask[tag.id],
                    })}
                  >
                    <FontAwesomeIcon icon={faCheck} className='menu-icon' />
                  </div>
                </div>
                <div className='tags__edit' onClick={() => EditMode(tag.id)}>
                  <FontAwesomeIcon icon={faPen} className='menu-icon' />
                </div>
              </div>
            ))}
          </div>
          <button className='tags__button' onClick={() => createTag('create')}>
            Создать новую метку
          </button>
        </>
      )}
      <CreateEditTag
        chosenTag={chosenTag}
        mode={mode}
        createTag={createTag}
        tags={tags}
      />
    </div>
  );
};
