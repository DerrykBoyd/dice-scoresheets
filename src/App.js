import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import ContainedButtons from './Components/Buttons';
import SimpleAppBar from './Components/TopBar';
import SimpleTable from './Components/Table';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9162e4',
      main: '#5e35b1',
      dark: '#280680',
      contrastText: '#fff'
    },
    secondary: {
      light: '#80e27e',
      main: '#4caf50',
      dark: '#087f23',
      contrastText: '#000'
    },
  },
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <SimpleAppBar />
          <header className="App-body">
            <div className='home-table'>
              <SimpleTable />
            </div>
            <div className='buttons'>
              <ContainedButtons />
            </div>
          </header>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
