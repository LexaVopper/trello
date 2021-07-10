export const createColumn = (boardId, columnId, title, position) => {
  const newColumn = {
    [columnId]: {
      board: boardId,
      id: columnId,
      position,
      title,
    },
  };
  const newColumnOrder = {
    [columnId]: {
      id: columnId,
      position,
    },
  };

  return { newColumn, newColumnOrder };
};
