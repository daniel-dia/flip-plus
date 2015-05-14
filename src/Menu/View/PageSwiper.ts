module FlipPlus.Menu.View {

    // Class
    export class PagesSwiper {

        public cancelClick = false;
        private pagesContainer: createjs.Container;
        private pages: Page[];
        private currentPageIndex: number = 0;
        private pagewidth: number;
        public onPageChange: (pageId: number) => void;

        constructor(pagesContainer: createjs.Container, pages: Array<Page>, pageWidth: number, minY?: number, maxY?: number) {

            this.pagewidth = pageWidth;
            this.pagesContainer = pagesContainer;
            this.pages = pages;

            //configure pages
            for (var i in pages)
                pages[i].x = this.pagewidth * i;

            //adds event
            var xpos;
            var initialclick;
            var moving: boolean = false;

            // records position on mouse down
            pagesContainer.addEventListener("mousedown",(e: createjs.MouseEvent) => {

                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY)
                if ((!minY && !maxY) || (pos.y > minY && pos.y < maxY)) {
                    initialclick = pos.x;
                    xpos = pos.x - pagesContainer.x;
                    moving = true;
                }
            })

            //drag the container
            pagesContainer.addEventListener("pressmove",(e: createjs.MouseEvent) => {
                if (moving) {
                    var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);

                    pagesContainer.x = pos.x - xpos;
                    if (Math.abs(pos.x - initialclick) > 50) this.cancelClick = true;
					
                    //hide all pages
					this.showOlnyPage(this.currentPageIndex, 1);
				}
            })

            //verifies the relase point to tween to the next page
            pagesContainer.addEventListener("pressup",(e: createjs.MouseEvent) => {
                if (moving) {
                    moving = false;
                    var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);

                    //calculate the drag percentage.
                    var p = (pos.x - xpos + this.pagewidth * this.currentPageIndex) / this.pagewidth;

                    //choses if goes to the next or previous page.
                    if (p < -0.25)
                        this.gotoNextPage();
                    else if (p > +0.25)
                        this.gotoPreviousPage();
                    else
                        this.stayOnPage();

                    //release click for user
                    setTimeout(() => { this.cancelClick = false }, 100);
                }
            })
        }

        //----------------------pages-----------------------------------------------//
        
        public gotoPage(pageId: number, tween: boolean = true) {
            if (pageId < 0) pageId = 0;
            if (pageId == this.pages.length) pageId = this.pages.length - 1;

            if (this.onPageChange) this.onPageChange(pageId);

            var oldpage = this.currentPageIndex;
            this.currentPageIndex = pageId;

            if (tween) {
                this.pages[pageId].visible = true;
                createjs.Tween.removeTweens(this.pagesContainer);
                createjs.Tween.get(this.pagesContainer).to({ x: -this.pagewidth * pageId }, 250, createjs.Ease.quadOut).call(() => {
					this.showOlnyPage(pageId);
                });
            }
            else {

				//move current page
				this.pagesContainer.x = -this.pagewidth * pageId;
				this.showOlnyPage(pageId);
				
			}
		}

		private showOlnyPage(id: number,margin:number=0) {
			//hide all other pages
			for (var i in this.pages)
				if (i == id || i == id - margin || i == id + margin)
					this.showPage(i)
				else
					this.hidePage(i);
		}

		private showPage(id: number) {
			this.pages[id].showPage();
		}

		private hidePage(id: number) {
			this.pages[id].hidePage();
		}

        public stayOnPage() {
            this.gotoPage(this.currentPageIndex);
        }

        public gotoNextPage() {
            this.gotoPage(1+this.currentPageIndex);
        }

        public gotoPreviousPage() {
            this.gotoPage(this.currentPageIndex-1);
        }


    }
}