({
    secondAction : function(component, event, helper,evt) {
        console.log('-------');
        console.log(evt);
        console.log(event);
    },

    handleClick: function(component, event, helper){
        console.log(event.getSource().get("v.label"));
        // let action = component.get('c.secondAction');
        // action.setParams({
        //     "evt":event.getSource().get("v.label")
        // })

        // $A.enqueueAction(action);
        component.secondAction(component, event, helper);
    },
    handleUploadFinished: function (cmp, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
        alert("Files uploaded : " + uploadedFiles.length);

        // Get the file name
        uploadedFiles.forEach(file => console.log(file.name));
    }
})