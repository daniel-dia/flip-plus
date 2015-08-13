module FlipPlus.Menu {
    export class OptionsMenu extends GenericMenu {

        private btMusOn: createjs.DisplayObject;
        private btMusOf: createjs.DisplayObject;
        private btSndOn: createjs.DisplayObject;
        private btSndOf: createjs.DisplayObject;

        constructor() {

            this.originY = 1;
            this.originX = defaultWidth;

            super(stringResources.menus.menu, FlipPlusGame.mainScreen);


            this.buildObjects();
            this.updateVolumeButtons();
        }

        public buildObjects() {
          
           // add menu buttons
            var p0 = -350;
            var p = 0;
            var s = 330;

            this.btMusOn = new gameui.IconButton("menu/icmusic", "menu/btmusicon",  () => { gameui.AudiosManager.setMusicVolume(0); this.updateVolumeButtons()}).set({ x: -200, y: p0 })
            this.btMusOf = new gameui.IconButton("menu/icmusic", "menu/btmusicoff", () => { gameui.AudiosManager.setMusicVolume(1); this.updateVolumeButtons()}).set({ x: -200, y: p0 })
            this.btSndOn = new gameui.IconButton("menu/icsound", "menu/btmusicon",  () => { gameui.AudiosManager.setSoundVolume(0); this.updateVolumeButtons()}).set({ x: 200, y: p0 })
            this.btSndOf = new gameui.IconButton("menu/icsound", "menu/btmusicoff", () => { gameui.AudiosManager.setSoundVolume(1); this.updateVolumeButtons()}).set({ x: 200, y: p0 })
            
            this.content.addChild(this.btMusOn);
            this.content.addChild(this.btMusOf);
            this.content.addChild(this.btSndOn);
            this.content.addChild(this.btSndOf);

            p++;
            this.content.addChild(new gameui.TextButton("Help", defaultFontFamilyHighlight, blueColor, "menu/btmenu", () => {
                FlipPlusGame.showSpecialOffer(this);
            }).set({ x: 0, y: p0 + p * s }));
            p++;
            this.content.addChild(new gameui.TextButton("Store", defaultFontFamilyHighlight, blueColor, "menu/btmenu", () => {
                FlipPlusGame.showShopMenu(this);
            }).set({ x: 0, y: p0 + p * s }));
            p++
            
            //add Other Buttons
            this.content.addChild(new gameui.TextButton(stringResources.op_erase, defaultFontFamilySmall, blueColor, "", () => {
                FlipPlusGame.projectData.clearAllData();
                window.location.reload();
            }).set({ y : p0 + p * s }));
        }

        private updateVolumeButtons() {
            this.btMusOn.visible = gameui.AudiosManager.getMusicVolume()==1
            this.btMusOf.visible = gameui.AudiosManager.getMusicVolume()==0
            this.btSndOn.visible = gameui.AudiosManager.getSoundVolume()==1
            this.btSndOf.visible = gameui.AudiosManager.getSoundVolume()==0
        }
    }
}
