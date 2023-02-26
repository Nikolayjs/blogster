import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuth } from '../../redux/slices/auth';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '../UI/TextField';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      navigate('/');
    }
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <h1 className="mb-10">Вход</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <TextField
              label="E-mail"
              errors={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              type="email"
              onChange={(e) =>
                setValue('email', e.target.value, {
                  ...register('email', { required: 'Укажите почту' }),
                })
              }
            />
            <TextField
              label="Пароль"
              errors={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type="password"
              onChange={(e) =>
                setValue('password', e.target.value, {
                  ...register('password', { required: 'Укажите пароль' }),
                })
              }
            />
            <div className="flex flex-row justify-between">
              <button type="submit" className={'success-btn mt-5'}>
                Войти
              </button>
              <button type="submit" className={'success-btn mt-5'}>
                <Link to="/register">Зарегистрироваться</Link>
              </button>
            </div>
          </form>
        </article>
      </div>
    </main>
  );
};

export default Login;
