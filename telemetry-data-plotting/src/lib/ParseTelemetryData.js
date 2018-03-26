
const initialState = () => {
  return Object.freeze({
    packets : [],
    height : [],
    pressure : [],
    longtitude : [],
    latitude : [],
    temperature : [],
    uv : [],
    soilMoisture : [],
    state : undefined,
  })
}

const packetIsValid = (packet) => (
  packet.slice(2,packet.length-1)
  .reduce( (sum, currentValue) => sum + currentValue ) === packet[packet.length-1] //check sum
);

const parseData = (state, telemetryData) => {
  //if(!packetIsValid(telemetryData[telemetryData.length-1].split(","))){
    return state;
  //}

}

export {initialState, parseData};
