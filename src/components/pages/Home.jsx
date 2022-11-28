import React from 'react';
import { fetchNotes, fetchTags } from '../../redux/slices/notes';
import { fetchPosts } from '../../redux/slices/posts';
import { useDispatch } from 'react-redux';
import Posts from './ContentList/Posts';

const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchNotes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Posts />
    </>
  );
};

export default Home;
