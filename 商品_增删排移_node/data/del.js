
let ex = require('express'),  //加载依赖express
    router = ex.Router();  //router 是路由器实例化对象

router.get('/',(req,res)=>{

	//获取当前的数据的id
	let {id} = req.query;

	//n为当前数据的索引值
	let n = req.sql.indexOf( req.sql.find(e=>e.id == id) );

	//删除索引对应的数据
	req.sql.splice(n,1);

	//把数据发送至前端
	res.send({code:0,data:req.sql});

})

module.exports = router;
