/*
 * @Descripttion:
 * @version:
 * @Author: Victor Wang
 * @Date: 2021-05-25 17:29:36
 * @LastEditors: Victor Wang
 * @LastEditTime: 2021-10-14 18:20:06
 */
import { LightningElement,wire,api,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Expense__c';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import FileSave from '@salesforce/resourceUrl/FileSave';
import getAccount from '@salesforce/apex/Helloworld.getAccount';

export default class TestBlank extends LightningElement {

    @track d3Initialized;

    @track htmlStr='<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta charset="utf-8">'+
    '<meta name="DC.description" content="Document HTML example to convert in DOCX">'+
    '<meta name="author" content="Amal Amrani, amal.amrani@gmail.com">	'+
    '</head>'+
    '<body>'+
    '<h1>Convert HTML to DOCX </h1>'+
    '</body>'+
    '</html>';

    // @wire(getObjectInfo, {objectApiName: CASE_OBJECT})
    // objectInfo({data,error}){
    // 	if(data){
    // 		console.log('===>'+JSON.stringify(data));
    // 	}
    // }

    connectedCallback(){
        console.log('----cccc');
        getAccount({accId:'0017F00002pFL9kQAG'})
        .then(res=>{
            console.log('-----aaa',res);
            if(res.Contacts){
                console.log('-----bbbb');
            }

        })
    }

    download(){
        let converted = new Blob([this.htmlStr], {
            type: "application/octet-stream"
        });

        window.saveAs(converted, 'test.doc');
    }

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        loadScript(this, FileSave).then(() => {
            //this is the name of the function that’s present
            //in the uploaded static resource.
            console.log('success');
        });

    }

    mapMarkers = [
        {
            location: {
                Street: '1 Market St',
                City: 'San Francisco',
                Country: 'USA',
            },
            title: 'The Landmark Building',
            description:
                'Historic <b>11-story</b> building completed in <i>1916</i>',
        },
    ];
}