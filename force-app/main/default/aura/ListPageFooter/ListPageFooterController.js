({
    totalRecordsChange : function(component, event, helper) {
        //event.getParam("value/oldValue");
        helper.refreshTotalPages(component);
        helper.refreshDisplayPages(component);
    },
    pageChange: function (component, event, helper) {
        component.set("v.pageNumber", event.getParam("pageNumber"));
        helper.refreshDisplayPages(component);
    },
    pageCountChange : function (component, event, helper) {
        component.set("v.pageCount", event.getParam("pageCount"));
        component.set("v.pageNumber", 1);
        helper.refreshTotalPages(component);
        helper.refreshDisplayPages(component);
    }
})