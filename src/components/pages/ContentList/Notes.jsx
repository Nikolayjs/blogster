import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, fetchTags } from '../../../redux/slices/notes';
import { v4 as uuidv4 } from 'uuid';
import Note from '../../Note/Note';
import TextField from '../../UI/TextField';
import { useContent } from '../../../hooks/useContent';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../../UI/FloatingButton';
import IconPost from '../../Icons/IconPost';

const Notes = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { notes, tags } = useSelector((state) => state.notes);
  const isNotesLoading = notes.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedContent = useContent(notes.items, filter.sort, filter.query);

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchTags());
  }, [dispatch]);

  React.useEffect(() => {
    if (!isNotesLoading && notes.items.length === 0) {
      navigate('/add-note');
    } else {
      navigate('/notes');
    }
  }, [sortedAndSearchedContent]);

  return (
    <>
      <article className="mx-auto w-full max-w-5xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-10">
        <div className="w-full max-w-full p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <TextField
              type="text"
              label="Поиск"
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />
            <ul role="list">
              {(isNotesLoading ? [...Array(5)] : sortedAndSearchedContent).map((el) =>
                isNotesLoading ? (
                  <Note key={uuidv4()} isLoading={true} />
                ) : (
                  <Note
                    key={uuidv4()}
                    _id={el._id}
                    content={el.content}
                    title={el.title}
                    imageUrl={el.imageUrl ? `http://localhost:4000${el.imageUrl}` : ''}
                    user={el.user}
                    createdAt={el.createdAt}
                    tags={el.tags}
                  />
                )
              )}
            </ul>
          </div>
        </div>
        <FloatingButton
          link={[{ title: 'Создать заметку', url: '/add-note', icon: <IconPost /> }]}
        />
      </article>
    </>
  );
};

export default Notes;
