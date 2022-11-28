import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import Navbar from './components/UI/Navbar';
import AppRouter from './AppRouter';
import { ThemeProvider } from './theme/ThemeContext';
import Background from './theme/Background';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Background>
          <AppRouter />
        </Background>
      </ThemeProvider>
    </>
  );
}

export default App;
