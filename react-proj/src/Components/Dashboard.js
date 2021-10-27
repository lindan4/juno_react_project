import { MenuOutlined } from "@mui/icons-material";
import { Button, IconButton, Link, Menu, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, signUpUser } from "../api/User";
import { setLoginStatus, setReduxName, setUserFavourites, setUserId } from "../redux/UserSlice";

const Dashboard = ({ onProfileClick, onFavouriteClick, onSignClick }) => {
  
  const [anchorEl, setAnchorEl] = useState(null);

  const loggedIn = useSelector(state => state.user.loggedIn)

  const [showSignupPage, setShowSignupPage] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [showLoginModal, setShowLoginModal] =  useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoginStatus(false))
  }, [])

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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Favourites</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              logoutUser().then(() => {
                dispatch(setLoginStatus(false))
                console.log("Logged out")
              });
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setShowLoginModal(true);
            }}
          >
            Login
          </MenuItem>
        </Menu>
      );
    }
  };


  const renderLoginContent = () => {

    if (!loggedIn) {
      if (!showSignupPage) {
        return (
          <Box sx={styles.modalStyle}>
            <Typography variant="h6" component="h2">
              Login
            </Typography>
            <Box sx={{ marginTop: 1, alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}> 
            
              <TextField sx={{ marginTop: 4 }}  id="Email-field" label="Email" variant="outlined" value={username} type='email' onChange={event => setUsername(event.target.value)} />
              <TextField sx={{ marginTop: 2 }} id="password-field" label="Password" variant="outlined" value={password} type='password' onChange={event => setPassword(event.target.value)}/>
              <Button sx={{ marginTop: 2 }} variant='contained' id='login-button' onClick={() => {
                 loginUser(username, password).then(userData => {
                   setShowLoginModal(false)
                   dispatch(setReduxName(userData.name))
                   dispatch(setUserId(userData.uid))
                   dispatch(setUserFavourites(userData.favourites || []))
                   dispatch(setLoginStatus(true))
                   setUsername('')
                   setPassword('')
                 }).catch(error => {
                  //  setErrorMessage(error)
                  console.log(error)
                 })
                }} >Login</Button>
              {/* <Typography color='red'>{errorMessage}</Typography> */}
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
              <TextField sx={{ marginTop: 4 }}  id="name-field" label="Name" variant="outlined" value={name} onChange={event => setName(event.target.value)} />
              <TextField sx={{ marginTop: 2 }}  id="email-field" label="Email" variant="outlined" value={username} type='email' onChange={event => setUsername(event.target.value)} />
              <TextField sx={{ marginTop: 2 }} id="password-field" label="Password" variant="outlined" value={password} type='password' onChange={event => setPassword(event.target.value)}/>
              <Button sx={{ marginTop: 2 }} variant='contained' id='login-button' onClick={() => {
                signUpUser(username, password, name).then(userData => {
                  dispatch(setReduxName(userData.name))
                  dispatch(setUserId(userData.uid))
                  setShowLoginModal(false)
                  setShowSignupPage(false)
                  dispatch(setLoginStatus(true))
                  alert('Success in creating account')
                }).catch(error => {
                  alert('Error when creating account')
                  console.log(error)
                })
              }} >Sign Up</Button>
            </Box>
        </Box>
        )
      }
    }
    

  }

  return (
    <div>
      <IconButton
        onClick={handleClick}
      >
        <MenuOutlined />
      </IconButton>
      {renderDashboardItems()}
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
