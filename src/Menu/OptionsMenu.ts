module FlipPlus.Menu {
    export class OptionsMenu extends gameui.ScreenState {
        constructor() {
            super();
            this.buildObjects();
        }

        public buildObjects() {

            //Add Back Button
            var bb = new gameui.TextButton(stringResources.op_back,defaultFontFamilyNormal,defaultFontColor,"",() => {
                FlipPlusGame.showMainMenu();
            });

            bb.x = bb.y = 100
            this.content.addChild(bb);

            
            var cdb= new gameui.TextButton(stringResources.op_erase,defaultFontFamilyNormal,defaultFontColor,"", () => {
                FlipPlusGame.projectData.clearAllData();
                window.location.reload();
            });

            cdb.x = DefaultWidth / 2;
            cdb.y = DefaultHeight / 2;

            //add Other Buttons
            this.content.addChild(cdb);


        }
    }
}
