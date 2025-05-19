
const config = require('../../config/database')

config.connectToDb();

//내 주문 보기
module.exports.myOrders = async (req,res) => {
  const id = String(req.session.user.id);

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

//주문하기
module.exports.order = async(req, res) => {
  const sizes = req.body.lines.map(({ size }) => size);
  const names = req.body.lines.map(({ name }) => name);
  const quantity = req.body.lines.map(({ quantity }) => quantity);
  
  const userId = String(req.session.user.id);

  const today = new Date();
  const pizzaDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-');
  const pizzaTime = [today.getHours(), today.getMinutes(), today.getSeconds()].join(':');

  let orderId = 0;
  try {
    let result = await config.pool.query(`SELECT MAX(order_id)+1 AS id FROM orders`);
    orderId = result.rows?.[0]?.id ?? 1;
  } catch (err) {
    return res.status(500).json({ error: "Database query failed: " + err.message });
  }

  try {
    for (let i = 0; i < sizes.length; i++) {
      // pizza_id 가져오기
      const pizzaResult = await config.pool.query(`
        SELECT p.pizza_id
        FROM pizzas p
        JOIN pizza_types pt ON p.pizza_type_id = pt.pizza_type_id
        WHERE p.size = $1 AND pt.name = $2
      `, [sizes[i], names[i]]);

      const pizzaId = pizzaResult.rows?.[0]?.pizza_id;
      if (!pizzaId) {
        return res.status(400).json({ error: `No pizza found for ${sizes[i]} ${names[i]}` });
      }

      // order_details_id 가져오기
      let dtResult = await config.pool.query(`SELECT MAX(order_details_id)+1 AS id FROM order_details`);
      const orderDetailsId = dtResult.rows?.[0]?.id ?? 1;

      // INSERT orders (한 번만 실행되게 위치 조정)
      if (i === 0) {
        await config.pool.query(`
          INSERT INTO orders(order_id, date, time, mem_id)
          VALUES($1, $2, $3, $4)
        `, [orderId, pizzaDate, pizzaTime, userId]);
      }

      // INSERT order_details
      await config.pool.query(`
        INSERT INTO order_details(order_details_id, order_id, pizza_id, quantity)
        VALUES($1, $2, $3, $4)
      `, [orderDetailsId, orderId, pizzaId, quantity[i]]);
    }

    return

  } catch (err) {
    throw new Error('Database query failed '+ err.message);
  }
};

module.exports.pizzas = async (req,res) => {
  const id = String(req.session.user.id);

  let sqlQuery = 
    `select name from pizza_types pt`;
    
  try{    
    const result = await config.pool.query(sqlQuery);
    return result.rows;
  } catch (err) {
    throw new Error('Database query failed '+ err.message);
  }
};

