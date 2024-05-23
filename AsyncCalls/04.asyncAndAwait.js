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

// Wherever await is used it should be decorated with async modifier
async function displayCommit() {
    try {
        const user = await getUser(1)
        const repos = await getRepos(user.username)
        const commits = await getCommits(repos[0])
        console.log(commits)
    } catch (err) {
        console.log('Error ', err.message)
    }
}

displayCommit()