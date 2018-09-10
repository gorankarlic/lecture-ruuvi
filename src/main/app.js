"use strict";

const AppServer = require("./app/AppServer");

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
        process.once("SIGINT", async () =>
        {
            await app.stop();
            console.log(`Stopped app server ${host}:${port}`);
        });
    }
}

main();