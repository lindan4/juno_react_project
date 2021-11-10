import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserFavouritesInfo } from '../api/Meal';
import { removeFromFavouriteFBStore } from "../api/User";
import { FavouriteItem } from '../Components'
import { addFavouriteById, removeFavouriteById } from '../redux/UserSlice'
import styles from './MyFavourites.module.css'



class MyFavourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
          localFavouriteList: []
        }
    }

    componentDidMount() {
      let authLocal = localStorage.getItem('authUser')
      if (!authLocal) {
        this.props.history.push('/')
      }

      fetchUserFavouritesInfo(this.props.userFavourites || []).then(favouritesInfo => {
        this.setState({ localFavouriteList: (favouritesInfo.length > 0) ? favouritesInfo : [] })
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.userFavourites.length !== this.props.userFavourites.length) {
        fetchUserFavouritesInfo(this.props.userFavourites || []).then(favouritesInfo => {
          this.setState({ localFavouriteList: favouritesInfo })
        })
      }
    }

    renderFavouriteContent() {

      const { localFavouriteList = []} = this.state

      if (localFavouriteList.length > 0) {

        return (
          <div className={styles.favouritesOuterContainer}>
                <h1>My Favourites</h1>
                <Grid container display="flex" alignItems="center" direction="row" width='80%' marginTop={3}>
                  {
                    localFavouriteList.map(favouriteItem => (
                      <Grid item key={favouriteItem.idMeal} paddingRight={5}>
                        <FavouriteItem 
                          item={favouriteItem}
                          onPress={() => this.props.history.push(`/meal?id=${favouriteItem.idMeal}`)}
                          removeFromFavourite={event => {
                            event.stopPropagation()
                            removeFromFavouriteFBStore(favouriteItem.idMeal)
                          }} />
                      </Grid>

                    ))
                  }
                </Grid>
          </div>

        )
      }
      else {
        return (
          <div className={styles.noFavouritesOuterContainer}>
              <h3>You appear to have no favourites. Search for recipes and add them to your favourites to view them here.</h3> 
            </div>
        )
      }
    }



    render() {
        return this.renderFavouriteContent()
    }



    
}

const mapStateToProps = state => {
    const { userFavourites, isUserLoggedIn } = state.user

    return { userFavourites, isUserLoggedIn }
}

const mapDispatchToProps = {
    addFavouriteById,
    removeFavouriteById
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavourites)