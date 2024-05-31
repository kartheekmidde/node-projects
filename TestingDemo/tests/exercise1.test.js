// Older approach compatible with older Node projects
const lib = require('../exercise1')

// use if type: module is set in package.json to use ES6 modules in Node
// import { fizzBuzz } from '../exercise1' 

describe('fizzBuzz', () => {
    it.each(
        [ 'string', null, undefined, false, {}, [] ]
    )('should throw exception when input is not a number', (arg) => {
        expect(() => {
            lib.fizzBuzz(arg)
        }).toThrow()
    })

    it.each([
        [ 3, 'Fizz' ],
        [ 6, 'Fizz' ],
        [ 5, 'Buzz' ],
        [ 10, 'Buzz' ],
        [ 15, 'FizzBuzz' ],
        [ 30, 'FizzBuzz' ]
    ])('should return correct value', (inp, exp) => {
        const result = lib.fizzBuzz(inp)
        expect(result).toBe(exp)
    })
})