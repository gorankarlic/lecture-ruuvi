"use strict";

/**
 * Ruuvi sensor protocol, version 3.
 * 
 * @memberof util
 * @see https://github.com/ruuvi/ruuvi-sensor-protocols
 */
class RuuviProtocol_v3
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
    }

    /**
     * Parses a Ruuvi measurement from the raw message buffer.
     *
     * @param {String} buffer the Ruuvi message buffer.
     */
    static parse(buffer)
    {
        if(buffer.length !== 16)
        {
            return null;
        }
        const manufacturer = buffer.readUInt16LE(0);
        if(manufacturer !== 0x0499)
        {
            return null;
        }
        const format = buffer.readUInt8(2);
        if(format !== 3)
        {
            return null;
        }
        const humidity_percent = buffer.readUInt8(3) / 2;
        const temperature_C = buffer.readUInt8(4) + buffer.readUInt8(5) / 100;
        const pressure_Pa = buffer.readUInt16BE(6) + 50000;
        const accelerationX_mg0 = buffer.readInt16BE(8);
        const accelerationY_mg0 = buffer.readInt16BE(10);
        const accelerationZ_mg0 = buffer.readInt16BE(12);
        const battery_mA = buffer.readUInt16BE(14);
        const result =
        {
            accelerationX: accelerationX_mg0,
            accelerationY: accelerationY_mg0,
            accelerationZ: accelerationZ_mg0,
            battery: battery_mA,
            humidity: humidity_percent,
            pressure: pressure_Pa,
            temperature: temperature_C,
            time: new Date().toISOString()
        };
        return result;
    }
}

module.exports = RuuviProtocol_v3;