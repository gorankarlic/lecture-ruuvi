"use strict";

const express = require("express");
const SensorServer = require("./SensorServer");

/**
 * App server.
 * 
 * @memberof app
 */
class AppServer
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.server = null;
    }

    /**
     * Starts the API server.
     *
     * @param host the host name or IP address.
     * @param port the port number.
     */
    start(host, port)
    {
        return new Promise((resolve, reject) =>
        {
            if(this.server === null)
            {
                const app = express();
                app.use(express.static(`${__dirname}/../../site`));
                this.server = app.listen(port, host, (err) => err ? void reject(err) : void resolve());
                
                const sensor = new SensorServer();
                sensor.start(this.server);
            }
            else
            {
                reject(new Error("already started"));
            }
        });
    };

    /**
     * Stops the API server.
     */
    stop()
    {
        return new Promise((resolve, reject) =>
        {
            if(this.server === null)
            {
                reject(new Error("not running"));
            }
            else
            {
                this.server.close((err) => err ? void reject(err) : void resolve());
                this.server = null;
            }
        });
    }
}

module.exports = AppServer;