const _ = require('lodash')
const IOTA = require('iota.lib.js')
const seeds = require('./seeds')
const address = require('./address')
const transfer = require('./transfer')
const util = require('./util')
const args = require('./args')

const iota = new IOTA({
    provider: 'https://nodes.devnet.iota.org:443',
})

const getNewAddress = async (seed, index) => await address.getNew(iota, seed, { index: index })

const { payload } = args.parse()

// make sure payload is json
try {
    JSON.parse(payload)
} catch (e) {
    console.log('Fail to parse payload, make sure it is valid JSON format')
    process.exit(1)
}

const run = async () => {
    const publishKeyIndex = util.getPublishKeyIndex()
    const [address] = await getNewAddress(seeds.publish, publishKeyIndex)
    const transferObjs = [
        {
            tag: 'FEI',
            value: 0,
            message: iota.utils.toTrytes(payload),
        },
    ].map(t => ({
        ...t,
        address: address,
    }))

    console.log('[info]: trying publishing payload to address:', address)
    console.log('[info]: using publish keyIndex', publishKeyIndex)
    await transfer(iota, seeds.master, transferObjs, {})
    console.log('[info]: successfully published payload to address:', address)

    util.updatePublishKeyIndex(publishKeyIndex + 1)
}

try {
    run().then(() => process.exit(0))
} catch (e) {
    console.log('[error]: Fail to publish')
    process.exit(1)
}
