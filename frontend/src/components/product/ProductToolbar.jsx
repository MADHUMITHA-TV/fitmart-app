import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import "./ProductToolbar.css";

function ProductToolbar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  productCount,
}) {
  return (
    <Paper className="toolbar-card">

      {/* Product Count */}

      <Box className="toolbar-count">

        <Inventory2RoundedIcon
          sx={{
            color: "#2563EB",
            fontSize: 30,
          }}
        />

        <Box>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {productCount} Products
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Explore our premium fitness collection
          </Typography>

        </Box>

      </Box>

      {/* Search + Sort */}

      <Box className="toolbar-actions">

        <TextField
          placeholder="Search fitness products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="toolbar-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        

      </Box>

    </Paper>
  );
}

export default ProductToolbar;