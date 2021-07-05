/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { getRerender } from '../../Content/SingleBoard/action';
import { FirebaseContext } from '../../FirebaseApi';

export const CreateColumn = () => {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const columns = useSelector((state) => state.getBoard?.columns);
  const rerender = useSelector((state) => state.getBoard?.rerender);

  const colomnPosition = Object.keys(columns)?.length;
  const [active, setActive] = useState(false);

  const onSubmit = (data) => {
    firebase.addColumn(data.colomnTitle, id, colomnPosition);
    if (rerender) {
      dispatch(getRerender(false));
    } else {
      dispatch(getRerender(true));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('card-creating', { active: register === false })}
    >
      {!active ? (
        <button className='button' onClick={() => setActive(true)}>
          <FontAwesomeIcon icon={faPlus} className='menu-icon' />
          <span>Добавьте еще одну колонку</span>
        </button>
      ) : (
        <>
          <input
            {...register('colomnTitle', {
              required: true,
              pattern: { value: /\S/ },
            })}
            className='card-creating__input'
          />
          <div className='card-creating buttons'>
            <input
              type='submit'
              className='buttons__add'
              value='Добавить список'
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
};
