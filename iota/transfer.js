const transfer = (iota, seed, transferObjects, opts) => {
    return new Promise((resolve, reject) => {
        iota.api.sendTransfer(seed, 3, 9, transferObjects, opts, (error, success) => {
            if (error) {
                reject(error)
            } else {
                resolve(success)
            }
        })
    })
}

module.exports = transfer
