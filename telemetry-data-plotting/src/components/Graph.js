import React from 'react';
import Plot from 'react-plotly.js';

const SinglePlot = ({dataToPlot, packets, title, units}) => (
  <Plot
    data={
      [{
        x: packets,
        y: dataToPlot,
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'red'},
    }]}
    layout={
      {width: 420,
      height: 400,
      title: title,
      yaxis: { title: `(${units})`},
      xaxis: { title: "time (s)"},
    }}
  /> );

const Plot3D = ({x,y,z,title}) => (
  <Plot
    data={
      [{
        x: x,
        y: y,
        z: z,
        type: 'scatter3d',
        mode: 'lines+points',
        marker: {color: 'red'},
    }]}
    layout={
      {width: 600,
      height: 600,
      title: title,
    }}
  />
);

export { SinglePlot, Plot3D };
