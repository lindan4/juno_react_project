import { Home, MenuOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, signUpUser } from "../api/User";
import { setReduxName, setUserId } from "../redux/UserSlice";
import { useLocation } from 'react-router-dom'

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const location = useLocation()

  const [homeButtonVisible, setHomeButtonVisible] = useState(false)


  useEffect(() => {
    if (location.pathname === '/') {
      setHomeButtonVisible(false)
    }
    else {
      setHomeButtonVisible(true)
    }

  }, [location])


  const [anchorEl, setAnchorEl] = useState(null);

  const loggedIn = useSelector((state) => state.user.isUserLoggedIn);


  const [showSignupPage, setShowSignupPage] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessfulSnackbar, setShowSuccessfulSnackbar] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuAnchorClose = () => {
    setAnchorEl(null);
  };

  const renderDashboardItems = () => {
    if (loggedIn) {
      return (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuAnchorClose}
        >
          <MenuItem onClick={() => {
              handleMenuAnchorClose()
              history.push('/profile')
            }}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuAnchorClose();
              history.push("/favourites");
            }}
          >
            My Favourites
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuAnchorClose();
              logoutUser().then(() => {
                history.push("/");
                setSnackbarSuccessMessage('Successfully logged out.')
                setShowSuccessfulSnackbar(true)
                console.log("Logged out");
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
          onClose={handleMenuAnchorClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuAnchorClose();
              setErrorMessage('')
              setShowLoginModal(true);
            }}
          >
            Login
          </MenuItem>
        </Menu>
      );
    }
  };

  const renderErrorField = () => {
    if (errorMessage !== "") {
      return (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      );
    }
  };

  const handleLogin = event => {
    event.preventDefault()
    if (username !== "" && password !== "") {
      loginUser(username, password)
        .then(() => {
          setSnackbarSuccessMessage('Logged in.')
          setShowSuccessfulSnackbar(true);
          setUsername("");
          setPassword("");
          setShowLoginModal(false);
        })
        .catch((error) => {
          setErrorMessage('Unable to login. Please try again.');
          setSnackbarSuccessMessage("");
          console.log(error);
        });
    } else {
      setErrorMessage(
        "One or more fields are missing. Please input username and/or password and try again."
      );
      setSnackbarSuccessMessage("");
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    if (username !== "" && password !== "" && name !== "") {
      signUpUser(username, password, name)
        .then((userData) => {
          setErrorMessage("");
          setShowLoginModal(false);
          setShowSignupPage(false); 
          dispatch(setReduxName(userData.name));
          dispatch(setUserId(userData.uid));
          setSnackbarSuccessMessage("Success in creating account. You have been logged in automatically.");
        })
        .catch((error) => {
          setSnackbarSuccessMessage("");
          setErrorMessage(error.message);
          console.log(error);
        });
    }
  }

  const renderLoginContent = () => {
    if (!loggedIn) {
      if (!showSignupPage) {
        return (
          <Box sx={styles.modalStyle}>
            <Typography variant="h6" component="h2">
              Login
            </Typography>
              <Box
                sx={{
                  marginTop: 1,
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                }}
                component='form'
                onSubmit={handleLogin}
              >
                  <TextField
                    sx={{ marginTop: 4 }}
                    id="Email-field"
                    label="Email"
                    variant="outlined"
                    value={username}
                    type="email"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <TextField
                    sx={{ marginTop: 2 }}
                    id="password-field"
                    label="Password"
                    variant="outlined"
                    value={password}
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Button
                    sx={{ marginTop: 2 }}
                    variant="contained"
                    id="login-button"
                    type='submit'
                  >
                    Login
                  </Button>
              </Box>

            <Typography variant="h6" component="h2" sx={{ mt: 6 }}>
              Don't have an account? Click{" "}
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowSignupPage(true);
                  setErrorMessage("");
                  setSnackbarSuccessMessage("");
                }}
              >
                here
              </Link>{" "}
              to sign up.
            </Typography>
            {renderErrorField()}
          </Box>
        );
      } else {
        return (
          <Box sx={styles.modalStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Sign Up
              </Typography>
              <Button
                variant="text"
                onClick={() => {
                  setSnackbarSuccessMessage("");
                  setErrorMessage("");
                  setShowSignupPage(false);
                }}
              >
                Back
              </Button>
            </Box>
              <Box
                sx={{
                  marginTop: 1,
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                }}
                component='form'
                onSubmit={handleSignUp}
              >
                <TextField
                  sx={{ marginTop: 4 }}
                  id="name-field"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  id="email-field"
                  label="Email"
                  variant="outlined"
                  value={username}
                  type="email"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  id="password-field"
                  label="Password"
                  variant="outlined"
                  value={password}
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  id="login-button"
                  type='submit'
                >
                  Sign Up
                </Button>
                {renderErrorField()}
              </Box>
          </Box>
        );
      }
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuOutlined />
      </IconButton>
      {homeButtonVisible && (
        <IconButton onClick={() => history.push("/")}>
          <Home />
        </IconButton>
      )}
      {renderDashboardItems()}
      {!loggedIn && <Modal
          onBackdropClick={() => setShowLoginModal(false)}
          open={showLoginModal}
          handleMenuAnchorClose={() => setShowLoginModal(false)}
        >
          {renderLoginContent()}
        </Modal>
      }

      <Snackbar open={showSuccessfulSnackbar} autoHideDuration={4000} onClose={() => {
          setShowSuccessfulSnackbar(false)
          setSnackbarSuccessMessage('')
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {snackbarSuccessMessage}
        </Alert>

      </Snackbar>
      
    </div>
  );
};

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffe4c4",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};

export { Dashboard };
