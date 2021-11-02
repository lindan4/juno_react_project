import { Card, CardActionArea, CardContent, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'

const RandomRecipeItem = ({ onItemClick = () => {} }) => {
  
  const [randomRecipeInfo, setRandomRecipeInfo] = useState({});

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(randomRes => {
            setRandomRecipeInfo(randomRes.data.meals[0])
        })
  }, [])

  return (
    <Paper component={Card} elevation={1} sx={{ display: "flex" }} onClick={() => onItemClick(randomRecipeInfo.idMeal)}>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <section
            className="random-recipe-title-section"
            style={{ display: "flex", flex: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }}
          >
            <Typography variant="h4" component="p">
              Featured Recipe: <br /> {randomRecipeInfo.strMeal}
            </Typography>
          </section>
          <section className="random-recipe-content">
            <img
              src={randomRecipeInfo.strMealThumb}
              alt='Picture of random food dish'
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "100%",
              }}
            />
          </section>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export { RandomRecipeItem }
