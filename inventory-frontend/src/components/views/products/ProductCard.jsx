import React from 'react';
import { Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import StyledTypography from '../../styled-components/ui/Texts';
import { ViewMoreButton, DeleteButton } from '../../styled-components/ui/Buttons';
import { ButtonsContainer, CardTitleContainer } from '../../styled-components/layouts/Containers';

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
              display: '-webkit-box',
              '-webkit-line-clamp': 3,
              '-webkit-box-orient': 'vertical',
              overflow: 'clip',
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
