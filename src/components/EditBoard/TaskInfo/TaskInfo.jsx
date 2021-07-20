/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../FirebaseApi';

import { delay } from './utils';
import { Description } from './Description';
import { changeTaskTitle } from '../../Content/SingleBoard/action';
import { SideBar } from './SideBar/SideBar';

export const TaskInfo = ({ task, column }) => {
  const dispatch = useDispatch();
  const [target, setstate] = useState('');
  const { id } = useParams();
  const firebase = React.useContext(FirebaseContext);

  const handleOutsideClick = useCallback((e) => {
    setstate(e.path);
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', handleOutsideClick);

    return () =>
      document.body.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const a = delay((e) => {
    firebase.changeTaskTitle(id, task.id, e);
    dispatch(changeTaskTitle(task.id, e));
  }, 500);

  const input1Change = (e) => {
    a(e.target.value);
  };

  return (
    <div className='task-info info' id={`taskInfo+${task.id}`}>
      <div className='info-details '>
        <div className='info-details-header '>
          <div className='info-details-header__title'>
            <textarea defaultValue={task.title} onChange={input1Change} />
          </div>
          <div className='info-details-header__column'>
            в колонке
            <span>{column.title}</span>
          </div>
          <div className='info-details-header__icon'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </div>
        </div>
        <div className='info-details-main main-info'>
          <Description
            key={task.id}
            boardId={id}
            id={task.id}
            target={target}
            description={task.description}
          />
        </div>
        <div className='info-details-sidebar'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};
