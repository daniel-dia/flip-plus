/// <reference path="../../lib/easeljs.d.ts" />

/// <reference path="../Menu/SoundMenu.ts" /> 

/// <reference path="../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../Gbase/UI/Button.ts" /> 

module InvertCross.Menu {
    export class OptionsMenu extends Gbase.ScreenState {
        constructor() {
            super();
            this.buildObjects();
        }

        public buildObjects() {

            this.view.visible = false;
            var backgroundShape: createjs.Shape = new createjs.Shape();

            backgroundShape.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, DefaultWidth, DefaultHeight);
            this.view.addChild(backgroundShape);

            var mc = new Gbase.UI.MenuContainer();
            this.view.addChild(mc);

            //Add Back Button
            var backContainer: Gbase.UI.Grid = new Gbase.UI.Grid(1, 1, null, 373, null, true);
            backContainer.y = 1676;
            this.view.addChild(backContainer);


            backContainer.addObject(new Gbase.UI.TextButton("Voltar", () => {
                InvertCrossaGame.showMainMenu();
            }));

            //add Label
            mc.addLabel("Options");

            mc.addObject(new Menu.SoundMenu());

            //add Other Buttons
            mc.addButton("Erase Data", () => {
                InvertCrossaGame.userData.clearAllData();
                window.location.reload();
            });

        }
    }
}
