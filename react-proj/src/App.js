import logo from './logo.svg';
import './App.css';
import { Grid, IconButton } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';
import SearchResults from './Views/SearchResults';
import MealInfo from './Views/MealInfo';
import { Menu } from '@mui/icons-material';


const renderAppRoute = ({ exact, path, component: Component }) => {


  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <IconButton edge='start' className={drawThemes.menuButton} color='black' aria-label="menu" onClick={() => setShowDrawer(true)}>
            <Menu style={{ color: 'black' }} />
          </IconButton>
          
          <Component {...props} />
        </div>
      )}
    />
  )


}


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
