const fs = require('fs')

const controllers = {}

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

for (const file of files) {
  if (file.toLowerCase().endsWith('.js')) {
    const controller = require(`./${file}`)
    controllers[`${file.replace('.js', '')}`] = controller
  }
}

module.exports = controllers
