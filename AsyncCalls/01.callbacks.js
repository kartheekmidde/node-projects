console.log("Before")

getUser(1, (user) => {
    getRepositories(user.username, (repos) => {
        console.log('Repositories - ' + repos)
    })
})

console.log("After")

function getUser(id, callback){
    setTimeout(() => {
        console.log('Fetching user from Database')
        callback({ id: id, username: 'Kartheek'})
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`Fetching repositories for ${username}`)
        callback([ 'repo1', 'repo2', 'repo3' ])
    }, 2000)
}
