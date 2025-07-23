import { configureStore, combineReducers} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../hooks/cartslice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "root", storage, whitelist: ["cart"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck:{
      ignoredActions: [FLUSH, PERSIST, REGISTER, REHYDRATE, PAUSE, PURGE]
    }
  })
});

export const persistor = persistStore(store)