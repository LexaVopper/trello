/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { delay } from './utils';
import { changeCheckTitle } from '../../Content/SingleBoard/action';

export const ChecksMain = ({ taskId, checks }) => {
  const dispatch = useDispatch();
  const allChecks = useSelector((state) => state.getBoard.page.checks);

  const a = delay((checkId, newTitle) => {
    dispatch(changeCheckTitle(checkId, taskId, newTitle));
  }, 500);

  const input1Change = (checkId, title, e) => {
    if (title !== e.target.value.trim()) {
      a(checkId, e.target.value.trim());
    }
  };

  return (
    <>
      {Object.values(checks).map((check) => (
        <div className='main-info-destination' key={check.id}>
          <div className='main-info-destination__title'>
            <textarea
              defaultValue={allChecks[check.id].title}
              onChange={(e) =>
                input1Change(check.id, allChecks[check.id].title, e)
              }
            />
          </div>
          <FontAwesomeIcon
            icon={faCheckSquare}
            className='main-info-destination__icon menu-icon'
          />
        </div>
      ))}
    </>
  );
};
