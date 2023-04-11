/**
 * edit by robert wu at 2019.01.17
 *
 * 表单验证相关的帮助库
 * 需手动指定Validator到window（全局作用域）上
 *
 * 1.自动支持lightning的表单组件
 *
 * 2.额外支持的组件类型
 * 实现了checkValidity方法的组件
 */
window.Validator = {
    /**
     * 表单元素是否通过验证
     *
     * @param {Component|[Component]} 需要验证的组件，单个组件或组件数组,
     *                                组件数组不会执行类似Array.flat()的操作,
     *                                所以不要依赖 [comp.find('aura:id'),comp.find('aura:id')] 格式
     *                                如果要查找多个不同aura:id的组件数组，请使用Validator.findComponents                   
     * @return {boolean}
     */
    pass: function(components) {
        var comps = Array.isArray(components) ? components : [components];

        var b = true;
        for (var i = 0, len = comps.length; i < len; i++) {
            var comp = comps[i];
            //comp有效
            if(comp)
            {
                if (comp.checkValidity() === false) {
                    b = false;
                    //无需提前break                
                }
                //报告所有验证状态
                comp.reportValidity();
            }            
        }
        return b;
    },
    /**
     * 检查表单元素的验证状态
     *
     * @param {Component|[Component]} 需要验证的组件，单个组件或组件数组
     * @return {boolean}
     */
    checkValidity: function(components) {
        var comps = Array.isArray(components) ? components : [components];

        var b = true;
        for (var i = 0, len = comps.length; i < len; i++) {
            var comp = comps[i];
            if (comp.checkValidity() === false) {
                b = false;
                break;
            }
        }
        return b;
    },
    /**
     * 报告表单元素的验证状态
     *
     * @param {Component|[Component]} 需要验证的组件，单个组件或组件数组
     */
    reportValidity: function(components) {
        var comps = Array.isArray(components) ? components : [components];
        comps.forEach(function(comp) {
            comp.reportValidity();
        });
    },
    /**
     * 获取指定aura:id的组件数组
     *
     * 用法Validator.findComponents(comp,'aura:id','aura:id',...)
     *
     * @param {Component} 父组件
     * @return {array}
     */
    findComponents:function(comp)
    {
        var arr=[];
        for(var i=1,len=arguments.length;i<len;i++)
        {
            var auraId=arguments[i];
            var comps=comp.find(auraId);
            if(comps)
            {
                if(Array.isArray(comps))
                {
                    arr=arr.concat(comps);
                }
                else
                {
                    arr.push(comps);
                }                         
            }
           
        }
        return arr;
    },
    /*
    * hack：清除report状态，强制/伪装报告虚假状态
    */
    clearReport: function(components) {
        var comps = Array.isArray(components) ? components : [components];
        comps.forEach(function(comp) {
            var realCheckValidity=comp.checkValidity;
            if(realCheckValidity)
            {
                console.log(realCheckValidity,comp.get('v.validity'));
                
                
                comp.checkValidity=function checkValidity(){return true;};

                // var validity=comp.get('v.validity');
                // var valid=validity.valid;
                // validity.valid=true;
                comp.set('v.validity',{valid:true,valueMissing:false});

                console.log('22222',comp.get('v.validity'));
                console.log('33333',comp.reportValidity);

                comp.reportValidity();

                // validity.valid=valid;
                // comp.set('v.validity',validity);

                comp.checkValidity=realCheckValidity;                         
            }                       
        });
    }
};
