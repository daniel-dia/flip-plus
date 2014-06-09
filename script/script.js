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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gbase;
(function (Gbase) {
    (function (UI) {
        // Class
        var UIItem = (function (_super) {
            __extends(UIItem, _super);
            function UIItem() {
                _super.apply(this, arguments);
                this.centered = false;
                this.animating = false;
            }
            UIItem.prototype.centralize = function () {
                this.regX = this.width / 2;
                this.regY = this.height / 2;
                this.centered = true;
            };

            UIItem.prototype.fadeOut = function (scaleX, scaleY) {
                var _this = this;
                if (typeof scaleX === "undefined") { scaleX = 0.5; }
                if (typeof scaleY === "undefined") { scaleY = 0.5; }
                this.animating = true;
                this.antX = this.x;
                this.antY = this.y;
                this.mouseEnabled = false;
                createjs.Tween.removeTweens(this);
                createjs.Tween.get(this).to({
                    scaleX: scaleX,
                    scaleY: scaleY,
                    alpha: 0,
                    x: this.antX,
                    y: this.antY
                }, 200, createjs.Ease.quadIn).call(function () {
                    _this.visible = false;
                    _this.x = _this.antX;
                    _this.y = _this.antY;
                    _this.scaleX = _this.scaleY = 1;
                    _this.alpha = 1;
                    _this.animating = false;
                    _this.mouseEnabled = true;
                    ;
                });
            };

            UIItem.prototype.fadeIn = function (scaleX, scaleY) {
                var _this = this;
                if (typeof scaleX === "undefined") { scaleX = 0.5; }
                if (typeof scaleY === "undefined") { scaleY = 0.5; }
                this.visible = true;
                this.animating = true;

                if (this.antX == null) {
                    this.antX = this.x;
                    this.antY = this.y;
                }

                this.scaleX = scaleX, this.scaleY = scaleY, this.alpha = 0, this.x = this.x;
                this.y = this.y;

                this.mouseEnabled = false;
                createjs.Tween.removeTweens(this);
                createjs.Tween.get(this).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 1,
                    x: this.antX,
                    y: this.antY
                }, 400, createjs.Ease.quadOut).call(function () {
                    _this.mouseEnabled = true;
                    _this.animating = false;
                });
            };

            //calcula
            UIItem.prototype.createHitArea = function () {
                var hit = new createjs.Shape();

                var b = this.getBounds();

                if (b)
                    hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);

                //TODO. se for texto colocar uma sobra. !
                this.hitArea = hit;
            };
            return UIItem;
        })(createjs.Container);
        UI.UIItem = UIItem;
    })(Gbase.UI || (Gbase.UI = {}));
    var UI = Gbase.UI;
})(Gbase || (Gbase = {}));
var Gbase;
(function (Gbase) {
    (function (UI) {
        //this class alow user to arrange objects in a grid forrmat
        //the anchor point is the center of object
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(cols, rows, width, height, padding, flowHorizontal) {
                if (typeof cols === "undefined") { cols = null; }
                if (typeof rows === "undefined") { rows = null; }
                if (typeof padding === "undefined") { padding = 20; }
                if (typeof flowHorizontal === "undefined") { flowHorizontal = false; }
                _super.call(this);
                //default spacing
                this.defaultWSpacing = 800;
                this.defaultHSpacing = 300;
                //provided variables
                this.flowHorizontal = false;
                //control variables;
                this.currentCol = 0;
                this.currentRow = 0;

                //define the variables
                this.flowHorizontal = flowHorizontal;
                this.cols = cols;
                this.rows = rows;
                this.padding = padding;

                if (width == null)
                    width = 1536;
                if (height == null)
                    height = 2048;

                this.width = width;
                this.height = height;

                //define other parameters
                this.wSpacing = cols == 0 ? this.defaultWSpacing : (width - padding * 2) / cols;
                this.hSpacing = rows == 0 ? this.defaultHSpacing : (height - padding * 2) / rows;

                if (rows == null)
                    this.hSpacing = this.wSpacing;
                if (cols == null)
                    this.wSpacing = this.hSpacing;
            }
            //place objecrs into a grid format
            Grid.prototype.addObject = function (object, clickCallback) {
                if (typeof clickCallback === "undefined") { clickCallback = null; }
                this.addChild(object);
                object.x = this.getXPos();
                object.y = this.getYPos();
                if (clickCallback != null)
                    object.addEventListener("click", clickCallback);
                this.updatePosition();
            };

            Grid.prototype.getXPos = function () {
                return this.padding + this.currentCol * this.wSpacing + this.wSpacing / 2;
            };
            Grid.prototype.getYPos = function () {
                return this.padding + this.currentRow * this.hSpacing + this.hSpacing / 2;
            };

            //define next Item position
            Grid.prototype.updatePosition = function () {
                if (!this.flowHorizontal) {
                    this.currentCol++;
                    if (this.currentCol >= this.cols) {
                        this.currentCol = 0;
                        this.currentRow++;
                    }
                } else {
                    this.currentRow++;
                    if (this.currentRow >= this.rows) {
                        this.currentRow = 0;
                        this.currentCol++;
                    }
                }
            };
            return Grid;
        })(UI.UIItem);
        UI.Grid = Grid;
    })(Gbase.UI || (Gbase.UI = {}));
    var UI = Gbase.UI;
})(Gbase || (Gbase = {}));
var Gbase;
(function (Gbase) {
    (function (UI) {
        // Class
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = this;
                _super.call(this);
                this.enableAnimation = true;
                this.mouse = false;
                this.addEventListener("mousedown", function (event) {
                    _this.onPress(event);
                });
                this.addEventListener("pressup", function (event) {
                    _this.onPressUp(event);
                });

                this.addEventListener("mouseover", function () {
                    _this.mouse = true;
                });
                this.addEventListener("mouseout", function () {
                    _this.mouse = false;
                });
            }
            Button.prototype.returnStatus = function () {
                if (!this.mouse) {
                    this.scaleX = this.originalScaleX;
                    this.scaleY = this.originalScaleY;
                }
            };

            Button.prototype.onPressUp = function (Event) {
                this.mouse = false;

                //createjs.Tween.removeTweens(this);
                this.set({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 });
                createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 200, createjs.Ease.backOut);
            };

            Button.prototype.onPress = function (Event) {
                var _this = this;
                if (!this.enableAnimation)
                    return;

                this.mouse = true;
                if (this.originalScaleX == null) {
                    this.originalScaleX = this.scaleX;
                    this.originalScaleY = this.scaleY;
                }

                createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(function () {
                    if (!_this.mouse) {
                        createjs.Tween.get(_this).to({ scaleX: _this.originalScaleX, scaleY: _this.originalScaleY }, 300, createjs.Ease.backOut);
                    }
                });
            };
            return Button;
        })(UI.UIItem);
        UI.Button = Button;

        var ImageButton = (function (_super) {
            __extends(ImageButton, _super);
            function ImageButton(background, event) {
                if (typeof event === "undefined") { event = null; }
                _super.call(this);

                if (event != null)
                    this.addEventListener("click", event);

                //adds image into it
                if (background != null) {
                    //TODO tirar createjs ASSETS daqui.
                    this.background = Gbase.AssetsManager.getBitmap(background);
                    this.addChildAt(this.background, 0);

                    //Sets the image into the pivot center.
                    if (this.background.getBounds()) {
                        this.width = this.background.getBounds().width;
                        this.height = this.background.getBounds().height;
                        this.background.regX = this.width / 2;
                        this.background.regY = this.height / 2;
                        this.centered = true;
                        this.createHitArea();
                    }
                }
            }
            return ImageButton;
        })(Button);
        UI.ImageButton = ImageButton;

        var TextButton = (function (_super) {
            __extends(TextButton, _super);
            function TextButton(text, event, background, font, color) {
                if (typeof text === "undefined") { text = ""; }
                if (typeof event === "undefined") { event = null; }
                _super.call(this, background, event);

                //Default values
                if (font == null)
                    font = defaultFontFamilyNormal;
                if (color == null)
                    color = "White";

                //add text into it.
                text = text.toUpperCase();

                this.text = new createjs.Text(text, font, color);
                this.text.textBaseline = "middle";
                this.text.textAlign = "center";

                //createHitArea
                if (background == null) {
                    this.width = this.text.getMeasuredWidth() * 1.5;
                    this.height = this.text.getMeasuredHeight() * 1.5;
                }

                this.addChild(this.text);
                this.createHitArea();
            }
            return TextButton;
        })(ImageButton);
        UI.TextButton = TextButton;

        var IconButton = (function (_super) {
            __extends(IconButton, _super);
            function IconButton(icon, text, background, event, font, color) {
                if (typeof icon === "undefined") { icon = ""; }
                if (typeof text === "undefined") { text = ""; }
                if (typeof event === "undefined") { event = null; }
                if (typeof font === "undefined") { font = null; }
                if (typeof color === "undefined") { color = null; }
                //add space before text
                if (text != "")
                    text = " " + text;

                _super.call(this, text, event, background, font, color);

                //loads icon Image
                this.icon = Gbase.AssetsManager.getBitmap(icon);
                this.addChild(this.icon);
                this.text.textAlign = "left";

                if (this.icon.getBounds())
                    this.icon.regY = this.icon.getBounds().height / 2;
                this.updateLabel(text);
            }
            IconButton.prototype.updateLabel = function (value) {
                this.text.text = value;
                if (this.icon.getBounds()) {
                    this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getMeasuredWidth()) / 2;
                    this.text.x = this.icon.x + this.icon.getBounds().width + 10;
                }
            };
            return IconButton;
        })(TextButton);
        UI.IconButton = IconButton;
    })(Gbase.UI || (Gbase.UI = {}));
    var UI = Gbase.UI;
})(Gbase || (Gbase = {}));
var Gbase;
(function (Gbase) {
    (function (UI) {
        var MenuContainer = (function (_super) {
            __extends(MenuContainer, _super);
            function MenuContainer(width, height, flowHorizontal) {
                if (typeof width === "undefined") { width = null; }
                if (typeof height === "undefined") { height = null; }
                if (typeof flowHorizontal === "undefined") { flowHorizontal = false; }
                if (!flowHorizontal)
                    _super.call(this, 1, 0, width, height, 0, flowHorizontal);
                else
                    _super.call(this, 0, 1, width, height, 0, flowHorizontal);
            }
            //adds a text object
            MenuContainer.prototype.addLabel = function (text) {
                var textObj;
                textObj = new UI.Label(text);
                this.addObject(textObj);
                return textObj.textField;
            };

            //creates a button object
            MenuContainer.prototype.addButton = function (text, event) {
                if (typeof event === "undefined") { event = null; }
                var buttonObj = new UI.TextButton(text, event);
                this.addObject(buttonObj);
                return buttonObj;
            };

            MenuContainer.prototype.addOutButton = function (text, event) {
                if (typeof event === "undefined") { event = null; }
                var buttonObj = new UI.TextButton(text, event);
                this.addObject(buttonObj);
                return buttonObj;
            };
            return MenuContainer;
        })(UI.Grid);
        UI.MenuContainer = MenuContainer;
    })(Gbase.UI || (Gbase.UI = {}));
    var UI = Gbase.UI;
})(Gbase || (Gbase = {}));
var Gbase;
(function (Gbase) {
    (function (UI) {
        var Label = (function (_super) {
            __extends(Label, _super);
            //public container: createjs.Container;
            function Label(text, font, color) {
                if (typeof text === "undefined") { text = ""; }
                if (typeof font === "undefined") { font = "600 90px Myriad Pro"; }
                if (typeof color === "undefined") { color = "#82e790"; }
                _super.call(this);
                text = text.toUpperCase();

                //add text into it.
                this.textField = new createjs.Text(text, defaultFontFamilyNormal, color);
                this.textField.textBaseline = "middle";
                this.textField.textAlign = "center";
                this.addChild(this.textField);
            }
            return Label;
        })(UI.UIItem);
        UI.Label = Label;
    })(Gbase.UI || (Gbase.UI = {}));
    var UI = Gbase.UI;
})(Gbase || (Gbase = {}));
var InvertCross;
(function (InvertCross) {
    // Class
    var ScreenViewer = (function () {
        function ScreenViewer(stage) {
            this.viewer = new createjs.Container();
        }
        ScreenViewer.prototype.updateScale = function (scale) {
            this.viewer.scaleX = this.viewer.scaleY = scale;
        };

        //switch current screen, optionaly with a pre defined transition
        ScreenViewer.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            //applies a default trainsition
            //TODO to it better
            if (!transition)
                transition = new Transition();

            //save oldscreen
            var oldScreen = this.currentScreen;

            //if transition
            if (transition && oldScreen) {
                //and transition = fade
                if (transition.type == "fade") {
                    //fade between transitions
                    newScreen.view.alpha = 0;
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    createjs.Tween.get(newScreen.view).to({ alpha: 1 }, transition.time).call(function () {
                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;
                        _this.removeOldScreen(oldScreen);
                        oldScreen = null;
                    });

                    createjs.Tween.get(oldScreen.view).to({ alpha: 0 }, transition.time);
                } else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            } else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }

            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.viewer.addChild(newScreen.view);

            this.currentScreen = newScreen;

            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.defaultWidth);
        };

        ScreenViewer.prototype.removeOldScreen = function (oldScreen) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.viewer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        };

        ScreenViewer.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            var currentHeight = realHeight / scale;
            var currentWidth = realWidth / scale;

            this.defaultWidth = defaultWidth;

            //set header and footer positions
            this.headerPosition = -(currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (currentHeight - defaultHeight) / 2;

            //set the viewer offset to centralize in window
            this.viewer.scaleX = this.viewer.scaleY = scale;
            this.viewer.y = this.viewerOffset = (currentHeight - defaultHeight) / 2 * scale;

            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.defaultWidth);
        };
        return ScreenViewer;
    })();
    InvertCross.ScreenViewer = ScreenViewer;

    var Transition = (function () {
        function Transition() {
            this.time = 300;
            this.type = "fade";
        }
        return Transition;
    })();
    InvertCross.Transition = Transition;
})(InvertCross || (InvertCross = {}));
var Gbase;
(function (Gbase) {
    var ScreenState = (function () {
        function ScreenState() {
            this.view = new createjs.Container();
            this.content = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();
            this.background = new createjs.Container();

            this.view.addChild(this.background);
            this.view.addChild(this.content);
            this.view.addChild(this.header);
            this.view.addChild(this.footer);
        }
        ScreenState.prototype.activate = function (parameters) {
            this.content.visible = true;
        };

        ScreenState.prototype.desactivate = function (parameters) {
            this.content.visible = false;
        };

        ScreenState.prototype.redim = function (headerY, footerY, width) {
            this.footer.y = footerY;
            this.header.y = headerY;

            var dh = footerY + headerY;
            var ch = footerY - headerY;
            var scale = ch / dh;

            if (scale < 1) {
                scale = 1;
                this.background.y = 0;
                this.background.x = 0;
            } else {
                this.background.y = headerY;
                this.background.x = -(width * scale - width) / 2;
            }

            this.background.scaleX = this.background.scaleY = scale;
        };

        ScreenState.prototype.back = function () {
            exitApp();
        };
        return ScreenState;
    })();
    Gbase.ScreenState = ScreenState;
})(Gbase || (Gbase = {}));
var InvertCross;
(function (InvertCross) {
    var Game = (function () {
        function Game() {
        }
        //-----------------------------------------------------------------------
        Game.initialize = function () {
            var _this = this;
            this.myCanvas = document.getElementById("myCanvas");
            var ctx = this.myCanvas.getContext("2d");
            this.stage = new createjs.Stage(this.myCanvas);

            createjs.Touch.enable(this.stage);

            createjs.Ticker.addEventListener("tick", function () {
                //ctx.msImageSmoothingEnabled = false;
                //ctx.webkitImageSmoothingEnabled = false;
                //ctx.mozImageSmoothingEnabled = false;
                _this.stage.update();
                _this.fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
            });

            createjs.Ticker.setFPS(60);

            this.screenViewer = new InvertCross.ScreenViewer(this.stage);
            this.stage.addChild(this.screenViewer.viewer);

            //Framerate meter
            this.fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#fff");
            this.fpsMeter.x = 0;
            this.fpsMeter.y = 0;
            this.stage.addChild(this.fpsMeter);

            //set screen size
            var r = parseInt(getQueryVariable("res"));

            if (r)
                var windowWidth = r;
            else
                var windowWidth = window.innerWidth;

            assetscale = 1;
            if (windowWidth <= 1024)
                assetscale = 0.5;
            if (windowWidth <= 420)
                assetscale = 0.25;

            console.log("using scale at " + assetscale + "x");
            this.redim(windowWidth, window.innerHeight);
            window.onresize = function () {
                _this.redim(windowWidth, window.innerHeight);
            };
        };

        Game.tick = function () {
            this.stage.update();
        };

        Game.redim = function (deviceWidth, deviceHeight, updateCSS) {
            if (typeof updateCSS === "undefined") { updateCSS = true; }
            this.myCanvas.width = deviceWidth;
            this.myCanvas.height = deviceHeight;

            this.screenViewer.updateViewerScale(deviceWidth, deviceHeight, DefaultWidth, DefaultHeight);

            if (updateCSS)
                setMobileScale(deviceWidth);
        };
        Game.defaultWidth = DefaultWidth;
        Game.defaultHeight = DefaultHeight;

        Game.canvasWidth = DefaultWidth;
        Game.canvasHeight = DefaultHeight;
        return Game;
    })();
    InvertCross.Game = Game;
})(InvertCross || (InvertCross = {}));
//declare var images: any;
//declare var Media: any;
//declare var assetscale: number;
//declare var spriteSheets : number;
var Gbase;
(function (Gbase) {
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
            this.loader.loadManifest(this.assetsManifest);

            return this.loader;
        };

        AssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };

        AssetsManager.getBitmap = function (name) {
            if (spriteSheets[name])
                return this.getSprite(name, false);
            else
                return new createjs.Bitmap(this.getImage(name));
        };

        AssetsManager.getImage = function (name) {
            return this.loader.getResult(name);
        };

        //DEPRECIATED
        //get a movie clip
        AssetsManager.getMovieClip = function (name) {
            var t = new window[name];
            return t;
        };

        //return a sprite according to the image
        AssetsManager.getSprite = function (name, play) {
            if (typeof play === "undefined") { play = true; }
            var data = spriteSheets[name];
            for (var i in data.images)
                if (typeof data.images[i] == "string")
                    data.images[i] = this.getImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play)
                sprite.play();
            return sprite;
        };

        AssetsManager.playSound = function (name) {
            if (!InvertCross.InvertCrossaGame.settings.getSoundfx())
                return;

            //wp8// this.mediaDic[name].play()
            createjs.Sound.play(name);
        };

        AssetsManager.playMusic = function (name) {
            if (!InvertCross.InvertCrossaGame.settings.getMusic())
                return;

            //WP8//var media = this.mediaDic[name];
            if (name == "")
                name = this.currentMusicname;
            if (this.currentMusicname == name) {
                if (this.currentMusic.playState == createjs.Sound.PLAY_SUCCEEDED)
                    return;
            }

            if (this.currentMusic != null)
                this.currentMusic.stop();

            this.currentMusic = createjs.Sound.play(name, "none", 0, 0, -1);

            //wp8//this.currentMusic = media;
            //wp8//media.play()
            this.currentMusicname = name;
        };

        AssetsManager.stopMusic = function () {
            if (this.currentMusic != null)
                this.currentMusic.stop();
        };
        return AssetsManager;
    })();
    Gbase.AssetsManager = AssetsManager;
})(Gbase || (Gbase = {}));
// Class
var aAssets = (function () {
    function aAssets() {
    }
    aAssets.loadAssets = function () {
        if (!assetscale)
            assetscale = 0.5;

        var imagePath = "assets/images_" + assetscale + "x/";
        var audioPath = "assets/sound/";

        //create a image array
        images = images || {};

        //creates a preload queue
        this.loader = new createjs.LoadQueue(false);

        //install sound plug-in for sounds format
        this.loader.installPlugin(createjs.Sound);

        //create eventListeners
        this.loader.addEventListener("fileload", function (evt) {
            if (evt.item.type == "image")
                images[evt.item.id] = evt.result;
            return true;
        });

        var manifest = [
            //common
            { id: "partshud", src: imagePath + "partshud.png" },
            { id: "partsicon", src: imagePath + "partsicon.png" },
            { id: "starsicon", src: imagePath + "staricon.png" },
            { id: "MenuBt", src: imagePath + "MenuBt.png" },
            { id: "BackBt", src: imagePath + "BackBt.png" },
            { id: "touch", src: imagePath + "touch.png" },
            //title
            //{ id: "title/LogoScreen", src: imagePath + "title/LogoScreen.jpg" },
            { src: imagePath + "logo/bandeira1.png", id: "bandeira1" },
            { src: imagePath + "logo/bandeira2.png", id: "bandeira2" },
            { src: imagePath + "logo/bandeira3.png", id: "bandeira3" },
            { src: imagePath + "logo/Cenario.jpg", id: "Cenario" },
            { src: imagePath + "logo/Cenário.jpg", id: "Cenário" },
            { src: imagePath + "logo/coqueiro02.png", id: "coqueiro02" },
            { src: imagePath + "logo/coqueiro1.png", id: "coqueiro1" },
            { src: imagePath + "logo/coqueiro2.png", id: "coqueiro2" },
            { src: imagePath + "logo/logo.png", id: "logo" },
            { src: imagePath + "logo/matoareia.png", id: "matoareia" },
            { src: imagePath + "logo/onda01.png", id: "onda01" },
            { src: imagePath + "logo/onda02.png", id: "onda02" },
            { src: imagePath + "logo/onda04.png", id: "onda04" },
            { src: imagePath + "logo/vagalume.png", id: "vagalume" },
            //intro
            { src: imagePath + "intro/bot.png", id: "bot" },
            { src: imagePath + "intro/Bot01.png", id: "Bot01" },
            { src: imagePath + "intro/botLight.png", id: "botLight" },
            { src: imagePath + "intro/fundoEscuro.jpg", id: "fundoEscuro" },
            //Bonus1
            { src: imagePath + "bonus1/back.png", id: "Bonus1/back" },
            { src: imagePath + "bonus1/header.png", id: "Bonus1/header" },
            { src: imagePath + "bonus1/footer.png", id: "Bonus1/footer" },
            { src: imagePath + "bonus1/icone_lata.png", id: "Bonus1/icone_lata" },
            { src: imagePath + "bonus1/Bonus1.png", id: "Bonus1/Bonus1" },
            { src: imagePath + "bonus2/back.jpg", id: "Bonus2/back" },
            { src: imagePath + "bonus2/header.png", id: "Bonus2/header" },
            { src: imagePath + "bonus2/footer.png", id: "Bonus2/footer" },
            { src: imagePath + "bonus2/bonuscard1.png", id: "Bonus2/bonuscard1" },
            { src: imagePath + "bonus2/bonuscard2.png", id: "Bonus2/bonuscard2" },
            { src: imagePath + "bonus2/bonusrat.png", id: "Bonus2/bonusrat" },
            //{ id: "projects/teste1", src: imagePath + "projects/teste1.png" },
            //{ id: "projects/teste0", src: imagePath + "projects/teste0.png" },
            { id: "projects/teste20", src: imagePath + "projects/teste20.png" },
            { id: "projects/teste21", src: imagePath + "projects/teste21.png" },
            { id: "projects/bgprojects", src: imagePath + "projects/bgprojects.jpg" },
            //projects
            /*
            
            { id: "projects/bgprojects", src: imagePath + "projects/bgprojects.jpg" },
            { id: "projects/Bonus1", src: imagePath + "projects/Bonus1.png" },
            { id: "projects/Bonus2", src: imagePath + "projects/Bonus2.png" },
            { id: "projects/Bonus3", src: imagePath + "projects/Bonus3.png" },
            { id: "projects/slot1", src: imagePath + "projects/slot1.png" },
            { id: "projects/slot2", src: imagePath + "projects/slot2.png" },
            { id: "projects/slot3", src: imagePath + "projects/slot3.png" },
            { id: "projects/slot0", src: imagePath + "projects/slot0.png" },
            { id: "projects/slotl", src: imagePath + "projects/slotl.png" },
            { id: "projects/star", src: imagePath + "projects/star.png" },
            { id: "projects/pageon", src: imagePath + "projects/pageon.png" },
            { id: "projects/pageoff", src: imagePath + "projects/pageoff.png" },
            { id: "projects/bigslot1", src: imagePath + "projects/bigslot1.png" },
            { id: "projects/btpage", src: imagePath + "projects/btpage.png" },
            
            //projects
            { id: "projects/bots/Bot01", src: imagePath + "projects/bots/Bot01.png" },
            { id: "projects/bots/Bot02", src: imagePath + "projects/bots/Bot02.png" },
            { id: "projects/bots/Bot03", src: imagePath + "projects/bots/Bot03.png" },
            { id: "projects/bots/Bot04", src: imagePath + "projects/bots/Bot04.png" },
            { id: "projects/bots/Bot05", src: imagePath + "projects/bots/Bot05.png" },
            { id: "projects/bots/Bot06", src: imagePath + "projects/bots/Bot06.png" },
            { id: "projects/bots/Bot07", src: imagePath + "projects/bots/Bot07.png" },
            { id: "projects/bots/Bot08", src: imagePath + "projects/bots/Bot08.png" },
            { id: "projects/bots/Bot09", src: imagePath + "projects/bots/Bot09.png" },
            { id: "projects/bots/Bot10", src: imagePath + "projects/bots/Bot10.png" },
            { id: "projects/bots/Bot11", src: imagePath + "projects/bots/Bot11.png" },
            { id: "projects/bots/Bot12", src: imagePath + "projects/bots/Bot12.png" },
            { id: "projects/bots/Bot13", src: imagePath + "projects/bots/Bot13.png" },
            { id: "projects/bots/Bot14", src: imagePath + "projects/bots/Bot14.png" },
            { id: "projects/bots/Bot15", src: imagePath + "projects/bots/Bot15.png" },
            { id: "projects/bots/Bot16", src: imagePath + "projects/bots/Bot16.png" },
            { id: "projects/bots/Bot17", src: imagePath + "projects/bots/Bot17.png" },
            { id: "projects/bots/Bot18", src: imagePath + "projects/bots/Bot18.png" },
            { id: "projects/bots/Bot01_shadow", src: imagePath + "projects/bots/Bot01_shadow.png" },
            { id: "projects/bots/Bot02_shadow", src: imagePath + "projects/bots/Bot02_shadow.png" },
            { id: "projects/bots/Bot03_shadow", src: imagePath + "projects/bots/Bot03_shadow.png" },
            { id: "projects/bots/Bot04_shadow", src: imagePath + "projects/bots/Bot04_shadow.png" },
            { id: "projects/bots/Bot05_shadow", src: imagePath + "projects/bots/Bot05_shadow.png" },
            { id: "projects/bots/Bot06_shadow", src: imagePath + "projects/bots/Bot06_shadow.png" },
            { id: "projects/bots/Bot07_shadow", src: imagePath + "projects/bots/Bot07_shadow.png" },
            { id: "projects/bots/Bot08_shadow", src: imagePath + "projects/bots/Bot08_shadow.png" },
            { id: "projects/bots/Bot09_shadow", src: imagePath + "projects/bots/Bot09_shadow.png" },
            { id: "projects/bots/Bot10_shadow", src: imagePath + "projects/bots/Bot10_shadow.png" },
            { id: "projects/bots/Bot11_shadow", src: imagePath + "projects/bots/Bot11_shadow.png" },
            { id: "projects/bots/Bot12_shadow", src: imagePath + "projects/bots/Bot12_shadow.png" },
            { id: "projects/bots/Bot13_shadow", src: imagePath + "projects/bots/Bot13_shadow.png" },
            { id: "projects/bots/Bot14_shadow", src: imagePath + "projects/bots/Bot14_shadow.png" },
            { id: "projects/bots/Bot15_shadow", src: imagePath + "projects/bots/Bot15_shadow.png" },
            { id: "projects/bots/Bot16_shadow", src: imagePath + "projects/bots/Bot16_shadow.png" },
            { id: "projects/bots/Bot17_shadow", src: imagePath + "projects/bots/Bot17_shadow.png" },
            { id: "projects/bots/Bot18_shadow", src: imagePath + "projects/bots/Bot18_shadow.png" },
            */
            //workshop
            { id: "workshop/workshop1", src: imagePath + "workshop/workshop1.png" },
            { id: "workshop/workshop2", src: imagePath + "workshop/workshop2.png" },
            { id: "workshop/workshop0", src: imagePath + "workshop/workshop0.png" },
            /*
            { src: imagePath + "workshop/bots/Bot01.png", id: "workshop/bots/Bot01" },
            { src: imagePath + "workshop/bots/Bot02.png", id: "workshop/bots/Bot02" },
            { src: imagePath + "workshop/bots/Bot03.png", id: "workshop/bots/Bot03" },
            { src: imagePath + "workshop/bots/Bot04.png", id: "workshop/bots/Bot04" },
            { src: imagePath + "workshop/bots/Bot05.png", id: "workshop/bots/Bot05" },
            { src: imagePath + "workshop/bots/Bot06.png", id: "workshop/bots/Bot06" },
            { src: imagePath + "workshop/bots/Bot07.png", id: "workshop/bots/Bot07" },
            { src: imagePath + "workshop/bots/Bot08.png", id: "workshop/bots/Bot08" },
            { src: imagePath + "workshop/bots/Bot09.png", id: "workshop/bots/Bot09" },
            { src: imagePath + "workshop/bots/Bot10.png", id: "workshop/bots/Bot10" },
            { src: imagePath + "workshop/bots/Bot11.png", id: "workshop/bots/Bot11" },
            { src: imagePath + "workshop/bots/Bot12.png", id: "workshop/bots/Bot12" },
            { src: imagePath + "workshop/bots/Bot13.png", id: "workshop/bots/Bot13" },
            { src: imagePath + "workshop/bots/Bot14.png", id: "workshop/bots/Bot14" },
            { src: imagePath + "workshop/bots/Bot15.png", id: "workshop/bots/Bot15" },
            { src: imagePath + "workshop/bots/Bot16.png", id: "workshop/bots/Bot16" },
            { src: imagePath + "workshop/bots/Bot17.png", id: "workshop/bots/Bot17" },
            { src: imagePath + "workshop/bots/Bot18.png", id: "workshop/bots/Bot18" },
            { src: imagePath + "workshop/bots/Bot01_fill.png", id: "workshop/bots/Bot01_fill" },
            { src: imagePath + "workshop/bots/Bot02_fill.png", id: "workshop/bots/Bot02_fill" },
            { src: imagePath + "workshop/bots/Bot03_fill.png", id: "workshop/bots/Bot03_fill" },
            { src: imagePath + "workshop/bots/Bot04_fill.png", id: "workshop/bots/Bot04_fill" },
            { src: imagePath + "workshop/bots/Bot05_fill.png", id: "workshop/bots/Bot05_fill" },
            { src: imagePath + "workshop/bots/Bot06_fill.png", id: "workshop/bots/Bot06_fill" },
            { src: imagePath + "workshop/bots/Bot07_fill.png", id: "workshop/bots/Bot07_fill" },
            { src: imagePath + "workshop/bots/Bot08_fill.png", id: "workshop/bots/Bot08_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot09_fill" },
            { src: imagePath + "workshop/bots/Bot10_fill.png", id: "workshop/bots/Bot10_fill" },
            { src: imagePath + "workshop/bots/Bot11_fill.png", id: "workshop/bots/Bot11_fill" },
            { src: imagePath + "workshop/bots/Bot12_fill.png", id: "workshop/bots/Bot12_fill" },
            { src: imagePath + "workshop/bots/Bot13_fill.png", id: "workshop/bots/Bot13_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot14_fill" },
            { src: imagePath + "workshop/bots/Bot15_fill.png", id: "workshop/bots/Bot15_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot16_fill" },
            { src: imagePath + "workshop/bots/Bot17_fill.png", id: "workshop/bots/Bot17_fill" },
            { src: imagePath + "workshop/bots/Bot18_fill.png", id: "workshop/bots/Bot18_fill" },
            { src: imagePath + "workshop/bots/Bot01_stroke.png", id: "workshop/bots/Bot01_stroke" },
            { src: imagePath + "workshop/bots/Bot02_stroke.png", id: "workshop/bots/Bot02_stroke" },
            { src: imagePath + "workshop/bots/Bot03_stroke.png", id: "workshop/bots/Bot03_stroke" },
            { src: imagePath + "workshop/bots/Bot04_stroke.png", id: "workshop/bots/Bot04_stroke" },
            { src: imagePath + "workshop/bots/Bot05_stroke.png", id: "workshop/bots/Bot05_stroke" },
            { src: imagePath + "workshop/bots/Bot06_stroke.png", id: "workshop/bots/Bot06_stroke" },
            { src: imagePath + "workshop/bots/Bot07_stroke.png", id: "workshop/bots/Bot07_stroke" },
            { src: imagePath + "workshop/bots/Bot08_stroke.png", id: "workshop/bots/Bot08_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot09_stroke" },
            { src: imagePath + "workshop/bots/Bot10_stroke.png", id: "workshop/bots/Bot10_stroke" },
            { src: imagePath + "workshop/bots/Bot11_stroke.png", id: "workshop/bots/Bot11_stroke" },
            { src: imagePath + "workshop/bots/Bot12_stroke.png", id: "workshop/bots/Bot12_stroke" },
            { src: imagePath + "workshop/bots/Bot13_stroke.png", id: "workshop/bots/Bot13_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot14_stroke" },
            { src: imagePath + "workshop/bots/Bot15_stroke.png", id: "workshop/bots/Bot15_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot16_stroke" },
            { src: imagePath + "workshop/bots/Bot17_stroke.png", id: "workshop/bots/Bot17_stroke" },
            { src: imagePath + "workshop/bots/Bot18_stroke.png", id: "workshop/bots/Bot18_stroke" },
            
            
            //workshow
            { id: "workshop/basefases", src: imagePath + "workshop/basefases.png" },
            { id: "workshop/bgworkshop", src: imagePath + "workshop/bgworkshop.png" },
            { id: "workshop/estrelaworkshop", src: imagePath + "workshop/estrelaworkshop.png" },
            { id: "workshop/faseamarela1", src: imagePath + "workshop/faseamarela1.png" },
            { id: "workshop/faseamarela2", src: imagePath + "workshop/faseamarela2.png" },
            { id: "workshop/faseamarela3", src: imagePath + "workshop/faseamarela3.png" },
            { id: "workshop/faseamarelaflip1", src: imagePath + "workshop/faseamarelaflip1.png" },
            { id: "workshop/faseamarelaflip2", src: imagePath + "workshop/faseamarelaflip2.png" },
            { id: "workshop/faseamarelaflip3", src: imagePath + "workshop/faseamarelaflip3.png" },
            { id: "workshop/faseamarelatime1", src: imagePath + "workshop/faseamarelatime1.png" },
            { id: "workshop/faseamarelatime2", src: imagePath + "workshop/faseamarelatime2.png" },
            { id: "workshop/faseamarelatime3", src: imagePath + "workshop/faseamarelatime3.png" },
            { id: "workshop/faseroxa1", src: imagePath + "workshop/faseroxa1.png" },
            { id: "workshop/faseroxa2", src: imagePath + "workshop/faseroxa2.png" },
            { id: "workshop/faseroxa3", src: imagePath + "workshop/faseroxa3.png" },
            { id: "workshop/faseroxaflip1", src: imagePath + "workshop/faseroxaflip1.png" },
            { id: "workshop/faseroxaflip2", src: imagePath + "workshop/faseroxaflip2.png" },
            { id: "workshop/faseroxaflip3", src: imagePath + "workshop/faseroxaflip3.png" },
            { id: "workshop/faseroxatime1", src: imagePath + "workshop/faseroxatime1.png" },
            { id: "workshop/faseroxatime2", src: imagePath + "workshop/faseroxatime2.png" },
            { id: "workshop/faseroxatime3", src: imagePath + "workshop/faseroxatime3.png" },
            { id: "workshop/faseverde1", src: imagePath + "workshop/faseverde1.png" },
            { id: "workshop/faseverde2", src: imagePath + "workshop/faseverde2.png" },
            { id: "workshop/faseverde3", src: imagePath + "workshop/faseverde3.png" },
            { id: "workshop/faseverdeflip1", src: imagePath + "workshop/faseverdeflip1.png" },
            { id: "workshop/faseverdeflip2", src: imagePath + "workshop/faseverdeflip2.png" },
            { id: "workshop/faseverdeflip3", src: imagePath + "workshop/faseverdeflip3.png" },
            { id: "workshop/faseverdetime1", src: imagePath + "workshop/faseverdetime1.png" },
            { id: "workshop/faseverdetime2", src: imagePath + "workshop/faseverdetime2.png" },
            { id: "workshop/faseverdetime3", src: imagePath + "workshop/faseverdetime3.png" },
            { id: "workshop/paginacaoworkshop", src: imagePath + "workshop/paginacaoworkshop.png" },
            { id: "workshop/painelworkshop", src: imagePath + "workshop/painelworkshop.png" },
            { id: "workshop/stargreen", src: imagePath + "workshop/stargreen.png" },
            { id: "workshop/starpurple", src: imagePath + "workshop/starpurple.png" },
            { id: "workshop/staryellow", src: imagePath + "workshop/staryellow.png" },
            */
            //puzzle
            { id: "puzzle/Puzzle", src: imagePath + "puzzle/Puzzle.png" },
            //My bots
            { src: imagePath + "myBots/mybotsbg.jpg", id: "mybotsbg" },
            { src: imagePath + "myBots/Bot01.png", id: "Bot01" },
            { src: imagePath + "myBots/Bot02.png", id: "Bot02" },
            { src: imagePath + "myBots/Bot03.png", id: "Bot03" },
            { src: imagePath + "myBots/Bot04.png", id: "Bot04" },
            { src: imagePath + "myBots/Bot05.png", id: "Bot05" },
            { src: imagePath + "myBots/Bot06.png", id: "Bot06" },
            { src: imagePath + "myBots/Bot07.png", id: "Bot07" },
            { src: imagePath + "myBots/Bot08.png", id: "Bot08" },
            { src: imagePath + "myBots/Bot09.png", id: "Bot09" },
            { src: imagePath + "myBots/Bot10.png", id: "Bot10" },
            { src: imagePath + "myBots/Bot11.png", id: "Bot11" },
            { src: imagePath + "myBots/Bot12.png", id: "Bot12" },
            { src: imagePath + "myBots/Bot13.png", id: "Bot13" },
            { src: imagePath + "myBots/Bot14.png", id: "Bot14" },
            { src: imagePath + "myBots/Bot15.png", id: "Bot15" },
            { src: imagePath + "myBots/Bot16.png", id: "Bot16" },
            { src: imagePath + "myBots/Bot17.png", id: "Bot17" },
            { src: imagePath + "myBots/Bot18.png", id: "Bot18" },
            /*
            { id: "puzzle/bg", src: imagePath + "puzzle/bg.jpg" },
            { id: "puzzle/btplay1", src: imagePath + "puzzle/btplay1.png" },
            { id: "puzzle/btplay2", src: imagePath + "puzzle/btplay2.png" },
            { id: "puzzle/btplay3", src: imagePath + "puzzle/btplay3.png" },
            { id: "puzzle/btpowerup", src: imagePath + "puzzle/btpowerup.png" },
            { id: "puzzle/btrestartpause", src: imagePath + "puzzle/btrestartpause.png" },
            { id: "puzzle/btsair", src: imagePath + "puzzle/btsair.png" },
            { id: "puzzle/btsom1", src: imagePath + "puzzle/btsom1.png" },
            { id: "puzzle/btsom2", src: imagePath + "puzzle/btsom2.png" },
            { id: "puzzle/iconemoves", src: imagePath + "puzzle/iconemoves.png" },
            { id: "puzzle/iconepause", src: imagePath + "puzzle/iconepause.png" },
            { id: "puzzle/iconeplay", src: imagePath + "puzzle/iconeplay.png" },
            { id: "puzzle/iconepuzzle", src: imagePath + "puzzle/iconepuzzle.png" },
            { id: "puzzle/iconerestart", src: imagePath + "puzzle/iconerestart.png" },
            { id: "puzzle/paginacaopuzzle", src: imagePath + "puzzle/paginacaopuzzle.png" },
            { id: "puzzle/painelpuzzle1", src: imagePath + "puzzle/painelpuzzle1.png" },
            { id: "puzzle/painelpuzzle2", src: imagePath + "puzzle/painelpuzzle2.png" },
            { id: "puzzle/tile0", src: imagePath + "puzzle/tile0.png" },
            { id: "puzzle/indicator", src: imagePath + "puzzle/indicator.png" },
            
            { id: "puzzle/icon_hint", src: imagePath + "puzzle/icon_hint.png" },
            { id: "puzzle/icon_time", src: imagePath + "puzzle/icon_time.png" },
            { id: "puzzle/icon_skip", src: imagePath + "puzzle/icon_skip.png" },
            { id: "puzzle/icon_touch", src: imagePath + "puzzle/icon_touch.png" },
            { id: "puzzle/icon_solve", src: imagePath + "puzzle/icon_solve.png" },
            
            { id: "puzzle/tile_yellow_1", src: imagePath + "puzzle/tile_yellow_1.png" },
            { id: "puzzle/tile_yellow_2", src: imagePath + "puzzle/tile_yellow_2.png" },
            { id: "puzzle/tile_yellow_3", src: imagePath + "puzzle/tile_yellow_3.png" },
            { id: "puzzle/tile_yellow_4", src: imagePath + "puzzle/tile_yellow_4.png" },
            
            { id: "puzzle/tile_green_1", src: imagePath + "puzzle/tile_green_1.png" },
            { id: "puzzle/tile_green_2", src: imagePath + "puzzle/tile_green_2.png" },
            { id: "puzzle/tile_green_3", src: imagePath + "puzzle/tile_green_3.png" },
            { id: "puzzle/tile_green_4", src: imagePath + "puzzle/tile_green_4.png" },
            
            { id: "puzzle/tile_purple_1", src: imagePath + "puzzle/tile_purple_1.png" },
            { id: "puzzle/tile_purple_2", src: imagePath + "puzzle/tile_purple_2.png" },
            { id: "puzzle/tile_purple_3", src: imagePath + "puzzle/tile_purple_3.png" },
            { id: "puzzle/tile_purple_4", src: imagePath + "puzzle/tile_purple_4.png" },
            { id: "puzzle/tilex", src: imagePath + "puzzle/tilex.png" },
            
            { id: "puzzle/tileD", src: imagePath + "puzzle/tileD.png" },
            { id: "puzzle/tilexD", src: imagePath + "puzzle/tilexD.png" },
            */
            //popup
            { id: "popups/popup", src: imagePath + "popups/popup.png" },
            { id: "popups/message", src: imagePath + "popups/message.png" },
            { id: "popups/popupTutorial", src: imagePath + "popups/popupbot.png" },
            //Legacy
            { id: "bolinhas", src: "assets/" + "bolinhas.png" },
            { id: "smokePart", src: "assets/" + "smokePart.png" }
        ];

        //loads entire manifest
        this.loader.loadManifest(manifest);

        return this.loader;
    };

    aAssets.getBitmap = function (name) {
        if (spriteSheets[name])
            return this.getSprite(name);
        else
            return new createjs.Bitmap(this.getImage(name));
    };

    aAssets.getImage = function (name) {
        return this.loader.getResult(name);
    };

    aAssets.getMovieClip = function (name) {
        var t = new window[name];
        return t;
    };

    aAssets.getSprite = function (name) {
        var data = spriteSheets[name];
        for (var i in data.images)
            if (typeof data.images[i] == "string")
                data.images[i] = this.getImage(data.images[i]);

        var spritesheet = new createjs.SpriteSheet(data);

        var sprite = new createjs.Sprite(spritesheet);
        sprite.play();
        return sprite;
    };

    aAssets.playSound = function (name) {
        if (!InvertCross.InvertCrossaGame.settings.getSoundfx())
            return;

        //wp8// this.mediaDic[name].play()
        createjs.Sound.play(name);
    };

    aAssets.playMusic = function (name) {
        if (!InvertCross.InvertCrossaGame.settings.getMusic())
            return;

        //WP8//var media = this.mediaDic[name];
        if (name == "")
            name = this.currentMusicname;
        if (this.currentMusicname == name) {
            if (this.currentMusic.playState == createjs.Sound.PLAY_SUCCEEDED)
                return;
        }

        if (this.currentMusic != null)
            this.currentMusic.stop();

        this.currentMusic = createjs.Sound.play(name, "none", 0, 0, -1);

        //wp8//this.currentMusic = media;
        //wp8//media.play()
        this.currentMusicname = name;
    };

    aAssets.stopMusic = function () {
        if (this.currentMusic != null)
            this.currentMusic.stop();
    };
    return aAssets;
})();
///depreciated
/* public static initSound(): boolean {
// if initializeDefaultPlugins returns false, we cannot play sound in this browser
if (!createjs.Sound.initializeDefaultPlugins()) { return false; }
var manifest = [
];
//createjs.Sound.addEventListener("loadComplete", (event: any): boolean => {
//    return true;
//});
createjs.Sound.registerManifest(manifest);
//wp7 8 compatibility cordova
//this.mediaDic = new Object();
//for (var i = 0; i < manifest.length; i++)
//    this.mediaDic[manifest[i].id] = new Media(manifest[i].src);
return true;
}*/
//declare var spriteSheets;
window.onload = function () {
    InvertCross.InvertCrossaGame.InvertCrossInitilize();
};

var InvertCross;
(function (InvertCross) {
    // Main game Class
    // Controller
    var InvertCrossaGame = (function (_super) {
        __extends(InvertCrossaGame, _super);
        function InvertCrossaGame() {
            _super.apply(this, arguments);
        }
        // ----------------------------- Initialization -------------------------------------------//
        InvertCrossaGame.InvertCrossInitilize = function () {
            //initialize main class
            InvertCrossaGame.initialize();

            //set createJS Parameters
            createjs.DisplayObject.avoidBitmapHitAreaCalculation = true;

            //userData
            this.userData = new InvertCross.UserData.ProjectsData();
            this.settings = new InvertCross.UserData.Settings();
            this.itemsData = new InvertCross.UserData.Items();
            this.storyData = new InvertCross.UserData.Story();
            this.timersData = new InvertCross.UserData.Timers();

            //managers
            InvertCrossaGame.projectManager = new InvertCross.Projects.ProjectManager(levelsData);

            //go to First Screen
            InvertCrossaGame.loadingScreen = new InvertCross.Menu.Loading();
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.loadingScreen);

            InvertCrossaGame.loadingScreen.loaded = function () {
                if (document.URL.toUpperCase().indexOf("CREATOR") > 0) {
                    InvertCrossaGame.screenViewer.switchScreen(new InvertCross.GamePlay.LevelCreator(null, window));
                } else
                    InvertCrossaGame.showTitleScreen();
            };

            //TODO tirar daqui
            if (InvertCrossaGame.itemsData.getItemQuantity("hint") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("hint", 50);

            if (InvertCrossaGame.itemsData.getItemQuantity("skip") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("skip", 5);

            if (InvertCrossaGame.itemsData.getItemQuantity("skip") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("skip", 5);
        };

        // ----------------------------- Game Methods ---------------------------------------------//
        InvertCrossaGame.showProjectsMenu = function () {
            InvertCrossaGame.levelScreeen = null;

            if (InvertCrossaGame.projectsMenu == null)
                InvertCrossaGame.projectsMenu = new InvertCross.Menu.ProjectsMenu();

            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.projectsMenu);
        };

        InvertCrossaGame.showProjectLevelsMenu = function (project, parameters) {
            //verifies the current projet
            if (project == null)
                project = InvertCrossaGame.projectManager.getCurrentProject();
            else
                InvertCrossaGame.projectManager.setCurrentProject(project);

            if (project == null)
                return;

            var projects = InvertCrossaGame.projectManager.getAllProjects();

            //verifies if rebuild is necessary
            if (parameters && parameters.rebuild)
                delete InvertCrossaGame.levelsMenu;

            //create a new levels menu, if needed
            if (InvertCrossaGame.levelsMenu == undefined)
                InvertCrossaGame.levelsMenu = new InvertCross.Menu.LevelsMenu();

            //switch screens
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelsMenu, parameters);
        };

        InvertCrossaGame.showBonus = function (bonusId) {
            var bonusScreen;
            switch (bonusId) {
                case "Bonus1":
                    bonusScreen = new InvertCross.Bonus.BonusBarrel(InvertCross.UserData.Items.itemsNames);
                    break;
                case "Bonus2":
                    bonusScreen = new InvertCross.Bonus.Bonus2(InvertCross.UserData.Items.itemsNames);
                    break;
                case "Bonus3":
                    bonusScreen = new InvertCross.Bonus.Bonus3(InvertCross.UserData.Items.itemsNames);
                    break;
                default:
            }

            //restart time
            this.timersData.setTimer(bonusId, bonusData[bonusId].timeOut);

            InvertCrossaGame.screenViewer.switchScreen(bonusScreen);
        };

        InvertCrossaGame.showLevel = function (level, parameters) {
            InvertCrossaGame.projectManager.setCurrentLevel(level);
            InvertCrossaGame.levelScreeen = InvertCrossaGame.createLevel(level);
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelScreeen, parameters);
        };

        InvertCrossaGame.createLevel = function (level) {
            switch (level.type) {
                case "puzzle":
                case "draw":
                    return new InvertCross.GamePlay.Puzzle(level);
                case "moves":
                case "flip":
                case "combo":
                    return new InvertCross.GamePlay.Moves(level);
                case "tutorial":
                    return new InvertCross.GamePlay.Tutorial(level);
                case "time":
                    return new InvertCross.GamePlay.TimeAtack(level);
            }

            return null;
        };

        InvertCrossaGame.completeLevel = function (complete) {
            if (typeof complete === "undefined") { complete = false; }
            this.showProjectLevelsMenu(null, { complete: complete });
        };

        InvertCrossaGame.looseLevel = function () {
            this.showProjectLevelsMenu(null, { loose: true });
        };

        InvertCrossaGame.exitLevel = function () {
            this.showProjectLevelsMenu();
        };

        InvertCrossaGame.showNextLevel = function () {
            var nextLevel = InvertCrossaGame.projectManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                InvertCrossaGame.showLevel(nextLevel);
            else
                InvertCrossaGame.exitLevel();
        };

        InvertCrossaGame.skipLevel = function (complete) {
            if (typeof complete === "undefined") { complete = false; }
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();

            InvertCrossaGame.projectManager.skipLevel(currentLevel);
            this.showProjectLevelsMenu(null, { complete: complete });
        };

        InvertCrossaGame.showMainMenu = function () {
            if (InvertCrossaGame.mainScreen == null)
                InvertCrossaGame.mainScreen = new InvertCross.Menu.MainMenu();

            InvertCross.InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.mainScreen);
        };

        InvertCrossaGame.showTitleScreen = function () {
            if (!InvertCrossaGame.titleScreen)
                InvertCrossaGame.titleScreen = new InvertCross.Menu.TitleScreen();
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.titleScreen);
        };

        InvertCrossaGame.replayLevel = function () {
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();
            InvertCrossaGame.showLevel(currentLevel);
        };

        InvertCrossaGame.completeProjectk = function (project) {
            InvertCrossaGame.screenViewer.switchScreen(this.mainScreen);
        };

        InvertCrossaGame.endGame = function () {
        };

        // ---------------------------- license --------------------------------------------------//
        InvertCrossaGame.isFree = function () {
            return false;
        };
        return InvertCrossaGame;
    })(InvertCross.Game);
    InvertCross.InvertCrossaGame = InvertCrossaGame;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.UserData || (InvertCross.UserData = {}));
    var UserData = InvertCross.UserData;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                localStorage.setItem("mus", "" + value);
                this.music = value;
                if (!value)
                    Gbase.AssetsManager.stopMusic();
                else
                    Gbase.AssetsManager.playMusic("");
            };
            return Settings;
        })();
        UserData.Settings = Settings;
    })(InvertCross.UserData || (InvertCross.UserData = {}));
    var UserData = InvertCross.UserData;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.UserData || (InvertCross.UserData = {}));
    var UserData = InvertCross.UserData;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.UserData || (InvertCross.UserData = {}));
    var UserData = InvertCross.UserData;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    // Module
    (function (UserData) {
        var ProjectsData = (function () {
            function ProjectsData() {
            }
            // ----------------------- Game Data ----------------------------------------------------------
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
                var value = localStorage.getItem(key);

                if (value == null) {
                    var ud = new InvertCross.Projects.LevelUserData();
                    ud.solved = false;
                    ud.skip = false;
                    ud.unlocked = false;
                    return ud;
                }
                return JSON.parse(value);
            };

            //gets user data from storage and store it to a project data
            ProjectsData.prototype.getProjectData = function (projectId) {
                var key = projectId;
                var value = localStorage.getItem(key);

                if (value == null) {
                    var ud = new InvertCross.Projects.ProjectUserData();
                    ud.unlocked = false;
                    ud.percent = 0;
                    ud.complete = false;
                    return ud;
                } else
                    return JSON.parse(value);
            };

            //updates storage with curret level user data
            ProjectsData.prototype.saveLevelData = function (level) {
                var key = level.name;
                localStorage.setItem(key, JSON.stringify(level.userdata));
            };

            //updates storage with curret project user data
            ProjectsData.prototype.saveProjectData = function (project) {
                var key = project.name;
                localStorage.setItem(key, JSON.stringify(project.UserData));
            };

            //-------------------------------------------------------------------------------------------
            //clear all storage data
            ProjectsData.prototype.clearAllData = function () {
                localStorage.clear();
            };
            return ProjectsData;
        })();
        UserData.ProjectsData = ProjectsData;
    })(InvertCross.UserData || (InvertCross.UserData = {}));
    var UserData = InvertCross.UserData;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        //Controller
        var LevelScreen = (function (_super) {
            __extends(LevelScreen, _super);
            //Initialization methodos ===================================================================================================
            function LevelScreen(leveldata) {
                _super.call(this);

                this.itemsFunctions = {};

                //Store level data;
                this.levelData = leveldata;

                //initializate level Model
                this.levelLogic = new GamePlay.Model.Level(leveldata);

                //play BgSound
                Gbase.AssetsManager.stopMusic();

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
                this.message = new InvertCross.Menu.View.Message();
                this.content.addChild(this.message);

                //adds popup
                this.popup = new InvertCross.Menu.View.Popup();
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
                var bg = Gbase.AssetsManager.getBitmap("workshop/bgworkshop");
                this.content.addChild(bg);
                bg.y = -339;
                bg.scaleY = 1.3310546875;
                bg.alpha = 0.4;
            };

            LevelScreen.prototype.initializeOverlays = function () {
                var _this = this;
                //intialize  menu overlay
                this.gameplayMenu = new GamePlay.Views.GamePlayMenu();
                this.gameplayMenu.y = -248;
                this.footer.addChild(this.gameplayMenu);

                //level control
                this.gameplayMenu.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.gameplayMenu.addEventListener("unpause", function () {
                    _this.unPauseGame();
                });
                this.gameplayMenu.addEventListener("restart", function (e) {
                    InvertCross.InvertCrossaGame.replayLevel();
                });
                this.gameplayMenu.addEventListener("back", function () {
                    InvertCross.InvertCrossaGame.exitLevel();
                });

                //upper staus area
                if (InvertCross.InvertCrossaGame.projectManager.getCurrentProject() != undefined) {
                    var levels = InvertCross.InvertCrossaGame.projectManager.getCurrentProject().levels;
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
                    Gbase.AssetsManager.playSound("prize");

                    //apply radius effect
                    _this.boardSprite.radiusEffect(col, row);
                }, 50);
            };

            LevelScreen.prototype.win = function (col, row, messageText) {
                var _this = this;
                if (typeof messageText === "undefined") { messageText = true; }
                //play a win sound
                Gbase.AssetsManager.playSound("win");

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
                InvertCross.InvertCrossaGame.projectManager.completeLevel(this.levelData);

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
                this.boardSprite.cache(bounds.x, bounds.y, bounds.width, bounds.height);

                //animate to out
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
                    _this.boardSprite.uncache();
                });

                //switch screen
                InvertCross.InvertCrossaGame.completeLevel(complete1stTime);
            };

            LevelScreen.prototype.loose = function () {
                this.gameplayMenu.fadeOut();
                this.boardSprite.lock();
                setTimeout(function () {
                    InvertCross.InvertCrossaGame.looseLevel();
                }, 3000);
                ;
                this.boardSprite.looseEffect();
            };

            // Items ====================================================================================================================
            LevelScreen.prototype.useItem = function (item) {
                //if user has iteem
                var itemQuantity = InvertCross.InvertCrossaGame.itemsData.getItemQuantity(item);
                if (itemQuantity > 0) {
                    //updates data
                    InvertCross.InvertCrossaGame.itemsData.decreaseItemQuantity(item);
                    this.usedItem = item;

                    //updates Items buttons labels Quantity on footer
                    this.gameplayMenu.updateItemsQuatity();

                    return true;
                } else {
                    //show a text
                    this.popup.showtext(stringResources.gp_noMoreHints);

                    return false;
                }
            };

            //skips the level
            LevelScreen.prototype.useItemSkip = function () {
                if (!this.useItem("skip"))
                    return;
                if (this.levelData.userdata.skip || this.levelData.userdata.solved)
                    InvertCross.InvertCrossaGame.skipLevel(false);
                else
                    InvertCross.InvertCrossaGame.skipLevel(true);
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
                _super.prototype.activate.call(this, parameters);
                if (parameters)
                    this.animatePuzzle(parameters);

                //updates Items buttons labels Quantity on footer
                this.gameplayMenu.updateItemsQuatity();
            };
            return LevelScreen;
        })(Gbase.ScreenState);
        GamePlay.LevelScreen = LevelScreen;
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        var Puzzle = (function (_super) {
            __extends(Puzzle, _super);
            function Puzzle(levelData) {
                var _this = this;
                _super.call(this, levelData);

                this.gameplayMenu.addButtons(["skip", "hint"]);
                this.gameplayMenu.addEventListener("skip", function () {
                    _this.useItemSkip();
                });
                this.gameplayMenu.addEventListener("hint", function () {
                    _this.useItemHint();
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        var TimeAtack = (function (_super) {
            __extends(TimeAtack, _super);
            function TimeAtack(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;

                this.gameplayMenu.addButtons(["time", "solve", "hint"]);
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

                        // this.boardSprite.visible = false;
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                                this.mirroredBlocks[m].state = blocks[b].state;

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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
/// <reference path="Board.ts" />
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                            return "Inv";
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
                        { name: "DNor", images: ["puzzle/tileD"] },
                        { name: "DInv", images: ["puzzle/tilexD"] },
                        { name: "null", images: ["puzzle/tile0"] }
                    ];

                    for (var state = 0; state < manifest.length; state++) {
                        this.assetsImages[manifest[state].name] = [];

                        for (var image = 0; image < manifest[state].images.length; image++) {
                            var img = this.loadAsset(manifest[state].images[image]);
                            this.assetsImages[manifest[state].name].push(img);
                        }
                    }

                    //Modificators
                    //load hint symbol
                    this.hintimage = Gbase.AssetsManager.getBitmap("puzzle/icon_hint");
                    this.container.addChild(this.hintimage);
                    this.hintimage.visible = false;

                    //load nurrir modificator tile
                    this.mirrorImage = Gbase.AssetsManager.getBitmap("puzzle/tilemirror");
                    this.container.addChild(this.mirrorImage);
                    this.mirrorImage.visible = false;
                    this.mirrorImage.x = this.mirrorImage.y = -5;

                    //load memoryModificator tile
                    this.memoryImage = Gbase.AssetsManager.getBitmap("puzzle/tilememory");
                    this.container.addChild(this.memoryImage);
                    this.memoryImage.visible = false;
                    this.memoryImage.alpha = 0;
                    this.memoryImage.scaleX = this.memoryImage.scaleY = 1.1;
                    this.memoryImage.x = this.memoryImage.y = -BlockSprite.defaultBlockSize * 0.05;
                    createjs.Tween.get(this.memoryImage).to({ alpha: 1 }, 5000);
                };

                //load a single asset and adds it to this
                BlockSprite.prototype.loadAsset = function (assetName) {
                    var asset = Gbase.AssetsManager.getBitmap(assetName);
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
                    createjs.Tween.get(this.container).to({ scaleX: 0.86, scaleY: 0.86 }, 200, createjs.Ease.backOut);
                };

                BlockSprite.prototype.animatePreInvertRelease = function () {
                    createjs.Tween.removeTweens(this);
                    this.container.scaleX = 0.8, this.container.scaleY = 0.8;
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    this.tutorialIndiatcor = Gbase.AssetsManager.getSprite("touch");
                    this.tutorialIndiatcor.regX = this.tutorialIndiatcor.regY = -55;
                    this.tutorialIndiatcor.mouseEnabled = false;
                    this.addChild(this.tutorialIndiatcor);
                    this.tutorialIndiatcor.visible = false;
                }
                //initializes the effectss sprites
                BoardSprite.prototype.initializeEffects = function () {
                    this.fx = new InvertCross.Effects();
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
                                Gbase.AssetsManager.playSound("tile" + randomsound);
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
                    //create backgound
                    //define time duration
                    this.radiusEffect(originCol, originRow);
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
                        this.applyHideEffect(x, y, delay * i);
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var menuContainer = new Gbase.UI.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.pauseButton = new Gbase.UI.TextButton("Pause");
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

                    var mc = new Gbase.UI.MenuContainer();
                    this.addChild(mc);

                    //Add Back Button
                    var menuContainer = new Gbase.UI.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.backButton = new Gbase.UI.TextButton("Continue");
                    menuContainer.addObject(this.backButton);

                    //add Label
                    mc.addLabel("Paused");

                    mc.addObject(new InvertCross.Menu.SoundMenu());

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
                    this.confirm = new Gbase.UI.MenuContainer(null, 100);
                    this.confirm.y = DefaultHeight / 1.8;

                    var smc;
                    smc = new Gbase.UI.Grid(2, 1, 700, 100, null, true);

                    this.confirm.addLabel("Are you sure?");
                    this.confirm.addObject(smc);
                    smc.regX = 700 / 2;
                    smc.y -= 150;

                    this.confirmMainButton = new Gbase.UI.TextButton("Yes", null, "botao2.png");
                    smc.addObject(new Gbase.UI.TextButton("No", function () {
                        _this.confirm.fadeOut();
                        _this.leaveButton.fadeIn();
                    }, "botao2.png"));
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        (function (Views) {
            var GamePlayMenu = (function (_super) {
                __extends(GamePlayMenu, _super);
                function GamePlayMenu() {
                    _super.call(this);

                    this.items = [];
                    this.createGamePlayMenu();
                    this.createPauseMenu();
                    this.addTutorialIndicator();
                }
                //adds tutorial touch indicator
                GamePlayMenu.prototype.addTutorialIndicator = function () {
                    this.tutorial_highlightSprite = Gbase.AssetsManager.getSprite("touch");
                    this.tutorial_highlightSprite.visible = false;
                    this.tutorial_highlightSprite.mouseEnabled = false;
                    this.addChild(this.tutorial_highlightSprite);
                };

                //creates all menu butons
                GamePlayMenu.prototype.createGamePlayMenu = function () {
                    var _this = this;
                    this.overlayMenu = new Gbase.UI.UIItem();
                    this.overlayMenu.width = 2 * DefaultWidth;
                    this.overlayMenu.height = 0;

                    var pausBt = new Gbase.UI.IconButton("puzzle/iconepause", "", "puzzle/btpowerup", function () {
                        _this.pause();
                    });
                    this.overlayMenu.addChild(pausBt), pausBt.x = 1400;

                    this.addChild(this.overlayMenu);
                };

                // ================ Add Buttons ==========================================
                GamePlayMenu.prototype.addButtons = function (buttons) {
                    //TODO tirar daqui
                    buttons.push("restart");

                    this.buttons = new Object();
                    this.parameters = new Object();
                    var xstart = 200;
                    var xstep = 340;

                    for (var b in buttons)
                        var bt = this.createItemButton(buttons[b], xstart + xstep * b);
                };

                //creates a iitem button and its feedback pand parameters, and adds it to screensk
                GamePlayMenu.prototype.createItemButton = function (buttonId, pos) {
                    var _this = this;
                    this.items.push(buttonId);

                    var button = new Gbase.UI.IconButton("puzzle/icon_" + buttonId, "", "puzzle/btpowerup", function () {
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
                        this.buttons[this.items[i]].updateLabel(InvertCross.InvertCrossaGame.itemsData.getItemQuantity(this.items[i]));

                    if (this.buttons["restart"])
                        this.buttons["restart"].updateLabel("");
                };

                // ============== pause menus ============================================
                GamePlayMenu.prototype.createPauseMenu = function () {
                    var _this = this;
                    var pauseMenu = new Gbase.UI.UIItem();

                    var playBt = new Gbase.UI.IconButton("puzzle/iconeplay", "", "puzzle/btplay1", function () {
                        _this.unpause();
                    });
                    playBt.x = 600;
                    var snd1Bt = new Gbase.UI.ImageButton("puzzle/btsom1", function () {
                        _this.dispatchEvent("soundOn");
                    });
                    snd1Bt.x = 160;
                    var snd2Bt = new Gbase.UI.ImageButton("puzzle/btsom2", function () {
                        _this.dispatchEvent("soundOff");
                    });
                    snd2Bt.x = 160;
                    var backBt = new Gbase.UI.ImageButton("puzzle/btsair", function () {
                        _this.dispatchEvent("back");
                    });
                    backBt.x = 400;

                    pauseMenu.addChild(playBt);
                    pauseMenu.addChild(snd1Bt);
                    pauseMenu.addChild(snd2Bt);
                    pauseMenu.addChild(backBt);

                    var bt = Gbase.AssetsManager.getBitmap("puzzle/btplay2");
                    bt.regY = 87;
                    bt.regX = 102;
                    bt.x = 0;
                    var c = new createjs.Container();
                    c.addChild(bt);
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
            })(Gbase.UI.UIItem);
            Views.GamePlayMenu = GamePlayMenu;
        })(GamePlay.Views || (GamePlay.Views = {}));
        var Views = GamePlay.Views;
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    this.bg1 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle2");

                    //this.bg2 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle1");
                    this.bg3 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle2");
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

                    this.iconepuzzle = Gbase.AssetsManager.getBitmap("puzzle/iconepuzzle");
                    this.iconemoves = Gbase.AssetsManager.getBitmap("puzzle/iconemoves");
                    this.iconetime = Gbase.AssetsManager.getBitmap("puzzle/iconetime");

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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Bonus) {
        // Class
        var BonusScreen = (function (_super) {
            __extends(BonusScreen, _super);
            function BonusScreen(itemsArray, bonusId) {
                if (typeof bonusId === "undefined") { bonusId = "1"; }
                _super.call(this);

                this.itemsArray = itemsArray;

                //adds scenary
                this.addScene(bonusId);

                //adds footer and itens
                this.addFooter(itemsArray);

                //adds bonus objc
                this.addObjects();

                //adds menu
                // this.addMenu();
                //adds message
                this.message = new InvertCross.Menu.View.Message();
                this.content.addChild(this.message);

                //adds popup
                this.popup = new InvertCross.Menu.View.Popup();
                this.content.addChild(this.popup);
                //bring content to front
                //this.view.setChildIndex(this.content, this.view.getNumChildren() - 1);
            }
            //add Scene objects to the view
            BonusScreen.prototype.addScene = function (bonusId) {
                //adds Background
                var background = Gbase.AssetsManager.getBitmap(bonusId + "/back");
                background.scaleX = background.scaleY = 2;
                background.name = "background";
                this.background.addChild(background);

                //adds header
                this.header.addChild(Gbase.AssetsManager.getBitmap(bonusId + "/header"));

                //adds footer
                var footer = Gbase.AssetsManager.getBitmap(bonusId + "/footer");
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

                for (var i = 0; i < itemsArray.length; i++) {
                    var itemId = itemsArray[i];

                    //add icon
                    var itemObj = Gbase.AssetsManager.getBitmap("puzzle/icon_" + itemId);
                    itemObj.y = 100;
                    itemObj.x = DefaultWidth / itemsArray.length * i + 40;
                    itemObj.name = itemId;
                    this.footerContainer.addChild(itemObj);

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
                var itemsArray = InvertCross.UserData.Items.itemsNames;
                for (var i = 0; i < itemsArray.length; i++) {
                    var itemId = itemsArray[i];
                    var textObj = this.footerTexts[itemId];
                    textObj.text = InvertCross.InvertCrossaGame.itemsData.getItemQuantity(itemId).toString();
                }
            };

            //animate a display object to the menu
            BonusScreen.prototype.animateItemObjectToFooter = function (itemObj, itemId) {
                var _this = this;
                var footerItem = this.footerContainer.getChildByName(itemId);
                if (footerItem) {
                    var point = itemObj.parent.localToLocal(0, 0, this.content);

                    createjs.Tween.get(itemObj).to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).to({
                        x: footerItem.x + this.footer.x + this.footerContainer.x - point.x,
                        y: footerItem.y + this.footer.y + this.footerContainer.y - point.y
                    }, 700, createjs.Ease.quadInOut).call(function () {
                        _this.updateFooterValues();
                    });
                }
            };

            //create a loop animation for a item
            BonusScreen.prototype.animateItemObjectIdle = function (itemObj) {
                createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y }, 500, createjs.Ease.quadInOut);
            };

            //adds menu to the view
            BonusScreen.prototype.addMenu = function () {
                var _this = this;
                this.menu = new InvertCross.Menu.View.ScreenMenu();
                this.menu.addEventListener("menu", function () {
                    InvertCross.InvertCrossaGame.screenViewer.switchScreen(new InvertCross.Menu.OptionsMenu());
                });
                this.menu.addEventListener("back", function () {
                    _this.back();
                });
                this.header.addChild(this.menu);
            };

            //updates user Data with new Item
            BonusScreen.prototype.userAquireItem = function (itemId) {
                InvertCross.InvertCrossaGame.itemsData.increaseItemQuantity(itemId);
            };

            //===========================================================
            BonusScreen.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);

                this.updateFooterValues();
            };

            BonusScreen.prototype.back = function () {
                InvertCross.InvertCrossaGame.showProjectsMenu();
            };

            //finalizes bonus game
            BonusScreen.prototype.endBonus = function () {
                //lock menu interaction
                //this.menu.fadeOut();
                var _this = this;
                //back to the screen
                setTimeout(function () {
                    _this.back();
                }, 2500);
            };
            return BonusScreen;
        })(Gbase.ScreenState);
        Bonus.BonusScreen = BonusScreen;
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var barrel = new Gbase.UI.Button();
                    barrel.addEventListener("click", function (event) {
                        _this.barrelTap(event);
                    });
                    var spriteBarrel = Gbase.AssetsManager.getSprite("Bonus1/Barrel" + (b + 1));
                    spriteBarrel.gotoAndPlay(Math.random() * 120);
                    barrel.addChild(spriteBarrel);
                    var bn = barrel.getBounds();
                    barrel.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(bn.x, bn.y, bn.width, bn.height));
                    var spriteWater = Gbase.AssetsManager.getSprite("Bonus1/agua");
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
                if (typeof itemsCount === "undefined") { itemsCount = 3; }
                var barrelsCount = 7;

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
                        this.BarrelsItens[b].addChild(Gbase.AssetsManager.getBitmap("puzzle/icon_" + this.items[b]));
                    else
                        this.BarrelsItens[b].addChild(Gbase.AssetsManager.getBitmap("Bonus1/icone_lata"));

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
                var i = Math.floor(Math.random() * this.itemsArray.length);
                var itemId = this.itemsArray[i];

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
                _super.prototype.endBonus.call(this);

                for (var barrel in this.barrels)
                    this.barrels[barrel].mouseEnabled = false;

                for (var b = 0; b < this.barrels.length; b++)
                    this.BarrelsItens[b].visible = true;

                //delay and hide others barrels and show other barrels content
                setTimeout(function () {
                    for (var barrel in _this.barrels)
                        createjs.Tween.get(_this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
                }, 1000);
            };
            return BonusBarrel;
        })(Bonus.BonusScreen);
        Bonus.BonusBarrel = BonusBarrel;
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                var cards = this.generateCards(12, 5, this.itemsArray);
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

                    //animate itens
                    this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                    this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);

                    this.matchesFound++;
                    return true;
                }
            };

            //===============================================================================
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
                    this.message.showtext(stringResources.b2_finish, 2000, 500);
                    this.message.addEventListener("onclose", function () {
                        _this.endBonus();
                    });
                    this.endBonus();
                }
            };

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
                var bg = Gbase.AssetsManager.getBitmap("Bonus2/bonuscard2");
                bg.name = "background";
                this.addChild(bg);

                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = Gbase.AssetsManager.getBitmap(itemImage);
                itemDO.name = "item";
                itemDO.x = 368 / 2;
                itemDO.y = 279 / 2;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                itemDO.visible = false;
                this.addChild(itemDO);

                //add cover image
                var cover = new Gbase.UI.ImageButton("Bonus2/bonuscard1");
                cover.x = 368 / 2;
                cover.y = 279 / 2;
                cover.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(-368 / 2, -279 / 2, 368, 279));
                cover.name = "cover";
                this.addChild(cover);

                //card.createHitArea();
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
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Bonus) {
        // Class
        var Bonus3 = (function (_super) {
            __extends(Bonus3, _super);
            function Bonus3(itemsArray, sufix) {
                if (typeof sufix === "undefined") { sufix = "1"; }
                _super.call(this, itemsArray, "3");
            }
            Bonus3.prototype.addObjects = function () {
                _super.prototype.addObjects.call(this);
            };
            return Bonus3;
        })(Bonus.BonusScreen);
        Bonus.Bonus3 = Bonus3;
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                this.pagesSwipe = new InvertCross.PagesSwipe(this.projectsContainer, this.projectViews, DefaultWidth, 200, 1500);
                this.createPaginationButtons(this.projectsContainer);
            }
            //--------------------- Initialization ---------------------
            LevelsMenu.prototype.addObjects = function () {
                //add Background
                var bg = Gbase.AssetsManager.getBitmap("workshop/bgworkshop");
                this.content.addChild(bg);
                bg.scaleY = 1.3310546875;
                bg.y = -339;

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
                    InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu());
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
                var projects = InvertCross.InvertCrossaGame.projectManager.getUnlockedProjects();

                //create projects container
                var projectsContainer = new createjs.Container();

                //creates projectViews array
                this.projectViews = new Array();

                for (var p in projects) {
                    var projectView = new Menu.View.ProjectWorkshopView(projects[p]);
                    this.projectViews.push(projectView);
                    projectsContainer.addChild(projectView);
                    projectView.activate();
                    projectView.x = DefaultWidth * p;
                    projectView.addEventListener("levelClick", function (e) {
                        _this.openLevel(e);
                    });
                }

                //add to view
                this.content.addChild(projectsContainer);
                this.projectsContainer = projectsContainer;
            };

            LevelsMenu.prototype.openLevel = function (event) {
                //cancel click in case of drag
                if (this.pagesSwipe.cancelClick)
                    return;

                var level = event.target['level'];
                var parameters = event.target['parameters'];

                if (level != null)
                    if (level.userdata.unlocked)
                        InvertCross.InvertCrossaGame.showLevel(level, parameters);
            };

            LevelsMenu.prototype.back = function () {
                InvertCross.InvertCrossaGame.showProjectsMenu();
            };

            // ----------------------- pagination -------------------------------------------------------
            LevelsMenu.prototype.createPaginationButtons = function (pagesContainer) {
                var _this = this;
                //create leftButton
                var lb = new Gbase.UI.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoPreviousPage();
                });
                lb.y = 1050;
                lb.x = DefaultWidth * 0.1;
                this.footer.addChild(lb);

                //create right button
                var rb = new Gbase.UI.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoNextPage();
                });
                rb.y = 1050;
                rb.x = DefaultWidth * 0.9;
                rb.scaleX = -1;
                this.footer.addChild(rb);
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

                for (var pv in this.projectViews) {
                    var project = InvertCross.InvertCrossaGame.projectManager.getProjectByName(this.projectViews[pv].name);

                    if (project == InvertCross.InvertCrossaGame.projectManager.getCurrentProject()) {
                        //activate current project
                        this.projectViews[pv].activate(parameters);

                        //goto current project
                        this.pagesSwipe.gotoPage(pv, false);

                        //if complete changes to myBotScreen
                        if (project.UserData.complete && this.projectPreviousState[project.name] == false) {
                            this.view.mouseEnabled = false;
                            this.view.mouseChildren = false;
                            setTimeout(function () {
                                _this.view.mouseEnabled = true;
                                _this.view.mouseChildren = true;
                                InvertCross.InvertCrossaGame.showMainMenu();
                            }, 2000);
                        }
                    }

                    //store last state
                    this.projectPreviousState[project.name] = project.UserData.complete;
                }
            };
            return LevelsMenu;
        })(Gbase.ScreenState);
        Menu.LevelsMenu = LevelsMenu;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                var loader = Gbase.AssetsManager.loadAssets(getAssetsManifest(assetscale), spriteSheets, images);

                //var loader = Assets.loadAssets();
                var text = new createjs.Text("", "600 90px Myriad Pro", "#FFF");
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
        })(Gbase.ScreenState);
        Menu.Loading = Loading;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Menu) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.call(this);

                var bg = Gbase.AssetsManager.getBitmap("mybotsbg");
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
                Gbase.AssetsManager.playMusic("trilha");

                //Verifies if it is the first time playing
                if (!InvertCross.InvertCrossaGame.storyData.getStoryPlayed("intro")) {
                    this.intro.visible = true;
                    this.myBots.visible = false;
                    this.playBt.visible = false;
                    this.intro.playPart1();
                } else if (!InvertCross.InvertCrossaGame.storyData.getStoryPlayed("intro2")) {
                    InvertCross.InvertCrossaGame.storyData.setStoryPlayed("intro2");
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
                this.myBots = new InvertCross.Robots.MyBots();
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
                    InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu());
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
                var playBt = new Gbase.UI.TextButton("PLAY", function () {
                    InvertCross.InvertCrossaGame.showProjectsMenu();
                }, null, defaultFontFamilyHighlight, highlightFontColor);

                this.content.addChild(playBt);
                playBt.x = 800;
                playBt.y = 1139;

                this.playBt = playBt;
            };

            MainMenu.prototype.back = function () {
                InvertCross.InvertCrossaGame.showTitleScreen();
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
                var t = InvertCross.InvertCrossaGame.timersData.getTimer(robot);
                this.terminal.setText(Math.floor(t / 1000 / 60) + " minutes");
            };

            //------------slide show---------------------------------------
            //TODO: ver isso
            MainMenu.prototype.playSlideShow = function () {
                var s = new Menu.SlideShow(["sl1", "sl2", "sl3"]);
                InvertCross.InvertCrossaGame.screenViewer.switchScreen(s);
                s.onfinish = function () {
                };
            };
            return MainMenu;
        })(Gbase.ScreenState);
        Menu.MainMenu = MainMenu;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Menu) {
        var OptionsMenu = (function (_super) {
            __extends(OptionsMenu, _super);
            function OptionsMenu() {
                _super.call(this);
                this.buildObjects();
            }
            OptionsMenu.prototype.buildObjects = function () {
                this.content.visible = false;
                var backgroundShape = new createjs.Shape();

                backgroundShape.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, DefaultWidth, DefaultHeight);
                this.content.addChild(backgroundShape);

                var mc = new Gbase.UI.MenuContainer();
                this.content.addChild(mc);

                //Add Back Button
                var backContainer = new Gbase.UI.Grid(1, 1, null, 373, null, true);
                backContainer.y = 1676;
                this.content.addChild(backContainer);

                backContainer.addObject(new Gbase.UI.TextButton(stringResources.op_back, function () {
                    InvertCross.InvertCrossaGame.showMainMenu();
                }));

                //add Label
                mc.addLabel(stringResources.op_options);

                mc.addObject(new Menu.SoundMenu());

                //add Other Buttons
                mc.addButton(stringResources.op_erase, function () {
                    InvertCross.InvertCrossaGame.userData.clearAllData();
                    window.location.reload();
                });
            };
            return OptionsMenu;
        })(Gbase.ScreenState);
        Menu.OptionsMenu = OptionsMenu;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                var bg = Gbase.AssetsManager.getBitmap("projects/bgprojects");
                bg.scaleY = bg.scaleX = 2;
                this.background.addChild(bg);

                this.addHeader();
                this.addProjects();
                this.addBonuses();

                this.pagesSwipe = new InvertCross.PagesSwipe(this.projectsGrid, this.pages, DefaultWidth);
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
                this.header.addChild(Gbase.AssetsManager.getBitmap("projects/projectHeader"));

                this.menu = new Menu.View.ScreenMenu(true, true);

                //TODO fazer camada intermediaria
                //TODO o options sempre volta pro menu principal. O_o
                this.menu.addEventListener("menu", function () {
                    InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu());
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

            ProjectsMenu.prototype.updateStatistcs = function () {
                var done = InvertCross.InvertCrossaGame.projectManager.getFinihedProjects().length;
                var total = InvertCross.InvertCrossaGame.projectManager.getAllProjects().length;
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
                var projects = InvertCross.InvertCrossaGame.projectManager.getAllProjects();

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
                for (var p = 0; p < this.pages.length; p++)
                    this.pages[p].addChild(new Menu.View.BonusItem("Bonus" + (p + 1), function (e) {
                        //cancel click in case of drag
                        if (_this.pagesSwipe.cancelClick)
                            return;

                        var bonusId = e.currentTarget.bonusId;
                        var timer = InvertCross.InvertCrossaGame.timersData.getTimer(bonusId);

                        if (timer == 0)
                            InvertCross.InvertCrossaGame.showBonus(bonusId);
                        else
                            _this.showtimeWarning(timer.toString());
                    }));
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
                    InvertCross.InvertCrossaGame.showProjectLevelsMenu(p, { rebuild: true });
                else {
                    var stars = InvertCross.InvertCrossaGame.projectManager.getStarsCount();
                    if (stars < p.cost)
                        this.showStarWarning(stars, p.cost);
                }
            };

            ProjectsMenu.prototype.showStarWarning = function (stars, cost) {
                this.popup.showtext(stringResources.pr_notStarsTitle, stringResources.pr_notStarsTitle.split("#")[0] + stars.toString() + stringResources.pr_notStarsTitle.split("#")[1] + cost.toString() + stringResources.pr_notStarsTitle.split("#")[2], 10000);
            };

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
                for (var i = 0; i < this.projectsItems.length; i++)
                    this.projectsItems[i].updateProjectInfo();
            };

            //=====================================================
            ProjectsMenu.prototype.createPaginationButtons = function (pagesContainer) {
                var _this = this;
                var bg = Gbase.AssetsManager.getBitmap("projects/projectFooter");
                bg.y = -246;
                this.footer.addChild(bg);

                //create leftButton
                var lb = new Gbase.UI.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoPreviousPage();
                });
                lb.y = -100;
                lb.x = DefaultWidth * 0.1;
                this.footer.addChild(lb);

                //create right button
                var rb = new Gbase.UI.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoNextPage();
                });
                rb.y = -100;
                rb.x = DefaultWidth * 0.9;
                rb.scaleX = -1;
                this.footer.addChild(rb);

                //create pagination indicator
                //TODO
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

                this.starsIndicator.updateStarsAmount(InvertCross.InvertCrossaGame.projectManager.getStarsCount());
            };

            ProjectsMenu.prototype.back = function () {
                InvertCross.InvertCrossaGame.showMainMenu();
            };
            return ProjectsMenu;
        })(Gbase.ScreenState);
        Menu.ProjectsMenu = ProjectsMenu;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Menu) {
        var SoundMenu = (function (_super) {
            __extends(SoundMenu, _super);
            // Constructor
            function SoundMenu() {
                _super.call(this);

                this.createObjects();
            }
            SoundMenu.prototype.createObjects = function () {
                var sfxon = new Gbase.UI.IconButton("botaofxon.png", "", "botaosom.png", function () {
                    InvertCross.InvertCrossaGame.settings.setSoundfX(false);
                    sfxon.visible = false;
                    sfxoff.visible = true;
                });
                var sfxoff = new Gbase.UI.IconButton("botaofxoff.png", "", "botaosom.png", function () {
                    InvertCross.InvertCrossaGame.settings.setSoundfX(true);
                    sfxoff.visible = false;
                    sfxon.visible = true;
                });
                var muson = new Gbase.UI.IconButton("botaomusicaon.png", "", "botaosom.png", function () {
                    InvertCross.InvertCrossaGame.settings.setMusic(false);
                    muson.visible = false;
                    musoff.visible = true;
                });
                var musoff = new Gbase.UI.IconButton("botaomusicaoff.png", "", "botaosom.png", function () {
                    InvertCross.InvertCrossaGame.settings.setMusic(true);
                    musoff.visible = false;
                    muson.visible = true;
                });

                musoff.visible = !InvertCross.InvertCrossaGame.settings.getMusic();
                muson.visible = InvertCross.InvertCrossaGame.settings.getMusic();
                sfxoff.visible = !InvertCross.InvertCrossaGame.settings.getSoundfx();
                sfxon.visible = InvertCross.InvertCrossaGame.settings.getSoundfx();

                //Add Sound Buttons
                var soundMenuOn = new Gbase.UI.Grid(2, 1, 600, 372, null, true);
                var soundMenuOff = new Gbase.UI.Grid(2, 1, 600, 372, null, true);
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var menuBt = new Gbase.UI.ImageButton("MenuBt", function () {
                        _this.dispatchEvent("menu", menuBt);
                    });
                    menuBt.y = 90;
                    menuBt.x = DefaultWidth - 130;
                    this.addChild(menuBt);

                    //add a bacl buttton
                    var backBt = new Gbase.UI.ImageButton("BackBt", function () {
                        _this.dispatchEvent("back", menuBt);
                    });
                    backBt.y = 90;
                    backBt.x = 130;
                    backBt.visible = backVisible;
                    this.addChild(backBt);
                };
                return ScreenMenu;
            })(Gbase.UI.UIItem);
            View.ScreenMenu = ScreenMenu;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
            })(Gbase.UI.Grid);
            View.LevelGrid = LevelGrid;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                        var sk = Gbase.AssetsManager.getBitmap("puzzle/icon_skip");
                        sk.regX = sk.getBounds().width / 2;
                        sk.regY = sk.getBounds().height / 2;
                        return sk;
                    }

                    if (level.userdata.item) {
                        var sk = Gbase.AssetsManager.getBitmap("puzzle/icon_" + level.userdata.item);
                        sk.regX = sk.getBounds().width / 2;
                        sk.regY = sk.getBounds().height / 2;
                        return sk;
                    }
                };

                //adds thumb background
                LevelThumb.prototype.createBackgroud = function (level, assetName, assetSufix) {
                    var sbg = Gbase.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
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
                    if (level.type == "time" || level.type == "flip") {
                        var tag = Gbase.AssetsManager.getBitmap("workshop/" + assetName + level.type + assetSufix);
                        tag.regX = tag.regY = 100;
                        return tag;
                    }
                };
                return LevelThumb;
            })(Gbase.UI.Button);
            View.LevelThumb = LevelThumb;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    //var bg = Gbase.AssetsManager.getBitmap("partshud");
                    //if (bg.getBounds())
                    //this.regX = bg.getBounds().width/2;
                    //this.addChild(bg);
                    //this.infoCotainer = new createjs.Container();
                    var si = Gbase.AssetsManager.getBitmap("starsicon");
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
            })(Gbase.UI.Button);
            View.StarsIndicator = StarsIndicator;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                        var s = Gbase.AssetsManager.getBitmap(bg);
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
                            var botImage = Gbase.AssetsManager.getBitmap("projects/" + project.name);
                        else
                            var botImage = Gbase.AssetsManager.getBitmap("projects/" + project.name + "_shadow");
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
                        var s = Gbase.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //adds lock indicator
                        var star = Gbase.AssetsManager.getBitmap("projects/star");
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
                    this.cache(0, 0, 480, 480);

                    //create hitArea
                    this.createHitArea();
                };

                //updates based on porject
                ProjectItem.prototype.updateProjectInfo = function () {
                    //verifica se o projeto pode ser destravado
                    //TODO. nao devia acessar metodo global aqui
                    InvertCross.InvertCrossaGame.projectManager.unlockProject(this.project);

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
            })(Gbase.UI.Button);
            View.ProjectItem = ProjectItem;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var s = Gbase.AssetsManager.getBitmap(str);
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.Projects || (InvertCross.Projects = {}));
    var Projects = InvertCross.Projects;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
    })(InvertCross.Projects || (InvertCross.Projects = {}));
    var Projects = InvertCross.Projects;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Projects) {
        // Controls projects and Levels.
        // Model
        var ProjectManager = (function () {
            // ------------------------------- initialization ----------------------------------------//
            function ProjectManager(data) {
                //Max simultaneous working/avaliable projects
                this.maxAvaliableProjects = 6;
                this.loadProjects(data);
            }
            ProjectManager.prototype.loadProjects = function (data) {
                this.projects = data;

                for (var p in this.projects)
                    for (var l in this.projects[p].levels) {
                        this.projects[p].levels[l].name = this.projects[p].name + "/" + this.projects[p].levels[l].name;
                        this.projects[p].levels[l].project = this.projects[p];
                    }

                //create a user data for each level/project
                InvertCross.InvertCrossaGame.userData.addUserData(this.projects);
            };

            // ------------------------------- manager Levels ----------------------------------------
            //get current Level
            ProjectManager.prototype.getCurrentLevel = function () {
                return this.currentLevel;
            };

            //set current level
            ProjectManager.prototype.setCurrentLevel = function (level) {
                this.currentLevel = level;
                this.setCurrentProject(level.project);
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
                    var nextLevel = InvertCross.InvertCrossaGame.projectManager.getNextLevel();
                    if (nextLevel != null)
                        this.unlockLevel(nextLevel);

                    //updates project info
                    this.updateProjectUserData(this.getCurrentProject());

                    //save user data
                    InvertCross.InvertCrossaGame.userData.saveLevelData(level);
                    InvertCross.InvertCrossaGame.userData.saveProjectData(this.getCurrentProject());
                }
            };

            //Finish a project.
            ProjectManager.prototype.completeLevel = function (level) {
                //updates level;
                level.userdata.solved = true;
                level.userdata.skip = false;
                level.userdata.unlocked = true;

                //updates next level
                var nextLevel = InvertCross.InvertCrossaGame.projectManager.getNextLevel();
                if (nextLevel != null)
                    this.unlockLevel(nextLevel);

                //updates project info
                this.updateProjectUserData(this.getCurrentProject());

                //save user data
                InvertCross.InvertCrossaGame.userData.saveLevelData(level);
                InvertCross.InvertCrossaGame.userData.saveProjectData(this.getCurrentProject());
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
                    InvertCross.InvertCrossaGame.userData.saveProjectData(project);
                    InvertCross.InvertCrossaGame.userData.saveLevelData(project.levels[0]);
                }
            };

            //unlock a level inside a project
            ProjectManager.prototype.unlockLevel = function (level) {
                //unlock level user data
                level.userdata.unlocked = true;
                InvertCross.InvertCrossaGame.userData.saveLevelData(level);
            };

            //Finish a project.
            ProjectManager.prototype.completeProject = function (project) {
                //TODO colocar isso em outro lugar
                //set played the intro when a project is complete
                InvertCross.InvertCrossaGame.storyData.setStoryPlayed("intro");

                if (project.UserData.complete == true)
                    return;

                project.UserData.complete = true;
                InvertCross.InvertCrossaGame.userData.saveProjectData(project);
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
    })(InvertCross.Projects || (InvertCross.Projects = {}));
    var Projects = InvertCross.Projects;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Robots) {
        // Controller Class
        var MyBots = (function (_super) {
            __extends(MyBots, _super);
            //----------------------initialization ---------------------------
            function MyBots() {
                _super.call(this);
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
                var projects = InvertCross.InvertCrossaGame.projectManager.getAllProjects();

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
                InvertCross.InvertCrossaGame.stage.update();
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
                var project = InvertCross.InvertCrossaGame.projectManager.getProjectByName(robotMc.name);

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
                var projects = InvertCross.InvertCrossaGame.projectManager.getFinihedProjects();

                //set all robots to start position
                this.hideAllRobots();

                for (var r = 0; r < projects.length; r++)
                    this.showRobot(projects[r].name);
            };

            //updates revenuesTimers
            //NOTE, talvez isso nao deva ficar aqui
            MyBots.prototype.checkRevenueTimers = function () {
                //get projects
                var projects = InvertCross.InvertCrossaGame.projectManager.getFinihedProjects();

                for (var r in projects)
                    //if robot has parts, set it alert
                    if (InvertCross.InvertCrossaGame.timersData.getTimer(projects[r].name) < 0)
                        this.alertRobot(projects[r].name);
            };

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
    })(InvertCross.Robots || (InvertCross.Robots = {}));
    var Robots = InvertCross.Robots;
})(InvertCross || (InvertCross = {}));
/// <reference path="script/typing/easeljs.d.ts" />
/// <reference path="script/typing/preloadjs.d.ts" />
/// <reference path="script/typing/soundjs.d.ts" />
/// <reference path="script/typing/tweenjs.d.ts" />
/// <reference path="src/preferences.ts" />
/*Gbase*/
/// <reference path="Gbase/UI/UIItem.ts" />
/// <reference path="Gbase/UI/Grid.ts" />
/// <reference path="Gbase/UI/Button.ts" />
/// <reference path="Gbase/UI/MenuContainer.ts" />
/// <reference path="Gbase/UI/Label.ts" />
/// <reference path="Gbase/ScreenViewer.ts" />
/// <reference path="Gbase/ScreenState.ts" />
/// <reference path="Gbase/Game.ts" />
/// <reference path="Gbase/AssetsManager.ts" />
/*scripts*/
/// <reference path="src/Assets.ts" />
/// <reference path="src/InvertCrossGame.ts" />
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
var InvertCross;
(function (InvertCross) {
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
                card.addChild(Gbase.AssetsManager.getBitmap("Bonus2/bonuscard2"));

                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = Gbase.AssetsManager.getBitmap(itemImage);
                itemDO.name = "item";
                itemDO.x = 368 / 2;
                itemDO.y = 279 / 2;
                itemDO.x -= itemDO.getBounds().width / 2;
                itemDO.y -= itemDO.getBounds().height / 2;
                card.addChild(itemDO);

                //add cover image
                var cover = new Gbase.UI.ImageButton("Bonus2/bonuscard1");
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
    })(InvertCross.Bonus || (InvertCross.Bonus = {}));
    var Bonus = InvertCross.Bonus;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Menu) {
        (function (View) {
            var BonusItem = (function (_super) {
                __extends(BonusItem, _super);
                function BonusItem(bonusId, action) {
                    _super.call(this, "projects/bigslot1", action);

                    this.bonusId = bonusId;
                    this.y = 470;
                    this.x = 768;

                    this.regX = 1430 / 2;
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
                    var stars = InvertCross.InvertCrossaGame.projectManager.getStarsCount();
                    if (stars >= bonusData[bonusId].cost) {
                        //background
                        var bg = "projects/" + bonusId;
                        var s = Gbase.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //timer text
                        this.timerText = new createjs.Text(("--:--:--").toString(), font, color);
                        this.timerText.textBaseline = "middle";
                        this.timerText.textAlign = "center";
                        this.timerText.x = 970;
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
                        var s = Gbase.AssetsManager.getBitmap(bg);
                        this.addChild(s);

                        //adds lock indicator
                        var star = Gbase.AssetsManager.getBitmap("projects/star");
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
                    var time = InvertCross.InvertCrossaGame.timersData.getTimer(this.bonusId);

                    if (time == 0) {
                        this.timerText.text = stringResources.mm_play;

                        if (!createjs.Tween.hasActiveTweens(this.timerText)) {
                            this.timerText.cache(-200, -50, 400, 100);
                            this.timerText.set({ scaleX: 1, scaleY: 1 });
                            createjs.Tween.get(this.timerText, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 400, createjs.Ease.sineInOut).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineInOut);
                        }
                    } else {
                        createjs.Tween.removeTweens(this.timerText);
                        this.timerText.text = this.toHHMMSS(time);
                        this.timerText.scaleX = this.scaleY = 1;
                        this.timerText.cache(-200, -50, 400, 100);
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
            })(Gbase.UI.ImageButton);
            View.BonusItem = BonusItem;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        var Moves = (function (_super) {
            __extends(Moves, _super);
            function Moves(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;

                this.gameplayMenu.addButtons(["touch", "solve", "hint"]);
                this.gameplayMenu.addEventListener("touch", function () {
                    _this.useItemTouch();
                });
                this.gameplayMenu.addEventListener("solve", function () {
                    _this.useItemSolve();
                });
                this.gameplayMenu.addEventListener("hint", function () {
                    _this.useItemHint();
                });

                this.puzzlesToSolve = levelData.puzzlesToSolve;
                this.moves = this.levelData.moves;

                this.levelLogic.board.setInvertedBlocks(levelData.blocksData);

                if (levelData.type == "draw") {
                    if (levelData.drawData == null)
                        this.levelLogic.board.setDrawBlocks(levelData.blocksData);
                    else
                        this.levelLogic.board.setDrawBlocks(levelData.drawData, false);
                }

                this.boardSprite.updateSprites(this.levelLogic.board.blocks);

                //set default puzzles to solve
                if (!this.levelData.puzzlesToSolve)
                    this.levelData.puzzlesToSolve = 1;
                this.popup.showTimeAttack(stringResources.gp_mv_Popup1Title, stringResources.gp_mv_Popup1Text1, this.levelData.puzzlesToSolve.toString(), this.levelData.moves.toString(), stringResources.gp_mv_Popup1Text2, stringResources.gp_mv_Popup1Text3);

                this.statusArea.setMode("moves");
                this.statusArea.setText3(this.moves.toString());
            }
            //threat user input
            Moves.prototype.userInput = function (col, row) {
                var _this = this;
                _super.prototype.userInput.call(this, col, row);

                //verifies if is a multiTouch
                if (Date.now() - this.lastTouchTime > 100 || !this.lastTouchTime)
                    this.moves--;

                this.lastTouchTime = Date.now();

                setTimeout(function () {
                    //loses game, if moves is over
                    if (!_this.levelLogic.verifyWin()) {
                        _this.statusArea.setText3(_this.moves.toString());

                        if (_this.moves <= 0) {
                            _this.message.showtext(stringResources.gp_mv_noMoreMoves);
                            _this.loose();
                        }
                    }
                }, 100);
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
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (GamePlay) {
        var LevelCreator = (function (_super) {
            __extends(LevelCreator, _super);
            function LevelCreator(levelData, editorWindow) {
                var _this = this;
                this.editWindow = editorWindow;
                window.onresize = function () {
                };
                InvertCross.InvertCrossaGame.redim(420, 600, false);
                InvertCross.InvertCrossaGame.redim = function (n) {
                };
                if (levelData == null) {
                    levelData = new InvertCross.Projects.Level();
                    levelData.width = 5;
                    levelData.height = 5;
                    levelData.blocksData = [];
                    levelData.theme = "green";
                }

                _super.call(this, levelData);

                this.levelLogic.board.setInvertedBlocks(levelData.blocksData);
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                this.gameplayMenu.visible = false;

                this.updateSelectList();

                this.editWindow.document.getElementById("c_create").onclick = function () {
                    levelData = _this.getLevelDataFromForm();
                    InvertCross.InvertCrossaGame.screenViewer.switchScreen(new LevelCreator(levelData, _this.editWindow));
                };

                this.editWindow.document.getElementById("c_save").onclick = function () {
                    var customData = _this.loadStored();
                    var levelData = _this.getLevelDataFromForm();

                    customData[levelData.name] = levelData;
                    _this.saveStored(customData);

                    _this.updateSelectList();
                };

                this.editWindow.document.getElementById("c_load").onclick = function () {
                    var s = _this.loadStored();

                    var selected = _this.editWindow.document.getElementById("c_select_level").value;
                    var level = s[selected];

                    if (level) {
                        _this.setFormFromLevelData(level);
                        InvertCross.InvertCrossaGame.screenViewer.switchScreen(new LevelCreator(level, _this.editWindow));
                    }
                };

                this.editWindow.document.getElementById("c_delete").onclick = function () {
                    var s = _this.loadStored();

                    var selected = _this.editWindow.document.getElementById("c_select_level").value;
                    delete s[selected];

                    _this.saveStored(s);

                    _this.updateSelectList();
                };

                this.editWindow.document.getElementById("c_export").onclick = function () {
                    var levelsArray = [];

                    var exp = localStorage.getItem(LevelCreator.key);

                    if (exp) {
                        var levels = JSON.parse(exp);
                        for (var l in levels)
                            levelsArray.push(levels[l]);

                        _this.editWindow.document.getElementById("c_exported").value = JSON.stringify(levelsArray);
                    }
                };

                this.editWindow.document.getElementById("c_import").onclick = function () {
                    var exp = _this.editWindow.document.getElementById("c_exported").value;
                    localStorage.setItem(LevelCreator.key, exp);
                    _this.updateSelectList();
                };
            }
            LevelCreator.prototype.loadStored = function () {
                var s = localStorage.getItem(LevelCreator.key);
                if (!s)
                    return {};
                else
                    return JSON.parse(s);
            };

            LevelCreator.prototype.saveStored = function (value) {
                localStorage.setItem(LevelCreator.key, JSON.stringify(value));
            };

            LevelCreator.prototype.updateSelectList = function () {
                var s = this.loadStored();
                this.editWindow.document.getElementById("c_select_level").options.length = 0;
                for (var i in s) {
                    var option = this.editWindow.document.createElement("option");
                    option.text = i;
                    this.editWindow.document.getElementById("c_select_level").add(option);
                }
            };

            LevelCreator.prototype.getLevelDataFromForm = function () {
                var levelData = new InvertCross.Projects.Level();

                levelData.name = this.editWindow.document.getElementById("c_name").value;

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
                if (levelData.name)
                    this.editWindow.document.getElementById("c_name").value = levelData.name;
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
            LevelCreator.key = "customPuzzles";
            return LevelCreator;
        })(GamePlay.Puzzle);
        GamePlay.LevelCreator = LevelCreator;
    })(InvertCross.GamePlay || (InvertCross.GamePlay = {}));
    var GamePlay = InvertCross.GamePlay;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                            InvertCross.InvertCrossaGame.showProjectsMenu();
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var image = Gbase.AssetsManager.getBitmap(slides[s]);
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
        })(Gbase.ScreenState);
        Menu.SlideShow = SlideShow;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    InvertCross.InvertCrossaGame.showMainMenu();
                });
            }
            TitleScreen.prototype.redim = function (headerY, footerY, width) {
                _super.prototype.redim.call(this, headerY, footerY, width);
                this.beach.y = -headerY / 4 - 616 + 77 / 4;
            };
            return TitleScreen;
        })(Gbase.ScreenState);
        Menu.TitleScreen = TitleScreen;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
    (function (Menu) {
        (function (View) {
            // View Class
            var Message = (function (_super) {
                __extends(Message, _super);
                //class contructor
                function Message() {
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
                Message.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (typeof timeout === "undefined") { timeout = 3000; }
                    if (typeof delay === "undefined") { delay = 0; }
                    //clean everything
                    this.removeAllChildren();

                    //draw background
                    var bg = Gbase.AssetsManager.getBitmap("popups/message");
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
                        _this.dispatchEvent("onclose");
                    }, timeout + delay);
                };

                //method for close popup
                Message.prototype.closePopUp = function () {
                    //hide the popup{
                    this.fadeOut(1, 0.5);
                };
                return Message;
            })(Gbase.UI.UIItem);
            View.Message = Message;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var bg = Gbase.AssetsManager.getBitmap("popups/popup");
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
                    var bg = Gbase.AssetsManager.getBitmap("popups/popup");
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
                    var bg = Gbase.AssetsManager.getBitmap("popups/popup");
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
                    var ind = Gbase.AssetsManager.getSprite("touch");
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
            })(Gbase.UI.UIItem);
            View.Popup = Popup;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var bg = Gbase.AssetsManager.getBitmap("popups/popupTutorial");
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
                    var ind = Gbase.AssetsManager.getSprite("touch");
                    this.addChild(ind);
                    ind.x = 1250;
                    ind.y = 900;
                };
                return PopupBot;
            })(View.Popup);
            View.PopupBot = PopupBot;
        })(Menu.View || (Menu.View = {}));
        var View = Menu.View;
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var bg = Gbase.AssetsManager.getBitmap("partshud");
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
                    var baseFases = Gbase.AssetsManager.getBitmap("workshop/basefases");
                    baseFases.y = -741;
                    levelMachine.addChild(baseFases);

                    //Add Stars
                    this.starsIndicator = new View.ProjectStarsIndicator(project);
                    this.starsIndicator.x = 1115;
                    this.starsIndicator.y = 1334 - 2048;
                    levelMachine.addChild(this.starsIndicator);

                    if ((!InvertCross.InvertCrossaGame.isFree() && project.free) || InvertCross.InvertCrossaGame.isFree()) {
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

                /*
                private animateIn(completeLevel: boolean= false, direction: number= -1) {
                
                //animate status and machihine
                this.levelsMahine.y = 800;
                this.statusArea.scaleX = 0;
                createjs.Tween.get(this.levelsMahine).to({ y: 0 }, 400, createjs.Ease.quadOut)
                createjs.Tween.get(this.statusArea).to({ scaleX: 1 }, 200, createjs.Ease.quadOut)
                
                //animate level complete
                if (completeLevel) this.robotPreview.animateLevelComplete();
                
                else {
                //animate Robot
                this.robotPreview.set({ x: -direction * DefaultWidth });
                createjs.Tween.get(this.robotPreview).to({ x: DefaultWidth / 2 }, 500, createjs.Ease.quadOut)
                }
                }
                
                private animateOut(call, direction: number= -1) {
                
                //animate machie
                createjs.Tween.get(this.levelsMahine).to({ y: 800 }, 200, createjs.Ease.quadIn).call(call)
                
                //animate name and button
                createjs.Tween.get(this.statusArea).wait(100).to({ scaleX: 0 }, 100, createjs.Ease.quadIn)
                
                //animate robot
                createjs.Tween.get(this.robotPreview).to({ x: direction * DefaultWidth }, 500, createjs.Ease.quadIn)
                }
                */
                //--Behaviour-----------------------------------------------------------
                //open a level
                ProjectWorkshopView.prototype.openLevel = function (event) {
                    var level = event.target['level'];
                    var parameters = event.target['parameters'];

                    if (level != null)
                        if (level.userdata.unlocked)
                            InvertCross.InvertCrossaGame.showLevel(level, parameters);
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    var size = 1000;
                    this.fill = this.addChild(Gbase.AssetsManager.getBitmap("workshop/" + project.name + "_fill"));
                    this.stroke = this.addChild(Gbase.AssetsManager.getBitmap("workshop/" + project.name + "_stroke"));
                    this.complete = this.addChild(Gbase.AssetsManager.getBitmap("workshop/" + project.name));

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
                };

                //update percentage
                RobotPreview.prototype.update = function (complete) {
                    if (typeof complete === "undefined") { complete = false; }
                    if (!complete)
                        if (this.project.UserData.complete) {
                            this.fill.visible = false;
                            this.stroke.visible = false;
                            this.complete.visible = true;
                        } else
                            this.percentMask.scaleY = this.project.UserData.percent;
                    else
                        this.animateLevelComplete();
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
    })(InvertCross.Menu || (InvertCross.Menu = {}));
    var Menu = InvertCross.Menu;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
            var fx = Gbase.AssetsManager.getMovieClip(effect);
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
    InvertCross.Effects = Effects;
})(InvertCross || (InvertCross = {}));
var InvertCross;
(function (InvertCross) {
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
                    if (Math.abs(pos.x - initialclick) > 100)
                        _this.cancelClick = true;
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
            if (typeof tween === "undefined") { tween = true; }
            this.currentPageIndex = pageId;

            if (tween)
                createjs.Tween.get(this.pagesContainer).to({ x: -this.pagewidth * pageId }, 250, createjs.Ease.quadOut);
            else
                this.pagesContainer.x = -this.pagewidth * pageId;
        };

        PagesSwipe.prototype.stayOnPage = function () {
            this.gotoPage(this.currentPageIndex);
        };

        PagesSwipe.prototype.gotoNextPage = function () {
            this.currentPageIndex++;
            if (this.currentPageIndex == this.pages.length)
                this.currentPageIndex = this.pages.length - 1;

            this.gotoPage(this.currentPageIndex);
        };

        PagesSwipe.prototype.gotoPreviousPage = function () {
            this.currentPageIndex--;
            if (this.currentPageIndex < 0)
                this.currentPageIndex = 0;
            this.gotoPage(this.currentPageIndex);
        };
        return PagesSwipe;
    })();
    InvertCross.PagesSwipe = PagesSwipe;
})(InvertCross || (InvertCross = {}));
//# sourceMappingURL=script.js.map
