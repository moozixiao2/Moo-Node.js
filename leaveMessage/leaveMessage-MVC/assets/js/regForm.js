
//创建对象存储规则数据
let regxMethods = {
    //空
    regxEmpty: function(val, msg){
        if(val.trim().length === 0){
            return msg;
        }
    },
    regxLength: function(val, len, msg){
        if(val.trim().length < len){
            return msg;
        }
    }
}

//创建函数来验证
function RegxFun(){
    this.regxArr = [];
}
//add方法 数组中的函数
RegxFun.prototype.add = function(dom, rules){
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
//start方法 验证数组数据,调用函数
RegxFun.prototype.start =  function() {
    for(let i = 0; i < this.regxArr.length; i++){
        let errMsg = this.regxArr[i]();
        if(errMsg){
            return errMsg;
        }
    }
}