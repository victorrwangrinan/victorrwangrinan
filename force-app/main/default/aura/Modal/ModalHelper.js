({
    updateContentOverflow : function(comp) {
    	var isShow=comp.get('v.isShow');
    	if(isShow)
    	{
    		var contentComp=comp.find('modal__content');
			if(contentComp)
			{
				var content=contentComp.getElement();
				//重要：先按overflow:auto计算
				content.style.overflow='auto';

				//计算slds-modal__container的内容高度
				var containerHeight=[comp.find('modal__header'),contentComp,comp.find('modal__footer')].reduce(function(a,c){
					if(c)
					{
						var element=c.getElement();
						if(element)
						{
							var height=parseFloat(element.scrollHeight);
							console.log('ppppppp',height);
							return a+height;
						}
					}
					return a;
				},0)
				var padding=48*2;//3rem*2
				containerHeight+=padding;
				//判断slds-modal__container的高度和屏幕的高度
	    		var windowHeight=window.innerHeight;
	    		//将slds-modal__content的overflow改掉
	    		if(containerHeight<windowHeight)
	    		{
	    			content.style.overflow='visible';
	    		}
	    		else
	    		{
	    			content.style.overflow='auto';
	    		}

			}
    	}
    }
})