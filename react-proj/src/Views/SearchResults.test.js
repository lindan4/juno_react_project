import ShallowRenderer from 'react-test-renderer/shallow'
import { fetchMeals } from '../api/Meal';
import SearchResults from './SearchResults';



describe('fetching search results', () => {
    it ('fetches shakshuka when query is \'shakshuka\'', () => {
        // jest.mock('./SearchResults')
        return fetchMeals('shakshuka').then(data => {

            const mealName = data[0].strMeal
            expect(mealName).toBe('Shakshuka')
        })

    })
    

    
})