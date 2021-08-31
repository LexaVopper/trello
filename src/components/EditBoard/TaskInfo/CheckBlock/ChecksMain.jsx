/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { delay } from '../utils';
import Modal from '../../../Modal/Modal';

import { changeCheckTitle } from '../../../Content/SingleBoard/action';
import { FirebaseContext } from '../../../FirebaseApi';
import { ListOfCheckTasks } from './ListOfCheckTasks';
import { ProgressLine } from './ProgressLine';

export const ChecksMain = ({ taskId, target }) => {
  const dispatch = useDispatch();
  const firebase = React.useContext(FirebaseContext);
  const { id } = useParams();
  const checks = useSelector(
    (state) => state.getBoard.page.task[taskId].checks
  );

  const allChecks = useSelector((state) => state.getBoard.page.checks);

  const a = delay((checkId, newTitle) => {
    firebase.changeСheckTitle(id, newTitle, checkId, taskId);
    dispatch(changeCheckTitle(checkId, taskId, newTitle));
  }, 500);

  const input1Change = (checkId, title, e) => {
    if (title !== e.target.value.trim()) {
      a(checkId, e.target.value.trim());
    }
  };

  const deleteCheck = (checkId) => {
    delete allChecks[checkId];
    delete checks[checkId];
    firebase.deleteСheck(id, checkId, taskId);
  };

  return (
    <>
      {Object.values(checks).map((check) => (
        <div className='check' key={check.id}>
          <div className='main-info-destination'>
            <div className='main-info-destination__title'>
              <textarea
                defaultValue={allChecks[check.id].title}
                onChange={(e) =>
                  input1Change(check.id, allChecks[check.id].title, e)
                }
              />
              <div className='main-info-destination-delete-check'>
                <Modal
                  target={({ onClick }) => (
                    <div
                      className='main-info-destination-delete-check__button'
                      onClick={onClick}
                    >
                      Удалить
                    </div>
                  )}
                  currentId={check.id}
                >
                  <span className='form-сheckList__title'>
                    Удаление списка {allChecks[check.id].title}
                  </span>
                  <span className='form-сheckList__title-create'>
                    Удаление списка задач необратимо, и не будет возможности его
                    вернуть.
                  </span>
                  <button
                    type='button'
                    className='form-сheckList__delete-check '
                    onClick={() => deleteCheck(check.id)}
                  >
                    Удалить список задач
                  </button>
                </Modal>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faCheckSquare}
              className='main-info-destination__icon menu-icon'
            />
          </div>
          <ProgressLine />
          <ListOfCheckTasks target={target} />
        </div>
      ))}
    </>
  );
};
