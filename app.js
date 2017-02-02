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

    wire.writeBytes(0x20, [0x07], function(err, res) {
        // 0x27
        console.log('パワーダウンをオフ ２段階')
        console.log(err)
        console.log(res)
    })
    wire.writeBytes(0x20, [0x77], function(err, res) {
        console.log('パワーダウンをオフ ２段階')
        console.log(err)
        console.log(res)
    })
    wire.writeBytes(0x23, [0x88], function(err, res) {
        console.log('12bitになる bduを有効に')
        console.log(err)
        console.log(res)
    })
    setInterval(function() {
        // 読み出しをするときは
        wire.readBytes(0xA8, 6, function(err, res) {
            console.log(res)
            // lower
            // higher
            let x = signed(res[1]) * 16 + (res[0] >>> 4)
            let y = signed(res[3]) * 16 + (res[2] >>> 4)
            let z = signed(res[5]) * 16 + (res[4] >>> 4)
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
