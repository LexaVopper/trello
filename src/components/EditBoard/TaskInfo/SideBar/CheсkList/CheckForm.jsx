/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../../FirebaseApi';
import { addCheck, copyCheck } from '../../../../Content/SingleBoard/action';

import { findChecks, copyChecks } from './utils';

export const CheckForm = ({ taskId }) => {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const tasks = useSelector((state) => state.getBoard.page?.task);
  const checks = useSelector((state) => state.getBoard.page?.checks);

  const onSubmit = (data) => {
    if (data.sample !== 'Non') {
      const checkId = Math.round(Math.random() * 100000);
      firebase.copyСheck(
        id,
        copyChecks(checks[data.sample], checkId, data.title),
        checkId,
        taskId
      );
      dispatch(
        copyCheck(
          checkId,
          copyChecks(checks[data.sample], checkId, data.title),
          taskId
        )
      );
    } else {
      const checkId = Math.round(Math.random() * 100000);
      firebase.createСheck(id, data.title, checkId, taskId);
      dispatch(addCheck(checkId, data.title, taskId));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='form-сheckList'
      autoComplete='off'
    >
      <span className='form-сheckList__title'>Добавление списка задач</span>
      <span className='form-сheckList__title-create'>Название</span>

      <input {...register('title')} className='form-сheckList__search' />

      <span className='form-сheckList__title-create'>
        Копировать элементы из…
      </span>

      <select {...register('sample')}>
        <option value='Non'>(Не копировать)</option>
        {findChecks(tasks).map((tasksAndChecks) => (
          <optgroup
            className='sample__task'
            label={tasksAndChecks.title}
            key={tasksAndChecks.id}
          >
            {Object.values(tasksAndChecks.checks).map((el) => (
              <option key={el.id} value={el.id}>
                {el.title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <input
        type='submit'
        value='Создать'
        className='form-сheckList__submit button active'
      />
    </form>
  );
};
