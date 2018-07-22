const IOTA = require('iota.lib.js')

const iota = new IOTA({
    provider: 'https://nodes.devnet.iota.org:443',
})

module.exports = iota
