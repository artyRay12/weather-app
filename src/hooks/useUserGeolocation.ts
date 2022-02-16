import { changeGeolocationAccess, getPosition } from "../redux/geoLocationSlice";
import { useDispatch } from 'react-redux';

export const useUserGeolocation = (callback?: any) => {
  const dispatch = useDispatch();
  const saveCoods = (result: any) => {
    const { coords: { latitude: lat, longitude: lon } } = result;
    dispatch(changeGeolocationAccess(true));
    dispatch(getPosition({ lat, lon}));
    callback && callback(false);
  }

  const userGeoIsOff = () => {
    dispatch(changeGeolocationAccess(false));
    callback && callback(true);
  }
  return [() => window.navigator.geolocation.getCurrentPosition(saveCoods, userGeoIsOff)]
}