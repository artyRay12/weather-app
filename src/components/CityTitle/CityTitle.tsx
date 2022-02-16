import React from 'react'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CityTitle.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { getUserCityName } from '../../redux/geoLocationSlice';
import { useUserGeolocation } from '../../hooks/useUserGeolocation';

export const CityTitle = () => {
  const city = useSelector((state: RootState) => state.geoLocation.currentCity);
  const coords = useSelector((state: RootState) => state.geoLocation.position);
  const [getUserCoords] = useUserGeolocation();
  const isGeolocationTurnOn = useSelector((state: RootState) => state.geoLocation.isGeolocationTurnOn);
  const dispatch = useDispatch();

  const onIconClick = () => {
    if (isGeolocationTurnOn && coords) {
      dispatch(getUserCityName(coords));
    } else {
      getUserCoords();
    }
  }

  const cityName = city || 'Город не выбран';

  return (
    <>
      <h1 className={styles.city}>{cityName}</h1>
      {!isGeolocationTurnOn && <p className={styles.warn}>Требуеться доступ к вашей геолокации</p>}
      <FontAwesomeIcon icon={faMapLocation} color='white' onClick={onIconClick} className={styles.icon} />
    </>
  )
}
