import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  );
}

export default App;
