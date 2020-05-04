import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//auth and redux
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/authActions";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
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
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    icon: {
        fontFamily: 'Abril Fatface, cursive',
        marginBottom: theme.spacing(8)
    }
}));

const SignUp = ({ registerUser, history, auth }) => {
    const classes = useStyles();
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userFName, setUserFName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    // const [errors, setErrors] = React.useState({});

    const submit = async(e) => {
        e.preventDefault();
        const newUser = {
            username: userName,
            password: userPassword,
            name: userFName,
            email: userEmail, 
          };
          console.log(newUser)
          registerUser(newUser, history)
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
                        foto.
                </Typography>
                <form className={classes.form} onSubmit={submit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="fullName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                    value={userFName}
                                    onChange={e => setUserFName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    name="userName"
                                    autoComplete="uname"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={userEmail}
                                    onChange={e => setUserEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-start">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? <b>Sign in</b>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
} 

SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(SignUp)); 