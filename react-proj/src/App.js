import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';
import SearchResults from './Views/SearchResults';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path='/searchresults' component={SearchResults} />
    </Switch>
  );
}

export default App;
