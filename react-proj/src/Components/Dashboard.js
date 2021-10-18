import { MenuOutlined } from "@mui/icons-material";
import { Button, IconButton, Link, Menu, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = ({ loggedIn = false, onProfileClick, onFavouriteClick, onSignClick }) => {

  const dispatch = useDispatch()
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLoginModal, setShowLoginModal] =  useState(false)

  const [showSignupPage, setShowSignupPage] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

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
            <MenuItem onClick={() => {
              handleClose()
              setShowLoginModal(true)
              }}>Login</MenuItem>
            </>
          )
      }
  }

  const onLoginClick = () => {
    setErrorMessage('')
  }

  const onUserSignup = () => {

  }

  const renderLoginContent = () => {
    if (!loggedIn && !showSignupPage) {
      return (
        <Box sx={styles.modalStyle}>
            <Typography variant="h6" component="h2">
              Login
            </Typography>
            <Box sx={{ marginTop: 1, alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}> 
            
              <TextField sx={{ marginTop: 4 }}  id="Email-field" label="Email" variant="outlined" value={username} type='email' onChange={event => setUsername(event.target.value)} />
              <TextField sx={{ marginTop: 2 }} id="password-field" label="Password" variant="outlined" value={password} type='password' onChange={event => setPassword(event.target.value)}/>
              <Button sx={{ marginTop: 2 }} variant='contained' id='login-button'>Login</Button>
              <Typography>{errorMessage}</Typography>
            </Box>

            <Typography variant="h6" component="h2" sx={{ mt: 6 }}>
              Don't have an account? Click <Link onClick={() => setShowSignupPage(true)}>here</Link> to sign up.
            </Typography>
        </Box>
      )
    }
    else {
      return (
        <Box sx={styles.modalStyle}>
          <Typography variant="h6" component="h2">
                Sign Up
          </Typography>
          <Button variant='text' onClick={() => setShowSignupPage(false)}>Back</Button>
          <Box sx={{ marginTop: 1, alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}> 
            
              <TextField sx={{ marginTop: 4 }}  id="Email-field" label="Email" variant="outlined" value={username} type='email' onChange={event => setUsername(event.target.value)} />
              <TextField sx={{ marginTop: 2 }} id="password-field" label="Password" variant="outlined" value={password} type='password' onChange={event => setUsername(event.target.value)}/>
              <Button sx={{ marginTop: 2 }} variant='contained' id='login-button'>Sign Up</Button>
            </Box>
        </Box>
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
      <Modal
        onBackdropClick={() => setShowLoginModal(false)}
        open={showLoginModal}
        handleClose={() => setShowLoginModal(false)}>
          {renderLoginContent()}
        </Modal>
    </div>
  );
};

const styles = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffe4c4',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
}

export { Dashboard }
