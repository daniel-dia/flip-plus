
module FlipPlus.Menu {

    export class ProjectsMenu extends gameui.ScreenState {

        private starsIndicator: View.StarsIndicator;
        private statisticsTextField: createjs.Text;
        private projectsGrid: createjs.Container;

        private projectsItems: View.ProjectItem[] = [];
        private bonusItems: View.BonusItem[] = [];
        
        private menu: View.ScreenMenu;
        private popup: View.Popup;

        private pagesSwipe: PagesSwipe ;
        private pages: Array<createjs.Container>;

        //==================================== initialization ==============================================
        // Constructor
        constructor() {
            super();
            this.createObjects();
        }
        
        //populate View
        private createObjects() {

            var bg = gameui.AssetsManager.getBitmap("projects/bgprojects");
            bg.scaleY = bg.scaleX = 2;
            this.background.addChild(bg);

            this.addHeader();
            this.addProjects();
            this.addBonuses();
           
            this.pagesSwipe = new PagesSwipe(this.projectsGrid, this.pages,DefaultWidth);
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
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions() });
            this.menu.addEventListener("back", () => { this.back() });
            this.header.addChild(this.menu);

            //create starsIndicator
            this.starsIndicator = new Menu.View.StarsIndicator();
            this.header.addChild(this.starsIndicator);
            this.starsIndicator.x = DefaultWidth ;
            this.starsIndicator.y = 220;

            //create bots statistics
            this.statisticsTextField = new createjs.Text("0", defaultFontFamilyNormal, grayColor);
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
            this.projectsGrid = new createjs.Container();
            this.content.addChild(this.projectsGrid);
            this.projectsGrid.x = (DefaultWidth -xspacing*cols)/2 +xspacing/2;
            this.projectsGrid.y = 600;

            // create Pages
            this.pages = [];
            var currentPage: createjs.Container;
            
            // Create projectItens
            var projects = FlipPlusGame.projectManager.getAllProjects();
            
            //creates all itens
            for (var i = 0; i < projects.length; i++) {

                //create current page
                if (i % (cols*rows) == 0) {
                    currentPage = new createjs.Container();

                    var hit = new createjs.Container;
                    hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, DefaultWidth, DefaultHeight)));
                    currentPage.addChild(hit);

                    this.projectsGrid.addChild(currentPage);
                    this.pages.push(currentPage);
                }
                
                var pview = new View.ProjectItem(projects[i]);
                
                //add click event to the item
                pview.addEventListener("click", (e: MouseEvent) => { this.projectItemClick(e); });
                
                //add item to scene
                this.projectsItems.push(pview);
                currentPage.addChild(pview);
                
                //set item position
                pview.x = xspacing * (i % cols) + 260;
                pview.y = yspacing * Math.floor((i % (cols*rows)) / cols);

            }
        }

        //adds bonuses objects to the view
        private addBonuses() {
            for (var p = 0; p < this.pages.length; p++) {
                var bonusBt = new View.BonusItem("Bonus" + (p + 1), (e: MouseEvent) => {
                    //cancel click in case of drag
                    if (this.pagesSwipe.cancelClick) return;

                    var bonusId = (<View.BonusItem>e.currentTarget).bonusId;
                    var timer = FlipPlusGame.timersData.getTimer(bonusId);

                    if (bonusData[bonusId].cost <= FlipPlusGame.projectManager.getStarsCount()) {
                        if (timer == 0) FlipPlusGame.showBonus(bonusId);
                        else this.showtimeWarning(timer.toString());
                    }
                    else {
                        this.showStarWarning(FlipPlusGame.projectManager.getStarsCount(),bonusData[bonusId].cost);
                    }
                });

                this.pages[p].addChild(bonusBt);
                this.bonusItems.push(bonusBt);

            }
        }

        //Callback to the project item click
        private projectItemClick(e: MouseEvent) {

            //cancel click in case of drag
            if (this.pagesSwipe.cancelClick) return;
                
            //get proper project target
            var t: any = e.currentTarget;
            var pv = <View.ProjectItem> t;
            var p = pv.project;

            if (p.UserData.unlocked)
                FlipPlusGame.showProjectLevelsMenu(p, {rebuild:true});

            else {
                var stars = FlipPlusGame.projectManager.getStarsCount();
            if (stars < p.cost)
                this.showStarWarning(stars,p.cost);
            }
        }

        //Show warning for no using stars
        private showStarWarning(stars:number,cost:number) {
            this.popup.showtext(stringResources.pr_notStarsTitle, stringResources.pr_notStarsText.split("#")[0] + stars.toString() + stringResources.pr_notStarsText.split("#")[1] + cost.toString() + stringResources.pr_notStarsText.split("#")[2], 10000);
        }

        //show there is no time for it
        private showtimeWarning(time:string) {
                this.popup.showtext(stringResources.pr_notTimeText.split("#")[0], stringResources.pr_notTimeText.split("#")[1] + time + stringResources.pr_notTimeText.split("#")[2], 10000);
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
        private createPaginationButtons(pagesContainer: createjs.Container) {
            
            var bg = gameui.AssetsManager.getBitmap("projects/projectFooter")
            bg.y = -246;
            this.footer.addChild(bg);

            //create leftButton
            var lb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoPreviousPage() }, "buttonOut");
            lb.y = -100;
            lb.x = DefaultWidth * 0.1;
            this.footer.addChild(lb);

            //create right button
            var rb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoNextPage() });
            rb.y = -100;
            rb.x = DefaultWidth * 0.9;
            rb.scaleX = -1;
            this.footer.addChild(rb);

            //create pagination indicator
            var indicatorContainer: createjs.Container = new createjs.Container();
            indicatorContainer.mouseEnabled = false;
            indicatorContainer.x=500;
            indicatorContainer.y=-130;
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
            gameui.AssetsManager.playMusic("Music Dot Robot");


            this.updateProjects();
            this.updateStatistcs();
            this.updateBonuses();
           
            this.starsIndicator.updateStarsAmount(FlipPlusGame.projectManager.getStarsCount());
        }

        //back button
        public back() {
            FlipPlus.FlipPlusGame.showMainMenu();
        }


    }

}