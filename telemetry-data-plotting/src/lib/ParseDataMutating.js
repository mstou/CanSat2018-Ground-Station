
const parseData = (state, packets) => {
  console.log("input state",state);

  const newPackets = packets.map(
    (packetAsString) =>
    packetAsString.split(",")
    .map((value) => parseFloat(value))
  )
  .filter( (packet) => {
    return (state.packets.data.length===0) || (packet[0] > state.packets.data[state.packets.data.length-1]);
  })

  if(newPackets.length===0) return state;

  const packet = newPackets[packets.length-1];
  console.log(packet);

  if(packet[1]===1){
    console.log("type1");
    //<PACKET_COUNT>,1,<LATITUDE>,<LONGTITUDE>,<ALTITUDE>,<PRESSURE>,<TEMPERATURE>,<CHECK_SUM>
    state.Latitude.data.push(packet[2]);
    state.Longtitude.data.push(packet[3]);
    state.Height.data.push(packet[4]);
    state.Pressure.data.push(packet[5]);
    state.Temperature.data.push(packet[6]);
    state.packets.data.push(packet[0]);
    state.State = 1;
  } else {
    console.log("type2");
    //<PACKET_COUNT>,2,<LATITUDE>,<LONGTITUDE>,<UV_RADIATION>,<SOIL MOISTURE>,<CHK_SUM>
    state.Latitude.data.push(packet[2]);
    state.Longtitude.data.push(packet[3]);
    state.UV_Radiation.data.push(packet[4]);
    state.Soil_Moisture.data.push(packet[5]);
    state.packets.data.push(packet[0]);
    state.State = 2;
  }
  console.log("output state",state);
  return state;
}
 export { parseData };
