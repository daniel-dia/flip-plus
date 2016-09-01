module FlipPlus.GamePlay {

    //Controller
    export class LevelScreen extends gameui.ScreenState {

        // #region  properties

        // Display Sprites
        public boardSprite: Views.BoardSprite;
        private fx: Effects;
        
        // Overlays
        protected gameplayMenu: Views.GamePlayMenu;
        protected coinsIndicator: Menu.View.CoinsIndicator;
        protected statusArea: Views.StatusArea;
        protected popup: Menu.View.Popup;
        protected popupHelper: Menu.View.PopupHelper;
        protected message: Menu.View.Message;
        protected textEffext: Menu.View.TextEffect;
        protected pauseMenu: Menu.View.PauseMenu;

        // Level
        protected levelLogic: Logic.Level;
        protected levelData: Levels.Level;

        public itemsFunctions: any;

        // Used to know the last item used by the user in this level
        protected usedItem: string;
        private itemTimes: Array<number>;
        private paused: boolean;

        // statistics
        private startedTime: number;
        private clicks: number;

        // Tutorial
        private currentTutorialStep: number = 0;
        private tutorialSteps: Array<Levels.tutorialStep>;
        private tutorialStepsEnd: Array<Levels.tutorialStep>;
        private endTutorial: () => any;
        private tutorialOldWin: any;

        // #endregion

        // #region Initialization methodos ==================================================================================================

        constructor(leveldata: Levels.Level) {

            super();

            window.onkeydown = (e) => {
                if (e.char == "s") {
                    this.win(0, 0);
                }
            };

            this.itemsFunctions = {};
            this.clicks = 0;

            // Store level data;
            this.levelData = leveldata;

            // Initialize items history
            this.itemTimes = <Array<number>>new Object();
            if (this.levelData.userdata.hints) this.itemTimes[Items.HINT] = this.levelData.userdata.hints.length;

            // Initializate level Model
            this.levelLogic = new Logic.Level(leveldata);

            // creates all screen objects
            this.createScene(leveldata);

            // incremente played times
            if (!this.levelData.userdata.playedTimes)
                this.levelData.userdata.playedTimes = 0;
            this.levelData.userdata.playedTimes++;

            // analytics
            this.startedTime = Date.now();
            FlipPlusGame.analytics.logLevelStart(this.levelData.projectId, this.levelData.leveld, this.levelData.userdata.playedTimes)
                
            // menu back option
            this.onback = () => {
                if (this.paused)
                    this.unPauseGame();
                else
                    this.pauseGame();
            };

            // initialize tutorials
            this.initializeTutorial(leveldata);

        }
        // #endregion

        // #region Create Scene =============================================================================================================

        private createScene(leveldata: Levels.Level) {

            //creates a Background
            this.addBackground();

            //initialize board sprites
            this.createBoardSprite(leveldata.width, leveldata.height, leveldata.theme);

            //initialize overlay
            this.initializeOverlays();

            //adds message
            this.message = new Menu.View.Message();
            this.content.addChild(this.message);

            //adds text effext
            this.textEffext = new Menu.View.TextEffect();
            this.content.addChild(this.textEffext);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.overlay.addChild(this.popup)

            this.popupHelper = new Menu.View.PopupHelper();
            this.overlay.addChild(this.popupHelper)

            this.popup.addEventListener("onshow", () => {
                this.gameplayMenu.fadeOut();
                this.boardSprite.mouseEnabled = false;
            });
            this.popup.addEventListener("onclose", () => {
                this.gameplayMenu.fadeIn();
                this.boardSprite.mouseEnabled = true;
            });
            this.popupHelper.addEventListener("onshow", () => {
                this.gameplayMenu.fadeOut();
                this.boardSprite.mouseEnabled = false;
            });
            this.popupHelper.addEventListener("onclose", () => {
                this.gameplayMenu.fadeIn();
                this.boardSprite.mouseEnabled = true;
            });
          
            gameui.AudiosManager.playSound("Power Up")
        }

        private addBackground() {
            var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
            this.content.addChild(bg);
            bg.y = -339;
            bg.scale.y = 1.3310546875;
            bg.tint = 0x646464;
        }

        private initializeOverlays() {

            //intialize  menu overlay
            this.gameplayMenu = new Views.GamePlayMenu();
            this.gameplayMenu.y = -100;
            this.gameplayMenu.x = this.gameplayMenu.pivot.x = 1500;
            this.footer.addChild(this.gameplayMenu);

            //level control
            this.gameplayMenu.addEventListener("pause", () => { this.pauseGame(); });
            this.gameplayMenu.addEventListener("unpause", () => { this.unPauseGame(); });
            this.gameplayMenu.addEventListener("restart", () => {this.restart();});
            this.gameplayMenu.addEventListener("back", () => {this.exit();});

            // parts Indicator
            this.coinsIndicator = new Menu.View.CoinsIndicator(() => {
                FlipPlusGame.showShopMenu(this);
            });

            this.header.addChild(this.coinsIndicator);
            this.coinsIndicator.x = defaultWidth / 2;

            //upper staus area
            this.statusArea = new Views.StatusArea();
            this.statusArea.y += 80; 
            this.statusArea.setText1("");
            this.statusArea.setText3("");
            this.header.addChild(this.statusArea);

            //pause menu
            this.pauseMenu = new Menu.View.PauseMenu();
            this.pauseMenu.x = defaultWidth / 2;
            this.pauseMenu.y = defaultHeight / 2;
            this.pauseMenu.addEventListener("continue", () => { this.unPauseGame() });
            this.pauseMenu.addEventListener("restart", () => { this.restart() });
            this.pauseMenu.addEventListener("skip", () => { this.unPauseGame(); this.gameplayMenu.fadeOut(); this.useItem("skip") });
            this.pauseMenu.addEventListener("leave", () => { this.exit() });

            this.content.addChild(this.pauseMenu);
        }

        protected createBoardSprite(width: number, height: number, theme: string) {

            // remove if there is alread a board
            if (this.boardSprite)
                this.content.removeChild(this.boardSprite);

            // create and add board
            this.boardSprite = new Views.BoardSprite(width, height, theme);
            this.content.addChild(this.boardSprite);

            // position board
            this.boardSprite.x = defaultWidth / 2;
            this.boardSprite.y = defaultHeight / 2;

            this.boardSprite.addInputCallback((col: number, row: number) => { this.userInput(col, row); })
        }
        
        // #endregion

        // #region user input ===============================================================================================================

        // handles user input
        public userInput(col: number, row: number) {

            this.clicks++;
             
            //analytics
            FlipPlusGame.analytics.logLevelBlockClick(this.levelData.name, col, row);

            //invert a cross
            this.levelLogic.invertCross(col, row);

            //update sprites 
            this.boardSprite.updateCross(this.levelLogic.board.blocks, col, row);
            //this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            //verifies prize
            if (this.levelLogic.verifyPrize())
                this.earnPrize(col, row);

            //verifies winning
            if (this.levelLogic.verifyWin())
                this.win(col, row);

            this.levelLogic.moves++;

        }

        // #endregion

        // #region  GamePlay methods =========================================================================================================

        protected exit() {
            FlipPlusGame.analytics.logProgressionExit(this.levelData.projectId, this.levelData.leveld, this.levelData.userdata.playedTimes);
            FlipPlusGame.exitLevel();
            gameui.AudiosManager.playSound("Power Down")
        }

        protected restart() {
            FlipPlusGame.analytics.logProgressionRestart(this.levelData.projectId, this.levelData.leveld, this.levelData.userdata.playedTimes, Date.now() - this.startedTime, this.clicks);
            FlipPlusGame.replayLevel();
            gameui.AudiosManager.playSound("Power Down")
        }

        private earnPrize(col: number, row: number) {

            this.levelLogic.earnPrize();
            setTimeout(() => {

                //playSound
                gameui.AudiosManager.playSound("Task Complete");

                //apply radius effect
                this.boardSprite.radiusEffect(col, row)

            }, 50);
        }

        protected win(col: number, row: number, messageText: boolean= true) {
            window.onkeydown = null;
            // analytics
            var time = (Date.now() - this.startedTime)

            //FlipPlusGame.analytics.logLevelWin(this.levelData.name, time , this.clicks)
            FlipPlusGame.analytics.logProfessionWin(this.levelData.projectId, this.levelData.leveld, this.levelData.userdata.playedTimes, time, this.clicks)

            // freze the board
            this.boardSprite.interactive = false;
            this.boardSprite.interactiveChildren = false;

            // play a win sound
            gameui.AudiosManager.playSound("final");

            //verifies if user already completed this level and verifies if player used any item in the game
            if (!this.levelData.userdata.solved)
                this.levelData.userdata.item = this.usedItem;

            if (this.usedItem == null)
                this.levelData.userdata.item = null;

            //verifies if is the first time cimpletting the level
            var complete = true;
            var first = false;
            if (!this.levelData.userdata.solved) first = true;

            var currentProject = FlipPlusGame.levelsManager.getCurrentProject();
            var projectCompleted = currentProject.UserData.complete;

            //set user data to complete level.
            FlipPlusGame.levelsManager.completeLevel(this.levelData);
            
            // send achievement if project was completed
            if (!projectCompleted && currentProject.UserData.complete)
                FlipPlusGame.gameServices.submitAchievent("ACH_" + currentProject.name);

            //change screen and animate.
            if (messageText)
                this.textEffext.showtext(StringResources.gp_finishPuzzle, 2000, 1200);

            //hide all menus
            this.gameplayMenu.fadeOut();
            this.boardSprite.lock();

            //apply effect on sprites
            setTimeout(() => {
                this.boardSprite.winEffect(col, row)
            }, 200);

            //animates board to fade out;
            setTimeout(() => {
                this.winSwitchScreen(complete,first)
            }, 1000);
        }

        protected winSwitchScreen(complete: boolean, first: boolean) {

            //remove all tweens
            createjs.Tween.removeTweens(this.boardSprite);
            
            //animate to out
            createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => {
                this.boardSprite.visible = false;
            })

            //switch screen
            FlipPlusGame.completeLevel(complete,first);
        }

        protected loose() {

            var time = (Date.now() - this.startedTime)
            //FlipPlusGame.analytics.logLevelLoose(this.levelData.name, time, this.clicks)
            FlipPlusGame.analytics.logProfressionLoose(this.levelData.projectId, this.levelData.leveld, this.levelData.userdata.playedTimes, time, this.clicks)

            this.boardSprite.mouseEnabled = false;

            this.gameplayMenu.fadeOut();
            this.boardSprite.lock();
            this.boardSprite.looseEffect();
            setTimeout(() => { FlipPlusGame.looseLevel(); }, 3000);;

        }
        
        // #endregion

        // #region  Items ====================================================================================================================

        // get item value based on how many times it has been used.
        protected getItemPrice(item): number {
            
            var timesUsed = this.itemTimes[item];
            var levelSetId = parseInt(this.levelData.projectId) + 1;
            return UserData.ItemsManager.calculateItemPrice(item, levelSetId, timesUsed);
        }

        // list all item prices
        private listItemPrices(): Array<number> {
            var items = UserData.ItemsManager.itemsNames;
            var list = new Object();

            for (var i in items) {
                var item = items[i]
                list[item] = this.getItemPrice(item);
            }

            return <Array<number>>list;
        }

        // use an item
        protected useItem(item: string, parameters?:any, free?: boolean): boolean {

            // define item value based on how many times it was used on the level
            var price = this.getItemPrice(item);

            //analytics
            FlipPlusGame.analytics.logUsedItem(item, this.levelData.name, price);
            
            // if item is skip and the level was already skipped, then does not waste parts.
            if (item == Items.SKIP && (this.levelData.userdata.skip || this.levelData.userdata.solved))
                price = 0;

            //if user is able to use this item
            var coinsAmount = FlipPlusGame.coinsData.getAmount()
            if (free || coinsAmount >= price) {

                // purchase a item using parts
                if (!free) {

                    // saves item used information
                    if (!this.itemTimes[item]) this.itemTimes[item] = 0;
                    this.itemTimes[item]++;

                    // updates data
                    if (item != Items.HINT) this.usedItem = item;
                                       
                    // updates player coins
                    FlipPlusGame.coinsData.decreaseAmount(price);

                    // animate coins
                    this.animateCoins(item, price);

                    //show text effect
                    this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());

                    //updates Items buttons labels Quantity on footer
                    this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
                }

                this.gameplayMenu.updateItemsPrice(this.listItemPrices());

                // use the item
                switch (item) {
                    case Items.SKIP:  this.useItemSkip(); break;
                    case Items.SOLVE: this.useItemSolve(); break;
                    case Items.HINT:  this.useItemHint(parameters); break;
                    case Items.TIME:  this.useItemTime(); break;
                    case Items.TAP:   this.useItemTap(); break;
                }

                return true;

            } else {
                //show text effect
                this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());
                this.pauseGame(false);
                this.popup.showtextBuy(StringResources.gp_noMoreSkip, StringResources.gp_noMoreHints, this,90000);
                this.popup.once("onclose", () => { this.unPauseGame(false) });
                return false;
            }
        }

        // cast a animation for the part moving
        protected animateCoins(item:string, price:number) {
            var btx = this.gameplayMenu.getButtonPosition(item);
            if (btx)
                this.coinsIndicator.createCoinEffect(btx - 768, this.footer.y - this.header.y - 100, price);
            else
                this.coinsIndicator.createCoinEffect(0, 1024 - this.header.y, price);
        }

        //skips the level
        protected useItemSkip() {

            
            this.boardSprite.mouseEnabled=false;
            this.gameplayMenu.mouseEnabled = false;
            
           setTimeout(() => {
               if (this.levelData.userdata.skip || this.levelData.userdata.solved)
                   FlipPlusGame.skipLevel(false);
               else
                   FlipPlusGame.skipLevel(true);
           }, 3000);
        }

        //set hint for a block
        protected useItemHint(blockId?:number) {

            // if the hint block is not pre defined
            if (typeof blockId != "number") {

                //get all inverted blocks
                var filtredInvertedBlocks = [];
                var invertedBlocks = this.levelLogic.board.getInvertedBlocks();
                for (var i in invertedBlocks) {
                    //remove the already hinted from the list
                    if (!this.boardSprite.getBlockById(invertedBlocks[i]).isHintEnabled())
                        filtredInvertedBlocks.push(invertedBlocks[i]);
                }

                //if theres no inverted itens, return
                if (filtredInvertedBlocks.length == 0) return;

                //randomly select one from the list
                var index = Math.floor(Math.random() * filtredInvertedBlocks.length);
                blockId = filtredInvertedBlocks[index];

                // save used hint on level ;; only if blocks data are fixed.
                if (this.levelData.blocksData && this.levelData.blocksData.length > 0) {
                    this.levelData.userdata.hints = this.levelData.userdata.hints || [];
                    this.levelData.userdata.hints.push(blockId);
                }
                
                // saves 
                FlipPlusGame.levelsUserDataManager.saveLevelData(this.levelData);
            }

            // enablehint for the selected block;
            this.boardSprite.getBlockById(blockId).enableHint();

        }

        //set hint for a solve
        protected useItemSolve() {
            this.win(0, 0);
        }

        //ovveridable
        protected useItemTime() {
        }

        //ovveridable
        protected useItemTap() {
        }
        // #endregion
        
        // #region Menus ====================================================================================================================

        protected pauseGame(changeMenu: boolean = true) {

            this.paused = true;
            this.boardSprite.lock();

            if (!changeMenu) return;
            var med = defaultWidth / 4;

            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(() => {
                this.boardSprite.visible = false;
            });

            this.gameplayMenu.fadeOut();
            this.pauseMenu.fadeIn();
            this.pauseMenu.updateSkipPrice(this.getItemPrice("skip"));
        }

        protected unPauseGame(changeMenu: boolean = true) {
            this.paused = false;
            this.boardSprite.unlock();

            if (!changeMenu) return;

            var med = defaultWidth / 4;

            this.boardSprite.scale.x = 0.5;
            this.boardSprite.alpha = 0;
            this.boardSprite.visible = true;

            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150, createjs.Ease.circOut);

            this.gameplayMenu.fadeIn();
            this.pauseMenu.fadeOut();
        }

        protected animatePuzzle(parameters) {
            this.boardSprite.x = parameters.x;
            this.boardSprite.y = parameters.y + 2048;
            this.boardSprite.scale.x = parameters.scaleX;
            this.boardSprite.scale.y = parameters.scaleY;
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: defaultWidth / 2, y: defaultHeight / 2 }, 500, createjs.Ease.quadInOut);
        }

        // #endregion

        // #region  Screen ===================================================================================================================

        public activate(parameters?: any) {
            super.activate(parameters);

            //start tutorial steps (if any)
            this.activateTutorial();

            if (parameters) this.animatePuzzle(parameters);
            
            // play music
            gameui.AudiosManager.playMusic("Music Minimal Tech");
            
            // updates Items buttons labels Quantity on footer
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
            this.gameplayMenu.updateItemsPrice(this.listItemPrices());
            
            // update hints already used
            if (this.levelData.userdata.hints)
                for (var h in this.levelData.userdata.hints)
                    this.useItem(Items.HINT, this.levelData.userdata.hints[h],true);

            // if there are hidden blocks. shake and lock the board for 4 seconds
            if (this.levelData.hiddenBlocks && this.levelData.hiddenBlocks.length > 0) {
                var x = defaultWidth / 2;
                var t = 100;
                this.boardSprite.mouseEnabled = false;
                createjs.Tween.get(this.boardSprite)
                    .wait(500)
                    .to({ x: x - 5 }, 0).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .wait(200)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .wait(200)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .wait(200)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .to({ x: x - 5 }, t).to({ x: x + 5 }, t)
                    .wait(200).call(() => { this.boardSprite.mouseEnabled = true; });


            }

        }
        // #endregion

        // #region Tutorial =================================================================================================================

        // initiate tutorial
        private initializeTutorial(levelData: Levels.Level) {

            this.tutorialSteps = [];
            this.tutorialStepsEnd = []

            this.endTutorial = () => {
                this.boardSprite.tutorialRelease();
            }

            for (var t in levelData.tutorial) 
                if (levelData.tutorial[t].atEnd)
                    this.tutorialStepsEnd.push(levelData.tutorial[t]);
                else
                    this.tutorialSteps.push(levelData.tutorial[t]);

            this.initializeTutorialEnd();
        }

        private activateTutorial() {
            this.playNextTurorialStep();
        }

        // create tutorial steps and callbacks
        private executeTutorialActions(step: Levels.tutorialStep) {

            //create for text step
            if (step.text) {

                var text =  StringResources[step.text];
                var title = StringResources[step.title];
                var image = step.image;
                this.boardSprite.lock();
                
                this.popup.showTextImage(title, text, image);
                var listener = this.popup.once("onclose", () => {
                    this.playNextTurorialStep();
                    this.boardSprite.unlock();
                });
            }

            //create for menu item step
            if (step.item) {
                this.boardSprite.tutorialLockBlocks();
                this.gameplayMenu.tutorial_HighlightItem(step.item, step.parameter);
                var listener2 = this.gameplayMenu.once(step.item, () => {
                    this.boardSprite.tutorialRelease();
                    this.gameplayMenu.tutorial_unlockAllButtons();
                    this.playNextTurorialStep();
                });
            }

            //create for block item clicks
            if (step.clicks) {

                var listeners = new Array<PIXI.EventEmitter>();
                for (var c in step.clicks) {
                    //this.boardSprite.tutorialHighlightBlocks(step.clicks[c]);
                    //this.gameplayMenu.tutorial_lockAllButtons();
                    //
                    //this.boardSprite.once("ontutorialclick", next);
                    //
                    //var next = ()=>{
                    //    this.playNextTurorialStep();
                    //    this.gameplayMenu.tutorial_unlockAllButtons();
                    //}
                }
            }

            //create for block item click
            if (step.click != undefined) {
                this.boardSprite.tutorialHighlightBlocks(step.click);
                this.gameplayMenu.tutorial_lockAllButtons();
                var listener5 = this.boardSprite.once("ontutorialclick", () => {
                    this.playNextTurorialStep();
                    this.gameplayMenu.tutorial_unlockAllButtons();
                });
            }
        }

        // play next tutorial step
        private playNextTurorialStep() {

            //Execute one more tutorial step
            if (this.currentTutorialStep < this.tutorialSteps.length) {
                this.executeTutorialActions(this.tutorialSteps[this.currentTutorialStep]);
                this.currentTutorialStep++;
            }
            else
                this.endTutorial();

        }

        // tutorial at Win // TODO
        private initializeTutorialEnd() {
            this.tutorialOldWin = this.win;
            
            var tutorialWin = (col: number, row: number) => {

                if (this.tutorialStepsEnd.length == 0)
                    this.tutorialOldWin(col, row);
                else {
                    this.boardSprite.mouseEnabled = false;

                    setTimeout(() => {
                        this.currentTutorialStep = 0;
                        this.tutorialSteps = this.tutorialStepsEnd;

                        this.playNextTurorialStep();

                        this.endTutorial = () => {
                            this.tutorialOldWin(col, row, false);
                        }

                    }, 500);
                }
            }

            this.win = tutorialWin;
        }


        // #endregion
    }
}