module FlipPlus.Menu {

    export class LevelsMenu extends gameui.ScreenState {

        private menu: View.ScreenMenu;
        private projectsContainer: createjs.Container;
        private projectViews: Array<View.ProjectWorkshopView>;

        private popup: View.Popup;
        private message: View.Message;

        private pagesSwipe: PagesSwipe;

        private factorySound: createjs.SoundInstance;

        //just to know when a user finished a project
        private projectPreviousState: Object = {};

        // Constructor
        constructor() {

            super();

            this.addObjects();
            this.pagesSwipe = new PagesSwipe(this.projectsContainer, this.projectViews, defaultWidth, 200, 1500);
            this.createPaginationButtons(this.projectsContainer)

        }
        
        //--------------------- Initialization ---------------------

        private addObjects() {
            //add Background
            var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
            this.content.addChild(bg);
            bg.scaleY = 1.3310546875;
            bg.y = -339;
            
            
            //create projects container
            this.projectsContainer = new createjs.Container();

            //creates projectViews array
            this.projectViews = new Array();

            //add to view
            this.content.addChild(this.projectsContainer);
             
            //adds Projects
            this.addProjects();

            //add menu
            this.addMenu();
            
            //adds popup and messages
            this.popup = new View.Popup();
            this.content.addChild(this.popup);

            this.message = new View.Message();
            this.content.addChild(this.message);

        }

        //Adds menu to screen;
        private addMenu() {
            this.menu = new View.ScreenMenu();
            
            //TODO fazer camada intermediaria
            //TODO o options sempre volta pro menu principal. O_o
            
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions(); });
            this.menu.addEventListener("back", () => { this.back();});
            this.header.addChild(this.menu);

        }

        //inertia fx
        private offset = 0;
        private lastx = 0;

        //adds all projects in swipe view
        private addProjects() {
            

            //pega projetos
            var projects = FlipPlusGame.projectManager.getUnlockedProjects();

            //add every project
            for (var p = this.projectViews.length; p < projects.length;p++) {
                var projectView = new View.ProjectWorkshopView(projects[p]);
                this.projectViews.push(projectView);
                projectView.activate();
                projectView.x = defaultWidth * p; 
                projectView.addEventListener("levelClick", (e: createjs.Event) => { this.openLevel(e) });

                this.projectsContainer.addChild(projectView);
            }   

            
            
        }

        private openLevel(event: createjs.Event) {

            //cancel click in case of drag
            if (this.pagesSwipe.cancelClick) return;

            var level: Projects.Level = <Projects.Level>event.target['level'];
            var parameters = event.target['parameters']

            if (level != null)
                if (level.userdata.unlocked)
                    FlipPlusGame.showLevel(level, parameters);
        }

        public back() {
            FlipPlus.FlipPlusGame.showProjectsMenu();
        }
        // ----------------------- pagination -------------------------------------------------------

        private createPaginationButtons(pagesContainer: createjs.Container) {
            //create leftButton
            var lb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoPreviousPage() },"buttonOut");
            lb.y = 1050;
            lb.x = defaultWidth * 0.1;
            this.content.addChild(lb);

            //create right button
            var rb: gameui.Button = new gameui.ImageButton("projects/btpage", () => { this.pagesSwipe.gotoNextPage() });
            rb.y = 1050;
            rb.x = defaultWidth * 0.9;
            rb.scaleX = -1;
            this.content.addChild(rb);

        }           
 
        //--Behaviour-----------------------------------------------------------

        public redim(headerY: number, footerY: number, width: number,height:number) {
            super.redim(headerY, footerY, width, height);

            for (var pv in this.projectViews)
                this.projectViews[pv].redim(headerY, footerY);
        }
        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            this.factorySound.stop();
            delete this.factorySound;
        }

        public activate(parameters?: any) {

            super.activate();


            // play music
            gameui.AudiosManager.playMusic("Music Dot Robot",0.5);
            this.factorySound = gameui.AudiosManager.playSound("Factory Ambience");
            this.factorySound.setVolume(0.4);

            //update enabled Projects
            this.addProjects();

            //update all projects views
            for (var pv in this.projectViews) {
                var project = FlipPlusGame.projectManager.getProjectByName(this.projectViews[pv].name);

                if (project == FlipPlusGame.projectManager.getCurrentProject()) {
                    
                    //activate current project
                    this.projectViews[pv].activate(parameters);

                    //goto current project
                    this.pagesSwipe.gotoPage(parseInt( pv), false);

                    //if complete changes to myBotScreen
                    if (project.UserData.complete && this.projectPreviousState[project.name]==false) {
                        this.footer.mouseEnabled = false;
                        this.content.mouseEnabled = false;
                        this.header.mouseEnabled = false;
                        setTimeout(() => {
                            this.footer.mouseEnabled = true;
                            this.content.mouseEnabled = true;
                            this.header.mouseEnabled = true;
                        
                            FlipPlusGame.showMainMenu();
                        }, 3500);
                    }
                }
                
                //store last state
                this.projectPreviousState[project.name] = project.UserData.complete;
            }            
        }
    }
}