import React from 'react';
import { privateRoutes, publicRoutes } from './router/routes';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/auth';

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
