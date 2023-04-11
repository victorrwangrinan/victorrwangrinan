({
    changeMessage : function(component, event, helper) {
        var pageCount = parseInt(component.get("v.pageCount"));
        var pageNumber = parseInt(component.get("v.pageNumber"));
        var totalRecords = parseInt(component.get("v.totalRecords"));

        var start = (pageNumber - 1) * pageCount + 1;
        var end = pageNumber * pageCount > totalRecords ? totalRecords : pageNumber * pageCount;
        if(start > end) {
            start = 0;
            end = 0;
        }
        component.set("v.showMessage", start + "-" + end + " 条" + " | " + "总记录数 " + totalRecords + " 条");
    }
})