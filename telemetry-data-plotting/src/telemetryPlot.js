import React , {Component} from 'react';
import {SinglePlot} from './components';

class Telemetry extends Component {
  constructor(props) {
    super(props);

    setInterval(() => {
      fetch('http://localhost:3000/TelemetryData.json')
      .then(response => response.json())
      .then( telemetryData => {
        // console.log(telemetryData);
        this.setState(/*parseData(*/telemetryData/*)*/)});
    }, 1000);
  }

  render() {

    return (

      <SinglePlot
      dataToPlot={[2, 6, 3, 8, 9, 11, 12, 13, 18, 12, 19, 21, 22, 32, 33]}
      packets={[1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 17, 20, 23, 24, 25]}
      title="Height"
      />
    );
  }
}
export default Telemetry;
