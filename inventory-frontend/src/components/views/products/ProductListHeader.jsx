import { Typography } from "@mui/material";

export const ProductsListHeader = ({headingText}) => {
  return (
    <Typography variant="h5" component="h3" gutterBottom>
      {headingText}
    </Typography>
  );
};