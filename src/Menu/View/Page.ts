module FlipPlus.Menu.View {

    // Class
    export class Page extends PIXI.Container {

        private pageVisibility: boolean = false;
        public onShowPage: () => void;
        public onHidePage: () => void;

        public showPage() {

            if (this.pageVisibility == false) {
                this.pageVisibility = this.visible = true;
                if (this.onShowPage) this.onShowPage();
            }
        }

        public hidePage() {
            this.pageVisibility = this.visible = false;
            if (this.pageVisibility == true) if (this.onHidePage) this.onHidePage();
            
        }

    }
}