const ErrorHandler = require("../errors/ErrorHandler");
const Order = require("../dataBase/Order");

module.exports = {
    makeOrder: async (req, res) => {
        const {orderItems, shippingAddress, paymentMethod} = req.body;

        if (orderItems && orderItems.length === 0) {
            throw new ErrorHandler('no order items', 400)
            return
        } else {
            const order = new Order({
                orderItems, shippingAddress, paymentMethod
            })
            const createOrder = await order.save()
            res.status(201).json(createOrder);
        }
    }
}
