const iota = require('./initIota')
const seeds = require('./seeds')
const args = require('./args')
const util = require('./util')
const address = require('./address')

const getNewAddress = async (seed, index) => await address.getNew(iota, seed, { index: index })
const { provider } = args.parse()

if (!provider) {
    console.log('[error]: provider must be specified') // eslint-disable-line no-console
    process.exit(1)
}

let providerAddress = ''

const run = async () => {
    const seed = seeds[provider]
    if (!seed) {
        process.exit(1)
    }

    const keyIndex = util.getProviderKeyIndex(provider)
    const [address] = await getNewAddress(seed, keyIndex)
    util.updateProviderKeyIndex(keyIndex, provider)
    providerAddress = address
}

try {
    run().then(() => {
        console.log(providerAddress) // eslint-disable-line no-console
        process.exit(0)
    })
} catch (e) {
    process.exit(1)
}
