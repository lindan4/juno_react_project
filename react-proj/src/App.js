import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';
import SearchResults from './Views/SearchResults';
import MealInfo from './Views/MealInfo';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path='/search' component={SearchResults} />
      <Route path='/meal' component={MealInfo} />
    </Switch>
  );
}

export default App;
