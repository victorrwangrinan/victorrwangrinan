({
	doInit : function(component, event, helper) {
		component.set('v.content','hello,pwc');
        helper.setContent(component,'hello lighting');
	},
	addHandler: function(component) { 
		component.set("v.flag", false);

		console.log(component.get("v.flag"));
	}
})