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
    UV_Radiation : { data: [], units: 'mW/cm^2' },
    Soil_Moisture : { data: [], units: 'Percentage' },
    cartesianCoordinates : { x: [], y: [], z: [] },
    Status : undefined,
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
  const newCoordinates = sphericalToCartesian(packet[4],packet[3],packet[2]);

  return Object.freeze(
    update(state, {
      Height: {data: {$push: [packet[4]]} },
      Longtitude: {data: {$push: [packet[3]]} },
      Latitude: {data: {$push: [packet[2]]} },
      Pressure: {data: {$push: [packet[5]]} },
      Temperature: {data: {$push: [packet[6]]} },
      cartesianCoordinates: {
        x: {$push: [newCoordinates.x]},
        y: {$push: [newCoordinates.y]},
        z: {$push: [newCoordinates.z]}
      },
      packets: {data: {$push: [packet[0]]} },
      Status : {$set: 1}
    })
  );
}

const parsePacket2 = (state,packet) => {
  //<PACKET_COUNT>,2,<LATITUDE>,<LONGTITUDE>,<UV_RADIATION>,<SOIL MOISTURE>,<CHK_SUM>

  return Object.freeze(
    update(state, {
      Latitude: {data: {$push: [packet[2]]} },
      Longtitude: {data: {$push: [packet[3]]} },
      UV_Radiation: {data: {$push: [packet[4]]} },
      Soil_Moisture: {data: {$push: [packet[5]]} },
      packets: {data: {$push: [packet[0]]} },
      Status: {$set : 2}
    }));
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
    return (state.packets.data.length===0) || (packet[0] > lastElementOfArray(state.packets.data));
  });
  return Object.freeze(
    newPackets.reduce(
    (intermediateState,newPacket) => parseData(intermediateState,newPacket),
    {...state}
  ));
}

export {initialState, parseJSON};
