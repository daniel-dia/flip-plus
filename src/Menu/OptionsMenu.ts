module FlipPlus.Menu {
    export class OptionsMenu extends GenericMenu {


        constructor(previousScreen?: gameui.ScreenState) {
            if (!previousScreen) previousScreen = FlipPlusGame.mainScreen;
            this.originY = 1;
            this.originX = defaultWidth; 
            super(StringResources.menus.menu, previousScreen);
            
            // add menu buttons
            var p0 = -350;
            var p = 0;
            var s = 330;

            var soundMenu = new View.SoundMenu(); 
            soundMenu.y = p0;
            this.content.addChild(soundMenu);

            p++;
            this.content.addChild(new gameui.BitmapTextButton(StringResources.menus.shop, "fontBlue", "menu/btmenu", () => {
                FlipPlusGame.showShopMenu(this);
            }).set({ x: 0, y: p0 + p * s }));
            p++;

            this.content.addChild(new gameui.BitmapTextButton(StringResources.menus.about, "fontBlue", "menu/btmenu", () => {
                FlipPlusGame.showAbout(this);
            }).set({ x: 0, y: p0 + p * s }));
 
            p++
            
            //add Other Buttons
            this.content.addChild(new gameui.BitmapTextButton(StringResources.op_erase, "fontBlue", "", () => {
                FlipPlusGame.levelsUserDataManager.clearAllData();
                if(Cocoon) Cocoon.App.reload();
                window.location.reload();
            }).set({ y : p0 + p * s }));
        }

 
    }
}
