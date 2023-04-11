import { LightningElement, track, api, wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { CurrentPageReference } from 'lightning/navigation';

export default class quickActionTest extends LightningElement {

	@api recordId;
    @api objectApiName;

    @wire(CurrentPageReference)
    pageRef;

    get pageRefString() {
        return JSON.stringify(this.pageRef);
    }

	handCancle(){
		console.log("-----------");
		this.dispatchEvent(new CloseActionScreenEvent());
	}

    connectedCallback(){
        console.log('recordId:'+this.recordId);
    }

    renderedCallback(){
        console.log('recordId---:'+this.recordId);
    }

}