module.exports = (num) => {
    return new function() {
        this.num = num ? num : 3

        this.head = 0
        this.value = []


        this.set = function(a) {
            this.value[this.head] = a
            this.head = this.head + 1 < this.num ? this.head + 1 : 0
        }

        this.get = function() {
            let value = this.value
            if (value.length <= 0) {
                return 0
            }
            let a = 0
            value.forEach((v) => {
                a += v
            })
            return Math.floor(a / value.length)
        }
    }
}
