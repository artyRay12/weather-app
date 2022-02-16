import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import weatherSlice from "./weatherSlice";
import geoLocationSlice from "./geoLocationSlice"

const appReducer = combineReducers({
    weather: weatherSlice,
    geoLocation: geoLocationSlice,
  });

  export const store = configureStore({
    reducer: appReducer,
    middleware: [thunk],
  });

  export type RootState = ReturnType<typeof appReducer>