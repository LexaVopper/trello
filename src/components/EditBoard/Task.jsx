import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          className='task'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='task-details '>
            <span className='task-details__title'>{task.title}</span>
          </div>
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
