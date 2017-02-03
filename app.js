const request = require('./request/request.js')
const i2c = require('./sensor/i2c.js')
const config = require('./config.json')

console.log(config)
i2c.start(100, (x, y, z) => {
    console.log(x, y, z)

    if (x > 1000) {
        console.log(config.url + config.method)
        request.post(config.url, config.method, config.body, (err, res, body) => {
                console.log(body)
            })
    }
})
