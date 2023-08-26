import { useState } from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import AddCreator from './pages/addcreator.jsx';
import EditCreator from './pages/editcreator.jsx';
import ShowCreators from './pages/showcreators.jsx';
import ViewCreator from './pages/viewcreator.jsx';
import './App.css'

const routes = [
  {
    path: '/',
    element: <ShowCreators/>
  },
  {
    path: '/view/:id',
    element: <ViewCreator/>
  },
  {
    path: '/edit/:id',
    element: <EditCreator/>
  },
  {
    path: '/new',
    element: <AddCreator/>
  },
];

function Main() {
  const route = useRoutes(routes);

  return (
    <div className="app">
      {route}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;