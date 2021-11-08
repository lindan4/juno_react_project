import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { getMealInfoWithId } from "../api/Meal";
import { addToFavouriteFBStore, removeFromFavouriteFBStore } from "../api/User";
import { addFavouriteById, removeFavouriteById } from '../redux/UserSlice'

class MealInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealInfo: {},
      mealIngredients: [],
      isFavourited: false
    };

    this.addToFavourite = this.addToFavourite.bind(this)
    this.removeFromFavourite = this.removeFromFavourite.bind(this)
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const id = urlParams.get("id");

    getMealInfoWithId(id).then(([mealData, ingredients]) => {
      this.setState({ mealInfo: mealData, mealIngredients: ingredients })
    }).catch(() => this.setState({ mealInfo: [], mealIngredients: [] }))

  }

  renderIngredients(ingredients = []) {
    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      return (
        <ul>
          {ingredients.map(([name, quantity]) => {
            return (
              <li>
                {quantity} - {name}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  renderSteps() {

    if (this.state.mealInfo.strInstructions !== undefined) {
      const stepsAsString = JSON.stringify(this.state.mealInfo.strInstructions)
      const steps = stepsAsString.substring(1, stepsAsString.length - 1).split('\\r\\n').filter(item => item !== '')

      return steps.map((item, index) => {
        return <p>{index + 1}. {item}</p>        
      });

    }
    
  }

  addToFavourite() {
    const mealId = this.state.mealInfo.idMeal

    addToFavouriteFBStore(mealId).then(() => {
      this.props.addFavouriteById(mealId)
      this.setState({ isFavourited: true })
    })


  }

  removeFromFavourite() {
    const mealId = this.state.mealInfo.idMeal

    removeFromFavouriteFBStore(mealId).then(() => {
      this.props.removeFavouriteById(mealId)
      this.setState({ isFavourited: false })
    })
  }

  renderFavouriteButton() {
    const mealId = this.state.mealInfo.idMeal

    if (this.props.userFavourites.includes(mealId)) {
      return (
        <IconButton disabled={!this.props.isUserLoggedIn} onClick={this.removeFromFavourite}>
          <Favorite sx={{ color: 'pink' }} />
        </IconButton>
      )
    }
    else {
      return (
        <IconButton disabled={!this.props.isUserLoggedIn} onClick={this.addToFavourite}>
          <FavoriteOutlined  sx={{ color: 'none' }}/>
        </IconButton>
      )
    }
  }

  render() {

    console.log(this.props.userFavourites)

    return (
      <div
        className="search-results-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Grid container display="flex" alignItems="center" direction="column" width='80%'>
          <Grid item>
            <img
              src={this.state.mealInfo.strMealThumb}
              alt={`Picture of ${this.state.mealInfo.strMeal}`}
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "100%",
              }}
            />
          </Grid>
          <Grid item sx={{ paddingBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h2>{this.state.mealInfo.strMeal}</h2>
                {this.renderFavouriteButton()}
            </div>
            <div>
              <div>
                <h6>Ingredients</h6>
                {this.renderIngredients(this.state.mealIngredients)}
              </div>
              <div>
                <h6>Steps</h6>
                {this.renderSteps()}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(MealInfo);
