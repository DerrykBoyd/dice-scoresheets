import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon'

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseClick = (event) => {
    this.props.chooseGame(event.currentTarget.id);
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          classes={{}}
          id="game-button"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.game}
          <Icon>arrow_drop_down</Icon>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="yahtzee" onClick={this.handleCloseClick}>Yahtzee</MenuItem>
          <MenuItem id="farkle (Coming Soon)" disabled={true}>Farkle (Coming Soon)</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
