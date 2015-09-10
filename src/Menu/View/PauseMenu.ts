module FlipPlus.Menu.View {
    export class PauseMenu extends gameui.UIItem {

        constructor() {
            super();
            this.visible = false;

            // add menu buttons
            var p0 = -600;
            var p = 0;
            var s = 330;

            var soundMenu = new FlipPlus.Menu.View.SoundMenu();
            soundMenu.y = p0;
            this.addChild(soundMenu);
            p++;


            this.addChild(new gameui.IconTextButton("menu/icleave", "Leave", defaultFontFamilyHighlight, "white", "menu/btmenu", () => {
                this.dispatchEvent("leave")
            }).set({ y: p0 + p * s }));
            p++;


            this.addChild(new gameui.IconTextButton("menu/icskip", "Skip", defaultFontFamilyHighlight, "white", "menu/btmenu", () => {
                this.dispatchEvent("skip")
            }).set({ y: p0 + p * s }));
            p++


            this.addChild(new gameui.IconTextButton("menu/icrestart", "Restart", defaultFontFamilyHighlight, "white", "menu/btmenu", () => {
                this.dispatchEvent("restart")
            }).set({ y: p0 + p * s }));
            p++


            this.addChild(new gameui.IconTextButton("menu/iccontinue", "Continue", defaultFontFamilyHighlight, "white", "menu/btmenu", () => {
                this.dispatchEvent("continue")
            }).set({ y: p0 + p * s }));
            p++
  
        }
    }
}
