var test      = require('tape'),
    eventuate = require('eventuate-core'),
    fromArray = require('..')

test('honors saturation', function (t) {
  t.plan(2)

  var src     = [1, 2, 3],
      num     = fromArray(eventuate, src),
      got     = [],
      started = Date.now()

  var consumption = num.consume(function (n) {
    got.push(n)
    consumption.saturated()
    setTimeout(function () {
      consumption.unsaturated()
    }, 250)
  }).then(function () {
    var elapsed = Date.now() - started
    t.ok(elapsed >= 500, 'took ' + elapsed + 'ms')
    t.deepEqual(got, src)
  })
})
