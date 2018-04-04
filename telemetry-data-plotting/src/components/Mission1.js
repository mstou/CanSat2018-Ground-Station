import React from 'react';
import {Plot2D, Plot3D } from './Graph';
import { StatusBar } from './StatusBar';
import { lastElementOfArray } from '../lib';

const Mission1 = ( {state} ) => (
  <div id="firstMissionPlots">

  <div id="StatusBar">
    <StatusBar
      dataToDisplay = { [
        {name: "Status", value: "on-flight", units: ""},
        {name: "Latitude", value: lastElementOfArray(state.Latitude.data), units: state.Latitude.units},
        {name: "Longtitude", value: lastElementOfArray(state.Longtitude.data), units: state.Longtitude.units},
        {name: "Temperature", value: lastElementOfArray(state.Temperature.data), units: state.Temperature.units},
        {name: "Height", value: lastElementOfArray(state.Height.data), units: state.Height.units},
        {name: "Pressure", value: lastElementOfArray(state.Pressure.data), units: state.Pressure.units}
      ]}
    />
  </div>
  <div id="pressure" className="plot">
      <Plot2D
      dataToPlot={state.Pressure.data}
      packets={state.packets.data}
      title="Barometric Pressure"
      units={state.Pressure.units}
    />
    </div>
    <div id="height" className="plot">
      <Plot2D
        dataToPlot={state.Height.data}
        packets={state.packets.data}
        title="Height"
        units={state.Height.units}
      />
    </div>
    <div id="temperature" className="plot">
    <Plot2D
      dataToPlot={state.Temperature.data}
      packets={state.packets.data}
      title="Temperature"
      units={state.Temperature.units}
    />
    </div>
    <div id="cartesianCoordinates" className="plot">

      <Plot3D
        data={state.cartesianCoordinates}
        title = "Descent Path"
      />
    </div>

  </div>
);

export { Mission1 };
