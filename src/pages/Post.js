import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Container, Toolbar, Fab, IconButton, CardActions, Link, Card, CardContent, Hidden, CardMedia, Typography, AppBar, Grid } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TopAppBar from '../components/TopAppBar';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        height: '75vh'
    },
    cardDetails: {
        flex: 2,
    },
    cardMedia: {
        flex: 3.5,
    },
    mainGrid: {
        marginTop: theme.spacing(10),
    },
    root: {
        width: '100%',
        // background: 'green',
    },
    commentSection: {
        height: '65vh',
        overflowY: 'auto'
    },
    commentInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '13px',
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
}));

const Post = ({ logoutUser, history }) => {
    const classes = useStyles();

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const backButton = e => {
        e.preventDefault();
        history.push('/feed')
    }

    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} backButton={backButton} />
            <Container maxWidth="md">
                <main>
                    <Grid className={classes.mainGrid}>
                        <Grid item sm={12} md={12}>
                            <Card className={classes.card} elevation={3}>
                                <Hidden xsDown>
                                    <CardMedia className={classes.cardMedia} image='https://source.unsplash.com/random' />
                                </Hidden>
                                <div className={classes.cardDetails}>
                                    <CardActions className={classes.infoSection}>
                                        <Typography component="subtitle1" variant="subtitle1">
                                            <b>abc21</b>
                                        </Typography>
                                    </CardActions>
                                    <Divider />
                                    <div className={classes.commentSection}>
                                        <List className={classes.root}>
                                            <ListItem>
                                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                        </List>
                                    </div>
                                    <Divider />
                                    <CardActions className={classes.inputSection}>
                                        <input placeholder="Add a comment" className={classes.commentInput} />
                                        <Link
                                            component="button"
                                            style={{ fontSize: '13px' }}
                                        >Post</Link>
                                    </CardActions>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Container maxWidth="sm">
                    <Toolbar>
                        <IconButton edge="start" color="inherit">
                            <HomeRoundedIcon />
                        </IconButton>
                        <Fab color="primary" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <IconButton edge="end" color="inherit">
                            <PersonRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

Post.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Post);