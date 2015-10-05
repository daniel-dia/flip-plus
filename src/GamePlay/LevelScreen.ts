declare var items: Array<{ price: Array<number> }>

module FlipPlus.GamePlay {

    //Controller
    export class LevelScreen extends gameui.ScreenState {

        // Display Sprites
        public boardSprite: Views.BoardSprite;
        private fx: Effects;
        
        // Overlays
        protected gameplayMenu: Views.GamePlayMenu;
        protected partsIndicator: Menu.View.CoinsIndicator;
        protected statusArea: Views.StatusArea;
        protected popup: Menu.View.Popup;
        protected popupHelper: Menu.View.PopupHelper;
        protected message: Menu.View.Message;
        protected textEffext: Menu.View.TextEffect;
        protected pauseMenu: Menu.View.PauseMenu;
        // Level
        protected levelLogic: Model.Level;
        protected levelData: Projects.Level;

        public itemsFunctions: any;

        // Used to know the last item used by the user in this level
        protected usedItem: string;
        private itemTimes: Array<number>;
        private paused: boolean;
        // statistics
        private startedTime: number;
        private clicks: number;



        // #region Initialization methodos ==================================================================================================

        constructor(leveldata: Projects.Level) {

            super();

            this.itemsFunctions = {};
            this.itemTimes = <Array<number>>new Object();
            this.clicks = 0;

            // Store level data;
            this.levelData = leveldata;

            // initializate level Model
            this.levelLogic = new Model.Level(leveldata);

            // creates all screen objects
            this.createScene(leveldata);

            // incremente played times
            if (!this.levelData.userdata.playedTimes)
                this.levelData.userdata.playedTimes = 0;

            this.levelData.userdata.playedTimes++;

            this.onback = () => {
                if (this.paused)
                    this.unPauseGame();
                else
                    this.pauseGame();
            };

        }
        // #endregion

        // #region Create Scene =============================================================================================================

        private createScene(leveldata: Projects.Level) {

            //creates a Background
            this.addBackground();

            //initialize board sprites
            this.initializeBoardSprites(leveldata.width, leveldata.height, leveldata.theme, this.levelLogic.getBlocks(), leveldata.type);

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
            this.content.addChild(this.popup)

            this.popupHelper = new Menu.View.PopupHelper();
            this.content.addChild(this.popupHelper)

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
            bg.alpha = 0.4;
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
            this.partsIndicator= new Menu.View.CoinsIndicator();
            this.header.addChild(this.partsIndicator);
            this.partsIndicator.x = defaultWidth / 2;
            
            //upper staus area
            if (FlipPlusGame.projectManager.getCurrentProject() != undefined) {
                var levels: Projects.Level[] = FlipPlusGame.projectManager.getCurrentProject().levels;
                this.statusArea = new Views.StatusArea();
                this.statusArea.y += 80; 
                this.statusArea.setText1("");
                this.statusArea.setText3("");
                this.header.addChild(this.statusArea);
            }

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

        private initializeBoardSprites(width: number, height: number, theme: string, blocks: any, type: string) {

            //AddBoard
            this.boardSprite = new Views.BoardSprite(width, height, theme, type);
            this.content.addChild(this.boardSprite);

            this.boardSprite.x = defaultWidth / 2;
            this.boardSprite.y = defaultHeight / 2;

            this.boardSprite.addInputCallback((col: number, row: number) => { this.userInput(col, row); })
            //TODO create a custom event

        }



        // #endregion

        // #region user input ===============================================================================================================

        // handles user input
        public userInput(col: number, row: number) {

            this.clicks++;
             
            //analytics
            FlipPlusGame.analytics.logClick(this.levelData.name, col, row);

            //invert a cross
            this.levelLogic.invertCross(col, row);

            //update sprites 
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

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
            FlipPlusGame.analytics.logLevelRestart(this.levelData.name, Date.now() - this.startedTime, this.clicks);
            FlipPlusGame.exitLevel();
            gameui.AudiosManager.playSound("Power Down")
        }

        protected restart() {
            FlipPlusGame.analytics.logLevelRestart(this.levelData.name, Date.now() - this.startedTime, this.clicks);
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

            // analytics
            FlipPlusGame.analytics.logLevelWin(this.levelData.name, (Date.now() - this.startedTime) / 100, this.clicks)

            // freze the board
            this.boardSprite.mouseEnabled = false;

            // play a win sound
            gameui.AudiosManager.playSound("final");

            //verifies if user already completed this level and verifies if player used any item in the game
            if (!this.levelData.userdata.solved)
                this.levelData.userdata.item = this.usedItem;

            if (this.usedItem == null)
                this.levelData.userdata.item = null;

            //verifies if is the first time cimpletting the level
            var complete1stTime = false;
            if (!this.levelData.userdata.solved) complete1stTime = true;

            //set model to complete level.
            var projectCompleted = FlipPlusGame.projectManager.getCurrentProject().UserData.complete;
            FlipPlusGame.projectManager.completeLevel(this.levelData);
            
            // send achievement if project was completed
            if (!projectCompleted && FlipPlusGame.projectManager.getCurrentProject().UserData.complete)
                FlipPlusGame.gameServices.submitAchievent("ACH_" + FlipPlusGame.projectManager.getCurrentProject().name);

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
            setTimeout(() => { this.winSwitchScreen(complete1stTime) }, 1800);
        }

        protected winSwitchScreen(complete1stTime: boolean) {

            //remove all tweens
            createjs.Tween.removeTweens(this.boardSprite);
            
            //animate to out
            createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => {
                this.boardSprite.visible = false;
            })

            //switch screen
            FlipPlusGame.completeLevel(complete1stTime);
        }

        protected loose() {

            FlipPlusGame.analytics.logLevelLoose(this.levelData.name, Date.now() - this.startedTime, this.clicks)

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

            // increase the times counter
            var times = this.itemTimes[item];
            if (!times) times = 0;

            // get item price
            var price = items[item].price[times];

            // return the selected price
            if (price) return price;

            // if there is no more prices, get the highest price
            return items[item].price[items[item].price.length - 1];
        }

        // list all item prices
        private listItemPrices(): Array<number> {

            var list = new Object();
            for (var item in items)
                list[item] = this.getItemPrice(item);

            return <Array<number>>list;
        }

        // use an item
        protected useItem(item: string,parameters?:any, free?: boolean): boolean {

            //analytics
            FlipPlusGame.analytics.logUsedItem(item, this.levelData.name);

            // define item value based on how many times it was used on the level
            var value = this.getItemPrice(item);

            // if item is skip and the level was already skipped, then does not waste parts.
            if (item == Items.SKIP && (this.levelData.userdata.skip || this.levelData.userdata.solved))
                value = 0;

            //if user is able to use this item
            var coinsAmount = FlipPlusGame.coinsData.getAmount()
            if (free || coinsAmount >= value) {

                if (!free) {
                    // saves item used information
                    if (!this.itemTimes[item]) this.itemTimes[item] = 0;
                    this.itemTimes[item]++;

                    // updates data
                    if (item != Items.HINT) this.usedItem = item;

                    // updates player coins
                    FlipPlusGame.coinsData.decreaseAmount(value);

                    // animate coins
                    var btx = this.gameplayMenu.getButtonPosition(item);
                    if(btx) 
                        this.partsIndicator.createCoinEffect(btx - 768, this.footer.y - this.header.y - 100, value);
                    else
                        this.partsIndicator.createCoinEffect(0, 1024 - this.header.y, value);

                    //show text effect
                    this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());

                    //updates Items buttons labels Quantity on footer
                    this.partsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
                }

                this.gameplayMenu.updateItemsPrice(this.listItemPrices());

                // use the item
                switch (item) {
                    case Items.SKIP:  this.useItemSkip(); break;
                    case Items.SOLVE: this.useItemSolve(); break;
                    case Items.HINT: this.useItemHint(parameters); break;
                    case Items.TIME: this.useItemTime(); break;
                    case Items.TAP: this.useItemTap(); break;
                }

                return true;

            } else {
                //show text effect
                this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());
                this.popup.showtextBuy(StringResources.gp_noMoreSkip, StringResources.gp_noMoreHints,this);

                return false;
            }
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

                // save used hint on level
                this.levelData.userdata.hints = this.levelData.userdata.hints || [];
                this.levelData.userdata.hints.push(blockId);
                
                // saves 
                FlipPlusGame.projectData.saveLevelData(this.levelData);
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

        protected pauseGame() {

            this.paused = true;
            this.boardSprite.lock();
            var med = defaultWidth / 4;

            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(() => {
                this.boardSprite.visible = false;
            });

            this.gameplayMenu.fadeOut();
            this.pauseMenu.fadeIn();
            this.pauseMenu.updateSkipPrice(this.getItemPrice("skip"));
        }

        protected unPauseGame() {
            this.paused = false;
            this.boardSprite.unlock();
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
            this.boardSprite.scale.x = parameters.scale.x;
            this.boardSprite.scale.y = parameters.scale.y;
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: defaultWidth / 2, y: defaultHeight / 2 }, 500, createjs.Ease.quadInOut);
        }

        // #endregion

        // #region  Screen ===================================================================================================================

        public activate(parameters?: any) {

            super.activate(parameters);
            if (parameters) this.animatePuzzle(parameters);


            // play music
            gameui.AudiosManager.playMusic("Music Minimal Tech");

            // analytics
            this.startedTime = Date.now();

            // updates Items buttons labels Quantity on footer
            this.partsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
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
    }
}