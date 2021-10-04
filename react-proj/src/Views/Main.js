import React, { Component } from 'react'
import { Grid } from '@mui/material';

class Main extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="App">
                <Grid container spacing={1} direction="column">

                    <Grid item>
                        <h1>The Recipe Archive</h1>
                    </Grid>
                    <Grid item>
                        {/* Search bar */}
                    
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