/* eslint-disable no-unused-vars */
import React from 'react';

export const ListOfCheckTasks = ({ checkTask }) => {
  return (
    <div className='check-task'>
      {Object.values(checkTask).map((task) => (
        <div className='check-task__container' key={task.id}>
          <input type='checkbox' className='check-task__checkbox' />

          <div className='check-task__title'>{task.title}</div>
        </div>
      ))}
    </div>
  );
};
