/*eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/posts';
import Skeleton from '../Note/Skeleton';
import Button from '../UI/Button';
import axios from '../../axios';
import TextField from '../UI/TextField';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const [myPosts, setMyPosts] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [updateAvatar, setUpdateAvatar] = React.useState(false);
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  React.useEffect(() => {
    dispatch(fetchPosts());
    setMyPosts(posts.items.filter((post) => userData._id === post.user._id));
    fetchPosts();
  }, [dispatch]);

  React.useEffect(() => {
    axios.get(`/auth/me`).then(({ data }) => {
      setFullName(data.fullName);
      setEmail(data.email);
      setAvatarUrl(data.avatarUrl);
      setAbout(data.about);
    });
  }, []);

  const handleFetchPosts = () => {
    dispatch(fetchPosts());
    setMyPosts(posts.items.filter((post) => userData._id === post.user._id));
  };

  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleChangeAvatar = async (event) => {
    setUpdateAvatar(!updateAvatar);
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);

      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };
  const onClickRemove = () => {
    setUpdateAvatar(!updateAvatar);
    setAvatarUrl(avatarUrl);
  };

  const onSubmit = async () => {
    try {
      const fields = {
        fullName,
        email,
        about,
        avatarUrl,
        // skills
      };
      isEditing ? await axios.patch(`/user/${id}`, fields) : await axios.post('/posts', fields);
      setIsEdit(!isEdit);
    } catch (err) {
      console.warn(err);
      alert('Ошибка');
    }
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
      <div className="flex max-xl:inline-block justify-center m-auto px-4 mx-auto w-full">
        {isEdit ? (
          <>
            <div className="py-4 px-3 ">
              <img
                onClick={() => inputFileRef.current.click()}
                className="w-16 h-16 "
                src={`http://localhost:4000${avatarUrl}`}
                alt="avatar"
              />
              <input ref={inputFileRef} type="file" onChange={handleChangeAvatar} hidden />
              {updateAvatar && (
                <>
                  <Button className="mb-2" onClick={onClickRemove}>
                    Удалить
                  </Button>
                </>
              )}
            </div>
            <article className="w-3/6 max-xl:w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-5">
              <div className="inline-block min-w-full">
                <TextField
                  inputId="name"
                  id="name"
                  label={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="w-auto">
                <h3 className="font-bold mb-3">О себе</h3>
                <TextField
                  inputId="about"
                  id="about"
                  label={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="w-auto">
                <h3 className="font-bold mb-2">Email adress</h3>
                <TextField
                  inputId="email"
                  id="email"
                  label={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className="font-bold mb-2">Software Skills</h3>
                <TextField inputId="skills" id="skills" label="Skills" />
              </div>
              <p className="text-lg font-bold">Дата регистрации: {getDate(userData.createdAt)}</p>
              <div className="w-auto">
                <Button onClick={onSubmit}>Сохранить изменения</Button>
                <Button onClick={handleEdit}>Отмена</Button>
              </div>
              <h3 className="mt-5">Мои статьи:</h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-5">
                {myPosts.map((post) => (
                  <li
                    key={post._id}
                    className="p-2 pb-3 rounded-sm sm:pb-4 hover:shadow-lg dark:hover:bg-slate-700"
                  >
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
                          <p className="text-lg font-normal text-gray-900 truncate dark:text-white">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
          </>
        ) : (
          <>
            <div className="py-4 px-3 ">
              <img
                className="w-16 h-16 rounded-full"
                src={`http://localhost:4000${avatarUrl}`}
                alt="avatar"
              />
            </div>
            <article className="w-3/6 max-xl:w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-5">
              <div className="inline-block min-w-full">
                <h3 className="font-bold mb-5">{fullName}</h3>
              </div>
              <div className="w-auto">
                <h3 className="font-bold">О себе</h3>
                <p className="text-lg font-semibold">{about}</p>
              </div>
              <p className="text-lg font-bold">Дата регистрации: {getDate(userData.createdAt)}</p>
              <div className="w-auto">
                <Button onClick={handleEdit}>Редактировать</Button>
              </div>
              <h3 className="mt-5">Мои статьи:</h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-5">
                {myPosts.map((post) => (
                  <li
                    key={post._id}
                    className="p-2 pb-3 rounded-sm sm:pb-4 hover:shadow-lg dark:hover:bg-slate-700"
                  >
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
                          <p className="text-lg font-normal text-gray-900 truncate dark:text-white">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
              <p>{email}</p>
              <h3 className="font-bold">Software Skills</h3>
              <p>{email}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default UserInfo;
