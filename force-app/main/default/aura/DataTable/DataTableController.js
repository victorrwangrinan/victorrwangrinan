/**
 * edit by rwu128 on 9/12/2018.
 */
({
    /**
     * debounce版本createTable
     * 降低调用频率
     * 使用$A.enqueueAction()执行另一个controller方法
     */
     createTableDebounce:function(comp,event,helper)
     {
        var delay = 500;
        //第一次立即执行
        if (comp.id === undefined) {
          //这样调用controller内部方法，有点问题
          //$A.enqueueAction(comp.get('c.createTable'));
          comp.createTable();

          comp.id = setTimeout(function(){
            comp.id = undefined;
          }, delay);
        } else {
          clearTimeout(comp.id);
          comp.id = setTimeout(function(){
             //$A.enqueueAction(comp.get('c.createTable'));
             comp.createTable();

            //为下一次立即执行做准备
            comp.id = undefined;
          }, delay);
       }
     },
    /**
     * 注意：createComponent是异步操作
     * 所以使用类似如下结构实时更新
     * tr.set('v.body',tr.get('v.body').concat([td]));
     *
     */
    createTable:function(comp,event,helper)
    {
        helper.changeCheckState(comp);

        var columns=comp.get('v.columns');
        var data=comp.get('v.data');
        //确保data和columns有效
        if(!Array.isArray(data)||!Array.isArray(columns))
        {
            return;
        }

        var trStyle=comp.get('v.trStyle');
        //设置table的trs
        comp.set('v.body',[]);
        for(var i=0,len=data.length;i<len;i++)
        {
            //利用闭包代入tr的索引
            (function(i){
                //因为存在单元格合并的情况，所以需要做判断保证tr背景色合理？
                $A.createComponent("tr",{style:trStyle}, function(tr, status, statusMessagesList){
                    if(status==='SUCCESS')
                    {
                        var item=data[i];
                        //设置tr的tds
                        tr.set('v.body',[]);
                        for(var j=0,l=columns.length;j<l;j++)
                        {
                            var column=columns[j];
                            if(column.invisible===true)
                            {
                                continue;
                            }

                            var rowSpan=column.rowSpan;
                            var shouldCreateTd=true;
                            //td默认有padding
                            var className=column.class?column.class:'';
                            var tdStyle=column.tdStyle?column.tdStyle:'';
                            // console.log('1111',className,column.class);
                            var tdAttribute={'class':['slds-p-around--x-small',className].join(' '),'style':tdStyle};
                            if(typeof rowSpan==='number'&&rowSpan>1)
                            {
                                if(i%rowSpan!==0)
                                {
                                    shouldCreateTd=false;
                                }
                                else
                                {
                                    tdAttribute['rowspan']=rowSpan;
                                }
                            }
                            if(shouldCreateTd)
                            {
                                //利用闭包带入td的index索引
                                (function(j){
                                    $A.createComponent('td',tdAttribute, function(td, status, statusMessagesList) {
                                        if(status==='SUCCESS')
                                        {
                                            helper.createTdCotent(item,i,column,function(field, tdTitle){
                                                td.set('v.body',field);
                                                //更新tds
                                                var tds=tr.get('v.body');
                                                //2018.12.20：不敢想象，在网速慢（可能原因）的情况下，tds居然可能是undefined，所以加此判断
                                                if(tds)
                                                {
                                                    tds[j]=td;
                                                }
                                                tr.set('v.body',tds);
                                                //hack:getElment() at next event loop
                                                //如果组件只是被创建，并未添加到页面，component.getElement()获得不到组件渲染的dom
                                                //通过showTitle属性控制是否显示title
                                                if(column.showTitle!==false&&helper.isValidString(tdTitle))
                                                {
                                                    setTimeout(function(){
                                                        var tdDom=td.getElement();
                                                        if(tdDom)
                                                        {
                                                            tdDom.setAttribute('title',tdTitle);
                                                        }
                                                    },0);
                                                }
                                            })
                                        }
                                    });
                                })(j);
                            }
                        }
                        //更新trs
                        var trs=comp.get('v.body');
                        trs[i]=tr;
                        comp.set('v.body',trs);
                    }
                });
            })(i)
        }
    },
    checkAll:function(comp,event,helper)
    {
        //获得全选checkbox控制的数据的fieldName
        var fieldName=helper.getFieldNameControlledByCheckBox(comp);

        if(fieldName!==undefined)
        {
            var checkbox=event.getSource();
            var checked=checkbox.get('v.checked');
            var data=comp.get('v.data');
            data.forEach(function(item){
                item[fieldName]=checked;
            })
            comp.set('v.data',data);

            //派发onSelectAll事件
            var event=comp.getEvent('onSelectAll');
            event.setParams({
                type:'onSelectAll',
                data:{
                    checked:checked
                }
            })
            event.fire();
        }
    },
    /*
    * 按列对table排序
    * 第一次对table做升序排列
    */
    sortTableByColumn:function(comp,event,helper)
    {
        var columns=comp.get('v.columns');
        var data=comp.get('v.data');
        //确保data和columns有效
        if(!Array.isArray(data)||!Array.isArray(columns))
        {
            return;
        }

        var th=event.currentTarget;
        var columnIndex=th.getAttribute('data-column-index');
        var column=columns[columnIndex];
        if(column)
        {
            var sortBy=column.sortBy||column.fieldName;
            if(sortBy)
            {
                var columnSortMethod=th.getAttribute('data-column-sort-method');
                data.sort(function(itemA,itemB){
                    //值为空时，返回空字符串，方便做排序
                    var valueA=helper.getValue(itemA,sortBy)||'';
                    var valueB=helper.getValue(itemB,sortBy)||'';
                    //相等不做排序
                    if(valueA===valueB)
                    {
                        return 0;
                    }
                    //当前升序
                    if(columnSortMethod==='asc')
                    {
                        //降序排列
                        return valueB>valueA?1:-1;
                    }
                    else
                    {
                        //升序排列
                        return valueA>valueB?1:-1;
                    }
                });
                th.setAttribute('data-column-sort-method',columnSortMethod==='asc'?'des':'asc');
                comp.set('v.data',data);
            }
        }
    },
    selectColumnsToDisplay:function(comp,event,helper)
    {
        helper.updateCheckboxGroupColumns(comp);
        comp.set('v.isShow',true);
    },
    applyColumnsToDisplay:function(comp,event,helper)
    {
        var selectColumns=comp.get('v.selectColumns');
        if(selectColumns.length>0)
        {
            //再根据columns来确定哪些列invisible
            var columns=comp.get('v.columns');
            //根据selectColumns,显示/隐藏其他列
            columns.forEach(function(column){
                var value=column.label;
                column.invisible=false;
                if(helper.isValidString(value))
                {
                    if(selectColumns.indexOf(value)===-1)
                    {
                        column.invisible=true;
                    }
                }
            });

            comp.set('v.columns',columns);
            comp.set('v.isShow',false);
        }
    },
    selectAllColumns:function(comp,event,helper)
    {
        var checkboxGroupColumns=comp.get('v.checkboxGroupColumns');
        if(Array.isArray(checkboxGroupColumns))
        {
            var selectColumns=checkboxGroupColumns.map(function(column){
                return column.value;
            });
            comp.set('v.selectColumns',selectColumns);
        }
    }
})