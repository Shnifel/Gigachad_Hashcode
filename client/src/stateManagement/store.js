import { configureStore } from '@reduxjs/toolkit';
import stateManager from "./state.js";

export default configureStore({
    reducer: {
      auth: stateManager
    }
  })