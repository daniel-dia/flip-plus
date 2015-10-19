declare var lib;

module FlipPlus.Menu {
    export class TitleScreen extends gameui.ScreenState {

       private beach: PIXI.DisplayObject;

        constructor() {
            super();

            var logo = new lib.LogoScreen();
            this.content.addChild(logo);

            this.beach = logo["instance"]["instance_14"];


            this.content.interactive = true 

            var tap = () => {
                FlipPlusGame.showMainScreen();
                gameui.AudiosManager.playSound("button");
            };

            this.content.on("tap", tap );
            this.content.on("click", tap);
 
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