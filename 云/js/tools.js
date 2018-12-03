let tools = (function(){

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

    return {
        offset
    }

})()