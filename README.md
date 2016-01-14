# eventuate-from-array

[![NPM version](https://badge.fury.io/js/eventuate-from-array.png)](http://badge.fury.io/js/eventuate-from-array)
[![Build Status](https://travis-ci.org/jasonpincin/eventuate-from-array.svg?branch=master)](https://travis-ci.org/jasonpincin/eventuate-from-array)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/eventuate-from-array/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/eventuate-from-array?branch=master)

Create an eventuate that produces array values.

## example

```javascript
var eventuate = require('eventuate-core'),
    fromArray = require('eventuate-from-array')(eventuate)

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
```

## api

```javascript
var fromArray = require('eventuate-from-array')
```

### eventuate = fromArray(eventuateFactory, array)

Create an `eventuate` via the provided `eventuateFactory` that produces each
element in the `array` before destroying itself. The production of array
elements honors consumer saturation, and production of array elements will be
paused while any consumers are saturated. After producing the last array
element, the `eventuate` will be destroyed.

Alternatively, this call may be broken into two steps, see below:

### factory = fromArray(eventuateFactory)

Create a `factory` that may be used to create further eventuates without
supplying the `eventuateFactory`.

### eventuate = factory(array)

Create an `eventuate` using the curried `eventuateFactory` from the `fromArray`
call (above). This eventuate behaves the same as described above, and produces
`array` elements, destroying itself once the array has been exhausted.

## events

The `eventuate` objects created will emit an `exhausted` event immediately
before the `eventuate` is destroyed.

## install

With [npm](https://npmjs.org) do:

```
npm install --save eventuate-from-array
```

## testing

`npm test`

Or to run tests in phantom: `npm run phantom`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
