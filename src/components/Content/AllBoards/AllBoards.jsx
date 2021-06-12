import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FirebaseContext } from '../../FirebaseApi';
import SingleBoard from '../SingleBoard/SingleBoard';
import Portal from '../../Modal/Portal';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useSelector } from 'react-redux';

function AllBoards() {
  const firebase = React.useContext(FirebaseContext);
  const allowedBoards = useSelector((state) => state?.getUser?.user?.boards);
  const [position, setColor] = useState(0);
  const [toggleSubmit, setSubmitDisable] = useState(true);
  const [toggleModalWindow, openModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openCloseBoard = () => {
    toggleModalWindow === true ? openModal(false) : openModal(true);
  };

  const colors = [
    'green',
    '#adad21',
    'red',
    '#44014C',
    '#0079bf',
    '#d29034',
    '#519839',
    '#b04632',
    '#4a443c',
  ];

  const TodoComponent = {
    backgroundColor: '#44014C',
  };
  const allowCreating = (value) => {
    value.trim().length === 0 ? setSubmitDisable(true) : setSubmitDisable(false);
  };
  const onSubmit = (data) => {
    firebase.addBoard(data.boardName, colors[position]);
    openCloseBoard();
  };

  return (
    <div className='all-boards'>
      <div className='recently-promoted'>
        <div className='recently-promoted__header'>
          <div className='recently-promoted__icon'>
            <FontAwesomeIcon icon={faBell} className='menu-icon' />
          </div>
          <span>Недавно просмотренноe</span>
        </div>
        <div className='recently-promoted__boards'>
          {allowedBoards &&
            Object.values(allowedBoards).map((obj, index) => (
              <SingleBoard key={obj.id} name={obj.name} id={obj.id} />
            ))}

          <div className='recently-promoted-board' onClick={() => openCloseBoard()}>
            <span className='recently-promoted-board__name'>Добавить</span>
            <div className='recently-promoted-board__footer'>
              <FontAwesomeIcon icon={faBell} className='slide-icon' />
            </div>
          </div>
        </div>
      </div>
      <Portal classModal={toggleModalWindow}>
        <div className='creating-board create'>
          <form
            className='create__name'
            onSubmit={handleSubmit(onSubmit)}
            style={{ backgroundColor: colors[position] }}>
            <input
              id='boardName'
              type='text'
              {...register('boardName', {
                required: true,
                pattern: { value: /\S/ },
              })}
              placeholder='Добавте заголовок доски'
              onChange={(e) => allowCreating(e.target.value)}
            />

            <span className='create__name-room'>VopperRoom </span>
            <div className='create__delete' onClick={() => openCloseBoard()}>
              <FontAwesomeIcon icon={faPlus} className='create__delete --icon' />
            </div>
            <input type='submit' value='Создать доску' disabled={toggleSubmit} />
          </form>

          <ul className='create__colors'>
            {colors.map((color, index) => (
              <li
                className='create__block block'
                key={color + index}
                style={{ backgroundColor: colors[index] }}>
                <div
                  className={cn('block__layer', { active: index === position })}
                  onClick={() => setColor(index)}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} className='block__layer--icon' />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </div>
  );
}

export default AllBoards;
