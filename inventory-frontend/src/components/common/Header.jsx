/**
 * @module Header
 */

import { Drawer, Button, IconButton, Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Menu } from '@mui/icons-material';
import React, { useState } from 'react';

import { StyledLogoLink, StyledAppBar, StyledDrawerPaper, StyledNavItemLink, StyledToolbar } from '../styled-components/ui/Navbar';

/**
 * `Header` is a functional component that renders a navigation bar.
 * It includes a mobile drawer for smaller screens. The navigation links are defined in the `routes` array.
 * 
 * @function Header
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  const drawerWidth = 240;
  const routes = [
    {
      name: 'Products',
      path: '/products',
    },
    {
      name: 'Add Product',
      path: '/new',
    },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <StyledDrawerPaper onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2, color: '#555' }}>
        Plerion Products
      </Typography>
      <Divider />
      <List>
        {routes.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <StyledNavItemLink to={item.path}>
                <ListItemText primary={item.name} sx={{ color: '#555' }} />
              </StyledNavItemLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawerPaper>
  );

  return (
    <>
      <StyledAppBar component="nav">
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            <StyledLogoLink to="/">Plerion Products</StyledLogoLink>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {routes.map((item) => (
              <StyledNavItemLink key={item.name} to={item.path}>
                <Button sx={{ color: '#fff' }}>{item.name}</Button>
              </StyledNavItemLink>
            ))}
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
