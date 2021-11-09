import React, { Component } from 'react'
import { Grid } from '@mui/material';
import { SearchBar, RandomRecipeItem } from '../Components';
import mainStyles from './Main.module.css'

class Main extends Component {

    constructor(props) {
        super(props)        
    }

    render() {
        return (
            <div className={mainStyles.mainContainer}>
                <Grid container spacing={1} width='80%' justifyContent='center' direction="column">
                    <Grid item sx={styles.itemStyle}>
                        <h1>The Recipe Archive</h1>
                    </Grid>
                    <Grid item sx={styles.itemStyle}>
                        {/* Search bar */}
                        <SearchBar onSearchPress={value => {
                            this.props.history.push(`/search?keyword=${value}`)
                        }}/>
                    </Grid>
                    <Grid item sx={styles.lowerItemStyling}>
                        {/* Random featured recipe */}
                        <RandomRecipeItem onItemClick={id => this.props.history.push(`/meal?id=${id}`)} />

                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = {
    itemStyle: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lowerItemStyling: {
        paddingBottom: 20
    }
}

export default Main