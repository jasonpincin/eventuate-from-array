var eventuate = require('eventuate-core'),
    fromArray = require('..')(eventuate)

var numbers = fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9])

var consumption = numbers.consume(function (n) {
  console.log(n)
  if (n === 5) {
    console.log('pausing...')
    consumption.saturated()
    setTimeout(function () {
      console.log('resuming...')
      consumption.unsaturated()
    }, 1000)
  }
})
