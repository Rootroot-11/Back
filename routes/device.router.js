const router = require('express').Router();
const deviceController = require('../controllers/device.controller');
const deviceByIdMiddleware = require('../middlewares/deviceById.middleware');
const fileMiddleware = require('../middlewares/file.middleware');
const Device = require('../dataBase/Device');

router.get('/',
    deviceController.getAllDevices
);

router.get('/:device_id',
    deviceByIdMiddleware.checkIdMiddleware,
    deviceController.getDeviceById
);

router.get('/search/:key', async (req, res) => {
    const data = await Device.find(
        {
            "$or": [
                {name: {$regex: req.params.key}},
                {brand: {$regex: req.params.key}}
            ]
        }
    )
    res.send(data);
});

router.post(
    '/',
    // deviceMiddleware.isDeviceBodyValid,
    // deviceMiddleware.createDeviceMiddleware,
    fileMiddleware.single('image'),
    deviceController.createDev
);

router.put('/:device_id',
    deviceByIdMiddleware.checkIdMiddleware,
    deviceController.updateDevice
);

router.delete(
    '/:device_id',
    deviceController.deleteDevice
);

module.exports = router;
