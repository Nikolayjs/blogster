import axios from '../../axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
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
  return <div><h1>Post</h1></div>;
};

export default FullPost;
