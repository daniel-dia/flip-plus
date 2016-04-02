﻿declare var lib_logo;

module FlipPlus.Menu {
    export class TitleScreen extends gameui.ScreenState {

      

        constructor() {
            super();

            this.addBeach();

            this.content.interactive = true 

            var tap = () => {
                FlipPlusGame.showMainScreen();
                gameui.AudiosManager.playSound("button");
            };

            this.content.on("tap", tap );
            this.content.on("click", tap);
 
       }

        private beach: PIXI.DisplayObject;

        private addBeach() {
            var logo = new lib_logo.LogoScreen();
            this.content.addChild(logo);
            this.beach = logo["instance"]["instance_14"];
        }

        public redim(headerY: number, footerY: number, width: number, height:number) {
            super.redim(headerY, footerY, width, height);
            if(this.beach)
            this.beach.y = -headerY / 4 - 616 + 77 / 4 + 9;
        }
        activate(parameters: any) {
            super.activate(parameters);
            // play music
            gameui.AudiosManager.playMusic("Music Dot Robot");
        }
    }
}