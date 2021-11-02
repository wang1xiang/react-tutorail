import React from 'react'
import LineChart from './LineChart';

const State = ({ number, color }) => {
  return <span style={{ color, fontWeight: 'bold' }}>{number}</span>
}
const States = ({ stats }) => {
  const { cases, deaths, recovered, active, updated } = stats;
  return (
    <div className="global-stats">
      <small>Updated on {new Date(updated).toLocaleString()}</small>
      <table>
        <tbody>
          <tr>
            <td>
              Cases: <State number={cases} color="red"></State>
            </td>
            <td>
              Deaths: <State number={deaths} color="gray"></State>
            </td>
            <td>
              Recovered: <State number={recovered} color="green"></State>
            </td>
            <td>
              Active: <State number={active} color="orange"></State>
            </td>
          </tr>
        </tbody>
      </table>
      <LineChart />
    </div>
  )
}

export default States
