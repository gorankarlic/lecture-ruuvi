"use strict";

const noble = require("noble");
const EventEmitter = require("events");
const RuuviProtocol = require("./RuuviProtocol_v3");

/**
 * Ruuvi sensor service.
 * 
 * @memberof util
 * @see https://github.com/ruuvi/ruuvi-sensor-protocols
 */
class Ruuvi extends EventEmitter
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        super();
    }
    
    /**
     * Starts receiving Ruuvi device signals.
     */
    start()
    {
        noble.addListener("stateChange", (state) =>
        {
            switch(state)
            {
                case "poweredOn":
                {
                    noble.startScanning([], true);
                    break;
                }
                case "poweredOff":
                {
                    noble.stopScanning();
                    break;
                }
            }
        });
        noble.addListener("discover", (peripheral) =>
        {
            if(peripheral.advertisement && peripheral.advertisement.manufacturerData)
            {
                const measurement = RuuviProtocol.parse(peripheral.advertisement.manufacturerData);
                if(measurement !== null)
                {
                    peripheral.connect();
                    measurement.uuid = peripheral.uuid;
                    this.emit("measurement", measurement);
                }
            }
        });
    }
    
    /**
     * Stops receiving Ruuvi device signals.
     */
    stop()
    {
    }
}

module.exports = Ruuvi;