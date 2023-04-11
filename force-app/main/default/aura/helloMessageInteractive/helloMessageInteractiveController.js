({
	handleClick : function(component, event, helper) {
		var btnClicker=event.getSource();
        var btnMessage=btnClicker.get("v.label");
        component.set("v.message",btnMessage);
	},
    handleClick2 : function(component, event, helper) {
		var newMessage = event.getSource().get("v.label");
        console.log("handleClick2: Message: " + newMessage);
        component.set("v.message", newMessage);
	}
})