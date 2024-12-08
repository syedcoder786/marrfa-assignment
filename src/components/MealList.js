import React, { useState, useEffect } from "react";
import { fetchMeals } from "../services/api";
import {
  Container,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MealCard from "./MealCard";
import MealDetailsDialog from "./MealDetailsDialog";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch meals on component mount
  useEffect(() => {
    const getMeals = async () => {
      try {
        const mealsData = await fetchMeals();
        setMeals(mealsData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    getMeals();
  }, []);

  // Handle search input change
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      setLoading(true);
      try {
        const mealsData = await fetchMeals();
        setMeals(mealsData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
  };

  // Open meal details dialog
  const handleClickOpen = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  // Close meal details dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedMeal(null);
  };

  // Add/remove meal from favorites
  const handleFavorite = (meal) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (fav) => fav.idMeal === meal.idMeal
      );
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.idMeal !== meal.idMeal);
      } else {
        setSnackbarOpen(true);
        return [...prevFavorites, meal];
      }
    });
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Change page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open cart popover
  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close cart popover
  const handleCloseCart = () => {
    setAnchorEl(null);
  };

  const openCart = Boolean(anchorEl);
  const cartId = openCart ? "simple-popover" : undefined;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Meal List
      </Typography>
      <div>
        <IconButton aria-describedby={cartId} onClick={handleCartClick}>
          <Badge badgeContent={favorites.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Popover
          id={cartId}
          open={openCart}
          anchorEl={anchorEl}
          onClose={handleCloseCart}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <List>
            {favorites.map((favorite) => (
              <ListItem key={favorite.idMeal}>
                <ListItemText primary={favorite.strMeal} />
                <IconButton
                  onClick={() => handleFavorite(favorite)}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Popover>
      </div>
      <TextField
        label="Search Meals"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading && <CircularProgress />}
      {error && (
        <Typography color="error">
          Failed to fetch meals. Please try again later.
        </Typography>
      )}
      {!loading && !error && (
        <Grid container spacing={2}>
          {filteredMeals.slice((page - 1) * 12, page * 12).map((meal) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={meal.idMeal}>
              <MealCard
                meal={meal}
                onClickOpen={handleClickOpen}
                onFavorite={handleFavorite}
                favorites={favorites}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && !error && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={page * 12 >= filteredMeals.length}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
      <MealDetailsDialog
        open={open}
        onClose={handleClose}
        selectedMeal={selectedMeal}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Meal added to favorites"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default MealList;
