/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Task } from './Task';
import CreateTask from './CreateTask/CreateTask';

export const Card = ({ column, tasks, id, index }) => {
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className='card'
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <h1 className='card__title' {...provided.dragHandleProps}>
              {column.title}
              <button className='button'>
                <FontAwesomeIcon icon={faEllipsisH} className='menu-icon' />
              </button>
            </h1>
            <Droppable droppableId={id} type='task'>
              {(provider) => (
                <div
                  className='tasks'
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {tasks &&
                    tasks.map((task, taskIndex) => (
                      <Task
                        key={task.id}
                        task={task}
                        index={taskIndex}
                        column={column}
                      />
                    ))}

                  {provider.placeholder}
                  <CreateTask colomnId={id} />
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};
