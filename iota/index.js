// Address is like table, bmw and db can each have a address

const IOTA = require('iota.lib.js')
const seeds = require('./seeds')
const address = require('./address')
const transfer = require('./transfer')
const zmq = require('zeromq')
const zmqUrl = 'tcp://analytics.iotaledger.net:5556'
const util = require('./util')
const _ = require('lodash')

const iota = new IOTA({
    provider: 'https://nodes.devnet.iota.org:443',
})

const sock = zmq.socket('sub')

// zmq

sock.connect(zmqUrl)
sock.subscribe('sn')
sock.subscribe('tx')

let count = 0
sock.on('message', msg => {
    console.log(msg.toString().split(' '))
    console.log('\n\n')
    console.log(count++)
})

// address
const getNewAddress = async (seed, index) => await address.getNew(iota, seed, { index: index })

// getNewAddress(seeds.bmw, 2).then(([d]) => console.log(d))

// transfer
const testTransfer = async (seed, transferObjects) => {
    const [address] = await getNewAddress(seeds.bmw, 7)
    console.log('address', address)
    const keyIndex = util.getKeyIndex()

    const { inputs } = await util.getInputs(iota, seed, keyIndex)
    console.log('inputs: ', inputs.map(({ address, keyIndex }) => ({ address, keyIndex })))

    try {
        const rst = await transfer(
            iota,
            seed,
            transferObjects.map(t => ({
                ...t,
                address: address,
            })),
            { inputs: inputs.map(({ address, keyIndex }) => ({ address, keyIndex, security: 2 })) },
        )

        util.updateKeyIndex(keyIndex + 1)
        // console.log(rst)
    } catch (e) {
        console.error(e)
    }
}

const offerTransferObjects = [
    {
        tag: 'PAYMENT',
        value: 10,
        message: iota.utils.toTrytes(
            JSON.stringify(
                {
                    orderId: 2,
                    provider: 'BMW',
                    address: 'XXXXXXXXXXXX',
                },
                null,
                4,
            ),
        ),
    },
]

testTransfer(seeds.seedWithIota, offerTransferObjects)

// iota.api.getAccountData(seeds.bmw, (err, succ) => console.log(succ))
// iota.api.getInputs(seeds.seedWithIota, { start: 10, end: 15 }, (err, resp) => {
//     console.log(resp)
// })
