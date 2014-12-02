module FlipPlus.Menu.View {

    export class ScreenMenu extends gameui.UIItem{

        constructor(backVisible: boolean= true, starsVisible: boolean= false) {
            super();
            this.createObjects(backVisible, starsVisible);
        }

        private createObjects(backVisible: boolean= true, starsVisible: boolean= false) {

            //adds menu button
            var menuBt: gameui.ImageButton = new gameui.ImageButton("MenuBt", () => { this.dispatchEvent("menu", menuBt) });
            menuBt.y = 90;
            menuBt.x = DefaultWidth - 130;
            this.addChild(menuBt);

            //add a bacl buttton
            var backBt: gameui.ImageButton = new gameui.ImageButton("BackBt", () => { this.dispatchEvent("back", menuBt) }, "buttonOut");
            backBt.y = 90;
            backBt.x = 130;
            backBt.visible = backVisible;
            this.addChild(backBt);
        }

        //TODO uma forma melhor que isso

   }
}
 