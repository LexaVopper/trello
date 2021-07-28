/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { toggleModalOpen } from '../../../Modal/openModal';
import Modal from '../../../Modal/Modal';
import { CreateEditTag } from './CreateEditTag';

export const Tags = () => {
  const dispatch = useDispatch();
  const [mode, createTag] = useState('main');
  const [chosenTag, takeTag] = useState(null);
  const tags = useSelector((state) => state.getBoard.page?.tags);

  const EditMode = (a) => {
    takeTag(tags[a]);
    createTag('edit');
  };

  React.useEffect(() => {
    return () => {
      dispatch(toggleModalOpen(''));
    };
  }, []);

  return (
    <div className='sidebar-tile'>
      <Modal
        target={({ onClick }) => (
          <div className='sidebar-tile__contant' onClick={onClick}>
            <div className='sidebar-tile__icon'>
              <FontAwesomeIcon icon={faTag} className='menu-icon' />
            </div>
            <div className='sidebar-tile__name'>Метки</div>
          </div>
        )}
        currentId='tags'
      >
        <div className='form-taskInfo'>
          {mode === 'main' && (
            <>
              <span className='form-taskInfo__title'>Метки</span>
              <input
                placeholder='Поиск меток...'
                className='form-taskInfo__search'
              />
              <span className='form-taskInfo__secTitle'>Метки</span>
              <div className='form-taskInfo-tags tags'>
                {Object.values(tags).map((tag, index) => (
                  <div className='tags__single' key={tag.id + index}>
                    <div
                      className={cn('tags__body', {
                        active: '',
                      })}
                      style={{ backgroundColor: tag.color }}
                    >
                      <div className='tags__title'> {tag.title} </div>
                      <div className='tags__select'> V </div>
                    </div>
                    <div
                      className='tags__edit'
                      onClick={() => EditMode(tag.id)}
                    >
                      <FontAwesomeIcon icon={faPen} className='menu-icon' />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className='tags__button'
                onClick={() => createTag('create')}
              >
                Создать новую метку
              </button>
            </>
          )}
          <CreateEditTag
            chosenTag={chosenTag}
            mode={mode}
            createTag={createTag}
            tags={tags}
          />
        </div>
      </Modal>
    </div>
  );
};
