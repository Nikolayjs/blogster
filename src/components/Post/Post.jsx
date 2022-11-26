import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchPosts, fetchRemovePost } from '../../redux/slices/posts';
import Menu from '../UI/Menu';
import PostSkeleton from './PostSkeleton';

const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  content,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }
  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };
  const onClickRemove = () => {
    dispatch(fetchRemovePost(_id));
  };
  const handleEdit = () => {
    console.log('edit');
  };
  const option = [
    { name: 'Удалить', method: onClickRemove },
    { name: 'Редактировать', method: handleEdit },
  ];

  return (
    <div
      key={uuidv4()}
      className="relative block w-full lg:flex mb-10 rounded-tr-md rounded-tl-md hover:bg-gray-800 border-b-2 border-b-slate-700"
      to={`/posts/${_id}`}
    >
      <img
        className="w-full h-48 lg:w-48 opacity-80 object-cover lg:mr-4 rounded-tl-md"
        src={imageUrl}
        alt="1"
      />
      <div className="flex flex-col justify-between p-5">
        <Link to={`/posts/${_id}`}>
          <div>
            <h3 className="mb-2 dark:text-white text-gray-700 font-bold text-2xl">{title}</h3>
            <p className="dark:text-slate-400 text-gray-700">{content}</p>
          </div>
        </Link>
        <div className="flex mt-3">
          <img
            className="h-10 w-10 rounded-full mr-2 object-cover"
            src={user.avatarUrl}
            alt="author"
          />
          <div>
            <p className="font-semibold text-gray-400 text-sm">{user.fullName}</p>
            <time className="text-gray-400 text-xs">{getDate(createdAt)}</time>
          </div>
        </div>
      </div>
      <Menu option={option} id={_id} />
    </div>
  );
};

export default Post;
