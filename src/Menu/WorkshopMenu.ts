module FlipPlus.Menu {

    export class WorkshopMenu extends gameui.ScreenState {

        private menu: View.ScreenMenu;
        private projectsContainer: PIXI.Container;
        private projectViews: Array<View.ProjectWorkshopView>;

        private popup: View.Popup;
        private message: View.Message;

        private pagesSwipe: View.PagesSwiper;
        private paginationButtons: PIXI.Container;

        private factorySound: createjs.SoundInstance;

        protected coinsIndicator: Menu.View.CoinsIndicator;

        //inertia fx
        private offset = 0;
        private lastx = 0;

        // projects manager
        private levelsManager: Levels.LevelsManager;

        // Constructor
        constructor(levelsManager: Levels.LevelsManager) {

            super();

            this.levelsManager = levelsManager;

            this.addObjects();
            this.pagesSwipe = new View.PagesSwiper(this.projectsContainer, this.projectViews, defaultWidth, 200, 1500);
            this.createPaginationButtons(this.projectsContainer);

            this.onback = () => { this.back(); };

        }

        //--------------------- Initialization ---------------------

        private addObjects() {
            //add Background
            var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
            this.content.addChild(bg);
            bg.scale.y = 1.3310546875;
            bg.y = -339;

            //create projects container
            this.projectsContainer = new PIXI.Container();

            //creates projectViews array
            this.projectViews = new Array();

            //add to view
            this.content.addChild(this.projectsContainer);

            //add menu
            this.addMenu();

            //adds popup and messages
            this.popup = new View.Popup();
            this.content.addChild(this.popup);

            this.message = new View.Message();
            this.content.addChild(this.message);

            //this.addCoinsIndicator();
        }

        // adds menu to screen;
        private addMenu() {
            this.menu = new View.ScreenMenu();

            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o

            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions(this); });
            this.menu.addEventListener("back", () => { this.back(); });
            this.header.addChild(this.menu);

        }

        // adds all projects in swipe view
        protected addProjects(projects) {

            //add every project

            for (var p = this.projectViews.length; p < projects.length; p++) {
                var projectView = new View.ProjectWorkshopView(projects[p]);
                this.projectViews.push(projectView);

                projectView.x = defaultWidth * p;
                projectView.addEventListener("levelClick", (e: any) => { this.openLevel(e.level, e.parameters) });

                this.projectsContainer.addChild(projectView);
            }
        }

        // add coins indicator
        private addCoinsIndicator() {
            // parts Indicator
            this.coinsIndicator = new Menu.View.CoinsIndicator(() => {
                FlipPlusGame.showShopMenu(this);
            });

            this.header.addChild(this.coinsIndicator);
            this.coinsIndicator.x = defaultWidth / 2;
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
        }

        // disabe interaction
        public disableInteraction() {
            this.view.interactiveChildren = false;
            this.content.interactiveChildren = false;
            this.header.interactiveChildren = false;
            this.footer.interactiveChildren = false;
            this.overlay.interactiveChildren = false;
            this.view.interactive = false;
            this.menu.visible = false;
            this.paginationButtons.visible = false
        }

        // enable interaction
        public enableInteraction() {
            this.view.interactiveChildren = true;
            this.content.interactiveChildren = true;
            this.header.interactiveChildren = true;
            this.footer.interactiveChildren = true;
            this.overlay.interactiveChildren = true;
            this.view.interactive = true;
            this.menu.visible = true;
            this.paginationButtons.visible = true
        }

        // Open one level
        private openLevel(level: Levels.Level, parameters) {

            //cancel click in case of drag
            if (this.pagesSwipe.cancelClick) return;

            var level: Levels.Level = level;
            var parameters = parameters;

            if (level != null)
                if (level.userdata.unlocked)
                    FlipPlusGame.showLevel(level, parameters);
        }

        // public back
        public back() {
            FlipPlus.FlipPlusGame.showMainScreen();
        }

        // ----------------------- pagination -------------------------------------------------------

        private createPaginationButtons(pagesContainer: PIXI.Container) {

            this.paginationButtons = new PIXI.Container();

            //create leftButton
            var lb: gameui.Button = new gameui.ImageButton("btpage", () => {
                this.pagesSwipe.gotoPreviousPage()
            }, "buttonOut");
            lb.y = 1050;
            lb.x = defaultWidth * 0.1;
            this.paginationButtons.addChild(lb);

            //create right button
            var rb: gameui.Button = new gameui.ImageButton("btpage", () => {
                this.pagesSwipe.gotoNextPage()
            });
            rb.y = 1050;
            rb.x = defaultWidth * 0.9;
            rb.scale.x = -1;
            this.paginationButtons.addChild(rb);

            this.content.addChild(this.paginationButtons);

        }

        //--Behaviour-----------------------------------------------------------

        public redim(headerY: number, footerY: number, width: number, height: number) {
            super.redim(headerY, footerY, width, height);

            for (var pv in this.projectViews)
                this.projectViews[pv].redim(headerY, footerY);
        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            if (this.factorySound) {
                this.factorySound.stop();
                delete this.factorySound;
            }
        }

        public activate(parameters?: any) {

            super.activate();

            // update coins
            //this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());

            // play music
            this.factorySound = gameui.AudiosManager.playSound("Factory Ambience", true, 0, 0, 0, 0.4);

            // update enabled Projects
            this.addProjects(this.levelsManager.getAllProjects());

            // get first non completed project 
            var page = FlipPlusGame.levelsManager.getFirstNonCompleted();

            // get player current project
            var current = FlipPlusGame.levelsManager.getCurrentProjectIndex();

            // get minimun project
            if (current > 0) page = Math.min(current, page);

            //goto current project
            this.pagesSwipe.gotoPage(page);

            //activate current project
            for (var p = 0; p < this.projectViews.length; p++)
                if (p == page)
                    this.projectViews[p].activate(parameters);
                else
                    this.projectViews[p].activate();

        }
    }
}