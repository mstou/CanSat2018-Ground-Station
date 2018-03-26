import React from 'react';
import Plot from 'react-plotly.js';

const SinglePlot = ({dataToPlot,packets,title}) => (
  <Plot
  data={
    [{
      x: packets,
      y: dataToPlot,
      type: 'scatter',
      mode: 'lines+points',
      marker: {color: 'red'},
    }]}
  layout={{width: 420, height: 400, title: title }}
/> );


export { SinglePlot };
