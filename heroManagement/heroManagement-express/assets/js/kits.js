let kits = {};
kits.getUrlParams = function(){
    //获得地址栏参数
    let search = location.search.substr(1).split('&');
    //设置对象存参数，并设置参数格式是键值对
    let params = {};
    search.forEach(e =>{
        let temp = e.split('=');
        let key = temp[0];
        let val = temp[1];
        params[key] = val;
    })
    return params;
}
//
let regxMethods = {
    //空
    regxEmpty(val, msg){
        if(val.trim().length === 0){
            return msg;
        }
    },
    //长度
    regxLength(val, len, msg){
        if(val.trim().length < len){
            return msg;
        }
    }
}

function regxFun(){
    this.regxArr = [];
}

regxFun.prototype.add = function(dom, rules){
    for(let i = 0; i < rules.length; i++){
        let rule = rules[i];
        let fn = function(){
            let params = rule.funName.split(':');
            let fname = params.shift();
            params.unshift(dom.value);
            params.push(rule.msg);
            return regxMethods[fname].apply(dom, params);
        }
        this.regxArr.push(fn);
    }
}
regxFun.prototype.start = function(){
    for(let i = 0; i < this.regxArr.length; i++){
        let errMsg = this.regxArr[i]();
        if(errMsg){
            return errMsg;
        }
    }
}