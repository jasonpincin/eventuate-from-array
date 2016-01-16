var setImmediate = require('timers').setImmediate

module.exports = createEventuate

function createEventuate (eventuate, array) {
  if (!eventuate || !eventuate.isEventuate)
    throw new TypeError('first argument must be an eventuate factory')
  return arguments.length === 2 ? _createEventuate(array) : _createEventuate

  function _createEventuate (array) {
    var ev = eventuate()
    setImmediate(produce, ev, array, 0)
    return ev
  }
}

function produce (ev, array, idx) {
  if (ev.hasConsumer()) {
    if (array.length <= idx) {
      ev.emit('exhausted')
      ev.destroy()
    }
    else if (!ev.isSaturated()) {
      ev.produce(array[idx])
      setImmediate(produce, ev, array, idx + 1)
    }
    else {
      ev.once('unsaturated', resume)
    }
  }
  else {
    ev.once('consumerAdded', resume)
  }

  function resume () {
    setImmediate(produce, ev, array, idx)
  }
}
