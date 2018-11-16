import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    minWidth: '70px',
    textAlign: 'center',
  },
  th: {
    padding: '0.5em',
    position: 'sticky',
    left: 0,
    minWidth: '90px',
    background: 'white',
    borderRight: '1px solid rgba(224, 224, 224, 1)'
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

function SimpleTable(props) {
  const numPlayers = Array.from(Array(props.numPlayers).keys());
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>Player</TableCell>
            {numPlayers.map((player, index) => {
              return (<TableCell className={classes.td} key={index}>{`Player ${player + 1}`}</TableCell>)
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
                {numPlayers.map((player, index) => {
                  return (<TableCell className={classes.td} key={index}>100</TableCell>)
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
