import React from 'react';
import { TextField, Input, Switch, FormControlLabel, Typography, Box, Grid } from '@mui/material';
import { AddButton } from '../../styled-components/ui/Buttons';

const CreateProductForm = ({ handleSubmit, error, formData, setFormData }) => {
  const { name, description, price, imageUrl, isUrlInput, formErrors } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSwitchChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      isUrlInput: !prevData.isUrlInput
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: e.target.files[0]
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" flexDirection="column" gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              type="number"
              label="Price"
              name="price"
              value={price}
              onChange={handleChange}
              error={Boolean(formErrors.price)}
              helperText={formErrors.price}
              fullWidth
            />
          </Grid>
        </Grid>
        <TextField
          required
          multiline
          rows={4}
          label="Description"
          name="description"
          value={description}
          onChange={handleChange}
          error={Boolean(formErrors.description)}
          helperText={formErrors.description}
          fullWidth
        />
        <Grid container alignItems="center" spacing={2}>
        <Grid item xs={9}>
            {isUrlInput ? (
              <TextField
                required
                label="Image URL"
                name="imageUrl"
                value={imageUrl}
                onChange={handleChange}
                error={Boolean(formErrors.imageUrl)}
                helperText={formErrors.imageUrl}
                fullWidth
              />
            ) : (
              <Input
              required
              type="file"
              inputProps={{
                accept: 'image/*',
                onChange: handleFileChange,
              }}
            />
            )}
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={<Switch color="default" checked={isUrlInput} onChange={handleSwitchChange} />}
              label="Use URL for image"
            />
          </Grid>

        </Grid>
        <AddButton type="submit" variant="contained">
          Create Product
        </AddButton>
      </Box>
    </form>
  );
};

export default CreateProductForm;