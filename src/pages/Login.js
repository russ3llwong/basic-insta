import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authActions";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        flex: 1,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    icon: {
        fontFamily: 'Satisfy, cursive',
        marginBottom: theme.spacing(8)
    }
}));

const Login = ({loginUser, auth, history}) => {
    const classes = useStyles();
    const [userName, setUserName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");

    const submit = async (e) => {
        e.preventDefault();
        const userData = {
            username: userName,
            password: userPassword,
        };
        loginUser(userData)
    }

    if (auth.isAuthenticated) {
        history.push("/feed");
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.image} />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} className={classes.container} square>
                <div className={classes.paper}>
                <Typography component="h1" variant="h3" className={classes.icon}>
                        Story
                </Typography>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                <form className={classes.form} onSubmit={submit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={userName}
                            onChange={e => setUserName(e.target.value)}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userPassword}
                            onChange={e => setUserPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
            </Button>
                        <Grid container justify="flex-start">
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? <b>Sign Up</b>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login)); 