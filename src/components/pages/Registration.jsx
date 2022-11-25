import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import TextField from '../UI/TextField';

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <h1 className="mb-10">Регистрация</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <TextField
              label="Полное имя"
              inputId="fullName"
              errors={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              type="text"
              onChange={(e) =>
                setValue('fullName', e.target.value, {
                  ...register('fullName', { required: 'Укажите имя' }),
                })
              }
            />
            <TextField
              label="E-mail"
              inputId="email"
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
              inputId="password"
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
              <button disabled={!isValid} type="submit" className={'success-btn mt-5'}>
                Зарегистрироваться
              </button>
            </div>
          </form>
        </article>
      </div>
    </main>
  );
};

export default Registration;
