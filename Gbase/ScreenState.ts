module Gbase {
    export class ScreenState {

        public view:    createjs.Container;
        public bgmusic:   createjs.SoundInstance;

        constructor() {
            this.view = new createjs.Container();
        }

        public activate(parameters?:any) {
            this.view.visible = true;
        }

        public desactivate(parameters?: any) {
            this.view.visible = false;
        }

        public back():void {  }
     
    }
}