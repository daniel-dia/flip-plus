module FlipPlus.Menu {
    export class OptionsMenu extends gameui.ScreenState {
        constructor() {
            super();
            this.buildObjects();
        }

        public buildObjects() {

            this.content.visible = false;
            var backgroundShape: createjs.Shape = new createjs.Shape();

            backgroundShape.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, DefaultWidth, DefaultHeight);
            this.content.addChild(backgroundShape);

            var mc = new gameui.ui.MenuContainer();
            this.content.addChild(mc);

            //Add Back Button
            var backContainer: gameui.ui.Grid = new gameui.ui.Grid(1, 1, null, 373, null, true);
            backContainer.y = 1676;
            this.content.addChild(backContainer);


            backContainer.addObject(new gameui.ui.TextButton(stringResources.op_back,"","" ,"",() => {
                FlipPlusGame.showMainMenu();
            }));

            //add Label
            mc.addLabel(stringResources.op_options);

            mc.addObject(new Menu.SoundMenu());

            //add Other Buttons
            mc.addButton(stringResources.op_erase, () => {
                FlipPlusGame.projectData.clearAllData();
                window.location.reload();
            });

        }
    }
}
