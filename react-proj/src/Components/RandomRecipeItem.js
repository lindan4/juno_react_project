import { Card, CardActionArea, CardContent, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
import { getRandomRecipe } from "../api/Meal";
import itemStyles from './RandomRecipeItem.module.css'

const RandomRecipeItem = ({ onItemClick = () => {} }) => {
  
  const [randomRecipeInfo, setRandomRecipeInfo] = useState({});

  useEffect(() => {
    getRandomRecipe().then(meal => {
      setRandomRecipeInfo(meal)
    })
  }, [])

  return (
    <Paper component={Card} elevation={1} onClick={() => onItemClick(randomRecipeInfo.idMeal)}>
      <CardActionArea>
        <CardContent sx={styles.cardContentStyle}>
          <section className={itemStyles.randomRecipeTitleSection}>
            <Typography variant="h4" component="p">
              Featured Recipe: <br /> {randomRecipeInfo.strMeal}
            </Typography>
          </section>
          <section className="random-recipe-content">
            <img
              src={randomRecipeInfo.strMealThumb}
              alt='Picture of random food dish'
              className={itemStyles.randomRecipeImage}
            />
          </section>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

const styles = {
  cardContentStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export { RandomRecipeItem }
