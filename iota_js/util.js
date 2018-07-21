const keyGen = length => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
    let key = ''
    while (key.length < length) {
        const byte = crypto.randomBytes(1)
        if (byte[0] < 243) {
            key += charset.charAt(byte[0] % 27)
        }
    }

    return key
}

exports.keyGen = keyGen
