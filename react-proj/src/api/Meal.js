import axios from "axios";

export const fetchMeals = (keyword) => { 
    return new Promise((resolve, reject) => {
      axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((searchRes) => {
        if (searchRes.data.meals) {
          resolve(searchRes.data.meals)
        } else {
          resolve([])
        }
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      });
    })
}

export const getRandomRecipe = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(randomRes => {
      resolve(randomRes.data.meals[0])
            // setRandomRecipeInfo(randomRes.data.meals[0])
    }).catch(error => {
      console.log(error)
      reject({})
    })
  })
  
}

export const getMealInfoWithId = id => {

    return new Promise((resolve, reject) => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((mealRes) => {
          console.log(mealRes.data.meals)
          if (mealRes.data.meals != null) {
            const mealData = mealRes.data.meals[0];

            const mealDataEntries = Object.entries(mealData);

            const ingredientQuantities = Object.values(
              mealDataEntries.filter(
                ([key, value]) => key.startsWith("strMeasure") && value !== ""
              )
            );

            const ingredientNames = Object.values(
              mealDataEntries.filter(
                ([key, value]) =>
                  key.startsWith("strIngredient") && value !== ""
              )
            );

            const ingredients = ingredientNames.map((item, index) => {
              return [item[1], ingredientQuantities[index][1]];
            });

            resolve([mealData, ingredients]);
          } 
          else {
            reject([]);
          }
        })
        .catch((error) => {
          console.log(error);
          reject([]);
        });
    });
}

export const fetchUserFavouritesInfo = (userFavourites = []) => {

  let promiseArray = []
  for (let favouriteItemId of userFavourites) {
        promiseArray.push(axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favouriteItemId}`).then(mealRes => mealRes.data.meals[0]))
  }

  return Promise.all(promiseArray)

}