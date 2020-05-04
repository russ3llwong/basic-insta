import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, CardActions, Divider, Link } from '@material-ui/core'

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

export default function FeedCard(props) {
  const classes = useStyles();
  return (
    <Grid item className={classes.mainGrid} xs={12} md={12}>
      <Card className={classes.card} elevation={3}>
        <CardActionArea onClick={props.onClickPost}>
          <CardContent>
            <Typography component="subtitle1" variant="subtitle1">
              <b>{props.post.title}</b>
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={props.post.image}
            title="Image title"
          />
          <CardContent>
            <Typography component="subtitle2" variant="subtitle2">
            {props.post.caption}
            </Typography>
            <Typography component="p" variant="p" color="textSecondary">
            {props.post.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className={classes.inputBox}>
          <input placeholder="Add a comment" className={classes.commentInput} />
          <Link
            component="button"
            style={{ fontSize: '13px' }}
          >Post</Link>
        </CardActions>
      </Card>
    </Grid>
  );
} 