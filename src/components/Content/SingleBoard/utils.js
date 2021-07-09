/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import * as _ from 'lodash';

export const sortByAcs = (list) => {
  return _.orderBy(list, ['position'], ['asc']);
};

export const getEachColomn = (page) => {
  const columnOrder = {};

  const { columns } = page;

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
