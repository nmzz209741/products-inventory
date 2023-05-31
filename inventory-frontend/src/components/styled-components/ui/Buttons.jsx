import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const AddButtonContainer = styled(Box)({
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
});

export const AddButton = styled(Button)({
  marginTop: '8px',
  backgroundColor: '#212121',
  '&:hover': {
    backgroundColor: '#666',
  },
});

export const ViewMoreButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#e0e0e0',
  color: '#333',
  '&:hover': {
    backgroundColor: '#bdbdbd',
  },
});

export const DeleteButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#f44336',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
