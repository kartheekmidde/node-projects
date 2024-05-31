
const lib = require('../lib')

// Testing Numbers
describe('absolute', () => {
    it('should return positive if input is positive', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('should return positive if input is negative', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('should return zero if input is zero', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })

    // Parametrized test
    it.each([
        [0, 0],
        [1, 1],
        [-1, 1]
    ])('should return positive value', (inp, exp) => {
        const result = lib.absolute(inp)
        expect(result).toBe(exp)
    })
})

// Testing Strings
describe('greet', () => {
    it('should return the greeting function', () => {
        const result = lib.greet('Car');
        expect(result).toMatch(/Car/)
        expect(result).toContain('Car')
    })
})

// Testing Arrays
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies()

        // Too Generic
        // expect(result).toBeDefined()
        // expect(result).not.toBeNull()

        // Too Specific
        // expect(result[0]).toBe('USD')
        // expect(result[1]).toBe('AUD')
        // expect(result[2]).toBe('EUR')
        // expect(result.length).toBe(3)

        expect(result).toContain('USD')
        expect(result).toContain('AUD')
        expect(result).toContain('EUR')

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
    })
})

// Testing Objects
describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        // Exact 2 elements in the object
        expect(result).toEqual({ id: 1, price: 10 })
        // Match any 2 elements in the object
        expect(result).toMatchObject({ id: 1, price: 10 })
        // Check for property
        expect(result).toHaveProperty('price', 10)
    })
})

// Testing Exceptions
describe('registerUser', () => {
    // Regular test
    it('should throw username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(arg => {
            expect(() => { lib.registerUser(arg) }).toThrow()
        })
    })

    // Parametrized test
    it.each(
        [null, undefined, NaN, '', 0, false]
    )('should throw username if falsy 2', (a) => {
        expect(() => {
            lib.registerUser(a)
        }).toThrow()
    })

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Car')
        expect(result).toMatchObject({ username: 'Car' })
        expect(result.id).toBeGreaterThan(0)
    })
})
