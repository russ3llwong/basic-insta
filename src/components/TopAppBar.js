import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Abril Fatface, cursive'
  },
  appBar: {
    background: '#fff',
    color: '#000'
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};



export default function TopAppBar(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar positio="static" className={classes.appBar} elevation={0}>
          <Toolbar>
            {props.backButton ? (
              <Link style={{ cursor: 'pointer' }} onClick={props.backButton}>Back</Link>
            ) : ''
            }
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              basic
          </Typography>
            <Link style={{ cursor: 'pointer' }} onClick={props.onLogoutClick}>Logout</Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
} 