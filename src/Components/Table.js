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
import { MenuItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    margin: 'auto',
    overflowX: 'auto',
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
    minWidth: '75px',
    background: 'white',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    boxShadow: '2px 0px 4px grey',
    zIndex: 100,
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
    this.setScores = function() {
      rows.forEach(e => {
        this.scores[e.row] = 0;
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
    for (let i = 0; i<this.props.numPlayers; i++) {
      let newPlayer = new Player(`Player ${i+1}`);
      newPlayer.setScores();
      newPlayers.push(newPlayer)
    }
    this.setState({players: newPlayers});
  };

  // Update the players if numPlayers changes
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.addPlayers();
    }
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
                      className={classes.noPadding}
                      inputProps={{className: classes.smInput}}
                      value={player.name} 
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
                      return (<TableCell className={classes.td} key={index}>
                        <Select 
                          variant='outlined'
                          value={player.scores[row.row].toString()}
                          placeholder={'test'}
                          inputProps={{
                            name: player.scores[row.id],
                            id: player.scores[row.id],}}
                          >
                          <MenuItem value={'10'}>10</MenuItem>
                          </Select>
                        </TableCell>)
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
