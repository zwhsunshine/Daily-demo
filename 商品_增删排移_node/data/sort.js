
let ex = require('express'),  //加载依赖express
    router = ex.Router();  //router 是路由器实例化对象

router.get('/',(req,res,next)=>{
	
	//获取当前的数据的id
	let {type,order} = req.query;

	//年龄 && 从低到高
	if( type === 'price' && order === '1' ){
		req.sql.sort((a,b)=>{
			return a.age - b.age;
		})
	}

	//年龄 && 从高到低
	if( type === 'price' && order === '2' ){
		req.sql.sort((a,b)=>{
			return b.age - a.age;
		})
	}

	//编号 && 从低到高
	if( type === 'id' && order === '1' ){
		req.sql.sort((a,b)=>{
			return a.id - b.id;
		})
	}

	//编号 && 从高到低
	if( type === 'id' && order === '2' ){
		req.sql.sort((a,b)=>{
			return b.id - a.id;
		})
	}

	//把数据发送至前端
	res.send({code:0,data:req.sql});

})

module.exports = router;


