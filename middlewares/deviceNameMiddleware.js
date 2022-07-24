const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");
const {DEVICE_NOT_FOUND} = require("../errors");
const devService = require('../service');

module.exports = {
    checkName: async (req, res, next) => {
        try {
            const {name} = req.params;
            const oneDevice = devService.devService.getDeviceBy(name);

            if (!oneDevice) {
                throw new ErrorHandler(DEVICE_NOT_FOUND.message, DEVICE_NOT_FOUND.status);
            }
            req.device = oneDevice;
            next();
        } catch (e) {
            console.log(e.message);
        }
    }
}
