module FlipPlus.GamePlay.Views {

    export class GamePlayMenu extends gameui.UIItem{

    

        private buttons: Array<ItemButton>;
        private parameters: any;

        private items: Array<string>;

        private tutorial_highlightSprite: PIXI.extras.MovieClip
        private tutorial_finger: PIXI.Sprite;

        private currentItem:number;
        private xstart = 320;
        private xstep = 600;
        
        constructor() {

            super();

            this.currentItem = 0;
            this.items = [];

            this.createGamePlayMenu(); 
            this.addTutorialIndicator();

            this.buttons = <Array<ItemButton>>new Object();
            this.parameters = new Object();

        } 

        //adds tutorial touch indicator
        private addTutorialIndicator() {
            this.tutorial_highlightSprite = gameui.AssetsManager.getMovieClip("touch")
            this.tutorial_highlightSprite.visible = false;

            this.tutorial_finger = gameui.AssetsManager.getBitmap("finger")
            this.tutorial_finger.visible = false;
            this.tutorial_finger.regX = 75;
            this.tutorial_finger.regY = 40;

        }

        //creates all menu butons
        private createGamePlayMenu() {
          
            this.width = 2*defaultWidth;
            this.height = 0;

            var pauseBt = new gameui.ImageButton("puzzle/btpause",  () => {this.emit("pause");});

            this.addChild(pauseBt),
            pauseBt.x = 1360; 
            
        }

        // ================ Add Items ==========================================

        // add alls items buttons
        public addItemsButtons(ItemId: Array<string>) {
            for (var i in ItemId) {
                this.items.push(ItemId[i]);
                var bt = new Views.ItemButton(ItemId[i], (buttonId) => {
                    var parameter;
                    if (this.parameters) parameter = this.parameters[buttonId]
                    this.emit( buttonId,{ parameters: parameter });
                    this.parameters[buttonId] = null;

                });
                this.addChild(bt);
                bt.x = this.xstart + this.xstep * this.currentItem;
                this.buttons[ItemId[i]] = bt;
                this.currentItem++;
            }
        }

        // Update all items prices
        public updateItemsPrice(prices:Array<number>) {
            for (var item in prices) 
                if (this.buttons[item])
                    this.buttons[item].updatePrice(prices[item]);
            
        }

        // 
        public getButtonPosition(item: string): number {
            if (!this.buttons[item]) return null;
            return this.buttons[item].x; 
        }

        //================== tutorial ============================================

        public tutorial_HighlightItem(itemId: string,parameter?:any) {

            this.tutorial_lockAllButtons();
            this.tutorial_unlockButton(itemId);

            //highlight the item
            this.addChild(this.tutorial_finger);
            this.tutorial_finger.visible = true;
            this.tutorial_finger.mouseEnabled = false;
            this.tutorial_finger.rotation = 200 * Math.PI / 180;
            createjs.Tween.removeTweens(this.tutorial_finger)
            createjs.Tween.get(this.tutorial_finger)
                .to({ scaleX: 1.3, scaleY: 1.3 }, 500, createjs.Ease.quadInOut)
                .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.quadInOut)
                .loop = true;

            this.tutorial_highlightSprite.visible = true;
            this.tutorial_highlightSprite.play();
            this.addChild(this.tutorial_highlightSprite);
            this.tutorial_highlightSprite.mouseEnabled = false;
            this.tutorial_highlightSprite.hitArea = new PIXI.Rectangle(0, 0, 1, 1);
            

            this.tutorial_highlightSprite.x = this.buttons[itemId].x;
            this.tutorial_highlightSprite.y = this.buttons[itemId].y - 160;

            this.tutorial_finger.x = this.buttons[itemId].x;
            this.tutorial_finger.y = this.buttons[itemId].y - 100;

            //define parameter for feedback
            this.parameters[itemId] = parameter;
        }

        //lock all other buttons
        public tutorial_lockAllButtons() {
            this.stopTutorialsAnimation();
            for (var b in this.buttons)
                this.buttons[b].mouseEnabled = false;
        }

        //lock all other buttons 
        public tutorial_unlockAllButtons() {
            this.stopTutorialsAnimation();
            for (var b in this.buttons)
                this.buttons[b].mouseEnabled = true;
        }

        //unlock desired button
        public tutorial_unlockButton(itemId: string) {
            this.buttons[itemId].mouseEnabled = true;
        }

        private stopTutorialsAnimation() {
                    
            this.tutorial_finger.scaleX = this.tutorial_finger.scaleY = 1;
            createjs.Tween.removeTweens(this.tutorial_finger);
            createjs.Tween.get(this.tutorial_finger).to({ alpha: 0 }, 500).call(() => {
                this.tutorial_finger.alpha = 1;
                this.tutorial_finger.visible = false;
            });
            this.tutorial_highlightSprite.visible = false;
            this.tutorial_highlightSprite.stop();
        }


    }
}
