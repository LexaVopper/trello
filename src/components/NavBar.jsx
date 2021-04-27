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
import Board from './Board/Board';

const NavBar = React.memo(function NavBar() {
  const blockRef = React.useRef(null);
  const [, setstate] = useState();

  React.useEffect(() => {
    setstate('a');
  }, []);

  return (
    <div className='header'>
      <div className='header-navigation'>
        <div className='header-navigation__block1'>
          <button>
            <FontAwesomeIcon icon={faLandmark} className='menu-icon' />
          </button>
          <button className='home'>
            <FontAwesomeIcon icon={faHome} className='menu-icon' />
          </button>
          <button>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
            <span>Доски</span>
          </button>
          <div className='header-navigation__input' ref={blockRef}>
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
          <button>
            <FontAwesomeIcon icon={faPlus} className='menu-icon' />
          </button>
          <button className='info'>
            <FontAwesomeIcon icon={faExclamationCircle} className='menu-icon' />
          </button>
          <button>
            <FontAwesomeIcon icon={faBell} className='menu-icon' />
          </button>
          <div className='header-navigation__profile'>А</div>
        </div>
      </div>

      <Board blockRef={blockRef} />
    </div>
  );
});

export default NavBar;
