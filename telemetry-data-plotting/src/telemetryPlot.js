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
         const newState = parseJSON(this.state,telemetryData);
         this.setState(newState);
         //console.log(parseJSON(this.state,telemetryData));
      })
      .catch(() => {});
    }, 1000);
  }

  render() {
    // const x1 = [2, 6, 3, 8, 9, 11, 12, 13, 18, 12, 19, 21, 22, 32, 33];
    // const x2 = [73, 74, 75, 76, 77, 78, 79, 80, 90, 100, 111, 123, 122, 110, 73];
    // const y = [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 17, 20, 23, 24, 25];
    return (
      <div id="plots">
        <SinglePlot
          dataToPlot={this.state.Pressure.data}
          packets={this.state.packets.data}
          title="Barometric Pressure"
          units={this.state.Pressure.units}
        />

        <SinglePlot
          dataToPlot={this.state.Height.data}
          packets={this.state.packets.data}
          title="Height"
          units={this.state.Height.units}
        />
      </div>
    );
  }
}
export default Telemetry;
