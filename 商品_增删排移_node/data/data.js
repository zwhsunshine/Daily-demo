
let ex = require('express'),  //加载依赖express
    router = ex.Router();  //router 是路由器实例化对象

router.get('/',(req,res)=>{
	res.send({code:0,data:req.sql});
})

module.exports = router;



