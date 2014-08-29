var DefaultWidth = 1536;
var DefaultHeight = 2048 - 8;
var defaultFont = "'Exo 2.0'";

var defaultFontFamilyNormal = " 80px  " + defaultFont;
var defaultFontFamilyStrong = " 80px " + defaultFont;
var defaultFontFamilyHighlight = " Bold 130px " + defaultFont;
var defaultNumberHighlight = " 220px " + defaultFont;

var defaultFontColor = "#FF6";
var highlightFontColor = "#f2cb46";
var alternativeFontColor = "#3d8c9a";
var shadowFontColor = "#1b4f5e";
var grayColor = "#565656";

var storagePrefix = "flipp_";
//declare var spriteSheets;
window.onload = function () {
    FlipPlus.FlipPlusGame.initializeGame();
};

var FlipPlus;
(function (FlipPlus) {
    // Main game Class
    // Controller
    var FlipPlusGame = (function () {
        function FlipPlusGame() {
        }
        // ----------------------------- Initialization -------------------------------------------//
        FlipPlusGame.initializeGame = function () {
            var _this = this;
            assetscale = 1;
            if (window.innerWidth <= 1024)
                assetscale = 0.5;
            if (window.innerWidth <= 420)
                assetscale = 0.25;
            assetscale = 0.5;

            this.gameScreen = new gameui.GameScreen("myCanvas", DefaultWidth, DefaultHeight);

            //userData
            this.projectData = new FlipPlus.UserData.ProjectsData();
            this.settings = new FlipPlus.UserData.Settings();
            this.itemsData = new FlipPlus.UserData.Items();
            this.storyData = new FlipPlus.UserData.Story();
            this.timersData = new FlipPlus.UserData.Timers();

            // analytics
            this.analytics = new Analytics();
            this.analytics.logGameStart();

            //managers
            this.projectManager = new FlipPlus.Projects.ProjectManager(levelsData, this.projectData);

            //go to First Screen
            this.loadingScreen = new FlipPlus.Menu.Loading();
            this.gameScreen.switchScreen(this.loadingScreen);

            this.loadingScreen.loaded = function () {
                if (levelCreatorMode == true && !levelCreatorTestMode) {
                    _this.gameScreen.switchScreen(new FlipPlus.GamePlay.LevelCreator(null, window));
                } else
                    _this.showTitleScreen();
            };

            //TODO tirar daqui
            if (this.itemsData.getItemQuantity("hint") <= 0)
                this.itemsData.setQuantityItem("hint", 5);

            if (this.itemsData.getItemQuantity("skip") <= 0)
                this.itemsData.setQuantityItem("skip", 1);
        };

        // ----------------------------- Game Methods ---------------------------------------------//
        FlipPlusGame.showProjectsMenu = function () {
            this.levelScreeen = null;

            if (this.projectsMenu == null)
                this.projectsMenu = new FlipPlus.Menu.ProjectsMenu();

            this.gameScreen.switchScreen(this.projectsMenu);
        };

        FlipPlusGame.showProjectLevelsMenu = function (project, parameters) {
            //verifies the current projet
            if (project == null)
                project = this.projectManager.getCurrentProject();
            else
                this.projectManager.setCurrentProject(project);

            if (project == null)
                return;

            var projects = this.projectManager.getAllProjects();

            //create a new levels menu, if needed
            if (this.levelsMenu == undefined)
                this.levelsMenu = new FlipPlus.Menu.LevelsMenu();

            //switch screens
            this.gameScreen.switchScreen(this.levelsMenu, parameters);
        };

        FlipPlusGame.showBonus = function (bonusId) {
            var bonusScreen;
            switch (bonusId) {
                case "Bonus1":
                    bonusScreen = new FlipPlus.Bonus.BonusBarrel(FlipPlus.UserData.Items.itemsNames);
                    break;
                case "Bonus2":
                    bonusScreen = new FlipPlus.Bonus.Bonus2(FlipPlus.UserData.Items.itemsNames);
                    break;
                case "Bonus3":
                    bonusScreen = new FlipPlus.Bonus.Bonus3(FlipPlus.UserData.Items.itemsNames);
                    break;
                default:
            }

            //restart time
            this.timersData.setTimer(bonusId, bonusData[bonusId].timeOut);

            this.gameScreen.switchScreen(bonusScreen);
        };

        FlipPlusGame.showLevel = function (level, parameters) {
            this.projectManager.setCurrentLevel(level);
            this.levelScreeen = this.createLevel(level);
            this.gameScreen.switchScreen(this.levelScreeen, parameters);
        };

        FlipPlusGame.createLevel = function (level) {
            switch (level.type) {
                case "puzzle":
                case "draw":
                    return new FlipPlus.GamePlay.Puzzle(level);
                case "moves":
                case "flip":
                case "combo":
                    return new FlipPlus.GamePlay.Moves(level);
                case "tutorial":
                    return new FlipPlus.GamePlay.Tutorial(level);
                case "time":
                    return new FlipPlus.GamePlay.TimeAtack(level);
            }

            return null;
        };

        FlipPlusGame.completeLevel = function (complete) {
            if (typeof complete === "undefined") { complete = false; }
            this.showProjectLevelsMenu(null, { complete: complete });
        };

        FlipPlusGame.looseLevel = function () {
            this.showProjectLevelsMenu(null, { loose: true });
        };

        FlipPlusGame.exitLevel = function () {
            this.showProjectLevelsMenu();
        };

        FlipPlusGame.showNextLevel = function () {
            var nextLevel = this.projectManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                this.showLevel(nextLevel);
            else
                this.exitLevel();
        };

        FlipPlusGame.skipLevel = function (complete) {
            if (typeof complete === "undefined") { complete = false; }
            var currentLevel = this.projectManager.getCurrentLevel();

            this.projectManager.skipLevel(currentLevel);
            this.showProjectLevelsMenu(null, { complete: complete });
        };

        FlipPlusGame.showMainMenu = function () {
            if (this.mainScreen == null)
                this.mainScreen = new FlipPlus.Menu.MainMenu();

            this.gameScreen.switchScreen(this.mainScreen);
        };

        FlipPlusGame.showTitleScreen = function () {
            if (!this.titleScreen)
                this.titleScreen = new FlipPlus.Menu.TitleScreen();
            this.gameScreen.switchScreen(this.titleScreen);
        };

        FlipPlusGame.replayLevel = function () {
            var currentLevel = this.projectManager.getCurrentLevel();
            this.showLevel(currentLevel);
        };

        FlipPlusGame.completeProjectk = function (project) {
            this.gameScreen.switchScreen(this.mainScreen);
        };

        FlipPlusGame.endGame = function () {
        };

        FlipPlusGame.showOptions = function () {
            this.gameScreen.switchScreen(new FlipPlus.Menu.OptionsMenu());
        };

        // ---------------------------- license --------------------------------------------------//
        FlipPlusGame.isFree = function () {
            return false;
        };
        return FlipPlusGame;
    })();
    FlipPlus.FlipPlusGame = FlipPlusGame;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (UserData) {
        // Class
        var Items = (function () {
            function Items() {
                var data = localStorage.getItem(storagePrefix + "items");
                if (data)
                    this.itensDictionary = JSON.parse(data);
                else
                    this.itensDictionary = new Object();
            }
            Items.prototype.getItemNames = function () {
                return ["hint", "hint", "hint", "hint", "hint", "skip", "solve", "time", "touch"];
            };

            Items.prototype.getItemQuantity = function (item) {
                if (this.itensDictionary[item])
                    return this.itensDictionary[item];
                else
                    return 0;
            };

            Items.prototype.setQuantityItem = function (item, value) {
                this.itensDictionary[item] = value;
                localStorage.setItem(storagePrefix + "items", JSON.stringify(this.itensDictionary));
            };

            Items.prototype.increaseItemQuantity = function (item, value) {
                if (typeof value === "undefined") { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq >= 10)
                    return;
                this.setQuantityItem(item, value + iq);
            };

            Items.prototype.decreaseItemQuantity = function (item, value) {
                if (typeof value === "undefined") { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq < value)
                    return;
                this.setQuantityItem(item, iq - value);
            };
            Items.itemsNames = ["hint", "skip", "solve", "time", "touch"];
            return Items;
        })();
        UserData.Items = Items;
    })(FlipPlus.UserData || (FlipPlus.UserData = {}));
    var UserData = FlipPlus.UserData;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (UserData) {
        // Class
        var Settings = (function () {
            function Settings() {
                this.soundFX = true;
                this.music = true;
                this.soundFX = (localStorage.getItem("sfx") != "false");
                this.music = (localStorage.getItem("mus") != "false");
            }
            Settings.prototype.getMusic = function () {
                return this.music;
            };
            Settings.prototype.getSoundfx = function () {
                return this.soundFX;
            };

            Settings.prototype.setSoundfX = function (value) {
                localStorage.setItem("sfx", "" + value);
                this.soundFX = value;
            };

            Settings.prototype.setMusic = function (value) {
                //localStorage.setItem("mus", "" +value);
                //this.music = value;
                //if (!value)
                //    gameui.AssetsManager.stopMusic();
                //else
                //    gameui.AssetsManager.playMusic("");
            };
            return Settings;
        })();
        UserData.Settings = Settings;
    })(FlipPlus.UserData || (FlipPlus.UserData = {}));
    var UserData = FlipPlus.UserData;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (UserData) {
        var Story = (function () {
            function Story() {
                this.storyPrefix = "history_";
                this.storyPlayed = "played";
            }
            Story.prototype.getStoryPlayed = function (storyId) {
                var hist = localStorage.getItem(this.storyPrefix + storyId);
                if (hist == this.storyPlayed)
                    return true;
                return false;
            };

            Story.prototype.setStoryPlayed = function (storyId) {
                localStorage.setItem(this.storyPrefix + storyId, this.storyPlayed);
            };
            return Story;
        })();
        UserData.Story = Story;
    })(FlipPlus.UserData || (FlipPlus.UserData = {}));
    var UserData = FlipPlus.UserData;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (UserData) {
        // Class
        var Timers = (function () {
            //Constructor
            function Timers() {
                //load timers from storage
                this.timers = this.loadTimers();

                //sync at first use
                this.syncLastTime();
            }
            //Get if timers is ready
            Timers.prototype.getTimer = function (name) {
                return 0;
                if (this.timers[name] == null)
                    return 0;

                var remaning = this.timers[name] - this.getLastTime();

                if (remaning < 0)
                    return 0;

                return Math.floor((this.timers[name] - this.getLastTime()) / 1000);
            };

            //sets a new timer
            //only sets if timer is spanned //TODO eh esta palavra mesmo?
            Timers.prototype.setTimer = function (name, minutes, seconds) {
                //verifies if timer is active
                //if (this.getTimer(name) > 0) return;
                if (typeof minutes === "undefined") { minutes = 0; }
                if (typeof seconds === "undefined") { seconds = 0; }
                //set time interval
                var timeSpan = 1000 * (60 * minutes + seconds);

                //set timer
                this.timers[name] = Date.now() + timeSpan;

                //save to storage
                this.saveTimers(this.timers);
            };

            //get last time between now and last utilization time
            //to avoid adjusting the clock cheat
            Timers.prototype.getLastTime = function () {
                //verifies if last utilization time is greater than time now
                if (Date.now() > this.lastTime)
                    return Date.now();
                else
                    return this.lastTime;
            };

            //at firts use, sync last utilizatio time.
            Timers.prototype.syncLastTime = function () {
                var now = Date.now();

                //caches lastTime
                this.lastTime = this.loadLastTime();

                //verifies if last utilization time is greater than time now
                if (now > this.lastTime) {
                    this.saveLastTime(now);
                    this.lastTime = now;
                }
            };

            //------------------------Storage--------------------------
            //save timers to local storage
            Timers.prototype.saveTimers = function (timers) {
                localStorage.setItem(storagePrefix + "Timers", JSON.stringify(timers));
            };

            //load timers from local storage
            Timers.prototype.loadTimers = function () {
                var value = localStorage.getItem(storagePrefix + "Timers");
                if (value)
                    return JSON.parse(value);
                else
                    return {};
            };

            //store the last utilization time,
            Timers.prototype.saveLastTime = function (time) {
                localStorage.setItem(storagePrefix + "LastTime", time.toString());
            };

            //loads and set the last utilization time,
            Timers.prototype.loadLastTime = function () {
                var value = localStorage.getItem(storagePrefix + "LastTime");
                if (!value)
                    value = Date.now();
                return value;
            };
            return Timers;
        })();
        UserData.Timers = Timers;
    })(FlipPlus.UserData || (FlipPlus.UserData = {}));
    var UserData = FlipPlus.UserData;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    // Module
    (function (UserData) {
        var ProjectsData = (function () {
            // ----------------------- Game Data ----------------------------------------------------------
            function ProjectsData() {
                this.projectKey = "Flipp_userData";
                this.loadFromStorage();
            }
            //Adds user data to a project
            ProjectsData.prototype.addUserData = function (projects) {
                for (var p = 0; p < projects.length; p++) {
                    var project = projects[p];
                    var pd = this.getProjectData(project.name);

                    project.UserData = pd;

                    for (var l = 0; l < projects[p].levels.length; l++) {
                        var level = projects[p].levels[l];
                        var ld = this.getLevelData(level.name);
                        level.userdata = ld;
                    }
                }
            };

            //gets user data from storage and store it to a level data
            ProjectsData.prototype.getLevelData = function (LevelId) {
                var key = LevelId;
                var value = this.projectsUserData[key];

                if (value == null) {
                    var ud = new FlipPlus.Projects.LevelUserData();
                    ud.solved = false;
                    ud.skip = false;
                    ud.unlocked = false;
                    return ud;
                }
                return value;
            };

            //gets user data from storage and store it to a project data
            ProjectsData.prototype.getProjectData = function (projectId) {
                var key = projectId;
                var value = this.projectsUserData[key];

                if (value == null) {
                    var ud = new FlipPlus.Projects.ProjectUserData();
                    ud.unlocked = false;
                    ud.percent = 0;
                    ud.complete = false;
                    return ud;
                } else
                    return value;
            };

            //updates storage with curret level user data
            ProjectsData.prototype.saveLevelData = function (level) {
                var key = level.name;
                this.projectsUserData[key] = level.userdata;
                this.saveToStorage();
            };

            //updates storage with curret project user data
            ProjectsData.prototype.saveProjectData = function (project) {
                var key = project.name;
                this.projectsUserData[key] = project.UserData;
                this.saveToStorage();
            };

            ProjectsData.prototype.saveToStorage = function () {
                if (this.projectsUserData) {
                    var str = JSON.stringify(this.projectsUserData);
                    localStorage.setItem(this.projectKey, str);
                }
            };

            ProjectsData.prototype.loadFromStorage = function () {
                var data = localStorage.getItem(this.projectKey);

                if (data)
                    this.projectsUserData = JSON.parse(data);
                else
                    this.projectsUserData = {};
            };

            //-------------------------------------------------------------------------------------------
            //clear all storage data
            ProjectsData.prototype.clearAllData = function () {
                localStorage.clear();
            };
            return ProjectsData;
        })();
        UserData.ProjectsData = ProjectsData;
    })(FlipPlus.UserData || (FlipPlus.UserData = {}));
    var UserData = FlipPlus.UserData;
})(FlipPlus || (FlipPlus = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        //Controller
        var LevelScreen = (function (_super) {
            __extends(LevelScreen, _super);
            //Initialization methodos ===================================================================================================
            function LevelScreen(leveldata) {
                _super.call(this);

                this.itemsFunctions = {};

                this.clicks = 0;

                //Store level data;
                this.levelData = leveldata;

                //initializate level Model
                this.levelLogic = new GamePlay.Model.Level(leveldata);

                //creates all screen objects
                this.createScene(leveldata);
            }
            // Create Scene ===============================================================================================================
            LevelScreen.prototype.createScene = function (leveldata) {
                var _this = this;
                //creates a Background
                this.addBackground();

                //initialize board sprites
                this.initializeBoardSprites(leveldata.width, leveldata.height, leveldata.theme, this.levelLogic.getBlocks(), leveldata.type);

                //initialize overlay
                this.initializeOverlays();

                //adds message
                this.message = new FlipPlus.Menu.View.Message();
                this.content.addChild(this.message);

                //adds text effext
                this.textEffext = new FlipPlus.Menu.View.TextEffect();
                this.content.addChild(this.textEffext);

                //adds popup
                this.popup = new FlipPlus.Menu.View.Popup();
                this.content.addChild(this.popup);

                this.popup.addEventListener("onshow", function () {
                    _this.gameplayMenu.fadeOut();
                    _this.boardSprite.mouseEnabled = false;
                });

                this.popup.addEventListener("onclose", function () {
                    _this.gameplayMenu.fadeIn();
                    _this.boardSprite.mouseEnabled = true;
                });
            };

            LevelScreen.prototype.addBackground = function () {
                var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
                this.content.addChild(bg);
                bg.y = -339;
                bg.scaleY = 1.3310546875;
                bg.alpha = 0.4;
            };

            LevelScreen.prototype.initializeOverlays = function () {
                var _this = this;
                //intialize  menu overlay
                this.gameplayMenu = new GamePlay.Views.GamePlayMenu();
                this.gameplayMenu.y = -100;
                this.footer.addChild(this.gameplayMenu);

                //level control
                this.gameplayMenu.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.gameplayMenu.addEventListener("unpause", function () {
                    _this.unPauseGame();
                });
                this.gameplayMenu.addEventListener("restart", function (e) {
                    FlipPlus.FlipPlusGame.analytics.logLevelRestart(_this.levelData.name, Date.now() - _this.startedTime, _this.clicks);
                    FlipPlus.FlipPlusGame.replayLevel();
                });
                this.gameplayMenu.addEventListener("back", function () {
                    FlipPlus.FlipPlusGame.analytics.logLevelRestart(_this.levelData.name, Date.now() - _this.startedTime, _this.clicks);
                    FlipPlus.FlipPlusGame.exitLevel();
                });

                //upper staus area
                if (FlipPlus.FlipPlusGame.projectManager.getCurrentProject() != undefined) {
                    var levels = FlipPlus.FlipPlusGame.projectManager.getCurrentProject().levels;
                    this.statusArea = new GamePlay.Views.StatusArea();
                    this.statusArea.setText2(levels.indexOf(this.levelData) + 1 + " - " + levels.length);
                    this.statusArea.setText1("");
                    this.statusArea.setText3("");
                    this.header.addChild(this.statusArea);
                }
            };

            LevelScreen.prototype.initializeBoardSprites = function (width, height, theme, blocks, type) {
                var _this = this;
                //AddBoard
                this.boardSprite = new GamePlay.Views.BoardSprite(width, height, theme, type);
                this.content.addChild(this.boardSprite);

                this.boardSprite.x = DefaultWidth / 2;
                this.boardSprite.y = DefaultHeight / 2;

                this.boardSprite.addInputCallback(function (col, row) {
                    _this.userInput(col, row);
                });
                //TODO create a custom event
            };

            LevelScreen.prototype.back = function () {
                this.pauseGame();
            };

            // user input ===============================================================================================================
            // handles user input
            LevelScreen.prototype.userInput = function (col, row) {
                this.clicks++;

                //analytics
                FlipPlus.FlipPlusGame.analytics.logClick(this.levelData.name, col, row);

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
            };

            // GamePlay methods =========================================================================================================
            LevelScreen.prototype.earnPrize = function (col, row) {
                var _this = this;
                this.levelLogic.earnPrize();
                setTimeout(function () {
                    //playSound
                    ///gameui.AssetsManager.playSound("prize");
                    //apply radius effect
                    _this.boardSprite.radiusEffect(col, row);
                }, 50);
            };

            LevelScreen.prototype.win = function (col, row, messageText) {
                var _this = this;
                if (typeof messageText === "undefined") { messageText = true; }
                // analytics
                FlipPlus.FlipPlusGame.analytics.logLevelWin(this.levelData.name, (Date.now() - this.startedTime) / 100, this.clicks);

                //play a win sound
                ///gameui.AssetsManager.playSound("win");
                //verifies if user already completed this level and verifies if player used any item in the game
                if (!this.levelData.userdata.solved)
                    this.levelData.userdata.item = this.usedItem;

                if (this.usedItem == null)
                    this.levelData.userdata.item = null;

                //verifies if is the first time cimpletting the level
                var complete1stTime = false;
                if (!this.levelData.userdata.solved)
                    complete1stTime = true;

                //set model to complete level.
                FlipPlus.FlipPlusGame.projectManager.completeLevel(this.levelData);

                //change screen and animate.
                if (messageText)
                    this.message.showtext(stringResources.gp_finishPuzzle, 1000, 800);

                //hide all menus
                this.gameplayMenu.fadeOut();
                this.boardSprite.lock();

                //apply effect on sprites
                setTimeout(function () {
                    _this.boardSprite.winEffect(col, row);
                }, 200);

                //animates board to fade out;
                setTimeout(function () {
                    _this.winSwitchScreen(complete1stTime);
                }, 1800);
            };

            LevelScreen.prototype.winSwitchScreen = function (complete1stTime) {
                var _this = this;
                //remove all tweens
                createjs.Tween.removeTweens(this.boardSprite);

                //cache board
                var bounds = this.boardSprite.getBounds();

                ////this.boardSprite.cache(bounds.x, bounds.y, bounds.width, bounds.height);
                //animate to out
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
                    _this.boardSprite.uncache();
                });

                //switch screen
                FlipPlus.FlipPlusGame.completeLevel(complete1stTime);
            };

            LevelScreen.prototype.loose = function () {
                FlipPlus.FlipPlusGame.analytics.logLevelLoose(this.levelData.name, Date.now() - this.startedTime, this.clicks);

                this.gameplayMenu.fadeOut();
                this.boardSprite.lock();
                this.boardSprite.looseEffect();
                setTimeout(function () {
                    FlipPlus.FlipPlusGame.looseLevel();
                }, 3000);
                ;
            };

            // Items ====================================================================================================================
            LevelScreen.prototype.useItem = function (item) {
                //analytics
                FlipPlus.FlipPlusGame.analytics.logUsedItem(item, this.levelData.name);

                //if user has iteem
                var itemQuantity = FlipPlus.FlipPlusGame.itemsData.getItemQuantity(item);
                if (itemQuantity > 0) {
                    //updates data
                    FlipPlus.FlipPlusGame.itemsData.decreaseItemQuantity(item);
                    if (item != "hint")
                        this.usedItem = item;

                    //updates Items buttons labels Quantity on footer
                    this.gameplayMenu.updateItemsQuatity();

                    //show text effect
                    this.textEffext.showtext(stringResources["desc_item_" + item].toUpperCase());

                    return true;
                } else {
                    //show a text
                    //show text effect
                    this.textEffext.showtext(stringResources["desc_item_" + item].toUpperCase());

                    this.popup.showtext(stringResources.gp_noMoreSkip, stringResources.gp_noMoreHints);

                    return false;
                }
            };

            //skips the level
            LevelScreen.prototype.useItemSkip = function () {
                if (!this.useItem("skip"))
                    return;
                if (this.levelData.userdata.skip || this.levelData.userdata.solved) {
                    this.message.showtext("Skip Level");
                    this.message.addEventListener("onclose", function () {
                        FlipPlus.FlipPlusGame.skipLevel(false);
                    });
                } else {
                    this.message.showtext("Skip Level");
                    this.message.addEventListener("onclose", function () {
                        FlipPlus.FlipPlusGame.skipLevel(true);
                    });
                }
            };

            //set hint for a block
            LevelScreen.prototype.useItemHint = function (blockId) {
                if (!this.useItem("hint"))
                    return;

                //if the hint block is not pre defined
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
                    if (filtredInvertedBlocks.length == 0)
                        return;

                    //randomly select one from the list
                    var index = Math.floor(Math.random() * filtredInvertedBlocks.length);
                    blockId = filtredInvertedBlocks[index];
                }

                //enablehint for the selected block;
                this.boardSprite.getBlockById(blockId).enableHint();
            };

            LevelScreen.prototype.usesolve = function () {
                this.win(0, 0);
            };

            // Menus =====================================================================================================================
            LevelScreen.prototype.pauseGame = function () {
                var _this = this;
                this.boardSprite.lock();
                var med = DefaultWidth / 4;

                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
                });
            };

            LevelScreen.prototype.unPauseGame = function () {
                this.boardSprite.unlock();
                var med = DefaultWidth / 4;

                this.boardSprite.scaleX = 0.5;
                this.boardSprite.alpha = 0;
                this.boardSprite.visible = true;

                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150, createjs.Ease.circOut);
            };

            LevelScreen.prototype.animatePuzzle = function (parameters) {
                this.boardSprite.x = parameters.x;
                this.boardSprite.y = parameters.y + 2048;
                this.boardSprite.scaleX = parameters.scaleX;
                this.boardSprite.scaleY = parameters.scaleY;
                createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: DefaultWidth / 2, y: DefaultHeight / 2 }, 500, createjs.Ease.quadInOut);
            };

            // Screen =================================================================================================================
            LevelScreen.prototype.activate = function (parameters) {
                var _this = this;
                //analytics
                this.startedTime = Date.now();

                _super.prototype.activate.call(this, parameters);
                if (parameters)
                    this.animatePuzzle(parameters);

                //updates Items buttons labels Quantity on footer
                this.gameplayMenu.updateItemsQuatity();

                //if there are hidden blocks. shake and lock the board for 4 seconds
                if (this.levelData.hiddenBlocks && this.levelData.hiddenBlocks.length > 0) {
                    var x = DefaultWidth / 2;
                    var t = 100;
                    this.boardSprite.mouseEnabled = false;
                    createjs.Tween.get(this.boardSprite).wait(500).to({ x: x - 5 }, 0).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).wait(200).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).wait(200).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).wait(200).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).to({ x: x - 5 }, t).to({ x: x + 5 }, t).wait(200).call(function () {
                        _this.boardSprite.mouseEnabled = true;
                    });
                }
            };
            return LevelScreen;
        })(gameui.ScreenState);
        GamePlay.LevelScreen = LevelScreen;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        var Puzzle = (function (_super) {
            __extends(Puzzle, _super);
            function Puzzle(levelData) {
                var _this = this;
                _super.call(this, levelData);

                if (levelData.customItems)
                    this.gameplayMenu.addButtons(levelData.customItems);
                else
                    this.gameplayMenu.addButtons(["skip", "hint"]);

                this.gameplayMenu.addEventListener("skip", function (parameter) {
                    _this.useItemSkip();
                });
                this.gameplayMenu.addEventListener("hint", function (parameter) {
                    _this.useItemHint(parameter.target);
                });

                this.levelLogic.board.setInvertedBlocks(levelData.blocksData);

                //draw blocks
                if (levelData.type == "draw" && levelData.drawData == null)
                    this.levelLogic.board.setDrawBlocks(levelData.blocksData);

                if (levelData.drawData)
                    this.levelLogic.board.setDrawBlocks(levelData.drawData, true);

                //Mirror Blocks
                if (levelData.mirroredBlocks)
                    this.levelLogic.board.setMirrorBlocks(levelData.mirroredBlocks);

                //hidden Blocks
                if (levelData.hiddenBlocks)
                    this.levelLogic.board.setHiddenBlocks(levelData.hiddenBlocks);

                //TODO
                if (levelData)
                    this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            }
            return Puzzle;
        })(GamePlay.LevelScreen);
        GamePlay.Puzzle = Puzzle;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        var TimeAtack = (function (_super) {
            __extends(TimeAtack, _super);
            function TimeAtack(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;

                this.gameplayMenu.addButtons(["skip", "time", "solve", "hint"]);
                this.gameplayMenu.addEventListener("skip", function () {
                    _this.useItemSkip();
                });
                this.gameplayMenu.addEventListener("time", function () {
                    _this.useItemTime();
                });
                this.gameplayMenu.addEventListener("solve", function () {
                    _this.useItemSolve();
                });
                this.gameplayMenu.addEventListener("hint", function () {
                    _this.useItemHint();
                });

                this.puzzlesToSolve = levelData.puzzlesToSolve;
                this.currentTime = levelData.time;

                this.randomBoard(levelData.randomMinMoves, levelData.randomMaxMoves);

                this.statusArea.setMode("time");
                this.statusArea.setText3(levelData.time.toString());

                this.createsTimer();
            }
            TimeAtack.prototype.createsTimer = function () {
                var _this = this;
                //Creates Timer
                this.timer = new Timer(1000);

                this.timer.addEventListener(TimerEvent.TIMER, function (e) {
                    _this.currentTime--;
                    _this.statusArea.setText3(_this.currentTime.toString());
                    if (_this.currentTime <= 0) {
                        _this.statusArea.setText3(stringResources.gp_pz_statusEnd);

                        _this.message.showtext(stringResources.gp_pz_timeUP);
                        _this.loose();

                        _this.timer.stop();
                    }
                });
            };

            TimeAtack.prototype.desactivate = function () {
                this.timer.stop();
            };

            //Overriding methods.
            TimeAtack.prototype.win = function (col, row) {
                var _this = this;
                if (this.currentPuzzle >= this.puzzlesToSolve) {
                    this.timer.stop();
                    _super.prototype.win.call(this, col, row);
                } else {
                    //animate board and switch
                    var defaultX = this.boardSprite.x;
                    createjs.Tween.removeTweens(this.boardSprite);
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX - DefaultWidth }, 250, createjs.Ease.quadIn).call(function () {
                        _this.currentPuzzle++;
                        _this.boardSprite.clearHint();
                        _this.randomBoard(_this.levelData.randomMinMoves, _this.levelData.randomMaxMoves);

                        _this.boardSprite.x = defaultX + DefaultWidth;
                        createjs.Tween.get(_this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut);
                    });
                }
            };

            TimeAtack.prototype.pauseGame = function () {
                _super.prototype.pauseGame.call(this);
                this.timer.stop();
            };

            TimeAtack.prototype.unPauseGame = function () {
                _super.prototype.unPauseGame.call(this);
                this.timer.start();
            };

            TimeAtack.prototype.randomBoard = function (minMoves, maxMoves) {
                if (typeof minMoves === "undefined") { minMoves = 2; }
                if (typeof maxMoves === "undefined") { maxMoves = 5; }
                this.statusArea.setText1(this.currentPuzzle.toString() + "/" + this.puzzlesToSolve.toString());

                var moves = Math.floor(Math.random() * (maxMoves - minMoves)) + minMoves;
                var lenght = this.levelLogic.board.width * this.levelLogic.board.height;
                var inverted = [];

                for (var m = 0; m < moves; m++) {
                    var index = Math.floor(Math.random() * (lenght));
                    while (inverted[index] == true)
                        index = (index + 1) % lenght;
                    inverted[index] = true;
                }

                for (var i = 0; i < lenght; i++) {
                    if (inverted[i] == true)
                        this.levelLogic.board.invertCross(i % this.levelLogic.board.width, Math.floor(i / this.levelLogic.board.width));
                }

                this.levelLogic.board.initializePrizes(2);
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            };

            TimeAtack.prototype.useItemSolve = function () {
                if (!this.useItem("solve"))
                    return;
                this.win(0, 0);
            };

            TimeAtack.prototype.useItemTime = function () {
                if (!this.useItem("time"))
                    return;
                this.currentTime += 10;
            };

            TimeAtack.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this);

                this.boardSprite.visible = false;

                //shows popup
                this.popup.showTimeAttack(stringResources.b1_popup1Ttitle, stringResources.gp_pz_Popup1Text1, this.levelData.puzzlesToSolve.toString(), this.levelData.time.toString(), stringResources.gp_pz_Popup1Text2, stringResources.gp_pz_Popup1Text3);
                this.popup.addEventListener("onclose", function () {
                    _this.boardSprite.visible = true;

                    //shows puzzle
                    if (parameters)
                        _this.animatePuzzle(parameters);
                    _this.timer.start();
                });
            };
            return TimeAtack;
        })(GamePlay.LevelScreen);
        GamePlay.TimeAtack = TimeAtack;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentTutorialStep = 0;

                this.tutorialSteps = [];
                this.tutorialStepsEnd = [];

                this.endTutorial = function () {
                    _this.boardSprite.tutorialRelease();
                };

                for (var t in levelData.tutorial) {
                    if (levelData.tutorial[t].atEnd)
                        this.tutorialStepsEnd.push(levelData.tutorial[t]);
                    else
                        this.tutorialSteps.push(levelData.tutorial[t]);
                }
            }
            //create tutorial steps and callbacks
            Tutorial.prototype.executeTutorialActions = function (step) {
                var _this = this;
                //create for text step
                if (step.text) {
                    this.popup.showtext(step.title, step.text);
                    var listener = this.popup.addEventListener("onclose", function () {
                        _this.playNextTurorialStep();
                        _this.popup.removeEventListener("onclose", listener);
                    });
                }

                //create for menu item step
                if (step.item) {
                    this.boardSprite.tutorialLockBlocks();
                    this.gameplayMenu.tutorial_HighlightItem(step.item, step.parameter);
                    var listener2 = this.gameplayMenu.addEventListener(step.item, function () {
                        _this.boardSprite.tutorialRelease();
                        _this.gameplayMenu.tutorial_unlockAllButtons();
                        _this.playNextTurorialStep();
                        _this.gameplayMenu.removeEventListener(step.item, listener2);
                    });
                }

                //create for block click item
                if (step.click != undefined) {
                    this.boardSprite.tutorialHighlightBlocks(step.click);
                    this.gameplayMenu.tutorial_lockAllButtons();
                    var listener3 = this.boardSprite.addEventListener("ontutorialclick", function () {
                        _this.playNextTurorialStep();
                        _this.boardSprite.removeEventListener("ontutorialclick", listener3);
                        _this.gameplayMenu.tutorial_unlockAllButtons();
                    });
                }
            };

            Tutorial.prototype.playNextTurorialStep = function () {
                //Execute one more tutorial step
                if (this.currentTutorialStep < this.tutorialSteps.length) {
                    this.executeTutorialActions(this.tutorialSteps[this.currentTutorialStep]);
                    this.currentTutorialStep++;
                } else
                    this.endTutorial();
            };

            Tutorial.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);

                //start tutorial steps
                this.playNextTurorialStep();
            };

            Tutorial.prototype.win = function (col, row) {
                var _this = this;
                if (this.tutorialStepsEnd.length == 0)
                    _super.prototype.win.call(this, col, row);
                else
                    setTimeout(function () {
                        _this.currentTutorialStep = 0;
                        _this.tutorialSteps = _this.tutorialStepsEnd;

                        _this.playNextTurorialStep();

                        _this.endTutorial = function () {
                            _super.prototype.win.call(_this, col, row, false);
                        };
                    }, 500);
            };
            return Tutorial;
        })(GamePlay.Puzzle);
        GamePlay.Tutorial = Tutorial;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Model) {
            var Block = (function () {
                function Block(col, row) {
                    this.col = col;
                    this.row = row;
                }
                Block.prototype.toString = function () {
                    return "(status = " + this.state + ", pos=" + this.col + "," + this.row + ")";
                };

                Block.prototype.toggleState = function () {
                    this.state = !this.state;
                };

                Block.prototype.toggleInverted = function () {
                    this.inverted = !this.inverted;
                };

                Block.prototype.toggleDraw = function () {
                    this.draw = !this.draw;
                };
                return Block;
            })();
            Model.Block = Block;
        })(GamePlay.Model || (GamePlay.Model = {}));
        var Model = GamePlay.Model;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Model) {
            var Board = (function () {
                function Board(width, height) {
                    //prizes intervals
                    this.prizes = [];
                    this.width = width;
                    this.height = height;

                    //create blocks
                    this.blocks = [];
                    for (var col = 0; col < width; col++) {
                        this.blocks[col] = [];
                        for (var row = 0; row < height; row++) {
                            var b = new Model.Block(col, row);
                            this.blocks[col][row] = b;
                        }
                    }
                }
                //Verifies if all board are clean
                Board.prototype.verifyClean = function () {
                    var totalState;

                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++) {
                            totalState = totalState || this.blocks[col][row].state;
                        }

                    return !totalState;
                };

                //returns a blocks based on a id
                Board.prototype.getBlockByID = function (id) {
                    var col = Math.floor(id / this.height);
                    var row = id - col * this.height;
                    return this.blocks[col][row];
                };

                Board.prototype.getInvertedBlocks = function () {
                    var result = [];

                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++) {
                            var b = this.blocks[col][row];
                            if (b.inverted)
                                result.push(row * this.width + col);
                        }
                    return result;
                };

                Board.prototype.getInvertedBlocksCount = function () {
                    if (this.width == 5 && this.height == 5)
                        return this.getInvertedCount5x5(this.getInvertedBlocks());
                    else
                        return this.getInvertedBlocks().length;
                };

                //return the minimal inverted blocks to a solutions in a 5x5 board based on a previously inverted blocks
                Board.prototype.getInvertedCount5x5 = function (invertedBlocks) {
                    var maxBlocs = 25;

                    var solutions = [];
                    solutions[0] = [true, false, true, false, true, true, false, true, false, true, false, false, false, false, false, true, false, true, false, true, true, false, true, false, true];
                    solutions[1] = [false, true, true, true, false, true, false, true, false, true, true, true, false, true, true, true, false, true, false, true, false, true, true, true, false];
                    solutions[2] = [true, true, false, true, true, false, false, false, false, false, true, true, false, true, true, false, false, false, false, false, true, true, false, true, true];
                    solutions[3] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

                    var blocksArray = [];
                    var invertsCount = [];

                    for (var s = 0; s < maxBlocs; s++)
                        blocksArray[s] = false;
                    for (var i = 0; i < invertedBlocks.length; i++)
                        blocksArray[invertedBlocks[i]] = true;

                    for (var s = 0; s < solutions.length; s++) {
                        var sol = solutions[s];
                        invertsCount[s] = 0;
                        for (var i = 0; i < maxBlocs; i++)
                            if (blocksArray[i])
                                sol[i] = !sol[i];
                        for (var i = 0; i < maxBlocs; i++)
                            if (sol[i])
                                invertsCount[s]++;
                    }

                    var result = maxBlocs;

                    for (var s = 0; s < solutions.length; s++)
                        if (invertsCount[s] < result)
                            result = invertsCount[s];

                    return result;
                };

                Board.prototype.setInvertedBlocks = function (invertedBlocks, prizesCount) {
                    if (typeof prizesCount === "undefined") { prizesCount = 2; }
                    var i = 0;

                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++) {
                            this.blocks[col][row].inverted = false;
                            this.blocks[col][row].state = false;
                        }

                    if (invertedBlocks) {
                        for (var i = 0; i < invertedBlocks.length; i++) {
                            var row = Math.floor(invertedBlocks[i] / this.width);
                            var col = invertedBlocks[i] - row * this.width;
                            this.invertCross(col, row);
                        }
                        this.initializePrizes(prizesCount, invertedBlocks.length);
                    }
                };

                Board.prototype.setDrawBlocks = function (drawBlocks, cross) {
                    if (typeof cross === "undefined") { cross = true; }
                    var i = 0;

                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++)
                            this.blocks[col][row].draw = false;

                    if (drawBlocks)
                        for (var i = 0; i < drawBlocks.length; i++) {
                            var block = this.getBlockByID(drawBlocks[i]);
                            this.invertDraw(block.col, block.row, cross);
                        }
                };

                Board.prototype.setMirrorBlocks = function (mirroredBlocks) {
                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++)
                            this.blocks[col][row].mirror = false;

                    this.mirroredBlocks = new Array();

                    if (mirroredBlocks)
                        for (var i = 0; i < mirroredBlocks.length; i++) {
                            var block = this.getBlockByID(mirroredBlocks[i]);
                            this.mirroredBlocks.push(block);
                            block.mirror = true;
                        }
                };

                Board.prototype.setHiddenBlocks = function (hiddenBlocks) {
                    for (var col = 0; col < this.width; col++)
                        for (var row = 0; row < this.height; row++)
                            this.blocks[col][row].hidden = false;

                    this.hiddenBlocks = new Array();

                    if (hiddenBlocks)
                        for (var i = 0; i < hiddenBlocks.length; i++) {
                            var block = this.getBlockByID(hiddenBlocks[i]);
                            this.hiddenBlocks.push(block);
                            block.hidden = true;
                        }
                };

                //Distribuite Prizes Along Board
                Board.prototype.initializePrizes = function (prizesNumber, minMoves) {
                    if (typeof minMoves === "undefined") { minMoves = 0; }
                    if (0 == minMoves)
                        minMoves = this.getInvertedBlocks().length;

                    if (prizesNumber < 1)
                        return;

                    var interval = minMoves / (prizesNumber + 1);

                    for (var i = 0; i < prizesNumber; i++) {
                        var val = (prizesNumber - i) * interval;
                        val = minMoves - val;
                        val = Math.floor(val);
                        this.prizes.push(val);
                    }
                };

                ///Invert a cross into the board
                Board.prototype.invertCross = function (col, row) {
                    //invert flag
                    this.blocks[col][row].toggleInverted();

                    var blocks = this.getCrossToInvert(col, row);

                    this.invertBlocks(blocks);
                    this.mirrorBlocks(blocks);
                };

                Board.prototype.invertBlocks = function (blocks) {
                    for (var b in blocks)
                        blocks[b].toggleState();
                };

                Board.prototype.mirrorBlocks = function (blocks) {
                    for (var b in blocks)
                        if (blocks[b].mirror) {
                            for (var m in this.mirroredBlocks)
                                this.mirroredBlocks[m].toggleState();

                            return;
                        }
                };

                //inverts all mirroered blocks
                Board.prototype.mirrorBlock = function (block) {
                    //if block is mirrored, invert all related
                    return block.mirror;
                };

                Board.prototype.getCrossToInvert = function (col, row) {
                    var toInvert = [];

                    //invert block state
                    toInvert.push(this.blocks[col][row]);

                    //invert cross neighbor
                    if (col > 0)
                        toInvert.push(this.blocks[col - 1][row]);
                    if (col < this.width - 1)
                        toInvert.push(this.blocks[col + 1][row]);
                    if (row < this.height - 1)
                        toInvert.push(this.blocks[col][row + 1]);
                    if (row > 0)
                        toInvert.push(this.blocks[col][row - 1]);

                    return toInvert;
                };

                ///Invert a cross into the board
                Board.prototype.invertDraw = function (col, row, cross) {
                    if (typeof cross === "undefined") { cross = true; }
                    //invert block state
                    this.blocks[col][row].toggleDraw();

                    if (!cross)
                        return;

                    //invert cross neighbor
                    if (col > 0)
                        this.blocks[col - 1][row].toggleDraw();
                    if (col < this.width - 1)
                        this.blocks[col + 1][row].toggleDraw();

                    if (row < this.height - 1)
                        this.blocks[col][row + 1].toggleDraw();
                    if (row > 0)
                        this.blocks[col][row - 1].toggleDraw();
                };
                return Board;
            })();
            Model.Board = Board;
        })(GamePlay.Model || (GamePlay.Model = {}));
        var Model = GamePlay.Model;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
/// <reference path="Board.ts" />
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Model) {
            //Model
            var Level = (function () {
                //Initialization methodos ============================================================================================================
                function Level(leveldata) {
                    //Level Data colections
                    this.moves = 0;
                    this.earnedPrizes = 0;
                    this.timeSpent = 0;
                    this.points = 0;
                    //creates a board
                    this.board = new Model.Board(leveldata.width, leveldata.height);
                }
                //Model methods =======================================================================================================================
                Level.prototype.getBlocks = function () {
                    return this.board.blocks;
                };

                Level.prototype.invertCross = function (col, row) {
                    this.board.invertCross(col, row);
                };

                // verify somethings ==================================================================================================================
                Level.prototype.verifyPrize = function () {
                    var invertedCount = this.board.getInvertedBlocksCount();
                    var goal = this.board.prizes[this.board.prizes.length - 1];
                    if (invertedCount <= goal)
                        return true;
                    else
                        return false;
                };

                Level.prototype.verifyWin = function () {
                    return this.board.verifyClean();
                };

                // GamePlay methods ===================================================================================================================
                Level.prototype.earnPrize = function () {
                    this.board.prizes.pop();
                    this.earnedPrizes++;
                };
                Level.movePoint = -5;
                Level.timePoint = -6;
                Level.prizesPoint = 100;
                Level.endPoint = 1000;
                return Level;
            })();
            Model.Level = Level;
        })(GamePlay.Model || (GamePlay.Model = {}));
        var Model = GamePlay.Model;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Views) {
            var BlockSprite = (function (_super) {
                __extends(BlockSprite, _super);
                //Constructor
                function BlockSprite(col, row, theme, levelType) {
                    _super.call(this);
                    //images assets
                    this.assetsImages = [];
                    //item state
                    this.hintEnalble = false;

                    this.levelType = levelType;
                    this.col = col;
                    this.row = row;

                    //load highlight
                    this.highlight = gameui.AssetsManager.getBitmap("puzzle/highlight");
                    this.addChild(this.highlight);
                    this.highlight.x = -8;
                    this.highlight.y = -8;
                    this.highlight.scaleX = this.highlight.scaleY = 1.05;
                    this.highlight.visible = false;

                    //add Container for sprites
                    this.container = new createjs.Container();
                    this.container.regX = this.container.regY = BlockSprite.defaultBlockSize / 2;
                    this.container.x = this.container.y = BlockSprite.defaultBlockSize / 2;
                    this.addChild(this.container);

                    //create hit area
                    this.createHitArea();

                    //Load assets based on the theme
                    this.loadAssets(theme);

                    //set position
                    this.x = col * BlockSprite.defaultBlockSize;
                    this.y = row * BlockSprite.defaultBlockSize;

                    //set tutorial state
                    this.tutorialHighLighted = false;
                }
                BlockSprite.prototype.enableHint = function () {
                    this.hintEnalble = true;
                    this.updateSprite();
                };

                BlockSprite.prototype.disableHint = function () {
                    this.hintEnalble = false;
                    this.updateSprite();
                };

                BlockSprite.prototype.isHintEnabled = function () {
                    return this.hintEnalble;
                };

                //create the hitArea
                BlockSprite.prototype.createHitArea = function () {
                    var hit = new createjs.Shape();
                    hit.graphics.beginFill("#000").drawRect(0, 0, BlockSprite.defaultBlockSize, BlockSprite.defaultBlockSize);
                    this.hitArea = hit;
                };

                //update the blockSprite based on the block information
                BlockSprite.prototype.updateSprite = function (block) {
                    if (block)
                        this.block = block;

                    if (!this.block)
                        return;

                    //shows or hide hint
                    if (this.hintEnalble && this.block.inverted)
                        this.hintimage.visible = true;
                    else
                        this.hintimage.visible = false;

                    //show mirrored
                    this.mirrorImage.visible = this.block.mirror;

                    //show hidden
                    this.memoryImage.visible = this.block.hidden;

                    //calculate new state
                    var newState = this.CalculateSpriteStatus(this.block.state, this.block.draw, this.levelType);

                    //veifies if there was any change
                    if (this.state == newState)
                        return;

                    //set this state
                    var oldState = this.state;
                    this.state = newState;

                    //get state images
                    var newStateImage = this.getStateImage(newState);
                    var oldStateImage = this.stateImage;
                    this.stateImage = newStateImage;

                    //animate them
                    if (newStateImage != null) {
                        newStateImage.scaleY = 0;
                        newStateImage.scaleX = 0;
                        newStateImage.visible = true;
                        createjs.Tween.removeTweens(newStateImage);
                        createjs.Tween.get(newStateImage).wait(100).to({ scaleY: 1, scaleX: 1 }, 200, createjs.Ease.backOut);
                    }

                    if (oldStateImage != null) {
                        createjs.Tween.removeTweens(oldStateImage);
                        createjs.Tween.get(oldStateImage).to({ scaleY: 0, scaleX: 0 }, 100, createjs.Ease.cubicIn).call(function () {
                            oldStateImage.visible = false;
                        });
                        oldStateImage.scaleY = 1;
                        oldStateImage.scaleX = 1;
                    }
                };

                //calculate status baset on provided properties
                BlockSprite.prototype.CalculateSpriteStatus = function (inverted, draw, levelType) {
                    if (!draw)
                        if (inverted)
                            if (levelType == "draw")
                                return "null";
                            else
                                return "Inv";
                        else if (levelType == "draw")
                            return "DInv";
                        else
                            return "Nor";
                    else if (!inverted)
                        return "Nor";
                    else
                        return "DNor";
                    //return "Nor";
                };

                //gets the current state image based on string
                BlockSprite.prototype.getStateImage = function (state) {
                    if (state == undefined)
                        return;
                    var index = Math.floor(Math.random() * this.assetsImages[state].length);
                    return this.assetsImages[state][index];
                };

                //Load assets and adds it to the container
                BlockSprite.prototype.loadAssets = function (theme) {
                    //load tiles
                    var manifest = [
                        { name: "Nor", images: ["puzzle/tile_" + theme + "_1", "puzzle/tile_" + theme + "_2", "puzzle/tile_" + theme + "_3", "puzzle/tile_" + theme + "_4"] },
                        { name: "Inv", images: ["puzzle/tilex"] },
                        { name: "DInv", images: ["puzzle/tileDgray"] },
                        { name: "DNor", images: ["puzzle/tileD" + theme] },
                        //{ name: "DInv", images: ["puzzle/tilexD"] },
                        { name: "null", images: ["puzzle/tile0"] }
                    ];

                    for (var state = 0; state < manifest.length; state++) {
                        this.assetsImages[manifest[state].name] = [];

                        for (var image = 0; image < manifest[state].images.length; image++) {
                            var img = this.loadAsset(manifest[state].images[image]);
                            if (manifest[state].images[image][0] == 'D')
                                img.scaleX = img.scaleY = 1.3;
                            this.assetsImages[manifest[state].name].push(img);
                        }
                    }

                    //Modificators
                    //load hint symbol
                    this.hintimage = gameui.AssetsManager.getBitmap("puzzle/icon_hint");
                    this.container.addChild(this.hintimage);
                    this.hintimage.x = 36;
                    this.hintimage.y = 20;
                    this.hintimage.visible = false;

                    //load nurrir modificator tile
                    this.mirrorImage = gameui.AssetsManager.getBitmap("puzzle/tilemirror");
                    this.container.addChild(this.mirrorImage);
                    this.mirrorImage.visible = false;
                    this.mirrorImage.x = this.mirrorImage.y = -12;

                    //load memoryModificator tile
                    this.memoryImage = gameui.AssetsManager.getBitmap("puzzle/tilememory");
                    this.container.addChild(this.memoryImage);
                    this.memoryImage.visible = false;
                    this.memoryImage.alpha = 0;
                    this.memoryImage.scaleX = this.memoryImage.scaleY = 1.1;
                    this.memoryImage.x = this.memoryImage.y = -BlockSprite.defaultBlockSize * 0.05;
                    createjs.Tween.get(this.memoryImage).to({ alpha: 1 }).wait(500).to({ alpha: 0 }).wait(500).to({ alpha: 1 }).wait(500).to({ alpha: 0 }).wait(500).to({ alpha: 1 }).wait(500).to({ alpha: 0 }).wait(500).to({ alpha: 1 }).wait(250).to({ alpha: 0 }).wait(250).to({ alpha: 1 }).wait(250).to({ alpha: 0 }).wait(250).to({ alpha: 1 });
                };

                BlockSprite.prototype.reveal = function () {
                    this.memoryImage.alpha = 0;
                };

                //load a single asset and adds it to this
                BlockSprite.prototype.loadAsset = function (assetName) {
                    var asset = gameui.AssetsManager.getBitmap(assetName);
                    asset.name = assetName;

                    this.container.addChild(asset);
                    asset.visible = false;
                    asset.regX = BlockSprite.defaultBlockSize / 2;
                    asset.regY = BlockSprite.defaultBlockSize / 2;

                    asset.x = BlockSprite.defaultBlockSize / 2;
                    asset.y = BlockSprite.defaultBlockSize / 2;

                    return asset;
                };

                // =================== Tutorial Lock ===============================================================
                BlockSprite.prototype.tutorialLock = function () {
                    this.mouseEnabled = false;
                    this.tutorialHighLighted = false;
                };

                BlockSprite.prototype.tutorialUnlock = function () {
                    this.mouseEnabled = true;
                    this.tutorialHighLighted = false;
                };

                BlockSprite.prototype.tutorialHighLight = function () {
                    this.mouseEnabled = true;
                    this.tutorialHighLighted = true;
                };

                BlockSprite.prototype.tutorialBlur = function () {
                    this.mouseEnabled = true;
                    this.tutorialHighLighted = false;
                };

                // =================== Animation ==========================================================
                BlockSprite.prototype.animatePreInvert = function () {
                    createjs.Tween.removeTweens(this.highlight);
                    this.highlight.visible = true;
                    this.highlight.alpha = 0;
                    createjs.Tween.get(this.highlight).to({ alpha: 1 }, 700, createjs.Ease.backOut);
                    createjs.Tween.get(this.container).to({ scaleX: 0.90, scaleY: 0.90 }, 200, createjs.Ease.backOut);
                };

                BlockSprite.prototype.animatePreInvertRelease = function () {
                    var _this = this;
                    createjs.Tween.removeTweens(this);
                    this.container.scaleX = 0.8, this.container.scaleY = 0.8;
                    createjs.Tween.removeTweens(this.highlight);
                    createjs.Tween.get(this.highlight).to({ alpha: 0 }, 400, createjs.Ease.backOut).call(function () {
                        _this.highlight.visible = false;
                    });
                    createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.backOut);
                };

                BlockSprite.prototype.applyBounceEffect = function (delay) {
                    var _this = this;
                    createjs.Tween.get(this.container).wait(delay).to({ scaleX: 1.1, scaleY: 1.1 }, 60, createjs.Ease.linear).call(function () {
                        createjs.Tween.get(_this.container).to({ scaleX: 0.9, scaleY: 0.9 }, 60, createjs.Ease.linear).call(function () {
                            createjs.Tween.get(_this.container).to({ scaleX: 1, scaleY: 1 }, 60, createjs.Ease.linear);
                        });
                    });
                };

                BlockSprite.prototype.applyHideEffect = function (delay, hide) {
                    var _this = this;
                    if (typeof hide === "undefined") { hide = true; }
                    createjs.Tween.get(this.container).wait(delay).to({ scaleX: 1.1, scaleY: 1.1 }, 60, createjs.Ease.linear).call(function () {
                        if (_this.state == "DNor" || hide == false)
                            createjs.Tween.get(_this.container).to({ scaleX: 1, scaleY: 1 }, 60, createjs.Ease.linear);
                        else
                            createjs.Tween.get(_this.container).to({ alpha: 0 }, 60, createjs.Ease.linear);
                    });
                };
                BlockSprite.defaultBlockSize = 187;
                return BlockSprite;
            })(createjs.Container);
            Views.BlockSprite = BlockSprite;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Views) {
            var BoardSprite = (function (_super) {
                __extends(BoardSprite, _super);
                function BoardSprite(levelWidth, levelHeight, levelTheme, levelType) {
                    _super.call(this);
                    this.previousSound = 1;
                    this.locked = false;

                    this.addBlocks(levelWidth, levelHeight, levelTheme, levelType);
                    this.boardHeight = levelHeight;
                    this.boardWidth = levelWidth;

                    this.initializeEffects();

                    //Positioning board
                    var boardHeight = levelHeight * Views.BlockSprite.defaultBlockSize;
                    var boardWidth = levelWidth * Views.BlockSprite.defaultBlockSize;

                    this.regX = boardWidth / 2;
                    this.regY = boardHeight / 2;

                    //load click indicator
                    this.tutorialIndiatcor = gameui.AssetsManager.getSprite("touch");
                    this.tutorialIndiatcor.regX = this.tutorialIndiatcor.regY = -55;
                    this.tutorialIndiatcor.mouseEnabled = false;
                    this.addChild(this.tutorialIndiatcor);
                    this.tutorialIndiatcor.visible = false;
                }
                //initializes the effectss sprites
                BoardSprite.prototype.initializeEffects = function () {
                    this.fx = new FlipPlus.Effects();
                    this.addChild(this.fx);
                };

                //creates and add all blocks to the boardh
                BoardSprite.prototype.addBlocks = function (width, height, theme, levelType) {
                    var _this = this;
                    this.blocksSprites = [];

                    for (var col = 0; col < width; col++) {
                        this.blocksSprites[col] = [];
                        for (var row = 0; row < height; row++) {
                            //Creates block Sprite
                            var blockSprite = new Views.BlockSprite(col, row, theme, levelType);

                            this.blocksSprites[col][row] = blockSprite;

                            //Add it to the board sprite
                            this.addChild(blockSprite);

                            //Add event listener to the boardSprite
                            blockSprite.addEventListener("click", function (event) {
                                if (_this.locked)
                                    return;

                                var b = event.target;
                                _this.callback(b.col, b.row);

                                // play a Radom Sounds
                                var randomsound = Math.ceil(Math.random() * 3);
                                if (randomsound >= _this.previousSound)
                                    randomsound++;

                                ///gameui.AssetsManager.playSound("tile" + randomsound);
                                _this.previousSound = randomsound;

                                //tutorialrelease
                                if (b.tutorialHighLighted) {
                                    _this.tutorialRelease();
                                    _this.dispatchEvent("ontutorialclick");
                                }
                            });

                            //moouse down
                            blockSprite.addEventListener("mousedown", function (event) {
                                if (_this.locked)
                                    return;
                                _this.preInvertCross(event.target);
                            });

                            //mouse up
                            blockSprite.addEventListener("pressup", function (event) {
                                _this.preInvertRelease(event.target);
                            });
                        }
                    }
                };

                //updates sprites in the board
                BoardSprite.prototype.updateSprites = function (blocks) {
                    for (var col = 0; col < this.blocksSprites.length; col++)
                        for (var row = 0; row < this.blocksSprites[col].length; row++)
                            this.blocksSprites[col][row].updateSprite(blocks[col][row]);
                };

                //creates user input callback to the level
                BoardSprite.prototype.addInputCallback = function (callback) {
                    this.callback = callback;
                };

                //retuns a blocks by a absolute ID
                BoardSprite.prototype.getBlockById = function (id) {
                    return this.blocksSprites[id % this.boardWidth][Math.floor(id / this.boardWidth)];
                };

                //clear blocks hints
                BoardSprite.prototype.clearHint = function () {
                    var blocksCount = this.boardWidth * this.boardHeight;
                    for (var b = 0; b < blocksCount; b++) {
                        var block = this.getBlockById(b);
                        block.disableHint();
                    }
                };

                //===================================================  Tutorial =================================================================
                BoardSprite.prototype.tutorialHighlightBlocks = function (blockId) {
                    var blocksCount = this.boardWidth * this.boardHeight;

                    for (var b = 0; b < blocksCount; b++) {
                        var block = this.getBlockById(b);
                        block.tutorialLock();
                    }

                    var block = this.getBlockById(blockId);
                    block.tutorialHighLight();

                    this.tutorialIndiatcor.visible = true;
                    this.tutorialIndiatcor.x = block.x;
                    this.tutorialIndiatcor.y = block.y;
                };

                BoardSprite.prototype.tutorialRelease = function () {
                    var blocksCount = this.boardWidth * this.boardHeight;

                    for (var b = 0; b < blocksCount; b++) {
                        var block = this.getBlockById(b);
                        block.tutorialUnlock();
                    }

                    this.tutorialIndiatcor.visible = false;
                };

                BoardSprite.prototype.tutorialLockBlocks = function () {
                    var blocksCount = this.boardWidth * this.boardHeight;

                    for (var b = 0; b < blocksCount; b++) {
                        var block = this.getBlockById(b);
                        block.tutorialLock();
                    }
                };

                //===================================================  Effects  =================================================================
                BoardSprite.prototype.preInvertCross = function (blockSP) {
                    blockSP.animatePreInvert();

                    var col = blockSP.col;
                    var row = blockSP.row;
                    var h = this.boardHeight - 1;
                    var w = this.boardWidth - 1;
                    if (row > 0)
                        this.blocksSprites[col][row - 1].animatePreInvert();
                    if (row < h)
                        this.blocksSprites[col][row + 1].animatePreInvert();
                    if (col > 0)
                        this.blocksSprites[col - 1][row].animatePreInvert();
                    if (col < w)
                        this.blocksSprites[col + 1][row].animatePreInvert();
                };

                BoardSprite.prototype.preInvertRelease = function (blockSP) {
                    blockSP.animatePreInvertRelease();

                    var col = blockSP.col;
                    var row = blockSP.row;
                    var h = this.boardHeight - 1;
                    var w = this.boardWidth - 1;
                    if (row > 0)
                        this.blocksSprites[col][row - 1].animatePreInvertRelease();
                    if (row < h)
                        this.blocksSprites[col][row + 1].animatePreInvertRelease();
                    if (col > 0)
                        this.blocksSprites[col - 1][row].animatePreInvertRelease();
                    if (col < w)
                        this.blocksSprites[col + 1][row].animatePreInvertRelease();
                };

                BoardSprite.prototype.radiusEffect = function (originCol, originRow) {
                    var delay = 50;

                    for (var radius = 1; radius < this.boardHeight * 2; radius++) {
                        var points = this.getPointsDistingL1(radius);

                        for (var i = 0; i < points.length; i++)
                            this.applyBounceEffect(originCol + points[i].x, originRow + points[i].y, (radius - 1) * delay);
                    }

                    //TODO: fazer classe só para isto.
                    this.fx.castEffect(this.blocksSprites[originCol][originRow].x + 90, this.blocksSprites[originCol][originRow].y + 90, "Bolinhas", 3);
                };

                BoardSprite.prototype.winEffect = function (originCol, originRow) {
                    // define time duration
                    this.radiusEffect(originCol, originRow);
                    var total = this.boardHeight * this.boardWidth;
                    var duration = 500;
                    var delay = duration / total;

                    // defineRandomOrder
                    var arrayX = [];
                    for (var i = 0; i < total; i++)
                        arrayX[i] = i;
                    this.shuffle(arrayX);

                    for (var i = 0; i < total; i++) {
                        var x = arrayX[i] % this.boardWidth;
                        var y = Math.floor(arrayX[i] / this.boardWidth);
                        this.applyHideEffect(x, y, delay * i);

                        // hide all ? symbols from sprites
                        this.blocksSprites[x][y].reveal();
                    }
                };

                BoardSprite.prototype.looseEffect = function () {
                    //define time duration
                    var total = this.boardHeight * this.boardWidth;
                    var duration = 500;
                    var delay = duration / total;

                    //defineRandomOrder
                    var arrayX = [];
                    for (var i = 0; i < total; i++)
                        arrayX[i] = i;
                    this.shuffle(arrayX);

                    for (var i = 0; i < total; i++) {
                        var x = arrayX[i] % this.boardWidth;
                        var y = Math.floor(arrayX[i] / this.boardWidth);
                        this.applyHideEffect(x, y, delay * i, false);
                    }
                };

                BoardSprite.prototype.shuffle = function (o) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                        ;
                    return o;
                };

                BoardSprite.prototype.applyBounceEffect = function (col, row, delay) {
                    if (col < 0)
                        return;
                    if (row < 0)
                        return;
                    if (col >= this.boardWidth)
                        return;
                    if (row >= this.boardHeight)
                        return;

                    var b = this.blocksSprites[col][row];
                    b.applyBounceEffect(delay);
                };

                BoardSprite.prototype.applyJoinEffect = function (col, row, delay) {
                    if (col < 0)
                        return;
                    if (row < 0)
                        return;
                    if (col >= this.boardWidth)
                        return;
                    if (row >= this.boardHeight)
                        return;

                    var b = this.blocksSprites[col][row];
                    b.animatePreInvert();
                };

                BoardSprite.prototype.applyHideEffect = function (col, row, delay, fx) {
                    var _this = this;
                    if (typeof fx === "undefined") { fx = true; }
                    if (col < 0)
                        return;
                    if (row < 0)
                        return;
                    if (col >= this.boardWidth)
                        return;
                    if (row >= this.boardHeight)
                        return;

                    var b = this.blocksSprites[col][row];
                    b.applyHideEffect(delay, !fx);

                    if (fx) {
                        //bolinhas effext
                        setTimeout(function () {
                            _this.fx.castEffect(_this.blocksSprites[col][row].x + 90, _this.blocksSprites[col][row].y + 90, "Bolinhas", 3);
                        }, delay);
                    }
                };

                //get all points disting from origin calculated by L1 geometry (Taxicab geometry)
                //== circles are losangles ==
                BoardSprite.prototype.getPointsDistingL1 = function (distance) {
                    var response = [];
                    var d = distance;

                    if (d == 0)
                        return [{ x: 0, y: 0 }];

                    for (var i = 0; i <= d; i++) {
                        var j = d - i;
                        response.push({ x: +j, y: +i });
                        response.push({ x: -j, y: +i });
                        response.push({ x: +j, y: -i });
                        response.push({ x: -j, y: -i });
                    }
                    return response;
                };

                //===================================================  Lock     =================================================================
                BoardSprite.prototype.lock = function () {
                    this.locked = true;
                };
                BoardSprite.prototype.unlock = function () {
                    this.locked = false;
                };
                return BoardSprite;
            })(createjs.Container);
            Views.BoardSprite = BoardSprite;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Views) {
            var Overlay = (function (_super) {
                __extends(Overlay, _super);
                function Overlay() {
                    _super.call(this);
                    this.buildObjects();
                }
                Overlay.prototype.show = function () {
                    this.visible = true;
                };
                Overlay.prototype.hide = function () {
                    this.visible = false;
                };

                Overlay.prototype.buildObjects = function () {
                    //nothin to do here
                };
                return Overlay;
            })(createjs.Container);
            Views.Overlay = Overlay;

            var MenuOverlay = (function (_super) {
                __extends(MenuOverlay, _super);
                function MenuOverlay() {
                    _super.apply(this, arguments);
                }
                MenuOverlay.prototype.buildObjects = function () {
                    //Add Back Button
                    var menuContainer = new gameui.ui.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.pauseButton = new gameui.ui.TextButton("Pause");
                    menuContainer.addObject(this.pauseButton);
                };
                return MenuOverlay;
            })(Overlay);
            Views.MenuOverlay = MenuOverlay;

            var PauseOverlay = (function (_super) {
                __extends(PauseOverlay, _super);
                function PauseOverlay() {
                    _super.apply(this, arguments);
                }
                PauseOverlay.prototype.buildObjects = function () {
                    this.visible = false;
                    var backgroundShape = new createjs.Shape();

                    backgroundShape.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0, 0, DefaultWidth, DefaultHeight);
                    this.addChild(backgroundShape);

                    var mc = new gameui.ui.MenuContainer();
                    this.addChild(mc);

                    //Add Back Button
                    var menuContainer = new gameui.ui.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.backButton = new gameui.ui.TextButton("Continue");
                    menuContainer.addObject(this.backButton);

                    //add Label
                    mc.addLabel("Paused");

                    mc.addObject(new FlipPlus.Menu.SoundMenu());

                    //add Other Buttons
                    this.replayButton = mc.addButton("SKIP");
                    this.replayButton = mc.addButton("RESTART");
                    this.confirmMainButton = mc.addButton("LEAVE");
                    //this.createConfirmationContainer();
                    //this.addChild(this.confirm);
                    //this.leaveButton.addEventListener("click", () => {
                    //    this.confirm.fadeIn();
                    //    this.leaveButton.fadeOut();
                    //})
                };

                PauseOverlay.prototype.createConfirmationContainer = function () {
                    var _this = this;
                    this.confirm = new gameui.ui.MenuContainer(null, 100);
                    this.confirm.y = DefaultHeight / 1.8;

                    var smc;
                    smc = new gameui.ui.Grid(2, 1, 700, 100, null, true);

                    this.confirm.addLabel("Are you sure?");
                    this.confirm.addObject(smc);
                    smc.regX = 700 / 2;
                    smc.y -= 150;

                    this.confirmMainButton = new gameui.ui.TextButton("Yes", null, "botao2.png");
                    smc.addObject(new gameui.ui.TextButton("No", "", "", "botao2.png", function () {
                        _this.confirm.fadeOut();
                        _this.leaveButton.fadeIn();
                    }));
                    smc.addObject(this.confirmMainButton);
                };

                PauseOverlay.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                return PauseOverlay;
            })(Overlay);
            Views.PauseOverlay = PauseOverlay;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Views) {
            var GamePlayMenu = (function (_super) {
                __extends(GamePlayMenu, _super);
                function GamePlayMenu() {
                    _super.call(this);
                    this.xstart = 150;
                    this.xstep = 310;

                    this.currentItem = 0;
                    this.items = [];
                    this.createGamePlayMenu();
                    this.createPauseMenu();
                    this.addTutorialIndicator();

                    this.buttons = new Object();
                    this.parameters = new Object();
                }
                //adds tutorial touch indicator
                GamePlayMenu.prototype.addTutorialIndicator = function () {
                    this.tutorial_highlightSprite = gameui.AssetsManager.getSprite("touch");
                    this.tutorial_highlightSprite.visible = false;
                    this.tutorial_highlightSprite.mouseEnabled = false;
                    this.addChild(this.tutorial_highlightSprite);
                };

                //creates all menu butons
                GamePlayMenu.prototype.createGamePlayMenu = function () {
                    var _this = this;
                    this.overlayMenu = new gameui.ui.UIItem();
                    this.overlayMenu.width = 2 * DefaultWidth;
                    this.overlayMenu.height = 0;

                    var pausBt = new gameui.ui.IconButton("puzzle/iconepause", "", "", "", "puzzle/btpowerup", function () {
                        _this.pause();
                    });
                    this.overlayMenu.addChild(pausBt), pausBt.x = 1390;

                    this.addChild(this.overlayMenu);
                };

                // ================ Add Buttons ==========================================
                GamePlayMenu.prototype.addButtons = function (buttons) {
                    for (var b in buttons) {
                        var bt = this.createItemButton(buttons[b], this.xstart + this.xstep * this.currentItem);
                        this.currentItem++;
                    }
                };

                //creates a iitem button and its feedback pand parameters, and adds it to screensk
                GamePlayMenu.prototype.createItemButton = function (buttonId, pos) {
                    var _this = this;
                    this.items.push(buttonId);

                    var button = new gameui.ui.IconButton("puzzle/icon_" + buttonId, "", defaultFontFamilyNormal, "white", "puzzle/btpowerup", function () {
                        var parameter = null;
                        if (_this.parameters)
                            parameter = _this.parameters[buttonId];
                        _this.dispatchEvent(buttonId, parameter);
                        _this.parameters[buttonId] = null;
                    });
                    this.overlayMenu.addChild(button);
                    this.buttons[buttonId] = button;
                    button.x = pos;
                    button.icon.x = -130;
                    return button;
                };

                // updates buttons labels
                GamePlayMenu.prototype.updateItemsQuatity = function () {
                    for (var i in this.items)
                        this.buttons[this.items[i]].updateLabel(FlipPlus.FlipPlusGame.itemsData.getItemQuantity(this.items[i]));
                };

                // ============== pause menus ============================================
                GamePlayMenu.prototype.createPauseMenu = function () {
                    var _this = this;
                    var pauseMenu = new gameui.ui.UIItem();

                    var playBt = new gameui.ui.IconButton("puzzle/iconeplay", "", "", "", "puzzle/btplay1", function () {
                        _this.unpause();
                    });
                    playBt.x = 600;
                    var snd1Bt = new gameui.ui.ImageButton("puzzle/btsom1", function () {
                        _this.dispatchEvent("soundOn");
                    });
                    snd1Bt.x = 160;
                    var snd2Bt = new gameui.ui.ImageButton("puzzle/btsom2", function () {
                        _this.dispatchEvent("soundOff");
                    });
                    snd2Bt.x = 160;
                    var backBt = new gameui.ui.ImageButton("puzzle/btsair", function () {
                        _this.dispatchEvent("back");
                    });
                    backBt.x = 400;
                    var restBt = new gameui.ui.ImageButton("puzzle/btrest", function () {
                        _this.dispatchEvent("restart");
                    });
                    restBt.x = -80;

                    pauseMenu.addChild(playBt);
                    pauseMenu.addChild(snd1Bt);
                    pauseMenu.addChild(snd2Bt);
                    pauseMenu.addChild(backBt);
                    pauseMenu.addChild(restBt);

                    var c = new createjs.Container();
                    pauseMenu.addChild(c);

                    this.addChild(pauseMenu);
                    pauseMenu.x = 800;
                    pauseMenu.visible = false;
                    this.pauseMenu = pauseMenu;
                    this.pauseMenu.width = DefaultWidth;
                    this.pauseMenu.height = 0;
                };

                GamePlayMenu.prototype.pause = function () {
                    this.dispatchEvent("pause");
                    this.overlayMenu.fadeOut();
                    this.pauseMenu.fadeIn();
                };

                GamePlayMenu.prototype.unpause = function () {
                    this.dispatchEvent("unpause");
                    this.overlayMenu.fadeIn();
                    this.pauseMenu.fadeOut();
                };

                //================== tutorial ============================================
                GamePlayMenu.prototype.tutorial_HighlightItem = function (itemId, parameter) {
                    this.tutorial_lockAllButtons();
                    this.tutorial_unlockButton(itemId);

                    //highlight the item
                    this.tutorial_highlightSprite.visible = true;
                    this.tutorial_highlightSprite.x = this.buttons[itemId].x;

                    //define parameter for feedback
                    this.parameters[itemId] = parameter;
                };

                //lock all other buttons
                GamePlayMenu.prototype.tutorial_lockAllButtons = function () {
                    this.tutorial_highlightSprite.visible = false;
                    for (var b in this.buttons)
                        this.buttons[b].mouseEnabled = false;
                };

                //lock all other buttons
                GamePlayMenu.prototype.tutorial_unlockAllButtons = function () {
                    this.tutorial_highlightSprite.visible = false;
                    for (var b in this.buttons)
                        this.buttons[b].mouseEnabled = true;
                };

                //unlock desired button
                GamePlayMenu.prototype.tutorial_unlockButton = function (itemId) {
                    this.buttons[itemId].mouseEnabled = true;
                };
                return GamePlayMenu;
            })(gameui.ui.UIItem);
            Views.GamePlayMenu = GamePlayMenu;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        (function (Views) {
            var StatusArea = (function (_super) {
                __extends(StatusArea, _super);
                function StatusArea() {
                    _super.call(this);
                    this.createSprites();
                    this.setMode("puzzle");
                }
                StatusArea.prototype.createSprites = function () {
                    //Background
                    this.bg1 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle2");

                    //this.bg2 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle1");
                    this.bg3 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle2");
                    this.bg3.scaleX = -1;

                    this.bg1.x = DefaultWidth * 0.01;

                    //this.bg2.x = DefaultWidth * 0.5; this.bg2.x -= this.bg2.getBounds().width / 2;
                    this.bg3.x = DefaultWidth * 0.98;

                    this.bg1.y = 30;

                    //this.bg2.y = 30;
                    this.bg3.y = 30;

                    this.addChild(this.bg1);

                    //this.addChild(this.bg2);
                    this.addChild(this.bg3);

                    //Icons
                    this.rightIcon = new createjs.Container();
                    var rightIconContainer = new createjs.Container();

                    this.iconepuzzle = gameui.AssetsManager.getBitmap("puzzle/iconepuzzle");
                    this.iconemoves = gameui.AssetsManager.getBitmap("puzzle/iconemoves");
                    this.iconetime = gameui.AssetsManager.getBitmap("puzzle/iconetime");

                    this.iconepuzzle.x = DefaultWidth * 0.01 + 3;

                    rightIconContainer.x = DefaultWidth * 0.98;
                    rightIconContainer.scaleX = -1;
                    this.iconepuzzle.y = 33;
                    rightIconContainer.y = 33;

                    this.rightIcon.regX = this.rightIcon.x = this.iconemoves.getBounds().width / 2;
                    this.rightIcon.regY = this.rightIcon.y = this.iconemoves.getBounds().height / 2;

                    this.addChild(this.iconepuzzle);
                    this.rightIcon.addChild(this.iconemoves);
                    this.rightIcon.addChild(this.iconetime);
                    rightIconContainer.addChild(this.rightIcon);
                    this.addChild(rightIconContainer);

                    //Text
                    this.text1 = new createjs.Text("", defaultFontFamilyStrong, "#FFF");
                    this.text2 = new createjs.Text("", defaultFontFamilyNormal, "#888");
                    this.text3 = new createjs.Text("", defaultFontFamilyStrong, "#FFF");

                    this.text1.x = DefaultWidth * 0.17;
                    this.text2.x = DefaultWidth * 0.5;
                    this.text3.x = DefaultWidth * 0.83;

                    this.text1.textAlign = this.text2.textAlign = this.text3.textAlign = "center";

                    this.text1.y = this.text2.y = this.text3.y = 65;

                    this.addChild(this.text1);
                    this.addChild(this.text2);
                    this.addChild(this.text3);

                    this.createAlertAnimation();
                };

                //creates a movieClip animation for the alert button
                StatusArea.prototype.createAlertAnimation = function () {
                    var instance = this.rightIcon;
                    this.rightIconMC = new createjs.MovieClip(createjs.MovieClip.SYNCHED, 0, false);

                    this.rightIconMC.timeline.addTween(createjs.Tween.get(instance).to({ scaleX: 1.18, scaleY: 1.18, rotation: 19.2 }, 4).to({ scaleX: 1.16, scaleY: 1.16, rotation: -13.3 }, 8).to({ scaleX: 1.2, scaleY: 1.2, rotation: 19.2 }, 8).to({ scaleX: 1, scaleY: 1, rotation: 0 }, 4).to({ startPosition: 0 }, 35).wait(1));
                };

                StatusArea.prototype.setText1 = function (text) {
                    this.bg1.visible = !(text == "" || text == null);
                    this.text1.text = text;
                };
                StatusArea.prototype.setText2 = function (text) {
                    ;
                    this.text2.text = text;
                };

                StatusArea.prototype.setText3 = function (text) {
                    this.bg3.visible = !(text == "" || text == null);
                    this.text3.text = text;

                    //if time<10 , set a alert
                    if (this.mode == "time" && parseInt(text) < 10)
                        this.rightIconMC.timeline.gotoAndPlay(0);
                };

                //set the behaviour of the puzzle , puzze, draw, moves, time
                StatusArea.prototype.setMode = function (mode) {
                    this.mode = mode;

                    switch (mode) {
                        case "time":
                            this.iconetime.visible = true;
                            this.iconepuzzle.visible = true;
                            this.iconemoves.visible = false;
                            break;
                        case "puzzle":
                            this.iconetime.visible = false;
                            this.iconepuzzle.visible = false;
                            this.iconemoves.visible = false;
                            break;
                        case "moves":
                        case "flip":
                            this.iconetime.visible = false;
                            this.iconepuzzle.visible = false;
                            this.iconemoves.visible = true;
                            break;
                        default:
                            this.iconetime.visible = false;
                            this.iconepuzzle.visible = false;
                            this.iconemoves.visible = false;
                    }
                };
                return StatusArea;
            })(createjs.Container);
            Views.StatusArea = StatusArea;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var BonusScreen = (function (_super) {
            __extends(BonusScreen, _super);
            function BonusScreen(itemsArray, bonusId) {
                if (typeof bonusId === "undefined") { bonusId = "1"; }
                _super.call(this);

                this.itemsArray = itemsArray;

                this.bonusId = bonusId;
                this.itemsEarned = 0;

                //adds scenary
                this.addScene(bonusId);

                //adds footer and itens
                this.addFooter(itemsArray);

                //adds bonus objc
                this.addObjects();

                //adds menu
                // this.addMenu();
                //adds message
                this.message = new FlipPlus.Menu.View.Message();
                this.content.addChild(this.message);

                //adds popup
                this.popup = new FlipPlus.Menu.View.Popup();
                this.content.addChild(this.popup);
                //bring content to front
                //this.view.setChildIndex(this.content, this.view.getNumChildren() - 1);
            }
            //add Scene objects to the view
            BonusScreen.prototype.addScene = function (bonusId) {
                //adds Background
                var background = gameui.AssetsManager.getBitmap(bonusId + "/back");
                background.scaleX = background.scaleY = 2;
                background.name = "background";
                this.background.addChild(background);

                //adds header
                this.header.addChild(gameui.AssetsManager.getBitmap(bonusId + "/header"));
                var titleText = new createjs.Text(stringResources[bonusId + "_title"], defaultFontFamilyNormal, "white");
                titleText.textAlign = "center";
                titleText.text = titleText.text.toUpperCase();
                titleText.x = DefaultWidth / 2;
                titleText.y = 100;
                titleText.textBaseline = "middle";

                this.header.addChild(titleText);

                //adds footer
                var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
                this.footer.addChild(footer);
                footer.y = -291;
            };

            //adds objects to the view <<interface>>
            BonusScreen.prototype.addObjects = function () {
            };

            //create sa footer
            BonusScreen.prototype.addFooter = function (itemsArray) {
                this.footerContainer = new createjs.Container();
                this.footerContainer.y = -291;
                this.footerTexts = [];
                this.footerMaxs = [];

                for (var i = 0; i < itemsArray.length; i++) {
                    var itemId = itemsArray[i];

                    //add icon
                    var itemObj = gameui.AssetsManager.getBitmap("puzzle/icon_" + itemId);
                    itemObj.y = 100;
                    itemObj.x = DefaultWidth / itemsArray.length * i + 40;
                    itemObj.name = itemId;
                    this.footerContainer.addChild(itemObj);

                    //add "max" text
                    var max = gameui.AssetsManager.getBitmap("max");
                    max.y = 50;
                    max.x = DefaultWidth / itemsArray.length * i + 100;
                    max.name = itemId + "_max";
                    this.footerMaxs[itemId] = max;
                    max.visible = false;
                    this.footerContainer.addChild(max);

                    //TODO: add Max indicator
                    //add text
                    var textObj = new createjs.Text("", defaultFontFamilyNormal, "white");
                    textObj.y = 120;
                    textObj.x = DefaultWidth / itemsArray.length * i + 190;
                    textObj.name = itemId + "_text";
                    this.footerTexts[itemId] = textObj;
                    this.footerContainer.addChild(textObj);
                }

                this.footer.addChild(this.footerContainer);
            };

            //updates all footer labels based on user data
            BonusScreen.prototype.updateFooterValues = function () {
                var itemsArray = FlipPlus.UserData.Items.itemsNames;
                for (var i = 0; i < itemsArray.length; i++) {
                    var itemId = itemsArray[i];
                    var textObj = this.footerTexts[itemId];
                    var qt = FlipPlus.FlipPlusGame.itemsData.getItemQuantity(itemId);
                    textObj.text = qt.toString();
                    ;

                    var max = this.footerMaxs[itemId];

                    //show max text if item is 10 or more
                    if (qt >= 10)
                        max.visible = true;
                    else
                        max.visible = false;
                }
            };

            //animate a display object to the menu
            BonusScreen.prototype.animateItemObjectToFooter = function (itemObj, itemId) {
                var _this = this;
                var footerItem = this.footerContainer.getChildByName(itemId);
                if (footerItem) {
                    if (itemObj.parent) {
                        var point = itemObj.parent.localToLocal(0, 0, this.content);

                        createjs.Tween.get(itemObj).to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).to({
                            x: footerItem.x + this.footer.x + this.footerContainer.x - point.x,
                            y: footerItem.y + this.footer.y + this.footerContainer.y - point.y
                        }, 700, createjs.Ease.quadInOut).call(function () {
                            _this.updateFooterValues();
                        });
                    }
                }
            };

            //create a loop animation for a item
            BonusScreen.prototype.animateItemObjectIdle = function (itemObj) {
                createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y }, 500, createjs.Ease.quadInOut);
            };

            //adds menu to the view
            BonusScreen.prototype.addMenu = function () {
                var _this = this;
                this.menu = new FlipPlus.Menu.View.ScreenMenu();
                this.menu.addEventListener("menu", function () {
                    FlipPlus.FlipPlusGame.showOptions();
                });
                this.menu.addEventListener("back", function () {
                    _this.back();
                });
                this.header.addChild(this.menu);
            };

            //updates user Data with new Item
            BonusScreen.prototype.userAquireItem = function (itemId) {
                FlipPlus.FlipPlusGame.itemsData.increaseItemQuantity(itemId);
            };

            BonusScreen.prototype.selectRandomItems = function (quantity) {
                this.itemsArray;
                var items = new Array();

                var ia = ["hint", "hint", "hint", "hint", "skip", "solve", "time", "touch"];

                for (var i = 0; i < quantity; i++)
                    items.push(ia[Math.floor(Math.random() * ia.length)]);

                return items;
            };

            //===========================================================
            BonusScreen.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);

                this.updateFooterValues();
            };

            BonusScreen.prototype.back = function () {
                FlipPlus.FlipPlusGame.showProjectsMenu();
            };

            //finalizes bonus game
            BonusScreen.prototype.endBonus = function () {
                FlipPlus.FlipPlusGame.analytics.logBonus(this.bonusId, this.itemsEarned);

                //lock menu interaction
                //this.menu.fadeOut();
                //back to the screen
                this.back();
            };
            return BonusScreen;
        })(gameui.ScreenState);
        Bonus.BonusScreen = BonusScreen;
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var BonusBarrel = (function (_super) {
            __extends(BonusBarrel, _super);
            function BonusBarrel(itemsArray, sufix) {
                if (typeof sufix === "undefined") { sufix = "1"; }
                _super.call(this, itemsArray, "Bonus1");
            }
            BonusBarrel.prototype.addObjects = function () {
                _super.prototype.addObjects.call(this);
                this.addBarrels();

                var bg = this.background.getChildByName("background");
                bg.scaleX = bg.scaleY = 4;
            };

            BonusBarrel.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);
                this.setNewGame();

                this.popup.showtext(stringResources.b1_popup1Ttitle, stringResources.b1_popup1Text);
            };

            //adds barrels to the scene
            BonusBarrel.prototype.addBarrels = function (barrelsCount, cols) {
                var _this = this;
                if (typeof barrelsCount === "undefined") { barrelsCount = 8; }
                if (typeof cols === "undefined") { cols = 3; }
                //initialize arrays
                this.barrels = [];
                this.BarrelsItens = [];
                this.contentShadow = [];

                var positions = [
                    { x: 120, y: 402 },
                    { x: 927, y: 350 },
                    { x: 562, y: 646 },
                    { x: 195, y: 872 },
                    { x: 1056, y: 784 },
                    { x: 632, y: 1142 },
                    { x: 137, y: 1322 },
                    { x: 1047, y: 1347 }
                ];

                //creates a container
                var barrelsContainer = new createjs.Container();

                for (var b = 0; b < barrelsCount; b++) {
                    var barrel = new gameui.ui.Button();
                    barrel.addEventListener("click", function (event) {
                        _this.barrelTap(event);
                    });

                    //adds Barrel
                    var spriteBarrel = gameui.AssetsManager.getBitmap("Bonus1/barrel" + b);
                    spriteBarrel.rotation = 10;
                    spriteBarrel.regY = 300;
                    spriteBarrel.y = 270;
                    barrel.addChild(spriteBarrel);

                    //adds reflection
                    var spriteReflection = gameui.AssetsManager.getBitmap("Bonus1/barrelReflect");
                    spriteReflection.y = 200;
                    spriteReflection.x = -15;
                    spriteReflection.skewX = -10;
                    spriteReflection.scaleX = 1.02;
                    barrel.addChild(spriteReflection);

                    var bn = barrel.getBounds();
                    barrel.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(bn.x, bn.y, bn.width, bn.height));
                    var spriteWater = gameui.AssetsManager.getSprite("Bonus1/agua");
                    barrel.addChild(spriteWater);
                    spriteWater.gotoAndPlay(Math.random() * 120);

                    barrelsContainer.addChild(barrel);
                    barrelsContainer.y = DefaultHeight / 2 - 1024;

                    //positionning
                    barrel.set(positions[b]);

                    barrel.regX = 180;
                    barrel.regY = 180;

                    barrel.x += 180;
                    barrel.y += 180;

                    if (Math.random() > 0.5)
                        barrel.scaleX = -1;

                    //animate barrel
                    createjs.Tween.get(barrel, { loop: true }).wait(Math.random() * 2000).to({ x: barrel.x - 30 }, 2000, createjs.Ease.quadInOut).wait(Math.random() * 2000).to({ x: barrel.x }, 2000, createjs.Ease.quadInOut);

                    setTimeout(function (a) {
                        createjs.Tween.get(a, { loop: true }).to({ y: a.y - 15 }, 500, createjs.Ease.quadInOut).to({ y: a.y }, 500, createjs.Ease.quadInOut);
                    }, Math.random() * 1000, spriteBarrel);

                    //save obj to local array
                    this.barrels.push(barrel);

                    //instantiate a new container for barrelContent
                    var barrelCcontent = new createjs.Container();
                    barrelCcontent.x = barrel.x - 50;
                    barrelCcontent.y = barrel.y - 150;
                    this.BarrelsItens.push(barrelCcontent);
                    this.content.addChild(barrelCcontent);

                    //instantiate a new shadow for content
                    var shadow = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.3)").drawEllipse(0, 0, 150, 50));
                    shadow.x = barrelCcontent.x - 30;
                    shadow.y = barrelCcontent.y + 220;
                    this.contentShadow.push(shadow);
                    this.content.addChild(shadow);
                }

                this.content.addChild(barrelsContainer);
            };

            //shuffle a new Game
            BonusBarrel.prototype.setNewGame = function (itemsCount) {
                if (typeof itemsCount === "undefined") { itemsCount = 6; }
                var barrelsCount = 8;

                //set barrels clicks
                this.remaningInteraction = 3;

                //avoid errors
                if (itemsCount > barrelsCount)
                    itemsCount = barrelsCount;

                for (var ba in this.barrels) {
                    this.barrels[ba].visible = true;
                    this.barrels[ba].mouseEnabled = true;
                }

                for (var co in this.BarrelsItens)
                    this.BarrelsItens[co].removeAllChildren();

                //clean all items
                this.items = this.randomItensInArray(itemsCount, barrelsCount);

                for (var b = 0; b < this.barrels.length; b++) {
                    //show the item
                    if (this.items[b])
                        this.BarrelsItens[b].addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + this.items[b]));
                    else
                        this.BarrelsItens[b].addChild(gameui.AssetsManager.getBitmap("Bonus1/icone_lata"));

                    //hidesItem
                    this.BarrelsItens[b].visible = false;
                }
            };

            //radomizes itens into a array
            BonusBarrel.prototype.randomItensInArray = function (itemsCount, arrayLength) {
                if (typeof itemsCount === "undefined") { itemsCount = 3; }
                if (typeof arrayLength === "undefined") { arrayLength = 9; }
                var finalList = [];

                //randomize itens in barrels
                var indexesLists = [];
                for (var b = 0; b < arrayLength; b++)
                    indexesLists.push(b);

                for (var i = 0; i < itemsCount; i++) {
                    //select and remove a barrel from a list, and set a item to it
                    var index = Math.floor(Math.random() * indexesLists.length);
                    var barrelId = indexesLists[index];
                    indexesLists.splice(index, 1);

                    //set a random item to the selected barrel
                    finalList[barrelId] = this.getRandomItem();
                }

                return finalList;
            };

            //get a random item from the items list
            BonusBarrel.prototype.getRandomItem = function () {
                var itemArray = ["hint", "hint", "hint", "hint", "hint", "hint", "hint", "hint", "hint", "hint", "hint", "skip", "skip", "skip", "skip", "solve", "time", "touch"];
                var i = Math.floor(Math.random() * itemArray.length);
                var itemId = itemArray[i];

                return itemId;
            };

            //when player tap a barrel
            BonusBarrel.prototype.barrelTap = function (event) {
                //identify tapped barrel
                var barrelId = this.barrels.indexOf(event.currentTarget);
                var barrelObj = this.barrels[barrelId];

                //remove barrel mouse interactivity
                barrelObj.mouseEnabled = false;

                //hide barrel
                createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);

                //show item in barrel
                this.BarrelsItens[barrelId].visible = true;

                //verifies item
                if (this.items[barrelId]) {
                    this.userAquireItem(this.items[barrelId]);
                    this.animateItemObjectToFooter(this.BarrelsItens[barrelId], this.items[barrelId]);
                    createjs.Tween.get(this.contentShadow[barrelId]).to({ alpha: 0 }, 600);
                } else {
                    this.animateItemObjectIdle(this.BarrelsItens[barrelId]);
                }

                //ends bonus game
                this.remaningInteraction--;
                if (this.remaningInteraction <= 0)
                    this.endBonus();
            };

            //finalizes bonus game
            BonusBarrel.prototype.endBonus = function () {
                var _this = this;
                for (var barrel in this.barrels)
                    this.barrels[barrel].mouseEnabled = false;

                for (var b = 0; b < this.barrels.length; b++)
                    this.BarrelsItens[b].visible = true;

                //delay and hide others barrels and show other barrels content
                setTimeout(function () {
                    for (var barrel in _this.barrels)
                        createjs.Tween.get(_this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
                }, 1000);

                setTimeout(function () {
                    _super.prototype.endBonus.call(_this);
                }, 3500);
            };
            return BonusBarrel;
        })(Bonus.BonusScreen);
        Bonus.BonusBarrel = BonusBarrel;
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var Bonus2 = (function (_super) {
            __extends(Bonus2, _super);
            function Bonus2(itemsArray, sufix) {
                if (typeof sufix === "undefined") { sufix = "1"; }
                this.cards = [];
                this.matchesFound = 0;
                _super.call(this, itemsArray, "Bonus2");
            }
            Bonus2.prototype.addObjects = function () {
                _super.prototype.addObjects.call(this);
                var cards = this.generateCards(12, 5, ["hint", "hint", "hint", "hint", "skip", "solve", "time", "touch"]);
                this.pairs = 5;
                this.addCards(cards);
            };

            //===============================================================================
            //verifies all matches in oppened cards
            Bonus2.prototype.matchAll = function (newCard, openedCards) {
                for (var oc in openedCards)
                    this.matchPair(newCard, openedCards[oc]);
            };

            //verifies if two cards matches
            Bonus2.prototype.matchPair = function (card1, card2) {
                if (card1.name == card2.name && card1 != card2) {
                    this.userAquireItem(card1.name);
                    this.userAquireItem(card1.name);

                    card1.opened = false;
                    card2.opened = false;

                    //animate itens
                    this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                    this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);

                    this.matchesFound++;
                    return true;
                }
            };

            //===============================================================================
            //handler when click cards
            Bonus2.prototype.cardClick = function (card) {
                var _this = this;
                card.open();
                this.cardsContainer.setChildIndex(card, this.cardsContainer.getNumChildren() - 1);

                //if card is Jocker (Rat)
                if (card.name == null) {
                    //shake the card
                    card.shakeObj();

                    //decrase lives number
                    this.lives--;
                    card.mouseEnabled = false;
                    if (this.lives == 0) {
                        //if there is no more lives, than end game
                        this.content.mouseEnabled = false;
                        this.message.showtext(stringResources.b2_noMoreChances, 2000, 500);
                        this.message.addEventListener("onclose", function () {
                            _this.endBonus();
                        });
                    }
                    return;
                }

                //if cards matches
                var matches = this.matchAll(card, this.getOpenedCards());

                //verifies if matches all cards
                if (this.matchesFound >= this.pairs) {
                    //ends the game
                    this.content.mouseEnabled = false;
                    this.message.showtext(stringResources.b2_finish, 2000, 500);
                    this.message.addEventListener("onclose", function () {
                        _this.endBonus();
                    });
                }
            };

            //retuns all oppened cards
            Bonus2.prototype.getOpenedCards = function () {
                var openedCards = new Array();
                for (var c in this.cards) {
                    var card = this.cards[c];
                    if (card["opened"])
                        openedCards.push(card);
                }
                return openedCards;
            };

            //adds cards to the board
            Bonus2.prototype.addCards = function (cards) {
                var _this = this;
                var cols = 3;
                var width = 450;
                var height = 320;

                //create cards container
                var cardsContainer = new createjs.Container();
                cardsContainer.x = 184 + 93 + 45;
                cardsContainer.y = 135 + 400;
                this.cardsContainer = cardsContainer;

                for (var c in cards) {
                    var card = new Card(cards[c]);
                    card.x = c % cols * width;
                    card.y = Math.floor(c / cols) * height;
                    cardsContainer.addChild(card);
                    this.cards.push(card);

                    //add cards event listener
                    card.addEventListener("click", function (e) {
                        _this.cardClick(e.currentTarget);
                    });
                }

                this.content.addChild(cardsContainer);
            };

            //generate cards itens to be randomized
            Bonus2.prototype.generateCards = function (cardsCount, pairs, items) {
                var cards = new Array();
                var items2 = new Array();
                items2 = items2.concat(items);

                //set number of lives
                this.lives = cardsCount - pairs * 2;

                for (var p = 0; p < pairs; p++) {
                    var itemIndex = Math.floor(Math.random() * items2.length);
                    cards.push(items2[itemIndex]);
                    cards.push(items2[itemIndex]);
                    items2.splice(itemIndex, 1);
                }

                for (var p = 0; p < cardsCount - pairs * 2; p++)
                    cards.push(null);

                //randomize cards
                var randomizedCards = new Array();
                while (cards.length > 0) {
                    var index = Math.floor(Math.random() * cards.length);
                    randomizedCards.push(cards[index]);
                    cards.splice(index, 1);
                }

                return randomizedCards;
            };
            return Bonus2;
        })(Bonus.BonusScreen);
        Bonus.Bonus2 = Bonus2;

        var Card = (function (_super) {
            __extends(Card, _super);
            function Card(item) {
                _super.call(this);
                this.item = item;

                this.name = item;

                //background
                var bg = gameui.AssetsManager.getBitmap("Bonus2/bonuscard2");
                bg.name = "background";
                this.addChild(bg);

                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = gameui.AssetsManager.getBitmap(itemImage);
                itemDO.name = "item";
                itemDO.x = 368 / 2;
                itemDO.y = 279 / 2;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                itemDO.visible = false;
                this.addChild(itemDO);

                //add cover image
                var cover = new gameui.ui.ImageButton("Bonus2/bonuscard1");
                cover.x = 368 / 2;
                cover.y = 279 / 2;
                cover.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(-368 / 2, -279 / 2, 368, 279));
                cover.name = "cover";
                this.addChild(cover);

                this.regX = 184;
                this.regY = 135;
            }
            //open a card animation
            Card.prototype.open = function () {
                this.getChildByName("item").visible = true;

                var cover = this.getChildByName("cover");
                createjs.Tween.removeTweens(cover);

                createjs.Tween.get(cover).to({ rotation: 90, y: 1000 }, 500, createjs.Ease.sineIn).call(function () {
                    cover.visible = false;
                });
                this.mouseEnabled = false;
                this.opened = true;
            };

            Card.prototype.shakeObj = function () {
                var item = this.getChildByName("item");
                createjs.Tween.removeTweens(item);

                createjs.Tween.get(item).to({ x: 184 + -25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut).to({ x: 184 + +25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut).to({ x: 184 + -25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut).to({ x: 184 + +25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut).to({ x: 184 + +0, scaleX: 1.0, scaleY: 1.0 }, 150, createjs.Ease.quadInOut);
            };
            return Card;
        })(createjs.Container);
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var Bonus3 = (function (_super) {
            __extends(Bonus3, _super);
            function Bonus3(itemsArray, sufix) {
                if (typeof sufix === "undefined") { sufix = "1"; }
                _super.call(this, itemsArray, "Bonus3");
                this.itemsContainer = new createjs.Container();
                this.content.addChild(this.itemsContainer);
                this.currentChestId = 0;
                this.chances = 2;
                this.nextChest();
            }
            Bonus3.prototype.addObjects = function () {
                var _this = this;
                _super.prototype.addObjects.call(this);
                var mc = (new lib["Bonus3"]);
                this.content.addChild(mc);
                this.mainClip = mc;

                //set stops
                this.mainClip.addEventListener("ready", function () {
                    _this.mainClip.stop();
                });
                this.mainClip.addEventListener("WrongEnd", function () {
                    _this.mainClip.stop();
                });
                this.mainClip.addEventListener("End", function () {
                    _this.mainClip.stop();

                    _this.message.showtext(stringResources.b3_finish, 2000, 1000);
                    _this.message.addEventListener("onclose", function () {
                        _this.endBonus();
                    });
                });

                //add keys
                this.keys = new Array();
                this.keys.push(this.mainClip["key1"]);
                this.keys.push(this.mainClip["key2"]);
                this.keys.push(this.mainClip["key3"]);

                this.keys[0].addEventListener("click", function () {
                    _this.pickKey(0);
                });
                this.keys[1].addEventListener("click", function () {
                    _this.pickKey(1);
                });
                this.keys[2].addEventListener("click", function () {
                    _this.pickKey(2);
                });

                this.mainClip["indicator"].stop();
            };

            //========================= Game behaviour =======================
            Bonus3.prototype.nextChest = function () {
                var _this = this;
                // locks mouse
                this.content.mouseEnabled = false;
                if (this.currentChestId < 3) {
                    for (var i in this.keys)
                        createjs.Tween.get(this.keys[i]).to({ alpha: 0 }, 500).call(function (c) {
                            //restart keys
                            _this.keys[c].alpha = 1;
                            _this.keys[c].gotoAndPlay("start");

                            //unlocks mouse
                            _this.content.mouseEnabled = true;
                        }, [i]);

                    //define the correct key for this chest
                    this.correctKeyId = Math.floor(Math.random() * 3);
                    this.currentChestId++;
                }
            };

            Bonus3.prototype.pickKey = function (keyId) {
                var _this = this;
                this.content.mouseEnabled = false;
                this.keys[keyId].gotoAndPlay("key");
                setTimeout(function () {
                    _this.content.mouseEnabled = true;

                    //if key is correct
                    if (keyId == _this.correctKeyId) {
                        //play movie clip
                        _this.mainClip.gotoAndPlay("Ok" + (_this.currentChestId));

                        //go to next chest
                        _this.nextChest();

                        //prvide item to user
                        _this.getItems(_this.currentChestId);
                    } else {
                        //play movieclip
                        _this.mainClip.gotoAndPlay("Wrong" + (_this.currentChestId));

                        //decrease chances
                        _this.chances--;

                        //verify if user lost and updates indicator
                        _this.updateChances();
                    }
                }, 1000);
            };

            Bonus3.prototype.updateChances = function () {
                var _this = this;
                this.mainClip["indicator"].gotoAndStop(2 - this.chances);

                //verify if user looses
                if (this.chances < 0) {
                    this.content.mouseEnabled = false;
                    this.message.showtext(stringResources.b3_noMoreChances, 2000, 1100);
                    this.message.addEventListener("onclose", function () {
                        _this.endBonus();
                    });
                }
            };

            //-----------------------------------------------
            //give items to the user
            Bonus3.prototype.getItems = function (chestId) {
                var _this = this;
                this.itemsContainer.removeAllChildren();
                var items = this.selectRandomItems(4);
                var itemsDo = [];

                for (var i in items) {
                    FlipPlus.FlipPlusGame.itemsData.increaseItemQuantity(items[i]);

                    var item = this.createItem(items[i]);

                    item.set({ x: DefaultWidth / 2, y: DefaultHeight / 2 - 100, alpha: 0 });
                    createjs.Tween.get(item).wait(500).to({ alpha: 1, x: DefaultWidth / 2.5 + (300 * (i - 1)), y: DefaultHeight / 2 - 600 }, 500, createjs.Ease.quadInOut).call(function (itemDo) {
                        _this.animateItemObjectToFooter(itemDo, itemDo.name);
                    }, [item]);
                    this.itemsContainer.addChild(item);
                }
            };

            Bonus3.prototype.createItem = function (item) {
                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = gameui.AssetsManager.getBitmap(itemImage);
                itemDO.name = item;

                //itemDO.x = 368 / 2;
                //itemDO.y = 279 / 2;
                //itemDO.regX = itemDO.getBounds().width / 2;
                //itemDO.regY = itemDO.getBounds().height / 2;
                //itemDO.visible = false;
                itemDO.mouseEnabled = false;
                return itemDO;
            };
            return Bonus3;
        })(Bonus.BonusScreen);
        Bonus.Bonus3 = Bonus3;
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var BonusManager = (function () {
            function BonusManager() {
                this.bonusTimers = [];
            }
            //set time for bonus
            BonusManager.prototype.setBonustime = function (bonusId, time) {
                if (typeof bonusId === "undefined") { bonusId = "bonus"; }
                if (!time)
                    time = Date.now();
                this.bonusTimers[bonusId] = time;
            };

            //get seconds left to the next release
            BonusManager.prototype.getBonusSecondsLeft = function (bonusId) {
                if (typeof bonusId === "undefined") { bonusId = "bonus"; }
                var time = this.bonusTimers[bonusId];
                if (time)
                    return Math.floor(time - Date.now() / 1000);
                else
                    return 0;
            };
            return BonusManager;
        })();
        Bonus.BonusManager = BonusManager;
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var LevelsMenu = (function (_super) {
            __extends(LevelsMenu, _super);
            // Constructor
            function LevelsMenu() {
                _super.call(this);
                //just to know when a user finished a project
                this.projectPreviousState = {};
                //inertia fx
                this.offset = 0;
                this.lastx = 0;

                this.addObjects();
                this.pagesSwipe = new FlipPlus.PagesSwipe(this.projectsContainer, this.projectViews, DefaultWidth, 200, 1500);
                this.createPaginationButtons(this.projectsContainer);
            }
            //--------------------- Initialization ---------------------
            LevelsMenu.prototype.addObjects = function () {
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
                this.popup = new Menu.View.Popup();
                this.content.addChild(this.popup);

                this.message = new Menu.View.Message();
                this.content.addChild(this.message);
            };

            //Adds menu to screen;
            LevelsMenu.prototype.addMenu = function () {
                var _this = this;
                this.menu = new Menu.View.ScreenMenu();

                //TODO fazer camada intermediaria
                //TODO o options sempre volta pro menu principal. O_o
                this.menu.addEventListener("menu", function () {
                    FlipPlus.FlipPlusGame.showOptions();
                });
                this.menu.addEventListener("back", function () {
                    _this.back();
                });
                this.header.addChild(this.menu);
            };

            //adds all projects in swipe view
            LevelsMenu.prototype.addProjects = function () {
                var _this = this;
                //pega projetos
                var projects = FlipPlus.FlipPlusGame.projectManager.getUnlockedProjects();

                for (var p = this.projectViews.length; p < projects.length; p++) {
                    var projectView = new Menu.View.ProjectWorkshopView(projects[p]);
                    this.projectViews.push(projectView);
                    projectView.activate();
                    projectView.x = DefaultWidth * p;
                    projectView.addEventListener("levelClick", function (e) {
                        _this.openLevel(e);
                    });

                    this.projectsContainer.addChild(projectView);
                }
            };

            LevelsMenu.prototype.openLevel = function (event) {
                //cancel click in case of drag
                if (this.pagesSwipe.cancelClick)
                    return;

                var level = event.target['level'];
                var parameters = event.target['parameters'];

                if (level != null)
                    if (level.userdata.unlocked)
                        FlipPlus.FlipPlusGame.showLevel(level, parameters);
            };

            LevelsMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showProjectsMenu();
            };

            // ----------------------- pagination -------------------------------------------------------
            LevelsMenu.prototype.createPaginationButtons = function (pagesContainer) {
                var _this = this;
                //create leftButton
                var lb = new gameui.ui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoPreviousPage();
                });
                lb.y = 1050;
                lb.x = DefaultWidth * 0.1;
                this.content.addChild(lb);

                //create right button
                var rb = new gameui.ui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoNextPage();
                });
                rb.y = 1050;
                rb.x = DefaultWidth * 0.9;
                rb.scaleX = -1;
                this.content.addChild(rb);
                //create pagination indicator
                //TODO
            };

            //--Behaviour-----------------------------------------------------------
            LevelsMenu.prototype.redim = function (headerY, footerY, width) {
                _super.prototype.redim.call(this, headerY, footerY, width);

                for (var pv in this.projectViews)
                    this.projectViews[pv].redim(headerY, footerY);
            };

            LevelsMenu.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this);

                //update enabled Projects
                this.addProjects();

                for (var pv in this.projectViews) {
                    var project = FlipPlus.FlipPlusGame.projectManager.getProjectByName(this.projectViews[pv].name);

                    if (project == FlipPlus.FlipPlusGame.projectManager.getCurrentProject()) {
                        //activate current project
                        this.projectViews[pv].activate(parameters);

                        //goto current project
                        this.pagesSwipe.gotoPage(parseInt(pv), false);

                        //if complete changes to myBotScreen
                        if (project.UserData.complete && this.projectPreviousState[project.name] == false) {
                            this.footer.mouseEnabled = false;
                            this.content.mouseEnabled = false;
                            this.header.mouseEnabled = false;
                            setTimeout(function () {
                                _this.footer.mouseEnabled = true;
                                _this.content.mouseEnabled = true;
                                _this.header.mouseEnabled = true;

                                FlipPlus.FlipPlusGame.showMainMenu();
                            }, 3500);
                        }
                    }

                    //store last state
                    this.projectPreviousState[project.name] = project.UserData.complete;
                }
            };
            return LevelsMenu;
        })(gameui.ScreenState);
        Menu.LevelsMenu = LevelsMenu;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    // Module
    (function (Menu) {
        // Class
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                _super.call(this);
                this.initializeImages();
            }
            Loading.prototype.initializeImages = function () {
                var _this = this;
                var loader = gameui.AssetsManager.loadAssets(getAssetsManifest(assetscale), spriteSheets, images);

                //var loader = Assets.loadAssets();
                var text = new createjs.Text("", "600 90px Arial", "#FFF");
                text.x = DefaultWidth / 2;
                text.y = DefaultHeight / 2;
                text.textAlign = "center";

                this.content.addChild(text);

                //add update% functtion
                loader.addEventListener("progress", function (evt) {
                    text.text = stringResources.ld + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                    return true;
                });

                //creates load complete action
                loader.addEventListener("complete", function (evt) {
                    if (_this.loaded)
                        _this.loaded();
                    return true;
                });
            };
            return Loading;
        })(gameui.ScreenState);
        Menu.Loading = Loading;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.call(this);

                var bg = gameui.AssetsManager.getBitmap("mybotsbg");
                bg.y = -339;
                bg.scaleY = 1.3310546875;
                this.content.addChild(bg);

                this.addIntro();

                this.addMyBots();

                //this.addSmoke();
                this.addMenu();

                this.addTerminal();

                this.addPlayButton();
            }
            MainMenu.prototype.activate = function () {
                _super.prototype.activate.call(this);

                //play BgSound
                //gameui.AssetsManager.playMusic("trilha");
                //Verifies if it is the first time playing
                if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro")) {
                    this.intro.visible = true;
                    this.myBots.visible = false;
                    this.playBt.visible = false;
                    this.intro.playPart1();
                } else if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro2")) {
                    FlipPlus.FlipPlusGame.storyData.setStoryPlayed("intro2");
                    this.intro.visible = true;
                    this.myBots.visible = false;
                    this.playBt.visible = false;
                    this.intro.playPart2();
                } else {
                    this.intro.visible = false;
                    this.playBt.visible = true;
                    this.myBots.visible = true;

                    //updates robots lobby
                    this.myBots.update();
                }
            };

            MainMenu.prototype.addIntro = function () {
                var _this = this;
                this.intro = new Menu.Intro();
                this.content.addChild(this.intro);

                this.intro.addEventListener("readyToPlay", function () {
                    _this.playBt.visible = true;
                });

                this.intro.addEventListener("end", function () {
                    _this.playBt.visible = true;
                });
            };

            MainMenu.prototype.addMyBots = function () {
                var _this = this;
                this.myBots = new FlipPlus.Robots.MyBots(FlipPlus.FlipPlusGame.projectManager);
                this.content.addChild(this.myBots);
                this.myBots.addEventListener("robot", function (e) {
                    _this.robotClick(e.target);
                });
            };

            MainMenu.prototype.addMenu = function () {
                var _this = this;
                this.menu = new Menu.View.ScreenMenu();
                this.menu.addEventListener("back", function () {
                    _this.back();
                });
                this.menu.addEventListener("menu", function () {
                    //TODO fazer camada intermediaria
                    FlipPlus.FlipPlusGame.showOptions();
                });
                this.header.addChild(this.menu);
            };

            MainMenu.prototype.addTerminal = function () {
                this.terminal = new Menu.View.Terminal();
                this.terminal.x = 361;
                this.terminal.y = 451;
                this.content.addChild(this.terminal);
            };

            MainMenu.prototype.addPlayButton = function () {
                var playBt = new gameui.ui.TextButton(stringResources["mm_play"], defaultFontFamilyHighlight, highlightFontColor, "", function () {
                    FlipPlus.FlipPlusGame.showProjectsMenu();
                });

                this.content.addChild(playBt);
                playBt.x = 800;
                playBt.y = 1139;

                this.playBt = playBt;
            };

            MainMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showTitleScreen();
            };

            //TODO: it shoud not be here
            MainMenu.prototype.addSmoke = function () {
                return;
                var smokefx = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536 / 2, 1);
                smokefx.aging = 4000;
                smokefx.birthrate = 0.05;
                smokefx.imageRegX = smokefx.imageRegY = 15;
                smokefx.scale = 8;
                smokefx.scaleFinal = 18;
                smokefx.speedY = -40;
                smokefx.speedX = 70;
                smokefx.speedVariationX = 20;
                smokefx.speedVariationY = 11;
                smokefx.x = 1536 / 2;
                smokefx.y = 1676 + 50;
                this.content.addChild(smokefx);

                smokefx = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536 / 2, 1);
                smokefx.aging = 4000;
                smokefx.birthrate = 0.05;
                smokefx.imageRegX = smokefx.imageRegY = 15;
                smokefx.scale = 8;
                smokefx.scaleFinal = 18;
                smokefx.speedY = -40;
                smokefx.speedX = -70;
                smokefx.speedVariationX = 20;
                smokefx.speedVariationY = 11;
                smokefx.x = 0;
                smokefx.y = 1676 + 50;
                this.content.addChild(smokefx);

                smokefx = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536, 1);
                smokefx.alpha = 1;
                smokefx.finalAlpha = 0;
                smokefx.aging = 20000;
                smokefx.birthrate = 0.005;
                smokefx.imageRegX = smokefx.imageRegY = 15;
                smokefx.scale = 20;
                smokefx.scaleFinal = 48;
                smokefx.speedY = -40;
                smokefx.speedX = -0;
                smokefx.speedVariationX = 20;
                smokefx.speedVariationY = 80;
                smokefx.x = 0;
                smokefx.y = 1676;
                this.content.addChild(smokefx);
            };

            //------------Robots Behaviour ---------------------------------
            MainMenu.prototype.openRobot = function (robot) {
                this.myBots.openRobot(robot);
            };

            MainMenu.prototype.robotClick = function (robot) {
                var t = FlipPlus.FlipPlusGame.timersData.getTimer(robot);
                this.terminal.setText(Math.floor(t / 1000 / 60) + " minutes");
            };
            return MainMenu;
        })(gameui.ScreenState);
        Menu.MainMenu = MainMenu;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var OptionsMenu = (function (_super) {
            __extends(OptionsMenu, _super);
            function OptionsMenu() {
                _super.call(this);
                this.buildObjects();
            }
            OptionsMenu.prototype.buildObjects = function () {
                //Add Back Button
                var bb = new gameui.ui.TextButton(stringResources.op_back, defaultFontFamilyNormal, defaultFontColor, "", function () {
                    FlipPlus.FlipPlusGame.showMainMenu();
                });

                bb.x = bb.y = 100;
                this.content.addChild(bb);

                var cdb = new gameui.ui.TextButton(stringResources.op_erase, defaultFontFamilyNormal, defaultFontColor, "", function () {
                    FlipPlus.FlipPlusGame.projectData.clearAllData();
                    window.location.reload();
                });

                cdb.x = DefaultWidth / 2;
                cdb.y = DefaultHeight / 2;

                //add Other Buttons
                this.content.addChild(cdb);
            };
            return OptionsMenu;
        })(gameui.ScreenState);
        Menu.OptionsMenu = OptionsMenu;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var ProjectsMenu = (function (_super) {
            __extends(ProjectsMenu, _super);
            //==================================== initialization ==============================================
            // Constructor
            function ProjectsMenu() {
                _super.call(this);
                this.projectsItems = [];
                this.bonusItems = [];
                this.createObjects();
            }
            //populate View
            ProjectsMenu.prototype.createObjects = function () {
                var bg = gameui.AssetsManager.getBitmap("projects/bgprojects");
                bg.scaleY = bg.scaleX = 2;
                this.background.addChild(bg);

                this.addHeader();
                this.addProjects();
                this.addBonuses();

                this.pagesSwipe = new FlipPlus.PagesSwipe(this.projectsGrid, this.pages, DefaultWidth);
                this.createPaginationButtons(this.projectsGrid);

                this.createPopup();
            };

            //creates a popup
            ProjectsMenu.prototype.createPopup = function () {
                this.popup = new Menu.View.Popup();
                this.content.addChild(this.popup);
            };

            //Adds defaultMenu to screen
            ProjectsMenu.prototype.addHeader = function () {
                var _this = this;
                //create background
                this.header.addChild(gameui.AssetsManager.getBitmap("projects/projectHeader"));

                this.menu = new Menu.View.ScreenMenu(true, true);

                //TODO fazer camada intermediaria
                //TODO o options sempre volta pro menu principal. O_o
                this.menu.addEventListener("menu", function () {
                    FlipPlus.FlipPlusGame.showOptions();
                });
                this.menu.addEventListener("back", function () {
                    _this.back();
                });
                this.header.addChild(this.menu);

                //create starsIndicator
                this.starsIndicator = new Menu.View.StarsIndicator();
                this.header.addChild(this.starsIndicator);
                this.starsIndicator.x = DefaultWidth;
                this.starsIndicator.y = 220;

                //create bots statistics
                this.statisticsTextField = new createjs.Text("0", defaultFontFamilyNormal, grayColor);
                this.header.addChild(this.statisticsTextField);
                this.statisticsTextField.y = 220;
                this.statisticsTextField.x = 80;
            };

            //update statistics
            ProjectsMenu.prototype.updateStatistcs = function () {
                var done = FlipPlus.FlipPlusGame.projectManager.getFinihedProjects().length;
                var total = FlipPlus.FlipPlusGame.projectManager.getAllProjects().length;
                this.statisticsTextField.text = done + "/" + total + " BOTS";
            };

            //adds projects objects to the view
            ProjectsMenu.prototype.addProjects = function () {
                var _this = this;
                //grid properties
                var xspacing = 500;
                var yspacing = 960;
                var rows = 2;
                var cols = 3;

                //create grid
                this.projectsGrid = new createjs.Container();
                this.content.addChild(this.projectsGrid);
                this.projectsGrid.x = (DefaultWidth - xspacing * cols) / 2 + xspacing / 2;
                this.projectsGrid.y = 600;

                // create Pages
                this.pages = [];
                var currentPage;

                // Create projectItens
                var projects = FlipPlus.FlipPlusGame.projectManager.getAllProjects();

                for (var i = 0; i < projects.length; i++) {
                    //create current page
                    if (i % (cols * rows) == 0) {
                        currentPage = new createjs.Container();

                        var hit = new createjs.Container;
                        hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, DefaultWidth, DefaultHeight)));
                        currentPage.addChild(hit);

                        this.projectsGrid.addChild(currentPage);
                        this.pages.push(currentPage);
                    }

                    var pview = new Menu.View.ProjectItem(projects[i]);

                    //add click event to the item
                    pview.addEventListener("click", function (e) {
                        _this.projectItemClick(e);
                    });

                    //add item to scene
                    this.projectsItems.push(pview);
                    currentPage.addChild(pview);

                    //set item position
                    pview.x = xspacing * (i % cols) + 260;
                    pview.y = yspacing * Math.floor((i % (cols * rows)) / cols);
                }
            };

            //adds bonuses objects to the view
            ProjectsMenu.prototype.addBonuses = function () {
                var _this = this;
                for (var p = 0; p < this.pages.length; p++) {
                    var bonusBt = new Menu.View.BonusItem("Bonus" + (p + 1), function (e) {
                        //cancel click in case of drag
                        if (_this.pagesSwipe.cancelClick)
                            return;

                        var bonusId = e.currentTarget.bonusId;
                        var timer = FlipPlus.FlipPlusGame.timersData.getTimer(bonusId);

                        if (bonusData[bonusId].cost <= FlipPlus.FlipPlusGame.projectManager.getStarsCount()) {
                            if (timer == 0)
                                FlipPlus.FlipPlusGame.showBonus(bonusId);
                            else
                                _this.showtimeWarning(timer.toString());
                        } else {
                            _this.showStarWarning(FlipPlus.FlipPlusGame.projectManager.getStarsCount(), bonusData[bonusId].cost);
                        }
                    });

                    this.pages[p].addChild(bonusBt);
                    this.bonusItems.push(bonusBt);
                }
            };

            //Callback to the project item click
            ProjectsMenu.prototype.projectItemClick = function (e) {
                //cancel click in case of drag
                if (this.pagesSwipe.cancelClick)
                    return;

                //get proper project target
                var t = e.currentTarget;
                var pv = t;
                var p = pv.project;

                if (p.UserData.unlocked)
                    FlipPlus.FlipPlusGame.showProjectLevelsMenu(p, { rebuild: true });
                else {
                    var stars = FlipPlus.FlipPlusGame.projectManager.getStarsCount();
                    if (stars < p.cost)
                        this.showStarWarning(stars, p.cost);
                }
            };

            //Show warning for no using stars
            ProjectsMenu.prototype.showStarWarning = function (stars, cost) {
                this.popup.showtext(stringResources.pr_notStarsTitle, stringResources.pr_notStarsText.split("#")[0] + stars.toString() + stringResources.pr_notStarsText.split("#")[1] + cost.toString() + stringResources.pr_notStarsText.split("#")[2], 10000);
            };

            //show there is no time for it
            ProjectsMenu.prototype.showtimeWarning = function (time) {
                this.popup.showtext(stringResources.pr_notTimeText.split("#")[0], stringResources.pr_notTimeText.split("#")[1] + time + stringResources.pr_notTimeText.split("#")[2], 10000);
            };

            //update all projects preview in the menu page
            ProjectsMenu.prototype.updateProjects = function () {
                for (var i = 0; i < this.projectsItems.length; i++)
                    this.projectsItems[i].updateProjectInfo();
            };

            //update all projects preview in the menu page
            ProjectsMenu.prototype.updateBonuses = function () {
                for (var i = 0; i < 3; i++)
                    this.bonusItems[i].updateProjectInfo();
            };

            //=====================================================
            //create paginations buttons
            ProjectsMenu.prototype.createPaginationButtons = function (pagesContainer) {
                var _this = this;
                var bg = gameui.AssetsManager.getBitmap("projects/projectFooter");
                bg.y = -246;
                this.footer.addChild(bg);

                //create leftButton
                var lb = new gameui.ui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoPreviousPage();
                });
                lb.y = -100;
                lb.x = DefaultWidth * 0.1;
                this.footer.addChild(lb);

                //create right button
                var rb = new gameui.ui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoNextPage();
                });
                rb.y = -100;
                rb.x = DefaultWidth * 0.9;
                rb.scaleX = -1;
                this.footer.addChild(rb);

                //create pagination indicator
                var indicatorContainer = new createjs.Container();
                indicatorContainer.mouseEnabled = false;
                indicatorContainer.x = 500;
                indicatorContainer.y = -130;
                for (var i = 0; i < 3; i++) {
                    var off = gameui.AssetsManager.getBitmap("projects/pageoff");
                    off.x = i * 200;
                    indicatorContainer.addChild(off);

                    var on = gameui.AssetsManager.getBitmap("projects/pageon");
                    on.x = off.x;
                    on.visible = false;
                    on.name = i.toString();
                    indicatorContainer.addChild(on);
                }

                this.pagesSwipe.onPageChange = function (pageId) {
                    for (var i = 0; i < 3; i++)
                        indicatorContainer.getChildByName(i.toString()).visible = false;
                    indicatorContainer.getChildByName(pageId.toString()).visible = true;
                };

                this.footer.addChild(indicatorContainer);

                //goto defaul page
                this.pagesSwipe.gotoPage(0);
            };

            //=====================================================
            //executes when activate the screen
            ProjectsMenu.prototype.activate = function () {
                _super.prototype.activate.call(this);

                this.updateProjects();
                this.updateStatistcs();
                this.updateBonuses();

                this.starsIndicator.updateStarsAmount(FlipPlus.FlipPlusGame.projectManager.getStarsCount());
            };

            //back button
            ProjectsMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showMainMenu();
            };
            return ProjectsMenu;
        })(gameui.ScreenState);
        Menu.ProjectsMenu = ProjectsMenu;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var SoundMenu = (function (_super) {
            __extends(SoundMenu, _super);
            // Constructor
            function SoundMenu() {
                _super.call(this);

                this.createObjects();
            }
            SoundMenu.prototype.createObjects = function () {
                var sfxon = new gameui.ui.IconButton("botaofxon.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setSoundfX(false);
                    sfxon.visible = false;
                    sfxoff.visible = true;
                });
                var sfxoff = new gameui.ui.IconButton("botaofxoff.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setSoundfX(true);
                    sfxoff.visible = false;
                    sfxon.visible = true;
                });
                var muson = new gameui.ui.IconButton("botaomusicaon.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setMusic(false);
                    muson.visible = false;
                    musoff.visible = true;
                });
                var musoff = new gameui.ui.IconButton("botaomusicaoff.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setMusic(true);
                    musoff.visible = false;
                    muson.visible = true;
                });

                musoff.visible = !FlipPlus.FlipPlusGame.settings.getMusic();
                muson.visible = FlipPlus.FlipPlusGame.settings.getMusic();
                sfxoff.visible = !FlipPlus.FlipPlusGame.settings.getSoundfx();
                sfxon.visible = FlipPlus.FlipPlusGame.settings.getSoundfx();

                //Add Sound Buttons
                var soundMenuOn = new gameui.ui.Grid(2, 1, 600, 372, null, true);
                var soundMenuOff = new gameui.ui.Grid(2, 1, 600, 372, null, true);
                soundMenuOn.addObject(sfxon);
                soundMenuOn.addObject(muson);
                soundMenuOff.addObject(sfxoff);
                soundMenuOff.addObject(musoff);

                this.addChild(soundMenuOff);
                this.addChild(soundMenuOn);

                this.regX = 300;
                this.regY = 186;
            };
            return SoundMenu;
        })(createjs.Container);
        Menu.SoundMenu = SoundMenu;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            //View
            var Terminal = (function (_super) {
                __extends(Terminal, _super);
                function Terminal() {
                    _super.call(this);

                    //set informations container
                    this.screenContaier = new createjs.Container();
                    this.addChild(this.screenContaier);

                    //textBox
                    this.textBox = new createjs.Text("", defaultFontFamilyNormal, defaultFontColor);
                    this.textBox.lineWidth = 840;
                    this.screenContaier.addChild(this.textBox);

                    //set its own position
                    this.x = 361;
                    this.y = 451;
                }
                //Set Text on Screen
                //and animate it
                Terminal.prototype.setText = function (text) {
                    //this.animateTransition(() =>
                    //{
                    this.textBox.text = text;
                    //});
                };

                Terminal.prototype.animateTransition = function (action) {
                    //createjs.Tween.get(this.screenContaier).to({ alpha: 0, x: -100 }, 200, createjs.Ease.quadIn).call(() =>
                    //{
                    //    action();
                    //    this.screenContaier.set({ alpha: 0, x: 100 });
                    //    createjs.Tween.get(this.screenContaier).to({ y: 0, alpha: 1 }, 200, createjs.Ease.quadOut)
                    //});
                };
                return Terminal;
            })(createjs.Container);
            View.Terminal = Terminal;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var ScreenMenu = (function (_super) {
                __extends(ScreenMenu, _super);
                function ScreenMenu(backVisible, starsVisible) {
                    if (typeof backVisible === "undefined") { backVisible = true; }
                    if (typeof starsVisible === "undefined") { starsVisible = false; }
                    _super.call(this);
                    this.createObjects(backVisible, starsVisible);
                }
                ScreenMenu.prototype.createObjects = function (backVisible, starsVisible) {
                    var _this = this;
                    if (typeof backVisible === "undefined") { backVisible = true; }
                    if (typeof starsVisible === "undefined") { starsVisible = false; }
                    //adds menu button
                    var menuBt = new gameui.ui.ImageButton("MenuBt", function () {
                        _this.dispatchEvent("menu", menuBt);
                    });
                    menuBt.y = 90;
                    menuBt.x = DefaultWidth - 130;
                    this.addChild(menuBt);

                    //add a bacl buttton
                    var backBt = new gameui.ui.ImageButton("BackBt", function () {
                        _this.dispatchEvent("back", menuBt);
                    });
                    backBt.y = 90;
                    backBt.x = 130;
                    backBt.visible = backVisible;
                    this.addChild(backBt);
                };
                return ScreenMenu;
            })(gameui.ui.UIItem);
            View.ScreenMenu = ScreenMenu;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var LevelGrid = (function (_super) {
                __extends(LevelGrid, _super);
                //Constructor
                function LevelGrid(chapter) {
                    _super.call(this, 5, 2, 1190, 476);
                    this.challangesMap = new Object();
                    this.thumbs = [];
                    this.currentChapter = chapter;
                    this.createChapterSet(chapter);
                }
                //create a chapter menu, containing a lot o challanges
                LevelGrid.prototype.createChapterSet = function (chapter) {
                    var _this = this;
                    for (var i = 0; i < chapter.levels.length; i++) {
                        //get current chapter
                        var level = chapter.levels[i];

                        //save it on the map, (for click feedback)
                        this.challangesMap[level.name] = level;

                        //create a thumb
                        var challangeThumb = new View.LevelThumb(level);
                        this.thumbs.push(challangeThumb);
                        challangeThumb.rotation = Math.random() * 3 - 1.5; //Little angle random.
                        challangeThumb.set({ alpha: 0, scaleX: 1.3, scaleY: 1.3 }); //animate
                        createjs.Tween.get(challangeThumb).wait(50 + i * 50).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);

                        //Add object on grid
                        this.addObject(challangeThumb);

                        //add the click event listener
                        challangeThumb.addEventListener("click", function (e) {
                            ;
                            var tg = (e.currentTarget);
                            var level = _this.challangesMap[tg.name];

                            var parameters = {
                                x: tg.x + tg.parent.x,
                                y: tg.y + tg.parent.y,
                                scaleX: 0.3,
                                scaleY: 0.3
                            };

                            _this.dispatchEvent("levelClick", {
                                level: level,
                                parameters: parameters
                            });
                        });
                    }
                };

                LevelGrid.prototype.updateUserData = function () {
                    for (var i = 0; i < this.thumbs.length; i++) {
                        var level = this.challangesMap[this.thumbs[i].name];
                        var chapter = this.currentChapter;

                        this.thumbs[i].updateUserData();
                    }
                };
                return LevelGrid;
            })(gameui.ui.Grid);
            View.LevelGrid = LevelGrid;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var LevelThumb = (function (_super) {
                __extends(LevelThumb, _super);
                // Constructor
                function LevelThumb(level) {
                    _super.call(this);
                    this.level = level;
                    this.name = level.name;
                    this.theme = level.theme;
                }
                //updates thumbnail with user data information
                LevelThumb.prototype.updateUserData = function () {
                    //create a new thumb
                    this.createThumbs(this.level);

                    this.createHitArea();
                };

                //Create a container with a level thumbnail and evel name
                LevelThumb.prototype.createThumbs = function (level) {
                    this.removeAllChildren();

                    var color1;
                    var color2;
                    var assetSufix;

                    var assetName = this.defineAssetName(level);

                    var thumbContainer = new createjs.Container();
                    this.addChild(thumbContainer);

                    //defines thumb state
                    if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                        assetSufix = "1";
                        color1 = "rgba(255,255,255,0.5)";
                        color2 = "rgba(0,0,0,0.3)";
                    }

                    if (!level.userdata.unlocked || level.userdata.skip || level.userdata.item) {
                        assetSufix = "2";
                        color1 = "rgba(0,0,0,0.5)";
                        color2 = "rgba(0,0,0,0.3)";
                    }

                    if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                        assetSufix = "3";
                        color1 = "rgba(255,255,255,0.9)";
                        color2 = "rgba(0,0,0,0.3)";

                        //create bounce effect if is active
                        thumbContainer.set({ scaleX: 1, scaleY: 1 });
                        createjs.Tween.get(thumbContainer, { loop: true }).to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut).to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut);
                    }

                    //Adds Thumb Backgroud
                    thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));

                    //Adds Thumb Blocks
                    thumbContainer.addChild(this.createBlocks(level, color1, color2));

                    //Adds thumb tags
                    thumbContainer.addChild(this.createTags(level, assetName, assetSufix));

                    //Adds level modificator
                    thumbContainer.addChild(this.createLevelModificator(level));

                    //cache thumb
                    thumbContainer.cache(-99, -102, 198, 204);
                };

                //defines accentColor based on level type.
                LevelThumb.prototype.defineAssetName = function (level) {
                    var assetname = "faseamarela";
                    if (level.theme == "green")
                        assetname = "faseverde";
                    if (level.theme == "purple")
                        assetname = "faseroxa";
                    if (level.theme == "yellow")
                        assetname = "faseamarela";
                    return assetname;
                };

                LevelThumb.prototype.createLevelModificator = function (level) {
                    if (level.userdata.skip) {
                        var sk = gameui.AssetsManager.getBitmap("puzzle/icon_skip");
                        sk.regX = sk.getBounds().width / 2;
                        sk.regY = sk.getBounds().height / 2;
                        return sk;
                    }

                    if (level.userdata.item) {
                        var sk = gameui.AssetsManager.getBitmap("puzzle/icon_" + level.userdata.item);
                        sk.regX = sk.getBounds().width / 2;
                        sk.regY = sk.getBounds().height / 2;
                        return sk;
                    }
                };

                //adds thumb background
                LevelThumb.prototype.createBackgroud = function (level, assetName, assetSufix) {
                    var sbg = gameui.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
                    sbg.regX = sbg.regY = 98;
                    return sbg;
                };

                //adds thumb blocks
                LevelThumb.prototype.createBlocks = function (level, color1, color2) {
                    var spacing = 45;
                    var size = 40;

                    var marginLeft = spacing * 5 / 2;
                    var marginTop = spacing * 5 / 2;
                    var totalSize = level.width * level.height;
                    var blocks = [];

                    for (var i = 0; i < totalSize; i++)
                        blocks[i] = false;

                    //invert a crosses in the block
                    if (level.blocksData)
                        for (var i = 0; i < level.blocksData.length; i++) {
                            var n = level.blocksData[i];
                            blocks[n] = !blocks[n];
                            blocks[n + level.width] = !blocks[n + level.width];
                            blocks[n - level.width] = !blocks[n - level.width];
                            if (n % level.width != 0)
                                blocks[n - 1] = !blocks[n - 1];
                            if (n % level.width != level.width - 1)
                                blocks[n + 1] = !blocks[n + 1];
                        }
                    var s = new createjs.Shape();

                    for (var col = 1; col < 4; col++) {
                        for (var row = 1; row < 4; row++) {
                            var color;
                            if (blocks[col * level.width + row])
                                color = color1;
                            else
                                color = color2;
                            s.graphics.beginFill(color).drawRect(spacing * col - marginLeft, spacing * row - marginTop, size, size);
                        }
                    }

                    return s;
                };

                //Adds Thumb Tag
                LevelThumb.prototype.createTags = function (level, assetName, assetSufix) {
                    //TODO: essas string devem estar em um enum
                    if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                        var tag = gameui.AssetsManager.getBitmap("workshop/" + assetName + (level.type == "moves" ? "flip" : level.type) + assetSufix);
                        tag.regX = tag.regY = 100;
                        return tag;
                    }
                };
                return LevelThumb;
            })(gameui.ui.Button);
            View.LevelThumb = LevelThumb;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // View Class
            var StarsIndicator = (function (_super) {
                __extends(StarsIndicator, _super);
                // Constructor
                function StarsIndicator() {
                    _super.call(this);
                    this.buildView();
                    this.createHitArea();
                }
                //updates Parts indicator amount
                StarsIndicator.prototype.updatePartsAmount = function (newQuantity, tween) {
                    if (typeof tween === "undefined") { tween = true; }
                    //this.partsTextField.text = newQuantity.toString();
                };

                //updates Parts indicator amount
                StarsIndicator.prototype.updateStarsAmount = function (newQuantity, tween) {
                    if (typeof tween === "undefined") { tween = true; }
                    this.starsTextField.text = newQuantity.toString();
                };

                //add objects to View
                StarsIndicator.prototype.buildView = function () {
                    //add Background
                    //var bg = gameui.AssetsManager.getBitmap("partshud");
                    //if (bg.getBounds())
                    //this.regX = bg.getBounds().width/2;
                    //this.addChild(bg);
                    //this.infoCotainer = new createjs.Container();
                    var si = gameui.AssetsManager.getBitmap("starsicon");
                    si.scaleX = si.scaleY = 0.9;
                    this.starsTextField = new createjs.Text("0", defaultFontFamilyNormal, grayColor);
                    this.starsTextField.textAlign = "right";
                    this.starsTextField.x = -140;

                    this.addChild(si);
                    this.addChild(this.starsTextField);

                    si.x = -120;
                    si.y = -5;
                };
                return StarsIndicator;
            })(gameui.ui.Button);
            View.StarsIndicator = StarsIndicator;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var ProjectItem = (function (_super) {
                __extends(ProjectItem, _super);
                function ProjectItem(project) {
                    _super.call(this);

                    this.project = project;

                    this.regX = 480 / 2;
                    this.regY = 480 / 2;

                    this.updateProjectInfo();
                }
                //createObjects
                ProjectItem.prototype.createObjects = function (project) {
                    var color = "#00427b";
                    var font = "50px " + defaultFont;

                    //clean all objects
                    this.removeAllChildren();

                    if (project.UserData.unlocked) {
                        //background
                        var bg = "projects/slot" + (project.UserData.stars ? project.UserData.stars : 0);
                        var s = gameui.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //robot name text
                        var robotName = new createjs.Text(project.nickName, font, color);
                        robotName.x = 14;
                        robotName.y = 00;
                        this.addChild(robotName);

                        //percentage text
                        var percenttext = new createjs.Text((project.UserData.percent * 100).toString() + "%", font, color);
                        percenttext.x = 310;
                        percenttext.y = 364;
                        this.addChild(percenttext);

                        //robot image
                        if (project.UserData.complete)
                            var botImage = gameui.AssetsManager.getBitmap("projects/" + project.name);
                        else
                            var botImage = gameui.AssetsManager.getBitmap("projects/" + project.name + "_shadow");
                        this.addChild(botImage);

                        //and stars
                        var starsIndicator = new View.ProjectStarsIndicator(project);
                        starsIndicator.updateProjectInfo();
                        starsIndicator.y = 350;
                        starsIndicator.x = 30;
                        starsIndicator.scaleX = starsIndicator.scaleY = 0.7;
                        this.addChild(starsIndicator);
                    } else {
                        //adds Background
                        var bg = "projects/slotl";
                        var s = gameui.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //adds lock indicator
                        var star = gameui.AssetsManager.getBitmap("projects/star");
                        this.addChild(star);
                        star.x = 240;
                        star.y = 190;

                        //addsText
                        var tx = new createjs.Text(project.cost.toString(), "Bold 100px " + defaultFont, grayColor);
                        this.addChild(tx);
                        tx.textAlign = "right";
                        tx.x = 220;
                        tx.y = 175;
                    }

                    //cache object
                    //this.cache(0, 0, 480, 480);
                    //create hitArea
                    this.createHitArea();
                };

                //updates based on porject
                ProjectItem.prototype.updateProjectInfo = function () {
                    //verifica se o projeto pode ser destravado
                    //TODO. nao devia acessar metodo global aqui
                    FlipPlus.FlipPlusGame.projectManager.unlockProject(this.project);

                    //update the objects display
                    this.createObjects(this.project);

                    this.scaleX = this.scaleY = 1;
                    createjs.Tween.removeTweens(this);

                    //if is new (unlocked and not played) do an animation
                    if (this.project.UserData.percent == 0 && this.project.UserData.unlocked) {
                        this.set({ scaleX: 1, scaleY: 1 });
                        createjs.Tween.get(this, { loop: true }).to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut).to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut);
                    }
                };
                return ProjectItem;
            })(gameui.ui.Button);
            View.ProjectItem = ProjectItem;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            //View
            var ProjectProgressIndicator = (function (_super) {
                __extends(ProjectProgressIndicator, _super);
                function ProjectProgressIndicator() {
                    _super.call(this);

                    this.createObjects();
                }
                //create objects
                ProjectProgressIndicator.prototype.createObjects = function () {
                    var bg = new createjs.Shape();
                    bg.graphics.beginFill("#FA0").rect(0, 0, 400, 150);
                    this.addChild(bg);

                    var pbarbg = new createjs.Shape();
                    pbarbg.graphics.beginFill("#620").rect(50, 50, 300, 50);
                    this.addChild(pbarbg);

                    var pbar = new createjs.Shape();
                    pbar.graphics.beginFill("#FF0").rect(50, 50, 300, 50);
                    this.addChild(pbar);
                    this.progressBar = pbar;
                };

                // update object based on its info
                ProjectProgressIndicator.prototype.updateProjectInfo = function (progress) {
                    if (progress > 1)
                        progress = 1;
                    if (progress < 0)
                        progress = 0;

                    if (progress == undefined)
                        progress = 0;
                    this.progressBar.scaleX = progress;
                };
                return ProjectProgressIndicator;
            })(createjs.Container);
            View.ProjectProgressIndicator = ProjectProgressIndicator;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var ProjectStarsIndicator = (function (_super) {
                __extends(ProjectStarsIndicator, _super);
                function ProjectStarsIndicator(project) {
                    _super.call(this);
                    this.projectsThemes = ["green", "purple", "yellow"];
                    this.project = project;
                    this.createObjects();
                }
                //create objects
                ProjectStarsIndicator.prototype.createObjects = function () {
                    this.stars = [];

                    for (var i = 0; i < this.projectsThemes.length; i++) {
                        this.stars[i] = this.createStar(i);
                        this.stars[i].visible = false;
                    }

                    this.updateProjectInfo(false);
                };

                //create a simple star object
                ProjectStarsIndicator.prototype.createStar = function (id) {
                    var str = "";
                    switch (id) {
                        case 0:
                            str = "workshop/stargreen";
                            break;
                        case 1:
                            str = "workshop/starpurple";
                            break;
                        case 2:
                            str = "workshop/staryellow";
                            break;
                    }
                    var s = gameui.AssetsManager.getBitmap(str);
                    s.x = id * 121;
                    this.addChild(s);
                    return s;
                };

                // update object based on its info
                ProjectStarsIndicator.prototype.updateProjectInfo = function (anim) {
                    if (typeof anim === "undefined") { anim = true; }
                    var project = this.project;

                    ////hide all stars
                    //for (var i = 0; i < this.projectsTypes.length; i++)
                    //    this.stars[i].visible = false;
                    var starsInfo = new Object();

                    for (var i = 0; i < this.projectsThemes.length; i++)
                        for (var l = 0; l < project.levels.length; l++)
                            if (this.projectsThemes[i] == project.levels[l].theme)
                                starsInfo[i] = true;

                    for (var i = 0; i < this.projectsThemes.length; i++)
                        for (var l = 0; l < project.levels.length; l++)
                            if (this.projectsThemes[i] == project.levels[l].theme)
                                if (!project.levels[l].userdata.solved || project.levels[l].userdata.item)
                                    starsInfo[i] = false;

                    for (var i = 0; i < 3; i++) {
                        if (this.stars[i].visible != starsInfo[i]) {
                            this.stars[i].visible = starsInfo[i];

                            //animate
                            if (anim && starsInfo[i]) {
                                this.stars[i].set({ scaleX: 4, scaleY: 4, rotation: -45, alpha: 0 });
                                createjs.Tween.get(this.stars[i]).wait(700).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 1500, createjs.Ease.bounceOut);
                            }
                        }
                    }
                };
                return ProjectStarsIndicator;
            })(createjs.Container);
            View.ProjectStarsIndicator = ProjectStarsIndicator;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Projects) {
        var Level = (function () {
            function Level() {
            }
            return Level;
        })();
        Projects.Level = Level;

        var LevelUserData = (function () {
            function LevelUserData() {
            }
            return LevelUserData;
        })();
        Projects.LevelUserData = LevelUserData;
    })(FlipPlus.Projects || (FlipPlus.Projects = {}));
    var Projects = FlipPlus.Projects;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Projects) {
        // Class
        // Data Object - Model
        var Project = (function () {
            function Project() {
            }
            return Project;
        })();
        Projects.Project = Project;

        var ProjectUserData = (function () {
            function ProjectUserData() {
            }
            return ProjectUserData;
        })();
        Projects.ProjectUserData = ProjectUserData;
    })(FlipPlus.Projects || (FlipPlus.Projects = {}));
    var Projects = FlipPlus.Projects;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Projects) {
        // Controls projects and Levels.
        // Model
        var ProjectManager = (function () {
            // ------------------------------- initialization ----------------------------------------//
            function ProjectManager(data, userData) {
                //Max simultaneous working/avaliable projects
                this.maxAvaliableProjects = 6;
                this.userData = userData;
                this.loadProjects(data);
            }
            ProjectManager.prototype.loadProjects = function (data) {
                for (var p in data) {
                    delete data[p].UserData;
                }
                for (var p in data) {
                    for (var l in data[p].levels) {
                        delete data[p].levels[l].userdata;
                    }
                }
                for (var p in data) {
                    for (var l in data[p].levels) {
                        data[p].levels[l].name = p + "/" + l;
                    }
                }

                this.projects = data;

                //append the project name in each level.
                //for (var p in this.projects)
                //    for (var l in this.projects[p].levels) {
                //        this.projects[p].levels[l].name = this.projects[p].name + "/" + this.projects[p].levels[l].name;
                //        ///this.projects[p].levels[l].project = this.projects[p];
                //    }
                //create a user data for each level/project
                this.userData.addUserData(this.projects);
            };

            // ------------------------------- manager Levels ----------------------------------------
            //get current Level
            ProjectManager.prototype.getCurrentLevel = function () {
                return this.currentLevel;
            };

            //set current level
            ProjectManager.prototype.setCurrentLevel = function (level) {
                this.currentLevel = level;
                for (var p in this.projects) {
                    if (this.projects[p].levels.indexOf(level) >= 0) {
                        this.setCurrentProject(this.projects[p]);
                        break;
                    }
                }
            };

            //skip a project
            ProjectManager.prototype.skipLevel = function (level) {
                if (level == null)
                    return;

                //TODO: Verifies if skip is possible
                //if the level is not solved yet
                if (!level.userdata.solved) {
                    level.userdata.skip = true;

                    //updates next level
                    var nextLevel = this.getNextLevel();
                    if (nextLevel != null)
                        this.unlockLevel(nextLevel);

                    //updates project info
                    this.updateProjectUserData(this.getCurrentProject());

                    //save user data
                    this.userData.saveLevelData(level);
                    this.userData.saveProjectData(this.getCurrentProject());
                }
            };

            //Finish a project.
            ProjectManager.prototype.completeLevel = function (level) {
                //updates level;
                level.userdata.solved = true;
                level.userdata.skip = false;
                level.userdata.unlocked = true;

                //updates next level
                var nextLevel = this.getNextLevel();
                if (nextLevel != null)
                    this.unlockLevel(nextLevel);

                //updates project info
                this.updateProjectUserData(this.getCurrentProject());

                //save user data
                this.userData.saveLevelData(level);
                this.userData.saveProjectData(this.getCurrentProject());
            };

            //get next level inside a project
            ProjectManager.prototype.getNextLevel = function () {
                //get current project and level
                var project = this.getCurrentProject();
                var level = this.getCurrentLevel();

                //if is not on a project or level return null
                if (project == null || level == null)
                    return null;

                //seek for all levels in the project
                // -1 is to avoid the "last" project and stack overflow
                var levels = project.levels;
                for (var l = 0; l < levels.length - 1; l++)
                    //identify the current level and return its next
                    if (levels[l] == level)
                        return levels[l + 1];

                // if not found return null
                return null;
            };

            // ------------------------------- manager Projects ----------------------------------------
            //get current Project
            ProjectManager.prototype.getCurrentProject = function () {
                return this.currentProject;
            };

            //set current project
            ProjectManager.prototype.setCurrentProject = function (project) {
                this.currentProject = project;
            };

            //Get all Projects
            ProjectManager.prototype.getAllProjects = function () {
                return this.projects;
            };

            //get a single project by name
            ProjectManager.prototype.getProjectByName = function (name) {
                for (var p in this.projects)
                    if (this.projects[p].name == name)
                        return this.projects[p];

                return null;
            };

            //TODO remove
            //Get all avaliable projects to work or to unlock
            ProjectManager.prototype.agetUnlockedProjects = function () {
                //return array with avaliable projects
                var avaliableProjects = [];

                for (var i = 0; i < this.projects.length; i++)
                    if (this.projects[i].UserData.unlocked)
                        avaliableProjects.push(this.projects[i]);

                return avaliableProjects;
            };

            //get all finished Projects
            ProjectManager.prototype.getFinihedProjects = function () {
                //return array with avaliable projects
                var finishedProjects = [];

                for (var i = 0; i < this.projects.length; i++)
                    if (this.projects[i].UserData.complete)
                        finishedProjects.push(this.projects[i]);

                return finishedProjects;
            };

            //get all unlockedProjects
            ProjectManager.prototype.getUnlockedProjects = function () {
                //return array with avaliable projects
                var unlockedProjects = [];

                for (var i = 0; i < this.projects.length; i++)
                    if (this.projects[i].UserData.unlocked)
                        unlockedProjects.push(this.projects[i]);

                return unlockedProjects;
            };

            //getProjectStars
            ProjectManager.prototype.getStarsCount = function () {
                var stars = 0;

                for (var p in this.projects)
                    if (this.projects[p].UserData.stars)
                        stars += this.projects[p].UserData.stars;

                return stars;
            };

            //----------------------------- Actions -----------------------------------------------------
            //unlock a project based on user parts ballance
            ProjectManager.prototype.unlockProject = function (project) {
                // //verifies if money was propery taken
                if (this.getStarsCount() >= project.cost) {
                    //unlock project user data
                    project.UserData.unlocked = true;

                    //unlocks first level of project
                    project.levels[0].userdata.unlocked = true;

                    //save user data
                    this.userData.saveProjectData(project);
                    this.userData.saveLevelData(project.levels[0]);
                }
            };

            //unlock a level inside a project
            ProjectManager.prototype.unlockLevel = function (level) {
                //unlock level user data
                level.userdata.unlocked = true;
                this.userData.saveLevelData(level);
            };

            //Finish a project.
            ProjectManager.prototype.completeProject = function (project) {
                //TODO colocar isso em outro lugar
                //set played the intro when a project is complete
                FlipPlus.FlipPlusGame.storyData.setStoryPlayed("intro");

                if (project.UserData.complete == true)
                    return;

                project.UserData.complete = true;
                this.userData.saveProjectData(project);
            };

            //Updates user data project status
            ProjectManager.prototype.updateProjectsUserData = function () {
                for (var i = 0; i < this.projects.length; i++)
                    this.updateProjectUserData(this.projects[i]);
            };

            //Updates user data project status
            ProjectManager.prototype.updateProjectUserData = function (project) {
                var solvedLevels = 0;

                for (var l = 0; l < project.levels.length; l++)
                    if (project.levels[l].userdata.solved || project.levels[l].userdata.skip || project.levels[l].userdata.item)
                        solvedLevels++;

                //calculate percentage
                project.UserData.percent = solvedLevels / project.levels.length;

                //calculate Stars
                var stars = 0;
                var temp = new Object;
                for (var l = 0; l < project.levels.length; l++) {
                    var level = project.levels[l];

                    if (temp[level.theme] == null)
                        temp[level.theme] = true;

                    if (!level.userdata.solved || level.userdata.item)
                        temp[level.theme] = false;
                }
                for (var i in temp) {
                    if (temp[i])
                        stars++;
                }

                //updates project stars count
                project.UserData.stars = stars;

                //verifies if level can be ulocked
                this.unlockProject(project);

                //complete Project
                if (solvedLevels == project.levels.length)
                    this.completeProject(project);
            };
            return ProjectManager;
        })();
        Projects.ProjectManager = ProjectManager;
    })(FlipPlus.Projects || (FlipPlus.Projects = {}));
    var Projects = FlipPlus.Projects;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Robots) {
        // Controller Class
        var MyBots = (function (_super) {
            __extends(MyBots, _super);
            //----------------------initialization ---------------------------
            function MyBots(projectManager) {
                _super.call(this);
                this.projectManager = projectManager;
                this.initializeGraphics();
                this.initializeNames();
                ////TODO, arrumar essa gambiarra sem vergonha
                //setTimeout(() => { this.initializeUserFeedback(); },100);
            }
            //loads and add lobby graphics to the view
            MyBots.prototype.initializeGraphics = function () {
                this.myBots = new lib.MyBots();
                this.addChild(this.myBots);
            };

            //add names for each robot instance in lobby (toolkit plugin does not make it automatically)
            MyBots.prototype.initializeNames = function () {
                var projects = this.projectManager.getAllProjects();

                for (var p = 0; p < projects.length; p++) {
                    var robotName = projects[p].name;
                    var robotMC = this.myBots[robotName];
                    if (robotMC != null)
                        robotMC.name = robotName;
                }
                //this.myBots["main"].name = "main";
            };

            //adds a user feedback for click action
            MyBots.prototype.initializeUserFeedback = function () {
                var _this = this;
                FlipPlus.FlipPlusGame.gameScreen.stage.update();
                for (var c = 0; c < this.myBots.getNumChildren(); c++) {
                    var robot = this.myBots.getChildAt(c);
                    ;
                    robot.addEventListener("click", function (e) {
                        _this.userfeedback(e);
                    });

                    var hit = new createjs.Shape();
                    hit.graphics.beginFill("#000").drawRect(robot.getBounds().x, robot.getBounds().y, robot.getBounds().width, robot.getBounds().height);

                    robot.hitArea = hit;
                }
            };

            //User action feedback to user touch
            MyBots.prototype.userfeedback = function (event) {
                var robotMc = event.currentTarget;
                var project = this.projectManager.getProjectByName(robotMc.name);

                //verifies if robot is ready or have parts ready
                if (project && project.UserData.complete || !project) {
                    robotMc.gotoAndPlay("touch");
                    this.dispatchEvent("robot", robotMc.name);
                }
            };

            //-----------------------------------------------------------
            //Updates Robot lobby idle behaviour
            MyBots.prototype.update = function () {
                //get Robots
                var projects = this.projectManager.getFinihedProjects();

                //set all robots to start position
                this.hideAllRobots();

                for (var r = 0; r < projects.length; r++)
                    this.showRobot(projects[r].name);
            };

            ////updates revenuesTimers
            ////NOTE, talvez isso nao deva ficar aqui
            //private checkRevenueTimers() {
            //
            //    //get projects
            //    var projects = FlipPlusGame.projectManager.getFinihedProjects();
            //
            //    //if is null create a timer
            //    //TODO, deve criar o timer quando conclui o projeto.
            //
            //    //set idle to the finished projects
            //    for (var r in projects)
            //        //if robot has parts, set it alert
            //        if (FlipPlusGame.timersData.getTimer(projects[r].name) < 0)
            //            this.alertRobot(projects[r].name);
            //}
            //hide All Robots from Screen
            MyBots.prototype.hideAllRobots = function () {
                for (var c = 0; c < this.myBots.getNumChildren(); c++)
                    this.myBots.getChildAt(c).visible = false;
                //
                // this.showRobot("main");
            };

            //show a robot on screen by name
            MyBots.prototype.showRobot = function (robotName) {
                var robotMC = this.myBots[robotName];
                if (robotMC != null)
                    robotMC.visible = true;
            };

            //play robot opening animation
            MyBots.prototype.openRobot = function (robotName) {
                var robotMC = this.myBots[robotName];
                //if (robotMC != null)
                //    robotMC.gotoAndPlay("opening");
            };

            //play robot alert animation
            MyBots.prototype.alertRobot = function (robotName) {
                var robotMC = this.myBots[robotName];
                //if (robotMC != null)
                //    robotMC.gotoAndPlay("alert");
            };
            return MyBots;
        })(createjs.Container);
        Robots.MyBots = MyBots;
    })(FlipPlus.Robots || (FlipPlus.Robots = {}));
    var Robots = FlipPlus.Robots;
})(FlipPlus || (FlipPlus = {}));
/// <reference path="script/typing/createjs/createjs.d.ts" />
/// <reference path="script/typing/gameuijs/gameuijs.d.ts" />
/// <reference path="src/preferences.ts" />
/*scripts*/ /// <reference path="src/FlipPlusGame.ts" />
/// <reference path="src/UserData/Items.ts" />
/// <reference path="src/UserData/Settings.ts" />
/// <reference path="src/UserData/Story.ts" />
/// <reference path="src/UserData/Timers.ts" />
/// <reference path="src/UserData/ProjectsData.ts" />
/// <reference path="src/GamePlay/LevelScreen.ts" />
/// <reference path="src/GamePlay/Puzzle.ts" />
/// <reference path="src/GamePlay/TimeAttack.ts" />
/// <reference path="src/GamePlay/Tutorial.ts" />
/// <reference path="src/GamePlay/Model/Block.ts" />
/// <reference path="src/GamePlay/Model/Board.ts" />
/// <reference path="src/GamePlay/Model/Level.ts" />
/// <reference path="src/GamePlay/Views/BlockSprite.ts" />
/// <reference path="src/GamePlay/Views/BoardSprite.ts" />
/// <reference path="src/GamePlay/Views/Overlay.ts" />
/// <reference path="src/GamePlay/Views/GameplayMenu.ts" />
/// <reference path="src/GamePlay/Views/StatusArea.ts" />
/// <reference path="src/bonus/bonusscreen.ts" />
/// <reference path="src/bonus/bonus1.ts" />
/// <reference path="src/bonus/bonus2.ts" />
/// <reference path="src/bonus/bonus3.ts" />
/// <reference path="src/bonus/bonusmanager.ts" />
/// <reference path="src/Menu/LevelsMenu.ts" />
/// <reference path="src/Menu/Loading.ts" />
/// <reference path="src/Menu/MainMenu.ts" />
/// <reference path="src/Menu/OptionsMenu.ts" />
/// <reference path="src/Menu/ProjectsMenu.ts" />
/// <reference path="src/Menu/SoundMenu.ts" />
/// <reference path="src/Menu/View/Terminal.ts" />
/// <reference path="src/Menu/View/ScreenMenu.ts" />
/// <reference path="src/Menu/View/LevelGrid.ts" />
/// <reference path="src/Menu/View/LevelThumb.ts" />
/// <reference path="src/Menu/View/PartsIndicator.ts" />
/// <reference path="src/Menu/View/ProjectItem.ts" />
/// <reference path="src/Menu/View/ProjectProgressIndicator.ts" />
/// <reference path="src/Menu/View/ProjectStarsIndicator.ts" />
/// <reference path="src/Projects/Level.ts" />
/// <reference path="src/Projects/Project.ts" />
/// <reference path="src/Projects/ProjectManager.ts" />
/// <reference path="src/Robots/MyBots.ts" />
var gameui;
(function (gameui) {
    // Class
    var aAssetsManager = (function () {
        function aAssetsManager() {
        }
        aAssetsManager.loadAssets = function (assetsManifest, spriteSheets, imagesArray) {
            //cleans previous loaded assets.
            this.cleanAssets();

            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.imagesArray = imagesArray ? imagesArray : new Array();
            this.assetsManifest = assetsManifest;

            //creates a preload queue
            this.loader = new createjs.LoadQueue();

            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", function (evt) {
                if (evt.item.type == "image")
                    imagesArray[evt.item.id] = evt.result;
                return true;
            });

            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest);

            return this.loader;
        };

        // cleans all sprites in the bitmap array;
        aAssetsManager.cleanAssets = function () {
            if (this.loader)
                this.loader.reset();

            if (this.imagesArray)
                ;
            for (var i in this.imagesArray) {
                delete this.imagesArray[i];
            }
        };

        aAssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };

        //gets a image from assets
        aAssetsManager.getBitmap = function (name) {
            //if image id is described in spritesheets
            if (this.spriteSheets[name])
                return this.getSprite(name, false);

            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);

            //or else try grab by filename
            return new createjs.Bitmap(name);
        };

        //Get a preloaded Image from assets
        aAssetsManager.getLoadedImage = function (name) {
            return this.loader.getResult(name);
        };

        //DEPRECIATED
        //get a movie clip
        aAssetsManager.getMovieClip = function (name) {
            var t = new window[name];
            return t;
        };

        //return a sprite according to the image
        aAssetsManager.getSprite = function (name, play) {
            if (typeof play === "undefined") { play = true; }
            var data = this.spriteSheets[name];
            for (var i in data.images)
                if (typeof data.images[i] == "string")
                    data.images[i] = this.getLoadedImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play)
                sprite.play();
            return sprite;
        };
        return aAssetsManager;
    })();
    gameui.aAssetsManager = aAssetsManager;
})(gameui || (gameui = {}));
var aagameui;
(function (aagameui) {
    // Class
    var AssetsManager = (function () {
        function AssetsManager() {
        }
        AssetsManager.loadAssets = function (assetsManifest, spriteSheets, imagesArray) {
            this.spriteSheets = spriteSheets ? spriteSheets : [];
            this.assetsManifest = assetsManifest;

            //create a image array
            this.imagesArray = new Array();

            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);

            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", function (evt) {
                if (evt.item.type == "image")
                    imagesArray[evt.item.id] = evt.result;
                return true;
            });

            //loads entire manifest
            //this.loader.loadManifest(this.assetsManifest);
            return this.loader;
        };

        AssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };

        //gets a image from assets
        AssetsManager.getBitmap = function (name) {
            //if image id is described in spritesheets
            if (this.spriteSheets[name])
                return this.getSprite(name, false);

            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);

            //or else try grab by filename
            return new createjs.Bitmap(name);
        };

        //Get a preloaded Image from assets
        AssetsManager.getLoadedImage = function (name) {
            for (var i in this.assetsManifest) {
                if (this.assetsManifest[i]["id"] == name)
                    return this.assetsManifest[i]["src"];
            }
            return this.loader.getResult(name);
        };

        //return a sprite according to the image
        AssetsManager.getSprite = function (name, play) {
            if (typeof play === "undefined") { play = true; }
            var data = this.spriteSheets[name];
            for (var i in data.images)
                if (typeof data.images[i] == "string")
                    data.images[i] = this.getLoadedImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play)
                sprite.play();
            return sprite;
        };
        return AssetsManager;
    })();
    aagameui.AssetsManager = AssetsManager;
})(aagameui || (aagameui = {}));
var Inertia = (function () {
    function Inertia() {
    }
    //Adds a inertial drag movement to a Display Object
    Inertia.addInertia = function (target, moveX, moveY, eventOrigin, inertiaFactor) {
        if (typeof moveX === "undefined") { moveX = true; }
        if (typeof moveY === "undefined") { moveY = true; }
        if (typeof inertiaFactor === "undefined") { inertiaFactor = 0.95; }
        var pivotX = 0;
        var pivotY = 0;
        var oldPosX = 0;
        var oldPosY = 0;
        var speedX = 0;
        var speedY = 0;

        var inertiaInterval;

        var mouseDown = false;

        if (!eventOrigin)
            eventOrigin = target;

        eventOrigin.addEventListener("mousedown", function (evt) {
            clearInterval(inertiaInterval);
            speedX = speedY = 0;
            oldPosX = target.x;
            oldPosY = target.y;

            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);

            pivotX = pos.x - target.x;
            pivotY = pos.y - target.y;

            mouseDown = true;

            inertiaInterval = setInterval(function () {
                if (moveX)
                    speedX = speedX * inertiaFactor;
                if (moveY)
                    speedY = speedY * inertiaFactor;

                target.x += speedX;
                target.y += speedY;

                target.dispatchEvent("onmoving");

                if (mouseDown == false && Math.abs(speedX) + Math.abs(speedY) < 5) {
                    clearInterval(inertiaInterval);
                    target.dispatchEvent("onstop");
                }
            }, 1000 / createjs.Ticker.getFPS());
        });

        eventOrigin.addEventListener("pressmove", function (evt) {
            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);

            if (moveX)
                target.x = pos.x - pivotX;
            if (moveY)
                target.y = pos.y - pivotY;

            target.dispatchEvent("onmoving");

            speedX = target.x - oldPosX;
            speedY = target.y - oldPosY;

            oldPosX = target.x;
            oldPosY = target.y;

            mouseDown = true;
        });

        eventOrigin.addEventListener("pressup", function (evt) {
            mouseDown = false;
        });
    };
    return Inertia;
})();
var SmokeFX;
(function (SmokeFX) {
    // Class
    var SmokeFXEmmiter = (function (_super) {
        __extends(SmokeFXEmmiter, _super);
        function SmokeFXEmmiter(imageFile, width, height) {
            var _this = this;
            _super.call(this);
            this.birthrate = 1;
            this.aging = 1000;
            this.ageVariation = 50;
            this.spin = 90;
            this.spinVariation = 180;
            this.speedX = -0.03;
            this.speedY = 0;
            this.speedVariationX = 0;
            this.speedVariationY = 0;
            this.scale = 1;
            this.scaleFinal = 2;
            this.scaleVariation = 0.1;
            this.alpha = 1;
            this.alphaVariation = 0.1;
            this.finalAlpha = 0;
            this.rateCount = 0;
            this.emmiterWidth = 500;
            this.emmiterHeight = 100;
            this.imageFile = imageFile;
            this.emmiterWidth = width;
            this.emmiterHeight = height;

            var test = new createjs.Bitmap(imageFile);
            this.addChild(test);

            createjs.Ticker.addEventListener("tick", function () {
                _this.tickrate();
            });
        }
        SmokeFXEmmiter.prototype.tickrate = function () {
            if (Math.random() > this.birthrate)
                return;

            var imageFile = this.imageFile;

            var x = Math.random() * this.emmiterWidth;
            var y = Math.random() * this.emmiterHeight;
            var speedX = 0.5 - Math.random() * this.speedVariationX + this.speedX;
            var speedY = 0.5 - Math.random() * this.speedVariationY + this.speedY;
            var spin = 0.5 - Math.random() * this.spinVariation + this.spin;
            var age = 0.5 - Math.random() * this.ageVariation + this.aging;
            var alpha = 0.5 - Math.random() * this.alphaVariation + this.alpha;
            var finalAlpha = this.finalAlpha;

            var scale = Math.random() * this.scaleVariation + this.scale;
            var finalScale = Math.random() * this.scaleVariation + this.scaleFinal;

            this.emmit(imageFile, x, y, speedX, speedY, scale, finalScale, spin, age, alpha, finalAlpha);
        };

        SmokeFXEmmiter.prototype.emmit = function (imageFile, x, y, speedX, speedY, scale, finalScale, spin, age, alpha, finalAlpha) {
            var _this = this;
            var asset = new createjs.Bitmap(imageFile);
            this.addChild(asset);

            asset.regX = this.imageRegX;
            asset.regY = this.imageRegY;

            asset.x = x;
            asset.y = y;
            asset.scaleX = asset.scaleY = scale;

            createjs.Tween.get(asset).to({
                x: x + speedX * age / 1000,
                y: y + speedY * age / 1000,
                rotation: spin * age / 1000,
                scaleX: finalScale,
                scaleY: finalScale
            }, age * 1.1).call(function (e) {
                _this.removeChild(asset);
            });

            asset.alpha = 0;
            createjs.Tween.get(asset).to({ alpha: alpha }, age * 0.1).call(function (e) {
                createjs.Tween.get(asset).to({ alpha: finalAlpha }, age * 0.9);
            });
        };
        return SmokeFXEmmiter;
    })(createjs.Container);
    SmokeFX.SmokeFXEmmiter = SmokeFXEmmiter;
})(SmokeFX || (SmokeFX = {}));
var Analytics = (function () {
    function Analytics() {
    }
    //create a random user ID
    Analytics.prototype.getUser = function () {
        if (!this.userId)
            this.userId = localStorage.getItem("lirum_userId");

        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("lirum_userId", this.userId);
        }

        return this.userId;
    };

    Analytics.prototype.getSession = function () {
        if (!this.sessionId)
            this.sessionId = (Math.random() * 9999999999).toString();

        return this.sessionId;
    };

    Analytics.prototype.getBuild = function () {
        return "alpha1";
    };

    Analytics.prototype.logGameStart = function () {
        this.sendEvent("game", "start", 1);
    };

    Analytics.prototype.logClick = function (levelId, blockX, blockY) {
        this.sendEvent("click", "click", 1, levelId, blockX, blockY);
    };

    Analytics.prototype.logLevelWin = function (levelId, time, clicks) {
        this.sendEvent("level", "complete", clicks, levelId, time);
    };

    Analytics.prototype.logLevelRestart = function (levelId, time, clicks) {
        this.sendEvent("level", "restart", clicks, levelId, time);
    };

    Analytics.prototype.logLevelExit = function (levelId, time, clicks) {
        this.sendEvent("level", "exit", clicks, levelId, time);
    };

    Analytics.prototype.logLevelLoose = function (levelId, time, clicks) {
        this.sendEvent("level", "loose", clicks, levelId, time);
    };

    Analytics.prototype.logLevelStart = function (levelId, time, clicks) {
        this.sendEvent("level", "start", 1, levelId, time);
    };

    Analytics.prototype.logUsedItem = function (itemId, levelId) {
        this.sendEvent("item", itemId, 1, levelId);
    };
    Analytics.prototype.loglevelTime = function (levelId, time, final) {
        this.sendEvent("time", final, time / 1000, levelId);
    };

    Analytics.prototype.logBonus = function (bonusid, items) {
        this.sendEvent("bonus", bonusid.toString(), items, bonusid);
    };

    Analytics.prototype.sendEvent = function (eventId, subEventId, value, level, x, y) {
        var game_key = '1fc43682061946f75bfbecd4bbb2718b';
        var secret_key = '9b4ab4006d241ab5042eb3a730eec6c3e171d483';
        var data_api_key = 'd519f8572c1893fb49873fa2345d444c03afa172';

        var category = "design";

        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
            "area": level,
            "x": x,
            "y": y
        };

        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);

        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;

        $.ajax({
            type: 'POST',
            url: url,
            data: json_message,
            headers: {
                "Authorization": header_auth_hex
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'text/plain');
            }
        });
    };
    return Analytics;
})();
//
//
//
//
//
//
//
//
var FlipPlus;
(function (FlipPlus) {
    (function (Bonus) {
        // Class
        var Bonus2OLD = (function (_super) {
            __extends(Bonus2OLD, _super);
            function Bonus2OLD(itemsArray, sufix) {
                if (typeof sufix === "undefined") { sufix = "1"; }
                _super.call(this, itemsArray, "Bonus2");
                this.pairsMatched = 0;
            }
            Bonus2OLD.prototype.addObjects = function () {
                _super.prototype.addObjects.call(this);
                var cards = this.generateCards(12, 5, this.itemsArray);
                this.pairs = 5;
                this.addCards(cards);
            };

            //===============================================================================
            //verifies if two cards matches
            Bonus2OLD.prototype.match = function (card1, card2) {
                var _this = this;
                if (card1.name == card2.name && card1 != card2) {
                    this.userAquireItem(card1.name);
                    this.userAquireItem(card1.name);

                    //animate itens
                    this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                    this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);
                    return true;
                } else {
                    //cards doesnt match
                    this.content.mouseEnabled = false;
                    setTimeout(function () {
                        _this.closeCard(card1);
                        _this.closeCard(card2);
                        _this.content.mouseEnabled = true;
                    }, 500);

                    return false;
                }
            };

            Bonus2OLD.prototype.closeOppened = function () {
            };

            //===============================================================================
            Bonus2OLD.prototype.cardClick = function (card) {
                var _this = this;
                this.openCard(card);

                //if card is Jocker (Rat)
                if (card.name == null) {
                    //decrase lives number
                    this.lives--;
                    card.mouseEnabled = false;
                    if (this.lives == 0) {
                        //if there is no more lives, than end game
                        this.content.mouseEnabled = false;
                        this.message.showtext(stringResources.b2_noMoreChances, 2000, 500);
                        this.message.addEventListener("onclose", function () {
                            _this.endBonus();
                        });
                    }
                    return;
                }

                if (this.currentCard) {
                    //if cards matches
                    var match = this.match(this.currentCard, card);
                    if (match)
                        this.pairsMatched++;

                    //verifies if matches all cards
                    if (this.pairsMatched >= this.pairs) {
                        //ends the game
                        this.message.showtext(stringResources.b2_finish, 2000, 500);
                        this.message.addEventListener("onclose", function () {
                            _this.endBonus();
                        });
                        this.endBonus();
                    }

                    this.currentCard = null;
                } else
                    this.currentCard = card;
            };

            //adds cards to the board
            Bonus2OLD.prototype.addCards = function (cards) {
                var _this = this;
                var cols = 3;
                var width = 450;
                var height = 320;

                //create cards container
                var cardsContainer = new createjs.Container();
                cardsContainer.x = 184 + 93 + 45;
                cardsContainer.y = 135 + 400;

                for (var c in cards) {
                    var card = this.createCard(cards[c]);
                    card.x = c % cols * width;
                    card.y = Math.floor(c / cols) * height;
                    cardsContainer.addChild(card);

                    //add cards event listener
                    card.addEventListener("click", function (e) {
                        _this.cardClick(e.currentTarget);
                    });
                }

                this.content.addChild(cardsContainer);
            };

            //generate cards itens to be randomized
            Bonus2OLD.prototype.generateCards = function (cardsCount, pairs, items) {
                var cards = new Array();

                //set number of lives
                this.lives = cardsCount - pairs * 2;

                for (var p = 0; p < pairs; p++) {
                    var itemIndex = Math.floor(Math.random() * items.length);
                    cards.push(items[itemIndex]);
                    cards.push(items[itemIndex]);
                }

                for (var p = 0; p < cardsCount - pairs * 2; p++)
                    cards.push(null);

                //randomize cards
                var randomizedCards = new Array();
                while (cards.length > 0) {
                    var index = Math.floor(Math.random() * cards.length);
                    randomizedCards.push(cards[index]);
                    cards.splice(index, 1);
                }

                return randomizedCards;
            };

            Bonus2OLD.prototype.createCard = function (item) {
                var card = new createjs.Container;
                card.name = item;

                //background
                card.addChild(gameui.AssetsManager.getBitmap("Bonus2/bonuscard2"));

                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = gameui.AssetsManager.getBitmap(itemImage);
                itemDO.name = "item";
                itemDO.x = 368 / 2;
                itemDO.y = 279 / 2;
                itemDO.x -= itemDO.getBounds().width / 2;
                itemDO.y -= itemDO.getBounds().height / 2;
                card.addChild(itemDO);

                //add cover image
                var cover = new gameui.ui.ImageButton("Bonus2/bonuscard1");
                cover.x = 368 / 2;
                cover.y = 279 / 2;
                cover.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(-368 / 2, -279 / 2, 368, 279));
                cover.name = "cover";
                card.addChild(cover);

                //card.createHitArea();
                card.regX = 184;
                card.regY = 135;

                return card;
            };

            //open a card animation
            Bonus2OLD.prototype.openCard = function (card) {
                var cover = card.getChildByName("cover");
                createjs.Tween.removeTweens(cover);
                createjs.Tween.get(cover).to({ scaleY: 0 }, 200, createjs.Ease.quadIn).call(function () {
                    cover.visible = false;
                });
                card.mouseEnabled = false;
            };

            //closing a card animation
            Bonus2OLD.prototype.closeCard = function (card) {
                var cover = card.getChildByName("cover");
                cover.visible = true;
                createjs.Tween.removeTweens(cover);
                createjs.Tween.get(cover).to({ scaleY: 1 }, 200, createjs.Ease.quadIn);
                card.mouseEnabled = true;
            };
            return Bonus2OLD;
        })(Bonus.BonusScreen);
        Bonus.Bonus2OLD = Bonus2OLD;
    })(FlipPlus.Bonus || (FlipPlus.Bonus = {}));
    var Bonus = FlipPlus.Bonus;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var BonusItem = (function (_super) {
                __extends(BonusItem, _super);
                function BonusItem(bonusId, action) {
                    _super.call(this, "projects/bigslot1", action);

                    this.bonusId = bonusId;
                    this.y = 470;
                    this.x = 768;

                    this.regX = 1458 / 2;
                    this.regY = 410 / 2;

                    this.updateProjectInfo();
                }
                //createObjects
                BonusItem.prototype.createObjects = function (bonusId) {
                    var _this = this;
                    var color = "#cfe3ec";
                    var font = "Bold 100px " + defaultFont;

                    //clean all objects
                    this.removeAllChildren();

                    //if unlocked
                    var stars = FlipPlus.FlipPlusGame.projectManager.getStarsCount();
                    if (stars >= bonusData[bonusId].cost) {
                        //background
                        var bg = "projects/" + bonusId;
                        var s = gameui.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //timer text
                        this.timerText = new createjs.Text(("--:--:--").toString(), font, color);
                        this.timerText.textBaseline = "middle";
                        this.timerText.textAlign = "center";
                        this.timerText.x = 1000;
                        this.timerText.y = 180;
                        this.addChild(this.timerText);

                        //auto updateObject
                        this.timerintervalTick();
                        if (this.updateInterval)
                            clearInterval(this.updateInterval);
                        this.updateInterval = setInterval(function () {
                            _this.timerintervalTick();
                        }, 900);
                    } else {
                        //adds Background
                        var bg = "projects/bigslot1";
                        var s = gameui.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //adds lock indicator
                        var star = gameui.AssetsManager.getBitmap("projects/star");
                        this.addChild(star);
                        star.x = 670;
                        star.y = 150;

                        //addsText
                        //TODO da onde vai tirar as estrelas?
                        var tx = new createjs.Text(bonusData[bonusId].cost, "Bold 100px " + defaultFont, "#565656");
                        this.addChild(tx);
                        tx.textAlign = "right";
                        tx.x = 650;
                        tx.y = 135;
                    }

                    //create hitArea
                    this.createHitArea();
                };

                //updates based on porject
                BonusItem.prototype.updateProjectInfo = function () {
                    //update the objects display
                    this.createObjects(this.bonusId);
                };

                BonusItem.prototype.timerintervalTick = function () {
                    var time = FlipPlus.FlipPlusGame.timersData.getTimer(this.bonusId);

                    if (time == 0) {
                        this.timerText.text = stringResources.mm_play;

                        if (!createjs.Tween.hasActiveTweens(this.timerText)) {
                            ////this.timerText.cache(-200, -50, 400, 100);
                            this.timerText.set({ scaleX: 1, scaleY: 1 });
                            createjs.Tween.get(this.timerText, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 400, createjs.Ease.sineInOut).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineInOut);
                        }
                    } else {
                        createjs.Tween.removeTweens(this.timerText);
                        this.timerText.text = this.toHHMMSS(time);
                        this.timerText.scaleX = this.scaleY = 1;
                        ////this.timerText.cache(-200, -50, 400, 100);
                    }
                };

                BonusItem.prototype.toHHMMSS = function (sec_num) {
                    var hours = Math.floor(sec_num / 3600);
                    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                    var seconds = sec_num - (hours * 3600) - (minutes * 60);

                    if (hours < 10) {
                        hours = 0 + hours;
                    }
                    if (minutes < 10) {
                        minutes = 0 + minutes;
                    }
                    if (seconds < 10) {
                        seconds = 0 + seconds;
                    }
                    var time = hours + ':' + minutes + ':' + seconds;
                    return time;
                };
                return BonusItem;
            })(gameui.ui.ImageButton);
            View.BonusItem = BonusItem;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // View Class
            var TextEffect = (function (_super) {
                __extends(TextEffect, _super);
                //class contructor
                function TextEffect() {
                    _super.call(this);

                    //centralize the popup on screen
                    this.width = DefaultWidth;
                    this.height = DefaultHeight;
                    this.x = DefaultWidth / 2;
                    this.y = DefaultHeight / 2;
                    this.centralize();

                    //hide popup
                    this.visible = false;

                    this.mouseEnabled = false;
                }
                //public method to invoke the popup
                TextEffect.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (typeof timeout === "undefined") { timeout = 3000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    //clean everything
                    this.removeAllChildren();

                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = DefaultWidth / 2;
                    this.addChild(titleShadow);

                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = DefaultWidth / 2;
                    this.addChild(titleDO);

                    titleShadow.y = titleDO.y = DefaultHeight / 2;
                    titleShadow.y += 15;

                    //updates text
                    titleDO.text = titleShadow.text = text.toUpperCase();

                    var ty = DefaultHeight * 0.9;

                    this.set({
                        alpha: 0,
                        y: ty
                    });

                    this.visible = true;

                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this).to({ alpha: 1, y: ty - 50 }, 200, createjs.Ease.quadOut).to({ alpha: 1, y: ty - 100 }, 1000, createjs.Ease.linear).to({ alpha: 0, y: ty - 300 }, 200, createjs.Ease.quadIn).call(function () {
                        _this.visible = false;
                        _this.dispatchEvent("onclose");
                    });
                };
                return TextEffect;
            })(gameui.ui.UIItem);
            View.TextEffect = TextEffect;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        var Moves = (function (_super) {
            __extends(Moves, _super);
            function Moves(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;
                //threat user input
                this.loosing = false;

                //only adds this level if there are more than 1 puzzle to solve
                this.gameplayMenu.addButtons(["skip"]);

                if (this.levelData.puzzlesToSolve > 1)
                    this.gameplayMenu.addButtons(["solve"]);

                //adds buttons and items
                this.gameplayMenu.addButtons(["touch", "hint"]);

                this.gameplayMenu.addEventListener("touch", function () {
                    _this.useItemTouch();
                });
                this.gameplayMenu.addEventListener("solve", function () {
                    _this.useItemSolve();
                });
                this.gameplayMenu.addEventListener("hint", function () {
                    _this.useItemHint();
                });
                this.gameplayMenu.addEventListener("skip", function () {
                    _this.useItemSkip();
                });

                this.moves = this.levelData.moves;

                if (levelData.blocksData && levelData.blocksData.length > 0) {
                    this.levelLogic.board.setInvertedBlocks(levelData.blocksData);
                    this.levelData.puzzlesToSolve = 1;
                } else {
                    if (!this.levelData.puzzlesToSolve)
                        this.levelData.puzzlesToSolve = 1;
                    this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves);
                }

                this.puzzlesToSolve = levelData.puzzlesToSolve;

                this.boardSprite.updateSprites(this.levelLogic.board.blocks);

                //set default puzzles to solve
                this.popup.showTimeAttack(stringResources.gp_mv_Popup1Title, stringResources.gp_mv_Popup1Text1, this.levelData.puzzlesToSolve.toString(), this.levelData.moves.toString(), stringResources.gp_mv_Popup1Text2, stringResources.gp_mv_Popup1Text3);

                this.statusArea.setMode("moves");
                this.statusArea.setText3(this.moves.toString());
            }
            Moves.prototype.userInput = function (col, row) {
                var _this = this;
                _super.prototype.userInput.call(this, col, row);

                if (!this.levelLogic.verifyWin()) {
                    //verifies if is a multiTouch
                    if (Date.now() - this.lastTouchTime > 110 || !this.lastTouchTime)
                        this.moves--;

                    this.lastTouchTime = Date.now();

                    setTimeout(function () {
                        if (!_this.loosing)
                            if (!_this.levelLogic.verifyWin()) {
                                //loses game, if moves is over
                                if (_this.moves <= 0) {
                                    _this.message.showtext(stringResources.gp_mv_noMoreMoves);
                                    _this.loose();
                                    _this.loosing = true;
                                }
                            }
                    }, 110);
                }

                //updates moves count
                this.statusArea.setText3(this.moves.toString());
            };

            //Overriding methods.
            Moves.prototype.win = function (col, row) {
                var _this = this;
                if (this.currentPuzzle >= this.puzzlesToSolve) {
                    _super.prototype.win.call(this, col, row);
                } else {
                    //animate board and switch
                    var defaultX = this.boardSprite.x;
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX - DefaultWidth }, 250, createjs.Ease.quadIn).call(function () {
                        _this.currentPuzzle++;
                        _this.randomBoard(_this.levelData.randomMinMoves, _this.levelData.randomMaxMoves);
                        _this.boardSprite.clearHint();

                        _this.boardSprite.x = defaultX + DefaultWidth;
                        createjs.Tween.get(_this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut);
                    });
                }
            };

            Moves.prototype.randomBoard = function (minMoves, maxMoves) {
                if (typeof minMoves === "undefined") { minMoves = 2; }
                if (typeof maxMoves === "undefined") { maxMoves = 5; }
                if (!this.puzzlesToSolve)
                    this.puzzlesToSolve = 1;
                this.statusArea.setText1(this.currentPuzzle.toString() + "/" + this.puzzlesToSolve.toString());

                var moves = Math.floor(Math.random() * (maxMoves - minMoves)) + minMoves;
                var lenght = this.levelLogic.board.width * this.levelLogic.board.height;
                var inverted = [];

                for (var m = 0; m < moves; m++) {
                    var index = Math.floor(Math.random() * (lenght));
                    while (inverted[index] == true)
                        index = (index + 1) % lenght;
                    inverted[index] = true;
                }

                for (var i = 0; i < lenght; i++) {
                    if (inverted[i] == true)
                        this.levelLogic.board.invertCross(i % this.levelLogic.board.width, Math.floor(i / this.levelLogic.board.width));
                }

                this.levelLogic.board.initializePrizes(2);
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            };

            //========================== items ==================================
            Moves.prototype.useItemTouch = function () {
                if (!this.useItem("touch"))
                    return;
                this.moves += 2;
            };
            Moves.prototype.useItemSolve = function () {
                if (!this.useItem("solve"))
                    return;
                this.win(0, 0);
            };
            return Moves;
        })(GamePlay.LevelScreen);
        GamePlay.Moves = Moves;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var levelsDataBackup;
var levelCreatorMode;
var levelCreatorTestMode;

var FlipPlus;
(function (FlipPlus) {
    (function (GamePlay) {
        var LevelCreator = (function (_super) {
            __extends(LevelCreator, _super);
            function LevelCreator(levelData, editorWindow, postback) {
                var _this = this;
                //backups levels
                if (!levelsDataBackup)
                    levelsDataBackup = levelData;

                this.editWindow = editorWindow;

                if (!postback) {
                    window.onresize = function () {
                    };
                    FlipPlus.FlipPlusGame.gameScreen.resizeGameScreen(420, 600, false);
                    if (levelData == null) {
                        levelData = new FlipPlus.Projects.Level();
                        levelData.width = 5;
                        levelData.height = 5;
                        levelData.blocksData = [];
                        levelData.theme = "green";
                    }
                    this.updateSelectList();
                }

                _super.call(this, levelData);

                this.levelLogic.board.setInvertedBlocks(levelData.blocksData);
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                this.gameplayMenu.visible = false;

                this.editWindow.document.getElementById("c_create").onclick = function () {
                    levelData = _this.getLevelDataFromForm();
                    FlipPlus.FlipPlusGame.gameScreen.switchScreen(new LevelCreator(levelData, _this.editWindow));
                };

                this.editWindow.document.getElementById("c_save").onclick = function () {
                    var customData = _this.loadStored();
                    var levelData = _this.getLevelDataFromForm();
                    var projectId = _this.getProjectIndexFromForm();
                    var levelId = _this.getLevelIndexFromForm();

                    customData[projectId].levels[levelId] = levelData;
                    _this.saveStored(customData);
                    //this.updateSelectList();
                };

                this.editWindow.document.getElementById("c_load").onclick = function () {
                    var s = _this.loadStored();

                    var selectedLevel = _this.editWindow.document.getElementById("c_select_level").value;
                    var selectedProject = _this.editWindow.document.getElementById("c_select_project").value;
                    var level = s[selectedProject].levels[selectedLevel];

                    if (level) {
                        _this.setFormFromLevelData(level);
                        FlipPlus.FlipPlusGame.gameScreen.switchScreen(new LevelCreator(level, _this.editWindow, true));
                    } else {
                        alert("There nothing saved in this level. Please create a new one");
                    }
                };

                this.editWindow.document.getElementById("c_export").onclick = function () {
                    var data = _this.loadStored();

                    if (data) {
                        for (var p in data) {
                            delete data[p].UserData;
                        }
                        for (var p in data) {
                            for (var l in data[p].levels) {
                                delete data[p].levels[l].userdata;
                            }
                        }
                        for (var p in data) {
                            for (var l in data[p].levels) {
                                data[p].levels[l].name = p + "/" + l;
                            }
                        }

                        var value = JSON.stringify(data, null, "    ");
                        saveFile('Levels.js', "var levelsData =" + value);
                        // (<HTMLTextAreaElement>this.editWindow.document.getElementById("c_exported")).value = JSON.stringify(exp);
                    }
                };

                this.editWindow.document.getElementById("c_select_project").onchange = function () {
                    var value = _this.editWindow.document.getElementById("c_select_project").value;
                    _this.selecteProject(parseInt(value));
                };

                this.editWindow.document.getElementById("c_select_level").ondblclick = function () {
                    _this.editWindow.document.getElementById("c_load").onclick(null);
                };

                this.editWindow.document.getElementById("c_import").onclick = function () {
                    loadFile(function (data) {
                        try  {
                            data = data.replace("var levelsData =", "");
                            var dataParsed = JSON.parse(data);
                            data = JSON.stringify(dataParsed);
                            localStorage.setItem(LevelCreator.key, data);
                            _this.updateSelectList();
                            setTimeout(function () {
                                alert("Levels imported");
                            }, 200);
                        } catch (er) {
                            alert("This file is invalid " + er.message);
                        }
                    });
                    //var exp = (<HTMLTextAreaElement>this.editWindow.document.getElementById("c_exported")).value;
                };

                this.editWindow.document.getElementById("c_test").onclick = function () {
                    levelCreatorTestMode = !levelCreatorTestMode;

                    levelsData = _this.loadStored();
                    for (var p in levelsData) {
                        levelsData[p].cost = 0;
                    }
                    FlipPlus.FlipPlusGame.initializeGame();
                    //window.onresize = () => { };
                    //console.log("ctest")
                    //FlipPlus.InvertCrossaGame.redim(420, 600, false);
                };
            }
            LevelCreator.prototype.loadStored = function () {
                var s = localStorage.getItem(LevelCreator.key);
                if (!s)
                    return levelsData;
                else
                    return JSON.parse(s);
            };

            LevelCreator.prototype.saveStored = function (value) {
                localStorage.setItem(LevelCreator.key, JSON.stringify(value));
            };

            LevelCreator.prototype.updateSelectList = function () {
                var s = this.loadStored();

                this.editWindow.document.getElementById("c_select_project").options.length = 0;
                this.editWindow.document.getElementById("c_select_level").options.length = 0;

                for (var i in s) {
                    var option = this.editWindow.document.createElement("option");
                    option.text = s[i].name;
                    option.value = i;
                    this.editWindow.document.getElementById("c_select_project").add(option);
                }
            };

            LevelCreator.prototype.selecteProject = function (projectIndex) {
                var s = this.loadStored();

                this.editWindow.document.getElementById("c_select_level").options.length = 0;

                var project = s[projectIndex];
                for (var l in project.levels) {
                    var option = this.editWindow.document.createElement("option");
                    option.text = "Bot" + (projectIndex + 1) + " Level " + (parseInt(l) + 1) + "  " + project.levels[l].type;
                    option.value = l;
                    this.editWindow.document.getElementById("c_select_level").add(option);
                }
            };

            LevelCreator.prototype.getProjectIndexFromForm = function () {
                var selected = parseInt(this.editWindow.document.getElementById("c_select_project").value);
                return selected;
            };

            LevelCreator.prototype.getLevelIndexFromForm = function () {
                var selected = parseInt(this.editWindow.document.getElementById("c_select_level").value);
                return selected;
            };

            LevelCreator.prototype.getLevelDataFromForm = function () {
                var levelData = new FlipPlus.Projects.Level();

                //levelData.name= (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value;
                levelData.width = parseInt(this.editWindow.document.getElementById("c_width").value);
                levelData.height = parseInt(this.editWindow.document.getElementById("c_height").value);
                levelData.type = this.editWindow.document.getElementById("c_type").value;
                levelData.theme = this.editWindow.document.getElementById("c_theme").value;

                levelData.moves = parseInt(this.editWindow.document.getElementById("c_flips").value);
                levelData.time = parseInt(this.editWindow.document.getElementById("c_time").value);
                levelData.puzzlesToSolve = parseInt(this.editWindow.document.getElementById("c_p_solve").value);

                levelData.randomMaxMoves = parseInt(this.editWindow.document.getElementById("c_r_max").value);
                levelData.randomMinMoves = parseInt(this.editWindow.document.getElementById("c_r_min").value);

                levelData.drawData = this.levelData.drawData;
                levelData.mirroredBlocks = this.levelData.mirroredBlocks;
                levelData.hiddenBlocks = this.levelData.hiddenBlocks;

                if (this.editWindow.document.getElementById("c_blocks").value)
                    levelData.blocksData = JSON.parse(this.editWindow.document.getElementById("c_blocks").value);

                return levelData;
            };

            LevelCreator.prototype.setFormFromLevelData = function (levelData) {
                //if (levelData.name) (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value = levelData.name;
                if (levelData.width)
                    this.editWindow.document.getElementById("c_width").value = levelData.width.toString();
                if (levelData.height)
                    this.editWindow.document.getElementById("c_height").value = levelData.height.toString();
                if (levelData.type)
                    this.editWindow.document.getElementById("c_type").value = levelData.type;
                if (levelData.theme)
                    this.editWindow.document.getElementById("c_theme").value = levelData.theme;

                if (levelData.moves)
                    this.editWindow.document.getElementById("c_flips").value = levelData.moves.toString();
                if (levelData.time)
                    this.editWindow.document.getElementById("c_time").value = levelData.time.toString();
                if (levelData.puzzlesToSolve)
                    this.editWindow.document.getElementById("c_p_solve").value = levelData.puzzlesToSolve.toString();

                if (levelData.randomMaxMoves)
                    this.editWindow.document.getElementById("c_r_max").value = levelData.randomMaxMoves.toString();
                if (levelData.randomMinMoves)
                    this.editWindow.document.getElementById("c_r_min").value = levelData.randomMinMoves.toString();

                if (levelData.blocksData)
                    this.editWindow.document.getElementById("c_blocks").value = JSON.stringify(levelData.blocksData);
            };

            //threat user input
            LevelCreator.prototype.userInput = function (col, row) {
                var id = row + col * this.levelData.height;

                if (document.getElementById("c_drawing").checked) {
                    if (!this.levelData.drawData)
                        this.levelData.drawData = [];
                    this.toogleItemInArray(this.levelData.drawData, id);

                    this.levelLogic.board.setDrawBlocks(this.levelData.drawData);
                } else if (document.getElementById("c_mirrowing").checked) {
                    this.levelLogic.board.blocks[col][row].mirror = !this.levelLogic.board.blocks[col][row].mirror;
                    if (!this.levelData.mirroredBlocks)
                        this.levelData.mirroredBlocks = [];
                    this.toogleItemInArray(this.levelData.mirroredBlocks, id);
                } else if (document.getElementById("c_hidding").checked) {
                    this.levelLogic.board.blocks[col][row].hidden = !this.levelLogic.board.blocks[col][row].hidden;
                    if (!this.levelData.hiddenBlocks)
                        this.levelData.hiddenBlocks = [];
                    this.toogleItemInArray(this.levelData.hiddenBlocks, id);
                } else {
                    //invert a cross
                    this.levelLogic.invertCross(col, row);
                }

                //update sprites
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);

                this.editWindow.document.getElementById("c_blocks").value = JSON.stringify(this.levelLogic.board.getInvertedBlocks());
            };

            LevelCreator.prototype.toogleItemInArray = function (array, item) {
                var index = array.indexOf(item);
                if (index >= 0)
                    array.splice(index, 1);
                else
                    array.push(item);
            };

            LevelCreator.prototype.win = function (col, row) {
            };
            LevelCreator.key = "customProjects";
            return LevelCreator;
        })(GamePlay.Puzzle);
        GamePlay.LevelCreator = LevelCreator;
    })(FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
    var GamePlay = FlipPlus.GamePlay;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var Intro = (function (_super) {
            __extends(Intro, _super);
            function Intro() {
                var _this = this;
                _super.call(this);

                this.popup = new Menu.View.PopupBot();

                this.introMc = new lib.Intro();
                this.addChild(this.introMc);
                this.introMc.stop();

                this.introMc.addEventListener("onstop", function (e) {
                    switch (e.target) {
                        case "d1":
                            _this.popup.showBotText(stringResources.it_text1);
                            break;

                        case "readyToPlay":
                            _this.dispatchEvent("readyToPlay");
                            break;

                        case "d2":
                            _this.popup.showBotText(stringResources.it_text2);
                            break;

                        case "end":
                            FlipPlus.FlipPlusGame.showProjectsMenu();
                            _this.dispatchEvent("end");
                            break;
                    }
                });

                this.popup.addEventListener("onclose", function () {
                    _this.introMc.play();
                });
                this.addChild(this.popup);
            }
            Intro.prototype.playPart1 = function () {
                this.introMc.gotoAndPlay("part1");
                this.popup.visible = false;
                var m = this.introMc.children[0];
                m.visible = false;
                this.introMc["Bot01"].mask = m;
            };

            Intro.prototype.playPart2 = function () {
                this.introMc.gotoAndPlay("part2");
                this.popup.visible = false;
            };
            return Intro;
        })(createjs.Container);
        Menu.Intro = Intro;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        //screens that presents a slideshows
        var SlideShow = (function (_super) {
            __extends(SlideShow, _super);
            //constructor
            function SlideShow(slides) {
                var _this = this;
                _super.call(this);

                //load allimages
                this.loadSlides(slides);

                //add hitarea
                this.content.hitArea = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, DefaultWidth, DefaultHeight));

                //adds callback forrr touch
                this.content.addEventListener("click", function () {
                    _this.nextSlide();
                });

                //adds hitarea
                var s = new createjs.Shape();
                s.graphics.beginFill("#FFF").rect(0, 0, DefaultWidth, DefaultHeight);
                this.content.hitArea = s;
            }
            //loadSlideShowImages
            SlideShow.prototype.loadSlides = function (slides) {
                //initializes the image array
                this.images = new Array();

                for (var s in slides) {
                    var image = gameui.AssetsManager.getBitmap(slides[s]);
                    this.images.push(image);
                    this.content.addChild(image);
                }
            };

            //displau next slide in sequence
            SlideShow.prototype.nextSlide = function () {
                if (this.currentSlide === undefined)
                    //verifies if currentSlide is set
                    this.currentSlide = 0;
                else
                    //increment the current slide
                    this.currentSlide++;

                //if slidesshows ends, then dispatch a event
                if (this.currentSlide > this.images.length - 1) {
                    //clear interval
                    clearTimeout(this.slideTimeOut);

                    //sends callback
                    if (this.onfinish)
                        this.onfinish();
                    return;
                }

                //show the currentSlide
                this.showSlide(this.currentSlide);
            };

            //show a slide
            SlideShow.prototype.showSlide = function (slideIndex) {
                var _this = this;
                //verifies if slide is valid
                if (slideIndex > this.images.length - 1 || slideIndex < 0)
                    return;

                for (var i in this.images)
                    this.images[i].visible = false;

                //show s a current slide
                this.images[slideIndex].visible = true;

                //set slide interval
                clearTimeout(this.slideTimeOut);
                this.slideTimeOut = setTimeout(function () {
                    _this.nextSlide();
                }, 3000);
            };

            //when the screen is activated
            SlideShow.prototype.activate = function (parameters) {
                //clear interval
                clearTimeout(this.slideTimeOut);

                //stars a slideshow
                this.nextSlide();
            };
            return SlideShow;
        })(gameui.ScreenState);
        Menu.SlideShow = SlideShow;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        var TitleScreen = (function (_super) {
            __extends(TitleScreen, _super);
            function TitleScreen() {
                _super.call(this);

                var logo = new lib.LogoScreen();

                //loads image
                this.content.addChild(logo);

                this.beach = logo["instance"]["instance_14"];

                //creates hitArea
                this.content.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, DefaultWidth, DefaultHeight));

                //add event to go to main menu
                this.content.addEventListener("click", function () {
                    FlipPlus.FlipPlusGame.showMainMenu();
                });
            }
            TitleScreen.prototype.redim = function (headerY, footerY, width) {
                _super.prototype.redim.call(this, headerY, footerY, width);
                this.beach.y = -headerY / 4 - 616 + 77 / 4 + 9;
            };
            return TitleScreen;
        })(gameui.ScreenState);
        Menu.TitleScreen = TitleScreen;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // View Class
            var Message = (function (_super) {
                __extends(Message, _super);
                //class contructor
                function Message() {
                    var _this = this;
                    _super.call(this);

                    //centralize the popup on screen
                    this.width = DefaultWidth;
                    this.height = DefaultHeight;
                    this.x = DefaultWidth / 2;
                    this.y = DefaultHeight / 2;
                    this.centralize();

                    //hide popup
                    this.visible = false;

                    this.mouseEnabled = true;

                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(0, 0, DefaultWidth, DefaultHeight));

                    this.addEventListener("click", function () {
                        _this.closePopUp();
                    });
                }
                //public method to invoke the popup
                Message.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (typeof timeout === "undefined") { timeout = 3000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    //clean everything
                    this.removeAllChildren();

                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/message");
                    bg.x = 0;
                    bg.y = DefaultHeight / 2 - 500;
                    this.addChild(bg);

                    //create a text
                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = DefaultWidth / 2;
                    this.addChild(titleShadow);

                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = DefaultWidth / 2;
                    this.addChild(titleDO);

                    titleShadow.y = titleDO.y = DefaultHeight / 2;
                    titleShadow.y += 15;

                    //updates text
                    titleDO.text = titleShadow.text = text.toUpperCase();

                    //shows the popus
                    this.closeinterval = setTimeout(function () {
                        _this.fadeIn(1, 0.5);
                    }, delay);
                    ;

                    //create a interval for closing the popopu
                    this.closeinterval = setTimeout(function () {
                        _this.closePopUp();
                    }, timeout + delay);
                };

                //method for close popup
                Message.prototype.closePopUp = function () {
                    //hide the popup{
                    clearTimeout(this.closeinterval);
                    this.dispatchEvent("onclose");
                    this.fadeOut(1, 0.5);
                };
                return Message;
            })(gameui.ui.UIItem);
            View.Message = Message;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // View Class
            var Popup = (function (_super) {
                __extends(Popup, _super);
                //class contructor
                function Popup() {
                    var _this = this;
                    _super.call(this);
                    this.drawObject();

                    //centralize the popup on screen
                    this.width = DefaultWidth;
                    this.height = DefaultHeight;
                    this.x = DefaultWidth / 2;
                    this.y = DefaultHeight / 2;
                    this.centralize();

                    //set Hit Area
                    var hit = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, DefaultWidth, DefaultHeight));
                    this.hitArea = hit;

                    //hide popup
                    this.visible = false;

                    //add callback
                    this.addEventListener("click", function () {
                        _this.closePopUp();
                        clearTimeout(_this.closeinterval);
                    });
                }
                //public method to invoke the popup
                Popup.prototype.showtext = function (title, text, timeout, delay) {
                    if (typeof timeout === "undefined") { timeout = 7000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    this.showsPopup(timeout, delay);

                    //clean display Object
                    this.removeAllChildren();

                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);

                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = DefaultWidth / 2;
                    this.addChild(titleShadow);

                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = DefaultWidth / 2;
                    this.addChild(titleDO);

                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, defaultFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = DefaultWidth / 2;
                    this.addChild(textDO);

                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;

                    var b = DefaultHeight / 2 - 500;

                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = b + 300;

                    this.addsClickIndicaator();
                };

                Popup.prototype.showTimeAttack = function (title, text, time, boards, text2, text3, timeout, delay) {
                    if (typeof timeout === "undefined") { timeout = 7000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    this.showsPopup(timeout, delay);

                    //clean display Object
                    this.removeAllChildren();

                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);

                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = DefaultWidth / 2;
                    this.addChild(titleShadow);

                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = DefaultWidth / 2;
                    this.addChild(titleDO);

                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = DefaultWidth / 2;
                    this.addChild(textDO);

                    //create a text
                    var textDO1 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO1.textAlign = "center";
                    textDO1.textBaseline = "middle";
                    textDO1.x = DefaultWidth / 2;
                    this.addChild(textDO1);

                    //create a text
                    var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO2.textAlign = "center";
                    textDO2.textBaseline = "middle";
                    textDO2.x = DefaultWidth / 2;
                    this.addChild(textDO2);

                    //create a text
                    var timeDO = new createjs.Text("", defaultNumberHighlight, "white");
                    timeDO.textAlign = "center";
                    timeDO.textBaseline = "middle";
                    timeDO.x = DefaultWidth / 2;
                    this.addChild(timeDO);

                    //create a text
                    var boardsDO = new createjs.Text("", defaultNumberHighlight, "white");
                    boardsDO.textAlign = "center";
                    boardsDO.textBaseline = "middle";
                    boardsDO.x = DefaultWidth / 2;
                    this.addChild(boardsDO);

                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;
                    textDO1.text = text2;
                    textDO2.text = text3;
                    timeDO.text = time;
                    boardsDO.text = boards;

                    var b = DefaultHeight / 2 - 500;

                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = 300 + b;
                    textDO1.y = 450 + b;
                    textDO2.y = 600 + b;
                    timeDO.y = 450 + b;
                    boardsDO.y = 450 + b;

                    timeDO.x = 500;
                    boardsDO.x = DefaultWidth - 500;

                    this.addsClickIndicaator();
                };

                Popup.prototype.showflips = function (title, text, flips, timeout, delay) {
                    if (typeof timeout === "undefined") { timeout = 7000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    this.showsPopup(timeout, delay);

                    //clean display Object
                    this.removeAllChildren();

                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);

                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = DefaultWidth / 2;
                    this.addChild(titleShadow);

                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = DefaultWidth / 2;
                    this.addChild(titleDO);

                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = DefaultWidth / 2;
                    this.addChild(textDO);

                    //create a text
                    var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO2.textAlign = "center";
                    textDO2.textBaseline = "middle";
                    textDO2.x = DefaultWidth / 2;
                    this.addChild(textDO2);

                    //create a text
                    var flipsDO = new createjs.Text("", defaultNumberHighlight, "white");
                    flipsDO.textAlign = "center";
                    flipsDO.textBaseline = "middle";
                    flipsDO.x = DefaultWidth / 2;
                    this.addChild(flipsDO);

                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;
                    textDO2.text = "";
                    flipsDO.text = flips;

                    var b = DefaultHeight / 2 - 500;

                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = 300 + b;
                    textDO2.y = 600 + b;
                    flipsDO.y = 450 + b;

                    this.addsClickIndicaator();
                };

                Popup.prototype.showsPopup = function (timeout, delay) {
                    var _this = this;
                    //shows the popus
                    this.closeinterval = setTimeout(function () {
                        _this.fadeIn(1, 0.5);
                    }, delay);
                    ;

                    //create a interval for closing the popopu
                    this.closeinterval = setTimeout(function () {
                        _this.closePopUp();
                    }, timeout + delay);

                    //dispatch a event for parent objects
                    this.dispatchEvent("onshow");
                };

                Popup.prototype.addsClickIndicaator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getSprite("touch");
                    this.addChild(ind);
                    ind.x = 1350;
                    ind.y = 1100;
                };

                //method for close popup
                Popup.prototype.closePopUp = function () {
                    //hide the popup{
                    this.fadeOut(1, 0.5);

                    //dispatch a event for parent objects
                    this.dispatchEvent("onclose");
                };

                //desenha os objetos do popup
                Popup.prototype.drawObject = function () {
                };
                return Popup;
            })(gameui.ui.UIItem);
            View.Popup = Popup;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // View Class
            var PopupBot = (function (_super) {
                __extends(PopupBot, _super);
                function PopupBot() {
                    _super.apply(this, arguments);
                }
                //public method to invoke the popup
                PopupBot.prototype.showBotText = function (text, timeout, delay) {
                    if (typeof timeout === "undefined") { timeout = 5000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    _super.prototype.showsPopup.call(this, timeout, delay);

                    //clean everything
                    this.removeAllChildren();

                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popupTutorial");
                    bg.x = 150;
                    bg.y = 250;
                    this.addChild(bg);

                    //create a text
                    //create a titleShadow
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = DefaultWidth / 2;
                    this.addChild(textDO);

                    textDO.y = DefaultHeight * 0.3;

                    //updates text
                    textDO.text = text.toUpperCase();

                    this.addsClickIndicaator();
                };

                PopupBot.prototype.addsClickIndicaator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getSprite("touch");
                    this.addChild(ind);
                    ind.x = 1250;
                    ind.y = 900;
                };
                return PopupBot;
            })(View.Popup);
            View.PopupBot = PopupBot;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            // Class
            var ProjectWorkshopView = (function (_super) {
                __extends(ProjectWorkshopView, _super);
                // Constructor
                function ProjectWorkshopView(project) {
                    _super.call(this);
                    this.project = project;
                    this.name = project.name;

                    //add hitArea
                    this.addHitArea();

                    //add levels information
                    this.addObjects(project);
                }
                //--------------------- Initialization ---------------------
                ProjectWorkshopView.prototype.addHitArea = function () {
                    var hit = new createjs.Container;
                    hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, DefaultWidth, DefaultHeight)));
                    this.addChild(hit);
                };

                ProjectWorkshopView.prototype.addObjects = function (project) {
                    //add Project levels
                    this.addProjectMachine(project);

                    //add project Name
                    this.addStatus(project);

                    //add robot preview
                    this.addRobotPreview(project);
                };

                //create projetview control
                ProjectWorkshopView.prototype.addRobotPreview = function (project) {
                    this.robotPreview = new View.RobotPreview(project);

                    this.robotPreview.x = DefaultWidth / 2;
                    this.robotPreview.y = 1100;
                    this.robotPreview.update();
                    this.addChild(this.robotPreview);
                };

                //Adds RobotName
                ProjectWorkshopView.prototype.addStatus = function (project) {
                    this.statusArea = new createjs.Container();
                    this.statusArea.regX = this.statusArea.x = DefaultWidth / 2;
                    var bg = gameui.AssetsManager.getBitmap("partshud");
                    bg.y = 00;
                    bg.x = DefaultWidth / 2;
                    bg.scaleX = 2;
                    bg.regX = bg.getBounds().width / 2;
                    this.statusArea.addChild(bg);

                    var l = new createjs.Text(project.nickName.toUpperCase(), defaultFontFamilyStrong, defaultFontColor);
                    l.y = 0; //250;
                    l.textAlign = "center";
                    l.textBaseline = "top";
                    l.x = DefaultWidth / 2;
                    this.statusArea.addChild(l);

                    this.addChild(this.statusArea);

                    this.statusArea.mouseEnabled = false;
                };

                //Adds level thumbs to the scene
                ProjectWorkshopView.prototype.addProjectMachine = function (project) {
                    var _this = this;
                    var levelMachine = new createjs.Container;
                    this.addChild(levelMachine);
                    this.levelsMahine = levelMachine;

                    //add MachineBg
                    var baseFases = gameui.AssetsManager.getBitmap("workshop/basefases");
                    baseFases.y = -741;
                    levelMachine.addChild(baseFases);

                    //Add Stars
                    this.starsIndicator = new View.ProjectStarsIndicator(project);
                    this.starsIndicator.x = 1115;
                    this.starsIndicator.y = 1334 - 2048;
                    levelMachine.addChild(this.starsIndicator);

                    if ((!FlipPlus.FlipPlusGame.isFree() && project.free) || FlipPlus.FlipPlusGame.isFree()) {
                        if (project.UserData.unlocked) {
                            //Add Level Thumbs
                            this.levelGrid = new Menu.View.LevelGrid(project);
                            this.levelGrid.addEventListener("levelClick", function (e) {
                                _this.dispatchEvent("levelClick", e.target);
                            });
                            this.levelGrid.x = 180;
                            this.levelGrid.y = 1538 - 2048;
                            levelMachine.addChild(this.levelGrid);
                        } else {
                            var text = new createjs.Text(stringResources.ws_Locked, defaultFontFamilyStrong, defaultFontColor);
                            text.textAlign = "center";
                            text.y = 1738 - 2048;
                            text.x = DefaultWidth / 2;
                            levelMachine.addChild(text);
                        }
                    } else {
                        //TODO mudar o nome disso.
                        var text = new createjs.Text(stringResources.ws_NotFree, defaultFontFamilyStrong, defaultFontColor);
                        text.textAlign = "center";
                        text.y = 1738 - 2048;
                        text.x = DefaultWidth / 2;
                        levelMachine.addChild(text);
                    }
                };

                //-Animation------------------------------------------------------------
                ProjectWorkshopView.prototype.setRelativePos = function (pos) {
                    this.robotPreview.x = this.statusArea.x = -pos * 0.35 + DefaultWidth / 2;
                };

                //--Behaviour-----------------------------------------------------------
                //open a level
                ProjectWorkshopView.prototype.openLevel = function (event) {
                    var level = event.target['level'];
                    var parameters = event.target['parameters'];

                    if (level != null)
                        if (level.userdata.unlocked)
                            FlipPlus.FlipPlusGame.showLevel(level, parameters);
                };

                ProjectWorkshopView.prototype.redim = function (headerY, footerY) {
                    this.levelsMahine.y = footerY;
                    this.statusArea.y = headerY;
                };

                ProjectWorkshopView.prototype.activate = function (parameters) {
                    var complete = false;
                    var direction = -1;

                    if (parameters) {
                        if (parameters.complete)
                            complete = parameters.complete;
                        if (parameters.direction)
                            direction = parameters.direction;
                    }

                    if (this.levelGrid)
                        this.levelGrid.updateUserData();

                    this.starsIndicator.updateProjectInfo();
                    this.robotPreview.update(complete);
                    //this.animateIn(complete, direction);
                };
                return ProjectWorkshopView;
            })(createjs.Container);
            View.ProjectWorkshopView = ProjectWorkshopView;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    (function (Menu) {
        (function (View) {
            var RobotPreview = (function (_super) {
                __extends(RobotPreview, _super);
                //Constructor
                function RobotPreview(project) {
                    _super.call(this);

                    this.project = project;
                    this.createGraphics(project);
                    this.update();
                }
                //create graphics
                RobotPreview.prototype.createGraphics = function (project) {
                    try  {
                        var size = 1000;
                        this.fill = this.addChild(gameui.AssetsManager.getBitmap("workshop/" + project.name + "_fill"));
                        this.stroke = this.addChild(gameui.AssetsManager.getBitmap("workshop/" + project.name + "_stroke"));
                        this.complete = this.addChild(gameui.AssetsManager.getBitmap("workshop/" + project.name));

                        this.fill.regX = this.stroke.regX = this.fill.getBounds().width / 2;
                        this.fill.regY = this.stroke.regY = this.fill.getBounds().height;

                        this.complete.regX = this.fill.regX - 50;
                        this.complete.regY = this.fill.regY - 50;

                        this.addChild(this.fill);
                        this.addChild(this.stroke);
                        this.addChild(this.complete);

                        this.complete.visible = false;

                        //mask
                        this.percentMask = new createjs.Shape();
                        this.percentMask.graphics.beginFill("#FFF").drawRect(-size / 2, 0, size, -this.fill.getBounds().height).endFill();
                        this.percentMask.scaleY = 0;
                        this.percentMask.y = 50;
                        this.fill.mask = this.percentMask;
                    } catch (e) {
                    }
                };

                //update percentage
                RobotPreview.prototype.update = function (complete) {
                    if (typeof complete === "undefined") { complete = false; }
                    try  {
                        if (!complete)
                            if (this.project.UserData.complete) {
                                this.fill.visible = false;
                                this.stroke.visible = false;
                                this.complete.visible = true;
                            } else
                                this.percentMask.scaleY = this.project.UserData.percent;
                        else
                            this.animateLevelComplete();
                    } catch (e) {
                    }
                    ;
                };

                //animate
                RobotPreview.prototype.animateLevelComplete = function (color) {
                    var _this = this;
                    if (typeof color === "undefined") { color = "#ffcc2e"; }
                    var newValue = this.project.UserData.percent;

                    //boxShape zoom out to the bot
                    var boxShape = new createjs.Shape();
                    boxShape.graphics.beginFill(color).drawRect(-700, -700, 1400, 1400);
                    boxShape.y = -300;
                    this.addChild(boxShape);
                    createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () {
                        _this.removeChild(boxShape);
                    });

                    createjs.Tween.get(this.percentMask).wait(600).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).call(function () {
                        if (_this.project.UserData.complete) {
                            _this.complete.alpha = 0;
                            _this.complete.visible = true;
                            createjs.Tween.get(_this.fill).wait(300).to({ alpha: 0 }, 600).call(function () {
                                _this.fill.visible = false;
                            });
                            createjs.Tween.get(_this.stroke).wait(300).to({ alpha: 0 }, 600).call(function () {
                                _this.stroke.visible = false;
                            });
                            createjs.Tween.get(_this.complete).wait(300).to({ alpha: 1 }, 600);
                        }
                    });
                };
                return RobotPreview;
            })(createjs.Container);
            View.RobotPreview = RobotPreview;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(FlipPlus.Menu || (FlipPlus.Menu = {}));
    var Menu = FlipPlus.Menu;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    // Class
    var Effects = (function (_super) {
        __extends(Effects, _super);
        function Effects() {
            _super.apply(this, arguments);
        }
        // cast an effect
        Effects.prototype.castEffect = function (x, y, effect, scale) {
            var _this = this;
            if (typeof scale === "undefined") { scale = 1; }
            var fx = gameui.AssetsManager.getSprite(effect);
            this.addChild(fx);
            fx.mouseEnabled = false;
            fx.play();
            fx.x = x;
            fx.y = y;
            fx.scaleY = fx.scaleX = scale;

            fx.addEventListener("animationend", function (e) {
                fx.stop();
                _this.removeChild(fx);
            });
        };
        return Effects;
    })(createjs.Container);
    FlipPlus.Effects = Effects;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    // Class
    var PagesSwipe = (function () {
        function PagesSwipe(pagesContainer, pages, pageWidth, minY, maxY) {
            var _this = this;
            this.cancelClick = false;
            this.currentPageIndex = 0;
            this.pagewidth = pageWidth;
            this.pagesContainer = pagesContainer;
            this.pages = pages;

            for (var i in pages)
                pages[i].x = this.pagewidth * i;

            //adds event
            var xpos;
            var initialclick;
            var moving = false;

            // records position on mouse down
            pagesContainer.addEventListener("mousedown", function (e) {
                var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);
                if ((!minY && !maxY) || (pos.y > minY && pos.y < maxY)) {
                    initialclick = pos.x;
                    xpos = pos.x - pagesContainer.x;
                    moving = true;
                }
            });

            //drag the container
            pagesContainer.addEventListener("pressmove", function (e) {
                if (moving) {
                    var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);

                    pagesContainer.x = pos.x - xpos;
                    if (Math.abs(pos.x - initialclick) > 50)
                        _this.cancelClick = true;

                    for (var i in _this.pages)
                        _this.pages[i].visible = false;

                    //show only visible pages
                    _this.pages[_this.currentPageIndex].visible = true;

                    if (pos.x - initialclick < 0) {
                        if (_this.pages[_this.currentPageIndex + 1])
                            _this.pages[_this.currentPageIndex + 1].visible = true;
                    } else {
                        if (_this.pages[_this.currentPageIndex - 1])
                            _this.pages[_this.currentPageIndex - 1].visible = true;
                    }
                }
            });

            //verifies the relase point to tween to the next page
            pagesContainer.addEventListener("pressup", function (e) {
                if (moving) {
                    moving = false;
                    var pos = pagesContainer.parent.globalToLocal(e.rawX, e.rawY);

                    //calculate the drag percentage.
                    var p = (pos.x - xpos + _this.pagewidth * _this.currentPageIndex) / _this.pagewidth;

                    //choses if goes to the next or previous page.
                    if (p < -0.25)
                        _this.gotoNextPage();
                    else if (p > +0.25)
                        _this.gotoPreviousPage();
                    else
                        _this.stayOnPage();

                    //release click for user
                    setTimeout(function () {
                        _this.cancelClick = false;
                    }, 100);
                }
            });
        }
        //----------------------pages-----------------------------------------------//
        PagesSwipe.prototype.gotoPage = function (pageId, tween) {
            var _this = this;
            if (typeof tween === "undefined") { tween = true; }
            if (pageId < 0)
                pageId = 0;
            if (pageId == this.pages.length)
                pageId = this.pages.length - 1;

            if (this.onPageChange)
                this.onPageChange(pageId);

            var oldpage = this.currentPageIndex;
            this.currentPageIndex = pageId;

            if (tween) {
                this.pages[pageId].visible = true;
                createjs.Tween.removeTweens(this.pagesContainer);
                createjs.Tween.get(this.pagesContainer).to({ x: -this.pagewidth * pageId }, 250, createjs.Ease.quadOut).call(function () {
                    for (var i in _this.pages)
                        _this.pages[i].visible = false;

                    //show current page
                    _this.pages[pageId].visible = true;
                });
            } else {
                for (var i in this.pages)
                    this.pages[i].visible = false;

                //show current page
                this.pages[pageId].visible = true;

                this.pagesContainer.x = -this.pagewidth * pageId;
            }
        };

        PagesSwipe.prototype.stayOnPage = function () {
            this.gotoPage(this.currentPageIndex);
        };

        PagesSwipe.prototype.gotoNextPage = function () {
            this.gotoPage(1 + this.currentPageIndex);
        };

        PagesSwipe.prototype.gotoPreviousPage = function () {
            this.gotoPage(this.currentPageIndex - 1);
        };
        return PagesSwipe;
    })();
    FlipPlus.PagesSwipe = PagesSwipe;
})(FlipPlus || (FlipPlus = {}));
//# sourceMappingURL=script.js.map
