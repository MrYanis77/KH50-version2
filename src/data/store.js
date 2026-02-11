import { configureStore } from '@reduxjs/toolkit';
import temoignageReducer from './temoignageSlice'; // Assure-toi que le nom du fichier slice correspond

export const store = configureStore({
  reducer: {
    temoignage: temoignageReducer,
  },
});