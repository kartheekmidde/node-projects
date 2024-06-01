const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')
 
describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {

        db.getCustomerSync = function(customerId) {
            return { id: customerId, points: 15 }
        }

        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})

describe('notifyCustomer', () => {
    it('should notify customer', () => {

        // db.getCustomer = function(id) {
        //     return { email: 'a', }
        // }

        // let mailSent = false
        // mail.send = function(to, subject) {
        //     mailSent = true
        // }

        // const mockFunciton = jest.fn()
        // mockFunciton.mockReturnValue(1)
        // mockFunciton.mockResolvedValue(1)
        // mockFunciton.mockRejectedValue(new Error('..'))

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn() 

        const order = { customerId: 1, totalPrice: 10 }
        lib.notifyCustomer(order)

        expect(mail.send).toHaveBeenCalled()
        // calls keep track of all the calls to mock fn
        // calls[0] - first call made to this
        // calls[0][0] - first argument passed to first call
        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)
    })
})