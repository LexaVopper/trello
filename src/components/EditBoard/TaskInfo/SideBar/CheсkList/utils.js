export const findChecks = (taskList) => {
  let foundChecks = {};
  Object.values(taskList).forEach((task) => {
    if (
      Object.keys(task).includes('checks') &&
      Object.keys(task.checks).length >= 1
    ) {
      foundChecks = {
        ...foundChecks,
        [task.id]: task,
      };
    }
  });

  return Object.values(foundChecks);
};
