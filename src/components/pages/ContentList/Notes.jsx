import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, fetchTags } from '../../../redux/slices/notes';
import { v4 as uuidv4 } from 'uuid';
import Note from '../../Note/Note';
import TextField from '../../UI/TextField';
import { useContent } from '../../../hooks/useContent';
import FloatingButton from '../../UI/FloatingButton';
import IconPost from '../../Icons/IconPost';
import Button from '../../UI/Button';
import { fetchAuthMe } from '../../../redux/slices/auth';
import { useObserver } from '../../../hooks/useObserver';
import { getPageCount } from '../../../utils/pages';

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
  const lastElement = useRef();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    setPosts(dispatch(fetchNotes(10)));
    dispatch(fetchTags());
    // setPosts([...posts, ...response.data]);
    // const totalCount = response.headers['x-total-count'];
    // setTotalPages(getPageCount(totalCount, 10));
  }, [dispatch]);
  const handleFetchNotes = () => {
    dispatch(fetchAuthMe(userData?._id));
    dispatch(fetchNotes(10));
  };
  console.log(notes.items);
  useObserver(lastElement, page < totalPages, isNotesLoading, () => {
    setPage(page + 1);
  });

  return (
    <>
      <article className="mx-auto w-full max-w-5xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-10">
        <div className="w-full max-w-full p-4 bg-white border rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                    tags={el.tags}
                  />
                )
              )}
            </ul>
            {notes.items.length === 0 ? (
              <Button className="mt-5" onClick={handleFetchNotes}>
                Загрузить статьи
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
        <FloatingButton
          link={[{ title: 'Создать заметку', url: '/add-note', icon: <IconPost /> }]}
        />
        <div ref={lastElement} className="h-5 bg-red-400"></div>
      </article>
    </>
  );
};

export default Notes;
