module FlipPlus.Menu {
    export class About extends GenericMenu {


        constructor(previousScreen?: gameui.ScreenState) {
            if (!previousScreen) previousScreen = FlipPlusGame.mainScreen;
            this.originY = 1;
            this.originX = defaultWidth;
            super(StringResources.menus.menu, previousScreen);
            
            // add menu buttons
             
        }


    }
}
