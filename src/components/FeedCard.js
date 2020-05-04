import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, CardActions, Divider, Link, Button } from '@material-ui/core'
import { addComment } from '../redux/actions/commentActions.js'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
  },
  media: {
    height: 0,
    paddingTop: '100%',
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

const FeedCard = ({addComment, post, onClickPost, onProfileClick }) => {
  const classes = useStyles();
  const [comment, setComment] = React.useState("");

  const submit = async (e) => {
    e.preventDefault();
    addComment(post._id, comment).then(() => setComment(''));
  }
  return (
    <Grid item className={classes.mainGrid} xs={12} md={12}>
      <Card className={classes.card} elevation={3}>
        <CardActionArea>
          <CardContent>
            <Typography component="subtitle1" variant="subtitle1">
              <Button onClick={()=>onProfileClick(post.author._id)}><b>{post.author.username}</b></Button>
            </Typography>
          </CardContent>
          <Divider />
          <CardMedia
            className={classes.media}
            image={post.image}
            title="Image title"
            onClick={onClickPost}
          />
          <CardContent>
            <Typography component="subtitle2" variant="subtitle2">
              <b>{post.author.username}</b> {post.caption}
            </Typography>
            <Typography component="p" variant="p" color="textSecondary">
              {moment(`${post.createdAt}`).startOf('second').fromNow()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <div className={classes.inputBox}>
          <form onSubmit={submit}>
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
        </div>
      </Card>
    </Grid>
  );
}

FeedCard.propTypes = {
  addComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  comments: state.comments,
})

export default connect(
  mapStateToProps,
  { addComment }
)(FeedCard);