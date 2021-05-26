import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';

function Edit() {
  const { id } = useParams();
  const blockRef = React.useRef(null);
  const [modal, openModal] = useState(false);

  const openModalWindow = () => {
    !modal ? openModal(true) : openModal(false);
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
            <span className='single-text invite' ref={blockRef} onClick={() => openModalWindow()}>
              Пригласить
            </span>
            {modal && <Modal refer={blockRef.current}></Modal>}
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
}

export default Edit;
