import React, { useState } from 'react'
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
  const [getUserCoords] = useUserGeolocation();
  const isGeolocationTurnOn = useSelector((state: RootState) => state.geoLocation.isGeolocationTurnOn);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(isGeolocationTurnOn);

  const onIconClick = () => {
    if (isGeolocationTurnOn && coords) {
      setShowMessage(false);
      dispatch(getUserCityName(coords));
    } else {
      setShowMessage(true);
      getUserCoords();
    }
  }

  const cityName = city || 'Город не выбран';
  
  return (
    <>
      <h1 className={styles.city}>{cityName}</h1>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div className={styles.warnWrapper}>
          <span className={styles.warn}>Требуеться доступ к геолокации</span>
          <FontAwesomeIcon icon={faXmark} color="white" onClick={() => setShowMessage(false)} className={styles.closeIcon}/>
        </div>
      </CSSTransition>
      <FontAwesomeIcon icon={faMapLocation} color='white' onClick={onIconClick} className={styles.icon} />
    </>
  )
}
