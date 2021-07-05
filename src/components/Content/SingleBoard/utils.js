export const getEachColomn = (columns) => {
  const columnOrder = {};
  if (columns) {
    Object.values(columns).forEach((column) => {
      const a = column;
      let pos = {};
      pos = { position: a.position, id: a.id };

      columnOrder[a.id] = pos;
    });
  }

  return { columnOrder };
};
