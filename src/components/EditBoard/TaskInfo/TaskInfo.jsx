import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';

export const TaskInfo = ({ task, column }) => {
  return (
    <div className='task-info info'>
      <div className='info-details '>
        <div className='info-details-header '>
          <div className='info-details-header__title'>
            <textarea>{task.title}</textarea>
          </div>
          <div className='info-details-header__column'>
            в колонке
            <span>{column.title}</span>
          </div>
          <div className='info-details-header__icon'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </div>
        </div>
        <div className='info-details-main'>ffddddddddddddddddddddddd </div>
        <div className='info-details-sidebar'> dddfffffffffffffffffffffff</div>
      </div>
    </div>
  );
};
