import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchPosts, fetchRemovePost } from '../../redux/slices/posts';
import IconEdit from '../Icons/IconEdit';
import Post from '../Post/Post';
import Menu from './Menu';

const PostsList = ({ posts }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };

  return (
    <section className="px-2">
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          imageUrl={post.imageUrl}
          title={post.title}
          content={post.content}
          user={post.user}
        />
      ))}
    </section>
  );
};

export default PostsList;
