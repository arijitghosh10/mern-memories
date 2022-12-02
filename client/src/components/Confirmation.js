import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

const Confirmation = ({ open,handleClose,titleText,contentText,actionText,clickHandler }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {titleText}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={clickHandler}>
                    {actionText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Confirmation;
