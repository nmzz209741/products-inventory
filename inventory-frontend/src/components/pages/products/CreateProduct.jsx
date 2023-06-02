/**
 * @module CreateProduct
 */
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
  price: '',
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

/**
 * CreateProduct is a functional component that provides a form for creating a new product.
 *
 * @function CreateProduct
 * @returns {JSX.Element} The rendered CreateProduct form component
 */
function CreateProduct() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  /**
   * Resets the form to its initial state.
   * @function resetForm
   */
  const resetForm = () => {
    setFormData(initialFormState);
  };

  /**
 * Validates the form input values.
 * @function validateForm
 * @returns {boolean} A boolean indicating whether the form data is valid or not.
 */
  const validateForm = () => {
    let valid = true;
    let errors = { ...initialFormState.formErrors };
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!formData.name.trim()) {
      valid = false;
      errors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      valid = false;
      errors.description = "Product description is required";
    }

    if (!formData.price || formData.price <= 0 || !/^\d+(\.\d+)?$/.test(formData.price.toString())) {
      valid = false;
      errors.price = "Product price is required, must be a non-negative integer, and greater than zero";
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
      } else {
        if (formData.imageFile.size > 5242880) {
          valid = false;
          errors.imageFile = "Image file is too large. Please upload a file less than 5MB in size."
        }

        // Check if the MIME type of the file is allowed
        if (!allowedMimes.includes(formData.imageFile.type)) {
          valid = false;
          errors.imageFile = "Unsupported file type. Please upload a JPEG or PNG image."
        }
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      formErrors: errors
    }));

    return valid;
  };

  /**
 * Handles the form submission event.
 * @function handleSubmit
 * @param {object} e - Event object.
 * @returns {Promise<void>}
 */
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
        setError('Failed to create product.');
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
      setError(`Failed to create product. ${err.message}`);
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