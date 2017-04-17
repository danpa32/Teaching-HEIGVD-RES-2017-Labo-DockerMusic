/**
 * Daniel Palumbo
 */

/**********************
 * GLOBAL VARIABLES
 **********************/

var dgram = require('dgram');

var net = require('net');

var protocol = require("./auditor_protocol");

const GLOBAL_INTERVAL = 1000;

const MAX_INACTIVITY_TIME = 5000;

var udpSocket = dgram.createSocket("udp4");

var musicians = [];

var tcpSocket = net.createServer(function(socket) {
   var msg = JSON.stringify(musicians);
   socket.end(msg);
});

/**********************
 * FUNCTIONS
 **********************/

function cleanInactiveMusicians() {
    var now = new Date();

    for (var i = 0; i < musicians.length; i++) {
        if (now - musicians[i].activeSince > MAX_INACTIVITY_TIME) {
            console.log("Removing inactive musician " + musicians[i].uuid);
            musicians.splice(i, 1);
        }
    }

    setTimeout(cleanInactiveMusicians, GLOBAL_INTERVAL);
}

/**********************
 * CALLBACKS
 **********************/

// UDP socket is listening
udpSocket.on("listening", function () {
   console.log("Listening for UDP datagrams on port " + udpSocket.address().port);
});

// UDP socket is receiving a message
udpSocket.on("message", function (msg, src) {
    console.log("New message : " + msg);

    var payload = JSON.parse(msg);

    for (var i = 0; i < musicians.length; i++) {
        if (musicians[i].uuid == payload.uuid) {
            musicians[i].activeSince = new Date();
            return;
        }
    }

    payload.activeSince = new Date();
    musicians.push(payload);
});

tcpSocket.on("listening", function () {
   console.log("Listening for TCP segments on port " + tcpSocket.address().port);
});

/**********************
 * MAIN
 **********************/

udpSocket.bind(protocol.UDP_PORT_NUMBER, function () {
   udpSocket.addMembership(protocol.MULTICAST_ADDRESS);
});

tcpSocket.listen(protocol.TCP_PORT_NUMBER, "0.0.0.0");

setTimeout(cleanInactiveMusicians, GLOBAL_INTERVAL);
