var test      = require('tape'),
    fromArray = require('..')

test('requires eventuate', function (t) {
  t.plan(1)

  t.throws(fromArray, TypeError)
})
