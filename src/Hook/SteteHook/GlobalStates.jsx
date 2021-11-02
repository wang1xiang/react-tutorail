import React, { useState, useEffect } from 'react'
import States from './States'
import MyContext from './context-manage.js';
import useBodyScrollPosition from '../customeHook/useBodyScrollPosition';

const GlobalStates = () => {
  const [globalStates, setGlobalStates] = useState({});
  const [chartData, setChartData] = useState([]);
  const { scrollPosition } = useBodyScrollPosition;
  console.log(scrollPosition);
  useEffect(() => {
    const fetchGlobalStates = async () => {
      const res = await fetch('https://corona.lmao.ninja/v3/covid-19/all');
      const data = await res.json();
      setChartData(data);
      setGlobalStates(data);
    }
    fetchGlobalStates();
    const intervalId = setInterval(fetchGlobalStates(), 5000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="App">
      <h1>COVID-19</h1>
      <MyContext.Provider value={ chartData }>
        <States stats={globalStates}></States>
      </MyContext.Provider>
    </div>
  )
}

export default GlobalStates
