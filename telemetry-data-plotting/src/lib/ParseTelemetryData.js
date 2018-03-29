
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


const parsePacket1 = (state,packet) => {
  //<PACKET_COUNT>,<STATUS>,<LATITUDE>,<LONGTITUDE>,<ALTITUDE>,<PRESSURE>,<TEMPERATURE>,<CHECK_SUM>
  return Object.freeze({
    ...state,
    Height: {
      ...state.Height,
      data: [...state.Height.data,packet[4]]
    },
    Longtitude: {
      ...state.Longtitude,
      data: [...state.Longtitude.data,packet[3]]
    },
    Latitude: {
      ...state.Latitude,
      data: [...state.Latitude.data,packet[2]]
    },
    Pressure: {
      ...state.Pressure,
      data: [...state.Pressure.data,packet[5]]
    },
    Temperature: {
      ...state.Temperature,
      data: [...state.Temperature.data,packet[6]]
    },

  });
}
const parseData = (state, telemetryPackets) => {

  const packetData = telemetryPackets[telemetryPackets.length-1]
  .split(",")
  .map((item) => parseFloat(item));

  if(!packetIsValid(packetData)){
    console.log("invalid packet");
    return state;
  }

  return parsePacket1(state,packetData);

};

export {initialState, parseData};
