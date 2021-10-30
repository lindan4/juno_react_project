import logo from './logo.svg';
import './App.css';
import { Grid, IconButton } from '@mui/material';
import { Route, Switch } from 'react-router';
import Main from './Views/Main';
import SearchResults from './Views/SearchResults';
import MealInfo from './Views/MealInfo';
import { Menu } from '@mui/icons-material';
import { Dashboard } from './Components';
import store from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import app from './firebase';
import { clearUserState, logOnUser, setReduxName, setUserFavourites, setUserId } from './redux/UserSlice';
import MyFavourites from './Views/MyFavourites';



const AppRoute = ({ exact, path, component: Component }) => {


  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Dashboard history={props.history} />
          <Component {...props} />
        </div>
      )}
    />
  )


}


function App() {
  const auth = getAuth(app)
  const db = getFirestore(app)

  const [authUser, setAuthUser] = useState(null)


  //Auth user listener
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && !user.isAnonymous) {
        store.dispatch(setUserId(user.uid))
        store.dispatch(logOnUser())
      }
      else {
        store.dispatch(clearUserState())
      }
      setAuthUser(user)
    })

    return () => unsubscribe()

  }, [])


  //User info listener
  useEffect(() => {

    if (authUser && !authUser.isAnonymous) {

      const userSubscribe = onSnapshot(doc(db, 'users', authUser.uid), userData => {
        if (userData.exists()) {
          store.dispatch(setReduxName(userData.data().name))
          store.dispatch(setUserFavourites(userData.data().favourites || []))
        }
      })

      return () => userSubscribe()
    }
    else {
      return
    }

  }, [authUser])



  return (
    <Switch>
      <AppRoute path='/search' component={SearchResults} />
      <AppRoute path='/meal' component={MealInfo} />
      <AppRoute path='/favourites' component={MyFavourites} />
      <AppRoute path="/" component={Main} />
    </Switch>
  );
}

export default App;
