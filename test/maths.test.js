const {calculateTip, fahrenheitToCelcius, celciusToFahrenheit, add } = require('../src/maths')

test('adding two numbers', ()=> {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test('converting the celcius', ()=> {
    const celcius = fahrenheitToCelcius(32)
    expect(celcius).toBe(0)
})

test('converting the celcius to fahrenheit', ()=> {
    const fahr = celciusToFahrenheit(113)
    expect(fahr).toBe(235.4)
})

/**
 * 
 * @desc asynchronouse programming can be used as a promise .then or async await 
 * 
 */
test('should add two numbers', (done)=> {
    add(2,3).then((sum)=> {
        expect(sum).toBe(5)
        done()
    })
})
  test('async await adding two numbers together', async()=> {
      const sum  = await add(12, 3)
      expect(sum).toBe(15)
  })