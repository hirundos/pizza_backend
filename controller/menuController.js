const menulist = require('../model/menuModel');

//pizza 목록 출력
exports.getMenus = async (req, res) => {

    try {
        const menu = await menulist.getMenus();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};