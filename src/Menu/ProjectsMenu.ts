
module FlipPlus.Menu {

    export class ProjectsMenu extends gameui.ScreenState { 

        private starsIndicator: View.StarsIndicator;
        private statisticsTextField: PIXI.extras.BitmapText;
        private projectsGrid: PIXI.Container;

        private projectsItems: View.ProjectItem[] = [];
        private bonusItems: View.BonusItem[] = [];

        private menu: View.ScreenMenu;
        private popup: View.Popup;

        private pagesSwipe: View.PagesSwiper;
        private pages: Array<View.Page>;

        //==================================== initialization ==============================================
        // Constructor
        constructor() {
            super();
            this.createObjects();
            this.onback = () => { this.back(); };
        }
        
        //populate View
        private createObjects() {

            var bg = gameui.AssetsManager.getBitmap("projects/bgprojects");
            bg.scale.y = bg.scale.x = 2;
            this.background.addChild(bg);

            this.addHeader();
            this.addProjects();
            this.addBonuses();
            
            this.pagesSwipe = new View.PagesSwiper(this.projectsGrid, this.pages, defaultWidth);
            this.createPaginationButtons(this.projectsGrid);
            
            this.createPopup();
        }

        //creates a popup
        private createPopup() {
            this.popup = new View.Popup();
            this.content.addChild(this.popup);
        }

        //Adds defaultMenu to screen
        private addHeader() {
            
            //create background
            this.header.addChild(gameui.AssetsManager.getBitmap("projects/projectHeader"));


            this.menu = new View.ScreenMenu(true, true);
            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions(this) });
            this.menu.addEventListener("back", () => { this.back() });
            this.header.addChild(this.menu);

            //create starsIndicator
            this.starsIndicator = new Menu.View.StarsIndicator();
            this.header.addChild(this.starsIndicator);
            this.starsIndicator.x = defaultWidth;
            this.starsIndicator.y = 220;

            //create bots statistics
            this.statisticsTextField = gameui.AssetsManager.getBitmapText("0", "fontBlue");
            this.header.addChild(this.statisticsTextField);
            this.statisticsTextField.y = 220;
            this.statisticsTextField.x = 80;

        }

        //update statistics 
        private updateStatistcs() {
            var done = FlipPlusGame.projectManager.getFinihedProjects().length;
            var total = FlipPlusGame.projectManager.getAllProjects().length;
            this.statisticsTextField.text = done + "/" + total + " BOTS";
        }

        //adds projects objects to the view
        private addProjects() {

            //grid properties
            var xspacing = 500;
            var yspacing = 960;
            var rows = 2;
            var cols = 3;

            //create grid
            this.projectsGrid = new PIXI.Container();
            this.content.addChild(this.projectsGrid);
            this.projectsGrid.x = (defaultWidth - xspacing * cols) / 2 + xspacing / 2;
            this.projectsGrid.y = 600;

            // create Pages
            this.pages = [];
            var currentPage: View.Page;
            
            // Create projectItens
            var projects = FlipPlusGame.projectManager.getAllProjects();
            
            //creates all itens
            for (var i = 0; i < projects.length; i++) {

                //create current page
                if (i % (cols * rows) == 0) {
                    currentPage = new View.Page();

                    this.projectsGrid.addChild(currentPage);
                    this.pages.push(currentPage);
                }

                
                var projectView = new View.ProjectItem(projects[i], (e: PIXI.interaction.InteractionEvent) => {
                    this.projectItemClick(e);
                });
 
                
                //add item to scene
                this.projectsItems.push(projectView);
                currentPage.addChild(projectView);
                

                //set item position
                projectView.x = xspacing * (i % cols) + 260;
                projectView.y = yspacing * Math.floor((i % (cols * rows)) / cols);

            }
        }

        //adds bonuses objects to the view
        private addBonuses() {
            for (var p = 0; p < this.pages.length; p++) {
                var bonusBt = new View.BonusItem("Bonus" + (p + 1), (e) => {
                    //cancel click in case of drag
                    if (this.pagesSwipe.cancelClick) return;

                    var bonusId = (<View.BonusItem>e.target).bonusId;
                    var timer = FlipPlusGame.timersData.getTimer(bonusId);

                    if (bonusData[bonusId].cost <= FlipPlusGame.projectManager.getStarsCount()) {
                        if (timer == 0) FlipPlusGame.showBonus(bonusId);
                        else this.showtimeWarning(timer.toString());
                    }
                    else {
                        this.showStarWarning(FlipPlusGame.projectManager.getStarsCount(), bonusData[bonusId].cost);
                    }
                });

                this.pages[p].addChild(bonusBt);
                this.bonusItems.push(bonusBt);

            }
        }

        //Callback to the project item click
        private projectItemClick(e: PIXI.interaction.InteractionEvent) {

            //cancel click in case of drag
            if (this.pagesSwipe.cancelClick) return;
                
            //get proper project target
            var t: any = e.target;
            var pv = <View.ProjectItem> t;
            var p = pv.project;

            if (p.UserData.unlocked)
                FlipPlusGame.showProjectLevelsMenu(p, { rebuild: true });

            else {
                var stars = FlipPlusGame.projectManager.getStarsCount();
                if (stars < p.cost)
                    this.showStarWarning(stars, p.cost);
            }
        }

        //Show warning for no using stars
        private showStarWarning(stars: number, cost: number) {
            this.popup.showtext(StringResources.pr_notStarsTitle, StringResources.pr_notStarsText.split("#")[0] + stars.toString() + StringResources.pr_notStarsText.split("#")[1] + cost.toString() + StringResources.pr_notStarsText.split("#")[2], 10000);
        }

        //show there is no time for it
        private showtimeWarning(time: string) {
            this.popup.showtext(StringResources.pr_notTimeText.split("#")[0], StringResources.pr_notTimeText.split("#")[1] + time + StringResources.pr_notTimeText.split("#")[2], 10000);
        }

        //update all projects preview in the menu page
        private updateProjects() {
            for (var i = 0; i < this.projectsItems.length; i++)
                this.projectsItems[i].updateProjectInfo();
        }

        //update all projects preview in the menu page
        private updateBonuses() {
            for (var i = 0; i < 3; i++)
                this.bonusItems[i].updateProjectInfo();
        }

        //=====================================================

        //create paginations buttons
        private createPaginationButtons(pagesContainer: PIXI.Container) {

            var bg = gameui.AssetsManager.getBitmap("projects/projectFooter")
            bg.y = -246;
            this.footer.addChild(bg);

            //create leftButton
            var lb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoPreviousPage() }, "buttonOut");
            lb.y = -100;
            lb.x = defaultWidth * 0.1;
            this.footer.addChild(lb);

            //create right button
            var rb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoNextPage() });
            rb.y = -100;
            rb.x = defaultWidth * 0.9;
            rb.scale.x = -1;
            this.footer.addChild(rb);

            //create pagination indicator
            var indicatorContainer: PIXI.Container = new PIXI.Container();
            indicatorContainer.mouseEnabled = false;
            indicatorContainer.x = 500;
            indicatorContainer.y = -130;
            for (var i = 0; i < 3; i++) {

                var off = gameui.AssetsManager.getBitmap("projects/pageoff")
                off.x = i * 200;
                indicatorContainer.addChild(off);

                var on = gameui.AssetsManager.getBitmap("projects/pageon")
                on.x = off.x;
                on.visible = false;
                on.name = i.toString();
                indicatorContainer.addChild(on);
            }

            this.pagesSwipe.onPageChange = (pageId) => {
                for (var i = 0; i < 3; i++)
                    indicatorContainer.getChildByName(i.toString()).visible = false;
                indicatorContainer.getChildByName(pageId.toString()).visible = true;
            }

            this.footer.addChild(indicatorContainer);

            //goto defaul page
            this.pagesSwipe.gotoPage(0);
        }           

        //=====================================================

        //executes when activate the screen
        public activate() {
            super.activate();
            
            // play music
            gameui.AudiosManager.playMusic("Music Dot Robot");


            this.updateProjects();
            this.updateStatistcs();
            this.updateBonuses();

            this.starsIndicator.updateStarsAmount(FlipPlusGame.projectManager.getStarsCount());
        }

        //back button
        public back() {
            FlipPlus.FlipPlusGame.showMainScreen();
        }
    }
}