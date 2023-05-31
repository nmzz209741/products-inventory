import { styled } from '@mui/system';
import { Grid } from '@mui/material';
export const RootContainer = styled('main')({
  width: '50%',
  margin: '0 auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const EmptyContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  flexDirection: 'column'
});

export const ButtonsContainer = styled(Grid)({
  margin: '1em',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

export const CardTitleContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: '10px',
});