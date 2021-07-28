/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint no-param-reassign: "error" */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { createTags } from '../../../Content/SingleBoard/action';
import { FirebaseContext } from '../../../FirebaseApi';

export const CreateEditTag = ({ chosenTag, mode, createTag, tags }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const firebase = React.useContext(FirebaseContext);

  const [position, setColor] = useState(0);
  const { id } = useParams();
  if (mode === 'edit') {
    setValue('title', chosenTag?.title);
  }

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
    '#51e898',
    '#b3bac5',
  ];

  const changeColor = (index) => {
    setColor(index);
    chosenTag.color = colors[index];
  };
  const changeMode = (mode) => {
    setColor(0);

    createTag(mode);
  };
  const DeleteTag = (tagId) => {
    delete tags[tagId];
    createTag('main');
    firebase.deleteTag(id, tagId);
  };

  const onSubmit = (data) => {
    if (mode === 'edit') {
      dispatch(createTags(id, chosenTag.color, data.title, chosenTag.id));
      createTag('main');
    } else {
      const tagId = Math.round(Math.random() * 100000);

      dispatch(createTags(id, colors[position], data.title, tagId));
      createTag('main');
    }
  };

  return (
    <div className='sidebar-tile'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='form-taskInfo'
        autoComplete='off'
      >
        {mode === 'create' && (
          <>
            <span className='form-taskInfo__title'>Создание метки</span>
            <span className='form-taskInfo__title-create'>Название</span>
            <div
              className='form-taskInfo__back-icon'
              onClick={() => createTag('main')}
            >
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className='menu-icon'
              />
            </div>

            <input {...register('title')} className='form-taskInfo__search' />
            <span className='form-taskInfo__title-create'>Цвет</span>
            <ul className='create__colors-tags'>
              {colors.map((color, index) => (
                <li
                  className='create__block block-tag'
                  key={color + index}
                  style={{ backgroundColor: colors[index] }}
                >
                  <div
                    className={cn('block__layer', {
                      active: index === position,
                    })}
                    onClick={() => setColor(index)}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className='block__layer--icon'
                      />
                    </span>
                  </div>
                </li>
              ))}
              <div className='block-tag-nocolor'>
                <div className='block-tag__text'> Без цвета</div>
                <div className='block-tag__description'>
                  Не будет отображаться на карточке.
                </div>
              </div>
            </ul>
            <input
              type='submit'
              value='Создать'
              className={cn('form-taskInfo__submit button', {
                active: mode === 'create',
              })}
            />
          </>
        )}
        {mode === 'edit' && (
          <>
            <span className='form-taskInfo__title'>Изменение метки</span>
            <span className='form-taskInfo__title-create'>Название</span>
            <div
              className='form-taskInfo__back-icon'
              onClick={() => changeMode('main')}
            >
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className='menu-icon'
              />
            </div>

            <input {...register('title')} className='form-taskInfo__search' />
            <span className='form-taskInfo__title-create'>Цвет</span>
            <ul className='create__colors-tags'>
              {colors.map((color, index) => (
                <li
                  className='create__block block-tag'
                  key={color + index}
                  style={{ backgroundColor: colors[index] }}
                >
                  <div
                    className={cn('block__layer', {
                      active: colors[index] === chosenTag.color,
                    })}
                    onClick={() => changeColor(index)}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className='block__layer--icon'
                      />
                    </span>
                  </div>
                </li>
              ))}
              <div className='block-tag-nocolor'>
                <div className='block-tag__text'> Без цвета</div>
                <div className='block-tag__description'>
                  Не будет отображаться на карточке.
                </div>
              </div>
            </ul>
            <div className='block-tag__buttons'>
              <input
                type='submit'
                value='Сохранить'
                className={cn('form-taskInfo__submit button', {
                  active: mode === 'edit',
                })}
              />

              <button
                type='button'
                className='form-taskInfo__delete button'
                defaultValue='Удалить'
                onClick={() => DeleteTag(chosenTag.id)}
              >
                Удалить
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
