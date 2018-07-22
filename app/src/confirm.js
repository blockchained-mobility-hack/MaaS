import IOTA from 'iota.lib.js'
import { get } from 'lodash'

const rebeccaSeed = 'WMCUSYWTUM9GLXQUMJHKQMSXSUUJXKMMBOSU9EXZIMLHGWCKIVMWXJVKNNCLXAIWTBTDWKEEKFTNWDKSW' // 100 000 iota

const iota = new IOTA({
    provider: 'https://nodes.devnet.iota.org:443',
})

export default (orderData, onConfirm, onError, handleUpdate) => {
    handleUpdate('Initializing transfer...')

    iota.api.getInputs(rebeccaSeed, { start: 20, end: 40 }, (err, resp) => {
        handleUpdate('Getting latest inputs')
        if (err) {
            onError('inputs')
            return
        }
        const { inputs } = resp

        handleUpdate(`Using address to pay: ${get(inputs, ['0', 'address'])}`)

        handleUpdate(`Paying to address ${orderData.address}`)
        const transferObjects = [
            {
                tag: 'PAYMENT',
                value: Number(orderData.price),
                address: orderData.address,
                message: iota.utils.toTrytes(
                    JSON.stringify(
                        {
                            offerId: orderData.id,
                            provider: orderData.provider,
                        },
                        null,
                        4,
                    ),
                ),
            },
        ]

        iota.api.sendTransfer(
            rebeccaSeed,
            3,
            9,
            transferObjects,
            {
                inputs: inputs.map(({ address, keyIndex }) => ({ address, keyIndex, security: 2 })),
            },
            (err, transferResponse) => {
                handleUpdate('Transfer initiated...')
                if (err) {
                    onError('transfer')
                    return
                }
                onConfirm()
                handleUpdate('Transfer successfully attached.')
            },
        )
    })
    // start zmp here
}
