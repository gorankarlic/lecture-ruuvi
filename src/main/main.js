"use strict";

const AppServer = require("./app/AppServer");
const SensorClient = require("./app/SensorClient");
const Ruuvi = require("./util/Ruuvi");

async function main()
{
    if(process.argv.length < 4)
    {
        console.log("Usage: node ruuvi.js host port");
        process.exit(1);
    }
    else
    {
        const host = process.argv[2];
        const port = process.argv[3];
        const app = new AppServer();
        await app.start(host, port);
        console.log(`Started app server ${host}:${port}`);

        const sensor = new SensorClient(host, port);
        await sensor.start();

        const ruuvi = new Ruuvi();
        await ruuvi.start();
        ruuvi.on("measurement", (m) => void sensor.send(m));

        console.log("Client submitting to", host + ":" + port);
        process.once("SIGINT", async () =>
        {
            await app.stop();
            await sensor.stop();
            await ruuvi.stop();
            console.log(`Stopped app server ${host}:${port}`);
        });
    }
}

main();