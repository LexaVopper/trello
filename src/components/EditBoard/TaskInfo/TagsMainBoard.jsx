/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

export const TagsMainBoard = ({ taskId }) => {
  const dispatch = useDispatch();

  const tagsInTask = useSelector(
    (state) => state.getBoard.page?.task[taskId]?.tags || {}
  );
  return <div>TagsMainBoard</div>;
};
