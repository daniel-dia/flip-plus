module InvertCross.GamePlay.Views {

    export class Overlay extends createjs.Container {

        constructor() {
            super();
            this.buildObjects();
        }

        public show() { this.visible = true; }
        public hide() { this.visible = false; }

        public buildObjects() {
            //nothin to do here
        }
    }
        
    export class MenuOverlay extends Overlay {

        // --- Drawing Menu...

        public titleText: createjs.Text;
        public pauseButton: Gbase.UI.TextButton;

        public buildObjects() {
            //Add Back Button
            var menuContainer: Gbase.UI.Grid = new Gbase.UI.Grid(1, 1, null, 373, null, true);
            menuContainer.y = 1676;
            this.addChild(menuContainer);
            this.pauseButton = new Gbase.UI.TextButton("Pause");
            menuContainer.addObject(this.pauseButton);
        }
    }

    export class PauseOverlay extends Overlay {

        public titleText: createjs.Text;
        public backButton: Gbase.UI.TextButton;
        public leaveButton: Gbase.UI.TextButton;
        public replayButton: Gbase.UI.TextButton;
        public confirmMainButton: Gbase.UI.TextButton;

        public confirm: Gbase.UI.MenuContainer;

        public confirmMainText: createjs.Text;
        public z: createjs.Text;

        public buildObjects() {

            this.visible = false;
            var backgroundShape: createjs.Shape = new createjs.Shape();

            backgroundShape.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0, 0, DefaultWidth, DefaultHeight);
            this.addChild(backgroundShape);

            var mc = new Gbase.UI.MenuContainer();
            this.addChild(mc);

            //Add Back Button
            var menuContainer: Gbase.UI.Grid = new Gbase.UI.Grid(1, 1, null, 373, null, true);
            menuContainer.y = 1676;
            this.addChild(menuContainer);
            this.backButton = new Gbase.UI.TextButton("Continue");
            menuContainer.addObject(this.backButton);

            //add Label
            mc.addLabel("Paused");

            mc.addObject(new Menu.SoundMenu());

            //add Other Buttons
            this.replayButton = mc.addButton("SKIP");
            this.replayButton = mc.addButton("RESTART");
            this.confirmMainButton  = mc.addButton("LEAVE");


            //this.createConfirmationContainer();
            //this.addChild(this.confirm);

            //this.leaveButton.addEventListener("click", () => {
            //    this.confirm.fadeIn();
            //    this.leaveButton.fadeOut();
            //})
        }

        private createConfirmationContainer() {

            this.confirm = new Gbase.UI.MenuContainer(null,100);
            this.confirm.y = DefaultHeight / 1.8;


            var smc: Gbase.UI.Grid;
            smc = new Gbase.UI.Grid(2,1,700,100,null,true);

            this.confirm.addLabel("Are you sure?");
            this.confirm.addObject(smc);
            smc.regX = 700/2;
            smc.y -= 150; 

            this.confirmMainButton = new Gbase.UI.TextButton("Yes", null,"botao2.png");
            smc.addObject(new Gbase.UI.TextButton("No", () => {
                this.confirm.fadeOut();
                this.leaveButton.fadeIn();
            }, "botao2.png"));
            smc.addObject(this.confirmMainButton);
            
        }

        public show() {
            super.show();
        }

    }

}