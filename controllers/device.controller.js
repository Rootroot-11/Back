const {POST_DEVICE, UPDATE} = require("../configs/email-action.enum");
const {emailService, deviceService} = require("../service");
const {USER_DELETE} = require("../errors");
const Device = require("../dataBase/Device");
const review = require("../dataBase/Review");
const s3Service = require("../service/s3Service");

module.exports = {
    getAllDevices: async (req, res, next) => {
        try {
            const devices = await deviceService.findDevices(req.query);

            res.json(devices);
        } catch (e) {
            next(e);
        }
    },

    getDeviceById: async (req, res, next) => {
        try {
            const {device} = req;

            res.json(device);
        } catch (e) {
            next(e);
        }
    },

    getDeviceByName: (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    // createDevice: async (req, res, next) => {
    //     try {
    //         const {email, name, price, brand, image} = req.body;
    //
    //         //img get from s3 AWS
    //         const newDevice = await Device.create({...req.body});
    //
    //         await emailService.sendMail(email, POST_DEVICE, {name, price, brand, image})
    //         res.json(newDevice);
    //     } catch (e) {
    //         next(e);
    //     }
    // },


    createDev: async (req, res) => {
        try {
            let device = new Device({
                name: req.body.name,
                email: req.body.email,
                price: req.body.price,
                // image: req.files,
                brand: req.body.brand,
                type: req.body.type
            });

            const avatar = req.files;

            if (avatar) {
                const info = await s3Service.uploadImage(avatar, 'users', device._id.toString());

                device = await Device.findByIdAndUpdate({_id: device._id}, {avatar: info.Location}, {new: true});
            }
            await device.save();
            res.send({
                status: true,
                message: 'File is uploaded'
            })

        } catch (e) {
            console.log(e);
        }

        // await emailService.sendMail(email, POST_DEVICE, {name, price, brand})
    },

    updateDevice: async (req, res, next) => {
        try {
            const {device_id, price} = req.params;

            const device = await Device.findByIdAndUpdate(device_id, req.body, {new: true}).lean();

            // await emailService.sendMail(device.email, UPDATE, {deviceName: device.name, price});

            res.json(device);
        } catch (e) {
            next(e);
        }
    },

    deleteDevice: async (req, res, next) => {
        try {
            const {device_id} = req.params;

            await Device.findByIdAndDelete(device_id);

            res.json(USER_DELETE.message, USER_DELETE.status);
        } catch (e) {
            next(e);
        }
    }
};

