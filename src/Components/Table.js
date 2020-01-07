import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import { MenuItem, Input } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    margin: 'auto',
    overflowX: 'auto',
  },
  selectRoot: {
    width: '75px',
  },
  select: {
    paddingRight: '10px',
  },
  table: {
    minWidth: 360,
  },
  td: {
    padding: '5px',
    minWidth: '75px',
    textAlign: 'center',
  },
  th: {
    padding: '0.5em',
    position: 'sticky',
    left: 0,
    minWidth: '90px',
    background: 'white',
    boxShadow: '2px 0px 4px grey',
    zIndex: 100,
  },
  input: {
    padding: '5px',
    textAlign: 'center'
  },
  smInput: {
    padding: '5px 10px',
    fontSize: '0.8em',
    textAlign: 'center'
  },
  noPadding: {
    padding: 0,
  },
});

let id = 0;
function createData(row) {
  id += 1;
  return { id, row };
}

const rows = [
  createData('Ones'),
  createData('Twos'),
  createData('Threes'),
  createData('Fours'),
  createData('Fives'),
  createData('Sixes'),
  createData('Sum'),
  createData('Bonus'),
  createData('Upper Total'),
  createData('Three of a kind'),
  createData('Four of a kind'),
  createData('Full House'),
  createData('Small Straight'),
  createData('Large Straight'),
  createData('Chance'),
  createData('Yahtzee!'),
  createData('Yahtzee Bonus'),
  createData('TOTAL')
];

class Player {
  constructor(name) {
    this.name = name;
    this.scores = {};
    this.setScores = function () {
      rows.forEach(e => {
        this.scores[e.row] = '';
      });
    }
  }
}

class SimpleTable extends React.Component {
  state = {
    players: []
  }

  // create new players from the numPlayers prop
  addPlayers = () => {
    const newPlayers = [];
    for (let i = 0; i < this.props.numPlayers; i++) {
      let newPlayer = new Player(`Player ${i + 1}`);
      newPlayer.setScores();
      newPlayers.push(newPlayer)
    }
    this.setState({ players: newPlayers });
  };

  // add the lower total
  addLower(upper, scores) {
    let lowers = ['Three of a kind', 'Four of a kind', 'Full House',
      'Small Straight', 'Large Straight', 'Yahtzee!', 'Yahtzee Bonus']
    let total = upper;
    lowers.forEach(item => {
      if (scores[item] !== '') total += scores[item]
    })
    return total;
  }

  // add the upper total
  addUpper(scores) {
    let uppers = ['Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'];
    let total = 0;
    uppers.forEach(item => {
      if (scores[item] !== '') total += scores[item];
    })
    return total;
  }

  // Update the totals
  updateTotals = () => {
    let players = this.state.players;
    players.forEach(player => {
      let scores = player.scores;
      scores.Sum = this.addUpper(scores);
      if (scores.Sum >= 63) scores.Bonus = 35;
      else scores.Bonus = 0;
      scores['Upper Total'] = parseInt(scores.Sum) + parseInt(scores.Bonus);
      if (!scores['Upper Total']) scores['Upper Total'] = 0;
      scores.TOTAL = this.addLower(scores['Upper Total'], scores);
      // if (!scores.TOTAL) scores.TOTAL = 0;
    })
  }

  // Update the players name
  updatePlayerName = (e) => {
    let players = this.state.players;
    players[e.target.name].name = e.target.value;
    this.setState({
      players: players,
    })
  }

  // Update the players score
  updatePlayerScore = (e) => {
    let players = this.state.players;
    let props = e.target.name.split('-');
    players[props[0]].scores[props[1]] = e.target.value;
    this.setState({
      players: players,
    })
    this.updateTotals();
  }

  // Update the players if numPlayers changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.addPlayers();
    }
    if (prevState !== this.state) {
      this.updateTotals();
    }
  }

  // Return select items
  returnMenuItems = (min, max, zero) => {
    let menuItems = [];
    for (let i = min; i < max + 1; i++) {
      menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    if (zero !== undefined) {
      menuItems.unshift(<MenuItem key={max+1} value={0}>0</MenuItem>);
    }
    return menuItems;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div id='yahtzee-table'>
          <div id='yt-header'>

          </div>
          <div id='yt-left'>

          </div>
          <div id='yt-main'>

          </div>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.th}></TableCell>
                {this.state.players.map((player, index) => {
                  return (<TableCell className={classes.td} key={index}>
                    <TextField
                      onChange={this.updatePlayerName}
                      name={index.toString()}
                      className={classes.noPadding}
                      inputProps={{
                        className: classes.smInput,
                      }}
                      placeholder={player.name}
                      variant='filled'
                      margin='dense' />
                  </TableCell>)
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id} className={classes.trs}>
                    <TableCell className={classes.th} component="th" scope="row">
                      {row.row}
                    </TableCell>
                    {this.state.players.map((player, index) => {
                      // add drop downs for the 1-6 rolls
                      if (row.id < 7) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={row.id}>{row.id}</MenuItem>
                              <MenuItem value={row.id * 2}>{row.id * 2}</MenuItem>
                              <MenuItem value={row.id * 3}>{row.id * 3}</MenuItem>
                              <MenuItem value={row.id * 4}>{row.id * 4}</MenuItem>
                              <MenuItem value={row.id * 5}>{row.id * 5}</MenuItem>
                            </Select>
                          </TableCell>
                        )
                        // Add divs for the sub totals
                      } else if (row.id < 9) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <div className='sub-totals'>
                              {player.scores[row.row]}
                            </div>
                          </TableCell>
                        )
                        // Add divs for the totals
                      } else if (row.id === 9 || row.id === 18) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <div className='table-totals'>
                              {player.scores[row.row]}
                            </div>
                          </TableCell>
                        )
                        // Add Inputs for the 3OFK 4OFK Chance
                      } else if (row.id === 10 || row.id === 11 || row.id === 15) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              {this.returnMenuItems(5, 30, 0)}
                              }}
                            </Select>
                          </TableCell>
                        )
                        // Add inputs for the full house
                      } else if (row.id === 12) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={25}>25</MenuItem>
                            </Select>
                          </TableCell>
                        )
                        // Add inputs for the small straight
                      } else if (row.id === 13) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={30}>30</MenuItem>
                            </Select>
                          </TableCell>
                        )
                        // Add inputs for the large straight
                      } else if (row.id === 14) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={40}>40</MenuItem>
                            </Select>
                          </TableCell>
                        )
                        // Add inputs for Yahtzee
                      } else if (row.id === 16) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={50}>50</MenuItem>
                            </Select>
                          </TableCell>
                        )
                        // Add inputs for the Yahtzee Bonus
                      } else if (row.id === 17) {
                        return (
                          <TableCell className={classes.td} key={index}>
                            <Select
                              name={`${index.toString()}-${row.row}`}
                              onChange={this.updatePlayerScore}
                              classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                              }}
                              value={player.scores[row.row]}>
                              <MenuItem value=''></MenuItem>
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={100}>100</MenuItem>
                              <MenuItem value={200}>200</MenuItem>
                              <MenuItem value={300}>300</MenuItem>
                              <MenuItem value={400}>400</MenuItem>
                              <MenuItem value={500}>500</MenuItem>
                            </Select>
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
