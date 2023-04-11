import { LightningElement } from 'lwc';
import MyModal from 'c/myModal';
import LightningPrompt from 'lightning/prompt';

export default class MyApp extends LightningElement {
    handleClick() {
         MyModal.open({
            size: 'large',
            disableClose:true,
            description: 'Accessible description of modal\'s purpose',
            content: 'Passed into content api',
        }).then(res=>{
        	console.log('-------'+res);
        })
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'

    }

    handlePromptClick() {
        LightningPrompt.open({
            //theme defaults to "default"
            label: 'Please Respond', // this is the header text
            defaultValue: 'initial input value', //this is optional
            theme:'error'
        }).then((result) => {
            //Prompt has been closed
            //result is input text if OK clicked
            //and null if cancel was clicked
        });
    }


}