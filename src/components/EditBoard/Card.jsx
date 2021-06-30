/* eslint-disable no-unused-vars */
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from './Task';

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
              {column.title} {id}
            </h1>
            <Droppable droppableId={id} type='task'>
              {(provider) => (
                <div
                  className='tasks'
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {/* {tasks &&
                    tasks.map((task, taskIndex) => (
                      <Task key={task.id} task={task} index={taskIndex} />
                    ))} */}

                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};
