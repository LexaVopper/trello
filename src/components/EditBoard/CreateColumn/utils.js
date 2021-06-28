export const getEcheColomn = (columns) => {
  const objectColumns = {};
  const columnOrder = [];
  columns.forEach((column) => {
    const a = column.val();
    objectColumns[a.id] = a;
    columnOrder.push(a.id);
  });
  return { objectColumns, columnOrder };
};
