module FlipPlus.Menu {
    export class OptionsMenu extends GenericMenu {

 
        constructor() {
            this.originY = 1;
            this.originX = defaultWidth;
            super(StringResources.menus.menu, FlipPlusGame.mainScreen);
            
            // add menu buttons
            var p0 = -350;
            var p = 0;
            var s = 330;

            var soundMenu = new View.SoundMenu(); 
            soundMenu.y = p0;
            this.content.addChild(soundMenu);

            p++;
            this.content.addChild(new gameui.BitmapTextButton("Help", "fontBlue", "menu/btmenu", () => {
                FlipPlusGame.showSpecialOffer(this);
            }).set({ x: 0, y: p0 + p * s }));
            p++;                                                      
            this.content.addChild(new gameui.BitmapTextButton("Store","fontBlue", "menu/btmenu", () => {
                FlipPlusGame.showShopMenu(this);
            }).set({ x: 0, y: p0 + p * s }));
            p++
            
            //add Other Buttons
            this.content.addChild(new gameui.BitmapTextButton(StringResources.op_erase, "fontBlue", "", () => {
                FlipPlusGame.projectData.clearAllData();
                window.location.reload();
            }).set({ y : p0 + p * s }));
        }

 
    }
}
