let express = require('express')
let router = express.Router()
let i2c = require('i2c')
let addr = 0x1d
let wire = new i2c(addr, {
    device: '/dev/i2c-1'
})

function signed(n) {
    return (n < 128) ? n : n - 256
}

function app_i2c(server) {
    console.log('app_i2c')
    let io = require('socket.io')(server)
    wire.writeBytes(0x16, [0x05], function(err, res) {})
    wire.writeBytes(0x10, [0, 0, 0, 0, 0, 0], function(err, res) {})
    setInterval(function() {
        wire.readBytes(0x06, 3, function(err, res) {
            let x = signed(res[0])
            let y = signed(res[1])
            let z = signed(res[2])
            // io.sockets.emit('event', {
            //     x: x,
            //     y: y,
            //     z: z,
            // })
            console.log(x, y, z)
        })
    }, 100)
}

module.exports = app_i2c
