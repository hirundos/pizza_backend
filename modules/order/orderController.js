const orderlist = require('./orderModel');

//pizza 메뉴 목록 출력
exports.myOrders = async (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({error:'require login'});
    }

    try {
        const order = await orderlist.myOrders(req,res);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

//주문 받기
exports.order = async (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({error:'require login'});
    }

    try {
        const order = await orderlist.order(req,res);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

//피자 목록 출력
exports.pizzas = async (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({error:'require login'});
    }

    try {
        const order = await orderlist.pizzas(req,res);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};