import React, { Component } from 'react'

const Columns = () => {
  return (
    // <>
    //   <td>Hello</td>
    //   <td>World</td>
    // </>
    <React.Fragment>
      <td>Hello</td>
      <td>World</td>
    </React.Fragment>
  )
}

export default class index extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>
    )
  }
}
