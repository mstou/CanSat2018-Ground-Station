import React , { Component } from 'react';
import { Mission1 } from './components';
import { initialState, parseJSON } from './lib';

class Telemetry extends Component {
  constructor(props) {
    super(props);

    this.state = initialState();

    setInterval(() => {
      fetch('http://localhost:3000/TelemetryData.json',{cache: "reload"})
      .then(response => {
         try{
           return response.json();
         }catch (e) {
          return Promise.reject();
        }
      })
      .then( telemetryData => {
         this.setState(parseJSON(this.state,telemetryData));
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
          <Mission1 state={this.state}/>
      </div>
    );
  }

}
export default Telemetry;
