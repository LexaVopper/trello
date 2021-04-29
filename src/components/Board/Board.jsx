import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar, faMinus } from '@fortawesome/free-solid-svg-icons';

function Board({ blockRef }) {
  const [description, openDescr] = useState(false);

  const openModalWindow = () => {
    !description ? openDescr(true) : openDescr(false);
  };
  return (
    <Modal refer={blockRef.current}>
      <div className='board'>
        <div className='board__input'>
          <input></input>
          <button className='button'>
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
            Добавляйте в избранное наиболее важные доски, чтобы они всегда были под рукой.
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
            Добавляйте в избранное наиболее важные доски, чтобы они всегда были под рукой.
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Board;
