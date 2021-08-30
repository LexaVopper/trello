/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { FirebaseContext } from '../../FirebaseApi';

export const ListOfCheckTasks = ({ target }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const ref = useRef(null);
  const firebase = React.useContext(FirebaseContext);
  const onSubmit = (data) => {
    console.log(data);
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
          {...register('checkTask', {
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
