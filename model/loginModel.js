const config = require('../config/database');

config.connectToDb();

//회원가입
module.exports.registerUser = async(req, res) => {

  const { id , pw , name} = req.body;

  let sqlQuery = `INSERT INTO MEM(MEM_ID, MEM_PWD, MEM_NM) 
    VALUES($1, $2, $3)`;
    
  try{
    const result = await config.pool.query(sqlQuery, [id, pw, name]);
  }catch(err){
    throw new Error('Database query failed '+ err.message);
  } 
};

//로그인 시 id, pw 확인
module.exports.loginCheck = async (req, res) => {
  const mId = String(req.body.id);
  const mPw = String(req.body.pw);

  let sqlQuery = `SELECT count(*) as count FROM MEM WHERE MEM_ID = $1 AND MEM_PWD = $2`;
    
  try{

    const result = await config.pool.query(sqlQuery, [mId, mPw]);

    if(result.rows[0].count > 0 ){
      req.session.user = {
        id: mId
      };
    }

    return result.rows[0];
  } catch (err) {
    throw new Error('Database query failed '+ err.message);
  }
};

// logout
module.exports.logout = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) 
          reject(err);
        else
          resolve();
      });
    });
  } catch (err) {
      throw new Error('logout fail '+ err.message);
  }
};

