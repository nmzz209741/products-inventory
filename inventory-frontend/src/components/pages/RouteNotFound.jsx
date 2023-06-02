/**
 * @module RouteNotFound
 */
import React from 'react';
import { Toolbar } from '@mui/material';
import notfound from '../../assets/images/notfound.png'
import { RootContainer, EmptyContainer } from '../styled-components/layouts/Containers';
import { EmptyText } from '../styled-components/ui/Texts';

/**
 * `RouteNotFound` is a functional component that renders a 404 error message.
 *
 * @function RouteNotFound
 * @returns {JSX.Element} The rendered RouteNotFound component
 */
const RouteNotFound = () => {
  return (
    <RootContainer>
      <Toolbar />
      <EmptyContainer>
        <img src={notfound} alt="No products" height={'400px'}  />
        <EmptyText variant="p">Ooops! Seems like you've the wrong URL : 404 Route Not Found</EmptyText>
      </EmptyContainer>
    </RootContainer>
  );
}

export default RouteNotFound;