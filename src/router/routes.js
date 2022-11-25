import FullNote from '../components/pages/FullNote';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Notes from '../components/pages/Notes';
import Registration from '../components/pages/Registration';
import AddNote from '../components/pages/AddNote';

export const publicRoutes = [
  { path: '/', element: Home, url: '/', name: 'Главная' },
  { path: '/login', element: Login, url: '/login', name: 'Логин' },
  { path: '/register', element: Registration, url: '/register', name: 'Регистрация' },
  { path: '/posts/:id', element: FullNote, url: '/posts/:id', name: 'Статья' },
];

export const privateRoutes = [
  { path: '/', element: Home, url: '/', name: 'Главная' },
  { path: '/notes', element: Notes, url: '/notes', name: 'Заметки' },
  { path: '/notes/:id', element: FullNote, url: '/notes/:id', name: 'Заметка' },
  {
    path: '/notes/:id/edit',
    element: AddNote,
    url: '/notes/:id/edit',
    name: 'Редактировать заметку',
  },
  {
    path: '/add-note',
    element: AddNote,
    url: '/add-note',
    name: 'Созать заметку',
  },
  { path: '/posts/:id', element: FullNote, url: '/posts/:id', name: 'Статья' },
];
