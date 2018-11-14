import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SimpleMenu from '../Components/GameSelect';

const styles = {
  root: {
    flexGrow: 1,
  },
  toolBar: {
    justifyContent: 'space-between',
  },
};

class SimpleAppBar extends React.Component {
  render() {
    const { classes } = this.props;
    const currentGame = this.props.game;  
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" color="inherit">
              Dice Scoresheets
            </Typography>
            <SimpleMenu
              game={currentGame}
              chooseGame={this.props.chooseGame}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
