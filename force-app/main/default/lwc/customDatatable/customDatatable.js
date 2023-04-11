import { LightningElement, track, wire,api } from 'lwc';



export default class customDatatable extends LightningElement {

	@api tabledata;
	@api columns;

	connectedCallback(){
		console.log('==>'+JSON.stringify(this.tabledata));
		console.log('==>'+JSON.stringify(this.columns));
	}
}