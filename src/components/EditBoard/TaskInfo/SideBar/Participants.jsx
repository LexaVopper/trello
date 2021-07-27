/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../../Modal/Modal';
import { toggleModalOpen } from '../../../Modal/openModal';

export const Participants = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(toggleModalOpen(''));
  //   };
  // }, []);

  const onSubmit = (data) => {};

  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faUser} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Участники</div>
          </div>
        )}
        currentId='participants'
      >
        <form onSubmit={onSubmit} className='form-taskInfo'>
          <span className='form-taskInfo__title'>Участники</span>

          <input
            {...register('participants')}
            placeholder='Поиск участников'
            className='form-taskInfo__search'
          />
          <span className='form-taskInfo__secTitle'> Участники доски</span>

          <input type='submit' className='form-taskInfo__submit' />
        </form>
      </Modal>
    </div>
  );
};
