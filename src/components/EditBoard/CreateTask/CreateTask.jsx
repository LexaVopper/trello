/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { createNewTask } from './utils';

import { FirebaseContext } from '../../FirebaseApi';
import { addTask } from '../../Content/SingleBoard/action';

export default function CreateTask({ colomnId }) {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const taskIds = useSelector(
    (state) => state.getBoard?.page?.columns[colomnId]?.tasksId
  );

  let taskPosition = 0;
  if (taskIds) {
    taskPosition = Object.keys(taskIds).length;
  }

  const [active, setActive] = useState(false);

  const onSubmit = (data) => {
    const taskId = Math.round(Math.random() * 100000);

    const { newTask, newColumnTask } = createNewTask(
      taskId,
      data.taskTitle,
      taskPosition
    );
    dispatch(addTask(newTask, newColumnTask, colomnId));
    firebase.addTask(data.taskTitle, colomnId, id, taskPosition, taskId);

    setActive(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('task-creating', {
        active: register === false,
      })}
    >
      {!active ? (
        <button className='button' onClick={() => setActive(true)}>
          <FontAwesomeIcon icon={faPlus} className='menu-icon' />
          <span>Добавьте карточку</span>
        </button>
      ) : (
        <>
          <textarea
            {...register('taskTitle', {
              required: true,
              pattern: { value: /\S/ },
            })}
            className='task-creating__input vertical'
          />
          <div className='task-creating buttons'>
            <input
              type='submit'
              className='buttons__add'
              value='Добавить карточку'
            />
            <button
              className='buttons__delete'
              onClick={() => setActive(false)}
            >
              <FontAwesomeIcon icon={faPlus} className='menu-icon delete' />
            </button>
          </div>
        </>
      )}
    </form>
  );
}
