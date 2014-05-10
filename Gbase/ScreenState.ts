declare function exitApp():void;

module Gbase {
    export class ScreenState {

        public content: createjs.Container;
        public header :createjs.Container;
        public footer : createjs.Container;

        public view: createjs.Container;

        public bgmusic:   createjs.SoundInstance;

        constructor() {
            this.view = new createjs.Container();
            this.content = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();

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

        public back(): void {
            exitApp();
        }
     
    }
}