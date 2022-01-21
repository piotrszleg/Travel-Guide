import * as React from 'react';
import ReactDOM from 'react-dom';
import SegmentEndForm from "./pages/SegmentEndForm"
import Map from "./pages/Map"
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#00fff0',
    },
  },
});

function App() {
  return <MuiThemeProvider theme={theme}><Map></Map></MuiThemeProvider>;
}

export default App;
