import { AppBar, Toolbar, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import styled from '@emotion/styled';

export const StyledAppBar = styled(AppBar)`
  background-color: #212121;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export const StyledLogoLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledNavItemLink = styled(NavLink)`
  text-decoration: none;
  color: #555;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledDrawerPaper = styled(Box)`
  width: 240px;
`;