import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { v4 as uuidv4 } from 'uuid';
import Note from '../Note/Note';
import TextField from '../UI/TextField';
import { useContent } from '../../hooks/useContent';
import { useNavigate } from 'react-router-dom';
import PostsList from '../UI/PostsList';
import LastPosts from '../UI/LastPosts';
import Skeleton from '../Note/Skeleton';
import Pagination from '../UI/Pagination';
import Tags from '../UI/Tags';

const Posts = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  if (posts.items.length === 0) {
    return <Skeleton />;
  }
  return (
    <>
      <div className="max-w-screen-xl mx-auto grid grid-rows-layout mt-20">
        <LastPosts posts={posts.items} />
        <main className="lg:flex">
          <div className="w-full lg:w-2/3">
            <PostsList posts={posts.items} />
            <Pagination posts={posts.items} />
          </div>
          <div className="w-full lg:w-1/3 px-2 md:flex md:space-x-6 lg:block lg:space-x-0">
            <Tags tags={tags.items} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Posts;
