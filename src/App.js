import React, { Component } from 'react';
import './App.scss';
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import ContainedButtons from './Components/Buttons';
import SimpleAppBar from './Components/TopBar';
import SimpleTable from './Components/Table';
import ChoosePlayers from './Components/ChoosePlayers';

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
  state = {
    numPlayers: '',
    game: 'Choose Game',
  }

  updatePlayers = (num) => {
    this.setState({numPlayers: num})
  }

  chooseGame = (gameChoice) => {
    this.setState({ game: gameChoice });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <SimpleAppBar
            game={this.state.game}
            chooseGame={this.chooseGame}
          />
          <div className="App-body">
            <div id="home-img">
              <div id="dice-top-row" className="die-img-row">
                <img className="die-img" src="svg/die-green.svg" alt="green-die"></img>
                <img className="die-img" src="svg/die-purple.svg" alt="purple-die"></img>
              </div>
              <div id="dice-bottom-row" className="die-img-row">
                <img className="die-img" src="svg/die-purple.svg" alt="purple-die"></img>
                <img className="die-img" src="svg/die-green.svg" alt="green-die"></img>
                <img className="die-img" src="svg/die-purple.svg" alt="purple-die"></img>
              </div>
            </div>
            {/* <div className='home-table'>
              <SimpleTable />
            </div> */}
            <div className='buttons'>
            <ChoosePlayers
              numPlayers={this.state.numPlayers}
              updatePlayers={this.updatePlayers}
              />
              {/* <ContainedButtons /> */}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
