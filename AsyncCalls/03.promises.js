function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching user from Database')
            resolve({ id: id, username: 'Kartheek' })
        }, 2000)
    })
}

function getRepos(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching repos for the user')
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching commits for the repo')
            resolve(['commit1', 'commit2', 'commit3'])
        }, 2000)
    })
}

getUser(1)
    .then((user) => getRepos(user.id))
    .then((repos) => getCommits(repos[0]))
    .then((commits) => console.log(commits))
    .catch((error) => console.log('Error ', error.message))

// Settled promises
const p1 = Promise.resolve({ id: 1 })
p1.then(result => console.log(result.id))

const p2 = Promise.reject('rejected promise')
p2.then().catch(error => console.log(error))

// Running promises in parallel
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async 1')
        resolve('p3')
    }, 2000)
})

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async 2')
        resolve('p4')
    }, 2000)
})

Promise.all([p3, p4])
    .then(result => console.log(result))
    .catch((error) => console.log(error))

Promise.race([p3, p4])
    .then(result => console.log(result))
    .catch((error) => console.log(error))