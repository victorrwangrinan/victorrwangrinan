({
    /**
     *  当每页显示的记录数/记录总数发生变化，刷新总页数
     */
    refreshTotalPages : function(component) {
        var pageCount = parseInt(component.get("v.pageCount"));
        var totalRecords = parseInt(component.get("v.totalRecords"));
        if(totalRecords>1000){
            totalRecords = 1000;
        }
        var totalPages = Math.ceil(totalRecords/pageCount);

        component.set("v.totalPages", totalPages > 0 ? totalPages : 1);
    },
    /**
     *  根据当前页码，刷新界面需要显示的页码按钮
     */
    refreshDisplayPages : function (component) {
        var defautButtonCount = 7; // 默认显示的页码按钮数
        var pageNumber = parseInt(component.get("v.pageNumber")); // 当前页码
        var totalPages = parseInt(component.get("v.totalPages")); // 总页数
        var pageCounter = new Array(); // 界面显示的页码合集

        pageCounter.push(-1);
        // 当总页数不超过界面最大显示页数时,显示所有页
        if(totalPages <= defautButtonCount){
            for(var i = 1; i <= totalPages; i++){
                pageCounter.push(i);
            }
        // 当点击的是前三页时，不显示前面的“更多”按妞
        }else if(pageNumber <= 4){
            for(var i = 1; i <= totalPages; i++){
                if(i > defautButtonCount) {
                    pageCounter.pop();
                    pageCounter.pop();
                    pageCounter.push(0);
                    pageCounter.push(totalPages);
                    break;
                }
                pageCounter.push(i);
            }
        // 隐藏多余的按妞，显示前、后“更多”按妞
        }else if(totalPages - pageNumber > defautButtonCount - 4){
            pageCounter.push(1);
            pageCounter.push(0);
            for(var i = pageNumber-1; i <= pageNumber + (defautButtonCount - 6); i++){
                pageCounter.push(i);
            }
            pageCounter.push(0);
            pageCounter.push(totalPages);
        // 显示前面的更多按妞，不显示后面的“更多”按妞
        }else{
            pageCounter.push(1);
            pageCounter.push(0);
            for(var i = totalPages - (defautButtonCount - 3); i <= totalPages; i++){
                pageCounter.push(i);
            }
        }
        pageCounter.push(-2);

        component.set("v.pageCounter", pageCounter);
    }
})