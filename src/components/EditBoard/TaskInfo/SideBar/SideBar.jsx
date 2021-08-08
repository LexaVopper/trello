import React from 'react';
import { Participants } from './Participants';
import { Tags } from './Tags/Tags';

export const SideBar = ({ taskId }) => {
  return (
    <div className='info-details-sidebar sidebar'>
      <div className='sidebar__title'>Добавить на карточку</div>

      <Participants />

      <Tags taskId={taskId} />
    </div>
  );
};
