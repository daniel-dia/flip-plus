module InvertCross.Menu {
    export class OptionsMenu extends Gbase.ScreenState {
        constructor() {
            super();
            this.buildObjects();
        }

        public buildObjects() {

            this.content.visible = false;
            var backgroundShape: createjs.Shape = new createjs.Shape();

            backgroundShape.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, DefaultWidth, DefaultHeight);
            this.content.addChild(backgroundShape);

            var mc = new Gbase.UI.MenuContainer();
            this.content.addChild(mc);

            //Add Back Button
            var backContainer: Gbase.UI.Grid = new Gbase.UI.Grid(1, 1, null, 373, null, true);
            backContainer.y = 1676;
            this.content.addChild(backContainer);


            backContainer.addObject(new Gbase.UI.TextButton(stringResources.op_back, () => {
                InvertCrossaGame.showMainMenu();
            }));

            //add Label
            mc.addLabel(stringResources.op_options);

            mc.addObject(new Menu.SoundMenu());

            //add Other Buttons
            mc.addButton(stringResources.op_erase, () => {
                InvertCrossaGame.userData.clearAllData();
                window.location.reload();
            });

        }
    }
}
