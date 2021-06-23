import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from './Task';

export const Card = ({ column, tasks, index }) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div className='card' ref={provided.innerRef} {...provided.draggableProps}>
            <h1 className='card__title' {...provided.dragHandleProps}>
              {column.title}
            </h1>
            <Droppable droppableId={column.id} type='task'>
              {(provided) => (
                <div className='tasks' ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};
