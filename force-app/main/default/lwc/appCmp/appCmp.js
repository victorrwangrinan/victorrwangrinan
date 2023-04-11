/*
 * @Description:
 * @Author: Victor
 * @Date: 2019-08-29 16:57:11
 * @LastEditors: Victor
 * @LastEditTime: 2019-09-25 19:52:04
 */
import { LightningElement,track,wire,api } from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';

export default class AppCmp extends LightningElement {

	@api publicProperty;

	@track param;
}