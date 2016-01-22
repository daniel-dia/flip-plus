declare var lib: any;

module FlipPlus.Menu {
    export class Intro extends PIXI.Container {
        private introMc: createjs.MovieClip;
        private popup: View.PopupBot;

        constructor() {
            super();

            this.popup = new Menu.View.PopupBot();

            this.introMc = new lib.Intro();
            var temp: any = this.introMc;
            this.addChild(<PIXI.DisplayObject>temp);  

            this.introMc.stop();

            this.introMc.addEventListener("d1", () => { ; });
            this.introMc.addEventListener("readyToPlay", () => { this.emit("readyToPlay");});
            this.introMc.addEventListener("d2", () => { });
            this.introMc.addEventListener("end", () => { FlipPlusGame.showProjectLevelsMenu(); this.emit("end"); });
            this.popup.addEventListener("onclose", () => { this.introMc.play() });

            this.addChild(this.popup); 
          
        }

        public playIntroPart1() {
            this.introMc.gotoAndPlay("part1");
            this.popup.visible = false;
        }   

        public playIntroPart2() {
            this.introMc.gotoAndPlay("part2");
            this.popup.visible = false;
        }
    }
}