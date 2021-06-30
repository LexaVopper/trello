import * as _ from 'lodash';
/* eslint-disable no-extend-native */
export const sortByAcs = (list) => {
  return _.orderBy(list, ['position'], ['asc']);
};

export const getEachColomn = (columns) => {
  const objectColumns = {};
  const columnOrder = {};

  columns.forEach((column) => {
    const a = column.val();
    let pos = {};
    pos = { position: a.position, id: a.id };
    objectColumns[a.id] = a;
    columnOrder[a.id] = pos;
  });

  return { objectColumns, columnOrder };
};
