// Import necessary functions from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing user-related state
const usersSlice = createSlice({
  // Name of the slice
  name: "users",

  // Initial state of the slice
  initialState: {
    user: null,
  },

  // Reducers define how the state should be updated in response to actions
  reducers: {
    // Action to set user information in the state
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the action generated by the slice
export const { SetUser } = usersSlice.actions;

// Export the reducer function to be used in the Redux store
export default usersSlice.reducer;
