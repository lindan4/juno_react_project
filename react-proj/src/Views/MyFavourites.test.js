import { fetchUserFavouritesInfo } from "../api/Meal"


describe('favourite fetching operation', () => {
    it('fetches favourite recipes', () => {
        let dummyUserFavouriteList = ['52995', '53012', '52977']

        fetchUserFavouritesInfo(dummyUserFavouriteList).then(favourites => {
            
        })
    })
})