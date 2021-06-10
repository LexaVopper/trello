import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import { getUserIdByEmail } from './invite';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal/Modal';
import { useForm } from 'react-hook-form';

const Edit = React.memo(function Edit() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const blockRef = React.useRef(null);

  const dispatch = useDispatch();
  const [toggle, self_Invite] = useState(false);
  const emailNotFound = useSelector((state) => state?.checkEmail?.error);
  const userEmail = useSelector((state) => state?.getUser?.user?.email);

  const [modal, openModal] = useState(false);

  const openModalWindow = () => {
    !modal ? openModal(true) : openModal(false);
  };

  const onSubmit = (data) => {
    if (data.user === userEmail) {
      self_Invite(true);
    } else {
      self_Invite(false);
      dispatch(getUserIdByEmail(data, id));
    }
  };

  return (
    <section className='edit'>
      <div className='edit__nav nav'>
        <div className='nav__buttons'>
          <button className='button'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Доски</span>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </button>
          <button className='button'>
            <span className='single-text'>Тестилка</span>
          </button>
          <button className='button'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </button>
          <span className='separate-line' />
          <button className='button'>
            <span className='single-text'>Vopper</span>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </button>
          <span className='separate-line' />
          <button className='button'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Для рабочего пространства</span>
          </button>
          <span className='separate-line' />
          <div className='profile'>А</div>
          <button className='button'>
            <Modal
              target={({ onClick }) => (
                <span className='single-text invite' onClick={onClick}>
                  <span className='invite__text'>Пригласить</span>
                </span>
              )}
              currentId='Invite'>
              <form onSubmit={handleSubmit(onSubmit)} className='invite-form'>
                <span className='invite-form__title'>Пригласить на доску</span>

                <input {...register('user')} placeholder='mail' className='invite-form__email' />
                {toggle && <span className='invite-form__error'>Нельзя отправить себе</span>}
                {emailNotFound && <span className='invite-form__error'>Такой почты нет</span>}
                <input type='submit' className='invite-form__submit' />
              </form>
            </Modal>
          </button>
        </div>
        <div className='nav__menu'>
          <button className='button'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Butler</span>
          </button>
          <button className='button'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Меню</span>
          </button>
        </div>
      </div>
      <div className='edit__block block'></div>
    </section>
  );
});

export default Edit;
