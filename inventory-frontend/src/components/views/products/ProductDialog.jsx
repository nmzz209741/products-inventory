import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ProductDialog = ({ open, product, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product?.name}</DialogTitle>
      <DialogContent>
        <img src={product?.imageUrl} alt={product?.name} style={{ width: '100%', maxHeight: '50vh', borderRadius: '4px' }} />
        <DialogContentText>{product?.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDialog;
