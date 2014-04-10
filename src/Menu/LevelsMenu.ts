module InvertCross.Menu {

    export class LevelsMenu extends Gbase.ScreenState {

        private menu: View.ScreenMenu;
        private projectsContaier: createjs.Container;
        private projectViews: Array<View.ProjectWorkshopView>;

        private popup: View.Popup;
        private message: View.Message;

        private pagesSwipe: PagesSwipe;

        //just to know when a user finished a project
        private projectPreviousState: Object = {};

        // Constructor
        constructor() {

            super();
            this.addObjects();

            this.pagesSwipe = new PagesSwipe(this.projectsContaier, this.projectViews, DefaultWidth, 200, 1500);
            this.createPaginationButtons(this.projectsContaier)

        }
        
        //--------------------- Initialization ---------------------

        private addObjects() {
            //add Background
            var bg = Assets.getImage("workshop/bgworkshop")
            this.view.addChild(bg);
            
            this.view.mouseChildren = true;
            
            //adds Projects
            this.addProjects();

            //add menu
            this.addMenu();
            
            //adds popup and messages
            this.popup = new View.Popup();
            this.view.addChild(this.popup);

            this.message = new View.Message();
            this.view.addChild(this.message);

        }

        //Adds menu to screen;
        private addMenu() {
            this.menu = new View.ScreenMenu();
            
            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o
            
            this.menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new OptionsMenu()); });
            this.menu.addEventListener("back", () => { this.back();});
            this.view.addChild(this.menu);

        }

        //inertia fx
        private offset = 0;
        private lastx = 0;

        //adds all projects in swipe view
        private addProjects() {
            
            //pega projetos
            var projects = InvertCrossaGame.projectManager.getUnlockedProjects();

            //create projects container
            var projectsContainer = new createjs.Container();

            //creates projectViews array
            this.projectViews = new Array();

            //add every project
            for (var p in projects) {
                var projectView = new View.ProjectWorkshopView(projects[p]);
                this.projectViews.push(projectView);
                projectsContainer.addChild(projectView);
                projectView.activate();
                projectView.x = DefaultWidth * p; 
                projectView.addEventListener("levelClick", (e:createjs.Event) => { this.openLevel(e) });
            }

            //add to view
            this.view.addChild(projectsContainer);
            this.projectsContaier = projectsContainer;

            var fin = (projects.length-1) * DefaultWidth;
            projectsContainer.addEventListener("onmoving", () => {
                if (projectsContainer.x > 0) projectsContainer.x = 0;
                if (projectsContainer.x < -fin) projectsContainer.x = - fin;

                for (var pv in this.projectViews) this.projectViews[pv].setRelativePos(this.projectViews[pv].x + projectsContainer.x);
            });
        }

        private openLevel(event: createjs.Event) {

            //cancel click in case of drag
            if (this.pagesSwipe.cancelClick) return;

            var level: Projects.Level = <Projects.Level>event.target['level'];
            var parameters = event.target['parameters']

            if (level != null)
                if (level.userdata.unlocked)
                    InvertCrossaGame.showLevel(level, parameters);
        }

        public back() {
            InvertCross.InvertCrossaGame.showProjectsMenu();
        }
        // ----------------------- pagination -------------------------------------------------------
        private createPaginationButtons(pagesContainer: createjs.Container) {
            //create leftButton
            var lb: Gbase.UI.Button = new Gbase.UI.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoPreviousPage() });
            lb.y = 1050;
            lb.x = DefaultWidth * 0.1;
            this.view.addChild(lb);

            //create right button
            var rb: Gbase.UI.Button = new Gbase.UI.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoNextPage() });
            rb.y = 1050;
            rb.x = DefaultWidth * 0.9;
            rb.scaleX = -1;
            this.view.addChild(rb);

            //create pagination indicator
            //TODO


            //goto defaul page
            this.pagesSwipe.gotoPage(0);
        }           
        //--Behaviour-----------------------------------------------------------

        public activate(parameters?: any) {

            super.activate();

            //updates stars and parts idicatorr
            this.menu.partsIndicator.updateStarsAmount(InvertCrossaGame.projectManager.getStarsCount());

            //update all projects views
            for (var pv in this.projectViews) {
                var project = InvertCrossaGame.projectManager.getProjectByName(this.projectViews[pv].name);

                if (project == InvertCrossaGame.projectManager.getCurrentProject()) {
                    
                    //activate current project
                    this.projectViews[pv].activate(parameters);

                    //goto current project
                    this.pagesSwipe.gotoPage(pv, false);

                    //if complete changes to myBotScreen
                    if (project.UserData.complete && this.projectPreviousState[project.name]==false) {
                        this.view.mouseEnabled = false;
                        this.view.mouseChildren = false;
                        setTimeout(() => {
                            this.view.mouseEnabled = true;
                            this.view.mouseChildren = true;
                            InvertCrossaGame.showMainMenu();
                        }, 2000);
                    }
                }
                
                //store last state
                this.projectPreviousState[project.name] = project.UserData.complete;
            }
            
            
        }
    }
}