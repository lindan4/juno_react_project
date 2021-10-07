import React, { Component } from 'react'
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
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
                            console.log(value)
                            this.props.history.push('/searchresults')
                        }}/>

                    
                    </Grid>
                    <Grid item>
                        {/* Navigation pane */}
                    </Grid>
                    <Grid item>
                        {/* Random featured recipe */}
                        <RandomRecipeItem />

                    </Grid>
                    <Grid item>
                        {/* Main page content */}
                    </Grid>
                </Grid>
            </div>
        )
    }

}


export default Main