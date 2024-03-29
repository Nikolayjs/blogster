import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../../redux/slices/notes';
import { v4 as uuidv4 } from 'uuid';
import Note from '../../Note/Note';
import TextField from '../../UI/TextField';
import { useContent } from '../../../hooks/useContent';
import FloatingButton from '../../UI/FloatingButton';
import IconPost from '../../Icons/IconPost';
import Button from '../../UI/Button';
import { fetchAuthMe } from '../../../redux/slices/auth';
import Skeleton from '../../Note/Skeleton';

const Notes = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { notes } = useSelector((state) => state.notes);
  const isNotesLoading = notes.status === 'loading';
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedContent = useContent(
    notes.items,
    filter.sort,
    filter.filter,
    filter.query
  );

  const handleFetchNotes = () => {
    dispatch(fetchAuthMe(userData?._id));
    dispatch(fetchNotes());
  };

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  if (notes.items.length === 0 || !notes) {
    return (
      <>
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center mt-10">Заметок пока нет</h1>

          <Skeleton />
          <FloatingButton
            link={[{ title: 'Создать статью', url: '/add-note', icon: <IconPost /> }]}
          />
          <button className="success-btn mt-10">Создать заметку</button>
        </div>
      </>
    );
  }

  return (
    <>
      <article className="mx-auto w-full max-w-5xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-10">
        <div className="w-full max-w-full p-4 bg-white border rounded-lg shadow-sm sm:p-8 dark:bg-zinc-800 dark:border-neutral-500">
          <div className="flow-root">
            <TextField
              type="text"
              label="Поиск"
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />
            <ul>
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
                  />
                )
              )}
            </ul>

            <Button className="mt-5" onClick={handleFetchNotes}>
              Загрузить заметки
            </Button>
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
