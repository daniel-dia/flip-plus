/// <reference path="../lib/easeljs.d.ts" />
/// <reference path="../lib/soundjs.d.ts" />



module Gbase {
    export class ScreenState {

        public view:    createjs.Container;
        public bgmusic:   createjs.SoundInstance;

        constructor() {
            //this.defaultHeight = DefaultHeight;
            //this.defaultWidth = DefaultWidth;

            this.view = new createjs.Container();

        }

        public activate(parameters?:any) {
            this.view.visible = true;
        }

        public desactivate(parameters?: any) {
            this.view.visible = false;
        }

     
    }
}