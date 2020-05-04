import React, { useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Input, TextField, DialogActions, Button, Snackbar } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { uploadPost } from '../redux/actions/postActions'

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const PostUploadModal = ({ uploadPost, close, open }) => {
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState('')
    const [caption, setCaption] = useState('');
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });
    
    const { vertical, horizontal } = state;

    const resetFile = e => {
        e.preventDefault();
        setFile(null)
        setFileURL('')
    }
    const onUpload = e => {
        e.preventDefault();
        setFile(e.target.files[0])
        setFileURL(URL.createObjectURL(e.target.files[0]))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        uploadPost(caption, file).then(() => close())
    }

    return (
        <React.Fragment>
            <Dialog onClose={close} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={close}>
                    New Post
        </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <div style={{ display: 'inline' }}>
                            <Input type="file" onChange={onUpload} accept="image/*" />
                            {file && (
                                <Button autoFocus color="primary" style={{ float: 'right' }} onClick={resetFile}>Remove File</Button>
                            )}
                        </div>
                        <img style={{ width: "100%" }} src={fileURL} />
                        <TextField multiline={true} label="Add a caption" style={{ width: '100%', marginTop: '20px' }} onChange={e => setCaption(e.target.value)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onSubmit} color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


PostUploadModal.propTypes = {
    uploadPost: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts,
    newPost: state.newPost
})

export default connect(
    mapStateToProps,
    { uploadPost }
)(PostUploadModal);