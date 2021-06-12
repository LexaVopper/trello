import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBoard } from './action';

function SingleBoard({ name, id }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const editBoard = () => {
    history.push(`/edit/${id}`);
    dispatch(getBoard(id));
  };

  return (
    <div className='recently-promoted-board' onClick={() => editBoard()}>
      <span className='recently-promoted-board__name'>{name}</span>
      <div className='recently-promoted-board__footer'>
        <FontAwesomeIcon icon={faBell} className='slide-icon' />
      </div>
    </div>
  );
}

export default SingleBoard;
