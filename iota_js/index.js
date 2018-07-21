// Address is like table, bmw and db can each have a address

const IOTA = require('iota.lib.js')
const seeds = require('./seeds')
const address = require('./address')
const transfer = require('./transfer')
const zmq = require('zeromq').socket('sub')
const zmqUrl = 'tcp://nodes.devnet.iota.org:5556'

const iota = new IOTA({
    provider: 'https://nodes.devnet.iota.org:443',
})

// zmq

zmq.connect(zmqUrl)
zmq.subscribe('sn')
zmq.subscribe('tx')
zmq.subscribe('lmi')

zmq.on('message', msg => {
    console.log(msg)
})

// address
const getNewAddress = async (seed, index) => await address.getNew(iota, seed, { index: index })

// getNewAddress(seeds.bmw, 2).then(([d]) => console.log(d))

// transfer
const testTransfer = async (seed, transferObjects) => {
    const [address] = await getNewAddress(seeds.bmw, 7)
    console.log('address', address)
    return await transfer(
        iota,
        seed,
        transferObjects.map(t => ({
            ...t,
            address: address,
        })),
    )
}

const offerTransferObjects = [
    {
        tag: 'FEIREFACTOR',
        value: 10,
        message: iota.utils.toTrytes(
            JSON.stringify(
                {
                    price: 2,
                    currency: 'euro',
                    validFromDate: '2018-08-01',
                    validToDate: '2018-09-01',
                    startLocation: 'munich',
                    endLocation: 'berlin',
                    name: 'best offer from bwm',
                    description: 'with i8',
                },
                null,
                4,
            ),
        ),
    },
]

testTransfer(seeds.seedWithIota, offerTransferObjects)

iota.api.getAccountData(seeds.bmw, (err, succ) => console.log(succ))
