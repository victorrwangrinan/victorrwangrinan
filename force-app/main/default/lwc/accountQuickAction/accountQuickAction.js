import { LightningElement, track, wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getAccount from '@salesforce/apex/Helloworld.getAccount';

export default class accountQuickAction extends LightningElement {
	@api recordId;
	@api invoke() {
		console.log('recordId:'+this.recordId);
        let event = new ShowToastEvent({
            title: 'I am a headless action!',
            message: 'Hi there! Starting...',
        });
        this.dispatchEvent(event);
    }
}