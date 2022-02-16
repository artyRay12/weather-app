import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as geoLocationApi from '../api/geoLocation/geoLocation'

interface GeoPosition {
  lat: number,
  ion: number,
}

interface  GeoLocation{
  position: GeoPosition | null,
  currentCity: string | null,
  isGeolocationTurnOn: boolean,
}

const initialState: GeoLocation = { 
  position: null,
  currentCity: null,
  isGeolocationTurnOn: true,
 }

 export const getUserCityName = createAsyncThunk(
    "geoLocation/getUserCityName",
    geoLocationApi.getUserCity,
  );


const geoLocationSlice = createSlice({
  name: 'geoLocation',
  initialState,
  reducers: {
    getPosition(state, { payload }) {
      state.isGeolocationTurnOn = true;
      state.position = payload;
    },
    changeCurrentCity(state, { payload }) {
      state.currentCity = payload;
      localStorage.setItem('city', payload);
    },
    changeGeolocationAccess(state, { payload }) {
      state.isGeolocationTurnOn = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCityName.fulfilled, (state: GeoLocation, { payload }) => {
        const { suggestions } = payload;
        if (suggestions.length !== 0) {
          state.currentCity = suggestions[0].data.city;
          localStorage.setItem('city', suggestions[0].data.city);
        }
      })
    }
  })



export const { getPosition, changeCurrentCity, changeGeolocationAccess } = geoLocationSlice.actions
export default geoLocationSlice.reducer;