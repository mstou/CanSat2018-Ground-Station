import React from 'react';
import {Plot2D, Plot3D } from './Graph';
import { StatusBar } from './StatusBar';
import { lastElementOfArray } from '../lib';

const Mission1 = ( {state} ) => (
  <div id="firstMissionPlots">

  <div id="StatusBar">
    <StatusBar
      dataToDisplay = { [
        {name: "status", value: "on-flight"},
        {name: "longtitude", value: lastElementOfArray(state.Longtitude.data)},
        {name: "latitude", value: lastElementOfArray(state.Latitude.data)},
        {name: "temperature", value: lastElementOfArray(state.Temperature.data)},
        {name: "height", value: lastElementOfArray(state.Height.data) },
        {name: "pressure", value: lastElementOfArray(state.Pressure.data) }
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
