"use strict";

const assert = require("assert");
const Ruuvi = require("../../main/util/Ruuvi");

describe("Ruuvi", function ()
{
    describe("measurement", function()
    {
        const ruuvi = new Ruuvi();

        before(function()
        {
            ruuvi.start();
        });

        after(function()
        {
            ruuvi.stop();
        });

        it("should get ruuvi sensor data", function(done)
        {
            this.timeout(30000);
            ruuvi.on("measurement", (measurement) =>
            {
                assert.strictEquals(typeof measurement.accelerationX, "Number");
                done();
            });
        });
    });
});