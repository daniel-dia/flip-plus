/// <reference path="../../../lib/easeljs.d.ts" /> 
/// <reference path="../../../Gbase/UI/Button.ts" /> 

//An attempt was made to use an object that is not, or is no longer, usable. 
module InvertCross.GamePlay.Views {


    export class GamePlayMenu extends Gbase.UI.UIItem{

        private overlayMenu: Gbase.UI.UIItem;
        private pauseMenu: Gbase.UI.UIItem;

        private hitnBt: Gbase.UI.IconButton;
        private skipBt: Gbase.UI.IconButton;

        constructor() {
            super();
            
            this.createGamePlayMenu();
            this.createPauseMenu();
        } 

        private createGamePlayMenu() {
            this.overlayMenu = new Gbase.UI.UIItem();
            this.overlayMenu.width = 2*DefaultWidth;
            this.overlayMenu.height = 0;

            var restBt = new Gbase.UI.IconButton("puzzle/iconerestart", "", "puzzle/btrestartpause", () => { this.dispatchEvent("restart"); }); this.overlayMenu.addChild(restBt), restBt.x = 200;
            this.hitnBt = new Gbase.UI.IconButton("puzzle/iconehint", "0", "puzzle/btpowerup", () => { this.dispatchEvent("hint"); }); this.overlayMenu.addChild(this.hitnBt), this.hitnBt.x = 600;
            this.skipBt = new Gbase.UI.IconButton("puzzle/iconeskip", "0", "puzzle/btpowerup", () => { this.dispatchEvent("skip"); }); this.overlayMenu.addChild(this.skipBt), this.skipBt.x = 1000;
            var pausBt = new Gbase.UI.IconButton("puzzle/iconepause", "", "puzzle/btrestartpause", () => { this.pause(); }); this.overlayMenu.addChild(pausBt), pausBt.x = 1400; 

            this.addChild(this.overlayMenu);
        }

        public updateHint(value: number) {
            this.hitnBt.text.text = value.toString();
        }

        public updateSkip(value: number) {
            this.skipBt.text.text = value.toString();
        }

        private createPauseMenu() {
            var pauseMenu = new Gbase.UI.UIItem();

            var playBt = new Gbase.UI.IconButton("puzzle/iconeplay", "", "puzzle/btplay1", () => { this.unpause(); }); playBt.x = 600;
            var snd1Bt = new Gbase.UI.ImageButton("puzzle/btsom1", () => { this.dispatchEvent("soundOn"); });  snd1Bt.x = 160;
            var snd2Bt = new Gbase.UI.ImageButton("puzzle/btsom2", () => { this.dispatchEvent("soundOff"); }); snd2Bt.x = 160;
            var backBt = new Gbase.UI.ImageButton("puzzle/btsair", () => { this.dispatchEvent("back"); });     backBt.x = 400;
            
            pauseMenu.addChild(playBt)
            pauseMenu.addChild(snd1Bt)
            pauseMenu.addChild(snd2Bt)
            pauseMenu.addChild(backBt)

            var bt = Assets.getImage("puzzle/btplay2");
            bt.regY = 87;
            bt.regX = 102;
            bt.x = 0;
            var c = new createjs.Container();
            c.addChild(bt);
            pauseMenu.addChild(c);
            
            this.addChild(pauseMenu);
            pauseMenu.x = 800;
            pauseMenu.visible = false;
            this.pauseMenu = pauseMenu;
            this.pauseMenu.width = DefaultWidth;
            this.pauseMenu.height = 0;

        }

        private pause() {
            this.dispatchEvent("pause");
            this.overlayMenu.fadeOut();
            this.pauseMenu.fadeIn();
        }

        private unpause() {
            this.dispatchEvent("unpause");
            this.overlayMenu.fadeIn();
            this.pauseMenu.fadeOut();
        }

    }
}
