

const request = require('./request/request.js')
const i2c = require('./sensor/i2c.js')
const config = require('./config.json')
const Ave = require('./md/ave.js')
const fs = require('fs')



let waitMillis = 10000
let speakTime = 0

let aveX = Ave(50)
let aveY = Ave(50)
let aveZ = Ave(50)

let startTime = 1000
let startMillis = new Date().getTime()

let fileName = 'center'
console.log(fileName)


i2c.start(config.interval, (x, y, z) => {
    let now = new Date().getTime()
    if (now - startMillis < startTime) {
        console.log( 'スタートまで' + (now - startMillis) )
        return
    }

    console.log(x, y, z)
    aveX.set(x)
    aveY.set(y)
    aveZ.set(z)
})
