import { LightningElement, track, wire,api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

const testSteps = [
    { label: 'step1', value: 'step1' },
    { label: 'step2', value: 'step2' },
    { label: 'step3', value: 'step3' },
    { label: 'step4', value: 'step4' },
    { label: 'step5', value: 'step5' }
];
export default class testProgressIndicator extends LightningElement {
    @track stepsForProgress = testSteps;
    @track currentStep = 'step1';
    @track disablePrevious = true;
    @track disableEnd = false;

    @api name;

    @wire(CurrentPageReference)
    pageRef;

    connectedCallback(){
        console.log('===>'+JSON.stringify(this.pageRef.state));
        console.log('===>'+this.name);
    }

    openLink(){
        window.open('/lightning/n/vvvv?c__name=55555555');
    }

    renderedCallback() {
        if(this.currentStep === 'step1') {
            this.disablePrevious = true;
            this.disableEnd = false;
        } else if(this.currentStep === 'step5') {
            this.disablePrevious = false;
            this.disableEnd = true;
        } else {
            this.disablePrevious = false;
            this.disableEnd = false;
        }
    }

    handlePreviousStepAction() {
        let step = this.currentStep;
        this.currentStep = '';

        if(step === 'step2') {
            this.currentStep = 'step1';
        } else if(step === 'step3') {
            this.currentStep = 'step2';
        } else if(step === 'step4') {
            this.currentStep = 'step3';
        } else if(step === 'step5') {
            this.currentStep = 'step4';
        }
    }

    handleNextStepAction() {
        let step = this.currentStep;
        if(step === 'step1') {
            this.currentStep = 'step2';
        } else if(step === 'step2') {
            this.currentStep = 'step3';
        } else if(step === 'step3') {
            this.currentStep = 'step4';
        } else if(step === 'step4') {
            this.currentStep = 'step5';
        }
    }
}