/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { Description } from './Description';

export const TaskInfo = ({ task, column }) => {
  const [target, setstate] = useState('');

  const handleOutsideClick = useCallback((e) => {
    setstate(e.path);
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className='task-info info' id='taskInfo'>
      <div className='info-details '>
        <div className='info-details-header '>
          <div className='info-details-header__title'>
            <textarea defaultValue={task.title} />
          </div>
          <div className='info-details-header__column'>
            в колонке
            <span>{column.title}</span>
          </div>
          <div className='info-details-header__icon'>
            <FontAwesomeIcon icon={faColumns} className='menu-icon' />
          </div>
        </div>
        <div className='info-details-main main-info'>
          <Description key={task.id} id={task.id} target={target} />
        </div>
        <div className='info-details-sidebar'> dddfffffffffffffffffffffff</div>
      </div>
    </div>
  );
};
