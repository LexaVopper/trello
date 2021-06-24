import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faStar,
  faMinus,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import { toggleModalOpen } from '../Modal/openModal';

function Board() {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModalOpen(''));
  };
  return (
    <Modal
      target={({ onClick }) => (
        <div className='button' onClick={onClick}>
          <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          <span>Доски</span>
        </div>
      )}
      currentId='boards'
    >
      <div className='board'>
        <div className='board__input'>
          <input />
          <button className='button' onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faPlus} className='menu-icon delete' />
          </button>
        </div>
        <div className='board section-info'>
          <div className='section-info__title'>
            <span className='mini-icon'>
              <FontAwesomeIcon icon={faStar} className='mini-icon' />
            </span>
            <span className='text'>отмеченные доски</span>
          </div>
          <div className='section-info__toggle-info-icon'>
            <FontAwesomeIcon icon={faMinus} className='mini-icon' />
          </div>
          <div className='section-info__description'>
            Добавляйте в избранное наиболее важные доски, чтобы они всегда были
            под рукой.
          </div>
        </div>

        <div className='board section-info'>
          <div className='section-info__title'>
            <span className='mini-icon'>
              <FontAwesomeIcon icon={faStar} className='mini-icon' />
            </span>
            <span className='text'>ЧАСТО ПОСЕЩАЕМЫЕ ДОСКИ</span>
          </div>
          <div className='section-info__toggle-info-icon'>
            <FontAwesomeIcon icon={faMinus} className='mini-icon' />
          </div>
          <div className='section-info__description'>
            Добавляйте в избранное наиболее важные доски, чтобы они всегда были
            под рукой.
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Board;
