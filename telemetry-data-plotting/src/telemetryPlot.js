import React , {Component} from 'react';
import {Plot2D, Plot3D} from './components';
import {initialState, parseJSON} from './lib';

//let counter = 0; //testing
class Telemetry extends Component {
  constructor(props) {
    super(props);

    this.state = initialState();

    setInterval(() => {
      fetch('http://localhost:5000/TelemetryData.json',{cache: "reload"})
      .then(response => {
         try{
           return response.json();
         }catch (e) {
          return Promise.reject();
        }
      })
      .then( telemetryData => {
         const packet = telemetryData;//.slice(0,counter); //testing
         //counter = (counter+1)%200; //testing
         console.log("Fetched data ",packet);
         this.setState(parseJSON(this.state,packet));
      })
      .catch(() => {});
    }, 1000);
  }

  changePlots(state,plots){
    this.setState(
      Object.freeze({
      ...state,
      plotsToRender : plots
    })
  );
  }
  render() {

    return (
      <div id="plots">

        <div id="buttons">
            <p>Choose which plots you want to see :</p>
            <button onClick={() => this.changePlots(this.state,1)}> 1st mission </button>
            <button onClick={() => this.changePlots(this.state,2)}> 2nd mission </button>
        </div>
        { (this.state.plotsToRender===1) ?
          ( <div id="firstMissionPlots">
              <Plot2D
              dataToPlot={this.state.Pressure.data}
              packets={this.state.packets.data}
              title="Barometric Pressure"
              units={this.state.Pressure.units}
            />

            <Plot2D
              dataToPlot={this.state.Height.data}
              packets={this.state.packets.data}
              title="Height"
              units={this.state.Height.units}
            />

            <Plot3D
              data={this.state.cartesianCoordinates}
              title = "Descent Path"
            />

            <Plot2D
              dataToPlot={this.state.Temperature.data}
              packets={this.state.packets.data}
              title="Temperature"
              units={this.state.Temperature.units}
            />

          </div>) :

          (<div id="secondMissionPlots">
            <Plot2D
              dataToPlot={this.state.UV_Radiation.data}
              packets={this.state.packets.data}
              title="UV Radiation"
              units={this.state.UV_Radiation.units}
            />

            <Plot2D
              dataToPlot={this.state.Soil_Moisture.data}
              packets={this.state.packets.data}
              title="Soil_Moisture"
              units={this.state.Soil_Moisture.units}
            />
           </div>)
      }

     </div>
    );
  }

}
export default Telemetry;
