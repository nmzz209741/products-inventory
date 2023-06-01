import React, { useState } from 'react';
import { CircularProgress, Toolbar, Card, CardContent, Alert } from '@mui/material';
import { createProductFn, uploadImageFn } from '../../../api/products';
import { EmptyContainer, RootContainer } from '../../styled-components/layouts/Containers';
import { ProductsListHeader } from '../../views/products/ProductListHeader';
import CreateProductForm from '../../views/products/ProductForm';
import { useHistory } from 'react-router-dom';

const initialFormState = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  imageFile: null,
  isUrlInput: true,
  formErrors: {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    imageFile: ''
  }
};

function CreateProduct() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const validateForm = () => {
    let valid = true;
    let errors = { ...initialFormState.formErrors };

    if (!formData.name.trim()) {
      valid = false;
      errors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      valid = false;
      errors.description = "Product description is required";
    }

    if (!formData.price || formData.price <= 0) {
      valid = false;
      errors.price = "Product price is required and must be greater than zero";
    }

    if (formData.isUrlInput) {
      if (!formData.imageUrl.trim()) {
        valid = false;
        errors.imageUrl = "Image URL is required";
      } else {
        try {
          new URL(formData.imageUrl);
        } catch (error) {
          valid = false;
          errors.imageUrl = "Invalid URL";
        }
      }
    } else {
      if (!formData.imageFile) {
        valid = false;
        errors.imageFile = "Image file is required";
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      formErrors: errors
    }));

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    let product = {
      imageUrl: formData.imageUrl,
      description: formData.description,
      price: formData.price,
      name: formData.name
    };

    if (!formData.isUrlInput) {
      try {
        const uploadedImageUrl = await uploadImageFn(formData.imageFile);
        const updatedFormData = {
          ...formData,
          imageUrl: uploadedImageUrl
        };
        setFormData(updatedFormData);

        product = {
          imageUrl: updatedFormData.imageUrl,
          description: updatedFormData.description,
          price: updatedFormData.price,
          name: updatedFormData.name
        };
      } catch (err) {
        console.error(err);
        setLoading(false);
        return;
      }
    }


    try {
      await createProductFn(product);
      resetForm();
      setSuccess(true);
      setTimeout(() => {
        history.push('/products');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to create product.');
    }

    setLoading(false);
  };

  return (
    <RootContainer>
      <Toolbar />
      {loading ? (
        <EmptyContainer>
          <CircularProgress />
        </EmptyContainer>
      ) : (
        <>
          <ProductsListHeader headingText="Create Product" />
          <Card sx={{ width: '75%' }}>
            <CardContent>
              {success && (
                <Alert severity="success" onClose={() => setSuccess(false)}>
                  Product created successfully! Redirecting ...
                </Alert>
              )}
              {error && (
                <Alert severity="error" onClose={() => setError('')}>
                  {error}
                </Alert>
              )}
              <CreateProductForm
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
                formData={formData}
                setFormData={setFormData}
              />
            </CardContent>
          </Card>
        </>
      )}
    </RootContainer>
  );
}

export default CreateProduct;