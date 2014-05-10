module InvertCross.GamePlay.Views {

    export class GamePlayMenu extends Gbase.UI.UIItem{

        private overlayMenu: Gbase.UI.UIItem;
        private pauseMenu: Gbase.UI.UIItem;

        private buttons: any;
        private parameters: any;

        private tutorial_highlightSprite: createjs.DisplayObject;

        constructor() {
            super();

            this.createGamePlayMenu();
            this.createPauseMenu();
            this.addTutorialIndicator();
         
        } 

        //adds tutorial touch indicator
        private addTutorialIndicator() {
            this.tutorial_highlightSprite = Assets.getSprite("touch")
            this.tutorial_highlightSprite.visible = false;
            this.tutorial_highlightSprite.mouseEnabled = false;
            this.addChild(this.tutorial_highlightSprite)
        }

        //creates all menu butons 
        private createGamePlayMenu() {
            this.overlayMenu = new Gbase.UI.UIItem();
            this.overlayMenu.width = 2*DefaultWidth;
            this.overlayMenu.height = 0;

            this.addButtons(["restart","hint","skip"])

            var pausBt = new Gbase.UI.IconButton("puzzle/iconepause", "", "puzzle/btrestartpause", () => { this.pause(); });
            this.overlayMenu.addChild(pausBt),
            pausBt.x = 1400; 

            this.addChild(this.overlayMenu);
        }

        // ================ Add Buttons ==========================================

        private addButtons(buttons: Array<string>) {
            this.buttons = new Object();
            this.parameters = new Object();
            var xstart = 200;
            var xstep = 400;

            for (var b in buttons) 
                var bt = this.createItemButton(buttons[b], xstart + xstep * b);
        }

        //creates a iitem button and its feedback pand parameters, and adds it to screensk
        private createItemButton(buttonId: string,pos:number) :createjs.DisplayObject {
            var button = new Gbase.UI.IconButton("puzzle/icon_" + buttonId, "", "puzzle/btpowerup", () => {
                var parameter = null;
                if (this.parameters) parameter = this.parameters[buttonId]
                this.dispatchEvent(buttonId, parameter);
                this.parameters[buttonId] = null;
            });
            this.overlayMenu.addChild(button);
            this.buttons[buttonId] = button;
            button.x = pos;
            return button;
        }

        // updates buttons labels 
        public updateButtonLabel(buttonId:string, value: number) {
            this.buttons[buttonId].text.text = value.toString();
        }

        // ============== pause menus ============================================

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

            var bt = Assets.getBitmap("puzzle/btplay2");
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

        //================== tutorial ============================================

        public tutorial_HighlightItem(itemId: string,parameter?:any) {

            this.tutorial_lockAllButtons();
            this.tutorial_unlockButton(itemId);

            //highlight the item
            this.tutorial_highlightSprite.visible = true;
            this.tutorial_highlightSprite.x = this.buttons[itemId].x;
           
            //define parameter for feedback
            this.parameters[itemId] = parameter;
        }

        //lock all other buttons
        public tutorial_lockAllButtons() {
            this.tutorial_highlightSprite.visible = false;
            for (var b in this.buttons)
                this.buttons[b].mouseEnabled = false;
        }

        //lock all other buttons
        public tutorial_unlockAllButtons() {
            this.tutorial_highlightSprite.visible = false;
            for (var b in this.buttons)
                this.buttons[b].mouseEnabled = true;
        }

        //unlock desired button
        public tutorial_unlockButton(itemId: string) {
            this.buttons[itemId].mouseEnabled = true;
        }

    }
}
