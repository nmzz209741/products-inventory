import React, { useState, useEffect } from 'react';
import { Toolbar, Grid, CircularProgress, Alert } from '@mui/material';
import ProductCard from '../../views/products/ProductCard';
import ProductDialog from '../../views/products/ProductDialog'
import { deleteProductFn, getProductsFn } from '../../../api/products';
import { RootContainer, EmptyContainer } from '../../styled-components/layouts/Containers';
import { AddButton, AddButtonContainer } from '../../styled-components/ui/Buttons';
import { ErrorText, EmptyText } from '../../styled-components/ui/Texts';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import emptyInventory from '../../../assets/images/emptyInventory.png';
import errorIcon from '../../../assets/images/errorIcon.png';
import { ProductsListHeader } from '../../views/products/ProductListHeader';

export default function ProductsList() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductFn(productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product.ID !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setDeleteError('Failed to delete the product.');
    }
  };


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await getProductsFn();
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadingContainer = (
    <EmptyContainer>
      <CircularProgress />
    </EmptyContainer>
  );

  const errorContainer = (
    <EmptyContainer>
      <img src={errorIcon} alt="Error fetching from database." height={'100px'} width={'100px'} />
      <ErrorText variant="p">Error loading the products at the moment. Please try again later.</ErrorText>
    </EmptyContainer>
  );

  const emptyContainer = (
    <EmptyContainer>
      <img src={emptyInventory} alt="No products" height={'100px'} width={'100px'} />
      <EmptyText variant="p">The inventory seems empty at the moment. Please add new products.</EmptyText>
    </EmptyContainer>
  );

  const productsGrid = (
    <>
      <ProductsListHeader headingText={'Inventory Products'}/>
      <Grid container spacing={2}>
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} handleOpen={handleOpen} handleDelete={handleDelete} />
        ))}
      </Grid>
    </>
  );
  let content;

  if (isLoading) {
    content = loadingContainer;
  } else if (error) {
    content = errorContainer;
  } else if (products.length === 0) {
    content = emptyContainer;
  } else {
    content = productsGrid;
  }

  return (
    <>
      <RootContainer>
        <Toolbar />
        {content}
        <AddButtonContainer>
          <AddButton variant="contained" component={Link} to="/new" startIcon={<Add />}>
            Add New Product
          </AddButton>
        </AddButtonContainer>
        {selectedProduct && (
          <ProductDialog open={open} product={selectedProduct} handleClose={handleClose} />
        )}
        {deleteError && <Alert severity="error">{deleteError}</Alert>}
      </RootContainer>
    </>
  );
}
