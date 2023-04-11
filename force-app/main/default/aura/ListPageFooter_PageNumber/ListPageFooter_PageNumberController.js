({
    doInit : function(component, event, helper) {
        // 全部转换成int，防止比较时出错
        var pageNumber = component.get("v.pageNumber");
        var currentPageNumber = component.get("v.currentPageNumber");
        var totalPages = component.get("v.totalPages");
        component.set("v.pageNumber", parseInt(pageNumber));
        component.set("v.currentPageNumber", parseInt(currentPageNumber));
        component.set("v.totalPages", parseInt(totalPages));
    },
    openThePage : function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        helper.firePageChangeEvt(component, pageNumber);
    },
    openPreviousPage : function (component, event, helper) {
        var pageNumber = component.get("v.currentPageNumber");
        helper.firePageChangeEvt(component, parseInt(pageNumber) - 1);
    },
    openNextPage : function (component, event, helper) {
        var pageNumber = component.get("v.currentPageNumber");
        helper.firePageChangeEvt(component, parseInt(pageNumber) + 1);
    }
})