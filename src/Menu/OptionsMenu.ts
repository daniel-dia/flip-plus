module FlipPlus.Menu {
    export class OptionsMenu extends GenericMenu {

        private popup: View.PopupConfirm;

        constructor(previousScreen?: gameui.ScreenState) {
            if (!previousScreen) previousScreen = FlipPlusGame.mainScreen;
            this.originY = 1;
            this.originX = defaultWidth; 
            super(StringResources.menus.menu, previousScreen);
            
            this.popup = new View.PopupConfirm();
            this.overlay.addChild(this.popup);

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


                
                var confirmText = StringResources.op_erase + "?";
                this.popup.showConfirmMessage(confirmText, () => {
                    FlipPlusGame.levelsUserDataManager.clearAllData();
                    if (window["Cocoon"]) Cocoon.App.reload();
                    else window.location.reload();
                });

                
                
            }).set({ y : p0 + p * s }));
        }

 
    }
}
