module InvertCross.Menu {

    // Class
    export class LevelsMenu extends Gbase.ScreenState {

        private menu: View.ScreenMenu;
        private projectsContaier: createjs.Container;
        private projectViews: Array<View.ProjectWorkshopView>;

        private popup: View.Popup;
        private message: View.Message;

        private projects;

        private pagesSwipe: PagesSwipe;

        // Constructor
        constructor(projects:Array<Projects.Project>) {
            super();
            this.projects = projects;
            this.addObjects();
            this.pagesSwipe = new PagesSwipe(this.projectsContaier, this.projectViews);
        }
        
        //--------------------- Initialization ---------------------

        private addObjects() {
            //add Background
            var bg = Assets.getImage("workshop/bgworkshop")
            this.view.addChild(bg);
            
            this.view.mouseChildren = true;
            
            //adds Projects
            this.addProjects(this.projects);

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
            this.menu.addEventListener("back", () => { InvertCross.InvertCrossaGame.showProjectsMenu();});
            this.menu.partsIndicator.updatePartsAmount(InvertCrossaGame.partsManager.getBallance());
            this.view.addChild(this.menu);

        }

        //inertia fx
        private offset = 0;
        private lastx = 0;

        //adds all projects in swipe view
        private addProjects(projects) {
            
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


        //--Behaviour-----------------------------------------------------------

        public activate(parameters?: any) {

            super.activate();

            this.menu.partsIndicator.updateStarsAmount(InvertCrossaGame.projectManager.getStarsCount());
            this.menu.partsIndicator.updatePartsAmount(InvertCrossaGame.partsManager.getBallance());

            for (var pv in this.projectViews) {
                if (InvertCrossaGame.projectManager.getCurrentProject().name == this.projectViews[pv].name)
                    this.projectViews[pv].activate(parameters);
            }

            //makes win or loose animation
            if (parameters && parameters.complete)
                this.message.showtext("WELL DONE !", 3000,500);

            if (parameters && parameters.loose)
                this.message.showtext("TRY AGAIN !", 3000);

            //verifies if player completes the project

        }
    }
}