import { Card, CardActionArea, CardContent, Paper, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getRandomRecipe } from "../api/Meal";
import itemStyles from './RandomRecipeItem.module.css'

const RandomRecipeItem = ({ onItemClick = () => {} }) => {
  
  const [randomRecipeInfo, setRandomRecipeInfo] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getRandomRecipe().then(meal => {
      setRandomRecipeInfo(meal)
      setLoading(false)
    })
  }, [])

  const renderContent = () => {
    if (!loading) {
      return (
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
      )
    }
    else {
        return <CircularProgress sx={{ paddingTop: 30, paddingBottom: 30 }} />
    }
  }

  return (
    <Paper component={Card} elevation={1} onClick={() => onItemClick(randomRecipeInfo.idMeal)} sx={styles.paperStyle}>
      {renderContent()}
    </Paper>
  );
}

const styles = {
  cardContentStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  paperStyle: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    borderRadius: 10
  }
}

export { RandomRecipeItem }
