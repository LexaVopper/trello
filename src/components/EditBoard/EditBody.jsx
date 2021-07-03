/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { CreateColumn } from './CreateColumn/CreateColomn';
import {
  clearBoardColumns,
  changeColomns,
  getRerender,
} from './CreateColumn/action';
import { sortByAcs } from './CreateColumn/utils';

export const EditBody = React.memo(() => {
  const dispatch = useDispatch();
  const col = useSelector((state) => state.getBoardBody.columns);
  const listOfCols = useSelector((state) => state.getBoardBody.columnOrder);
  const loader = useSelector((state) => state.getBoardBody.isLoading);
  const sortedListOfCols = sortByAcs(listOfCols);
  const rerender = useSelector((state) => state.getBoardBody.rerender);

  const [cardList, setState] = useState({
    tasks: {
      'task-1': { id: 'task-1', content: 'Number 1' },
      'task-2': { id: 'task-2', content: 'Number 2' },
      'task-3': { id: 'task-3', content: 'Number 3' },
      'task-4': { id: 'task-4', content: 'Number 4' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Ly',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Ly',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  });

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
      const positionF = sortedListOfCols[source.index].position;
      const positionS = sortedListOfCols[destination.index].position;
      const secondEllementId = sortedListOfCols[destination.index].id;

      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, listOfCols[draggableId]);

      dispatch(
        changeColomns(secondEllementId, draggableId, positionF, positionS)
      );
    }

    // const start = cardList.columns[source.droppableId];
    // const finish = cardList.columns[destination.droppableId];
    // // In one list
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);
    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };
    //   const newState = {
    //     ...cardList,
    //     columns: {
    //       ...cardList.columns,
    //       [newColumn.id]: newColumn,
    //     },
    //   };
    //   setState(newState);
    //   return;
    // }
    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };
    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };
    // const newState = {
    //   ...cardList,
    //   columns: {
    //     ...cardList.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    // setState(newState);
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearBoardColumns());
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
                const column = col[columnId.id];
                return (
                  column && (
                    <Card
                      key={column.id}
                      column={column}
                      id={String(column.id)}
                      index={index}
                    />
                  )
                );
              })}

              {/* {cardList.columnOrder.map((columnId, index) => {
                  const column = cardList.columns[columnId];

                  return (
                    <Card
                      key={column.id}
                      id={String(column.id)}
                      column={column}
                      index={index}
                    />
                  );
                })} */}

              {provided.placeholder}
              <CreateColumn />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
});
