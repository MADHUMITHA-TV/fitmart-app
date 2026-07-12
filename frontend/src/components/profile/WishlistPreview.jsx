import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./WishlistPreview.css";

function WishlistPreview() {

  const navigate = useNavigate();

  const { wishlist } = useSelector(
    (state) => state.wishlist
  );

  const items =
    wishlist?.items?.slice(0, 4) || [];

  return (

    <Card className="wishlist-card">

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          mb={3}
        >

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Wishlist
          </Typography>

          <Button
            onClick={() =>
              navigate("/wishlist")
            }
          >
            View All
          </Button>

        </Box>

        {items.length === 0 ? (

          <Typography color="text.secondary">
            Wishlist is empty.
          </Typography>

        ) : (

          <Grid container spacing={3}>

            {items.map((item) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item.productId}
              >

                <Card className="wish-product">

                  <CardMedia
                    component="img"
                    height="170"
                    image={item.imageUrl}
                  />

                  <CardContent>

                    <Typography
                      fontWeight={700}
                      noWrap
                    >
                      {item.productName}
                    </Typography>

                    <Typography
                      color="primary"
                      fontWeight={700}
                      mt={1}
                    >
                      ₹{item.price}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        navigate(
                          `/products/${item.productId}`
                        )
                      }
                    >
                      View Product
                    </Button>

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        )}

      </CardContent>

    </Card>

  );

}

export default WishlistPreview;