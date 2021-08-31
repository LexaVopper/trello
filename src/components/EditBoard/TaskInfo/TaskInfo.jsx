/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../FirebaseApi';

import { delay } from './utils';
import { Description } from './Description';
import { changeTaskTitle } from '../../Content/SingleBoard/action';
import { SideBar } from './SideBar/SideBar';
import { TagsMainBoard } from './TagsMainBoard';
import { ChecksMain } from './CheckBlock/ChecksMain';

export const TaskInfo = ({ task, column }) => {
  const dispatch = useDispatch();
  const [target, setstate] = useState('');
  const { id } = useParams();
  const firebase = React.useContext(FirebaseContext);
  const tags = useSelector(
    (state) => state.getBoard.page.task[task.id].tags || {}
  );
  const checks = useSelector(
    (state) => state.getBoard.page.task[task.id].checks
  );

  const handleOutsideClick = useCallback((e) => {
    setstate(e.path);
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const a = delay((e) => {
    firebase.changeTaskTitle(id, task.id, e);
    dispatch(changeTaskTitle(task.id, e));
  }, 500);

  const input1Change = (title, e) => {
    if (title !== e.target.value.trim()) {
      a(e.target.value.trim());
    }
  };

  return (
    <div className='task-info info' id={`taskInfo+${task.id}`}>
      <div className='info-details '>
        <div className='info-details-header '>
          <div className='info-details-header__title'>
            <textarea
              defaultValue={task.title}
              onChange={(e) => input1Change(task.title, e)}
            />
          </div>
          <div className='info-details-header__column'>
            в колонке
            <span>{column.title}</span>
          </div>
          <div className='info-details-header__icon'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </div>
        </div>
        <div className='info-details-main collumns'>
          <div className='info-details-main main-info'>
            {Object.keys(tags).length ? (
              <TagsMainBoard tags={tags} taskId={task.id} />
            ) : (
              ''
            )}
            <Description
              key={task.id}
              boardId={id}
              id={task.id}
              target={target}
              description={task.description}
            />
            {checks ? <ChecksMain taskId={task.id} target={target} /> : ''}
          </div>
          <SideBar taskId={task.id} />
        </div>
      </div>
    </div>
  );
};
