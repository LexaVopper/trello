/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addCheckTask } from '../../../Content/SingleBoard/action';

import { FirebaseContext } from '../../../FirebaseApi';

export const AddCheckTasks = ({ target, checkId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const ref = useRef(null);
  const { id } = useParams();

  const firebase = React.useContext(FirebaseContext);
  const onSubmit = (data) => {
    const taskId = Math.round(Math.random() * 100000);
    firebase.createTaskInСheck(id, checkId, taskId, data.taskTitle);
    dispatch(addCheckTask(checkId, data.taskTitle, taskId));
  };

  return (
    <form
      className={cn('main-info-destination__text addCheck', {
        focus: target.includes(ref.current),
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      {target.includes(ref.current) ? (
        <textarea
          type='text'
          {...register('taskTitle', {
            required: true,
            pattern: { value: /\S/ },
          })}
          placeholder='Добавить элемент'
          ref={ref}
        />
      ) : (
        <button
          type='button'
          className='main-info-destination__addCheck'
          ref={ref}
        >
          Добавить элемент
        </button>
      )}

      <div className='main-info-destination__buttons'>
        <input className='button' type='submit' value='Сохранить' />
        <FontAwesomeIcon
          icon={faPlus}
          className='main-info-destination__delete --icon'
        />
      </div>
    </form>
  );
};
