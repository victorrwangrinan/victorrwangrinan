/*
 * @Description:
 * @Author: Victor
 * @Date: 2019-08-28 13:20:39
 * @LastEditors: Victor Wang
 * @LastEditTime: 2021-08-25 14:53:20
 */
import { LightningElement,track, api, wire } from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { registerListener, unregisterAllListeners} from 'c/pubsub';

export default class ChildCmp extends LightningElement {

	@wire(CurrentPageReference) pageRef

	@track obj = {'data':[]} ;
	@api acc

	/**
	 * @param {{ 'data': any[]; }} value
	 */
	@api
	get record(){
		return this.obj;
	}
	set record(value){
		console.log('--123:'+JSON.stringify(value));
		this.obj = value;
		// value.data.forEach(elem=>{
		// 	this.obj.data.push(elem);
		// })
		this.setAttribute('record', this.obj);
	}

	connectedCallback(){
		//registerListener('savedata',this.handleSaveData,this);
	}

	handleChange(event){
		console.log('--change:'+event.currentTarget.value);
		let changedvalue = event.currentTarget.value;
		this.dispatchEvent(new CustomEvent('datachange',{detail: {index:this.acc.key,value:changedvalue,name:'Name'}}));
	}


	add(){
		console.log('=============');
		this.obj.data.push({'name':'test1'});
		console.log(JSON.stringify(this.obj.data));
    }
}