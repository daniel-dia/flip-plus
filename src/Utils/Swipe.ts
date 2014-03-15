module InvertCross {

    // Class
    export class PagesSwipe {

        public cancelClick = false;
        private pages: createjs.DisplayObject[];
        private currentPageIndex: number = 0;

        constructor(pagesContainer: createjs.Container, pages: Array<createjs.DisplayObject>) {

            this.pages = pages;

            //configure pages
            for (var i in pages)
                pages[i].x = DefaultWidth * i;

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
                var p = (pos.x - xpos + DefaultWidth * this.currentPageIndex) / DefaultWidth;

                //choses if goes to the next or previous page.
                if (p < -0.25)
                    this.gotoNextPage(pagesContainer);
                else if (p > +0.25)
                    this.gotoPreviousPage(pagesContainer);
                else
                    this.stayOnPage(pagesContainer);

                //release click for user
                setTimeout(() => { this.cancelClick = false }, 100);
            })
        }

        //----------------------pages-----------------------------------------------//

        public stayOnPage(pagesContainer: createjs.Container) {
            this.gotoPage(pagesContainer, this.currentPageIndex);
        }

        public gotoPage(pagesContainer: createjs.Container, pageId: number) {
            createjs.Tween.get(pagesContainer).to({ x: -DefaultWidth * pageId }, 250, createjs.Ease.quadOut);
        }

        public gotoNextPage(pagesContainer: createjs.Container) {
            this.currentPageIndex++;
            if (this.currentPageIndex == this.pages.length) this.currentPageIndex = this.pages.length - 1;

            this.gotoPage(pagesContainer, this.currentPageIndex);
        }

        public gotoPreviousPage(pagesContainer: createjs.Container) {
            this.currentPageIndex--;
            if (this.currentPageIndex < 0) this.currentPageIndex = 0;
            this.gotoPage(pagesContainer, this.currentPageIndex);
        }

 
    }
}