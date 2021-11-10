import { Grid, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import { Component } from 'react'
import { fetchMeals } from '../api/Meal';
import { RecipeItem, SearchBar } from '../Components'
import { Helmet } from 'react-helmet'


class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsLoading: false,
      searchResults: [],
      loading: true
    };
  }

  fetchQuery(keyword) {
    fetchMeals(keyword).then(mealResults => {
      this.setState({ searchResults: mealResults, loading: false });
    }).catch(() => {
      this.setState({ searchResults: [], loading: false });
    })
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const keyword = urlParams.get("keyword");
    this.fetchQuery(keyword)
    this.keyword = keyword
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {

        const urlParams = new URLSearchParams(this.props.location.search);
        const keyword = urlParams.get("keyword");
        this.fetchQuery(keyword)

        this.keyword = keyword
    }
  }

  renderLoadingHelmet() {
    return (
      <Helmet>
        <title>Loading...</title>
      </Helmet>
    )
  }

  renderResultsHelmet() {
    return (
      <Helmet>
        <title>Search results for {this.keyword} | The Recipe Archive</title>
      </Helmet>
    )
  }

  renderContent() {
      if (this.state.loading) {
        return (
          <div
            className="search-results-container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center',
              width: '100vw',
              height: '100vh'
            }}>
                {this.renderLoadingHelmet()}
                <CircularProgress />
          </div>
        );
      }
      else {
        return (
            <div
              className="search-results-container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {this.renderResultsHelmet()}
              <Grid container display="flex" alignItems="center" direction="column">
                <Grid item container direction='column' alignItems='center'>
                  <SearchBar initialValue={this.keyword} onSearchPress={value => {
                      console.log("Outer value: ", value)
                      this.props.history.push(`/search?keyword=${value}`)
                    }} />
                  <Typography sx={{ marginTop: 10 }}>
                    There are{" "}
                    {this.state.searchResults ? this.state.searchResults.length : 0}{" "}
                    results
                  </Typography>
                </Grid>
                <Grid
                  container
                  marginTop={10}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  width="60%"
                >
                  {this.state.searchResults.map((searchResultItem) => {
                    return (
                      <Grid item paddingRight={2} paddingBottom={2} borderRadius={5}  key={searchResultItem.idMeal}>
                        <RecipeItem
                          item={searchResultItem}
                          onItemClick={() => {
                            console.log("Clicked");
                            this.props.history.push(
                              `/meal?id=${searchResultItem.idMeal}`
                            );
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </div>
          );

      }
  }

  render() {
    return this.renderContent()   
  }
}

export default SearchResults