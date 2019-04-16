import update from 'immutability-helper';
import { sphericalToCartesian } from './sphericalToCartesian';
import { lastElementOfArray } from './lastElementOfArray';

const initialState = () => {
  return Object.freeze({
    packets : { data: [], units: 's' },
    Height : { data: [], units: 'm' },
    Pressure : { data: [], units: 'hPa' },
    Longtitude : { data: [], units: '°' },
    Latitude : { data: [], units: '°' },
    Temperature : { data: [], units: '°C' },
    Humidity : {data: [], units: ""},
    UVa : { data: [], units: 'mW/cm^2' },
    UVb : { data: [], units: 'mW/cm^2' },
    UVindex : { data: [], units: ""},
    Methane : {data: [], units: ""},
    cartesianCoordinates : { x: [], y: [], z: [] },
  });
}

const packetIsValid = (packet) => {
  const packetSum = packet.slice(0,packet.length-1)
  .reduce( (sum, currentValue) => sum + currentValue );

  return Math.abs(packetSum-packet[packet.length-1])<=0.01; // arduino's precision
};


const parsePacket = (state,packet) => {
  // <PACKET_COUNT>,<LATITUDE>,<LONGTITUDE>,<ALTITUDE>,<TEMPERATURE>,<HUMIDITY>,<PRESSURE>,
  // <TEMPERATURE>,<UVa>,<UVb>,<UVindex>,<METHANE>

  const newCoordinates = sphericalToCartesian(packet[3],packet[2],packet[1]);

  return Object.freeze(
    update(state, {
      Height: {data: {$push: [packet[3]]} },
      Longtitude: {data: {$push: [packet[2]]} },
      Latitude: {data: {$push: [packet[1]]} },
      Pressure: {data: {$push: [packet[6]]} },
      Temperature: {data: {$push: [packet[4]]} },
      Humidity: {data: {$push: [packet[5]]} },
      UVa: {data: {$push: [packet[8]]} },
      UVb: {data: {$push: [packet[9]]} },
      UVindex: {data: {$push: [packet[10]]} },
      Methane: {data: {$push: [packet[11]]} },
      cartesianCoordinates: {
        x: {$push: [newCoordinates.x]},
        y: {$push: [newCoordinates.y]},
        z: {$push: [newCoordinates.z]}
      },
      packets: {data: {$push: [packet[0]]} },
    })
  );
}


const parseData = (state, packet) => {
  // if(!packetIsValid(packet)){
  //   return state;
  // }

  return parsePacket(state,packet);

};

const parseJSON = (state, packets) => {

  const newPackets = packets.map(
    (packetAsString) =>
    packetAsString.split(",")
    .map((value) => parseFloat(value))
  )
  .filter( (packet) => {
    return (state.packets.data.length===0) || (packet[0] > lastElementOfArray(state.packets.data));
  });
  return Object.freeze(
    newPackets.reduce(
    (intermediateState,newPacket) => parseData(intermediateState,newPacket),
    {...state}
  ));
}

export {initialState, parseJSON};
