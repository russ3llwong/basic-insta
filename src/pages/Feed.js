import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton,  AppBar, Grid, Container, Fab } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { logoutUser } from '../redux/actions/authActions';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';
import TopAppBar from '../components/TopAppBar';
import FeedCard from '../components/FeedCard';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
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
    }
}));

const featuredPosts = [
    {
        title: 'abc21',
        date: 'Nov 12',
        time: '3 hours ago',
        description: 'Hello World',
        comments: [
            'Amazing',
            'Beautiful Photo'
        ]
    },
    {
        title: 'abc22',
        date: 'Nov 11',
        time: '5 hours ago',
        description: 'Hello World',
        comments: [
        ]
    },
    {
        title: 'Featured post',
        date: 'Nov 12',
        time: '2 hours ago',
        description: 'Hello World',
        comments: [
        ]
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        time: '1 hour ago',
        description: 'Hello World',
        comments: [
            'Amazing',
            'Beautiful Photo'
        ]
    },
];


const Feed = ({ logoutUser, history }) => {
    const classes = useStyles();

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const onClickPost = e => {
        e.preventDefault();
        history.push("/feed/post")
    }

    return (
        <React.Fragment>
        <TopAppBar onLogoutClick={onLogoutClick} />
        <Container className={classes.container} maxWidth="sm">
            {/* posts */}
            <Grid container spacing={3}>
                {featuredPosts.map(post => (
                    <FeedCard post={post} onClickPost={onClickPost}  />
                ))}
            </Grid>
            {/* End sub featured posts */}
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

Feed.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Feed); 