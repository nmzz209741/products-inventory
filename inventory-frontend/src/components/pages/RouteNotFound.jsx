import React from 'react';
import { Box, Toolbar } from '@mui/material';
const RouteNotFound = () => {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <p>Route not found</p>
    </Box>
  );
}

export default RouteNotFound;