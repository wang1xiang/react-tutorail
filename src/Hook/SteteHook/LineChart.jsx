import React, { useContext, useState, useEffect } from 'react';
import Charts from '@ant-design/charts';
import MyContext from './context-manage';

const LineChart: React.FC = () => {

  const chartData = useContext(MyContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const { cases, deaths, recovered, active } = chartData;
    const data = [
      {
        title: 'Cases',
        value: cases
      }, {
        title: 'Deaths',
        value: deaths
      }, {
        title: 'Recovered',
        value: recovered
      }, {
        title: 'Active',
        value: active
      }
    ]
    setData(data);
  }, [chartData])
  const config = {
    data,
    height: 400,
    xField: 'title',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <Charts.Line {...config} />;
};

export default LineChart;