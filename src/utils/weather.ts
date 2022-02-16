const KELVIN_COEF = 273.15;
export const kelvinToCelcius = (kelvinTemp: number) => Math.round(kelvinTemp - KELVIN_COEF);