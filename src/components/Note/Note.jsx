import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveNote } from '../../redux/slices/notes';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import IconDelete from '../Icons/IconDelete';
import IconEdit from '../Icons/IconEdit';
import Modal from '../UI/Modal';

import { setModal, setConfirm, setId } from '../../redux/slices/modal';

const Note = ({
  _id,
  title,
  content,
  createdAt,
  imageUrl,
  user,
  tags,
  children,
  isFullNote,
  isLoading,
}) => {
  const date = new Date(createdAt);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const handleModal = (id) => {
    dispatch(setId(id));
    dispatch(setModal());
  };

  const onClickRemove = () => {
    dispatch(setModal());
    dispatch(setConfirm());
    dispatch(fetchRemoveNote(modal.id));
  };

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      {isFullNote ? (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
          <Modal text="Удалить заметку?" />
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <div>
                      <p>
                        <time dateTime={date.toLocaleDateString()} title={date.toLocaleString()}>
                          {date.toLocaleString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
                <figure>
                  <img className="rounded-md" src={`http://localhost:4000${imageUrl}`} alt="" />
                </figure>
                <h1 className="mt-3">{title}</h1>
              </header>
              {children && (
                <div className="text-white font-semibold text-lg border-b-2 border-b-gray-500">
                  {children}
                </div>
              )}
              <div className="mt-10">
                <Link to={`/notes/${_id}/edit`} className="m-3">
                  <Button>Редактировать</Button>
                </Link>
                <Button onClick={handleModal}>Удалить</Button>
              </div>
            </article>
          </div>
        </main>
      ) : (
        <>
          <Modal text="Удалить заметку?" onRemove={onClickRemove} />
          <li className="sm:py-2 p-2 mt-1 shadow-md dark:border-b-2 dark:border-gray-600 hover:shadow-lg dark:hover:border-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    imageUrl
                      ? imageUrl
                      : 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp'
                  }
                  alt={user}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/notes/${_id}`}>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {`${content.slice(0, 140)}...`}
                  </p>
                </Link>
              </div>
              <div className="inline-flex items-start text-base font-semibold text-gray-900 dark:text-white">
                <Link to={`/notes/${_id}/edit`}>
                  <IconEdit />
                </Link>
                <IconDelete onClick={() => handleModal(_id)} />
              </div>
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default Note;
