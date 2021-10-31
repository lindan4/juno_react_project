import React, { Component } from 'react'
import { Grid } from '@mui/material';
import { SearchBar, RandomRecipeItem } from '../Components';

class Main extends Component {

    constructor(props) {
        super(props)        
    }

    render() {
        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid container spacing={1} width='80%' justifyContent='center' direction="column">
                    <Grid item>
                        <h1>The Recipe Archive</h1>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {/* Search bar */}
                        <SearchBar onSearchPress={value => {
                            this.props.history.push(`/search?keyword=${value}`)
                        }}/>
                    </Grid>
                    <Grid item>
                        {/* Random featured recipe */}
                        <RandomRecipeItem onItemClick={id => this.props.history.push(`/meal?id=${id}`)} />

                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Main