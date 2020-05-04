import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../redux/actions/authActions';
import { Container} from '@material-ui/core'
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
        history.push('/feed')
    }

    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} backButton={backButton} />
            <Container maxWidth="md">
                <main>
                    <PostCard post={location.state.post}/>
                </main>
            </Container>
            <BottomAppBar />
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