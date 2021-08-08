import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faColumns } from '@fortawesome/free-solid-svg-icons';
import { addTaskDescription } from '../../Content/SingleBoard/action';
import { FirebaseContext } from '../../FirebaseApi';

export const Description = ({ id, target, boardId, description }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const ref = useRef(null);
  const firebase = React.useContext(FirebaseContext);

  const onSubmit = (data) => {
    firebase.addTaskDescription(boardId, id, data.description);
    dispatch(addTaskDescription(id, data.description));
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
          defaultValue={description}
          placeholder='Добавить более подробное описание'
          ref={ref}
        />

        <div className='main-info-destination__buttons'>
          <input className='button' type='submit' value='Сохранить' />
          <FontAwesomeIcon
            icon={faPlus}
            className='main-info-destination__delete --icon'
          />
        </div>
      </form>
    </div>
  );
};
