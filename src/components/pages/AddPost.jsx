import axios from '../../axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import Button from '../UI/Button';
import TextField from '../UI/TextField';
import SimpleMdeReact from 'react-simplemde-editor';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';

const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState('');
  const [, setIsLoading] = React.useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);
  const [previewUpdate, setPreviewUpdate] = React.useState(false);
  const ref = React.useRef();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemove = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback(
    (value) => {
      setContent(value);
    },
    [content]
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        description,
        content,
        imageUrl,
        tags: tags.split(','),
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
      });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст',
      status: ['lines', 'words'],
      sideBySideFullscreen: false,
      previewRender() {
        return ReactDOMServer.renderToString(<ReactMarkdown children={content} />);
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <article className="mx-auto w-full max-w-5xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-10">
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <img
          src={`http://localhost:4000${imageUrl}`}
          className="w-full mb-10"
          alt="title"
          onClick={() => inputFileRef.current.click()}
        />
      )}

      <div className="flex flex-col p-5 justify-center items-center mt-10 Code">
        <TextField
          label="Заголовок"
          className="mt-5 text-4xl"
          inputId="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Описание"
          className="mt-5 text-4xl"
          inputId="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Теги"
          inputId="tags"
          className="mt-5 text-1xl"
          value={tags}
          onChange={(e) => setTags(e.target.value.replace(' ', ''))}
        />
        <div className="flex flex-row w-full justify-center mb-">
          <Button className="mr-3" onClick={() => inputFileRef.current.click()}>
            Загрузить превью
          </Button>
          <Button onClick={onClickRemove}>Удалить превью</Button>
        </div>
        <SimpleMdeReact value={content} onChange={onChange} options={options} className="w-full" />
        {content.length > 0 && (
          <div className="flex">
            <Button onClick={onSubmit}>{isEditing ? 'Сохранить' : 'Опубликовать'}</Button>
            <Link className="ml-3" to={`/notes/${id}`}>
              <Button>Отмена</Button>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default AddPost;
