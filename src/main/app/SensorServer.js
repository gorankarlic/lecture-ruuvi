"use strict";

const WebSocket = require("ws");
const Ruuvi = require("../util/Ruuvi");

/**
 * Sensor server.
 * 
 * @memberof app
 */
class SensorServer
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.server = null;
    }
    
    /**
     * Sends data to all clients.
     *
     * @param data the data to send.
     */
    send(data)
    {
        console.log("Ruuvi measurement", data);
        this.server.clients.forEach((client) =>
        {
            if(client.readyState === WebSocket.OPEN)
            {
                client.send(data);
            }
        });
    };

    /**
     * Starts the API server.
     *
     * @param host the host name or IP address.
     * @param port the port number.
     */
    start(server, host, port)
    {
        const opts =
        {
            host,
            port,
            server
        };
        this.server = new WebSocket.Server(opts);
        this.server.on("connection", (ws) => void ws.on("message", (m) => void this.send(m)));
    };

    /**
     * Stops the API server.
     */
    stop()
    {
        this.server.close();
    }
}

module.exports = SensorServer;