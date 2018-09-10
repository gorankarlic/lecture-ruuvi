"use strict";

const SensorServer = require("./app/SensorServer");

if(process.argv.length < 4)
{
    console.log("Usage: node sensor.js host port");
    process.exit(1);
}
else
{
    const host = process.argv[2];
    const port = process.argv[3];
    const app = new SensorServer();
    app.start(void null, host, port);
    console.log("Server listening at", host + ":" + port);
}