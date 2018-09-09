"use strict";

const noble = require("noble");
const EventEmitter = require("events");
const RuuviProtocol = require("./RuuviProtocol_v3");

/**
 * Ruuvi bluetooth receiver.
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
        this.onDiscover = this.onDiscover.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }
    
    onDiscover(peripheral)
    {
        if(peripheral.advertisement && peripheral.advertisement.manufacturerData)
        {
            const measurement = RuuviProtocol.parse(peripheral.advertisement.manufacturerData);
            if(measurement !== null)
            {
                measurement.uuid = peripheral.uuid;
                this.emit("measurement", measurement);
            }
        }
    }
    
    onStateChange(state)
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
    }
    
    /**
     * Starts receiving Ruuvi device signals.
     */
    start()
    {
        noble.addListener("stateChange", this.onStateChange);
        noble.addListener("discover", this.onDiscover);
    }
    
    /**
     * Stops receiving Ruuvi device signals.
     */
    stop()
    {
        noble.removeListener("stateChange", this.onStateChange);
        noble.removeListener("discover", this.onDiscover);
    }
}

module.exports = Ruuvi;