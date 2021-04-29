import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faPlus, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

function Workspace() {
  const [listUpDown, setUpDown] = useState(false);

  const toggleList = () => {
    !listUpDown ? setUpDown(true) : setUpDown(false);
  };

  return (
    <section className='workspace'>
      <div className='workspace__header'>
        <div className='workspace__link'>
          <FontAwesomeIcon icon={faColumns} className='link-icon' />
          <span>Доски</span>
        </div>
        <div className='workspace__link'>
          <FontAwesomeIcon icon={faColumns} className='link-icon' />
          <span>Шаблоны</span>
        </div>
        <div className='workspace__link'>
          <FontAwesomeIcon icon={faColumns} className='link-icon' />
          <span>Главная страница</span>
        </div>
      </div>
      <div className='workspace__content'>
        <div className='workspace__create'>
          <span>РАБОЧИЕ ПРОСТРАНСТВА</span>
          <FontAwesomeIcon icon={faPlus} className='create-icon' />
        </div>
        <div onClick={() => toggleList()} className='workspace project'>
          <div className='project__logo'>V</div>
          <div className='project__name'>VopperRoom</div>
          <div className='project__toggle'>
            {!listUpDown ? (
              <FontAwesomeIcon icon={faSortUp} className='create-icon' />
            ) : (
              <FontAwesomeIcon icon={faSortDown} className='create-icon' />
            )}
          </div>
        </div>

        <div className={cn('project__list', { up: listUpDown === true })}>
          <li className='project__item'>
            <FontAwesomeIcon icon={faColumns} className='link-icon' />
            <span>Начало работы</span>
            <FontAwesomeIcon icon={faPlus} className='slide-icon' />
          </li>
          <li className='project__item'>
            <FontAwesomeIcon icon={faColumns} className='link-icon' />
            <span>Доски</span>
            <FontAwesomeIcon icon={faPlus} className='slide-icon' />
          </li>
          <li className='project__item'>
            <FontAwesomeIcon icon={faColumns} className='link-icon' />
            <span>Важные события</span>
            <FontAwesomeIcon icon={faPlus} className='slide-icon' />
          </li>
        </div>
      </div>
    </section>
  );
}

export default Workspace;
