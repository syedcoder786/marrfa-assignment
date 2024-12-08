import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

const MealDetailsDialog = ({ open, onClose, selectedMeal }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Meal Details</DialogTitle>
      {selectedMeal && (
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              {selectedMeal.strInstructions}
            </Typography>
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealDetailsDialog;
