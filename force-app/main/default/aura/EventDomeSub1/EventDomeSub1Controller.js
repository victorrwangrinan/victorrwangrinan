({
  sendEvent:function(c, e, h){
    var evt = c.getEvent('eventDome');
    evt.setParams({'eventMsg':'我是EventDomeSub1 发送的事件'});
    evt.fire();
  },

  handlerEventDomeAppEvt:function(c, e, h){
    var evtMsg = e.getParam('eventMsg');
    c.set('v.evtAppMsg', evtMsg);
  },

  sendAppEvent:function(c, e, h){
    //var evt = c.getEvent('eventAppDome');
    var evt = $A.get("e.c:EventDomeCmpAppEvt");
    evt.setParams({'eventMsg':'发送的App类型事件:'+Math.random()});
    evt.fire();
  },
  loadJqueryBefore:function(c, e, h){
      console.log('-----sub1开始加载jquery--------');
    },
    loadJqueryAfter:function(c, e, h){
        console.log('-----sub2加载jquery完--------');
      }
})