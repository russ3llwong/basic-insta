import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { logoutUser } from '../redux/actions/authActions';
import Fab from '@material-ui/core/Fab';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    // toolbar: {
    //     borderBottom: `1px solid ${theme.palette.divider}`,
    // },
    toolbarTitle: {
        flex: 1,
        alignContent: 'center',
        fontFamily: 'Satisfy, cursive',
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    mainGrid: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
    card: {
        // display: 'flex',
        flex: 1,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    appBar: {
        background: '#fff',
        color: '#000'
    },
    appBarBottom: {
        background: '#fff',
        color: '#000',
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    commentInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '13px',
    },
    inputBox: {
        padding: theme.spacing(2)
    },
}));

const Profile = (logoutUser, history) => {

    const classes = useStyles();

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    return(
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h4"
                        color="inherit"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        Profile
          </Typography>
          <Link onClick={onLogoutClick}>Logout</Link>
                </Toolbar>
            </AppBar>
            <Container className={classes.container} maxWidth="sm">

            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Container maxWidth="sm">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={()=>history.push("/feed")}>
                            <HomeRoundedIcon />
                        </IconButton>
                        <Fab color="primary" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <IconButton edge="end" color="inherit" onClick={() => history.push("/profile")}>
                            <PersonRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Profile);