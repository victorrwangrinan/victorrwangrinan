({
    onInit: function (component, event, helper) {
        var columns = [
            { type: "index", width: "60px", label: "序号" },
            {
                type: "lightning:input",
                width: "30px",
                showTitle:false,
                attributes: {
                    type: "checkbox",
                    checked:"${checked}",
                    value: "${Id}",
                    onclick: component.getReference("c.addSelect")
                }
            },
            { label: "成员", fieldName: "memberType__c" },
            { label: "工号", fieldName: "memberRole__c"},
            { label: "名称", fieldName: "Name"}
        ];
        var memberColumns = [
            { type: "index", width: "60px", label: "序号" },
            {
                type: "lightning:input",
                width: "30px",
                showTitle:false,
                attributes: {
                    type: "checkbox",
                    checked:"${checked}",
                    value: "${Id}",
                    onclick: component.getReference("c.addMemSelect")
                }
            },
            { label: "成员", fieldName: "memberType__c" },
            { label: "工号", fieldName: "memberRole__c"},
            { label: "名称", fieldName: "Name"}
        ];
        component.set("v.columns", columns);
        component.set("v.memberColumns", memberColumns);

        helper.getObjectRecords(component,event);
//        event.stopPropagation();
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

    addSelect: function(component,event){
        var memberList=component.get('v.memberList');
        var checkbox=event.getSource();
        var rowIndex=checkbox.getLocalId();
        var checked=checkbox.get('v.checked');
        console.log('rowIndex:'+rowIndex);
        console.log('checked:'+checked);

        memberList[rowIndex].checked = !checked;
        console.log('memberList:'+memberList);
        component.set('v.memberList',memberList);
    },

    addMemSelect: function(component,event){
        var optionMembers=component.get('v.optionMembers');
        var checkbox=event.getSource();
        var rowIndex=checkbox.getLocalId();
        var checked=checkbox.get('v.checked');
        console.log('rowIndex:'+rowIndex);
        console.log('checked:'+checked);

        optionMembers[rowIndex].checked = !checked;
        console.log('optionMembers:'+JSON.stringify(optionMembers));
        component.set('v.optionMembers',optionMembers);
    },

    onDelete: function (component, event, helper) {
        var selectList = [];
        var memberList = component.get("v.memberList");
        for (var i = 0; i < memberList.length; i++) {
            if (memberList[i].checked == true) {
                selectList.push(memberList[i].Id);
            }
        }
        if (selectList.length > 0) {
            var action = component.get("c.deleteMembers");
            action.setParams({
                "groupIds":JSON.stringify(selectList)
            });
            action.setCallback(this,function(response){
                var state=response.getState();
                console.log(state);
                if(state==='SUCCESS') {
                    var returnValue=response.getReturnValue();
                    if (returnValue == "Success") {

                        var pageNum=component.get('v.pageNumber');
                        if(memberList.length==selectList.length && parseInt(pageNum)>1){
                            component.set("v.pageNumber", pageNum-1);
                        }

                        helper.getObjectRecords(component,event);
                    } else {
                        console.error(returnValue);
                    }
                }
                else if (state == "ERROR") {
                    var errors = response.getError();
                    console.error(errors);
                }
                component.set("v.isBusy", false);
            })
            $A.enqueueAction(action);
        }
    },

    openAdd: function (component, event, helper) {
        component.set("v.isOpenAdd", true);

        //每次打开都清除上次搜索的历史
        component.set("v.searchName", '');
        component.set("v.searchNo", '');
        var tempList = [];
        component.set('v.optionMembers', tempList);
        //原本注释掉的
        helper.getOptMembers(component, event);
    },

    closeAdd: function (component, event, helper) {
        component.set("v.isOpenAdd", false);
    },

    searchOpMembers: function (component, event, helper) {
        helper.getOptMembers(component, event);
    },

    doReset: function (component, event, helper) {
        component.set("v.searchName", '');
        component.set("v.searchNo", '');
        var tempList = [];
        component.set('v.optionMembers', tempList);
    },

    confirmAdd: function (component, event, helper) {
        component.set("v.isOpenAdd", false);

        var applyList = [];
        var userIdList = [];
        var optionMembers = component.get("v.optionMembers");
        for (var i = 0; i < optionMembers.length; i++) {
            console.log('line:'+i);
            console.log('optionMembers[i].checked:'+optionMembers[i].checked);
            if (optionMembers[i].checked == true) {
                applyList.push(optionMembers[i].Id);
                userIdList.push(optionMembers[i].Approver__c)
            }
        }
        console.log('applyList:'+JSON.stringify(applyList));

        var action = component.get("c.addMemberToGroup");
        component.set("v.isBusy", true);
        action.setParams({
            "groupId":component.get('v.groupId'),
            "memberIds":applyList,
            "userIds":userIdList
        });
        action.setCallback(this,function(response){
            var state=response.getState();
            console.log(state);
            if(state==='SUCCESS') {
                helper.getOptMembers(component, event);
                helper.getObjectRecords(component,event);
            }
            else if (state == "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            component.set("v.isBusy", false);
        })
        $A.enqueueAction(action);
    },

    openCreate: function (component, event, helper) {
        component.set("v.isOpenAdd", false);
        component.set("v.isOpenCreate", true);

        component.set("v.createName", '');
        component.set("v.createRole", '');
        component.set("v.createType", '');
    },

    closeCreate: function (component, event, helper) {
        component.set("v.isOpenCreate", false);
    },

    confirmCreate: function (component, event, helper) {
        var crename=component.get('v.createName');
        var creRole=component.get('v.createRole');
        var creType=component.get('v.createType');
        var valForm=component.find("memberForm");

        if (!Validator.pass(valForm)) {
         return;
        }
        component.set("v.isOpenCreate", false);

        var action = component.get("c.createMembers");
        action.setParams({
            "nameParam":component.get('v.createName'),
            "roleParam":component.get('v.createRole'),
            "typeParam":component.get('v.createType'),
            "groupId":component.get('v.groupId')
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('=====>:'+state);
            if (component.isValid() && state === "SUCCESS") {
                helper.getObjectRecords(component,event);
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
        });
        $A.enqueueAction(action);
    },
    groupIdChange:function(component, event, helper){
        console.log('----------1');
        component.set("v.pageNumber",1);
        helper.getObjectRecords(component,event);
    },
    getDependentPicklist:function(component,event,helper){
       var cretype = component.get('v.createType');
       console.log('cretype:'+cretype);
       helper.getPicklist(component,cretype);
    }

})