import React, { Component } from 'react';

class SyncState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  increment() {
    console.log('increment setState前的count', this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log('increment setState后的count', this.state.count);
  }
  triple() {
    console.log('triple setState前的count', this.state.count);
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log('triple setState后的count', this.state.count);
  }
  reduce() {
    setTimeout(() => {
      console.log('reduce setState前的count', this.state.count)
      this.setState({
        count: this.state.count - 1
      });
      console.log('reduce setState后的count', this.state.count)
    }, 0);
  }
  render() {
    return (
      <div>
        <button onClick={() => this.increment()}>增加1</button>
        <button onClick={() => this.triple()}>增加3</button>
        <button onClick={() => this.reduce()}>减少</button>
      </div>
    );
  }
}

export default SyncState;