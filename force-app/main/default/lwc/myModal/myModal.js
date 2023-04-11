import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyModal extends LightningModal {
    @api content;

    handleOkay() {
    	this.disableClose = false;
        this.close('okay');
    }
}