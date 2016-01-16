var test      = require('tape'),
    eventuate = require('eventuate-core'),
    fromArray = require('..')

test('produces array elements', function (t) {
  t.plan(1)

  var src = [1, 2, 3],
      num = fromArray(eventuate, src),
      got = []

  num.consume(function (n) {
    got.push(n)
  }).then(function () {
    t.deepEqual(got, src)
  })
})

test('permits currying', function (t) {
  t.plan(1)

  var from = fromArray(eventuate),
      src  = [1, 2, 3],
      num  = from(src),
      got  = []

  num.consume(function (n) {
    got.push(n)
  }).then(function () {
    t.deepEqual(got, src)
  })
})

test('waits for consumer', function (t) {
  t.plan(1)

  var src = [1, 2, 3],
      num = fromArray(eventuate, src),
      got = []

  setTimeout(function () {
    num.consume(function (n) {
      got.push(n)
    }).then(function () {
      t.deepEqual(got, src)
    })
  }, 500)
})
