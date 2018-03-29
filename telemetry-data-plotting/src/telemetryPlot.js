import React , {Component} from 'react';
import {SinglePlot} from './components';
import {initialState, parseJSON} from './lib';

class Telemetry extends Component {
  constructor(props) {
    super(props);

    this.state = initialState();

    setInterval(() => {
      fetch('http://localhost:3000/TelemetryData.json')
      .then(response => {
         try{
           return response.json();
         }catch (e) {
          return Promise.reject();
        }
      })
      .then( telemetryData => {
         this.setState(parseJSON(this.state,telemetryData))
         //console.log(parseJSON(this.state,telemetryData));
      })
      .catch(() => {});
    }, 1000);
  }

  render() {
    const x1 = [2, 6, 3, 8, 9, 11, 12, 13, 18, 12, 19, 21, 22, 32, 33];
    const x2 = [73, 74, 75, 76, 77, 78, 79, 80, 90, 100, 111, 123, 122, 110, 73];
    const y = [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 17, 20, 23, 24, 25];
    return (
      <div id="plots">
        <SinglePlot
          dataToPlot={x1}
          packets={y}
          title="Height"
        />

        <SinglePlot
          dataToPlot={x2}
          packets={y}
          title="Random Title"
        />
      </div>
    );
  }
}
export default Telemetry;
