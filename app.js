const request = require('./request/request.js')
const i2c = require('./sensor/i2c.js')

i2c.start(100, (x, y, z) => {
    console.log(x, y, z)
    
    if (x > 1000) {
        request.get('http://localhost:8010', '/play', {
            pass: '1108'
        }, (err, res, body) => {
            console.log(body)
        })
    }
})
