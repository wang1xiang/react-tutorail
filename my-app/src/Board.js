import { Component } from 'react';
import Square from './Square';

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return {};
}

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        isWinnerLine={ this.props.line?.includes(i) }
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
              <div key={i} className="board-row">
                {this.renderSquare(i)}
              </div>
            )
          })
        }
      </div>
    );
  }
}
