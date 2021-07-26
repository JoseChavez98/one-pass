import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './features/credentials/credentialsSlicer';

export default configureStore({
  reducer: {
    credentials: credentialsReducer
  }
});
