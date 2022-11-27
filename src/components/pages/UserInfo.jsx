import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuthMe } from '../../redux/slices/auth';
import { fetchPosts } from '../../redux/slices/posts';
import Skeleton from '../Note/Skeleton';
import PostSkeleton from '../Post/PostSkeleton';
import Button from '../UI/Button';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const [myPosts, setMyPosts] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchPosts());
    setMyPosts(posts.items.filter((post) => userData._id === post.user._id));
  }, [dispatch]);

  const handleFetchPosts = () => {
    dispatch(fetchPosts());
    setMyPosts(posts.items.filter((post) => userData._id === post.user._id));
  };

  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };
  if (posts.items.length === 0) {
    return (
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-2xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <Skeleton />
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-w-4xl mx-auto">
      <div className="flex max-xl:inline-block justify-center self-center px-4 mx-auto w-full">
        <div className="py-4 px-3 ">
          <img className=" rounded-full" src={`${userData.avatarUrl}`} />
        </div>
        <article className="w-3/6 max-xl:w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-5">
          <div className="inline-block min-w-full">
            <h3 className="font-bold mb-5">{userData.fullName}</h3>
          </div>
          <div className="w-auto">
            <h3 className="font-bold">О себе</h3>
            <p className="text-lg font-semibold">
              Markdown is a lightweight markup language that you can use to add formatting elements
              to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of
              the world’s most popular markup languages.
            </p>
            <h3 className="font-bold">Социальные сети</h3>
            <p className="text-lg font-semibold">
              Markdown is a lightweight markup language that you can use to add formatting elements
              to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of
              the world’s most popular markup languages.
            </p>
          </div>
          <p className="text-lg font-bold">Дата регистрации: {getDate(userData.createdAt)}</p>
          <div className="w-auto">
            <Button className="bg-blue-900 border-0 dark:hover:bg-blue-800 dark:active:bg-blue-700">
              Редактировать
            </Button>
          </div>
          <h3 className="mt-5">Мои статьи:</h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-5">
            {myPosts.map((post) => (
              <li key={post._id} className="p-2 pb-3 rounded-sm sm:pb-4 hover:bg-slate-700">
                <Link to={`/posts/${post._id}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`http://localhost:4000${post.imageUrl}`}
                        alt={`${post.title}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                        {post.title}
                      </p>
                      <p className="text-lg text-gray-500 truncate dark:text-gray-400">
                        {post.description}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {getDate(post.createdAt)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {myPosts.length === 0 ? (
            <Button className="mt-5" onClick={handleFetchPosts}>
              Загрузить статьи
            </Button>
          ) : (
            ''
          )}
        </article>
        <div className="py-4 px-3">
          <h3 className="font-bold">Email adress</h3>
          <p>{userData.email}</p>
          <h3 className="font-bold">Software Skills</h3>
          <p>{userData.email}</p>
        </div>
      </div>
    </main>
  );
};

export default UserInfo;
