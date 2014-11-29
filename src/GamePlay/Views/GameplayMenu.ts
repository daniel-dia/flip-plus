module FlipPlus.GamePlay.Views {

    export class GamePlayMenu extends gameui.ui.UIItem{

        private overlayMenu: gameui.ui.UIItem;
        private pauseMenu: gameui.ui.UIItem;

        private buttons: any;
        private parameters: any;

        private items: Array<string>;

        private tutorial_highlightSprite: createjs.DisplayObject;

        private currentItem:number;
        private xstart = 150;
        private xstep = 310;

        constructor() {

            super();

            this.currentItem = 0;
            this.items = [];

            this.createGamePlayMenu();
            this.createPauseMenu();
            this.addTutorialIndicator();

            this.buttons = new Object();
            this.parameters = new Object();

        } 

        //adds tutorial touch indicator
        private addTutorialIndicator() {
            this.tutorial_highlightSprite = gameui.AssetsManager.getSprite("touch")
            this.tutorial_highlightSprite.visible = false;
            this.tutorial_highlightSprite.mouseEnabled = false;
            this.addChild(this.tutorial_highlightSprite)
        }


 
        //creates all menu butons
        private createGamePlayMenu() {
            this.overlayMenu = new gameui.ui.UIItem();
            this.overlayMenu.width = 2*DefaultWidth;
            this.overlayMenu.height = 0;

            var pausBt = new gameui.ui.IconButton("puzzle/iconepause", "","","", "puzzle/btpowerup", () => { this.pause(); });
            this.overlayMenu.addChild(pausBt),
            pausBt.x = 1390; 

            this.addChild(this.overlayMenu);
        }

  

        // ================ Add Buttons ==========================================

        public addButtons(buttons: Array<string>) {
            for (var b in buttons) {
                var bt = this.createItemButton(buttons[b], this.xstart + this.xstep * this.currentItem);
                this.currentItem++;
            }
        }

        //creates a iitem button and its feedback pand parameters, and adds it to screensk
        private createItemButton(buttonId: string, pos: number): createjs.DisplayObject {
            this.items.push(buttonId);

            var button = new gameui.ui.IconButton("puzzle/icon_" + buttonId, "",  defaultFontFamilyNormal,"white", "puzzle/btpowerup", () => {
                var parameter = null;
                if (this.parameters) parameter = this.parameters[buttonId]
                this.dispatchEvent(buttonId, parameter);
                this.parameters[buttonId] = null;

            
            });

            var coinIndicator = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            button.addChild(coinIndicator);
            coinIndicator.scaleX = coinIndicator.scaleY = 0.7;
            coinIndicator.x = 100;

            this.overlayMenu.addChild(button);
            this.buttons[buttonId] = button;
            button.x = pos;
            button.icon.x = -130;
            return button;
        }

        //// updates buttons labels 
        //public updateItemsQuatity() {
        //    for (var i in this.items)
        //        this.buttons[this.items[i]].updateLabel(FlipPlusGame.itemsData.getItemQuantity(this.items[i]));
        //}

        public updateItemsPrice(prices:Array<number>) {
            for (var item in prices) {
                if(this.buttons[item])
                    this.buttons[item].updateLabel(prices[item]);
            }
        }

        public getButtonPosition(item:string):number {
            return this.buttons[item].x; 
        }
                                
        // ============== pause menus ============================================

        private createPauseMenu() {
            var pauseMenu = new gameui.ui.UIItem();

            var playBt = new gameui.ui.IconButton("puzzle/iconeplay", "", "", "", "puzzle/btplay1", () => { this.unpause(); }, "buttonOut"); playBt.x = 600;
            var snd1Bt = new gameui.ui.ImageButton("puzzle/btsom1", () => { this.dispatchEvent("soundOn"); },"buttonOut");  snd1Bt.x = 160;
            var snd2Bt = new gameui.ui.ImageButton("puzzle/btsom2", () => { this.dispatchEvent("soundOff"); },"buttonOut"); snd2Bt.x = 160;
            var backBt = new gameui.ui.ImageButton("puzzle/btsair", () => { this.dispatchEvent("back"); }, "buttonOut"); backBt.x = 400;
            var restBt = new gameui.ui.ImageButton("puzzle/btrest", () => { this.dispatchEvent("restart"); },"buttonOut"); restBt.x = -80;
            
            pauseMenu.addChild(playBt)
            pauseMenu.addChild(snd1Bt)
            pauseMenu.addChild(snd2Bt)
            pauseMenu.addChild(backBt)
            pauseMenu.addChild(restBt)

            var c = new createjs.Container();
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
