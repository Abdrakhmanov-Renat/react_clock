import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

export class App extends React.Component {
  state = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
  };

  timerIdClock = 0;

  timerId = 0;

  getRandomName(): string | undefined {
    const value = Date.now().toString().slice(-4);

    if (this.state.hasClock) {
      return `Clock-${value}`;
    } else {
      return;
    }
  }

  handlePageClick = () => {
    this.setState({ hasClock: true });
  };

  handlePageRightClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({ hasClock: false });
  };

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.handlePageRightClick);

    document.addEventListener('click', this.handlePageClick);

    this.timerIdClock = window.setInterval(() => {
      this.setState({ clockName: this.getRandomName() });
    }, 3300);

    this.timerId = window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handlePageClick);
    document.removeEventListener('contextmenu', this.handlePageRightClick);

    window.clearInterval(this.timerIdClock);
    window.clearInterval(this.timerId);
  }

  render() {
    const { hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <Clock name={this.state.clockName} date={this.state.today} />
        )}
      </div>
    );
  }
}
