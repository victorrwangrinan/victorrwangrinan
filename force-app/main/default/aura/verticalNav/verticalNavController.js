/*
 * @Descripttion: 
 * @version: 
 * @Author: Victor Wang
 * @Date: 2021-04-20 16:14:15
 * @LastEditors: Victor Wang
 * @LastEditTime: 2021-04-20 16:17:22
 */
({
    onClick : function(component, event, helper) {
        var id = event.target.dataset.menuItemId;
        if (id) {
            component.getSuper().navigate(id);
         }
   }
 })