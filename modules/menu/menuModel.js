
const config = require('../../config/database');


config.connectToDb();

   //pizza menu
   module.exports.getMenus = async () => {

    let sqlQuery = 
            `SELECT category, name, size, price 
            FROM pizzas p JOIN pizza_types pt 
            ON p.pizza_type_id = pt.pizza_type_id`;
    
    try{
      const result = await config.pool.query(sqlQuery);
      return result.rows;
    } catch (err) {
      throw new Error('Database query failed '+ err.message);
    }
};