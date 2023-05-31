import { Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 5px 8px 2px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 2px rgba(0, 0, 0, 0.2)',
  },
}));
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderRadius: '10px 10px 0 0',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
}));
