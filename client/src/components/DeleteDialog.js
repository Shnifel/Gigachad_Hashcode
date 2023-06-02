import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
//Defining Delete dialog
const DeleteConfirmationDialog = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
//SetOpen to true when handleOpen is called
  const handleOpen = () => {
    setOpen(true);
  };
//SetOpen to false when hadleClose is called
  const handleClose = () => {
    setOpen(false);
  };
//call onDelete and set setOpen to false 
  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationDialog;
