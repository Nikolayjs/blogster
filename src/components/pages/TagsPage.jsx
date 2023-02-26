import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/posts';
import Button from '../UI/Button';

const TagsPage = () => {
  const tag = useParams();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  const [newTag, setNewTag] = React.useState(tag.id);
  const [tagArray, setTagArray] = React.useState([]);
  const [uniqueTags, setUniqueTags] = React.useState([]);
  const [tagList, setTagList] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const getArray = () => {
    let array = [];
    for (let el of posts?.items) {
      if (el.tags.includes(newTag)) {
        array.push(el);
        setTagArray(array);
      }
    }
  };
  React.useEffect(() => {
    getArray();
  }, [newTag]);

  const handleTag = (tag) => {
    setNewTag(tag);
    navigate(`/tags/${tag}`);
    setTagList(!tagList);
  };

  const handleList = () => {
    navigate('/tags/all-tags');
    setTagList(!tagList);
  };

  React.useEffect(() => {
    if (tag.id === 'all-tags') {
      let array = [];
      for (let el of posts?.items) {
        array.push(el.tags);
      }
      const uniqueArr = array
        .flat(Infinity)
        .map((arr) => {
          return { count: 1, name: arr };
        })
        .reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count;
          return a;
        }, {});
      setUniqueTags(uniqueArr);
      setTagList(true);
    }
  }, [tag.id]);

  if (posts.items.length === 0) {
    return <h1 className="text-center mt-20">Загрузка...</h1>;
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 relative">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          {!tagList ? (
            <>
              <Button onClick={handleList} className="border-none">
                Показать все теги
              </Button>
              {tagArray.map((tag) => (
                <div
                  key={uuidv4()}
                  className="flex flex-col p-5 items-center mt-2 bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-none dark:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer"
                >
                  <img
                    className="object-cover w-full rounded-t-lg max-h-max md:h-auto md:w-48 md:rounded-none "
                    src={`http://localhost:4000${tag.imageUrl}`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <Link to={`/posts/${tag._id}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {tag.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {tag.description}
                      </p>
                    </Link>
                    <div className="flex flex-row">
                      {tag.tags.map((t) => (
                        <span
                          key={uuidv4()}
                          id={t}
                          className="bg-gradient-to-bl from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white inline-flex items-center justify-center px-4 py-1 mb-2 rounded-md mr-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h1>Все теги</h1>
              {Object.entries(uniqueTags).map((tag) => {
                return (
                  <>
                    <span
                      id={tag}
                      onClick={() => handleTag(tag[0])}
                      key={uuidv4()}
                      className="cursor-pointer bg-gradient-to-bl from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white inline-flex items-center justify-center px-4 py-1 mb-2 rounded-md mr-2"
                    >
                      {`${tag[0]}`}
                      <span
                        key={uuidv4()}
                        className="bg-indigo-700 text-white inline-flex items-center justify-center rounded-md ml-2 px-3"
                      >
                        {tag[1]}
                      </span>
                    </span>
                  </>
                );
              })}
            </>
          )}
        </article>
      </div>
    </main>
  );
};

export default TagsPage;
