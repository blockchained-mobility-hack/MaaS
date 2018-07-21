const minimist = require('minimist')

exports.parse = () => {
    const { _, ...args } = minimist(process.argv.slice(2))
    return args
}
