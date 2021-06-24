import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from './Task';

export const Card = ({ column, tasks, index }) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            className='card'
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <h1 className='card__title' {...provided.dragHandleProps}>
              {column.title}
            </h1>
            <Droppable droppableId={column.id} type='task'>
              {(provider) => (
                <div
                  className='tasks'
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {tasks.map((task, taskIndex) => (
                    <Task key={task.id} task={task} index={taskIndex} />
                  ))}

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
