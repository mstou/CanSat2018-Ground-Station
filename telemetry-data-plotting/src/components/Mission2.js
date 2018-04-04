import React from 'react';
import { Plot2D } from './Graph';
import { lastElementOfArray } from '../lib'
import { StatusBar } from './StatusBar';

const Mission2 = ({ state }) => (
  <div id="secondMissionPlots">
    <div id="StatusBar">
      <StatusBar
        dataToDisplay = { [
          {name: "status", value: "landed" },
          {name: "soil moisture", value: lastElementOfArray(state.Soil_Moisture.data) },
          {name: "UV radiation", value: lastElementOfArray(state.UV_Radiation.data) }
        ]}
        />
    </div>
    <div id="UV_radiation" className="plot">
      <Plot2D
        dataToPlot={state.UV_Radiation.data}
        packets={state.packets.data}
        title="UV Radiation"
        units={state.UV_Radiation.units}
      />
    </div>

    <div id="soil_moisture" className="plot">
      <Plot2D
        dataToPlot={state.Soil_Moisture.data}
        packets={state.packets.data}
        title="Soil_Moisture"
        units={state.Soil_Moisture.units}
      />
    </div>
   </div>
);
export { Mission2 };
