import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';
import Navbar from './components/UI/Navbar';
import AppRouter from './AppRouter';
import { ThemeProvider } from './theme/ThemeContext';
import Background from './theme/Background';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

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
