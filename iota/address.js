const getNewAddress = (iota, seed, opts) => {
    return new Promise((resolve, reject) => {
        iota.api.getNewAddress(
            seed,
            {
                security: 2,
                checksum: true,
                total: 1,
                ...opts,
            },
            (err, resp) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp)
                }
            },
        )
    })
}

exports.getNew = getNewAddress
