const transfer = (iota, seed, transferObjects) => {
    return new Promise((resolve, reject) => {
        iota.api.sendTransfer(seed, 3, 9, transferObjects, (error, success) => {
            if (error) {
                reject(error)
            } else {
                resolve(success)
            }
        })
    })
}

module.exports = transfer
