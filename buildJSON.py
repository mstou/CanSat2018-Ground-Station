import serial
serialPort = serial.Serial('/dev/ttyUSB0');

dataToPrint = []
quote = "\""

while (73):
    telemetryPackage = serialPort.readline()
    telemetryPackage = quote + telemetryPackage[:-2] + quote
    #add "," to current last element.
    if (len(dataToPrint) > 0):
        dataToPrint[len(dataToPrint)-1] += ","

    #add new package.
    dataToPrint += [telemetryPackage]

    #write to file.
    file = open("telemetry-data-plotting/public/TelemetryData.json","w")
    file.write("[\n")
    for i in dataToPrint:
        file.write(i)
        file.write("\n")
    file.write("]")
    file.close()
