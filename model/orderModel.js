
const config = require('../config/database')

config.connectToDb();


   //내 주문 보기
   module.exports.myOrders = async (req,res) => {
    const id = String(req.body.id);

    let sqlQuery = 
            `select o.order_id, pizza_id, quantity, date, time
            from orders o 
            join order_details d
            on o.order_id = d.order_id
            where mem_id=$1
            order by date desc, time desc`;
    
    try{    
      const result = await config.pool.query(sqlQuery, [id]);
      return result.rows;
    } catch (err) {
      throw new Error('Database query failed '+ err.message);
    }
};
