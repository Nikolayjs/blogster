import axios from '../../axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import Button from '../UI/Button';
import TextField from '../UI/TextField';
import SimpleMdeReact from 'react-simplemde-editor';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';

const AddNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      console.log(data.url);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemove = () => {
    setImageUrl('');
  };
  const onChange = React.useCallback((value) => {
    setContent(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        content,
        imageUrl,
        tags: tags.split(','),
      };
      const { data } = isEditing
        ? await axios.patch(`/notes/${id}`, fields)
        : await axios.post('/notes', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/notes/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/notes/${id}`).then(({ data }) => {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст',
      status: false,
      status: ['lines', 'words'],
      sideBySideFullscreen: true,
      previewRender() {
        return ReactDOMServer.renderToString(<ReactMarkdown children={content} />);
      },
      autosave: {
        uniqueId: uuidv4(),
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <article className="mx-auto w-full max-w-5xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-10">
      <Button className="mr-3 mb-2 w-1/4" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button className="mb-2" onClick={onClickRemove}>
            Удалить
          </Button>
          <img src={`http://localhost:4000${imageUrl}`} className="w-full mb-10" />
        </>
      )}

      <div className="flex flex-col justify-center items-center mt-10">
        <TextField
          label="Заголовок"
          style="mt-5 text-4xl"
          inputId="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Теги"
          inputId="tags"
          style="mt-5 text-1xl"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <SimpleMdeReact value={content} onChange={onChange} options={options} className="w-full" />
        <div className="flex">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить' : 'Опубликовать'}</Button>
          <Link className="ml-3" to={`/notes/${id}`}>
            <Button>Отмена</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AddNote;
