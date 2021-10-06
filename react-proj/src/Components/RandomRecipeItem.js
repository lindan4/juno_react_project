import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'

const RandomRecipeItem = () => {
  
  const [randomRecipeInfo, setRandomRecipeInfo] = useState({});

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(randomRes => {
            setRandomRecipeInfo(randomRes.data.meals[0])
        })
  }, [])

  return (
    <Paper elevation={1} sx={{ display: "flex" }}>
      <section
        className="random-recipe-title-section"
        style={{ display: "flex", flex: 1, borderRadius: 10 }}
      >
        <Typography variant="h3" component="p">
          Random Recipe of the Day: <br /> {randomRecipeInfo.strMeal}
        </Typography>
      </section>
      <section className="random-recipe-content">
        <img
          src={randomRecipeInfo.strMealThumb}
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: "100%",
          }}
        />
      </section>
    </Paper>
  );
}

export { RandomRecipeItem }
