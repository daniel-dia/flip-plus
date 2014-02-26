/// <reference path="../../lib/easeljs.d.ts" />

/// <reference path="View/LevelGrid.ts" /> 

/// <reference path="../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../Gbase/UI/Button.ts" /> 



module InvertCross.Menu {

    // Class
    export class LevelsMenu extends Gbase.ScreenState {

        private menu: View.ScreenMenu;
        private projectsContaier: createjs.Container;
        private projectViews: Array<View.ProjectView>;

        private popup: View.Popup;
        private message: View.Message;

        private projects;

        // Constructor
        constructor(projects:Array<Projects.Project>) {
            super();
            this.projects = projects;
            this.addObjects();
        }
        
        //--------------------- Initialization ---------------------

        private addObjects() {
            //add Background
            var bg = Assets.getImage("workshop/bgworkshop")
            this.view.addChild(bg);
            var hit = new createjs.Shape();
            hit.graphics.beginFill("F00").drawRect(0, 0, DefaultWidth, DefaultHeight);
            bg.hitArea = hit;


            this.view.mouseChildren = true;
            //add menu
            this.addMenu();

            //adds Projects
            this.addProjects(this.projects);

            //adds popup
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
                var projectView = new View.ProjectView(projects[p]);
                this.projectViews.push(projectView);
                projectsContainer.addChild(projectView);
                projectView.activate();
                projectView.x = DefaultWidth * p; 
            }

            //add to view
            this.view.addChild(projectsContainer);
            this.projectsContaier = projectsContainer;

            //add Inertial movement
            Inertia.addInertia(projectsContainer, true, false, this.view);

            //projectsContainer.addEventListener("onstop", () => {
            //    var f = Math.floor((projectsContainer.x + DefaultWidth / 2) / DefaultWidth) * DefaultWidth
            //    createjs.Tween.get(projectsContainer).to({ x: f }, 300, createjs.Ease.quadOut).call(() => {
            //        for (var pv in this.projectViews) this.projectViews[pv].setRelativePos(this.projectViews[pv].x + projectsContainer.x);
            //    });
            //});


            var fin = (projects.length-1) * DefaultWidth;
            projectsContainer.addEventListener("onmoving", () => {
                if (projectsContainer.x > 0) projectsContainer.x = 0;
                if (projectsContainer.x < -fin) projectsContainer.x = - fin;

                for (var pv in this.projectViews) this.projectViews[pv].setRelativePos(this.projectViews[pv].x + projectsContainer.x);
                

            });
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