import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLandmark,
  faHome,
  faColumns,
  faPlus,
  faExclamationCircle,
  faBell,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Board from '../Board/Board';
import { useHistory } from 'react-router-dom';

const NavBar = React.memo(function NavBar() {
  const blockRef = React.useRef(null);
  const [modal, openModal] = useState(false);
  const history = useHistory();

  const goHome = () => {
    history.push('/home');
  };
  const openModalWindow = () => {
    !modal ? openModal(true) : openModal(false);
  };

  return (
    <div className='header'>
      <div className='header-navigation'>
        <div className='header-navigation__block1' ref={blockRef}>
          <button className='button'>
            <FontAwesomeIcon icon={faLandmark} className='menu-icon' />
          </button>
          <button onClick={() => goHome()} className='button home'>
            <FontAwesomeIcon icon={faHome} className='menu-icon' />
          </button>
          <button className='button' onClick={() => openModalWindow()}>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Доски</span>
          </button>
          <div className='header-navigation__input'>
            <input></input>
            <span className='search-icon'>
              <FontAwesomeIcon icon={faSearch} className='menu-icon' />
            </span>
          </div>
        </div>
        <div className='header-navigation__logo'>
          <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          <span>Trello</span>
        </div>
        <div className='header-navigation__block2'>
          <button className='button'>
            <FontAwesomeIcon icon={faPlus} className='menu-icon' />
          </button>
          <button className='button info'>
            <FontAwesomeIcon icon={faExclamationCircle} className='menu-icon' />
          </button>
          <button className='button'>
            <FontAwesomeIcon icon={faBell} className='menu-icon' />
          </button>
          <div className='header-navigation__profile'>А</div>
        </div>
      </div>
      {modal && <Board blockRef={blockRef} />}
    </div>
  );
});

export default NavBar;
