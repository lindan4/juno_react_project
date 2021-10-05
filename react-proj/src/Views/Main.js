import React, { Component } from 'react'
import { Grid, IconButton, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../Components/SearchBar';


class Main extends Component {

    constructor(props) {
        super(props)
        

        this.state = {
            searchInput: ''
        }

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
                        <SearchBar onSearchPress={value => console.log(value)}/>

                    
                    </Grid>
                    <Grid item>
                        {/* Navigation pane */}
                    </Grid>
                    <Grid item>
                        {/* Main page content */}
                        {/* Random featured recipe */}
                    </Grid>
                </Grid>
            </div>
        )
    }

}


export default Main