declare function exitApp():void;

module Gbase {
    export class ScreenState {

        public content: createjs.Container;
        public header :createjs.Container;
        public footer: createjs.Container;
        public background: createjs.Container;

        public view: createjs.Container;

        public bgmusic:   createjs.SoundInstance;

        constructor() {
            this.view = new createjs.Container();
            this.content = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();
            this.background = new createjs.Container();

            this.view.addChild(this.background);
            this.view.addChild(this.content);
            this.view.addChild(this.header);
            this.view.addChild(this.footer );
        }

        public activate(parameters?:any) {
            this.content.visible = true;
        }

        public desactivate(parameters?: any) {
            this.content.visible = false;
        }

        public redim(headerY: number, footerY: number,width:number) {
            this.footer.y = footerY;
            this.header.y = headerY;
             
            var dh = footerY + headerY;
            var ch = footerY - headerY;
            var scale = ch / dh;

            if (scale < 1) {
                scale = 1;
                this.background.y = 0;
                this.background.x = 0;
            } else {
                this.background.y = headerY;
                this.background.x = -(width*scale - width)/2;
            }

            this.background.scaleX = this.background.scaleY = scale;
        }

        public back(): void {
            exitApp();
        }
     
    }
}