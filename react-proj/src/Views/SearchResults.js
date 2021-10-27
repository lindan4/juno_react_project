import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { Component } from 'react'
import { useParams } from 'react-router'
import { RecipeItem } from '../Components'


class SearchResults extends Component {

    constructor(props) {
        super(props)


        this.state = {
            resultsLoading: false,
            searchResults: []
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const keyword = urlParams.get('keyword')
        console.log(keyword)
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`).then(searchRes => {
            if (searchRes.data.meals) {
                this.setState({ searchResults: searchRes.data.meals })
            }
            else {
                this.setState({ searchResults: [] })
            }
        }).catch(error => console.log(error))
    }


    render() {
        return (
            <div className="search-results-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid container display='flex' alignItems='center' direction="column">
                    <Grid item>
                        <Typography>There are {(this.state.searchResults) ? this.state.searchResults.length : 0} results</Typography>
                    </Grid>
                    <Grid container
                        // spacing={3}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        width='60%'>
                        {
                            this.state.searchResults.map(searchResultItem => <RecipeItem key={searchResultItem.idMeal} item={searchResultItem} onItemClick={() => {
                                console.log('Clicked')
                                this.props.history.push(`/meal?id=${searchResultItem.idMeal}`)
                            }} />)
                        }

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SearchResults