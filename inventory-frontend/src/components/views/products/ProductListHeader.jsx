/**
 * @module ProductsListHeader
 */
import { Typography } from "@mui/material";

/**
 * `ProductsListHeader` is a functional component that renders a header for the products list.
 *
 * @function ProductsListHeader
 * @param {object} props - The props object
 * @param {string} props.headingText - The text to be displayed in the header
 * @returns {JSX.Element} The rendered ProductsListHeader component
 */
export const ProductsListHeader = ({headingText}) => {
  return (
    <Typography variant="h5" component="h3" gutterBottom>
      {headingText}
    </Typography>
  );
};