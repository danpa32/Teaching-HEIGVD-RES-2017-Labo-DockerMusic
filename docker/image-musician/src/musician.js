/**
 * Daniel Palumbo
 */

/**********************
 * GLOBAL VARIABLES
 **********************/
var dgram = require('dgram');

var uuid = require('uuid');

const INSTRUMENTS = require("./instruments");

var protocol = require("./musician_protocol");

const SOUND_INTERVAL = 1000;

var socket = dgram.createSocket("udp4");

var payload = {
    uuid : uuid.v4()
};

/**********************
 * FUNCTIONS
 **********************/
function makeSound() {
    var payloadJson = JSON.stringify(payload);

    var buf = new Buffer(payloadJson);

    socket.send(buf, 0, buf.length, protocol.PORT_NUMBER, protocol.MULTICAST_ADDRESS, function () {
        console.log("Send payload : " + payloadJson);
    });
}

/**********************
 * MAIN
 **********************/

var instrument = process.argv[2];

console.log(INSTRUMENTS.INSTRUMENTS);

if (INSTRUMENTS.INSTRUMENTS[instrument] === undefined) {
    process.on("exit", function () {
        console.log("The instrument " + instrument + " is not defined.");
        process.exit(1);
    });
}

payload.instrument = instrument;
payload.sound = INSTRUMENTS.INSTRUMENTS[instrument];

setInterval(makeSound, SOUND_INTERVAL);
