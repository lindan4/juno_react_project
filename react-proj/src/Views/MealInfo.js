import { Grid } from "@mui/material";
import axios from "axios";
import { Component } from "react";

class MealInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealInfo: {},
      mealIngredients: [],
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const id = urlParams.get("id");

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((mealRes) => {
        const mealData = mealRes.data.meals[0];

        const mealDataEntries = Object.entries(mealData);

        const ingredientQuantities = Object.values(
          mealDataEntries.filter(([key, value]) => key.startsWith("strMeasure"))
        );
        const ingredientNames = Object.values(
          mealDataEntries.filter(([key, value]) =>
            key.startsWith("strIngredient")
          )
        );

        const ingredients = ingredientNames.map((item, index) => {
          return [item, ingredientQuantities[index]];
        });

        this.setState({ mealInfo: mealData, mealIngredients: ingredients });
      });
  }

  renderIngredients(ingredients = []) {
    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      return (
        <ul>
          {ingredients.map(([name, quantity]) => {
            return (
              <li>
                {quantity} {name}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  renderSteps() {
    const steps = this.state.mealInfo.strInstructions;

    return <p>{steps}</p>;
  }

  render() {
    return (
      <div
        className="search-results-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Grid container display="flex" alignItems="center" direction="column">
          <Grid item>
            <img
              src={mealInfo.strMealThumb}
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "100%",
              }}
            />
          </Grid>
          <Grid item>
            <h2>{mealInfo.strMeal}</h2>
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

export default MealInfo;
