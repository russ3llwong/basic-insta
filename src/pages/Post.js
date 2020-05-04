import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container} from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';

import TopAppBar from '../components/TopAppBar';
import BottomAppBar from "../components/BottomAppBar";
import PostCard from "../components/PostCard";

const Post = ({ logoutUser, history, location }) => {

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const backButton = e => {
        e.preventDefault();
        if (location.state.flag == 'feed')
            history.push('/feed');
        else
            history.push('/profile')
    }
    const onFeedClick = () => {
        history.push("/feed")
    }

    // Courtesy of stack over flow :D
    const getCook = (cookiename) => {
        // Get name followed by anything except a semicolon
        let cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
        // Return everything after the equal sign, or an empty string if the cookie name not found
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    }

    const onProfileClick = (userId) => {
        history.push(`/profile/${userId}`);
    }
    console.log('location.state', location.state);
    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} backButton={backButton} />
            <Container maxWidth="md">
                <main>
                    <PostCard post={location.state.post} onProfileClick={onProfileClick}/>
                </main>
            </Container>
            <BottomAppBar onProfileClick={() => onProfileClick(getCook('userId'))} onFeedClick={onFeedClick}/>
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
