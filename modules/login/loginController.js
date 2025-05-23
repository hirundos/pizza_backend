const loginModel = require('./loginModel');

//회원가입
exports.registerUser = async (req, res) => {
    try{
        await loginModel.registerUser(req,res);
        res.status(200).json({ message: '회원가입 성공!'  });
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

//로그인 시 id, pw 확인
exports.loginCheck = async (req, res) => {
  
    try{
        const products = await loginModel.loginCheck(req,res);

        if(products.count > 0){
            res.status(200).json({ message: '로그인 성공!'  });
        } else{
            res.status(401).json({message : 'ID 또는 비밀번호가 일치하지 않습니다.'});
        }
    } catch (err) {
        res.status(500).json({error:err.message});
    }
        
};

// logout 컨트롤러
exports.logout = async (req, res) => {
  try {
    await loginModel.logout(req,res);
    res.clearCookie('connect.sid'); 
    res.status(200).json({ message: '로그아웃 성공' });
  } catch (err) {
    console.error('세션 삭제 실패:', err);
    res.status(500).json({ message: '로그아웃 실패' });
  }
};