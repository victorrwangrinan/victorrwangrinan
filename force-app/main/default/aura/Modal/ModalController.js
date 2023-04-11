({
	init:function(comp,event,helper)
	{
		var dynamicUpdateContentOverflow=comp.get('v.dynamicUpdateContentOverflow');
		if(dynamicUpdateContentOverflow)
		{
			//添加事件侦听
			window.addEventListener('resize',function(e){
				//debounce
				var delay = 200;
				if (comp.resizeId === undefined) {
					helper.updateContentOverflow(comp);

					comp.resizeId = setTimeout(function() {
						comp.resizeId = undefined;
					}, delay);
				} else {
					clearTimeout(comp.resizeId);
					comp.resizeId = setTimeout(function() {
						helper.updateContentOverflow(comp);

						comp.resizeId = undefined;
					}, delay);
				}
			})
		}
	},
    handleRender:function(comp,event,helper)
    {
    	var dynamicUpdateContentOverflow=comp.get('v.dynamicUpdateContentOverflow');
		if(dynamicUpdateContentOverflow)
		{
			helper.updateContentOverflow(comp);
		}
    },
    closeModal : function(comp, event, helper) {
    	comp.set('v.isShow',false);

    	var event=comp.getEvent('onClose');
    	event.fire();
    }
})