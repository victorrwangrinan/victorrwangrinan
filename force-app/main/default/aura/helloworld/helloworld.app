<aura:application extends="force:slds" controller="Helloworld">
    
    <aura:attribute name="account" type="Account"/>
    
    <aura:handler event="c:AccountCmpEvt" name="acountChangeEvt" action="{!c.handleOnChange}" />
    
    <c:helloword/>
    <lightning:card title="Find an Account" class="slds-m-top_10px" iconName="standard:custom">
        <c:MyAccountComponent/>
    </lightning:card>
    <c:ShowAccount aura:id="childCmp"/>
</aura:application>