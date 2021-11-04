import { IconButton, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ initialValue = '', onSearchPress = () => {} }) => {

  const [searchValue, setSearchValue] = useState(initialValue)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearchPress(searchValue)

  }
    
  return (
    <Paper
      component='form'
      elevation={1}
      onSubmit={handleSubmit}
      sx={{ p: "5px 4px", display: "flex", alignItems: "center", width: "60%" }}
    >
      <TextField
        style={{ display: "flex", flex: 12 }}
        id="search-field"
        label="Search"
        variant="outlined"
        placeholder={"Search for recipes"}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <IconButton
        type="submit"
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};


export { SearchBar }