module FlipPlus.Menu {
    export class GenericMenu extends gameui.ScreenState {

        protected originX:number;
        protected originY:number;

        constructor(title: string, previousScreen: gameui.ScreenState) {
            super();
         
            this.originX = defaultWidth / 2;
            this.originY = defaultHeight / 2;
                           
            this.content.set({ x: defaultWidth / 2, y: defaultHeight / 2 })
            
            this.buildHeader(title, previousScreen);
        }

        public activate(parameters:any) {
            super.activate(parameters);
            this.animateIn(this.content);
        }

        private buildHeader(title, previousScreen) {
            // add bg
            this.background.addChild(gameui.AssetsManager.getBitmap("mybotsbg").set({ y: -339, scaleY: 1.3310546875 }));
            // add bg menu
            this.content.addChild(gameui.AssetsManager.getBitmap("menu/menubg").set({ regX: 1536 / 2, regY: 1840 / 2 }));
      
            //Add Back Button
            var backButton = new gameui.IconButton("menu/x", "", () => {
                FlipPlusGame.gameScreen.switchScreen(previousScreen);
                this.animateOut(this.content);
            });
            backButton.set({ x: 550, y: -690, hitPadding: 100 });
            backButton.createHitArea();
            this.content.addChild(backButton);

            this.content.addChild(new gameui.Label(title, defaultFontFamilyHighlight, "white").set({ x: -400, y: -690 }));
        }
            
        private animateIn(menu: createjs.DisplayObject) {
            createjs.Tween.get(menu).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 0 }).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 1 }, 400, createjs.Ease.quadOut);
        }

        private animateOut(menu: createjs.DisplayObject) {
            createjs.Tween.get(menu).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 5 }).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 1 }, 600, createjs.Ease.quadIn);
        }
    }
}
