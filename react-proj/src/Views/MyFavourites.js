import { CircularProgress, Grid } from '@mui/material';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserFavouritesInfo } from '../api/Meal';
import { removeFromFavouriteFBStore } from "../api/User";
import { FavouriteItem } from '../Components'
import styles from './MyFavourites.module.css'
import { Helmet } from 'react-helmet'



class MyFavourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
          localFavouriteList: [],
          loading: false
        }
    }

    componentDidMount() {
      let authLocal = localStorage.getItem('authUser')
      if (!authLocal) {
        this.props.history.push('/')
      }

      this.setState({ loading: true })
    
      fetchUserFavouritesInfo(this.props.userFavourites || []).then(favouritesInfo => {
        this.setState({ localFavouriteList: (favouritesInfo.length > 0) ? favouritesInfo : [], loading: false })
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.userFavourites.length !== this.props.userFavourites.length) {
        this.setState({ loading: true })
        fetchUserFavouritesInfo(this.props.userFavourites || []).then(favouritesInfo => {
          this.setState({ localFavouriteList: (favouritesInfo.length > 0) ? favouritesInfo : [], loading: false })
        })
      }
    }

    renderFavouriteHelmet() {
      return (
        <Helmet>
          <title>My Favourites</title>
        </Helmet>
      )
    }


    renderLoadingHelmet() {
      return (
        <Helmet>
          <title>Loading...</title>
        </Helmet>
      )
    }


    renderFavouriteContent() {

      if (!this.state.loading) {
        if (this.state.localFavouriteList.length > 0) {
          return (
            <div className={styles.favouritesOuterContainer}>
                  {this.renderFavouriteHelmet()}
                  <h1>My Favourites</h1>
                  <Grid container display="flex" direction="row" width='80%' marginTop={3}>
                    {
                      this.state.localFavouriteList.map(favouriteItem => {
                        console.log(Object.keys(favouriteItem))
                        return (
                          <Grid
                            item
                            key={favouriteItem.strMeal}
                            paddingRight={3}
                            paddingBottom={3}

                          >
                            <FavouriteItem
                              item={favouriteItem}
                              onPress={() =>
                                this.props.history.push(
                                  `/meal?id=${favouriteItem.idMeal}`
                                )
                              }
                              removeFromFavourite={(event) => {
                                event.stopPropagation();
                                removeFromFavouriteFBStore(
                                  favouriteItem.idMeal
                                );
                              }}
                            />
                          </Grid>
                        );
                        
  
                        })
                    }
                  </Grid>
            </div>
          )
        }
        else {
          return (
            <div className={styles.noFavouritesOuterContainer}>
                {this.renderFavouriteHelmet()}
                <h3>You appear to have no favourites. Search for recipes and add them to your favourites to view them here.</h3> 
              </div>
          )
        }
      }
      else {
        return (
          <div className={styles.favouritesLoadingContainer}>
            {this.renderLoadingHelmet()}
            <CircularProgress />
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

export default connect(mapStateToProps)(MyFavourites)