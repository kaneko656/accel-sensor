const request = require('./request/request.js')
const i2c = require('./sensor/i2c.js')
const config = require('./config.json')

let waitMillis = 10000
let speakTime = 0

console.log(config)
i2c.start(100, (x, y, z) => {
    console.log(x, y, z)

    if (x > 1000) {
        console.log(config.url + config.method)

        let now = new Date().getTime()
        if(now - speakTime < waitMillits){
            return
        }
        request.post(config.url, config.method, config.body, (err, res, body) => {
            console.log(body)
        })
        speakTime = now
    }
})
