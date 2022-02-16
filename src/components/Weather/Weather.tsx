import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { getWeather } from '../../redux/weatherSlice';
import { Spinner } from '../Spinner/Spinner';
import { WeatherData } from './WeatherData/WeatherData';
import styles from './Weather.module.scss'

export const Weather = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);
  const city = useSelector((state: RootState) => state.geoLocation.currentCity);

  useEffect(() => {
    if (city) {
      dispatch(getWeather(city));
    }
  }, [dispatch, city])

  const {
    isError,
    isLoading,
    isWeather,
    data,
  } = weather;
  return (
    <div className={styles.dashboard}>
      {(isWeather) && <WeatherData {...data} />}
      {(isLoading) && <Spinner />}
      {(isError) && <p>Не удалось получить погоду</p>}
    </div>
  )
}