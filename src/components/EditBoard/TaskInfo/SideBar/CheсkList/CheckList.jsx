/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../../FirebaseApi';
import { addCheck } from '../../../../Content/SingleBoard/action';

import Modal from '../../../../Modal/Modal';

export const CheckList = ({ taskId }) => {
  const dispatch = useDispatch();
  const [mode, createTag] = useState('main');
  const firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();

  const onSubmit = (data) => {
    const checkId = Math.round(Math.random() * 100000);
    firebase.createСheck(id, data.title, checkId);
    dispatch(addCheck(checkId, data.title));
  };

  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faTag} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Чек-Лист</div>
          </div>
        )}
        currentId='check-list'
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='form-сheckList'
          autoComplete='off'
        >
          <span className='form-сheckList__title'>Добавление списка задач</span>
          <span className='form-сheckList__title-create'>Название</span>

          <input {...register('title')} className='form-сheckList__search' />

          <input
            type='submit'
            value='Создать'
            className='form-сheckList__submit button active'
          />
        </form>
      </Modal>
    </div>
  );
};
