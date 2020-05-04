import React from 'react';
import { Toolbar, IconButton,  AppBar, Container, Fab } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import PostUploadModal from './PostUploadModal';

const useStyles = makeStyles(theme => ({
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

export default function BottomAppBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBarBottom} {...props}>
                <Container maxWidth="sm">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.onFeedClick}>
                            <HomeRoundedIcon />
                        </IconButton>
                        <Fab color="primary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen} >
                            <AddIcon />
                        </Fab>
                        {open ? <PostUploadModal open={open} close={handleClose} /> : null}
                        <div className={classes.grow} />
                        <IconButton edge="end" color="inherit" onClick={props.onProfileClick}>
                            <PersonRoundedIcon/>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
    </React.Fragment>
  );
}