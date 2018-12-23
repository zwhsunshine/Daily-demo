
let ex = require('express'),  //加载依赖express
    router = ex.Router();  //router 是路由器实例化对象

router.get('/',(req,res)=>{
    let {name,age} = req.query;

    //必须输入姓名和年龄
    if(name && age){

        //查找：输入的名字是否存在数据库中
        let n = req.sql.find(e=>e.name === name);

        //输入的名字与数据库中的名字重复
        if(n){

            res.send({code:2,msg:'商品名称重复!'});

        }else{

            //年龄匹配规则：1到3位数字
            let re = /^[1-9]\d{0,8}$/.test(age);

            //符合规则push数据
            if(re){
                req.sql.push({
                    name,
                    age,
                    id:Date.now()
                });
                res.send({code:0,data:req.sql}); //数据发送给前端
            }else{

                res.send({code:3,msg:'请输入有效的价格!'});

            }

        }

    }else{
        res.send({code:1,msg:'请输入商品名称或价格！'});
    }

});  

module.exports = router;
