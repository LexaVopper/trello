/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faColumns } from '@fortawesome/free-solid-svg-icons';

export const Description = ({ id, target }) => {
  const { register, handleSubmit } = useForm();
  const [openClose, addDespription] = useState(false);
  const ref = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='main-info-destination'>
      <div className='main-info-destination__title'> Описание </div>
      <FontAwesomeIcon
        icon={faColumns}
        className='main-info-destination__icon menu-icon'
      />

      <form
        className={cn('main-info-destination__text', {
          focus: target.includes(ref.current),
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          id={id}
          type='text'
          {...register('description', {
            required: true,
            pattern: { value: /\S/ },
          })}
          placeholder='Добавить более подробное описание'
          ref={ref}
        />

        <div className='main-info-destination__buttons'>
          <input className='button' type='submit' value='Сохранить' />
          <FontAwesomeIcon
            icon={faPlus}
            className='main-info-destination__delete --icon'
            onClick={() => console.log('sss')}
          />
        </div>
      </form>
    </div>
  );
};
