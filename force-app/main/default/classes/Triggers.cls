/**
* 触发器框架
*/

public class Triggers {

    // 触发点
    public enum Evt {
        afterdelete, afterinsert, afterundelete,
        afterupdate, beforedelete, beforeinsert, beforeupdate
    }

    // 处理器
    public interface Handler {
        void handle();
    }

    // Internal mapping of handlers 集中处理
    Map<String, List<Handler>> eventHandlerMapping = new Map<String, List<Handler>>();


    // 注册处理器 Core API to bind handlers with events
    public Triggers bind(Evt event, Handler eh) {
        List<Handler> handlers = eventHandlerMapping.get(event.name());
        if (handlers == null) {
            handlers = new List<Handler>();
            eventHandlerMapping.put(event.name(), handlers);
        }
        handlers.add(eh);
        return this;
    }

    // 执行
    public void manage() {
        Evt ev = null;
        if(Trigger.isInsert && Trigger.isBefore){
            ev = Evt.beforeinsert;
        } else if(Trigger.isInsert && Trigger.isAfter){
            ev = Evt.afterinsert;
        } else if(Trigger.isUpdate && Trigger.isBefore){
            ev = Evt.beforeupdate;
        } else if(Trigger.isUpdate && Trigger.isAfter){
            system.debug('updateAfter');
            ev = Evt.afterupdate;
        } else if(Trigger.isDelete && Trigger.isBefore){
            ev = Evt.beforedelete;
        } else if(Trigger.isDelete && Trigger.isAfter){
            ev = Evt.afterdelete;
        } else if(Trigger.isundelete){
            ev = Evt.afterundelete;
        }
        List<Handler> handlers = eventHandlerMapping.get(ev.name());
        if (handlers != null && !handlers.isEmpty()) {
            for (Handler h : handlers) {
                h.handle();
            }
        }
    }

}