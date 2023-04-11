({
    onInit: function (component, event, helper) {
        var columns = [
            { type: "index", width: "60px", label: "序号" },
            {
                label: "操作",
                children:[
                    {
                        type: "lightning:button",
                        attributes: {
                            label: "删除",
                            variant: "base",
                            value: "${Id}",
                            onclick: component.getReference("c.deleteItem")
                        }
                    },
                    {
                        type:'lightning:button',
                        attributes: {
                            label: "编辑成员",
                            variant: "base",
                            value: "${Id}",
                            onclick: component.getReference("c.editMember")
                        }
                    }
                ]
            },
            { label: "群组名称", fieldName: "Name" },
            { label: "创建人", fieldName: "CreatedBy.Name"}
        ];
        component.set("v.columns", columns);

        helper.getObjectRecords(component,event);
        event.stopPropagation();
    },

    pageChange: function(component, event, helper) {
        var pageNumber = event.getParam("pageNumber");
        component.set("v.pageNumber",pageNumber);
        helper.getObjectRecords(component,event);
        event.stopPropagation();
    },

    pageCountChange : function(component, event, helper){
        var pageCount = event.getParam("pageCount");
        component.set("v.pageSize",pageCount);
        component.set("v.pageNumber", 1);
        helper.getObjectRecords(component,event);
        event.stopPropagation();
    },

    getGroupMember: function (component, event, helper) {
        component.set("v.isOpenMemberList", "true");
        var groupId = event.getSource().get("v.value");

        var evt = $A.get("e.c:CPRI_ProgramEvt");
        evt.setParams({
            "groupId": groupId
        });
        evt.fire();
    },

    doSearch: function (component, event, helper) {
        helper.getObjectRecords(component,event);
    },

    openAdd: function (component, event, helper) {
        component.set("v.isOpenAdd", true);
        component.set("v.newGroupName", '');
    },

    closeAdd: function (component, event, helper) {
        component.set("v.isOpenAdd", false);
    },

    saveGroup: function (component, event, helper) {

        if (!Validator.pass(component.find("groupForm"))) {
         return;
        }
        component.set("v.isBusy", true);
        var action = component.get("c.createNewGroup");
        action.setParams({
            "groupName":component.get('v.newGroupName')
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValue=response.getReturnValue();
                if (returnValue == 'Success') {
                    component.set('v.isOpenAdd',false);
                    helper.getObjectRecords(component,event);
                } else {
                    alert("ERROR: " + JSON.parse(returnValue));
                }
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("ERROR: " + errors[0].message);
                    }
                } else {
                    alert("ERROR: Unknown error");
                }
            }
            component.set("v.isBusy", false);
        });
        $A.enqueueAction(action);
    },

    deleteItem: function (component, event, helper) {
        component.set("v.isBusy", true);
        var pageNum=component.get("v.pageNumber");
        var action = component.get("c.deleteGroup");
        var groups=component.get("v.groupList");

        action.setParams({
            "groupId":event.getSource().get("v.value")
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValue=response.getReturnValue();
                if (returnValue == 'Success') {

                    console.log('删除前：'+pageNum);
                    // 如果删除的是当前页的最后一条数据，则显示上一页数据
                    if(groups.length==1 && parseInt(pageNum)>1){
                        component.set("v.pageNumber",pageNum-1);
                        console.log('删除后：'+component.get("v.pageNumber"));
                    }

                    helper.getObjectRecords(component,event);
                } else {
                    alert("ERROR: " + JSON.parse(returnValue));
                }
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("ERROR: " + errors[0].message);
                    }
                } else {
                    alert("ERROR: Unknown error");
                }
            }
            component.set("v.isBusy", false);
        });
        $A.enqueueAction(action);
    },

    editMember: function (component, event, helper) {
        component.set("v.isShowMembers", true);
        var groupId = event.getSource().get("v.value");
        component.set("v.groupId", groupId);

        component.set("v.selectTab", "members");
    }
})