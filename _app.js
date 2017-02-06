// 上げっぱなしにすると反応してしまう
// 一回下げたかの確認

// y　と　z　で制限をかける


const request = require('./request/request.js')
// const i2c = require('./sensor/i2c.js')
const config = require('./config.json')
const Ave = require('./md/ave.js')

let waitMillis = 10000
let speakTime = 0

let aveX = Ave(3)
let aveY = Ave(3)
let aveZ = Ave(3)

let x=0
let y=0
let z=0

setInterval( () => {
    x = Math.floor(x + Math.random() * 50 - 25)
    y = Math.floor(y + Math.random() * 50 - 25)
    z = Math.floor(z + Math.random() * 50 - 25)

    aveX.set(x)
    aveY.set(y)
    aveZ.set(z)
    console.log(aveX.get(),aveY.get(),aveZ.get())


}, 100)

console.log(config)
// i2c.start(config.interval, (x, y, z) => {
//     console.log(x, y, z)
//
//     if (x < -800) {
//         console.log(config.url + config.method)
//
//         let now = new Date().getTime()
//         if(now - speakTime < waitMillis){
//             return
//         }
//         request.post(config.url, config.method, config.body, (err, res, body) => {
//             console.log(body)
//         })
//         speakTime = now
//     }
// })
