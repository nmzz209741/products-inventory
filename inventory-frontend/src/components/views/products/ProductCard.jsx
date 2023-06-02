/**
 * @module ProductCard
 */

import React from 'react';
import { Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import StyledTypography from '../../styled-components/ui/Texts';
import { ViewMoreButton, DeleteButton } from '../../styled-components/ui/Buttons';
import { ButtonsContainer, CardTitleContainer } from '../../styled-components/layouts/Containers';

/**
 * `ProductCard` is a functional component that renders a product card.
 *
 * @function ProductCard
 * @param {object} props - The props object
 * @param {object} props.product - The product object
 * @param {string} props.product.ID - The product ID
 * @param {string} props.product.imageUrl - The product image URL
 * @param {string} props.product.name - The product name
 * @param {number} props.product.price - The product price
 * @param {string} props.product.description - The product description
 * @param {function} props.handleOpen - The function to be called when the 'View More' button is clicked
 * @param {function} props.handleDelete - The function to be called when the 'Delete' button is clicked
 * @returns {JSX.Element} The rendered ProductCard component
 */
export const ProductCard = ({ product, handleOpen, handleDelete }) => {
  const handleDeleteClick = () => {
    handleDelete(product.ID);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardMedia component="img" height="140" image={product.imageUrl} alt={product.name} />
        <CardContent sx={{ flexGrow: 1 }}>
          <CardTitleContainer>
            <StyledTypography variant="h6" component="div">
              {product.name}
            </StyledTypography>
            <StyledTypography variant="body1" component="div">
              <Chip label={`$${product.price}`} variant="filled" />
            </StyledTypography>
          </CardTitleContainer>

          <div
            style={{
              display: 'webkitBox',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: '4em',
              minHeight: '4em'
            }}
          >
            <StyledTypography variant="body2" color="text.secondary">
              {product.description}
            </StyledTypography>
          </div>

        </CardContent>
        <ButtonsContainer>
          <ViewMoreButton variant="contained" onClick={() => handleOpen(product)}>
            View More
          </ViewMoreButton>
          <DeleteButton variant="contained" onClick={handleDeleteClick}>
            Delete
          </DeleteButton>
        </ButtonsContainer>
      </Card>
    </Grid>
  );
};

export default ProductCard;
