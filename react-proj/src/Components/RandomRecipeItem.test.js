import { getRandomRecipe } from "../api/Meal"


describe('random meal fetching operation', () => {

    it('returns random recipe', () => {
        return getRandomRecipe().then(meal => {
            expect(meal).toHaveProperty('strMeal')
        })
    })
})

    