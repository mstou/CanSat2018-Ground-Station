import React , {Component} from 'react';
import {SinglePlot} from './components';
import {initialState, parseJSON, parseData} from './lib';

//let counter = 0; //testing
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
         const packet = telemetryData//.slice(0,counter); //testing
         //counter = (counter+3)%100; //testing
         this.setState(parseJSON(this.state,packet));
      })
      .catch(() => {});
    }, 1000);
  }

  render() {
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

        <SinglePlot
          dataToPlot={this.state.Temperature.data}
          packets={this.state.packets.data}
          title="Temperature"
          units={this.state.Temperature.units}
        />

        <SinglePlot
          dataToPlot={this.state.UV_Radiation.data}
          packets={this.state.packets.data}
          title="UV Radiation"
          units={this.state.UV_Radiation.units}
        />

        <SinglePlot
          dataToPlot={this.state.Soil_Moisture.data}
          packets={this.state.packets.data}
          title="Soil_Moisture"
          units={this.state.Soil_Moisture.units}
        />

     </div>
    );
  }

}
export default Telemetry;
