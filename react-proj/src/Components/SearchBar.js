import { Grid, IconButton, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ onSearchPress = () => {} }) => {

    const [searchValue, setSearchValue] = useState('')
    
  return (
    <Paper
      component="form"
      elevation={1}
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
        // style={{ display: "flex", flex: 0.5 }}
        aria-label="search"
        onClick={() => onSearchPress(searchValue)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};


export { SearchBar }