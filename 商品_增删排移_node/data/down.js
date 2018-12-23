
let ex = require('express'),  //加载依赖express
    router = ex.Router();  //router 是路由器实例化对象

router.get('/',(req,res,next)=>{
	
	//获取当前的数据的id
	let {id} = req.query;

	//n为当前数据的索引值
	let i = req.sql.indexOf( req.sql.find(e=>e.id == id) );

	//本条数据和下条数据调换顺序
	if( i != req.sql.length-1 ){
		
		let temp = req.sql[i];
		req.sql[i] = req.sql[i*1 + 1];
		req.sql[i*1 + 1] = temp;

	}

	//把数据发送至前端
	res.send({code:0,data:req.sql});

})

module.exports = router;
