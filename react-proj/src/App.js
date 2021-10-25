import logo from './logo.svg';
import './App.css';
import { Grid, IconButton } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';
import SearchResults from './Views/SearchResults';
import MealInfo from './Views/MealInfo';
import { Menu } from '@mui/icons-material';
import { Dashboard } from './Components';


const AppRoute = ({ exact, path, component: Component }) => {


  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Dashboard />
          <Component {...props} />
        </div>
      )}
    />
  )


}


function App() {
  return (
    <Switch>
      <AppRoute path='/search' component={SearchResults} />
      <AppRoute path='/meal' component={MealInfo} />
      <AppRoute path="/" component={Main} />
    </Switch>
  );
}

export default App;
