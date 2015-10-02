module FlipPlus.Menu {
    export class GenericMenu extends gameui.ScreenState {

        protected originX:number;
        protected originY:number;

        constructor(title: string, previousScreen: gameui.ScreenState, color?: string) {
            super();

            if (!this.originX) this.originX = defaultWidth / 2;
            if (!this.originY) this.originY = defaultHeight / 2;

            this.content.set({ x: defaultWidth / 2, y: defaultHeight / 2 })

            this.buildHeader(title, previousScreen, color);

            this.animateIn(this.content);


            this.onback = () => {
                this.back(previousScreen);
            };
        }


        private back(previousScreen) {
            FlipPlusGame.gameScreen.switchScreen(previousScreen);
            this.animateOut(this.content);
        }

        protected buildHeader(title, previousScreen, color?:string) {
            // add bg
            this.background.addChild(gameui.AssetsManager.getBitmap("mybotsbg").set({ y: -339, scaleY: 1.3310546875 }));
            // add bg menu
            this.content.addChild(gameui.AssetsManager.getBitmap("menu/menubg").set({ regX: 1536 / 2, regY: 1840 / 2 }));
            this.content.addChild(gameui.AssetsManager.getBitmap(color || "menu/titlePurple").set({ regX: 1536 / 2, regY: 1840 / 2 }));
      
            //Add Back Button
            var backButton = new gameui.IconButton("menu/x", "", () => {
                this.back(previousScreen);
            });

            backButton.set({ x: 550, y: -690, hitPadding: 100 });
            backButton.createHitArea();
            this.content.addChild(backButton);

            var t = new gameui.Label(title, defaultFontFamilyHighlight, 0xFFFFFF).set({ x: -500, y: -690, textAlign:"left" });
            t
            this.content.addChild(t);

        }
            
        private animateIn(menu: PIXI.DisplayObject) {
            createjs.Tween.get(menu).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 0 }).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 1 }, 400, createjs.Ease.quadOut);
        }

        private animateOut(menu: PIXI.DisplayObject) {
            createjs.Tween.get(menu).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 5 }).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 1 }, 200, createjs.Ease.quadIn);
        }
    }
}
