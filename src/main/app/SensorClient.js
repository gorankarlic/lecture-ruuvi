"use strict";

const WebSocket = require("ws");

/**
 * Sensor client.
 * 
 * @memberof app
 */
class SensorClient
{
    /**
     * Creates a new instance of this class.
     *
     * @param host the host name or IP address.
     * @param port the port number.
     */
    constructor(host, port)
    {
        this.client = null;
        this.url = `ws://${host}:${port}/`;
    }
    
    /**
     * Sends data to the server.
     *
     * @param data the data to send.
     */
    send(data)
    {
        console.log("Ruuvi measurement", data);
        if(this.client !== null && this.client.readyState === 1)
        {
            this.client.send(JSON.stringify(data));
        }
    };

    /**
     * Starts the API server.
     */
    start()
    {
        if(this.client === null)
        {
            this.client = new WebSocket(this.url);
            this.client.on("close", () => this.restart());
            this.client.on("error", () => this.restart());
        }
        else
        {
            throw new Error("already started");
        }
    };

    /**
     * Restarts the API server.
     */
    restart()
    {
        if(this.client !== null)
        {
            this.client = null;
            setTimeout(() => this.start(), 1000);
        }
    };

    /**
     * Stops the API server.
     */
    stop()
    {
        if(this.client === null)
        {
            throw new Error("not yet started");
        }
        else
        {
            this.client.close();
            this.client = null;
        }
    }
}

module.exports = SensorClient;