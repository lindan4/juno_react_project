import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Grid container spacing={1} direction="column">

        <Grid item>
          <h1>The Recipe Archive</h1>
        </Grid>
        <Grid item>
          
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
