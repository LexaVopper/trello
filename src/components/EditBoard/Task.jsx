/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Portal from '../Modal/Portal';
import { TaskInfo } from './TaskInfo/TaskInfo';

export const Task = ({ task, index, column }) => {
  const [toggleModalWindow, openModal] = useState(false);

  const openCloseTask = () => {
    toggleModalWindow ? openModal(false) : openModal(true);
  };

  return (
    <>
      <Draggable draggableId={String(task.id)} index={index}>
        {(provided) => (
          <div
            className='task'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={(e) => openCloseTask(e)}
          >
            <div className='task-details '>
              <span className='task-details__title'>{task.title}</span>
            </div>
            {task.content}
          </div>
        )}
      </Draggable>
      {toggleModalWindow && (
        <Portal classModal={toggleModalWindow} openModal={openModal}>
          <TaskInfo task={task} column={column} />
        </Portal>
      )}
    </>
  );
};
