import {
  Box,
  Pagination,
} from "@mui/material";

import "./ProductPagination.css";

function ProductPagination({
  page,
  totalPages,
  onChange,
}) {

  if (totalPages <= 1) return null;

  return (

    <Box className="pagination-wrapper">

      <Pagination

        page={page}

        count={totalPages}

        onChange={(_, value) =>
          onChange(value)
        }

        shape="rounded"

        color="primary"

        size="large"

      />

    </Box>

  );

}

export default ProductPagination;