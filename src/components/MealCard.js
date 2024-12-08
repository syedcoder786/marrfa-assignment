import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

const MealCard = ({ meal, onClickOpen, onFavorite, favorites }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {meal.strMeal}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onClickOpen(meal)}>
          Learn More
        </Button>
        <Button size="small" color="secondary" onClick={() => onFavorite(meal)}>
          {favorites.some(fav => fav.idMeal === meal.idMeal) ? 'Unfavorite' : 'Favorite'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MealCard;
