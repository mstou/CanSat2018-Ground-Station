
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
    plotsToRender : 1
  });
}

const packetIsValid = (packet) => {

  const packetSum = packet.slice(0,packet.length-1)
  .reduce( (sum, currentValue) => sum + currentValue );
  return Math.abs(packetSum-packet[packet.length-1])<=0.01; // arduino's precision
};


const parsePacket1 = (state,packet) => {
  //<PACKET_COUNT>,1,<LATITUDE>,<LONGTITUDE>,<ALTITUDE>,<PRESSURE>,<TEMPERATURE>,<CHECK_SUM>
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
    packets: {
      data: [...state.packets.data,packet[0]]
    }
  });
}

const parsePacket2 = (state,packet) => {
  //<PACKET_COUNT>,2,<LATITUDE>,<LONGTITUDE>,<UV_RADIATION>,<SOIL MOISTURE>,<CHK_SUM>
  return Object.freeze({
    ...state,
    Latitude : {
      ...state.Latitude,
      data : [...state.Latitude.data,packet[2]]
    },
    Longtitude : {
      ...state.Longtitude,
      data : [...state.Longtitude.data,packet[3]]
    },
    UV_Radiation : {
      ...state.UV_Radiation,
      data : [...state.UV_Radiation.data,packet[4]]
    },
    Soil_Moisture : {
      ...state.Soil_Moisture,
      data : [...state.Soil_Moisture.data,packet[5]]
    },
    packets: {
      data: [...state.packets.data,packet[0]]
    }
  });
}

const parseData = (state, packet) => {
  if(!packetIsValid(packet)){
    console.log("Invalid packet");
    return state;
  }

  return (packet[1]===1) ? parsePacket1(state,packet) : parsePacket2(state,packet);

};

const parseJSON = (state, packets) => {

  const newPackets = packets.map(
    (packetAsString) =>
    packetAsString.split(",")
    .map((value) => parseFloat(value))
  )
  .filter( (packet) => {
    return (state.packets.data.length===0) || (packet[0] > state.packets.data[state.packets.data.length-1]);
  });
  return Object.freeze(
    newPackets.reduce(
    (intermediateState,newPacket) => parseData(intermediateState,newPacket),
    state
  ));
}

export {initialState, parseJSON};
