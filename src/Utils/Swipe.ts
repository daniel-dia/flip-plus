module InvertCross {

    // Class
    export class PagesSwipe {

        public cancelClick = false;
        private pagesContainer: createjs.Container;
        private pages: createjs.DisplayObject[];
        private currentPageIndex: number = 0;
        private pagewidth: number;
        constructor(pagesContainer: createjs.Container, pages: Array<createjs.DisplayObject>, pageWidth:number) {

            this.pagewidth = pageWidth;
            this.pagesContainer = pagesContainer;
            this.pages = pages;

            //configure pages
            for (var i in pages)
                pages[i].x = this.pagewidth * i;

            //adds event
            var xpos;
            var initialclick;
            // records position on mouse down
            pagesContainer.addEventListener("mousedown", (e: createjs.MouseEvent) => {
                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY)
                initialclick = pos.x;
                xpos = pos.x - pagesContainer.x;
            })

            //drag the container
            pagesContainer.addEventListener("pressmove", (e: createjs.MouseEvent) => {
                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY)
                pagesContainer.x = pos.x - xpos;
                if (Math.abs(pos.x - initialclick) > 100) this.cancelClick = true;
            })

            //verifies the relase point to tween to the next page
            pagesContainer.addEventListener("pressup", (e: createjs.MouseEvent) => {
                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY)

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
            })
        }

        //----------------------pages-----------------------------------------------//
        
        public gotoPage(pageId: number, tween: boolean= true) {
            this.currentPageIndex = pageId;

            if (tween)
                createjs.Tween.get(this.pagesContainer).to({ x: -this.pagewidth * pageId }, 250, createjs.Ease.quadOut);
            else
                this.pagesContainer.x = -this.pagewidth * pageId;
        }

        public stayOnPage() {
            this.gotoPage(this.currentPageIndex);
        }

        public gotoNextPage() {
            this.currentPageIndex++;
            if (this.currentPageIndex == this.pages.length) this.currentPageIndex = this.pages.length - 1;

            this.gotoPage(this.currentPageIndex);
        }

        public gotoPreviousPage() {
            this.currentPageIndex--;
            if (this.currentPageIndex < 0) this.currentPageIndex = 0;
            this.gotoPage(this.currentPageIndex);
        }

 
    }
}