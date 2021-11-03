import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeFromFavouriteFBStore } from "../api/User";
import { FavouriteItem } from '../Components'
import { addFavouriteById, removeFavouriteById } from '../redux/UserSlice'



class MyFavourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
          localFavouriteList: []
        }
    }

    fetchFavourites() {
      let promiseArray = []
      for (let favouriteItemId of this.props.userFavourites) {
        promiseArray.push(axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favouriteItemId}`).then(mealRes => mealRes.data.meals[0]))
      }

      return Promise.all(promiseArray)

    }

    componentDidMount() {
      if (!this.props.isUserLoggedIn) {
        this.props.history.push('/')
      }

      this.fetchFavourites().then(favouritesInfo => {
        this.setState({ localFavouriteList: favouritesInfo })

      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.userFavourites.length > this.props.userFavourites) {
        this.fetchFavourites().then(favouritesInfo => {
          this.setState({ localFavouriteList: favouritesInfo })
        })
      }
    }

    renderFavouriteContent() {

      const { localFavouriteList = []} = this.state

      if (localFavouriteList.length > 0) {

        return (
          <div
                className="favourites-container"
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center'
                }}
            >
                <Typography>My Favourites</Typography>
                <Grid container display="flex" alignItems="center" direction="row" width='80%'>
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
          <div
            className="search-results-container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center',
              width: '100vw',
              height: '100vh'
            }}>
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