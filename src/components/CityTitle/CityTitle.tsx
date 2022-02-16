import React, { useEffect, useState } from 'react'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CityTitle.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { getUserCityName } from '../../redux/geoLocationSlice';
import { useUserGeolocation } from '../../hooks/useUserGeolocation';
import { CSSTransition } from 'react-transition-group';
import './WarnAnimation.scss';

export const CityTitle = () => {
  const city = useSelector((state: RootState) => state.geoLocation.currentCity);
  const coords = useSelector((state: RootState) => state.geoLocation.position);
  const isLoading = useSelector((state: RootState) => state.geoLocation.isCityLoading);
  const isGeolocationTurnOn = useSelector((state: RootState) => state.geoLocation.isGeolocationTurnOn);
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [getUserCoords] = useUserGeolocation(setShowWarning);

  const onIconClick = () => {
    if (isGeolocationTurnOn && coords) {
      dispatch(getUserCityName(coords));
    } else {
      getUserCoords();
    }
  }

  useEffect(() => {
    if (isGeolocationTurnOn && showWarning) {
      setShowWarning(false);
    }
  }, [showWarning, isGeolocationTurnOn])
  

  const cityName = city || 'Город не выбран';
  return (
    <>
      <h1 className={styles.city}>{cityName}</h1>
      {!isLoading && (
        <CSSTransition
          in={showWarning}
          out={showWarning}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <div className={styles.warnWrapper}>
            <span
              className={styles.warn}
              onClick={() => setShowWarning(false)}
            >
              Требуеться доступ к геолокации
            </span>
            <FontAwesomeIcon 
              icon={faXmark} 
              color="white" 
              onClick={() => setShowWarning(false)} className={styles.closeIcon}
            />
          </div>
        </CSSTransition>
      )}
      <FontAwesomeIcon
        icon={faMapLocation}
        color='white'
        onClick={onIconClick}
        className={styles.icon}
      />
    </>
  )
}
