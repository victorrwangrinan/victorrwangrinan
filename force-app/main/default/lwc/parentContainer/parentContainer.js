/*
 * @Description:
 * @Author: Victor
 * @Date: 2019-08-28 13:16:08
 * @LastEditors: Victor Wang
 * @LastEditTime: 2021-08-25 14:50:45
 */
import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { registerListener, unregisterAllListeners,  fireEvent } from 'c/pubsub';

export default class parentContainer extends LightningElement {

	@wire(CurrentPageReference) pageRef;
	@track obj = {};
	@track inputValue = 'init';
	@track accList = [];
	handleOnChange(event){
		console.log('****: '+event.currentTarget.value);
		console.log('----: '+this.inputValue);
		this.inputValue = 'test change';
		console.log('===: '+this.inputValue);
	}

	connectedCallback() {
		this.obj = {'data':[{'name':'wwwa'}]}
	}

	handleAdd(){
		this.accList.push({'key':this.accList.length});
	}

	handleComplete(){
		fireEvent(this.pageRef,'savedata','');
	}

	handleSetData(event){
		console.log('====>'+JSON.stringify(event.detail));
		let index = event.detail.index;
		let value = event.detail.value;
		let fieldName = event.detail.name;
		this.accList[index][fieldName] = value;
		console.log('====>'+JSON.stringify(this.accList));
	}

	// disconnectedCallback(){
	// 	unregisterAllListeners(this);
	// }

	/**
	 * handle app event
	 */
	// handleappEvt(pa){
	// 	console.log('pa===>'+JSON.stringify(pa));
	// }

	/**
	 * handle component event
	 */
	// handleMsg(event) {
	// 	console.log(event.detail);
	// 	let msg = event.detail;
	// 	this.showNotification('', msg, 'success');
	// }

	/**
	 * show toast
	 */
	// showNotification(title, message, variant) {
	// 	const evt = new ShowToastEvent({
	// 		title: title,
	// 		message: message,
	// 		variant: variant
	// 	});
	// 	this.dispatchEvent(evt);
	// }
}