
//加载依赖express
let express = require('express');

//express实例化
let app = express();


//数据
let sql = [
	{name:"aaa",age:1,id:1},
	{name:"bbb",age:2,id:2},
	{name:"ccc",age:3,id:3}
];


//use注册中间件
app.use(express.static('www'));


//这里中间件使得sql赋值给req.sql
app.use((req,res,next)=>{
	req.sql = sql;
	next();
})

//注册中间件
app.use('/add',require('./data/add'));
app.use('/del',require('./data/del'));
app.use('/up',require('./data/up'));
app.use('/down',require('./data/down'));
app.use('/sort',require('./data/sort'));
app.use('/getdata',require('./data/data'));


app.listen(80);




