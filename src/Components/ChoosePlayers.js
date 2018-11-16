/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import { Icon } from '@material-ui/core';

const numbers = Array.from(Array(8).keys());
const players = numbers.map( num => num+1);
const styles = {};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Players</DialogTitle>
        <div>
          <List>
            {players.map(num => (
              <ListItem button onClick={() => this.handleListItemClick(num)} key={num}>
                <ListItemText primary={num} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class ChoosePlayers extends React.Component {
  state = {
    open: false,
    selectedValue: '',
    btnText: 'How Many Players',
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  setBtnText = (num) => {
    if (num === 1) return `${num} Player`
    else return `${num} Players`
  }

  handleClose = value => {
    this.setState({ open: false });
    if (value) {
      this.props.updatePlayers(value);
      this.setState({ btnText: this.setBtnText(value) })
    }
  };

  render() {
    return (
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={this.handleClickOpen}
          classes={{}}>
            {this.state.btnText}
            <Icon>arrow_drop_down</Icon>
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default ChoosePlayers;
