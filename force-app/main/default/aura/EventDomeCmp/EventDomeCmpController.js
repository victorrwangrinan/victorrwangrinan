/**
 * Created by Spring on 28/11/2017.
 */
({
  handlerEventDomeCmpEvt:function(c, e, h){
    var evtMsg = e.getParam('eventMsg');
    c.set('v.evtMsg', evtMsg);
  },

  setSubAttr:function(c, e, h){
    
    var info = '来自父组件的随机数:'+Math.random();
    c.set('v.info', info);
  },

  /*sendAppEvent:function(c, e, h){
    var evt = c.getEvent('eventAppDome');
    evt.setParams({'eventMsg':'我是父组件发送的App类型事件:'+Math.random()});
    evt.fire();
  },*/

  handlerEventDomeAppEvt:function(c, e, h){
    var evtMsg = e.getParam('eventMsg');
    c.set('v.evtAppMsg', evtMsg);
  },

  sendAppEvent:function(c, e, h){
    //app类型事件只能通过$A.get()形式获取,和cmp事件不一样
    var evt = $A.get("e.c:EventDomeCmpAppEvt");
    evt.setParams({'eventMsg':'发送的App类型事件:'+Math.random()});
    evt.fire();
  },

  loadJqueryBefore:function(c, e, h){
    console.log('-----开始加载jquery--------');
  },
  loadJqueryAfter:function(c, e, h){
      console.log('-----加载jquery完--------');
    }
})