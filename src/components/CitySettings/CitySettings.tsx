import React, { useEffect, useState } from 'react'
import styles from './CitySettings.module.scss'
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentCity, getUserCityName } from '../../redux/geoLocationSlice';
import { CityOption, defaultCities } from './CitySettings.model';
import { getCities } from '../../api/geoLocation/geoLocation';
import { RootState } from '../../redux';
import { useUserGeolocation } from './../../hooks/useUserGeolocation';

export const CitySettings = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.geoLocation.currentCity);
  const coords = useSelector((state: RootState) => state.geoLocation.position);
  const lastUsedCity = localStorage.getItem('city');
  const [getUserCoords] = useUserGeolocation();
  const [cityInput, setCityInput] = useState<CityOption>({
    value: '', label: ''
  });

  useEffect(() => {
    if (cityInput.value) {
      dispatch(changeCurrentCity(cityInput.value));
    }
  }, [cityInput]);

  useEffect(() => {
    if (lastUsedCity) {
      dispatch(changeCurrentCity(lastUsedCity))
    } else {
      getUserCoords();
    }
  }, []);

  useEffect(() => {
    dispatch(getUserCityName(coords));
  }, [coords]);

  let searchDelayTimer: any;
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      clearTimeout(searchDelayTimer);
      searchDelayTimer = setTimeout(() => {
        resolve(getCities(inputValue)
          .then((res: any) => { return res.text()})
          .then(data => {
            const { suggestions } = JSON.parse(data);
            const filteredCities = suggestions
              .map(({ data: { settlement, city } }: { data: { settlement: string | null, city: string }}) => city || settlement)
              .filter((city: string) => city);
            const uniqArray = Array.from(new Set(filteredCities)).map(city => ({ label: city, value: city }));
            return uniqArray;
          })
        )}, 1000)
    })

  return (
    <div className={styles.select}>
      <AsyncSelect
        value={currentCity && { label: currentCity, value: currentCity }}
        defaultOptions={defaultCities}
        onChange={(value) => setCityInput(value as CityOption)}
        placeholder="Введите город"
        loadOptions={promiseOptions}
      />
    </div>
  )
}
