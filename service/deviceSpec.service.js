let dataBase = require('../dataBase/Device');

module.exports = {
    getDeviceBy: (name) => dataBase.find((name) => console.log(name))
}
