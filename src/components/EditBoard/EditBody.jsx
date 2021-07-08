/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { Card } from './Card';
import { CreateColumn } from './CreateColumn/CreateColomn';
import {
  clearBoardColumns,
  changeColomns,
  changeTasks,
  changeTasksBetweenColumns,
} from '../Content/SingleBoard/action';

import {
  sortByAcs,
  getTasksAndCut,
  createNewListOfTasks,
  createNewListOfColumns,
  tasksBetweenColomns,
} from './utils';

export const EditBody = React.memo(() => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const listOfCols = useSelector((state) => state.getBoard?.columnOrder);
  const listTasks = useSelector((state) => state.getBoard?.page?.task);
  const simpleTasks = useSelector((state) => state.getBoard?.page?.columns);
  const sortedListOfCols = sortByAcs(listOfCols);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'column') {
      const newColumnOrder = Array.from(sortedListOfCols);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, listOfCols[draggableId]);
      const { newColumnsList } = createNewListOfColumns(newColumnOrder);
      dispatch(changeColomns(id, newColumnsList));
      return;
    }
    const start = simpleTasks[source.droppableId];
    const finish = simpleTasks[destination.droppableId];
    // // In one list
    if (start === finish) {
      const newTaskIds = Array.from(sortByAcs(start.tasksId));
      const colomnId = source.droppableId;
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(
        destination.index,
        0,
        simpleTasks[source.droppableId].tasksId[draggableId]
      );
      const { newTasksList, reduxTasksList } = createNewListOfTasks(
        newTaskIds,
        listTasks
      );
      dispatch(changeTasks(id, colomnId, newTasksList, reduxTasksList));
      return;
    }
    const startTaskIds = Array.from(sortByAcs(start.tasksId));
    startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(sortByAcs(finish.tasksId));
    finishTaskIds.splice(
      destination.index,
      0,
      simpleTasks[source.droppableId].tasksId[draggableId]
    );
    const { firstColumn, secondColumn, newTasksList } = tasksBetweenColomns(
      source.droppableId,
      destination.droppableId,
      startTaskIds,
      finishTaskIds,
      listTasks
    );
    console.log(firstColumn, secondColumn, newTasksList);
    // dispatch(
    //   changeTasksBetweenColumns(
    //     id,
    //     source.droppableId,
    //     destination.droppableId,
    //     firstColumn,
    //     secondColumn,
    //     newTasksList
    //   )
    // );
  };

  React.useEffect(() => {
    return () => {
      // dispatch(clearBoardColumns());
    };
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <div
              className='edit__block main'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sortedListOfCols.map((columnId, index) => {
                const singleColumn = simpleTasks[columnId.id];

                const tasks = getTasksAndCut(singleColumn, listTasks);

                return (
                  singleColumn && (
                    <Card
                      key={singleColumn.id}
                      column={singleColumn}
                      tasks={tasks}
                      id={String(singleColumn.id)}
                      index={index}
                    />
                  )
                );
              })}

              {provided.placeholder}
              <CreateColumn />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
});
