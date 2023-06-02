import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const ErrorText = styled(Typography)({
  textAlign: 'center',
  color: (theme) => theme.palette.error.main,
});

export const EmptyText = styled(Typography)({
  textAlign: 'center',
  color: (theme) => theme.palette.text.secondary,
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#555',
  display: 'webkitBox',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export default StyledTypography;
