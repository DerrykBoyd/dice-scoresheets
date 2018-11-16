import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: '1em',
  },
});

function CreateScore(props) {
  const { classes } = props;

  const handleClick = () => {
    props.showTable();
  }

  return (
    <div>
      <Button 
        classes={{}}
        variant="contained"
        color="primary" 
        className={classes.button}
        onClick={handleClick}>
        Create Scoresheet
      </Button>
    </div>
  );
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateScore);
