import React from 'react';
import ReactDOM from 'react-dom';
import Board, { calculateWinner } from './Board';
import './index.css';

const calculateRowCol = (col) => {
  const type = {
    0: ['1', '1'],
    1: ['1', '2'],
    2: ['1', '3'],
    3: ['2', '1'],
    4: ['2', '2'],
    5: ['2', '3'],
    6: ['3', '1'],
    7: ['3', '2'],
    8: ['3', '3'],
  }
  return type[col];
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: new Array(9).fill(null)
        }
      ],
      xIsNext: true,
      currentPosition: [[0, 0]],
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentPosition = this.state.currentPosition.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      currentPosition: currentPosition.concat([calculateRowCol(i)]),
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, line } = calculateWinner(current.squares);
    const move = history.map((step, move) => {
      let row, col
      if (this.state.currentPosition[move]) {
        [row, col] = this.state.currentPosition[move];
      }
      const desc = move ? `Go to move #${move}(${row},${col})` : 'Go to game start';
      return (
        <li key={ move }>
          <button style={{ border: this.state.stepNumber === move ? '5px solid #000' : '' }} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if (!winner && this.state.stepNumber === 9) {
      status = '平局'
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} line={line}/>
        </div>
        <div className="game-info">
          <div>
            {status}
            {this.state.stepNumber > 0 && <span className="game-button" onClick={ () => this.jumpTo(this.state.stepNumber - 1)}>👆</span>}
            {this.state.stepNumber < this.state.history.length - 1 && <span className="game-button" onClick={() => this.jumpTo(this.state.stepNumber + 1)}>👇</span>}
          </div>
          <ol>{ move }</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
