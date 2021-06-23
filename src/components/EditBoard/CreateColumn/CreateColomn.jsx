import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { FirebaseContext } from '../../FirebaseApi';

import { useParams } from 'react-router-dom';

export const CreateColumn = () => {
  const { register, handleSubmit } = useForm();
  const firebase = React.useContext(FirebaseContext);
  const { id } = useParams();

  const [active, setActive] = useState(false);
  const onSubmit = (data) => {
    firebase.addColumn(data.colomnName, id);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('card-creating', { active: register === false })}>
      {!active ? (
        <button className='button' onClick={() => setActive(true)}>
          <FontAwesomeIcon icon={faPlus} className='menu-icon' />
          <span>Добавьте еще одну колонку</span>
        </button>
      ) : (
        <>
          <input
            {...register('colomnName', {
              required: true,
              pattern: { value: /\S/ },
            })}
            className='card-creating__input'
          />
          <div className='card-creating buttons'>
            <input type='submit' className='buttons__add' value='Добавить список' />
            <button className='buttons__delete' onClick={() => setActive(false)}>
              <FontAwesomeIcon icon={faPlus} className='menu-icon delete' />
            </button>
          </div>
        </>
      )}
    </form>
  );
};
