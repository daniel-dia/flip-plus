declare var lib: any;

module FlipPlus.Menu {
    export class Intro extends createjs.Container {
        private introMc: createjs.MovieClip;
        private popup: View.PopupBot;

        constructor() {
            super();

            this.popup = new Menu.View.PopupBot();

            this.introMc = new lib.Intro();
            this.addChild(this.introMc);
            this.introMc.stop();

            this.introMc.addEventListener("d1", () => { ; });
            this.introMc.addEventListener("readyToPlay", () => { this.dispatchEvent("readyToPlay");});
            this.introMc.addEventListener("d2", () => {  });
            this.introMc.addEventListener("end", () => {  FlipPlusGame.showProjectsMenu(); this.dispatchEvent("end"); });
            this.popup.addEventListener("onclose", () => { this.introMc.play() });

            this.addChild(this.popup);
          
        }

        public playIntroPart1() {
            this.introMc.gotoAndPlay("part1");
            this.popup.visible = false;
            var m = <createjs.Shape>this.introMc.children[0];
            m.visible = false;
            (<createjs.DisplayObject>this.introMc["Bot01"]).mask = m;

        }   

        public playIntroPart2() {
            this.introMc.gotoAndPlay("part2");
            this.popup.visible = false;
        }
    }
}