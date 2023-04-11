import { LightningElement, track, wire,api } from 'lwc';

export default class eventLwc extends LightningElement {
@api apiName;
@api listViewApiName;
}