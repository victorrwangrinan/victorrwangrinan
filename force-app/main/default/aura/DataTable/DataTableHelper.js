/**
 * edit by rwu128 on 9/12/2018.
 */
({
    /**
     * 创建单元格的内容
     * @param {object} item 一行/条数据
     * @param {number} rowIndex 行的索引
     * @param {object} column 列的描述
     * @param {function} cb
     */
    createTdCotent: function (item, rowIndex, column, cb) {
        /**
         * 默认不变量提升？
         * 获取组件的描述
         * @param {object} comp
         * @return {array} [compType,compAttributes]
         */
        var getComponent=function(comp)
        {
            //传给事件回调的数据，使用aura:id，带出行索引
            //是否有更好的往上回传数据的方式？
            var auraId=rowIndex;

            var compType;
            var compAttributes;
            var tdTitle='';
            var type = comp.type;
            var attributes=comp.attributes;
            //特殊的type类型
            if(type==='index')
            {
                compType = 'aura:text';
                compAttributes = {value: rowIndex + 1,'aura:id':auraId};
            }
            else
            {
                //持有正确格式的type和attributes
                if(typeof type==='string'&&Object.prototype.toString.call(attributes)==='[object Object]')
                {
                    compType=type;
                    //attribute的值可能是动态生成的，格式为${fieldName},用以下代码动态生成
                    var caculateAttributes={};
                    //确保label在value之前
                    Object.keys(attributes).sort().forEach(function(aName){
                        var aValue=attributes[aName];
                        if(typeof aValue==='string')
                        {
                            var reg=/^\${(.+)}$/;
                            var result=aValue.match(reg);
                            if(result!==null)
                            {
                                var fieldName=result[1];
                                //${this}返回该条数据本身
                                aValue=fieldName==='this'?item:this.getValueFromObject(item, fieldName);
                                caculateAttributes[aName]=aValue;
                            }
                        }
                        else if(typeof aValue==='function')
                        {
                            aValue=this.getValueFromObject(item, aValue);
                            caculateAttributes[aName]=aValue;
                        }
                        //!!! 最优解？2018.09.11,内部控制外部组件行为：如果单元格内容为lightning:helptext,且conent属性为空，则不显示lightning:helptext
                        //!!! 修复ie display none无法完全消失的问题,改用一个class选择器
                        if(compType==='lightning:helptext'&&aName==='content'&&!aValue)
                        {
                            caculateAttributes['class']='element_invisible';
                        }

                        //获得td的title
                        if(!this.isValidString(tdTitle))
                        {
                            tdTitle=this.getTdTitle(compType,aName,aValue);
                        }
                    }.bind(this));
                    //不要直接修改attributes，attributes是引用类型
                    compAttributes=this.assign({'aura:id':auraId},attributes,caculateAttributes);
                }
                else
                {
                    compType='aura:text';
                    var value=this.getValueFromObject(item, comp.fieldName)
                    compAttributes={value: value,'aura:id':auraId};
                    tdTitle = value;
                }
            }
            //通过component数组把td的title带出去
            return [compType,compAttributes,tdTitle];
        }.bind(this);

        var children=column.children;
        var comps;
        var tdTitle='';
        //单元格内有多个组件
        if (Array.isArray(children)){
            comps=children.map(function(comp){
                var realComponent=getComponent(comp);
                var tt=this.toValidString(realComponent[2]);//转成有效值
                tdTitle=tdTitle+(tt===''?'':' '+tt);
                return realComponent;
            }.bind(this));
        }
        else {
            var comp=getComponent(column);
            tdTitle=this.toValidString(comp[2]);//转成有效值
            comps=[comp];
        }
        $A.createComponents(comps, function (components, status, statusMessagesList) {
            if (status === 'SUCCESS') {
                cb(components, tdTitle);
            }
            else
            {
                console.log('创建td内的组件错误',status,statusMessagesList);
            }
        });
    },
    /**
     * 从对象中获取指定键的值
     * @param {object}              - 对象
     * @param {string|function} key - 键,
     *                                1. string  当键为类似'keyA.KeyB'的形式时，需做深度遍历
     *                                2. function 将item作为参数传入方法并返回结果
     */
    getValueFromObject: function (obj, key) {
        //key为字符串
        if(typeof key === 'string'&&key.length >0)
        {
            var ks = key.split('.');
            //过滤空值
            ks = ks.filter(function (k) {
                return k !== '';
            });
            //遍历
            var value = obj;
            for (var i = 0, len = ks.length; i < len; i++) {
                var k = ks[i];
                var value=value[k];
                //上一层对象为undefined直接返回
                if(value===undefined)
                {
                    break;
                }
            }

            return value;
        }
        else if(typeof key==='function')
        {
            return key.call(null,obj);
        }
    },
    /**
     * 实现类Object.assign方法
     */
    assign:function assign(target, sources)
    {
        'use strict';


        if(Object.assign)
        {
            return Object.assign.apply(null,arguments);
        }

        // TypeError if undefined or null
        if (target == null)
        {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        //将target转成Object
        var to = Object(target);

        //遍历sources，从source取值并赋值到target
        for (var i = 1,len=arguments.length; i < len; i++)
        {
            var nextSource = arguments[i];
            // Skip over if undefined or null
            if (nextSource != null)
            {
                for (var nextKey in nextSource)
                {
                    // Avoid bugs when hasOwnProperty is shadowed，确保是自己的属性而不是继承来的
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                    {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    },
    isValidString:function(str)
    {
        return str!==''&&str!==undefined&&str!==null;
    },
    toValidString:function(str)
    {
        if(this.isValidString(str))
        {
            return str;
        }
        else
        {
            return '';
        }
    },
    /**
     * 获得受全选checkbox影响的数据的属性名
     */
    getFieldNameControlledByCheckBox:function(comp)
    {
        var columns=comp.get('v.columns');
        //获得全选checkbox控制的数据的fieldName
        var fieldName;
        for(var i=0,len=columns.length;i<len;i++)
        {
            var column=columns[i];
            var attributes=column.attributes;
            //目前认为最多只有一列全选checkbox
            if(column.label===undefined&&column.type==='lightning:input'&&attributes!==undefined&&attributes.type==='checkbox')
            {
                var aValue=attributes['checked'];
                if(typeof aValue==='string')
                {
                    var reg=/^\${(.+)}$/;
                    var result=aValue.match(reg);
                    if(result!==null)
                    {
                        fieldName=result[1];
                    }
                }
                break;
            }
        }
        return fieldName;
    },
    /**
     * 改变全选checkbox的状态
     * 如果数据全未选中，则移除选中
     * 如果数据全选中则添加选中
     */
     changeCheckState:function(comp)
     {
        var checkbox=comp.find('input-checkbox');
        if(checkbox)
        {
            var fieldName=this.getFieldNameControlledByCheckBox(comp);
            if(fieldName!==undefined)
            {
                var data=comp.get('v.data');
                //空数组every返回true
                var selectAll=data.every(function(item){
                    return item[fieldName]===true;
                });
                selectAll=data.length===0?false:selectAll;

                //移除checkbox的选中,通过代码设置，并不会重渲染？
                //checkbox.set('v.checked',selectAll);
                comp.set('v.selectAll',selectAll);
            }
        }
     },
     /*
    * key的格式
    * 1. 'KeyA'
    * 2. 'KeyA.keyB'
    * @return {string|undefined}
    */
    getValue:function(object,key)
    {
      if(Object.prototype.toString.call(object)==='[object Object]'&&typeof key==='string')
      {
        var keyPath=key.split('.');
        var value=keyPath.reduce(function(obj, key){
          return (obj||{})[key];
        },object);
        return value;
      }
    },
    /*
    * 时间处理相关的函数
    */
    formatDateTime:function(value)
    {
        if(value)
        {
            //格式2017-09-06T17:45:00.000Z
            var date=new Date(value);
            //如果date无效，重新尝试创建
            if(date.toString()==='Invalid Date')
            {
                date=new Date();
                var ymd=value.split('T')[0].split('-');
                var hms=value.split('T')[1].split('.')[0].split(':');
                date.setUTCFullYear(parseInt(ymd[0]));
                date.setUTCMonth(parseInt(ymd[1])-1);
                date.setUTCDate(parseInt(ymd[2]));
                date.setUTCHours(parseInt(hms[0]));
                date.setUTCMinutes(parseInt(hms[1]));
                date.setUTCSeconds(parseInt(hms[2]));
            }


            var year=date.getFullYear();
            var month=this.keepTwo(date.getMonth()+1);
            var day=this.keepTwo(date.getDate());
            var hours=this.keepTwo(date.getHours());
            var minutes=this.keepTwo(date.getMinutes());
            var seconds=this.keepTwo(date.getSeconds());

            var _value=year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
            return _value;
        }
    },
    keepTwo:function(value) {
        return value<10?'0'+value:value;
    },
    getTdTitle:function(compType,aName,aValue)
    {
        //哪些些属性的值可以作为单元格title的值,同时存在label,value时，请按照期望的顺序传值
        var aNames=['label','value'];
        if(aNames.indexOf(aName)!==-1)
        {
            if(aValue)
            {
                var title=aValue;
                if(compType==='c:CPRI_Field_DateTime')
                {
                    title=this.formatDateTime(aValue);
                }
                return title;
            }
        }
    },
    updateCheckboxGroupColumns:function(comp)
    {
        var columns=comp.get('v.columns');
        if(Array.isArray(columns))
        {
            var checkboxGroupColumns=[];
            var selectColumns=[];
            var self=this;
            columns.forEach(function(column){
                var label=column.label;
                if(self.isValidString(label))
                {
                    checkboxGroupColumns.push({label:label,value:label});
                }
            });
            columns.forEach(function(column){
                var value=column.label;
                if(self.isValidString(value))
                {
                    if(column.invisible!==true)
                    {
                        selectColumns.push(value);
                    }
                }
            });
            comp.set('v.checkboxGroupColumns',checkboxGroupColumns);
            comp.set('v.selectColumns',selectColumns);
        }

    },
})