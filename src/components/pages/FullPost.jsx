import axios from '../../axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <Post
      _id={data._id}
      title={data.title}
      imageUrl={data.imageUrl}
      user={data.user}
      createdAt={data.createdAt}
      tags={data.tags}
      isEditable={userData?._id === data.user._id}
      isFullPost
    >
      <ReactMarkdown children={data.content} />
    </Post>
  );
};

export default FullPost;
