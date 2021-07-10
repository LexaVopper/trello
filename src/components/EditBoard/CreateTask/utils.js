export const createNewTask = (columnId, title, position) => {
  const newTask = {
    [columnId]: {
      id: columnId,
      position,
      title,
    },
  };
  const newColumnTask = {
    [columnId]: {
      id: columnId,
      position,
    },
  };

  return { newTask, newColumnTask };
};
