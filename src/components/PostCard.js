import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Divider, CardActions, Link, Card, Hidden, CardMedia, Typography, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'
import { fetchCommentsByPost, addComment } from '../redux/actions/commentActions'
import moment from 'moment'

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
}));

const PostCard = ({ fetchCommentsByPost, addComment, comments, post, onProfileClick }) => {
    const [comment, setComment] = React.useState("");
    const classes = useStyles();

    const submit = async (e) => {
        e.preventDefault();
        addComment(post._id, comment).then(() => setComment(''));
    }

    React.useEffect(() => {
        fetchCommentsByPost(post._id);
    }, [fetchCommentsByPost]);

    return (
        <Grid className={classes.mainGrid}>
            <Grid item sm={12} md={12}>
                <Card className={classes.card} elevation={3}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={post.image} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardActions className={classes.infoSection}>
                            <Typography component="subtitle1" variant="subtitle1">
                                <Button onClick={()=>onProfileClick(post.author._id)}><b>{post.author.username}</b></Button>
                            </Typography>
                        </CardActions>
                        <Divider />
                        <div className={classes.commentSection}>
                            <List className={classes.root}>
                                {comments.comments.map(commentPost => {
                                    return <ListItem>
                                     <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    <b>{commentPost.author.username}</b> {commentPost.text}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {moment(`${commentPost.createdAt}`).startOf('second').fromNow()}
                                                </Typography>
                                            </React.Fragment>
                                            
                                        }
                                    />
                                    </ListItem>
                                })
                                }
                            </List>
                        </div>
                        <Divider />
                        <CardActions className={classes.inputSection}>
                            <form onSubmit={submit} style={{ width: '100%' }}>
                                <button
                                    type="submit"
                                    style={{ float: 'right', fontSize: '13px' }}
                                >Post</button>
                                <div style={{
                                    overflow: 'hidden',
                                    paddingRight: '0.5em'
                                }}>
                                    <input type="text" placeholder="Add a comment" className={classes.commentInput} value={comment} onChange={e => setComment(e.target.value)} />
                                </div>
                            </form>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </Grid>
    );
}

PostCard.propTypes = {
    fetchCommentsByPost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    comments: state.comments
})


export default connect(
    mapStateToProps,
    { fetchCommentsByPost, addComment }
)(PostCard);