/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useForm } from 'react-hook-form';

import { FirebaseContext } from '../../FirebaseApi';
import { getRerender } from '../../Content/SingleBoard/action';

export default function CreateTask({ colomnId }) {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const boardId = useSelector((state) => state.getBoard?.id);
  const rerender = useSelector((state) => state.getBoard?.rerender);
  const taskIds = useSelector(
    (state) => state.getBoard?.page?.columns[colomnId]?.tasksId
  );

  let taskPosition = 0;
  if (taskIds) {
    taskPosition = Object.keys(taskIds).length;
  }

  const [active, setActive] = useState(false);

  const onSubmit = (data) => {
    firebase.addTask(data.taskTitle, colomnId, boardId, taskPosition);
    if (rerender) {
      dispatch(getRerender(false));
    } else {
      dispatch(getRerender(true));
    }
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
