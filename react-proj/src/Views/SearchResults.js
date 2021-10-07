import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { Component } from 'react'
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
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=ha').then(searchRes => {
            this.setState({ searchResults: searchRes.data.meals })
        })
    }


    render() {
        return (
            <div className="search-results-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid>
                    <Grid item>
                        <Typography>There are {this.state.searchResults.length} results</Typography>
                    </Grid>
                    <Grid container
                        // spacing={3}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        width='60%'>
                        {
                            this.state.searchResults.map(searchResultItem => <RecipeItem item={searchResultItem} />)
                        }

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SearchResults