import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import Note from '../Note/Note';
import ReactMarkdown from 'react-markdown';
const FullNote = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/notes/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка');
      });
  }, [id]);
  if (isLoading) {
    return <Note isLoading={isLoading} isFullNote />;
  }
  return (
    <>
      <Note
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        tags={data.tags}
        isFullNote
      >
        <ReactMarkdown children={data.content} />
      </Note>
    </>
  );
};

export default FullNote;
