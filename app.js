let express = require('express')
let router = express.Router()
let i2c = require('i2c')
let addr = 0x18 // i2cを選択するアドレス
let wire = new i2c(addr, {
    device: '/dev/i2c-1'
})
console.log(wire)

function signed(n) {
    return (n < 128) ? n : n - 256
}

function app_i2c() {
    console.log('app_i2c')
    //let io = require('socket.io')(server)

    // i2cを選択するアドレス
    // センサごとの中のアドレス
    wire.readBytes(0x0F, 1, function(err, res) {
      console.log(err)
      console.log(res)
    })

    wire.writeBytes(0x20, [0x7F], function(err, res) {
        console.log('パワーダウンをオフ')
        console.log(err)
        console.log(res)

    })
    setInterval(function() {
        // 読み出しをするときは
        wire.readBytes(0xA8, 6, function(err, res) {
            console.log(err)
            console.log(res)
            // lower
            // higher
            let x = res[1] + signed(res[0]) * 256
            let y = res[3] + signed(res[2]) * 256
            let z = res[5] + signed(res[4]) * 256
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
