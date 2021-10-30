import { Grid } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToFavouriteFBStore, removeFromFavouriteFBStore } from "../api/User";
import { FavouriteItem } from '../Components'
import { addFavouriteById, removeFavouriteById } from '../redux/UserSlice'



class MyFavourites extends Component {

    constructor(props) {
        super(props)

        if (!this.props.isUserLoggedIn) {
          props.history.push('/')
        }

        this.state = {
          localFavouriteList: []
        }
    }

    componentDidMount() {
      let promiseArray = []
      for (let favouriteItemId of this.props.userFavourites) {
        promiseArray.push(axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favouriteItemId}`).then(mealRes => mealRes.data.meals[0]))
      }

      Promise.all(promiseArray).then(favouritesInfo => {
        this.setState({ localFavouriteList: favouritesInfo })

      })
    }

    render() {
        const { localFavouriteList = []} = this.state

        // console.log(this.state.localFavouriteList)

        return (
            <div
                className="favourites-container"
                style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
                }}
            >
                <Grid container display="flex" alignItems="center" direction="column" width='80%'>
                  {
                    localFavouriteList.map(favouriteItem => (
                      <FavouriteItem 
                        key={favouriteItem.idMeal}
                        item={favouriteItem}
                        onPress={() => this.props.history.push(`/meal?id=${favouriteItem.idMeal}`)}
                        removeFromFavourite={() => removeFromFavouriteFBStore(favouriteItem.idMeal)} />

                    ))
                  }


                </Grid>
            </div>
        )
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