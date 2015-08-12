module FlipPlus.Menu {
    export class OptionsMenu extends gameui.ScreenState {

        private btMusOn: createjs.DisplayObject;
        private btMusOf: createjs.DisplayObject;
        private btSndOn: createjs.DisplayObject;
        private btSndOf: createjs.DisplayObject;

        constructor() {
            super();
            this.buildObjects();
            this.updateVolumeButtons();
        }

        public buildObjects() {
          
            // add bg
            this.content.addChild(gameui.AssetsManager.getBitmap("mybotsbg").set({ y: -339, scaleY: 1.3310546875 }));
            
            var menu = new createjs.Container();
            menu.set({ x: defaultWidth / 2, y: defaultHeight / 2 })
            this.content.addChild(menu);

            // add bg menu
            menu.addChild(gameui.AssetsManager.getBitmap("menu/menubg").set({ regX: 1536 / 2, regY: 1840 / 2 }));

            // add menu buttons
            var p0 = -350;
            var p = 0;
            var s = 330;

            this.btMusOn = new gameui.IconButton("menu/icmusic", "menu/btmusicon",  () => { gameui.AudiosManager.setMusicVolume(0); this.updateVolumeButtons()}).set({ x: -200, y: p0 })
            this.btMusOf = new gameui.IconButton("menu/icmusic", "menu/btmusicoff", () => { gameui.AudiosManager.setMusicVolume(1); this.updateVolumeButtons()}).set({ x: -200, y: p0 })
            this.btSndOn = new gameui.IconButton("menu/icsound", "menu/btmusicon",  () => { gameui.AudiosManager.setSoundVolume(0); this.updateVolumeButtons()}).set({ x: 200, y: p0 })
            this.btSndOf = new gameui.IconButton("menu/icsound", "menu/btmusicoff", () => { gameui.AudiosManager.setSoundVolume(1); this.updateVolumeButtons()}).set({ x: 200, y: p0 })
            
            menu.addChild(this.btMusOn);
            menu.addChild(this.btMusOf);
            menu.addChild(this.btSndOn);
            menu.addChild(this.btSndOf);

            p++;
            menu.addChild(new gameui.TextButton("Help", defaultFontFamilyHighlight, "#343171", "menu/btmenu", () => { }).set({ x: 0, y: p0 + p * s }));
            p++;
            menu.addChild(new gameui.TextButton("Store", defaultFontFamilyHighlight, "#343171", "menu/btmenu", () => { }).set({ x: 0, y: p0 + p * s }));
            p++
            
            //add Other Buttons
            menu.addChild(new gameui.TextButton(stringResources.op_erase, defaultFontFamilySmall, "#343171","", () => {
                FlipPlusGame.projectData.clearAllData();
                window.location.reload();
            }).set({ y : p0 + p * s }));

            //Add Back Button
            var bb = new gameui.IconButton("menu/x", "", () => {
                FlipPlusGame.showMainMenu();
                this.animateOut(menu);
            });
            bb.set({ x: 550, y: -690, hitPadding: 100 });
            bb.createHitArea();
            menu.addChild(bb);

            menu.addChild(new gameui.Label("MENU", defaultFontFamilyHighlight, "white").set({ x: -400, y: -690 }));


            this.animateIn(menu);
        }

        private updateVolumeButtons() {
            this.btMusOn.visible = gameui.AudiosManager.getMusicVolume()==1
            this.btMusOf.visible = gameui.AudiosManager.getMusicVolume()==0
            this.btSndOn.visible = gameui.AudiosManager.getSoundVolume()==1
            this.btSndOf.visible = gameui.AudiosManager.getSoundVolume()==0
        }

        private animateIn(menu: createjs.DisplayObject) {
            createjs.Tween.get(menu).to({ x: 1536, y: 0, scaleY: 0, scaleX: 0, alpha: 0 }).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 2 }, 400, createjs.Ease.quadOut);
        }

        private animateOut(menu: createjs.DisplayObject) { 
            createjs.Tween.get(menu).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 5 }).to({ x: 1536, y: 0, scaleY: 0, scaleX: 0, alpha: 1 }, 600, createjs.Ease.quadIn);
        }
    }
}
