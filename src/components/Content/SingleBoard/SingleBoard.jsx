import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

function SingleBoard({ name, id }) {
  const history = useHistory();

  const editBoard = () => {
    history.push(`/edit/${id}`);
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
