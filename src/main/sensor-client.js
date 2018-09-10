"use strict";

const SensorClient = require("./app/SensorClient");
const Ruuvi = require("./util/Ruuvi");

if(process.argv.length < 4)
{
    console.log("Usage: node ruuvi.js host port");
    process.exit(1);
}
else
{
    const host = process.argv[2];
    const port = process.argv[3];
    const app = new SensorClient(host, port);
    app.start();
    
    const ruuvi = new Ruuvi();
    ruuvi.start();
    ruuvi.on("measurement", (m) => void app.send(m));
    
    console.log("Client submitting to", host + ":" + port);
}