import axios from "axios";
import { GEOLOCATION_DEFINE_URL, GET_CITIES_URL } from './geoLocation.model';

export const getUserCity = async (coords: any) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.REACT_APP_ENV_DADATA_TOKEN}`,
    },
  };
  const optionsWithGeoData = {
    ...options,
    body: JSON.stringify(coords),
  };

  const data = JSON.parse(optionsWithGeoData.body);
  const config = {
    headers: {
      Authorization: optionsWithGeoData.headers.Authorization,
    },
  };
  
  return axios.post(GEOLOCATION_DEFINE_URL, data, config).then(res => res.data)
};


export const getCities = (city: string) => {
  var query = city;

  var options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + process.env.REACT_APP_ENV_DADATA_TOKEN,
      },
      body: JSON.stringify({query: query})
  }
  //@ts-ignore
  return fetch(GET_CITIES_URL, options)
}
