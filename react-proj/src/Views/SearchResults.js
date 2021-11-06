import { Grid, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import { Component } from 'react'
import { fetchMeals } from '../api/Meal';
import { RecipeItem, SearchBar } from '../Components'


class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsLoading: false,
      searchResults: [],
      // searchQuery: '',
      loading: true
    };
  }

  fetchQuery(keyword) {
    // this.setState({ searchQuery: keyword })
    // axios
    //   .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    //   .then((searchRes) => {
    //     if (searchRes.data.meals) {
    //       this.setState({ searchResults: searchRes.data.meals, loading: false });
    //     } else {
    //       this.setState({ searchResults: [], loading: false });
    //     }
    //   })
    //   .catch((error) => console.log(error));
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