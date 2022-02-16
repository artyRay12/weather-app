import axios from "axios"
import { WEATHER_URL } from './weather.model';

export const getWeatherByCityName = (city: string) => {
    return axios.get(`${WEATHER_URL}q=${city}`)
        .then(res => res.data )
}