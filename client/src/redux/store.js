// Import necessary functions from the Redux Toolkit library
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import slices to combine into the root reducer
import alertsSlice from "./alertsSlice";
import usersSlice from "./usersSlice";

// Combine slices into the root reducer
const rootReducer = combineReducers({
  // The alerts slice handles loading state
  alerts: alertsSlice,

  // The users slice manages user-related state
  users: usersSlice,
});

// Configure the Redux store with the combined root reducer
const store = configureStore({
  reducer: rootReducer,
});

// Export the configured Redux store
export default store;
