// 上げっぱなしにすると反応してしまう
// 一回下げたかの確認

// y　と　z　で制限をかける


const request = require('./request/request.js')
const i2c = require('./sensor/i2c.js')
const config = require('./config.json')
// const Ave = require('./md/ave.js')

let waitMillis = 10000
let speakTime = 0

let isUp = false

i2c.start(config.interval, (x, y, z) => {

    if (x < -800) {
        if(isUp){
          return
        }
        console.log('isUp')
        isUp = true

        console.log(config.url + config.method)

        let now = new Date().getTime()
        if(now - speakTime < waitMillis){
            return
        }
        request.post(config.url, config.method, config.body, (err, res, body) => {
            console.log(body)
        })
        speakTime = now
    }

    if(x > -500){
      if(isUp){
        console.log('isDown')
      }
      isUp = false
    }


})
