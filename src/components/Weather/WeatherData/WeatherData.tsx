import React from 'react'
import styles from './WeatherData.module.scss';

interface WeatherDataProps {
  temperature: number | null,
  feelsLikeTemperature: number | null,
  windSpeed: number | null,
  humidity: number | null,
}

export const WeatherData = (props: WeatherDataProps) => {
  const {
    temperature,
    feelsLikeTemperature,
    windSpeed,
    humidity,
  } = props;

  return (
    <div className={styles.weather}>
      <p>temp: {temperature}°</p>
      <p>feels like: {feelsLikeTemperature}°</p>
      <p>wind speed: {windSpeed}m/s</p>
      <p>Humidity: {humidity}%</p>
    </div>
  )
}
