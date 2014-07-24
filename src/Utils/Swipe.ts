module FlipPlus {

    // Class
    export class PagesSwipe {

        public cancelClick = false;
        private pagesContainer: createjs.Container;
        private pages: createjs.DisplayObject[];
        private currentPageIndex: number = 0;
        private pagewidth: number;
        constructor(pagesContainer: createjs.Container, pages: Array<createjs.DisplayObject>, pageWidth: number, minY?: number, maxY?: number) {

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
            pagesContainer.addEventListener("mousedown", (e: createjs.MouseEvent) => {

                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY)
                if ((!minY && !maxY) || (pos.y > minY && pos.y < maxY)) {
                    initialclick = pos.x;
                    xpos = pos.x - pagesContainer.x;
                    moving = true;
                }
            })

            //drag the container
            pagesContainer.addEventListener("pressmove", (e: createjs.MouseEvent) => {
                if (moving) {
                    var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);
                    
                    pagesContainer.x = pos.x - xpos;
                    if (Math.abs(pos.x - initialclick) > 50) this.cancelClick = true;


                    //hide all pages
                    for (var i in this.pages) this.pages[i].visible = false;
                    
                    //show only visible pages
                    this.pages[this.currentPageIndex].visible = true;

                    if (pos.x - initialclick < 0) {
                    if (this.pages[this.currentPageIndex + 1])
                        this.pages[this.currentPageIndex + 1].visible = true;
                    }
                    else{
                    if (this.pages[this.currentPageIndex - 1])
                        this.pages[this.currentPageIndex - 1].visible = true;
                    }
                    
                }
            })

            //verifies the relase point to tween to the next page
            pagesContainer.addEventListener("pressup", (e: createjs.MouseEvent) => {
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
        
        public gotoPage(pageId: number, tween: boolean= true) {
            if (pageId < 0) pageId = 0;
            if (pageId == this.pages.length) pageId = this.pages.length - 1;

            var oldpage = this.currentPageIndex;
            this.currentPageIndex = pageId;

          

            if (tween) {
                createjs.Tween.removeTweens(this.pagesContainer);
                createjs.Tween.get(this.pagesContainer).to({ x: -this.pagewidth * pageId }, 250, createjs.Ease.quadOut).call(() => {
                    //hide all pages
                    for (var i in this.pages) this.pages[i].visible = false;
                    //show current page
                    this.pages[pageId].visible = true;
                });

                
                //if (this.pages[oldpage])
                  //  this.pages[oldpage].visible = true;
            }
            else {

                //hide all pages
                for (var i in this.pages) this.pages[i].visible = false;
                //show current page
                this.pages[pageId].visible = true;

                this.pagesContainer.x = -this.pagewidth * pageId;
            }


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