import React from 'react';
import styles from './App.module.scss';
import { CitySettings } from './components/CitySettings/CitySettings';
import { Weather } from './components/Weather/Weather';
import { CityTitle } from './components/CityTitle/CityTitle';

function App() {
  return (
    <div className={styles.app}>
      <CitySettings />
      <CityTitle />
      <Weather />
    </div>
  );  
}

export default App;
