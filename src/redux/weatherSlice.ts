import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWeatherByCityName } from '../api/weather/weather';
import { kelvinToCelcius } from './../utils/weather';

interface WeatherData {
  temperature: null | number,
  humidity: null | number,
  feelsLikeTemperature: null | number,
  windSpeed: null | number,
}

interface WeatherState {
  isWeather: boolean,
  isError: boolean,
  isLoading: boolean,
  data: WeatherData,
}

const initialState: WeatherState = { 
  isLoading: false,
  isError: false,
  isWeather: false,
  data: { 
    temperature: null,
    humidity: null,
    feelsLikeTemperature: null,
    windSpeed: null,
  }
 }


  export const getWeather = createAsyncThunk(
    "weather/getWeather",
    getWeatherByCityName,
  );


const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state: WeatherState) => {
          state.isError = false;
          state.isLoading = true;
          state.isWeather = false;
      })
      .addCase(getWeather.fulfilled, (state: WeatherState, { payload }) => {
        const { main, wind } = payload;
          state.isError = false;
          state.isLoading = false;
          state.isWeather = true;
          state.data.temperature = kelvinToCelcius(main.temp);
          state.data.feelsLikeTemperature = kelvinToCelcius(main.feels_like);
          state.data.windSpeed = wind.speed;
          state.data.humidity = main.humidity;
        })
      .addCase(getWeather.rejected, (state: WeatherState) => {
          state.isError = true;
          state.isLoading = false;
          state.isWeather = false;
        })
  }
})


export default weatherSlice.reducer;