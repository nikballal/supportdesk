import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import noteReducer from "../features/notes/noteSlice";

//bring in the reducers from authSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer, //pick up from state.tickets from Tickets.jsx
    notes: noteReducer,
  },
});
