import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FirebaseContext } from '../../FirebaseApi';
import SingleBoard from '../SingleBoard/SingleBoard';

import { useSelector, useDispatch } from 'react-redux';

function AllBoards() {
  const firebase = React.useContext(FirebaseContext);
  const allowedBoards = useSelector((state) => state.getUser.user.boards);
  const addBoard = () => firebase.addBoard();

  return (
    <div className='all-boards'>
      <div className='recently-promoted'>
        <div className='recently-promoted__header'>
          <div className='recently-promoted__icon'>
            <FontAwesomeIcon icon={faBell} className='menu-icon' />
          </div>
          <span>Недавно просмотренноe</span>
        </div>
        <div className='recently-promoted__boards'>
          {allowedBoards &&
            Object.values(allowedBoards).map((obj, index) => (
              <SingleBoard key={obj.id} name={obj.name} id={obj.id} />
            ))}

          <div className='recently-promoted-board' onClick={() => addBoard()}>
            <span className='recently-promoted-board__name'>Добавить</span>
            <div className='recently-promoted-board__footer'>
              <FontAwesomeIcon icon={faBell} className='slide-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBoards;
