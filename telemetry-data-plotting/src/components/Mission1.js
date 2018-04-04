import React from 'react';
import {Plot2D, Plot3D } from './Graph';
import { StatusBar } from './StatusBar';
import { lastElementOfArray } from '../lib';

const Mission1 = ( {state} ) => (
  <div id="firstMissionPlots">
      <Plot2D
      dataToPlot={state.Pressure.data}
      packets={state.packets.data}
      title="Barometric Pressure"
      units={state.Pressure.units}
    />

    <Plot2D
      dataToPlot={state.Height.data}
      packets={state.packets.data}
      title="Height"
      units={state.Height.units}
    />

    <Plot3D
      data={state.cartesianCoordinates}
      title = "Descent Path"
    />

    <Plot2D
      dataToPlot={state.Temperature.data}
      packets={state.packets.data}
      title="Temperature"
      units={state.Temperature.units}
    />
    <StatusBar
      dataToDisplay = { [
        {name: "height", value: lastElementOfArray(state.Height.data) },
        {name: "pressure", value: lastElementOfArray(state.Pressure.data) }
      ]}
    />

  </div>
);

export { Mission1 };
