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
  
            this.introMc.addEventListener("onstop", (e: createjs.Event) => {

                switch (<string>e.target) {
                    case "d1":
                        this.popup.showBotText(stringResources.it_text1);
                        break;
    
                    case "readyToPlay":
                        this.dispatchEvent("readyToPlay");
                        break;

                    case "d2":
                        this.popup.showBotText(stringResources.it_text2);
                        break;

                    case "end":
                        FlipPlusGame.showProjectsMenu();
                        this.dispatchEvent("end");
                        break;
                }
            })

            this.popup.addEventListener("onclose", () => { this.introMc.play() });
            this.addChild(this.popup);
          
        }

        public playPart1() {
            this.introMc.gotoAndPlay("part1");
            this.popup.visible = false;
            var m = <createjs.Shape>this.introMc.children[0];
            m.visible = false;
            (<createjs.DisplayObject>this.introMc["Bot01"]).mask = m;

        }   

        public playPart2() {
            this.introMc.gotoAndPlay("part2");
            this.popup.visible = false;
        }
    }
}