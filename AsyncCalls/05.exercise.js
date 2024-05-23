
async function sendMails() {
    const customer = await getCustomer(1)
    console.log(customer)
    if (customer.isGold) {
        const movies = await getTopMovies()
        console.log(movies)
        await sendEmail(customer.email, movies)
        console.log('Email sent')
    }
}

sendMails()

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1, 
                name: 'Kartheek Midde',
                isGold: true,
                email: 'email'
            })
        }, 4000)
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie 1', 'movie 2'])
        }, 4000)
    })
}
function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 4000)
    })
}