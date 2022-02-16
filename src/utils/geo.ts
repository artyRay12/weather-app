export const getUserCoords = (succ: any, rej: any) => {
  return window.navigator.geolocation.getCurrentPosition(succ, rej);
}