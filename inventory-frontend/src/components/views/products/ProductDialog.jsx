/**
 * @module ProductDialog
 */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

/**
 * `ProductDialog` is a functional component that renders a dialog window for displaying product details.
 *
 * @function ProductDialog
 * @param {object} props - The props object
 * @param {boolean} props.open - A boolean indicating whether the dialog is open or not
 * @param {object} props.product - The product object
 * @param {string} props.product.name - The product name
 * @param {string} props.product.imageUrl - The product image URL
 * @param {string} props.product.description - The product description
 * @param {function} props.handleClose - The function to be called when the dialog is closed
 * @returns {JSX.Element} The rendered ProductDialog component
 */
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
