import React, { Component } from 'react';
import './App.scss';
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import CreateScore from './Components/CreateScoresheet';
import SimpleAppBar from './Components/TopBar';
import ChoosePlayers from './Components/ChoosePlayers';
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
  state = {
    numPlayers: '',
    game: 'Yahtzee',
    showTable: false,
    hideMain: false,
    showCreateScore: false,
  }

  updatePlayers = (num) => {
    this.setState({ numPlayers: num })
  }

  chooseGame = (gameChoice) => {
    this.setState({ game: gameChoice });
  }

  showTable = () => {
    let toggle = this.state.hideTable;
    this.setState({
      showTable: !toggle,
      hideMain: !toggle
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.numPlayers !== prevState.numPlayers) {
      if (prevState.numPlayers === '') {
        this.setState({ showCreateScore: !this.state.showCreateScore })
      }
    }
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
            <div className={this.state.hideMain ? 'hidden' : 'home-main'}>
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
              <div className='buttons'>
                <ChoosePlayers
                  numPlayers={this.state.numPlayers}
                  updatePlayers={this.updatePlayers} />
                <div className={this.state.showCreateScore ? "create-score" : 'hidden'}>
                  <CreateScore
                    numPlayers={this.state.numPlayers}
                    showTable={this.showTable} />
                </div>
              </div>
              <div className='credit'>
                <span>Developed by dboydgit</span>
              </div>
            </div>
            <div className={this.state.showTable ? 'home-table' : 'hidden'}>
              <SimpleTable
                numPlayers={this.state.numPlayers} />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
