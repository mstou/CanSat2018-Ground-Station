
const initialState = () => {
  return Object.freeze({
    packets : { data: [], units: 's' },
    Height : { data: [], units: 'm' },
    Pressure : { data: [], units: 'hPa' },
    Longtitude : { data: [], units: '°' },
    Latitude : { data: [], units: '°' },
    Temperature : { data: [], units: '°C' },
    UV_Radiation : { data: [], units: 'mW/cm^2' },
    Soil_Moisture : { data: [], units: 'Percentage' },
    State : undefined,
  })
}

const packetIsValid = (packet) => (
  packet.slice(2,packet.length-1)
  .reduce( (sum, currentValue) => sum + currentValue ) === packet[packet.length-1] //check sum
);

const parseData = (state, telemetryPackets) => {
  //<PACKET_COUNT>,<STATUS>,<LATITUDE>,<LONGTITUDE>,<ALTITUDE>,<PRESSURE>,<TEMPERATURE>,<CHECK_SUM>
  const packetData = telemetryPackets[telemetryPackets.length-1].split(",");
  if(!packetIsValid(packetData[packetData.length-1])){
    return state;
  }
  return Object.freeze({
    ...state,
    Height: {
      ...state.Height,
      data: [...state.Height.data,packetData[4]]
    },
    Longtitude: {
      ...state.Longtitude,
      data: [...state.Longtitude.data,packetData[3]]
    },
    Latitude: {
      ...state.Latitude,
      data: [...state.Latitude.data,packetData[2]]
    },
    Pressure: {
      ...state.Longtitude,
      data: [...state.Longtitude.data,packetData[3]]
    },
    Temperature: {
      ...state.Longtitude,
      data: [...state.Temperature.data,packetData[6]]
    },

  });

};

export {initialState, parseData};
