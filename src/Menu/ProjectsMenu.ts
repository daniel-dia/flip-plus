
module InvertCross.Menu {

    export class ProjectsMenu extends Gbase.ScreenState {

        private partsIndicator: View.PartsIndicator;
        private projectsGrid: createjs.Container;

        private projectsItems: View.ProjectItem[] = [];
        private bonusItems: View.ProjectItem[] = [];

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

            var bg: createjs.Bitmap = Assets.getBitmap("projects/bgprojects");
            this.background.addChild(bg);

            this.addMenu();
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
        private addMenu() {
            this.menu = new View.ScreenMenu(true,true);

            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o
            this.menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new OptionsMenu()); });
            this.menu.addEventListener("back", () => { this.back()});
            this.partsIndicator = this.menu.partsIndicator;
            this.header.addChild(this.menu);
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
            var projects = InvertCrossaGame.projectManager.getAllProjects();
            
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
            for (var p = 0; p < this.pages.length; p++)

                this.pages[p].addChild(new View.BonusItem("Bonus" + (p+1), (e:MouseEvent) => {
                    //cancel click in case of drag
                    if (this.pagesSwipe.cancelClick) return;

                    var bonusId = (<View.BonusItem>e.currentTarget).bonusId;
                    var timer = InvertCrossaGame.timersData.getTimer(bonusId);

                    if (timer == 0) InvertCrossaGame.showBonus(bonusId);
                    else this.showtimeWarning(timer.toString());
                }));
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
                InvertCrossaGame.showProjectLevelsMenu(p, {rebuild:true});

            else {
                var stars = InvertCrossaGame.projectManager.getStarsCount();
            if (stars < p.cost)
                this.showStarWarning(stars,p.cost);
            }
        }

        private showStarWarning(stars:number,cost:number) {
            this.popup.showtext("Not enught stars.", "you only have " + stars.toString() + " stars. \nYou need at least " + cost.toString() + " stars \nto unlock this project\n play more levels to earn stars.", 10000);
        }

        private showtimeWarning(time:string) {
            this.popup.showtext("Not Yet.", "You must wait " + time + "before play this bonus level", 10000);
        }

        //update all projects preview in the menu page
        private updateProjects() {
            for (var i = 0; i < this.projectsItems.length; i++) 
                this.projectsItems[i].updateProjectInfo();
        }


        //update all projects preview in the menu page
        private updateBonuses() {
            for (var i = 0; i < this.projectsItems.length; i++)
                this.projectsItems[i].updateProjectInfo();
        }

                
        //=====================================================

        private createPaginationButtons(pagesContainer: createjs.Container) {
            //create leftButton
            var lb: Gbase.UI.Button = new Gbase.UI.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoPreviousPage() });
            lb.y = -100;
            lb.x = DefaultWidth * 0.1;
            this.footer.addChild(lb);

            //create right button
            var rb: Gbase.UI.Button = new Gbase.UI.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoNextPage() });
            rb.y = -100;
            rb.x = DefaultWidth * 0.9;
            rb.scaleX = -1;
            this.footer.addChild(rb);

            //create pagination indicator
            //TODO


            //goto defaul page
            this.pagesSwipe.gotoPage(0);
        }           

        //=====================================================

        //executes when activate the screen
        public activate() {
            super.activate();

            this.updateProjects();
            this.updateBonuses();

            this.menu.partsIndicator.updateStarsAmount(InvertCrossaGame.projectManager.getStarsCount());
        }

        public back() {
            InvertCross.InvertCrossaGame.showMainMenu();
        }


    }
}