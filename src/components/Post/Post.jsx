import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchPosts, fetchRemovePost } from '../../redux/slices/posts';
import Menu from '../UI/Menu';
import PostSkeleton from './PostSkeleton';
import { setModal, setConfirm, setId } from '../../redux/slices/modal';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Comments from '../UI/Comments';
import Prism from 'prismjs';
import '../../themes/prism.css';
import BackToTop from '../UI/BackToTop';

const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  content,
  description,
  viewsCount,
  comments,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [children]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  if (isLoading) {
    return <PostSkeleton />;
  }
  const date = new Date(createdAt);
  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };

  const handleModal = (id) => {
    dispatch(setId(id));
    dispatch(setModal());
  };

  const onClickRemove = () => {
    dispatch(setModal());
    dispatch(setConfirm());
    dispatch(fetchRemovePost(modal.id));
    dispatch(fetchPosts());
  };

  const option = [
    { name: 'Удалить', func: handleModal, id: _id },
    { name: 'Редактировать', link: `/posts/${_id}/edit` },
  ];

  const handleTag = (tag) => {
    navigate(`/tags/${tag.trim()}`);
  };

  return (
    <>
      {isFullPost ? (
        <>
          <Modal text="Удалить статью?" />
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl mt-10">
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
                <h1 className="mt-3">{title}</h1>
                <figure>
                  <img className="rounded-md" src={`http://localhost:4000${imageUrl}`} alt="" />
                </figure>
              </header>
              {children && (
                <div className="text-white font-semibold text-lg border-b-2 border-b-gray-500 Code">
                  {children}
                </div>
              )}
              {tags?.map((tag) => (
                <span
                  key={uuidv4()}
                  onClick={() => handleTag(tag)}
                  className="mt-5 cursor-pointer bg-gradient-to-bl from-blue-600 to-indigo-600 text-white inline-flex items-center justify-center px-4 py-1 mb-2 rounded-md mr-2"
                >
                  {tag}
                </span>
              ))}
              {isEditable ? (
                <div className="mt-10">
                  <Link to={`/posts/${_id}/edit`} className="m-3">
                    <Button>Редактировать</Button>
                  </Link>
                  <Button onClick={() => handleModal(_id)}>Удалить</Button>
                </div>
              ) : (
                ''
              )}
              <Comments user={user} id={_id} imageUrl={imageUrl} comments={comments} />
            </article>
            <BackToTop />
          </div>
        </>
      ) : (
        <div
          key={uuidv4()}
          className="relative block w-full lg:flex mb-2 rounded-tr-md rounded-tl-md shadow-md hover:shadow-lg dark:hover:bg-zinc-800 dark:border-b-2 dark:border-b-slate-700"
          to={`/posts/${_id}`}
        >
          <Modal text="Удалить статью?" onRemove={onClickRemove} />
          <img
            className="w-full h-48 lg:w-48 opacity-80 object-cover lg:mr-4 rounded-tl-md"
            src={`http://localhost:4000${imageUrl}`}
            alt="1"
          />
          <div className="flex flex-col justify-between p-5">
            <Link to={`/posts/${_id}`}>
              <div>
                <h3 className="mb-2 dark:text-white text-gray-700 font-bold text-2xl">{title}</h3>
                <p className="dark:text-slate-400 text-gray-700">{description}</p>
              </div>
            </Link>
            <div className="flex mt-3">
              <img
                className="h-10 w-10 rounded-full mr-2 object-cover"
                src={`http://localhost:4000${user.avatarUrl}`}
                alt="author"
              />
              <div>
                <p className="font-semibold text-gray-400 text-sm">{user.fullName}</p>
                <time className="text-gray-400 text-xs">{getDate(createdAt)}</time>
              </div>
            </div>
          </div>
          {isEditable ? <Menu option={option} /> : ''}
        </div>
      )}
    </>
  );
};

export default Post;
