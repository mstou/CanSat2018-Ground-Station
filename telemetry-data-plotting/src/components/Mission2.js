import React from 'react';
import { Plot2D } from './Graph';
import { lastElementOfArray } from '../lib'
import { StatusBar } from './StatusBar';

const Mission2 = ({ state }) => (
  <div id="secondMissionPlots">
    <Plot2D
      dataToPlot={state.UV_Radiation.data}
      packets={state.packets.data}
      title="UV Radiation"
      units={state.UV_Radiation.units}
    />

    <Plot2D
      dataToPlot={state.Soil_Moisture.data}
      packets={state.packets.data}
      title="Soil_Moisture"
      units={state.Soil_Moisture.units}
    />

    <StatusBar
      dataToDisplay = { [
        {name: "status", value: "landed" },
        {name: "soil moisture", value: lastElementOfArray(state.Soil_Moisture.data) },
        {name: "UV radiation", value: lastElementOfArray(state.UV_Radiation.data) }
      ]}
    />

   </div>
);
export { Mission2 };
