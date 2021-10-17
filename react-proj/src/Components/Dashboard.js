import { MenuOutlined } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const Dashboard = ({ loggedIn = false, onProfileClick, onFavouriteClick, onSignClick }) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDashboardItems = () => {
      if (loggedIn) {
          return (
            <>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Favourites</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            </>
          )

      }
      else {
        return (
            <>
            <MenuItem onClick={handleClose}>Login</MenuItem>
            </>
          )
      }
  }

  return (
    <div>
      <IconButton
        onClick={handleClick}
      >
        <MenuOutlined />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {renderDashboardItems()}
      </Menu>
    </div>
  );
};

export { Dashboard }
