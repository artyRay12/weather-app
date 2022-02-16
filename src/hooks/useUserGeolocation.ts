import { changeGeolocationAccess, getPosition } from "../redux/geoLocationSlice";
import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction } from "react";

export const useUserGeolocation = (showGeolocationWarining?: Dispatch<SetStateAction<boolean>>) => {
  const dispatch = useDispatch();
  const saveCoods = (result: any) => {
    const { coords: { latitude: lat, longitude: lon } } = result;
    dispatch(changeGeolocationAccess(true));
    dispatch(getPosition({ lat, lon}));
    showGeolocationWarining && showGeolocationWarining(false);
  }

  const userGeoIsOff = () => {
    dispatch(changeGeolocationAccess(false));
    showGeolocationWarining && showGeolocationWarining(true);
  }
  return [() => window.navigator.geolocation.getCurrentPosition(saveCoods, userGeoIsOff)]
}