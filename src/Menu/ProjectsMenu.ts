module InvertCross.Menu {

    // Class
    export class ProjectsMenu extends Gbase.ScreenState {

        private partsIndicator: View.PartsIndicator;
        private projectsGrid: createjs.Container;

        private projectsItens: View.ProjectItem[] = [];
        private pages: createjs.Container[];

        private currentPageIndex: number = 0;

        private menu: View.ScreenMenu;


        private popup: View.Popup;

        // Constructor
        constructor() {
            super();
            this.createObjects();
        }

        

        //populate View
        private createObjects() {

            var bg: createjs.Bitmap = InvertCross.Assets.getImage("projects/bg");
            this.view.addChild(bg);

            this.addMenu();
            this.addProjects();
            this.createPaginationButtons();

            //this.partsIndicator.updateAmount(InvertCrossaGame.partsManager.getBallance());
            this.createPopup();
        }

        //creates a popup
        private createPopup() {
            this.popup = new View.Popup();
            this.view.addChild(this.popup);
        }

        //Adds defaultMenu to screen
        private addMenu() {
            this.menu = new View.ScreenMenu();

            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o
            this.menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new OptionsMenu()); });
            this.menu.addEventListener("back", () =>{InvertCross.InvertCrossaGame.showMainMenu();});
            this.partsIndicator = this.menu.partsIndicator;
            this.view.addChild(this.menu);
        }

        //adds projects objects to the view
        private addProjects() {
            //create grid
            this.projectsGrid = new createjs.Container();
            this.view.addChild(this.projectsGrid);
            this.projectsGrid.x = 750/2;
            this.projectsGrid.y = 600;

            // create Pages
            this.pages = [];
            var currentPage: createjs.Container;
            
            // Create projectItens
            var projects = InvertCrossaGame.projectManager.getAllProjects();
            
            //creates all itens
            for (var i = 0; i < projects.length; i++) {

                //create current page
                if (i % 4 == 0) {
                    currentPage = new createjs.Container();
                    this.projectsGrid.addChild(currentPage);
                    this.pages.push(currentPage);
                }
                
                var pview = new View.ProjectItem(projects[i]);

                //add click event to the item
                pview.addEventListener("click", (e: MouseEvent) => { this.projectItemClick(e); });

                //add item to scene
                this.projectsItens.push(pview);
                currentPage.addChild(pview);

                //set item position
                pview.x = 750 * (i%2);
                pview.y = 750  * Math.floor((i % 4) / 2);
            }
        }

        //Callback to the project item click
        private projectItemClick(e: MouseEvent) {
            
            //get proper project target
            var t: any = e.currentTarget;
            var pv = <View.ProjectItem> t;
            var p = pv.project;


            if (p.UserData.unlocked)
                InvertCrossaGame.showProjectLevelsMenu(p);

            else {
                
                var stars = InvertCrossaGame.projectManager.getStarsCount();

                if (stars < p.cost)
                    this.popup.showtext("you only have " + stars + " stars. \nYou need at least " + p.cost + " stars \nto unlock this project\n play more levels to earn stars.", 10000);
                //else
                //  InvertCrossaGame.projectManager.unlockProject(p);
                                    
                //this.partsIndicator.updatePartsAmount(InvertCrossaGame.partsManager.getBallance());   
                //this.updateProjects();
            }
        }

        private updateProjects() {
            for (var i = 0; i < this.projectsItens.length; i++) {
                var p = this.projectsItens[i];
                p.updateProjectInfo();
            }
        }

        public activate() {
            super.activate();
            this.updateProjects();

            this.menu.partsIndicator.updateStarsAmount(InvertCrossaGame.projectManager.getStarsCount());
            this.menu.partsIndicator.updatePartsAmount(InvertCrossaGame.partsManager.getBallance());
        }

        //----------------------pages-----------------------------------------------//
        
        private createPaginationButtons() {
            //create leftButton
            var lb: Gbase.UI.Button = new Gbase.UI.Button;
            var lbs: createjs.Shape = new createjs.Shape();
            lb.addChild(lbs);
            lbs.graphics.beginFill("#0e253a").drawRect(-110, -110, 210, 210);
            lbs.graphics.beginFill("#FFF").lineTo(0, -100).lineTo(0, 100).lineTo(-100, 0);
            lb.y = 1300;
            lb.x = DefaultWidth * 0.1;
            this.view.addChild(lb);
            lb.addEventListener("click", (e: MouseEvent) => { this.gotoPreviousPage() });
            
            //create right button
            var rb: Gbase.UI.Button = new Gbase.UI.Button;
            var rbs: createjs.Shape = new createjs.Shape();
            rb.addChild(rbs);
            rbs.graphics.beginFill("#0e253a").drawRect(-110, -110, 210, 210);
            rbs.graphics.beginFill("#FFF").lineTo(0, -100).lineTo(0, 100).lineTo(100, 0);
            rb.y = 1300;
            rb.x = DefaultWidth * 0.9;
            this.view.addChild(rb);
            rb.addEventListener("click", (e: MouseEvent) => { this.gotoNextPage() });

            //create pagination indicator

            //goto defaul page
            this.gotoPage(0);
        }
        
        private gotoPage(pageId: number) {
            for (var i = 0; i < this.pages.length; i++) 
                this.pages[i].visible = false;

            this.pages[pageId].visible = true;
        }

        private gotoNextPage() {
            this.currentPageIndex++;
            this.currentPageIndex = this.currentPageIndex % this.pages.length;

            this.gotoPage(this.currentPageIndex);
        }

        private gotoPreviousPage() {
            this.currentPageIndex--;
            this.currentPageIndex += this.pages.length;

            this.currentPageIndex = this.currentPageIndex % this.pages.length;

            this.gotoPage(this.currentPageIndex);

        }

    }
}