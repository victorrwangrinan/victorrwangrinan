/*
 * @Description:
 * @Author: Do not edit
 * @Date: 2019-08-20 10:15:55
 * @LastEditors: Victor
 * @LastEditTime: 2019-08-20 17:01:56
 */
import { LightningElement, track, api } from 'lwc';

export default class CoeListPageFooter extends LightningElement {
    @track pageCounter = [];
    @track curPage = 1;
    @api
    set pageNumber(value) {
        this.curPage = value;
        this.setPage();
    }
    get pageNumber() {
        return 1;
    }
    @track pageCount = 14;
    @api pageSize = 10;
    @track dataSize;
	@track defaultCount = 5;
	@track maxShowCount = 7;
    // @api
    // set allDataSize(value) {
    //     this.dataSize = value;
    //     this.setPage();
    // }
    // get allDataSize() {
    //     return 14;
    // }

    connectedCallback() {
        this.setPage();
    }

	// show page button
    setPage() {
		this.pageCounter = [];
		if(this.pageCount<=this.maxShowCount){//show all page number
			for(let i = 1 ; i<= this.pageCount ; i++){
				let sty = i===this.curPage ? 'brand' : 'Neutral';
				this.pageCounter.push({'num': i,'btn':sty});
			}
		}else if(this.curPage<this.defaultCount){//
			for(let i = 1 ; i<= this.defaultCount ; i++){
				let sty = i===this.curPage ? 'brand' : 'Neutral';
				this.pageCounter.push({'num': i,'btn':sty});
			}
		}else if(this.curPage>=this.defaultCount){//
			if((this.curPage+3)>=this.pageCount){
				for(let i = this.pageCount-4 ; i<=this.pageCount ; i++){
					let sty = i===this.curPage ? 'brand' : 'Neutral';
					this.pageCounter.push({'num': i,'btn': sty});
				}
			}else{
				for(let i = this.curPage-2 ; i<= this.curPage+2 && i<=this.pageCount ; i++){
					let sty = i===this.curPage ? 'brand' : 'Neutral';
					this.pageCounter.push({'num': i,'btn': sty});
				}
			}
		}


    }

	// jump to the page selected
    openThePage(event) {
        let selectedPage = parseInt(event.target.label, 10);
        if (selectedPage !== this.curPage) {
            this.curPage = selectedPage;
            this.dispatchEvent(
                new CustomEvent('changepage', {
                    detail: { curPage: selectedPage, pageSize: this.pageSize }
                })
            );
            this.setPage();
        }
    }

    //next
    openNextPage() {
        if (this.curPage < this.pageCount) {
            this.curPage = parseInt(this.curPage, 10) + 1;
            this.dispatchEvent(
                new CustomEvent('changepage', {
                    detail: { curPage: this.curPage, pageSize: this.pageSize }
                })
            );
            this.setPage();
        }
    }

    //previous
    openPreviousPage() {
        if (this.curPage > 1) {
            this.curPage = parseInt(this.curPage, 10) - 1;
            this.dispatchEvent(
                new CustomEvent('changepage', {
                    detail: { curPage: this.curPage, pageSize: this.pageSize }
                })
            );
            this.setPage();
        }
	}

	//last page
	openLast(){
		this.curPage = this.pageCount;
		this.dispatchEvent(
			new CustomEvent('changepage', {
				detail: { curPage: this.curPage, pageSize: this.pageSize }
			})
		);
		this.setPage();
	}

	//first page
	openFirst(){
		this.curPage = 1;
		this.dispatchEvent(
			new CustomEvent('changepage', {
				detail: { curPage: 1, pageSize: this.pageSize }
			})
		);
		this.setPage();
	}

	// change page size
	changePageSize(){
		let selectedSize = this.template.querySelector('.select-page-size').value;
		this.pageSize = selectedSize;
		this.curPage = 1;
		this.dispatchEvent(
			new CustomEvent('changepage', {
				detail: { curPage: this.curPage, pageSize: this.pageSize }
			})
		);
		this.setPage();
	}

	// if there are a lot of button, show '...'
    get isShowFrontMore() {
        return this.pageCount>this.maxShowCount && this.pageCounter[0].num > 2 ? true : false;
    }

	// if there are a lot of button, show '...'
    get isShowbehindMore() {
        let len = this.pageCounter.length;
        return this.pageCount>this.maxShowCount && this.pageCounter[len-1].num !== this.pageCount ? true : false;
    }

	// get start record number
    get start() {
        return (this.curPage - 1) * this.pageSize + 1;
    }

	//get end record number
    get end() {
        return this.curPage * this.pageSize;
	}

	// disable previous button
	get previousBtn(){
		return this.curPage === 1 ? true : false;
	}

	// disabled next button
	get nextBtn(){
		return this.curPage === this.pageCount ? true : false;
	}
}