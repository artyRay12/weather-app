import { changeGeolocationAccess, getPosition } from "../redux/geoLocationSlice";
import { useDispatch } from 'react-redux';

export const useUserGeolocation = () => {
  const dispatch = useDispatch();
  const saveCoods = (result: any) => {
    const { coords: { latitude: lat, longitude: lon } } = result;
    changeGeolocationAccess(true)
    dispatch(getPosition({ lat, lon}))
  }

  const userGeoIsOff = () => {
    dispatch(changeGeolocationAccess(false));
  }
  return [() => window.navigator.geolocation.getCurrentPosition(saveCoods, userGeoIsOff)]
}
