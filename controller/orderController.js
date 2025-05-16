const orderlist = require('../model/orderModel');

//pizza 목록 출력
exports.myOrders = async (req, res) => {
    try {
        const order = await orderlist.myOrders(req,res);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

exports.order = async (req, res) => {
    try {
        const order = await orderlist.order(req,res);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};