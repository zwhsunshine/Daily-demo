let tools = (function(){


    //一维数据，根据id和pid对应的父子级关系，传入父级id，生成子级数据
    function getChild(id,data){
        let arr = [],
            onOff = false;
        //遍历数据data，根据传入的参数id把对应的数据push到arr中
        for(let attr in data){
            if(data[attr].pid === id){
                arr.push(data[attr]);
                onOff = true;
            }
        }
        if(onOff){
            return arr;
        }else{
            return null;
        }
    }



    //父级（上一级）数据
    function parent(id){
        if( !data[id] || data[id].pid === -1){
            return data[data[id].pid];
        }
    }



    //所有父级数据
    function parents(id,data){
        let now = data[id],
            parr = [];
        while(now){
            parr.unshift(now);
            now = data[now.pid];
        }
        return parr;
    }



    //自己及所有子级数据
    let child = [];  //存放自己及子级的数据;
    function getChildren(id,data){
        let arr = getChild(id,data);
        arr && arr.forEach(e=>{
            child.push(e);
            getChildren(e.id,data);
        })
    }



    //计算left，top值
    function offset(ele){
        if(ele.nodeType === 1){
            ele = ele;
        }else if(typeof ele === 'string'){
            ele = document.querySelector(ele);
        }else{
            return null
        }

        let obj = {
            l:0,
            t:0
        };
        let eCl = ele.clientLeft,
            eCt = ele.clientTop;

        while(ele){
            obj.l += ele.offsetLeft + ele.clientLeft;
            obj.t += ele.offsetTop + ele.clientTop;
            ele = ele.offsetParent;
        }
        obj.l -= eCl;
        obj.t -= eCt;

        return obj;
    }



    //碰撞
    function collision(obj1,obj2,pBox){
        let l1 = obj1.offsetLeft;
        let t1 = obj1.offsetTop;
        let b1 = t1 + obj1.offsetHeight;
        let r1 = l1 + obj1.offsetWidth;

        let l2 = obj2.offsetLeft;
        let t2 = obj2.offsetTop - pBox.scrollTop;
        let b2 = t2 + obj2.offsetHeight;
        let r2 = l2 + obj2.offsetWidth;
        
        if(r1<l2 || b1 < t2 || l1 > r2 || t1 > b2){
            return false;
        }else{
            return true;
        }
    }



    //批量添加属性
    function attr(attr,val){
        for(let i in data){
            if(Array.isArray(val)){
                data[i][attr] = [];
            }else{
                data[i][attr] = val;
            }
            
        }
    }



    //移动文件夹时，有相同的名字加“-副本”
    function copy(e,n,arr){
        e += '-副本';
        n++;
        //判断有arr[n]这一项 && 名字重复时，继续递归，添加“-副本”，否则终止递归，返回e
        if(arr[n] && (arr[n].title === e)){
            console.log(1);
            e = copy(e,n,arr);
        }
        return e;
    }

    return {
        getChild,  //子级数据
        parents,  //所有父级数据
        child,  //存放自己及子级的数据;
        getChildren,  //所有子级数据
        offset,  //
        collision,  //碰撞
        attr,  //批量添加属性
        copy
    }

})()