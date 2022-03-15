import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AdminPage from './components/Admin/AdminPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/admin'>
          <AdminPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
