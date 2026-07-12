import {
  Paper,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Box,
  Chip,
} from "@mui/material";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import "./ProductFilters.css";

function ProductFilters({
  categories,
  category,
  setCategory,
  price,
  setPrice,
}) {
  return (
    <Paper className="filter-card">

      {/* Header */}

      <Box className="filter-header">

        <FilterAltRoundedIcon
          sx={{
            color: "#2563EB",
            fontSize: 30,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Filters
        </Typography>

      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* CATEGORY */}

      <Box className="filter-section">

        <Box className="filter-title">

          <CategoryRoundedIcon
            sx={{ fontSize: 20 }}
          />

          <Typography fontWeight={700}>
            Categories
          </Typography>

        </Box>

        <RadioGroup
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <FormControlLabel
            value=""
            control={<Radio />}
            label="All Products"
          />

          {categories.map((cat) => (

            <FormControlLabel
              key={cat.id}
              value={cat.id}
              control={<Radio />}
              label={cat.name}
            />

          ))}

        </RadioGroup>

      </Box>

      <Divider sx={{ my: 3 }} />

      {/* PRICE */}

      <Box className="filter-section">

        <Box className="filter-title">

          <CurrencyRupeeRoundedIcon
            sx={{ fontSize: 20 }}
          />

          <Typography fontWeight={700}>
            Price Range
          </Typography>

        </Box>

        <Slider
          value={price}
          onChange={(e, value) =>
            setPrice(value)
          }
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={500}
          color="primary"
        />

        <Box
          display="flex"
          justifyContent="space-between"
          mt={1}
        >

          <Chip
            label={`₹${price[0]}`}
            color="primary"
            variant="outlined"
          />

          <Chip
            label={`₹${price[1]}`}
            color="primary"
          />

        </Box>

      </Box>

    </Paper>
  );
}

export default ProductFilters;