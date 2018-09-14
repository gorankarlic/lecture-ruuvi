"use strict";

const Ruuvi = require("./util/Ruuvi");

const ruuvi = new Ruuvi();
ruuvi.start();
ruuvi.on("measurement", (m) =>
{
    console.log("--------");
    console.log(`Acceleration X ${m.accelerationX} mg0`);
    console.log(`Acceleration Y ${m.accelerationY} mg0`);
    console.log(`Acceleration Z ${m.accelerationZ} mg0`);
    console.log(`Battery ${m.battery} mAh`);
    console.log(`Humidity ${m.humidity} %`);
    console.log(`Pressure ${m.pressure} Pa`);
    console.log(`Temperature ${m.temperature} °C`);
    console.log(`Time ${new Date().toISOString()} Unix time`);
    console.log("--------");
});
console.log("Listening for Ruuvi sensor measurements");