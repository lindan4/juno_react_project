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

const Dashboard = ({ history, location }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const loggedIn = useSelector((state) => state.user.isUserLoggedIn);

  const [showSignupPage, setShowSignupPage] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginSuccessfulSnackbar, setShowLoginSuccessfulSnackbar] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState(false);

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
          <MenuItem onClick={handleMenuAnchorClose}>Profile</MenuItem>
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

  const renderSuccessField = () => {
    if (successMessage !== "") {
      return (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
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
            <Box
              sx={{
                marginTop: 1,
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
              }}
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
                onClick={() => {
                  if (username !== "" && password !== "") {
                    loginUser(username, password)
                      .then(() => {
                        setShowLoginSuccessfulSnackbar(true);
                        setUsername("");
                        setPassword("");
                        setShowLoginModal(false);
                      })
                      .catch((error) => {
                        setErrorMessage(error.message);
                        setSuccessMessage("");
                        console.log(error);
                      });
                  } else {
                    setErrorMessage(
                      "One or more fields are missing. Please input username and/or password and try again."
                    );
                    setSuccessMessage("");
                  }
                }}
              >
                Login
              </Button>
              {/* <Typography color='red'>{errorMessage}</Typography> */}
            </Box>

            <Typography variant="h6" component="h2" sx={{ mt: 6 }}>
              Don't have an account? Click{" "}
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowSignupPage(true);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              >
                here
              </Link>{" "}
              to sign up.
            </Typography>
            {renderErrorField()}
            {renderSuccessField()}
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
                  setSuccessMessage("");
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
                onClick={() => {
                  if (username !== "" && password !== "" && name !== "") {
                    signUpUser(username, password, name)
                      .then((userData) => {
                        dispatch(setReduxName(userData.name));
                        dispatch(setUserId(userData.uid));
                        setSuccessMessage("Success in creating account.");
                        setErrorMessage("");
                        setShowLoginModal(false);
                        setShowSignupPage(false);
                      })
                      .catch((error) => {
                        setSuccessMessage("");
                        setErrorMessage(error.message);
                        console.log(error);
                      });
                  }
                }}
              >
                Sign Up
              </Button>
              {renderErrorField()}
              {renderSuccessField()}
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
      {!location.pathname.match("/") && (
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

      {/* <Snackbar open={showLoginSuccessfulSnackbar} autoHideDuration={4000} onClose={() => setShowLoginSuccessfulSnackbar(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Login successful
        </Alert>

      </Snackbar> */}
      
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
