/**
 * @module App
 */
import React from 'react';
import AppRouter from './router/AppRouter';
/**
 * `App` is a functional component that serves as the root of your application.
 * It renders the `AppRouter` component.
 *
 * @function App
 * @returns {JSX.Element} The `AppRouter` component
 */
const App = () => {
  return (
    <AppRouter />
  );
};

export default App;
