import React , { Component } from 'react';
import { Mission1, Mission2 } from './components';
import { initialState, parseJSON } from './lib';

//let counter = 0; //testing
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
         const packet = telemetryData;//.slice(0,counter); //testing
         //counter = (counter+1)%200; //testing
         //console.log("Fetched data ",packet);
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
          { ( this.state.plotsToRender === 1 ) ? <Mission1 state={this.state}/> : <Mission2  state={this.state}/> }
        </div>
    );
  }

}
export default Telemetry;
