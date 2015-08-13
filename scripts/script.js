var defaultWidth = 1536;
var defaultHeight = 2048 - 8;
var defaultFont = "'Exo 2.0'";
var defaultFontFamilySmall = " 50px  " + defaultFont;
var defaultFontFamilyNormal = " 80px  " + defaultFont;
var defaultFontFamilyStrong = " Bold 80px " + defaultFont;
var defaultFontFamilyHighlight = " Bold 130px " + defaultFont;
var defaultNumberHighlight = " 220px " + defaultFont;
var defaultFontColor = "#FF6";
var highlightFontColor = "#f2cb46";
var alternativeFontColor = "#3d8c9a";
var shadowFontColor = "#1b4f5e";
var grayColor = "#565656";
var blueColor = "#343171";
var storagePrefix = "flipp_";
var images;
var gameui;
(function (gameui) {
    // Class
    var AssetsManager = (function () {
        function AssetsManager() {
        }
        //load assets
        AssetsManager.loadAssets = function (manifest, path, spriteSheets) {
            var _this = this;
            if (path === void 0) { path = ""; }
            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.bitmapFontSpriteSheetDataArray = this.bitmapFontSpriteSheetDataArray ? this.bitmapFontSpriteSheetDataArray : new Array();
            this.assetsManifest = manifest;
            if (!images)
                images = new Array();
            if (!this.loader) {
                //creates a preload queue
                this.loader = new createjs.LoadQueue(false);
                //install sound plug-in for sounds format
                this.loader.installPlugin(createjs.Sound);
                createjs.Sound.alternateExtensions = ["mp3"];
                // Adds callbacks
                //this.loader.addEventListener("filestart", (evt: any) => { console.log("loading " + evt.item.src) })
                //this.loader.addEventListener("fileload", (evt: any) => { console.log("loaded " + evt.item.src) })
                this.loader.addEventListener("complete", function (evt) { if (_this.onComplete)
                    _this.onComplete(); });
                this.loader.addEventListener("progress", function (evt) { if (_this.onProgress)
                    _this.onProgress(evt.progress); });
                this.loader.addEventListener("fileload", function (evt) {
                    if (evt.item.type == "image")
                        images[evt.item.id] = evt.result;
                    return true;
                });
            }
            //loads entire manifest 
            this.loader.loadManifest(manifest, true, path);
        };
        // load a font spritesheet
        AssetsManager.loadFontSpriteSheet = function (id, spritesheetData) {
            this.bitmapFontSpriteSheetDataArray[id] = new createjs.SpriteSheet(spritesheetData);
        };
        // cleans all sprites in the bitmap array;
        AssetsManager.cleanAssets = function () {
            if (images)
                ;
            for (var i in images) {
                var img = images[i];
                if (img.dispose)
                    img.dispose();
                delete images[i];
            }
        };
        // return loaded image array
        AssetsManager.getImagesArray = function () {
            return images;
        };
        //gets a image from assets
        AssetsManager.getBitmap = function (name) {
            //if image id is described in spritesheets
            if (this.spriteSheets)
                if (this.spriteSheets[name])
                    return this.getSprite(name, false);
            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image) {
                var imgobj = new createjs.Bitmap(image);
                imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
                return imgobj;
            }
            //or else try grab by filename
            var imgobj = new createjs.Bitmap(name);
            imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return imgobj;
        };
        //get a bitmap Text
        AssetsManager.getBitmapText = function (text, bitmapFontId) {
            var bitmapText = new createjs.BitmapText(text, this.bitmapFontSpriteSheetDataArray[bitmapFontId]);
            bitmapText.lineHeight = 100;
            bitmapText.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return bitmapText;
        };
        //Get a preloaded Image from assets
        AssetsManager.getLoadedImage = function (name) {
            if (this.loader)
                return this.loader.getResult(name);
            return null;
        };
        //return a sprite according to the image
        AssetsManager.getSprite = function (name, play) {
            if (play === void 0) { play = true; }
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
        AssetsManager.defaultMouseEnabled = false;
        return AssetsManager;
    })();
    gameui.AssetsManager = AssetsManager;
})(gameui || (gameui = {}));
//TODO remove universal variable defaultWidth and DefaultHeigth
var gameui;
(function (gameui) {
    var GameScreen = (function () {
        //-----------------------------------------------------------------------
        function GameScreen(canvasId, gameWidth, gameHeight, fps, showFps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            //Initializes canvas Context            
            this.stage = new createjs.Stage(canvasId);
            createjs.Touch.enable(this.stage);
            var x = 0;
            createjs.Ticker.addEventListener("tick", function () { _this.stage.update(); });
            createjs.Ticker.setFPS(fps);
            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);
            //Framerate meter
            if (showFps) {
                var fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#000");
                fpsMeter.mouseEnabled = false;
                fpsMeter.x = 0;
                fpsMeter.y = 0;
                this.stage.addChild(fpsMeter);
                createjs.Ticker.addEventListener("tick", function () {
                    fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
                });
            }
            //var windowWidth = window.innerWidth;
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () { _this.resizeGameScreen(window.innerWidth, window.innerHeight); };
        }
        // switch current screen, optionaly with a pre defined transition
        GameScreen.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            //save oldscreen
            var oldScreen = this.currentScreen;
            //applies a default trainsition
            if (!transition)
                transition = new gameui.Transition();
            var x = 0;
            var y = 0;
            var alpha = 1;
            //if transition
            if (transition && oldScreen) {
                switch (transition.type) {
                    case "fade":
                        alpha = 0;
                        break;
                    case "top":
                        y = this.currentHeight;
                        break;
                    case "bottom":
                        y = -this.currentHeight;
                        break;
                    case "left":
                        x = -this.currentWidth;
                        break;
                    case "right":
                        x = this.currentWidth;
                        break;
                    case "none":
                        transition.time = 0;
                        break;
                }
                //and transition = fade
                if (transition.type && transition.type != "none") {
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    //fade between transitions
                    newScreen.view.set({ alpha: alpha, x: -x, y: -y });
                    oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: 1, x: x, y: y }, transition.time, createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(function () {
                        oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;
                        _this.removeOldScreen(oldScreen);
                        oldScreen = null;
                    });
                }
                else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            }
            else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }
            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);
            this.currentScreen = newScreen;
            //updates current screen
            this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        // resize GameScreen to a diferent scale
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight, updateCSS) {
            if (updateCSS === void 0) { updateCSS = true; }
            //keep aspect ratio 
            if (this.defaultHeight) {
                var aspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;
                if (aspectReal > aspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }
            this.stage.canvas.width = deviceWidth;
            this.stage.canvas.height = deviceHeight;
            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
        };
        // send hw back button event
        GameScreen.prototype.sendBackButtonEvent = function () {
            if (this.currentScreen && this.currentScreen.onback) {
                this.currentScreen.onback();
                return false;
            }
            else
                return true;
        };
        // updates screen viewer scale
        GameScreen.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            this.currentHeight = realHeight / scale;
            this.currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;
            //set header and footer positions
            this.headerPosition = -(this.currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (this.currentHeight - defaultHeight) / 2;
            //set the viewer offset to centralize in window
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (this.currentHeight - defaultHeight) / 2 * scale;
            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        // deletes old screen
        GameScreen.prototype.removeOldScreen = function (oldScreen) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.screenContainer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        };
        return GameScreen;
    })();
    gameui.GameScreen = GameScreen;
})(gameui || (gameui = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
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
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.resetFade();
            if (!this.scaleX)
                this.scaleX = 1;
            if (!this.scaleY)
                this.scaleY = 1;
            this.oldScaleX = this.scaleX;
            this.oldScaleY = this.scaleY;
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
                _this.scaleX = _this.oldScaleX;
                _this.scaleY = _this.oldScaleY;
                _this.alpha = 1;
                _this.animating = false;
                _this.mouseEnabled = true;
                ;
            });
        };
        UIItem.prototype.resetFade = function () {
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.scaleX = this.oldScaleX;
            this.scaleY = this.oldScaleY;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            if (this.visible = true)
                this.antX = null;
            if (!this.scaleX)
                this.scaleX = 1;
            if (!this.scaleY)
                this.scaleY = 1;
            this.oldScaleX = this.scaleX;
            this.oldScaleY = this.scaleY;
            this.visible = true;
            this.animating = true;
            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }
            this.scaleX = scaleX,
                this.scaleY = scaleY,
                this.alpha = 0,
                this.x = this.x;
            this.y = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: this.oldScaleX,
                scaleY: this.oldScaleY,
                alpha: 1,
                x: this.antX,
                y: this.antY
            }, 400, createjs.Ease.quadOut)
                .call(function () {
                _this.mouseEnabled = true;
                _this.animating = false;
            });
        };
        //calcula
        UIItem.prototype.createHitArea = function () {
            var hit = new createjs.Shape();
            var b = this.getBounds();
            if (b)
                if (this.hitPadding)
                    hit.graphics.beginFill("#000").drawRect(b.x - this.hitPadding, b.y - this.hitPadding, b.width + this.hitPadding, b.height + this.hitPadding);
                else
                    hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            //TODO. se for texto colocar uma sobra. !
            this.hitArea = hit;
        };
        return UIItem;
    })(createjs.Container);
    gameui.UIItem = UIItem;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    //this class alow user to arrange objects in a grid forrmat
    //the anchor point is the center of object
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(cols, rows, width, height, padding, flowHorizontal) {
            if (padding === void 0) { padding = 0; }
            _super.call(this);
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
            this.width = width;
            this.height = height;
            //define other parameters
            this.wSpacing = (width - padding * 2) / cols;
            this.hSpacing = (height - padding * 2) / rows;
        }
        //place objecrs into a grid format
        Grid.prototype.addObject = function (object) {
            this.addChild(object);
            object.x = this.getXPos();
            object.y = this.getYPos();
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
            }
            else {
                this.currentRow++;
                if (this.currentRow >= this.rows) {
                    this.currentRow = 0;
                    this.currentCol++;
                }
            }
        };
        return Grid;
    })(gameui.UIItem);
    gameui.Grid = Grid;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        //public container: createjs.Container;
        function Label(text, font, color) {
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = "600 90px Myriad Pro"; }
            if (color === void 0) { color = "#82e790"; }
            _super.call(this, text, font, color);
            this.text = this.text.toUpperCase();
            //add text into it.
            this.textBaseline = "middle";
            this.textAlign = "center";
        }
        return Label;
    })(createjs.Text);
    gameui.Label = Label;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var MenuContainer = (function (_super) {
        __extends(MenuContainer, _super);
        function MenuContainer(width, height, flowHorizontal) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (flowHorizontal === void 0) { flowHorizontal = false; }
            if (!flowHorizontal)
                _super.call(this, 1, 0, width, height, 0, flowHorizontal);
            else
                _super.call(this, 0, 1, width, height, 0, flowHorizontal);
        }
        //adds a text object
        MenuContainer.prototype.addLabel = function (text) {
            var textObj;
            textObj = new gameui.Label(text);
            this.addObject(textObj);
            return textObj;
        };
        //creates a button object
        MenuContainer.prototype.addButton = function (text, event) {
            if (event === void 0) { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };
        MenuContainer.prototype.addOutButton = function (text, event) {
            if (event === void 0) { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };
        return MenuContainer;
    })(gameui.Grid);
    gameui.MenuContainer = MenuContainer;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var ScreenState = (function () {
        function ScreenState() {
            this.view = new createjs.Container();
            this.content = new createjs.Container();
            this.overlay = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();
            this.background = new createjs.Container();
            this.view.addChild(this.background);
            this.view.addChild(this.content);
            this.view.addChild(this.footer);
            this.view.addChild(this.header);
            this.view.addChild(this.overlay);
        }
        ScreenState.prototype.activate = function (parameters) {
            this.content.visible = true;
        };
        ScreenState.prototype.desactivate = function (parameters) {
            this.content.visible = false;
        };
        ScreenState.prototype.redim = function (headerY, footerY, width, heigth) {
            this.screenHeight = heigth;
            this.screenWidth = width;
            this.footer.y = footerY;
            this.header.y = headerY;
            var dh = footerY + headerY;
            var ch = footerY - headerY;
            var scale = ch / dh;
            if (scale < 1) {
                scale = 1;
                this.background.y = 0;
                this.background.x = 0;
            }
            else {
                this.background.y = headerY;
                if (false) {
                    this.background.x = -(width * scale - width) / 2;
                    this.background.scaleX = this.background.scaleY = scale;
                }
                else {
                    this.background.x = 0;
                    this.background.scaleY = scale;
                }
            }
            var mask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, -(heigth - defaultHeight) / 2, width, heigth));
            this.background.mask = mask;
            this.footer.mask = mask;
            this.header.mask = mask;
            this.content.mask = mask;
        };
        return ScreenState;
    })();
    gameui.ScreenState = ScreenState;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Transition = (function () {
        function Transition() {
            this.time = 300;
            this.type = "fade"; // none,fade,left,top,right,bottom
        }
        return Transition;
    })();
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    // Class
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(soundId) {
            var _this = this;
            _super.call(this);
            this.enableAnimation = true;
            this.mouse = false;
            this.addEventListener("mousedown", function (event) { _this.onPress(event); });
            this.addEventListener("pressup", function (event) { _this.onPressUp(event); });
            this.addEventListener("mouseover", function () { _this.mouse = true; });
            this.addEventListener("mouseout", function () { _this.mouse = false; });
            this.soundId = soundId;
        }
        Button.setDefaultSoundId = function (soundId) {
            this.DefaultSoundId = soundId;
        };
        Button.prototype.returnStatus = function () {
            if (!this.mouse) {
                this.scaleX = this.originalScaleX;
                this.scaleY = this.originalScaleY;
            }
        };
        Button.prototype.onPressUp = function (Event) {
            this.mouse = false;
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
            if (!this.soundId)
                this.soundId = Button.DefaultSoundId;
            if (this.soundId)
                gameui.AudiosManager.playSound(this.soundId);
        };
        Button.prototype.setSound = function (soundId) {
            this.soundId = soundId;
        };
        return Button;
    })(gameui.UIItem);
    gameui.Button = Button;
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton(image, event, soundId) {
            var _this = this;
            _super.call(this, soundId);
            if (event != null)
                this.addEventListener("click", event);
            //adds image into it
            if (image != null) {
                this.background = gameui.AssetsManager.getBitmap(image);
                this.addChildAt(this.background, 0);
                //Sets the image into the pivot center.
                if (this.background.getBounds()) {
                    this.centralizeImage();
                }
                else if (this.background["image"])
                    this.background["image"].onload = function () { _this.centralizeImage(); };
            }
            this.createHitArea();
        }
        ImageButton.prototype.centralizeImage = function () {
            this.width = this.background.getBounds().width;
            this.height = this.background.getBounds().height;
            this.background.regX = this.width / 2;
            this.background.regY = this.height / 2;
            this.centered = true;
        };
        return ImageButton;
    })(Button);
    gameui.ImageButton = ImageButton;
    var TextButton = (function (_super) {
        __extends(TextButton, _super);
        function TextButton(text, font, color, background, event, soundId) {
            if (text === void 0) { text = ""; }
            _super.call(this, background, event, soundId);
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
            this.createHitArea();
        }
        return TextButton;
    })(ImageButton);
    gameui.TextButton = TextButton;
    var BitmapTextButton = (function (_super) {
        __extends(BitmapTextButton, _super);
        function BitmapTextButton(text, bitmapFontId, background, event, soundId) {
            _super.call(this, background, event, soundId);
            //add text into it.
            text = text.toUpperCase();
            this.bitmapText = gameui.AssetsManager.getBitmapText(text, bitmapFontId);
            this.addChild(this.bitmapText);
            this.bitmapText.regX = this.bitmapText.getBounds().width / 2;
            this.bitmapText.regY = this.bitmapText.lineHeight / 2;
            this.createHitArea();
        }
        return BitmapTextButton;
    })(ImageButton);
    gameui.BitmapTextButton = BitmapTextButton;
    var IconTextButton = (function (_super) {
        __extends(IconTextButton, _super);
        function IconTextButton(icon, text, font, color, background, event, soundId) {
            var _this = this;
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            //add space before text
            if (text != "")
                text = " " + text;
            _super.call(this, text, font, color, background, event, soundId);
            //loads icon Image
            this.icon = gameui.AssetsManager.getBitmap(icon);
            this.addChild(this.icon);
            this.text.textAlign = "left";
            if (this.icon.getBounds())
                this.icon.regY = this.icon.getBounds().height / 2;
            else if (this.icon["image"])
                this.icon["image"].onload = function () {
                    _this.icon.regY = _this.icon.getBounds().height / 2;
                };
            this.updateLabel(text);
            this.createHitArea();
        }
        IconTextButton.prototype.updateLabel = function (value) {
            this.text.text = value;
            if (this.icon.getBounds()) {
                this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getMeasuredWidth()) / 2;
                this.text.x = this.icon.x + this.icon.getBounds().width + 10;
            }
        };
        IconTextButton.prototype.centralizeIcon = function () {
        };
        return IconTextButton;
    })(TextButton);
    gameui.IconTextButton = IconTextButton;
    var IconButton = (function (_super) {
        __extends(IconButton, _super);
        function IconButton(icon, background, event, soundId) {
            if (icon === void 0) { icon = ""; }
            _super.call(this, icon, "", "", "", background, event, soundId);
        }
        return IconButton;
    })(IconTextButton);
    gameui.IconButton = IconButton;
})(gameui || (gameui = {}));
//declare var spriteSheets;
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
            this.gameScreen = new gameui.GameScreen("myCanvas", defaultWidth, defaultHeight, 60, true);
            //userData
            this.projectData = new FlipPlus.UserData.ProjectsData();
            this.settings = new FlipPlus.UserData.Settings();
            this.coinsData = new FlipPlus.UserData.Coins();
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
                    _this.toLevelCreator();
                }
                else
                    _this.showTitleScreen();
            };
            this.coinsData.setAmount(10);
        };
        // ----------------------------- Game Methods ---------------------------------------------//
        FlipPlusGame.toLevelCreator = function (level, callback) {
            if (!level) {
                level = new FlipPlus.Projects.Level();
                level.width = 0;
                level.height = 0;
            }
            this.gameScreen.switchScreen(new FlipPlus.GamePlay.LevelCreator2(level, callback), null, { type: "none", time: 0 });
        };
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
                this.levelsMenu = new FlipPlus.Menu.WorkshopMenu();
            //switch screens
            this.gameScreen.switchScreen(this.levelsMenu, parameters);
        };
        FlipPlusGame.showBonus = function (bonusId) {
            var bonusScreen;
            switch (bonusId) {
                case "Bonus1":
                    bonusScreen = new FlipPlus.Bonus.BonusBarrel(["coin"]);
                    break;
                case "Bonus2":
                    bonusScreen = new FlipPlus.Bonus.Bonus2(["coin"]);
                    break;
                case "Bonus3":
                    bonusScreen = new FlipPlus.Bonus.Bonus3(["coin"]);
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
            if (complete === void 0) { complete = false; }
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
            if (complete === void 0) { complete = false; }
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
        FlipPlusGame.showShopMenu = function (previousScreen) {
            this.gameScreen.switchScreen(new FlipPlus.Menu.ShopMenu(previousScreen));
        };
        FlipPlusGame.showSpecialOffer = function (previousScreen) {
            this.gameScreen.switchScreen(new FlipPlus.Menu.SpecialOfferMenu(previousScreen));
        };
        FlipPlusGame.replayLevel = function () {
            var currentLevel = this.projectManager.getCurrentLevel();
            this.showLevel(currentLevel);
        };
        FlipPlusGame.completeProject = function (project) {
            if (this.mainScreen == null)
                this.mainScreen = new FlipPlus.Menu.MainMenu();
            this.gameScreen.switchScreen(this.mainScreen);
            this.mainScreen.showNewBot(project.name);
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
var Items = (function () {
    function Items() {
    }
    // static items
    Items.HINT = "hint";
    Items.SKIP = "skip";
    Items.SOLVE = "solve";
    Items.TIME = "time";
    Items.TAP = "tap";
    return Items;
})();
var FlipPlus;
(function (FlipPlus) {
    var UserData;
    (function (UserData) {
        // Class
        var ItemsManager = (function () {
            function ItemsManager() {
                var data = localStorage.getItem(storagePrefix + "items");
                if (data)
                    this.itensDictionary = JSON.parse(data);
                else
                    this.itensDictionary = new Object();
            }
            ItemsManager.prototype.getItemQuantity = function (item) {
                if (this.itensDictionary[item])
                    return this.itensDictionary[item];
                else
                    return 0;
            };
            ItemsManager.prototype.setQuantityItem = function (item, value) {
                this.itensDictionary[item] = value;
                localStorage.setItem(storagePrefix + "items", JSON.stringify(this.itensDictionary));
            };
            ItemsManager.prototype.increaseItemQuantity = function (item, value) {
                if (value === void 0) { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq >= 10)
                    return;
                this.setQuantityItem(item, value + iq);
            };
            ItemsManager.prototype.decreaseItemQuantity = function (item, value) {
                if (value === void 0) { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq < value)
                    return;
                this.setQuantityItem(item, iq - value);
            };
            //defines existent Itens
            //TODO shall not be in userData
            ItemsManager.itemsNames = [Items.TAP, Items.HINT, Items.SKIP, Items.SOLVE, Items.TIME];
            return ItemsManager;
        })();
        UserData.ItemsManager = ItemsManager;
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var UserData;
    (function (UserData) {
        // Class
        var Settings = (function () {
            function Settings() {
                this.soundFX = true;
                this.music = true;
                this.soundFX = (localStorage.getItem("sfx") != "false");
                this.music = (localStorage.getItem("mus") != "false");
            }
            Settings.prototype.getMusic = function () { return this.music; };
            Settings.prototype.getSoundfx = function () { return this.soundFX; };
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
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var UserData;
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
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var UserData;
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
                if (minutes === void 0) { minutes = 0; }
                if (seconds === void 0) { seconds = 0; }
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
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
// Module
var FlipPlus;
(function (FlipPlus) {
    var UserData;
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
                }
                else
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
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        //Controller
        var LevelScreen = (function (_super) {
            __extends(LevelScreen, _super);
            // #region Initialization methodos ==================================================================================================
            function LevelScreen(leveldata) {
                _super.call(this);
                this.itemsFunctions = {};
                this.itemTimes = new Object();
                this.clicks = 0;
                // Store level data;
                this.levelData = leveldata;
                // initializate level Model
                this.levelLogic = new GamePlay.Model.Level(leveldata);
                // creates all screen objects
                this.createScene(leveldata);
                // incremente played times
                if (!this.levelData.userdata.playedTimes)
                    this.levelData.userdata.playedTimes = 0;
                this.levelData.userdata.playedTimes++;
            }
            // #endregion
            // #region Create Scene =============================================================================================================
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
                this.popupHelper = new FlipPlus.Menu.View.PopupHelper();
                this.content.addChild(this.popupHelper);
                this.popup.addEventListener("onshow", function () {
                    _this.gameplayMenu.fadeOut();
                    _this.boardSprite.mouseEnabled = false;
                });
                this.popup.addEventListener("onclose", function () {
                    _this.gameplayMenu.fadeIn();
                    _this.boardSprite.mouseEnabled = true;
                });
                this.popupHelper.addEventListener("onshow", function () {
                    _this.gameplayMenu.fadeOut();
                    _this.boardSprite.mouseEnabled = false;
                });
                this.popupHelper.addEventListener("onclose", function () {
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
                this.gameplayMenu.addEventListener("pause", function () { _this.pauseGame(); });
                this.gameplayMenu.addEventListener("unpause", function () { _this.unPauseGame(); });
                this.gameplayMenu.addEventListener("restart", function (e) {
                    FlipPlus.FlipPlusGame.analytics.logLevelRestart(_this.levelData.name, Date.now() - _this.startedTime, _this.clicks);
                    FlipPlus.FlipPlusGame.replayLevel();
                });
                this.gameplayMenu.addEventListener("back", function () {
                    FlipPlus.FlipPlusGame.analytics.logLevelRestart(_this.levelData.name, Date.now() - _this.startedTime, _this.clicks);
                    FlipPlus.FlipPlusGame.exitLevel();
                });
                // coins Indicator
                this.coinsIndicator = new FlipPlus.Menu.View.CoinsIndicator();
                this.header.addChild(this.coinsIndicator);
                this.coinsIndicator.x = defaultWidth / 2;
                //upper staus area
                if (FlipPlus.FlipPlusGame.projectManager.getCurrentProject() != undefined) {
                    var levels = FlipPlus.FlipPlusGame.projectManager.getCurrentProject().levels;
                    this.statusArea = new GamePlay.Views.StatusArea();
                    this.statusArea.y += 80;
                    this.statusArea.setText2("");
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
                this.boardSprite.x = defaultWidth / 2;
                this.boardSprite.y = defaultHeight / 2;
                this.boardSprite.addInputCallback(function (col, row) { _this.userInput(col, row); });
                //TODO create a custom event
            };
            LevelScreen.prototype.back = function () {
                this.pauseGame();
            };
            // #endregion
            // #region user input ===============================================================================================================
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
            // #endregion
            // #region  GamePlay methods =========================================================================================================
            LevelScreen.prototype.earnPrize = function (col, row) {
                var _this = this;
                this.levelLogic.earnPrize();
                setTimeout(function () {
                    //playSound
                    gameui.AudiosManager.playSound("Task Complete");
                    //apply radius effect
                    _this.boardSprite.radiusEffect(col, row);
                }, 50);
            };
            LevelScreen.prototype.win = function (col, row, messageText) {
                var _this = this;
                if (messageText === void 0) { messageText = true; }
                // analytics
                FlipPlus.FlipPlusGame.analytics.logLevelWin(this.levelData.name, (Date.now() - this.startedTime) / 100, this.clicks);
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
                setTimeout(function () { _this.winSwitchScreen(complete1stTime); }, 1800);
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
                this.boardSprite.mouseEnabled = false;
                this.gameplayMenu.fadeOut();
                this.boardSprite.lock();
                this.boardSprite.looseEffect();
                setTimeout(function () { FlipPlus.FlipPlusGame.looseLevel(); }, 3000);
                ;
            };
            // #endregion
            // #region  Items ====================================================================================================================
            // get item value based on how many times it has been used.
            LevelScreen.prototype.getItemPrice = function (item) {
                // increase the times counter
                var times = this.itemTimes[item];
                if (!times)
                    times = 0;
                // get item price
                var price = items[item].price[times];
                // return the selected price
                if (price)
                    return price;
                // if there is no more prices, get the highest price
                return items[item].price[items[item].price.length - 1];
            };
            // list all item prices
            LevelScreen.prototype.listItemPrices = function () {
                var list = new Object();
                for (var item in items)
                    list[item] = this.getItemPrice(item);
                return list;
            };
            // use an item
            LevelScreen.prototype.useItem = function (item) {
                //analytics
                FlipPlus.FlipPlusGame.analytics.logUsedItem(item, this.levelData.name);
                // define item value based on how many times it was used on the level
                var value = this.getItemPrice(item);
                //if user is able to use this item
                var coinsAmount = FlipPlus.FlipPlusGame.coinsData.getAmount();
                if (coinsAmount >= value) {
                    // sava item used information
                    if (!this.itemTimes[item])
                        this.itemTimes[item] = 0;
                    this.itemTimes[item]++;
                    //updates data
                    FlipPlus.FlipPlusGame.coinsData.decreaseAmount(value);
                    if (item != Items.HINT)
                        this.usedItem = item;
                    //updates Items buttons labels Quantity on footer
                    this.coinsIndicator.updateCoinsAmmount(FlipPlus.FlipPlusGame.coinsData.getAmount());
                    this.gameplayMenu.updateItemsPrice(this.listItemPrices());
                    // animate coins
                    this.coinsIndicator.createCoinEffect(this.gameplayMenu.getButtonPosition(item) - 768, 1900, value);
                    //show text effect
                    this.textEffext.showtext(stringResources["desc_item_" + item].toUpperCase());
                    return true;
                }
                else {
                    //show text effect
                    this.textEffext.showtext(stringResources["desc_item_" + item].toUpperCase());
                    this.popup.showtext(stringResources.gp_noMoreSkip, stringResources.gp_noMoreHints);
                    return false;
                }
            };
            //skips the level
            LevelScreen.prototype.useItemSkip = function () {
                if (!this.useItem(Items.SKIP))
                    return;
                if (this.levelData.userdata.skip || this.levelData.userdata.solved) {
                    this.message.showtext("Skip Level");
                    this.message.addEventListener("onclose", function () {
                        FlipPlus.FlipPlusGame.skipLevel(false);
                    });
                }
                else {
                    this.message.showtext("Skip Level");
                    this.message.addEventListener("onclose", function () {
                        FlipPlus.FlipPlusGame.skipLevel(true);
                    });
                }
            };
            //set hint for a block
            LevelScreen.prototype.useItemHint = function (blockId) {
                if (!this.useItem(Items.HINT))
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
            //set hint for a solve
            LevelScreen.prototype.usesolve = function () {
                this.win(0, 0);
            };
            // #endregion
            // #region Menus ====================================================================================================================
            LevelScreen.prototype.pauseGame = function () {
                var _this = this;
                this.boardSprite.lock();
                var med = defaultWidth / 4;
                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
                });
            };
            LevelScreen.prototype.unPauseGame = function () {
                this.boardSprite.unlock();
                var med = defaultWidth / 4;
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
                createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: defaultWidth / 2, y: defaultHeight / 2 }, 500, createjs.Ease.quadInOut);
            };
            // #endregion
            // #region  Screen ===================================================================================================================
            LevelScreen.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this, parameters);
                if (parameters)
                    this.animatePuzzle(parameters);
                // play music
                gameui.AudiosManager.playMusic("Music Minimal Tech");
                // analytics
                this.startedTime = Date.now();
                // updates Items buttons labels Quantity on footer
                this.coinsIndicator.updateCoinsAmmount(FlipPlus.FlipPlusGame.coinsData.getAmount());
                this.gameplayMenu.updateItemsPrice(this.listItemPrices());
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
                        .wait(200).call(function () { _this.boardSprite.mouseEnabled = true; });
                }
            };
            return LevelScreen;
        })(gameui.ScreenState);
        GamePlay.LevelScreen = LevelScreen;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Puzzle = (function (_super) {
            __extends(Puzzle, _super);
            function Puzzle(levelData) {
                var _this = this;
                _super.call(this, levelData);
                if (levelData.customItems)
                    this.gameplayMenu.addButtons(levelData.customItems);
                else
                    this.gameplayMenu.addButtons([Items.SKIP, Items.HINT]);
                this.gameplayMenu.addEventListener(Items.SKIP, function (parameter) { _this.useItemSkip(); });
                this.gameplayMenu.addEventListener(Items.HINT, function (parameter) { _this.useItemHint(parameter.target); });
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
            // handles user input
            Puzzle.prototype.userInput = function (col, row) {
                _super.prototype.userInput.call(this, col, row);
                this.trySuggestHelp();
            };
            // #region  Helpers ==================================================================================================================
            // user helper
            Puzzle.prototype.trySuggestHelp = function () {
                if (this.helped)
                    return;
                var plays = this.levelData.userdata.playedTimes;
                var invertsInitial = this.levelData.blocksData.length;
                var inverts = this.levelLogic.board.getInvertedBlocksCount();
                // verify if user went too far from solution.
                if (inverts > invertsInitial * 2) {
                    // verifies if user play a the same level lot of times
                    if (plays > 2) {
                        // send message to ask to skip
                        this.showSkipMessage();
                        this.helped = true;
                    }
                    else {
                        // show message to ask restart
                        this.showRestartMessage();
                        this.helped = true;
                    }
                }
            };
            // show a message asking for user to restart
            Puzzle.prototype.showRestartMessage = function () {
                this.popupHelper.showRestartMessage();
            };
            // show a message asking for user to skip
            Puzzle.prototype.showSkipMessage = function () {
                var _this = this;
                this.popupHelper.showItemMessage(Items.SKIP, this.getItemPrice(Items.SKIP), function () { }, function () { _this.useItemSkip(); }, "menu/imskip");
            };
            return Puzzle;
        })(GamePlay.LevelScreen);
        GamePlay.Puzzle = Puzzle;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var TimeAtack = (function (_super) {
            __extends(TimeAtack, _super);
            function TimeAtack(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;
                this.gameplayMenu.addButtons([Items.SKIP, Items.TIME, Items.SOLVE, Items.HINT]);
                this.gameplayMenu.addEventListener(Items.SKIP, function () { _this.useItemSkip(); });
                this.gameplayMenu.addEventListener(Items.TIME, function () { _this.useItemTime(); });
                this.gameplayMenu.addEventListener(Items.SOLVE, function () { _this.useItemSolve(); });
                this.gameplayMenu.addEventListener(Items.HINT, function () { _this.useItemHint(); });
                this.puzzlesToSolve = levelData.puzzlesToSolve;
                this.currentTime = levelData.time;
                this.randomBoard(levelData.randomMinMoves, levelData.randomMaxMoves);
                this.statusArea.setMode(Items.TIME);
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
                        // suggest more time
                        _this.timer.stop();
                        _this.boardSprite.mouseEnabled = false;
                        _this.popupHelper.showItemMessage(Items.TIME, _this.getItemPrice(Items.TIME), function () {
                            _this.useItemTime();
                            _this.boardSprite.mouseEnabled = true;
                            _this.timer.start();
                        }, function () {
                            gameui.AudiosManager.playSound("Power Down");
                            _this.statusArea.setText3(stringResources.gp_pz_statusEnd);
                            _this.message.showtext(stringResources.gp_pz_timeUP);
                            _this.loose();
                        });
                    }
                    if (_this.currentTime == 4) {
                        // play sound
                        gameui.AudiosManager.playSound("Ticking Clock");
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
                }
                else {
                    //animate board and switch
                    var defaultX = this.boardSprite.x;
                    createjs.Tween.removeTweens(this.boardSprite);
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX - defaultWidth }, 250, createjs.Ease.quadIn).call(function () {
                        _this.currentPuzzle++;
                        _this.boardSprite.clearHint();
                        _this.randomBoard(_this.levelData.randomMinMoves, _this.levelData.randomMaxMoves);
                        _this.boardSprite.x = defaultX + defaultWidth;
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
                if (minMoves === void 0) { minMoves = 2; }
                if (maxMoves === void 0) { maxMoves = 5; }
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
                if (!this.useItem(Items.SOLVE))
                    return;
                this.win(0, 0);
            };
            TimeAtack.prototype.useItemTime = function () {
                if (!this.useItem(Items.TIME))
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
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
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
                }
                else
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
                else {
                    this.boardSprite.mouseEnabled = false;
                    setTimeout(function () {
                        _this.currentTutorialStep = 0;
                        _this.tutorialSteps = _this.tutorialStepsEnd;
                        _this.playNextTurorialStep();
                        _this.endTutorial = function () {
                            _super.prototype.win.call(_this, col, row, false);
                        };
                    }, 500);
                }
            };
            return Tutorial;
        })(GamePlay.Puzzle);
        GamePlay.Tutorial = Tutorial;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Model;
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
        })(Model = GamePlay.Model || (GamePlay.Model = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Model;
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
                    //verifies for each solutions
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
                    if (prizesCount === void 0) { prizesCount = 2; }
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
                            if (col < this.width && row < this.height)
                                this.invertCross(col, row);
                        }
                        this.initializePrizes(prizesCount, invertedBlocks.length);
                    }
                };
                Board.prototype.setDrawBlocks = function (drawBlocks, cross) {
                    if (cross === void 0) { cross = true; }
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
                    if (minMoves === void 0) { minMoves = 0; }
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
                    //invert all blocks
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
                    if (cross === void 0) { cross = true; }
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
        })(Model = GamePlay.Model || (GamePlay.Model = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
/// <reference path="Board.ts" />
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Model;
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
                //Definitions
                Level.movePoint = -5;
                Level.timePoint = -6;
                Level.prizesPoint = 100;
                Level.endPoint = 1000;
                return Level;
            })();
            Model.Level = Level;
        })(Model = GamePlay.Model || (GamePlay.Model = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
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
                    if (this.hintEnalble && this.block.inverted) {
                        //shows hint image
                        if (!this.hintimage.visible) {
                            this.hintimage.visible = true;
                            //animate it
                            createjs.Tween.get(this.hintimage).to({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticOut);
                        }
                    }
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
                        createjs.Tween.get(oldStateImage).to({ scaleY: 0, scaleX: 0 }, 100, createjs.Ease.cubicIn).call(function () { oldStateImage.visible = false; });
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
                        { name: "Nor", images: ["puzzle/tile_" + theme + "_1", "puzzle/tile_" + theme + "_2", "puzzle/tile_" + theme + "_3", "puzzle/tile_" + theme + "_4",] },
                        { name: "Inv", images: ["puzzle/tilex"] },
                        { name: "DInv", images: ["puzzle/tileDgray"] },
                        { name: "DNor", images: ["puzzle/tileD" + theme] },
                        //{ name: "DInv", images: ["puzzle/tilexD"] },
                        { name: "null", images: ["puzzle/tile0"] },
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
                    this.hintimage.regX = 36;
                    this.hintimage.regY = 20;
                    this.hintimage.x = 36 * 2;
                    this.hintimage.y = 20 * 2;
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
                    createjs.Tween.get(this.memoryImage)
                        .to({ alpha: 1 }).wait(500)
                        .to({ alpha: 0 }).wait(500)
                        .to({ alpha: 1 }).wait(500)
                        .to({ alpha: 0 }).wait(500)
                        .to({ alpha: 1 }).wait(500)
                        .to({ alpha: 0 }).wait(500)
                        .to({ alpha: 1 }).wait(250)
                        .to({ alpha: 0 }).wait(250)
                        .to({ alpha: 1 }).wait(250)
                        .to({ alpha: 0 }).wait(250)
                        .to({ alpha: 1 });
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
                    this.container.scaleX = 0.8,
                        this.container.scaleY = 0.8;
                    createjs.Tween.removeTweens(this.highlight);
                    createjs.Tween.get(this.highlight).to({ alpha: 0 }, 400, createjs.Ease.backOut).call(function () { _this.highlight.visible = false; });
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
                    if (hide === void 0) { hide = true; }
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
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
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
                    //todo:  Talvez esse trecho não seja de responsabilidade do ThemeLoader
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
                                var randomsound = Math.ceil(Math.random() * 2);
                                gameui.AudiosManager.playSound("Mecanical Click" + randomsound);
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
                    if (fx === void 0) { fx = true; }
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
                BoardSprite.prototype.lock = function () { this.locked = true; };
                BoardSprite.prototype.unlock = function () { this.locked = false; };
                return BoardSprite;
            })(createjs.Container);
            Views.BoardSprite = BoardSprite;
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
        (function (Views) {
            var Overlay = (function (_super) {
                __extends(Overlay, _super);
                function Overlay() {
                    _super.call(this);
                    this.buildObjects();
                }
                Overlay.prototype.show = function () { this.visible = true; };
                Overlay.prototype.hide = function () { this.visible = false; };
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
                    var menuContainer = new gameui.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.pauseButton = new gameui.TextButton("Pause");
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
                    backgroundShape.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0, 0, defaultWidth, defaultHeight);
                    this.addChild(backgroundShape);
                    var mc = new gameui.MenuContainer();
                    this.addChild(mc);
                    //Add Back Button
                    var menuContainer = new gameui.Grid(1, 1, null, 373, null, true);
                    menuContainer.y = 1676;
                    this.addChild(menuContainer);
                    this.backButton = new gameui.TextButton("Continue");
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
                    this.confirm = new gameui.MenuContainer(null, 100);
                    this.confirm.y = defaultHeight / 1.8;
                    var smc;
                    smc = new gameui.Grid(2, 1, 700, 100, null, true);
                    this.confirm.addLabel("Are you sure?");
                    this.confirm.addObject(smc);
                    smc.regX = 700 / 2;
                    smc.y -= 150;
                    this.confirmMainButton = new gameui.TextButton("Yes", null, "botao2.png");
                    smc.addObject(new gameui.TextButton("No", "", "", "botao2.png", function () {
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
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
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
                    this.overlayMenu = new gameui.UIItem();
                    this.overlayMenu.width = 2 * defaultWidth;
                    this.overlayMenu.height = 0;
                    var pausBt = new gameui.IconTextButton("puzzle/iconepause", "", "", "", "puzzle/btpowerup", function () { _this.pause(); });
                    this.overlayMenu.addChild(pausBt),
                        pausBt.x = 1390;
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
                    var button = new gameui.IconTextButton("puzzle/icon_" + buttonId, "", defaultFontFamilyNormal, "white", "puzzle/btpowerup", function () {
                        var parameter = null;
                        if (_this.parameters)
                            parameter = _this.parameters[buttonId];
                        _this.dispatchEvent(buttonId, parameter);
                        _this.parameters[buttonId] = null;
                    });
                    var coinIndicator = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
                    button.addChild(coinIndicator);
                    coinIndicator.scaleX = coinIndicator.scaleY = 0.7;
                    coinIndicator.x = 100;
                    this.overlayMenu.addChild(button);
                    this.buttons[buttonId] = button;
                    button.x = pos;
                    button.icon.x = -130;
                    return button;
                };
                //// updates buttons labels 
                //public updateItemsQuatity() {
                //    for (var i in this.items)
                //        this.buttons[this.items[i]].updateLabel(FlipPlusGame.itemsData.getItemQuantity(this.items[i]));
                //}
                GamePlayMenu.prototype.updateItemsPrice = function (prices) {
                    for (var item in prices) {
                        if (this.buttons[item])
                            this.buttons[item].updateLabel(prices[item]);
                    }
                };
                GamePlayMenu.prototype.getButtonPosition = function (item) {
                    return this.buttons[item].x;
                };
                // ============== pause menus ============================================
                GamePlayMenu.prototype.createPauseMenu = function () {
                    var _this = this;
                    var pauseMenu = new gameui.UIItem();
                    var playBt = new gameui.IconTextButton("puzzle/iconeplay", "", "", "", "puzzle/btplay1", function () { _this.unpause(); }, "buttonOut");
                    playBt.x = 600;
                    var snd1Bt = new gameui.ImageButton("puzzle/btsom1", function () { _this.dispatchEvent("soundOn"); }, "buttonOut");
                    snd1Bt.x = 160;
                    var snd2Bt = new gameui.ImageButton("puzzle/btsom2", function () { _this.dispatchEvent("soundOff"); }, "buttonOut");
                    snd2Bt.x = 160;
                    var backBt = new gameui.ImageButton("puzzle/btsair", function () { _this.dispatchEvent("back"); }, "buttonOut");
                    backBt.x = 400;
                    var restBt = new gameui.ImageButton("puzzle/btrest", function () { _this.dispatchEvent("restart"); }, "buttonOut");
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
                    this.pauseMenu.width = defaultWidth;
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
            })(gameui.UIItem);
            Views.GamePlayMenu = GamePlayMenu;
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
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
                    this.bg1.x = defaultWidth * 0.01;
                    //this.bg2.x = DefaultWidth * 0.5; this.bg2.x -= this.bg2.getBounds().width / 2;
                    this.bg3.x = defaultWidth * 0.98;
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
                    this.iconepuzzle.x = defaultWidth * 0.01 + 3;
                    rightIconContainer.x = defaultWidth * 0.98;
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
                    this.text1.x = defaultWidth * 0.17;
                    this.text2.x = defaultWidth * 0.5;
                    this.text3.x = defaultWidth * 0.83;
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
                    this.rightIconMC.timeline.addTween(createjs.Tween.get(instance)
                        .to({ scaleX: 1.18, scaleY: 1.18, rotation: 19.2 }, 4).
                        to({ scaleX: 1.16, scaleY: 1.16, rotation: -13.3 }, 8).
                        to({ scaleX: 1.2, scaleY: 1.2, rotation: 19.2 }, 8).
                        to({ scaleX: 1, scaleY: 1, rotation: 0 }, 4).
                        to({ startPosition: 0 }, 35).wait(1));
                };
                StatusArea.prototype.setText1 = function (text) { this.bg1.visible = !(text == "" || text == null); this.text1.text = text; };
                StatusArea.prototype.setText2 = function (text) { ; this.text2.text = text; };
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
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var BonusScreen = (function (_super) {
            __extends(BonusScreen, _super);
            function BonusScreen(itemsArray, bonusId) {
                if (bonusId === void 0) { bonusId = "1"; }
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
                //adds message
                this.message = new FlipPlus.Menu.View.Message();
                this.content.addChild(this.message);
                //adds popup
                this.popup = new FlipPlus.Menu.View.Popup();
                this.content.addChild(this.popup);
                //Add Effects
                this.fx = new FlipPlus.Effects();
                this.content.addChild(this.fx);
                // reorder content
                this.view.addChild(this.content);
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
                titleText.x = defaultWidth / 2;
                titleText.y = 100;
                titleText.textBaseline = "middle";
                this.header.addChild(titleText);
                //adds footer
                var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
                this.footer.addChild(footer);
                footer.y = -291;
            };
            //adds objects to the view <<interface>>
            BonusScreen.prototype.addObjects = function () { };
            //create sa footer
            BonusScreen.prototype.addFooter = function (itemsArray) {
                this.footerContainer = new createjs.Container();
                this.footerContainer.y = -291;
                this.footerTexts = [];
                this.footerMaxs = [];
                //adds Items to the footer
                for (var i = 0; i < itemsArray.length; i++) {
                    var itemId = itemsArray[i];
                    //add icon
                    var itemObj = gameui.AssetsManager.getBitmap("puzzle/icon_" + itemId);
                    itemObj.y = 180;
                    itemObj.x = defaultWidth / itemsArray.length * i + 80;
                    itemObj.name = itemId;
                    itemObj.regX = itemObj.getBounds().width / 2;
                    itemObj.regY = itemObj.getBounds().height / 2;
                    this.footerContainer.addChild(itemObj);
                    //add "max" text
                    var max = gameui.AssetsManager.getBitmap("max");
                    max.y = 50;
                    max.x = defaultWidth / itemsArray.length * i + 100;
                    max.name = itemId + "_max";
                    this.footerMaxs[itemId] = max;
                    max.visible = false;
                    this.footerContainer.addChild(max);
                    //add text
                    var textObj = new createjs.Text("", defaultFontFamilyNormal, "white");
                    textObj.y = 120;
                    textObj.x = defaultWidth / itemsArray.length * i + 190;
                    textObj.name = itemId + "_text";
                    this.footerTexts[itemId] = textObj;
                    this.footerContainer.addChild(textObj);
                }
                this.footer.addChild(this.footerContainer);
            };
            //updates all footer labels 
            BonusScreen.prototype.updateFooterValues = function () {
                //var itemsArray = this.itemsArray;
                //for (var i = 0; i < itemsArray.length; i++) {
                //var itemId = itemsArray[i];
                var itemId = "coin";
                var textObj = this.footerTexts[itemId];
                var qt = FlipPlus.FlipPlusGame.coinsData.getAmount();
                textObj.text = qt.toString();
                ;
                var max = this.footerMaxs[itemId];
                //show max text if item is maximun or more
                if (qt >= FlipPlus.UserData.Coins.max)
                    max.visible = true;
                else
                    max.visible = false;
                //}
            };
            //animate a display object to the menu
            BonusScreen.prototype.animateItemObjectToFooter = function (itemObj, itemId) {
                var _this = this;
                var footerItem = this.footerContainer.getChildByName(itemId);
                if (footerItem && itemObj.parent) {
                    var startPoint = itemObj.localToLocal(0, 0, this.content);
                    var endPoint = this.footerContainer.localToLocal(footerItem.x, footerItem.y, itemObj.parent);
                    // cast effect
                    this.fx.castEffect(startPoint.x + 50, startPoint.y + 50, "Bolinhas", 3);
                    // Animate item
                    createjs.Tween.get(itemObj).
                        to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                        to({ x: endPoint.x, y: endPoint.y }, 700, createjs.Ease.quadInOut).
                        call(function () {
                        _this.updateFooterValues();
                        // cast effect
                        var fxPoint = _this.footerContainer.localToLocal(footerItem.x, footerItem.y, _this.content);
                        _this.fx.castEffect(fxPoint.x, fxPoint.y, "Bolinhas", 2);
                        //play Sound
                        gameui.AudiosManager.playSound("Correct Answer 2");
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
                this.menu = new FlipPlus.Menu.View.ScreenMenu();
                this.menu.addEventListener("menu", function () { FlipPlus.FlipPlusGame.showOptions(); });
                this.menu.addEventListener("back", function () { _this.back(); });
                this.header.addChild(this.menu);
            };
            //updates user Data with new Item
            BonusScreen.prototype.userAquireItem = function (itemId) {
                FlipPlus.FlipPlusGame.coinsData.increaseAmount(1);
                //FlipPlusGame.itemsData.increaseItemQuantity(itemId);
            };
            BonusScreen.prototype.selectRandomItems = function (quantity) {
                this.itemsArray;
                var items = new Array();
                var ia = ["coin"];
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
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var BonusBarrel = (function (_super) {
            __extends(BonusBarrel, _super);
            function BonusBarrel(itemsArray, sufix) {
                if (sufix === void 0) { sufix = "1"; }
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
                if (barrelsCount === void 0) { barrelsCount = 8; }
                if (cols === void 0) { cols = 3; }
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
                    { x: 1047, y: 1347 },
                ];
                //creates a container
                var barrelsContainer = new createjs.Container();
                //adds 3 barrels
                for (var b = 0; b < barrelsCount; b++) {
                    var barrel = new gameui.Button();
                    barrel.addEventListener("click", function (event) { _this.barrelTap(event); });
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
                    barrelsContainer.y = defaultHeight / 2 - 1024;
                    //positionning
                    barrel.set(positions[b]);
                    barrel.regX = 180;
                    barrel.regY = 180;
                    barrel.x += 180;
                    barrel.y += 180;
                    if (Math.random() > 0.5)
                        barrel.scaleX = -1;
                    //animate barrel
                    createjs.Tween.get(barrel, { loop: true })
                        .wait(Math.random() * 2000)
                        .to({ x: barrel.x - 30 }, 2000, createjs.Ease.quadInOut)
                        .wait(Math.random() * 2000)
                        .to({ x: barrel.x }, 2000, createjs.Ease.quadInOut);
                    setTimeout(function (a) {
                        createjs.Tween.get(a, { loop: true })
                            .to({ y: a.y - 15 }, 500, createjs.Ease.quadInOut)
                            .to({ y: a.y }, 500, createjs.Ease.quadInOut);
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
                if (itemsCount === void 0) { itemsCount = 6; }
                var barrelsCount = 8;
                //set barrels clicks
                this.remaningInteraction = 3;
                //avoid errors
                if (itemsCount > barrelsCount)
                    itemsCount = barrelsCount;
                //show all barrels
                for (var ba in this.barrels) {
                    this.barrels[ba].visible = true;
                    this.barrels[ba].mouseEnabled = true;
                }
                //show all contents
                for (var co in this.BarrelsItens)
                    this.BarrelsItens[co].removeAllChildren();
                //clean all items
                this.items = this.randomItensInArray(itemsCount, barrelsCount);
                //adds objects in barrel
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
                if (itemsCount === void 0) { itemsCount = 3; }
                if (arrayLength === void 0) { arrayLength = 9; }
                var finalList = [];
                //randomize itens in barrels
                var indexesLists = [];
                for (var b = 0; b < arrayLength; b++)
                    indexesLists.push(b);
                //for each item
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
                var itemArray = this.itemsArray;
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
                    // play sound
                    gameui.AudiosManager.playSound("Correct Answer");
                    this.userAquireItem(this.items[barrelId]);
                    this.animateItemObjectToFooter(this.BarrelsItens[barrelId], this.items[barrelId]);
                    createjs.Tween.get(this.contentShadow[barrelId]).to({ alpha: 0 }, 600);
                }
                else {
                    this.animateItemObjectIdle(this.BarrelsItens[barrelId]);
                    // play sound
                    gameui.AudiosManager.playSound("wrong");
                }
                //ends bonus game
                this.remaningInteraction--;
                if (this.remaningInteraction <= 0) {
                    this.endBonus();
                }
            };
            //finalizes bonus game
            BonusBarrel.prototype.endBonus = function () {
                var _this = this;
                //locks barrels interactions
                for (var barrel in this.barrels)
                    this.barrels[barrel].mouseEnabled = false;
                //adds objects in barrel
                for (var b = 0; b < this.barrels.length; b++)
                    this.BarrelsItens[b].visible = true;
                //delay and hide others barrels and show other barrels content
                setTimeout(function () {
                    for (var barrel in _this.barrels)
                        createjs.Tween.get(_this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
                }, 1000);
                setTimeout(function () { _super.prototype.endBonus.call(_this); }, 3500);
            };
            return BonusBarrel;
        })(Bonus.BonusScreen);
        Bonus.BonusBarrel = BonusBarrel;
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var Bonus2 = (function (_super) {
            __extends(Bonus2, _super);
            function Bonus2(itemsArray, sufix) {
                if (sufix === void 0) { sufix = "1"; }
                this.cards = [];
                this.matchesFound = 0;
                _super.call(this, itemsArray, "Bonus2");
            }
            Bonus2.prototype.addObjects = function () {
                _super.prototype.addObjects.call(this);
                var cards = this.generateCards(12, 5, ["coin", "coin", "coin", "2coin", "3coin"]);
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
                var _this = this;
                if (card1.name == card2.name && card1 != card2) {
                    var multiplier = 1;
                    if (card1.name == "2coin") {
                        card1.name = card2.name = "coin";
                        multiplier = 2;
                    }
                    if (card1.name == "3coin") {
                        card1.name = card2.name = "coin";
                        multiplier = 3;
                    }
                    for (var i = 0; i < multiplier * 2; i++)
                        this.userAquireItem(card1.name);
                    card1.opened = false;
                    card2.opened = false;
                    //animate itens
                    this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                    setTimeout(function () {
                        _this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);
                    }, 200);
                    // play sound
                    gameui.AudiosManager.playSound("Correct Answer");
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
                    // play sound
                    gameui.AudiosManager.playSound("wrong");
                    if (this.lives == 0) {
                        //if there is no more lives, than end game
                        this.content.mouseEnabled = false;
                        this.message.showtext(stringResources.b2_noMoreChances, 2000, 500);
                        this.message.addEventListener("onclose", function () { _this.endBonus(); });
                        // play sound
                        gameui.AudiosManager.playSound("Wrong Answer");
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
                    this.message.addEventListener("onclose", function () { _this.endBonus(); });
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
                //for each cards
                for (var c in cards) {
                    var card = new Card(cards[c]);
                    card.x = c % cols * width;
                    card.y = Math.floor(c / cols) * height;
                    cardsContainer.addChild(card);
                    this.cards.push(card);
                    //add cards event listener
                    card.addEventListener("click", function (e) { _this.cardClick(e.currentTarget); });
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
                //add Cards Pairs
                for (var p = 0; p < pairs; p++) {
                    var itemIndex = Math.floor(Math.random() * items2.length);
                    cards.push(items2[itemIndex]);
                    cards.push(items2[itemIndex]);
                    items2.splice(itemIndex, 1);
                }
                //Adds empty spaces
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
                var cover = new gameui.ImageButton("Bonus2/bonuscard1");
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
                createjs.Tween.get(cover).to({ rotation: 90, y: 1000, alpha: 0 }, 500, createjs.Ease.sineIn).call(function () { cover.visible = false; });
                this.mouseEnabled = false;
                this.opened = true;
            };
            Card.prototype.shakeObj = function () {
                var item = this.getChildByName("item");
                createjs.Tween.removeTweens(item);
                createjs.Tween.get(item)
                    .to({ x: 184 + -25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut)
                    .to({ x: 184 + +25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut)
                    .to({ x: 184 + -25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut)
                    .to({ x: 184 + +25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut)
                    .to({ x: 184 + +0, scaleX: 1.0, scaleY: 1.0 }, 150, createjs.Ease.quadInOut);
            };
            return Card;
        })(createjs.Container);
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var Bonus3 = (function (_super) {
            __extends(Bonus3, _super);
            function Bonus3(itemsArray, sufix) {
                if (sufix === void 0) { sufix = "1"; }
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
                this.mainClip.addEventListener("ready", function () { _this.mainClip.stop(); });
                this.mainClip.addEventListener("WrongEnd", function () { _this.mainClip.stop(); });
                this.mainClip.addEventListener("End", function () {
                    _this.mainClip.stop();
                    _this.message.showtext(stringResources.b3_finish, 2000, 1000);
                    _this.message.addEventListener("onclose", function () { _this.endBonus(); });
                });
                //add keys 
                this.keys = new Array();
                this.keys.push(this.mainClip["key1"]);
                this.keys.push(this.mainClip["key2"]);
                this.keys.push(this.mainClip["key3"]);
                this.keys[0].addEventListener("click", function () { _this.pickKey(0); });
                this.keys[1].addEventListener("click", function () { _this.pickKey(1); });
                this.keys[2].addEventListener("click", function () { _this.pickKey(2); });
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
                // play sound
                gameui.AudiosManager.playSound("button");
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
                        // play sound
                        gameui.AudiosManager.playSound("Correct Answer", true, 300);
                    }
                    else {
                        // play sound
                        gameui.AudiosManager.playSound("wrong", true, 300);
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
                    this.message.addEventListener("onclose", function () { _this.endBonus(); });
                    // play sound
                    gameui.AudiosManager.playSound("Wrong Answer");
                }
            };
            //-----------------------------------------------
            //give items to the user
            Bonus3.prototype.getItems = function (chestId) {
                var _this = this;
                this.itemsContainer.removeAllChildren();
                var items = this.selectRandomItems(4);
                var itemsDo = [];
                //create items objects
                for (var i in items) {
                    FlipPlus.FlipPlusGame.coinsData.increaseAmount(1);
                    var item = this.createItem(items[i]);
                    item.set({ x: defaultWidth / 2, y: defaultHeight / 2 - 100, alpha: 0 });
                    createjs.Tween.get(item).wait(500 + i * 300)
                        .to({ alpha: 1, x: defaultWidth / 2.5 + (300 * (i - 1)), y: defaultHeight / 2 - 600 }, 500, createjs.Ease.quadInOut)
                        .call(function (itemDo) { _this.animateItemObjectToFooter(itemDo, itemDo.name); }, [item]);
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
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var BonusManager = (function () {
            function BonusManager() {
                this.bonusTimers = [];
            }
            //set time for bonus
            BonusManager.prototype.setBonustime = function (bonusId, time) {
                if (bonusId === void 0) { bonusId = "bonus"; }
                if (!time)
                    time = Date.now();
                this.bonusTimers[bonusId] = time;
            };
            //get seconds left to the next release
            BonusManager.prototype.getBonusSecondsLeft = function (bonusId) {
                if (bonusId === void 0) { bonusId = "bonus"; }
                var time = this.bonusTimers[bonusId];
                if (time)
                    return Math.floor(time - Date.now() / 1000);
                else
                    return 0;
            };
            return BonusManager;
        })();
        Bonus.BonusManager = BonusManager;
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var GenericMenu = (function (_super) {
            __extends(GenericMenu, _super);
            function GenericMenu(title, previousScreen, color) {
                _super.call(this);
                if (!this.originX)
                    this.originX = defaultWidth / 2;
                if (!this.originY)
                    this.originY = defaultHeight / 2;
                this.content.set({ x: defaultWidth / 2, y: defaultHeight / 2 });
                this.buildHeader(title, previousScreen, color);
                this.animateIn(this.content);
            }
            GenericMenu.prototype.buildHeader = function (title, previousScreen, color) {
                var _this = this;
                // add bg
                this.background.addChild(gameui.AssetsManager.getBitmap("mybotsbg").set({ y: -339, scaleY: 1.3310546875 }));
                // add bg menu
                this.content.addChild(gameui.AssetsManager.getBitmap("menu/menubg").set({ regX: 1536 / 2, regY: 1840 / 2 }));
                this.content.addChild(gameui.AssetsManager.getBitmap(color || "menu/titlePurple").set({ regX: 1536 / 2, regY: 1840 / 2 }));
                //Add Back Button
                var backButton = new gameui.IconButton("menu/x", "", function () {
                    FlipPlus.FlipPlusGame.gameScreen.switchScreen(previousScreen);
                    _this.animateOut(_this.content);
                });
                backButton.set({ x: 550, y: -690, hitPadding: 100 });
                backButton.createHitArea();
                this.content.addChild(backButton);
                var t = new gameui.Label(title, defaultFontFamilyHighlight, "white").set({ x: -500, y: -690, textAlign: "left" });
                t;
                this.content.addChild(t);
            };
            GenericMenu.prototype.animateIn = function (menu) {
                createjs.Tween.get(menu).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 0 }).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 1 }, 400, createjs.Ease.quadOut);
            };
            GenericMenu.prototype.animateOut = function (menu) {
                createjs.Tween.get(menu).to({ x: defaultWidth / 2, y: defaultHeight / 2, scaleY: 1, scaleX: 1, alpha: 5 }).to({ x: this.originX, y: this.originY, scaleY: 0, scaleX: 0, alpha: 1 }, 200, createjs.Ease.quadIn);
            };
            return GenericMenu;
        })(gameui.ScreenState);
        Menu.GenericMenu = GenericMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var WorkshopMenu = (function (_super) {
            __extends(WorkshopMenu, _super);
            // Constructor
            function WorkshopMenu() {
                _super.call(this);
                //just to know when a user finished a project
                this.projectPreviousState = {};
                //inertia fx
                this.offset = 0;
                this.lastx = 0;
                this.addObjects();
                this.pagesSwipe = new Menu.View.PagesSwiper(this.projectsContainer, this.projectViews, defaultWidth, 200, 1500);
                this.createPaginationButtons(this.projectsContainer);
            }
            //--------------------- Initialization ---------------------
            WorkshopMenu.prototype.addObjects = function () {
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
            WorkshopMenu.prototype.addMenu = function () {
                var _this = this;
                this.menu = new Menu.View.ScreenMenu();
                //TODO fazer camada intermediaria
                //TODO o options sempre volta pro menu principal. O_o
                this.menu.addEventListener("menu", function () { FlipPlus.FlipPlusGame.showOptions(); });
                this.menu.addEventListener("back", function () { _this.back(); });
                this.header.addChild(this.menu);
            };
            //adds all projects in swipe view
            WorkshopMenu.prototype.addProjects = function () {
                var _this = this;
                //pega projetos
                var projects = FlipPlus.FlipPlusGame.projectManager.getUnlockedProjects();
                //add every project
                for (var p = this.projectViews.length; p < projects.length; p++) {
                    var projectView = new Menu.View.ProjectWorkshopView(projects[p]);
                    this.projectViews.push(projectView);
                    projectView.activate();
                    projectView.x = defaultWidth * p;
                    projectView.addEventListener("levelClick", function (e) { _this.openLevel(e.level, e.parameters); });
                    this.projectsContainer.addChild(projectView);
                }
            };
            WorkshopMenu.prototype.openLevel = function (level, parameters) {
                //cancel click in case of drag
                if (this.pagesSwipe.cancelClick)
                    return;
                var level = level;
                var parameters = parameters;
                if (level != null)
                    if (level.userdata.unlocked)
                        FlipPlus.FlipPlusGame.showLevel(level, parameters);
            };
            WorkshopMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showProjectsMenu();
            };
            // ----------------------- pagination -------------------------------------------------------
            WorkshopMenu.prototype.createPaginationButtons = function (pagesContainer) {
                var _this = this;
                //create leftButton
                var lb = new gameui.ImageButton("projects/btpage", function () { _this.pagesSwipe.gotoPreviousPage(); }, "buttonOut");
                lb.y = 1050;
                lb.x = defaultWidth * 0.1;
                this.content.addChild(lb);
                //create right button
                var rb = new gameui.ImageButton("projects/btpage", function () { _this.pagesSwipe.gotoNextPage(); });
                rb.y = 1050;
                rb.x = defaultWidth * 0.9;
                rb.scaleX = -1;
                this.content.addChild(rb);
            };
            //--Behaviour-----------------------------------------------------------
            WorkshopMenu.prototype.redim = function (headerY, footerY, width, height) {
                _super.prototype.redim.call(this, headerY, footerY, width, height);
                for (var pv in this.projectViews)
                    this.projectViews[pv].redim(headerY, footerY);
            };
            WorkshopMenu.prototype.desactivate = function (parameters) {
                _super.prototype.desactivate.call(this, parameters);
                this.factorySound.stop();
                delete this.factorySound;
            };
            WorkshopMenu.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this);
                // play music
                gameui.AudiosManager.playMusic("Music Dot Robot", 0.5);
                this.factorySound = gameui.AudiosManager.playSound("Factory Ambience");
                this.factorySound.setVolume(0.4);
                //update enabled Projects
                this.addProjects();
                //update all projects views
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
                                FlipPlus.FlipPlusGame.completeProject(project);
                            }, 3500);
                        }
                    }
                    //store last state
                    this.projectPreviousState[project.name] = project.UserData.complete;
                }
            };
            return WorkshopMenu;
        })(gameui.ScreenState);
        Menu.WorkshopMenu = WorkshopMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
// Module
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        // Class
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                var _this = this;
                _super.call(this);
                assetscale = 0.5;
                if (window.innerWidth <= 1024)
                    assetscale = 0.5;
                if (window.innerWidth <= 420)
                    assetscale = 0.25;
                if (levelCreatorMode) {
                    assetscale = 1;
                }
                var imagePath = "assets/images_" + assetscale + "x/";
                var audioPath = "assets/sound/";
                //load audio
                if (!levelCreatorMode && typeof WPAudioManager == 'undefined') {
                    createjs.Sound.alternateExtensions = ["mp3"];
                    createjs.Sound.registerSounds(audioManifest, audioPath);
                }
                gameui.AssetsManager.loadAssets(imageManifest, imagePath, spriteSheets);
                gameui.Button.setDefaultSoundId("button");
                var text = new createjs.Text("", "600 90px Arial", "#FFF");
                text.x = defaultWidth / 2;
                text.y = defaultHeight / 2;
                text.textAlign = "center";
                this.content.addChild(text);
                //add update % functtion
                gameui.AssetsManager.onProgress = function (progress) {
                    text.text = stringResources.ld + "\n" + Math.floor(progress * 100).toString() + "%";
                };
                //creates load complete action
                gameui.AssetsManager.onComplete = function () {
                    if (_this.loaded)
                        _this.loaded();
                };
            }
            return Loading;
        })(gameui.ScreenState);
        Menu.Loading = Loading;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
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
                // play music
                gameui.AudiosManager.playMusic("Music Dot Robot");
                //Verifies if it is the first time playing
                if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro")) {
                    this.intro.visible = true;
                    this.myBots.visible = false;
                    this.playBt.visible = false;
                    this.intro.playPart1();
                }
                else if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro2")) {
                    FlipPlus.FlipPlusGame.storyData.setStoryPlayed("intro2");
                    this.intro.visible = true;
                    this.myBots.visible = false;
                    this.playBt.visible = false;
                    this.intro.playPart2();
                }
                else {
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
                this.menu.addEventListener("back", function () { _this.back(); });
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
                var playBt = new gameui.TextButton(stringResources["mm_play"], defaultFontFamilyHighlight, highlightFontColor, "", function () {
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
            //------------Robots Behaviour ---------------------------------
            MainMenu.prototype.openRobot = function (robot) {
                this.myBots.openRobot(robot);
            };
            MainMenu.prototype.robotClick = function (robot) {
                var t = FlipPlus.FlipPlusGame.timersData.getTimer(robot);
                this.terminal.setText(Math.floor(t / 1000 / 60) + " minutes");
            };
            MainMenu.prototype.showNewBot = function (botId) {
                this.myBots.castNewEffect(botId);
                this.terminal.setText("Novo Amigo");
            };
            return MainMenu;
        })(gameui.ScreenState);
        Menu.MainMenu = MainMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var OptionsMenu = (function (_super) {
            __extends(OptionsMenu, _super);
            function OptionsMenu() {
                this.originY = 1;
                this.originX = defaultWidth;
                _super.call(this, stringResources.menus.menu, FlipPlus.FlipPlusGame.mainScreen);
                this.buildObjects();
                this.updateVolumeButtons();
            }
            OptionsMenu.prototype.buildObjects = function () {
                var _this = this;
                // add menu buttons
                var p0 = -350;
                var p = 0;
                var s = 330;
                this.btMusOn = new gameui.IconButton("menu/icmusic", "menu/btmusicon", function () { gameui.AudiosManager.setMusicVolume(0); _this.updateVolumeButtons(); }).set({ x: -200, y: p0 });
                this.btMusOf = new gameui.IconButton("menu/icmusic", "menu/btmusicoff", function () { gameui.AudiosManager.setMusicVolume(1); _this.updateVolumeButtons(); }).set({ x: -200, y: p0 });
                this.btSndOn = new gameui.IconButton("menu/icsound", "menu/btmusicon", function () { gameui.AudiosManager.setSoundVolume(0); _this.updateVolumeButtons(); }).set({ x: 200, y: p0 });
                this.btSndOf = new gameui.IconButton("menu/icsound", "menu/btmusicoff", function () { gameui.AudiosManager.setSoundVolume(1); _this.updateVolumeButtons(); }).set({ x: 200, y: p0 });
                this.content.addChild(this.btMusOn);
                this.content.addChild(this.btMusOf);
                this.content.addChild(this.btSndOn);
                this.content.addChild(this.btSndOf);
                p++;
                this.content.addChild(new gameui.TextButton("Help", defaultFontFamilyHighlight, blueColor, "menu/btmenu", function () {
                    FlipPlus.FlipPlusGame.showSpecialOffer(_this);
                }).set({ x: 0, y: p0 + p * s }));
                p++;
                this.content.addChild(new gameui.TextButton("Store", defaultFontFamilyHighlight, blueColor, "menu/btmenu", function () {
                    FlipPlus.FlipPlusGame.showShopMenu(_this);
                }).set({ x: 0, y: p0 + p * s }));
                p++;
                //add Other Buttons
                this.content.addChild(new gameui.TextButton(stringResources.op_erase, defaultFontFamilySmall, blueColor, "", function () {
                    FlipPlus.FlipPlusGame.projectData.clearAllData();
                    window.location.reload();
                }).set({ y: p0 + p * s }));
            };
            OptionsMenu.prototype.updateVolumeButtons = function () {
                this.btMusOn.visible = gameui.AudiosManager.getMusicVolume() == 1;
                this.btMusOf.visible = gameui.AudiosManager.getMusicVolume() == 0;
                this.btSndOn.visible = gameui.AudiosManager.getSoundVolume() == 1;
                this.btSndOf.visible = gameui.AudiosManager.getSoundVolume() == 0;
            };
            return OptionsMenu;
        })(Menu.GenericMenu);
        Menu.OptionsMenu = OptionsMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
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
                this.pagesSwipe = new Menu.View.PagesSwiper(this.projectsGrid, this.pages, defaultWidth);
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
                this.menu.addEventListener("menu", function () { FlipPlus.FlipPlusGame.showOptions(); });
                this.menu.addEventListener("back", function () { _this.back(); });
                this.header.addChild(this.menu);
                //create starsIndicator
                this.starsIndicator = new Menu.View.StarsIndicator();
                this.header.addChild(this.starsIndicator);
                this.starsIndicator.x = defaultWidth;
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
                this.projectsGrid.x = (defaultWidth - xspacing * cols) / 2 + xspacing / 2;
                this.projectsGrid.y = 600;
                // create Pages
                this.pages = [];
                var currentPage;
                // Create projectItens
                var projects = FlipPlus.FlipPlusGame.projectManager.getAllProjects();
                //creates all itens
                for (var i = 0; i < projects.length; i++) {
                    //create current page
                    if (i % (cols * rows) == 0) {
                        currentPage = new Menu.View.Page();
                        var hit = new createjs.Container;
                        hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, defaultWidth, defaultHeight)));
                        currentPage.addChild(hit);
                        this.projectsGrid.addChild(currentPage);
                        this.pages.push(currentPage);
                    }
                    var pview = new Menu.View.ProjectItem(projects[i]);
                    //add click event to the item
                    pview.addEventListener("click", function (e) { _this.projectItemClick(e); });
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
                        }
                        else {
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
                var lb = new gameui.ImageButton("projects/btpage", function () { _this.pagesSwipe.gotoPreviousPage(); }, "buttonOut");
                lb.y = -100;
                lb.x = defaultWidth * 0.1;
                this.footer.addChild(lb);
                //create right button
                var rb = new gameui.ImageButton("projects/btpage", function () { _this.pagesSwipe.gotoNextPage(); });
                rb.y = -100;
                rb.x = defaultWidth * 0.9;
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
                // play music
                gameui.AudiosManager.playMusic("Music Dot Robot");
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
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var SoundMenu = (function (_super) {
            __extends(SoundMenu, _super);
            // Constructor
            function SoundMenu() {
                _super.call(this);
                this.createObjects();
            }
            SoundMenu.prototype.createObjects = function () {
                var sfxon = new gameui.IconTextButton("botaofxon.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setSoundfX(false);
                    sfxon.visible = false;
                    sfxoff.visible = true;
                });
                var sfxoff = new gameui.IconTextButton("botaofxoff.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setSoundfX(true);
                    sfxoff.visible = false;
                    sfxon.visible = true;
                });
                var muson = new gameui.IconTextButton("botaomusicaon.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setMusic(false);
                    muson.visible = false;
                    musoff.visible = true;
                });
                var musoff = new gameui.IconTextButton("botaomusicaoff.png", "", "", "", "botaosom.png", function () {
                    FlipPlus.FlipPlusGame.settings.setMusic(true);
                    musoff.visible = false;
                    muson.visible = true;
                });
                musoff.visible = !FlipPlus.FlipPlusGame.settings.getMusic();
                muson.visible = FlipPlus.FlipPlusGame.settings.getMusic();
                sfxoff.visible = !FlipPlus.FlipPlusGame.settings.getSoundfx();
                sfxon.visible = FlipPlus.FlipPlusGame.settings.getSoundfx();
                //Add Sound Buttons
                var soundMenuOn = new gameui.Grid(2, 1, 600, 372, null, true);
                var soundMenuOff = new gameui.Grid(2, 1, 600, 372, null, true);
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
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            var ScreenMenu = (function (_super) {
                __extends(ScreenMenu, _super);
                function ScreenMenu(backVisible, starsVisible) {
                    if (backVisible === void 0) { backVisible = true; }
                    if (starsVisible === void 0) { starsVisible = false; }
                    _super.call(this);
                    this.createObjects(backVisible, starsVisible);
                }
                ScreenMenu.prototype.createObjects = function (backVisible, starsVisible) {
                    var _this = this;
                    if (backVisible === void 0) { backVisible = true; }
                    if (starsVisible === void 0) { starsVisible = false; }
                    //adds menu button
                    var menuBt = new gameui.ImageButton("MenuBt", function () { _this.dispatchEvent("menu", menuBt); });
                    menuBt.y = 90;
                    menuBt.x = defaultWidth - 130;
                    this.addChild(menuBt);
                    //add a bacl buttton
                    var backBt = new gameui.ImageButton("BackBt", function () { _this.dispatchEvent("back", menuBt); }, "buttonOut");
                    backBt.y = 90;
                    backBt.x = 130;
                    backBt.visible = backVisible;
                    this.addChild(backBt);
                };
                return ScreenMenu;
            })(gameui.UIItem);
            View.ScreenMenu = ScreenMenu;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                    //creates a icon tiles
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
                            var tg = (e.currentTarget);
                            var level = _this.challangesMap[tg.name];
                            var parameters = {
                                x: tg.x + tg.parent.x,
                                y: tg.y + tg.parent.y,
                                scaleX: 0.3,
                                scaleY: 0.3
                            };
                            _this.dispatchEvent({ type: "levelClick", level: level, parameters: parameters });
                        });
                    }
                };
                LevelGrid.prototype.updateUserData = function () {
                    //get User data from storage
                    for (var i = 0; i < this.thumbs.length; i++) {
                        var level = this.challangesMap[this.thumbs[i].name];
                        var chapter = this.currentChapter;
                        this.thumbs[i].updateUserData();
                    }
                };
                return LevelGrid;
            })(gameui.Grid);
            View.LevelGrid = LevelGrid;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                    //
                    if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                        assetSufix = "1";
                        color1 = "rgba(255,255,255,0.5)";
                        color2 = "rgba(0,0,0,0.3)";
                        this.setSound(null);
                    }
                    // locked
                    if (!level.userdata.unlocked || level.userdata.skip || level.userdata.item) {
                        assetSufix = "2";
                        color1 = "rgba(0,0,0,0.5)";
                        color2 = "rgba(0,0,0,0.3)";
                        this.setSound("buttonOff");
                    }
                    // next playable
                    if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                        assetSufix = "3";
                        color1 = "rgba(255,255,255,0.9)";
                        color2 = "rgba(0,0,0,0.3)";
                        this.setSound(null);
                        //create bounce effect if is active
                        thumbContainer.set({ scaleX: 1, scaleY: 1 });
                        createjs.Tween.get(thumbContainer, { loop: true })
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut);
                    }
                    //Adds Thumb Backgroud
                    thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));
                    //Adds Thumb Blocks
                    thumbContainer.addChild(this.createBlocks(level, color1, color2, 1, 4));
                    //Adds thumb tags
                    thumbContainer.addChild(this.createTags(level, assetName, assetSufix));
                    //Adds level modificator
                    thumbContainer.addChild(this.createLevelModificator(level));
                    //cache thumb
                    //thumbContainer.cache(-99, -102, 198, 204);
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
                // add items modification
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
                LevelThumb.prototype.createBlocks = function (level, color1, color2, sizeStart, sizeEnd) {
                    var col0 = sizeStart ? sizeStart : 0;
                    var colf = sizeEnd ? sizeEnd : level.width;
                    var row0 = sizeStart ? sizeStart : 0;
                    var rowf = sizeEnd ? sizeEnd : level.height;
                    var spacing = 45;
                    var size = 40;
                    var totalSize = level.width * level.height;
                    var blocks = [];
                    //clean blocks
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
                    for (var row = row0; row < rowf; row++) {
                        for (var col = col0; col < colf; col++) {
                            var color;
                            if (blocks[row * level.width + col])
                                color = color1;
                            else
                                color = color2;
                            s.graphics.beginFill(color).drawRect(spacing * (col - col0), spacing * (row - row0), size, size);
                        }
                    }
                    // scale for fit on square
                    s.scaleX = s.scaleY = Math.min(3 / (colf - col0), 3 / (rowf - row0));
                    // centralize thumg
                    s.regX = spacing * (colf - col0) / 2;
                    s.regY = spacing * (rowf - row0) / 2;
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
            })(gameui.Button);
            View.LevelThumb = LevelThumb;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                    if (tween === void 0) { tween = true; }
                    //this.partsTextField.text = newQuantity.toString();  
                };
                //updates Parts indicator amount
                StarsIndicator.prototype.updateStarsAmount = function (newQuantity, tween) {
                    if (tween === void 0) { tween = true; }
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
            })(gameui.Button);
            View.StarsIndicator = StarsIndicator;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var CoinsIndicator = (function (_super) {
                __extends(CoinsIndicator, _super);
                // Constructor
                function CoinsIndicator() {
                    _super.call(this);
                    this.buildView();
                    //Add Effects
                    this.fx = new FlipPlus.Effects();
                    this.addChild(this.fx);
                }
                //updates Parts indicator amount
                CoinsIndicator.prototype.updateCoinsAmmount = function (newQuantity, tween) {
                    if (tween === void 0) { tween = true; }
                    this.coinsTextField.text = newQuantity.toString();
                };
                CoinsIndicator.prototype.createCoinEffect = function (x, y, coins) {
                    var _this = this;
                    var interval = 1000 / coins;
                    for (var c = 0; c <= coins; c++) {
                        var coin = this.addCoinIcon();
                        createjs.Tween.get(coin).wait(interval / 3 * (c - 1)).to({ x: x, y: y }, 500, createjs.Ease.quadInOut).call(function (c) {
                            _this.removeChild(c.target);
                            // Play Sound
                            gameui.AudiosManager.playSound("Correct Answer 2", true);
                            // cast effect
                            _this.fx.castEffect(x, y, "Bolinhas", 2);
                        });
                    }
                };
                CoinsIndicator.prototype.addCoinIcon = function () {
                    var icon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
                    icon.scaleX = icon.scaleY = 0.9;
                    icon.x = -120;
                    icon.y = +35;
                    this.addChild(icon);
                    return icon;
                };
                //add objects to View
                CoinsIndicator.prototype.buildView = function () {
                    // add Background
                    var bg = gameui.AssetsManager.getBitmap("partshud");
                    bg.regX = 190;
                    this.addChild(bg);
                    var icon = this.addCoinIcon();
                    this.coinsTextField = new createjs.Text("0", defaultFontFamilyNormal, defaultFontColor);
                    this.coinsTextField.x = 50;
                    this.coinsTextField.y = 30;
                    this.addChild(this.coinsTextField);
                };
                return CoinsIndicator;
            })(createjs.Container);
            View.CoinsIndicator = CoinsIndicator;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                        robotName.y = 0;
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
                    }
                    else {
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
                        createjs.Tween.get(this, { loop: true })
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut);
                    }
                };
                return ProjectItem;
            })(gameui.Button);
            View.ProjectItem = ProjectItem;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            var ProjectStarsIndicator = (function (_super) {
                __extends(ProjectStarsIndicator, _super);
                function ProjectStarsIndicator(project) {
                    _super.call(this);
                    this.projectsThemes = ["green", "purple", "yellow"];
                    this.fx = new FlipPlus.Effects;
                    this.project = project;
                    this.createObjects();
                    this.fx = new FlipPlus.Effects();
                    this.addChild(this.fx);
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
                    var _this = this;
                    if (anim === void 0) { anim = true; }
                    var project = this.project;
                    ////hide all stars
                    //for (var i = 0; i < this.projectsTypes.length; i++)
                    //    this.stars[i].visible = false;
                    var starsInfo = new Object();
                    //shows only existent levels
                    for (var i = 0; i < this.projectsThemes.length; i++)
                        for (var l = 0; l < project.levels.length; l++)
                            if (this.projectsThemes[i] == project.levels[l].theme)
                                starsInfo[i] = true;
                    //hide uncompleted.
                    for (var i = 0; i < this.projectsThemes.length; i++)
                        for (var l = 0; l < project.levels.length; l++)
                            if (this.projectsThemes[i] == project.levels[l].theme)
                                if (!project.levels[l].userdata.solved || project.levels[l].userdata.item)
                                    starsInfo[i] = false;
                    //update stars visibility
                    var an = 0;
                    for (var i = 0; i < 3; i++) {
                        if (this.stars[i].visible != starsInfo[i]) {
                            this.stars[i].visible = starsInfo[i];
                            //animate
                            if (anim && starsInfo[i]) {
                                an = i;
                                this.stars[i].set({ scaleX: 4, scaleY: 4, rotation: -45, alpha: 0 });
                                createjs.Tween.get(this.stars[i]).wait(300).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 1500, createjs.Ease.bounceOut);
                                // play sound and cast an effect
                                setTimeout(function () {
                                    _this.fx.castEffect(_this.stars[an].x + 100, _this.stars[an].y + 100, "Bolinhas", 4);
                                    gameui.AudiosManager.playSound("Correct Answer");
                                }, 300 + 500);
                                break;
                            }
                        }
                    }
                };
                return ProjectStarsIndicator;
            })(createjs.Container);
            View.ProjectStarsIndicator = ProjectStarsIndicator;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Projects;
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
    })(Projects = FlipPlus.Projects || (FlipPlus.Projects = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Projects;
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
    })(Projects = FlipPlus.Projects || (FlipPlus.Projects = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Projects;
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
            //undo a level
            ProjectManager.prototype.undoLevel = function (level) {
                level.userdata.solved = false;
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
            ProjectManager.prototype.getCurrentProject = function () { return this.currentProject; };
            //set current project
            ProjectManager.prototype.setCurrentProject = function (project) { this.currentProject = project; };
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
            //get all finished Projects
            ProjectManager.prototype.getFinihedProjects = function () {
                //return array with avaliable projects
                var finishedProjects = [];
                //verifies all projects and add the non complete to array, till reach max number
                for (var i = 0; i < this.projects.length; i++)
                    if (this.projects[i].UserData.complete)
                        finishedProjects.push(this.projects[i]);
                return finishedProjects;
            };
            //get all unlockedProjects
            ProjectManager.prototype.getUnlockedProjects = function () {
                //return array with avaliable projects
                var unlockedProjects = [];
                //verifies all projects and add the non complete to array, till reach max number
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
                //count solved levels
                for (var l = 0; l < project.levels.length; l++)
                    if (project.levels[l].userdata.solved ||
                        project.levels[l].userdata.skip ||
                        project.levels[l].userdata.item)
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
    })(Projects = FlipPlus.Projects || (FlipPlus.Projects = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var Popup = (function (_super) {
                __extends(Popup, _super);
                // class contructor
                function Popup(disableInput) {
                    var _this = this;
                    if (disableInput === void 0) { disableInput = false; }
                    _super.call(this);
                    this.drawObject();
                    //centralize the popup on screen
                    this.width = defaultWidth;
                    this.height = defaultHeight;
                    this.x = defaultWidth / 2;
                    this.y = defaultHeight / 2;
                    this.centralize();
                    if (!disableInput) {
                        //set Hit Area
                        var hit = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, defaultWidth, defaultHeight));
                        this.hitArea = hit;
                        //hide popup
                        this.visible = false;
                        //add callback
                        this.addEventListener("click", function () {
                            _this.closePopUp();
                            clearTimeout(_this.closeinterval);
                        });
                    }
                }
                // public method to invoke the popup
                Popup.prototype.showtext = function (title, text, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
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
                    titleShadow.x = defaultWidth / 2;
                    this.addChild(titleShadow);
                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = defaultWidth / 2;
                    this.addChild(titleDO);
                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, defaultFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = b + 300;
                    this.addsClickIndicator();
                };
                Popup.prototype.showTimeAttack = function (title, text, time, boards, text2, text3, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
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
                    titleShadow.x = defaultWidth / 2;
                    this.addChild(titleShadow);
                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = defaultWidth / 2;
                    this.addChild(titleDO);
                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //create a text
                    var textDO1 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO1.textAlign = "center";
                    textDO1.textBaseline = "middle";
                    textDO1.x = defaultWidth / 2;
                    this.addChild(textDO1);
                    //create a text
                    var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO2.textAlign = "center";
                    textDO2.textBaseline = "middle";
                    textDO2.x = defaultWidth / 2;
                    this.addChild(textDO2);
                    //create a text
                    var timeDO = new createjs.Text("", defaultNumberHighlight, "white");
                    timeDO.textAlign = "center";
                    timeDO.textBaseline = "middle";
                    timeDO.x = defaultWidth / 2;
                    this.addChild(timeDO);
                    //create a text
                    var boardsDO = new createjs.Text("", defaultNumberHighlight, "white");
                    boardsDO.textAlign = "center";
                    boardsDO.textBaseline = "middle";
                    boardsDO.x = defaultWidth / 2;
                    this.addChild(boardsDO);
                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;
                    textDO1.text = text2;
                    textDO2.text = text3;
                    timeDO.text = time;
                    boardsDO.text = boards;
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = 300 + b;
                    textDO1.y = 450 + b;
                    textDO2.y = 600 + b;
                    timeDO.y = 450 + b;
                    boardsDO.y = 450 + b;
                    timeDO.x = 500;
                    boardsDO.x = defaultWidth - 500;
                    this.addsClickIndicator();
                };
                Popup.prototype.showflips = function (title, text, flips, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
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
                    titleShadow.x = defaultWidth / 2;
                    this.addChild(titleShadow);
                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = defaultWidth / 2;
                    this.addChild(titleDO);
                    //create a text
                    var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //create a text
                    var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
                    textDO2.textAlign = "center";
                    textDO2.textBaseline = "middle";
                    textDO2.x = defaultWidth / 2;
                    this.addChild(textDO2);
                    //create a text
                    var flipsDO = new createjs.Text("", defaultNumberHighlight, "white");
                    flipsDO.textAlign = "center";
                    flipsDO.textBaseline = "middle";
                    flipsDO.x = defaultWidth / 2;
                    this.addChild(flipsDO);
                    //updates title and text values
                    titleShadow.text = titleDO.text = title.toUpperCase();
                    textDO.text = text;
                    textDO2.text = "";
                    flipsDO.text = flips;
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    titleShadow.y = titleDO.y + 15;
                    textDO.y = 300 + b;
                    textDO2.y = 600 + b;
                    flipsDO.y = 450 + b;
                    this.addsClickIndicator();
                };
                // other stuff
                Popup.prototype.showsPopup = function (timeout, delay) {
                    var _this = this;
                    //shows the popus
                    this.closeinterval = setTimeout(function () {
                        gameui.AudiosManager.playSound("Open");
                        _this.fadeIn(1, 0.5);
                    }, delay);
                    ;
                    //create a interval for closing the popopu
                    if (timeout > 0)
                        this.closeinterval = setTimeout(function () {
                            _this.closePopUp();
                        }, timeout + delay);
                    //dispatch a event for parent objects
                    this.dispatchEvent("onshow");
                };
                Popup.prototype.addsClickIndicator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getSprite("touch");
                    this.addChild(ind);
                    ind.x = 1350;
                    ind.y = 1100;
                };
                // method for close popup 
                Popup.prototype.closePopUp = function () {
                    //hide the popup{
                    this.fadeOut(1, 0.5);
                    //dispatch a event for parent objects
                    this.dispatchEvent("onclose");
                };
                // desenha os objetos do popup
                Popup.prototype.drawObject = function () {
                };
                return Popup;
            })(gameui.UIItem);
            View.Popup = Popup;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Robots;
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
                FlipPlus.FlipPlusGame.projectManager.undoLevel(levelsData[1].levels[9]);
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
            };
            //adds a user feedback for click action
            MyBots.prototype.initializeUserFeedback = function () {
                var _this = this;
                FlipPlus.FlipPlusGame.gameScreen.stage.update();
                for (var c = 0; c < this.myBots.getNumChildren(); c++) {
                    var robot = this.myBots.getChildAt(c);
                    ;
                    robot.addEventListener("click", function (e) { _this.userfeedback(e); });
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
                //set idle to the finished projects
                for (var r = 0; r < projects.length; r++)
                    this.showRobot(projects[r].name);
            };
            //hide All Robots from Screen
            MyBots.prototype.hideAllRobots = function () {
                for (var c = 0; c < this.myBots.getNumChildren(); c++)
                    this.myBots.getChildAt(c).visible = false;
                //
                // this.showRobot("main");
            };
            //show a robot on screen by name
            MyBots.prototype.showRobot = function (botId) {
                var robotMC = this.myBots[botId];
                if (robotMC != null) {
                    robotMC.visible = true;
                    this.castNewEffect(robotMC);
                }
            };
            //play robot opening animation
            MyBots.prototype.openRobot = function (botId) {
                var robotMC = this.myBots[botId];
                //if (robotMC != null)
                //    robotMC.gotoAndPlay("opening");
            };
            //play robot alert animation
            MyBots.prototype.alertRobot = function (botId) {
                var robotMC = this.myBots[botId];
                //if (robotMC != null)
                //    robotMC.gotoAndPlay("alert");
            };
            // show a new glare into the bot
            MyBots.prototype.castNewEffect = function (botId) {
                var _this = this;
                var robotMC = this.myBots[botId];
                if (robotMC != null) {
                    var bgnewbot1 = gameui.AssetsManager.getBitmap("bgnewbot");
                    bgnewbot1.regX = bgnewbot1.image.width / 2;
                    bgnewbot1.regY = bgnewbot1.image.height / 2;
                    this.addChild(bgnewbot1);
                    bgnewbot1.visible = false;
                    bgnewbot1.x = robotMC.x;
                    bgnewbot1.y = robotMC.y;
                    bgnewbot1.visible = true;
                    this.addChild(this.myBots);
                    createjs.Tween.get(bgnewbot1).
                        to({ alpha: 0, scaleX: 1, scaleY: 1, rotation: 0 }).
                        to({ alpha: 1, scaleX: 1, scaleY: 1, rotation: 45 }, 1000).
                        to({ alpha: 1, scaleX: 1, scaleY: 1, rotation: 45 + 90 }, 2000).
                        to({ alpha: 0, scaleX: 1, scaleY: 1, rotation: 45 + 90 + 45 }, 1000).call(function () { _this.removeChild(bgnewbot1); });
                }
            };
            return MyBots;
        })(createjs.Container);
        Robots.MyBots = MyBots;
    })(Robots = FlipPlus.Robots || (FlipPlus.Robots = {}));
})(FlipPlus || (FlipPlus = {}));
/// <reference path="src/preferences.ts" />
/// <reference path="typing/createjs/createjs.d.ts" />
/// <reference path="gameui/AssetsManager.ts" />
/// <reference path="gameui/GameScreen.ts" />
/// <reference path="gameui/UIItem.ts" />
/// <reference path="gameui/Grid.ts" />
/// <reference path="gameui/Label.ts" />
/// <reference path="gameui/MenuContainer.ts" />
/// <reference path="gameui/ScreenState.ts" />
/// <reference path="gameui/Transition.ts" />
/// <reference path="gameui/Button.ts" />
/*scripts*/
/// <reference path="src/FlipPlusGame.ts" />
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
/// <reference path="src/Menu/genericmenu.ts" />
/// <reference path="src/Menu/WorkshopMenu.ts" />
/// <reference path="src/Menu/Loading.ts" />
/// <reference path="src/Menu/MainMenu.ts" />
/// <reference path="src/Menu/OptionsMenu.ts" />
/// <reference path="src/Menu/ProjectsMenu.ts" />
/// <reference path="src/Menu/SoundMenu.ts" />
/// <reference path="src/Menu/View/Terminal.ts" />
/// <reference path="src/Menu/View/ScreenMenu.ts" />
/// <reference path="src/Menu/View/LevelGrid.ts" />
/// <reference path="src/Menu/View/LevelThumb.ts" />
/// <reference path="src/Menu/View/StarsIndicator.ts" />
/// <reference path="src/Menu/View/CoinsIndicator.ts" />
/// <reference path="src/Menu/View/ProjectItem.ts" />
/// <reference path="src/Menu/View/ProjectProgressIndicator.ts" />
/// <reference path="src/Menu/View/ProjectStarsIndicator.ts" />
/// <reference path="src/Projects/Level.ts" />
/// <reference path="src/Projects/Project.ts" />
/// <reference path="src/Projects/ProjectManager.ts" />
/// <reference path="src/menu/view/popup.ts" />
/// <reference path="src/Robots/MyBots.ts" /> 
var gameui;
(function (gameui) {
    // Class
    var AudiosManager = (function () {
        function AudiosManager() {
        }
        AudiosManager.setMusicVolume = function (volume) {
            if (this.currentMusic)
                this.currentMusic.volume = volume;
            this.musicVolue = volume;
        };
        AudiosManager.setSoundVolume = function (volume) {
            this.soundVolume = volume;
        };
        AudiosManager.getMusicVolume = function () {
            if (this.musicVolue == undefined)
                return 1;
            return this.musicVolue;
        };
        AudiosManager.getSoundVolume = function () {
            if (this.soundVolume == undefined)
                return 1;
            return this.soundVolume;
        };
        AudiosManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume * this.getMusicVolume());
                if (this.currentMusicName == name)
                    return;
                this.currentMusic.stop();
                delete this.currentMusic;
            }
            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name, null, null, null, 1000);
            this.currentMusic.setVolume(volume * this.getMusicVolume());
        };
        AudiosManager.playSound = function (name, interrupt, delay, offset, loop, volume) {
            if (delay === void 0) { delay = 0; }
            if (volume === void 0) { volume = 1; }
            return createjs.Sound.play(name, interrupt, delay, offset, loop, volume * this.getSoundVolume());
        };
        return AudiosManager;
    })();
    gameui.AudiosManager = AudiosManager;
})(gameui || (gameui = {}));
var Analytics = (function () {
    function Analytics() {
    }
    //create a random user ID
    Analytics.prototype.getUser = function () {
        if (!this.userId)
            this.userId = localStorage.getItem("dia_userID");
        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("dia_userID", this.userId);
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
        return;
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
        this.postAjax(url, message, header_auth_hex);
    };
    Analytics.prototype.postAjax = function (url, data, header_auth_hex) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Content-Length', JSON.stringify(data).length.toString());
        xhr.setRequestHeader("Authorization", header_auth_hex);
        //xhr.addEventListener('load', function (e) {}, false);
        xhr.send(JSON.stringify(data));
    };
    return Analytics;
})();
var FlipPlus;
(function (FlipPlus) {
    var Bonus;
    (function (Bonus) {
        // Class
        var Bonus2OLD = (function (_super) {
            __extends(Bonus2OLD, _super);
            function Bonus2OLD(itemsArray, sufix) {
                if (sufix === void 0) { sufix = "1"; }
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
            // verifies if two cards matches
            Bonus2OLD.prototype.match = function (card1, card2) {
                var _this = this;
                if (card1.name == card2.name && card1 != card2) {
                    this.userAquireItem(card1.name);
                    this.userAquireItem(card1.name);
                    // animate itens
                    this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                    this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);
                    return true;
                }
                else {
                    // cards doesnt match
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
                        this.message.addEventListener("onclose", function () { _this.endBonus(); });
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
                        this.message.addEventListener("onclose", function () { _this.endBonus(); });
                        this.endBonus();
                    }
                    this.currentCard = null;
                }
                else
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
                //for each cards
                for (var c in cards) {
                    var card = this.createCard(cards[c]);
                    card.x = c % cols * width;
                    card.y = Math.floor(c / cols) * height;
                    cardsContainer.addChild(card);
                    //add cards event listener
                    card.addEventListener("click", function (e) { _this.cardClick(e.currentTarget); });
                }
                this.content.addChild(cardsContainer);
            };
            //generate cards itens to be randomized
            Bonus2OLD.prototype.generateCards = function (cardsCount, pairs, items) {
                var cards = new Array();
                //set number of lives
                this.lives = cardsCount - pairs * 2;
                //add Cards Pairs
                for (var p = 0; p < pairs; p++) {
                    var itemIndex = Math.floor(Math.random() * items.length);
                    cards.push(items[itemIndex]);
                    cards.push(items[itemIndex]);
                }
                //Adds empty spaces
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
                var cover = new gameui.ImageButton("Bonus2/bonuscard1");
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
                createjs.Tween.get(cover).to({ scaleY: 0 }, 200, createjs.Ease.quadIn).call(function () { cover.visible = false; });
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
    })(Bonus = FlipPlus.Bonus || (FlipPlus.Bonus = {}));
})(FlipPlus || (FlipPlus = {}));
var levelsDataBackup;
var levelCreatorMode;
var levelCreatorTestMode;
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
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
                    window.onresize = function () { };
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
                    }
                    else {
                        alert("There nothing saved in this level. Please create a new one");
                    }
                };
                this.editWindow.document.getElementById("c_export").onclick = function () {
                    var data = _this.loadStored();
                    if (data) {
                        //remove trashes from saved data
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
                        try {
                            data = data.replace("var levelsData =", "");
                            var dataParsed = JSON.parse(data);
                            data = JSON.stringify(dataParsed);
                            localStorage.setItem(LevelCreator.key, data);
                            _this.updateSelectList();
                            setTimeout(function () { alert("Levels imported"); }, 200);
                        }
                        catch (er) {
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
                }
                else if (document.getElementById("c_mirrowing").checked) {
                    this.levelLogic.board.blocks[col][row].mirror = !this.levelLogic.board.blocks[col][row].mirror;
                    if (!this.levelData.mirroredBlocks)
                        this.levelData.mirroredBlocks = [];
                    this.toogleItemInArray(this.levelData.mirroredBlocks, id);
                }
                else if (document.getElementById("c_hidding").checked) {
                    this.levelLogic.board.blocks[col][row].hidden = !this.levelLogic.board.blocks[col][row].hidden;
                    if (!this.levelData.hiddenBlocks)
                        this.levelData.hiddenBlocks = [];
                    this.toogleItemInArray(this.levelData.hiddenBlocks, id);
                }
                else {
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
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var levelsDataBackup;
var levelCreatorMode;
var levelCreatorTestMode;
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var LevelCreator2 = (function (_super) {
            __extends(LevelCreator2, _super);
            function LevelCreator2(levelData, callback) {
                FlipPlus.FlipPlusGame.gameScreen.resizeGameScreen(420, 600, false);
                FlipPlus.FlipPlusGame.gameScreen.resizeGameScreen = function () { };
                if (!levelData.width && levelData.width != 0)
                    levelData.width = 5;
                if (!levelData.height && levelData.height != 0)
                    levelData.height = 5;
                if (!levelData.theme)
                    levelData.theme = "yellow";
                if (!levelData.type)
                    levelData.type = "puzzle";
                this.callback = callback;
                _super.call(this, levelData);
                this.levelLogic.board.setInvertedBlocks(levelData.blocksData);
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                this.gameplayMenu.visible = false;
            }
            //threat user input
            LevelCreator2.prototype.userInput = function (col, row) {
                var id = row + col * this.levelData.height;
                //invert a cross
                this.levelLogic.invertCross(col, row);
                //update sprites 
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                this.levelData.blocksData = this.levelLogic.board.getInvertedBlocks();
                if (this.callback)
                    this.callback(this.levelData);
            };
            LevelCreator2.prototype.toogleItemInArray = function (array, item) {
                var index = array.indexOf(item);
                if (index >= 0)
                    array.splice(index, 1);
                else
                    array.push(item);
            };
            LevelCreator2.prototype.win = function (col, row) {
            };
            LevelCreator2.key = "customProjects";
            return LevelCreator2;
        })(GamePlay.Puzzle);
        GamePlay.LevelCreator2 = LevelCreator2;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
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
                this.gameplayMenu.addButtons([Items.SKIP]);
                if (this.levelData.puzzlesToSolve > 1)
                    this.gameplayMenu.addButtons([Items.SOLVE]);
                //adds buttons and items
                this.gameplayMenu.addButtons([Items.TAP, Items.HINT]);
                this.gameplayMenu.addEventListener(Items.TAP, function () { _this.useItemTouch(); });
                this.gameplayMenu.addEventListener(Items.SOLVE, function () { _this.useItemSolve(); });
                this.gameplayMenu.addEventListener(Items.HINT, function () { _this.useItemHint(); });
                this.gameplayMenu.addEventListener(Items.SKIP, function () { _this.useItemSkip(); });
                this.moves = this.levelData.moves;
                if (levelData.blocksData && levelData.blocksData.length > 0) {
                    this.levelLogic.board.setInvertedBlocks(levelData.blocksData);
                    this.levelData.puzzlesToSolve = 1;
                }
                else {
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
                                    // play sound
                                    gameui.AudiosManager.playSound("Power Down");
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
                }
                else {
                    //animate board and switch
                    var defaultX = this.boardSprite.x;
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX - defaultWidth }, 250, createjs.Ease.quadIn).call(function () {
                        _this.currentPuzzle++;
                        _this.randomBoard(_this.levelData.randomMinMoves, _this.levelData.randomMaxMoves);
                        _this.boardSprite.clearHint();
                        _this.boardSprite.x = defaultX + defaultWidth;
                        createjs.Tween.get(_this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut);
                    });
                }
            };
            Moves.prototype.randomBoard = function (minMoves, maxMoves) {
                if (minMoves === void 0) { minMoves = 2; }
                if (maxMoves === void 0) { maxMoves = 5; }
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
                if (!this.useItem(Items.TAP))
                    return;
                this.moves += 2;
            };
            Moves.prototype.useItemSolve = function () {
                if (!this.useItem(Items.SOLVE))
                    return;
                this.win(0, 0);
            };
            return Moves;
        })(GamePlay.LevelScreen);
        GamePlay.Moves = Moves;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
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
                this.introMc.addEventListener("d1", function () { _this.popup.showBotText(stringResources.it_text1); });
                this.introMc.addEventListener("readyToPlay", function () { _this.dispatchEvent("readyToPlay"); });
                this.introMc.addEventListener("d2", function () { _this.popup.showBotText(stringResources.it_text2); });
                this.introMc.addEventListener("end", function () { FlipPlus.FlipPlusGame.showProjectsMenu(); _this.dispatchEvent("end"); });
                this.popup.addEventListener("onclose", function () { _this.introMc.play(); });
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
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var ShopMenu = (function (_super) {
            __extends(ShopMenu, _super);
            function ShopMenu(previousScreen) {
                _super.call(this, stringResources.menus.shop, previousScreen, "menu/titleRed");
                this.productInfo = [
                    { name: "50", price: "U$ 0,99", img: "partsicon" },
                    { name: "200", price: "U$ 1,99", img: "partsicon" },
                    { name: "500", price: "U$ 3,99", img: "partsicon" },
                    { name: "1000", price: "U$ 4,99", img: "partsicon" },
                ];
                this.productIdList = ["50", "200", "500", "1000"];
                this.initializeScreen();
                this.initializeStore();
            }
            //#region Interface =====================================================================================
            ShopMenu.prototype.initializeScreen = function () {
                this.loadingObject = new createjs.Container();
                this.statusText = new createjs.Text("", defaultFontFamilyNormal, blueColor);
                this.statusText.textAlign = "center";
                this.content.addChild(this.loadingObject);
                this.content.addChild(this.statusText);
                this.statusText.y = -400;
            };
            // add all products in the list
            ShopMenu.prototype.fillProducts = function (productList) {
                var dic = {};
                this.productsListItems = dic;
                this.showLoaded();
                for (var p in productList) {
                    var productListItem = this.createProduct(productList[p]);
                    productListItem.y = p * 380 + 380;
                    productListItem.x = 70;
                    this.content.addChild(productListItem);
                }
            };
            // add a single product in the list
            ShopMenu.prototype.createProduct = function (product) {
                var productListItem = new ProductListItem(product.productId, product.title.replace("(Flip +)", ""), product.description, product.localizedPrice);
                this.productsListItems[product.productId] = productListItem;
                console.log(JSON.stringify(product));
                // add function callback
                productListItem.addEventListener("click", function (event) { Cocoon.Store.purchase(product.productId); });
                return productListItem;
            };
            // show a loading message
            ShopMenu.prototype.showLoading = function () {
                this.statusText.text = stringResources.menus.loading;
                this.loadingObject.visible = true;
            };
            // show a loading message
            ShopMenu.prototype.showLoaded = function () {
                this.statusText.visible = false;
                this.loadingObject.visible = false;
            };
            // show a error message in it
            ShopMenu.prototype.showError = function () {
                this.statusText.text = stringResources.menus.errorShop;
                this.loadingObject.visible = false;
            };
            //lock UI for a time interval
            ShopMenu.prototype.lockUI = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 5000; }
                this.content.mouseEnabled = false;
                setTimeout(function () { _this.unlockUI(); }, timeout);
            };
            //locks unlocks ui
            ShopMenu.prototype.unlockUI = function () {
                this.content.mouseEnabled = true;
            };
            // update footer
            ShopMenu.prototype.updateUI = function () {
                // TODO
            };
            // reurn a object corresponding to productId
            ShopMenu.prototype.getProductListItem = function (productId) {
                return this.productsListItems[productId];
            };
            // animate footer item
            ShopMenu.prototype.animateItem = function (productId) {
                switch (productId) {
                }
            };
            //#endregion 
            //#region market =====================================================================================
            // initialize product listing
            ShopMenu.prototype.initializeStore = function () {
                var _this = this;
                //  if (!Cocoon.Store.nativeAvailable) return;
                this.showError();
                // on loaded products
                Cocoon.Store.on("load", {
                    started: function () {
                        _this.showLoading();
                    },
                    success: function (products) {
                        _this.products = products;
                        _this.fillProducts(products);
                    },
                    error: function (errorMessage) {
                        _this.showError();
                    }
                }, { once: true });
                // on purchasing products
                Cocoon.Store.on("purchase", {
                    started: function (productId) {
                        _this.getProductListItem(productId).setPurchasing();
                        _this.lockUI();
                    },
                    success: function (purchaseInfo) {
                        _this.fullFillPurchase(purchaseInfo.productId);
                        _this.updateUI();
                        _this.unlockUI();
                        _this.animateItem(purchaseInfo.productId);
                        if (_this.products[purchaseInfo.productId].productType == Cocoon.Store.ProductType.CONSUMABLE) {
                            _this.getProductListItem(purchaseInfo.productId).setPurchased(true);
                            Cocoon.Store.consume(purchaseInfo.transactionId, purchaseInfo.productId);
                        }
                        _this.getProductListItem(purchaseInfo.productId).setPurchased();
                        Cocoon.Store.finish(purchaseInfo.transactionId);
                    },
                    error: function (productId, error) {
                        _this.getProductListItem(productId).setNormal();
                        _this.unlockUI();
                    }
                }, { once: true });
                // initialize store
                Cocoon.Store.initialize({ sandbox: true, managed: true });
                // load products
                Cocoon.Store.loadProducts(this.productIdList);
            };
            // verify product avaliability
            ShopMenu.prototype.updateProductsAvaliability = function () {
            };
            // show that product is consumed
            ShopMenu.prototype.fullFillPurchase = function (productId) {
                switch (productId) {
                }
                return true;
            };
            return ShopMenu;
        })(Menu.GenericMenu);
        Menu.ShopMenu = ShopMenu;
        var ProductListItem = (function (_super) {
            __extends(ProductListItem, _super);
            function ProductListItem(productId, name, description, localizedPrice, image) {
                _super.call(this);
                // adds BG
                this.addChild(gameui.AssetsManager.getBitmap("menu/storeItem").set({ regX: 1204 / 2, regY: 277 / 2 }));
                // adds icon
                this.addChild(gameui.AssetsManager.getBitmap(image).set({ x: -400, regY: 150, regX: 150 }));
                // adds text
                this.addChild(new gameui.Label(name, defaultFontFamilyHighlight, "#333071").set({ x: -100 }));
                // adds Value
                this.addChild(new gameui.Label(localizedPrice, defaultFontFamilyNormal, "white").set({ x: 375, y: -70 }));
                // adds buy text
                this.addChild(new gameui.Label(stringResources.menus.shop, defaultFontFamilyHighlight, "#86c0f1").set({ x: 375, y: 40 }));
                this.createHitArea();
            }
            ProductListItem.prototype.setPurchasing = function () {
                this.disable();
                this.loadingIcon.visible = true;
            };
            ProductListItem.prototype.loading = function () {
                this.disable();
                this.loadingIcon.visible = true;
            };
            ProductListItem.prototype.setNotAvaliable = function () {
                this.purchaseButton.fadeOut();
                this.purchasedIcon.visible = false;
                this.loadingIcon.visible = false;
            };
            ProductListItem.prototype.setAvaliable = function () { };
            ProductListItem.prototype.setPurchased = function (timeOut) {
                var _this = this;
                if (timeOut === void 0) { timeOut = false; }
                this.purchaseButton.fadeOut();
                this.purchasedIcon.visible = true;
                this.loadingIcon.visible = false;
                gameui.AudiosManager.playSound("Interface Sound-11");
                if (timeOut)
                    setTimeout(function () { _this.setNormal(); }, 1000);
            };
            ProductListItem.prototype.setNormal = function () {
                this.purchaseButton.fadeIn();
                this.purchasedIcon.visible = false;
                this.loadingIcon.visible = false;
            };
            ProductListItem.prototype.enable = function () {
                this.purchaseButton.fadeIn();
                this.loadingIcon.visible = false;
            };
            ProductListItem.prototype.disable = function () {
                this.purchasedIcon.visible = false;
                this.purchaseButton.fadeOut();
            };
            return ProductListItem;
        })(gameui.Button);
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
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
                this.content.hitArea = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, defaultWidth, defaultHeight));
                //adds callback forrr touch
                this.content.addEventListener("click", function () {
                    _this.nextSlide();
                });
                //adds hitarea
                var s = new createjs.Shape();
                s.graphics.beginFill("#FFF").rect(0, 0, defaultWidth, defaultHeight);
                this.content.hitArea = s;
            }
            //loadSlideShowImages
            SlideShow.prototype.loadSlides = function (slides) {
                //initializes the image array
                this.images = new Array();
                //load all images in images array
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
                //hide all images   
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
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
/// <reference path="shopmenu.ts" />
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var SpecialOfferMenu = (function (_super) {
            __extends(SpecialOfferMenu, _super);
            function SpecialOfferMenu(previousScreen) {
                _super.call(this, previousScreen);
                this.productIdList = ["100"];
            }
            // add all products in the list
            SpecialOfferMenu.prototype.fillProducts = function (productList) {
                var bt = new gameui.ImageButton("menu/specialOffer");
                this.content.addChild(bt);
                // add function callback
                bt.addEventListener("click", function (event) { Cocoon.Store.purchase(productList[0].productId); });
                // adds Value
                bt.addChild(new gameui.Label(productList[0].localizedPrice, defaultFontFamilyNormal, "white").set({ x: -210, y: 255 }));
                // adds buy text
                bt.addChild(new gameui.Label(stringResources.menus.buy, defaultFontFamilyHighlight, "#86c0f1").set({ x: 165, y: 250 }));
            };
            SpecialOfferMenu.prototype.buildHeader = function (title, previousScreen, color) {
                _super.prototype.buildHeader.call(this, stringResources.menus.specialOffer, previousScreen, color);
            };
            return SpecialOfferMenu;
        })(Menu.ShopMenu);
        Menu.SpecialOfferMenu = SpecialOfferMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
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
                this.content.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, defaultWidth, defaultHeight));
                //add event to go to main menu
                this.content.addEventListener("click", function () {
                    FlipPlus.FlipPlusGame.showMainMenu();
                });
                this.content.addEventListener("mousedown", function () {
                    gameui.AudiosManager.playSound("button");
                });
            }
            TitleScreen.prototype.redim = function (headerY, footerY, width, height) {
                _super.prototype.redim.call(this, headerY, footerY, width, height);
                this.beach.y = -headerY / 4 - 616 + 77 / 4 + 9;
            };
            TitleScreen.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);
                // play music
                gameui.AudiosManager.playMusic("Music Dot Robot");
            };
            return TitleScreen;
        })(gameui.ScreenState);
        Menu.TitleScreen = TitleScreen;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                        this.updateInterval = setInterval(function () { _this.timerintervalTick(); }, 900);
                    }
                    else {
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
                            createjs.Tween.get(this.timerText, { loop: true })
                                .to({ scaleX: 1.1, scaleY: 1.1 }, 400, createjs.Ease.sineInOut)
                                .to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineInOut);
                        }
                    }
                    else {
                        createjs.Tween.removeTweens(this.timerText);
                        this.timerText.text = this.toHHMMSS(time);
                        this.timerText.scaleX = this.scaleY = 1;
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
            })(gameui.ImageButton);
            View.BonusItem = BonusItem;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            var LevelThumb2 = (function (_super) {
                __extends(LevelThumb2, _super);
                // Constructor
                function LevelThumb2(level) {
                    _super.call(this, level);
                    this.mouseEnabled = false;
                    this.updateUserData();
                }
                LevelThumb2.prototype.createBackgroud = function (level, assetName, assetSufix) {
                    var _this = this;
                    var sbg = new createjs.Bitmap("assets/images_1x/workshop/" + assetName + assetSufix + ".png");
                    sbg.image.onload = function () { _this.getStage().update(); };
                    if (this.getStage())
                        this.getStage().update();
                    sbg.regX = sbg.regY = 98;
                    return sbg;
                };
                LevelThumb2.prototype.createTags = function (level, assetName, assetSufix) {
                    var _this = this;
                    //TODO: essas string devem estar em um enum
                    if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                        var tag = new createjs.Bitmap("assets/images_1x/workshop/" + assetName + (level.type == "moves" ? "flip" : level.type) + assetSufix + ".png");
                        tag.image.onload = function () { _this.getStage().update(); };
                        if (this.getStage())
                            this.getStage().update();
                        tag.regX = tag.regY = 100;
                        tag.scaleX = tag.scaleY = 0.5;
                        tag.x = tag.y = 70;
                        return tag;
                    }
                };
                LevelThumb2.prototype.createThumbs = function (level) {
                    this.removeAllChildren();
                    var color1;
                    var color2;
                    var assetSufix;
                    var assetName = this.defineAssetName(level);
                    var thumbContainer = new createjs.Container();
                    this.addChild(thumbContainer);
                    assetSufix = "3";
                    color1 = "rgba(255,255,255,0.9)";
                    color2 = "rgba(0,0,0,0.3)";
                    this.setSound(null);
                    //Adds Thumb Backgroud
                    thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));
                    //Adds Thumb Blocks
                    thumbContainer.addChild(this.createBlocks(level, color1, color2));
                    //Adds thumb tags
                    thumbContainer.addChild(this.createTags(level, assetName, assetSufix));
                };
                return LevelThumb2;
            })(View.LevelThumb);
            View.LevelThumb2 = LevelThumb2;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var Message = (function (_super) {
                __extends(Message, _super);
                //class contructor
                function Message() {
                    var _this = this;
                    _super.call(this);
                    //centralize the popup on screen
                    this.width = defaultWidth;
                    this.height = defaultHeight;
                    this.x = defaultWidth / 2;
                    this.y = defaultHeight / 2;
                    this.centralize();
                    //hide popup
                    this.visible = false;
                    this.mouseEnabled = true;
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(0, 0, defaultWidth, defaultHeight));
                    this.addEventListener("click", function () { _this.closePopUp(); });
                }
                //public method to invoke the popup
                Message.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (timeout === void 0) { timeout = 3000; }
                    if (delay === void 0) { delay = 0; }
                    //clean everything
                    this.removeAllChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/message");
                    bg.x = 0;
                    bg.y = defaultHeight / 2 - 500;
                    this.addChild(bg);
                    //create a text
                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = defaultWidth / 2;
                    this.addChild(titleShadow);
                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = defaultWidth / 2;
                    this.addChild(titleDO);
                    titleShadow.y = titleDO.y = defaultHeight / 2;
                    titleShadow.y += 15;
                    //updates text
                    titleDO.text = titleShadow.text = text.toUpperCase();
                    //shows the popus
                    this.closeinterval = setTimeout(function () {
                        _this.fadeIn(1, 0.5);
                        // play sound
                        gameui.AudiosManager.playSound("Open");
                    }, delay);
                    ;
                    //create a interval for closing the popopu
                    this.closeinterval = setTimeout(function () {
                        _this.closePopUp();
                    }, timeout + delay);
                };
                //method for close popup 
                Message.prototype.closePopUp = function () {
                    gameui.AudiosManager.playSound("Close");
                    //hide the popup{
                    clearTimeout(this.closeinterval);
                    this.dispatchEvent("onclose");
                    this.fadeOut(1, 0.5);
                };
                return Message;
            })(gameui.UIItem);
            View.Message = Message;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // Class
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page() {
                    _super.apply(this, arguments);
                    this.pageVisibility = false;
                }
                Page.prototype.showPage = function () {
                    if (this.pageVisibility == false) {
                        this.pageVisibility = this.visible = true;
                        if (this.onShowPage)
                            this.onShowPage();
                    }
                };
                Page.prototype.hidePage = function () {
                    if (this.pageVisibility == true) {
                        this.pageVisibility = this.visible = false;
                        if (this.onHidePage)
                            this.onHidePage();
                    }
                };
                return Page;
            })(createjs.Container);
            View.Page = Page;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // Class
            var PagesSwiper = (function () {
                function PagesSwiper(pagesContainer, pages, pageWidth, minY, maxY) {
                    var _this = this;
                    this.cancelClick = false;
                    this.currentPageIndex = 0;
                    this.pagewidth = pageWidth;
                    this.pagesContainer = pagesContainer;
                    this.pages = pages;
                    //configure pages
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
                            //hide all pages
                            _this.showOlnyPage(_this.currentPageIndex, 1);
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
                            setTimeout(function () { _this.cancelClick = false; }, 100);
                        }
                    });
                }
                //----------------------pages-----------------------------------------------//
                PagesSwiper.prototype.gotoPage = function (pageId, tween) {
                    var _this = this;
                    if (tween === void 0) { tween = true; }
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
                            _this.showOlnyPage(pageId);
                        });
                    }
                    else {
                        //move current page
                        this.pagesContainer.x = -this.pagewidth * pageId;
                        this.showOlnyPage(pageId);
                    }
                };
                PagesSwiper.prototype.showOlnyPage = function (id, margin) {
                    if (margin === void 0) { margin = 0; }
                    //hide all other pages
                    for (var i in this.pages)
                        if (i == id || i == id - margin || i == id + margin)
                            this.showPage(i);
                        else
                            this.hidePage(i);
                };
                PagesSwiper.prototype.showPage = function (id) {
                    this.pages[id].showPage();
                };
                PagesSwiper.prototype.hidePage = function (id) {
                    this.pages[id].hidePage();
                };
                PagesSwiper.prototype.stayOnPage = function () {
                    this.gotoPage(this.currentPageIndex);
                };
                PagesSwiper.prototype.gotoNextPage = function () {
                    this.gotoPage(1 + this.currentPageIndex);
                };
                PagesSwiper.prototype.gotoPreviousPage = function () {
                    this.gotoPage(this.currentPageIndex - 1);
                };
                return PagesSwiper;
            })();
            View.PagesSwiper = PagesSwiper;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var PopupBot = (function (_super) {
                __extends(PopupBot, _super);
                function PopupBot() {
                    _super.apply(this, arguments);
                }
                //public method to invoke the popup
                PopupBot.prototype.showBotText = function (text, timeout, delay) {
                    if (timeout === void 0) { timeout = 5000; }
                    if (delay === void 0) { delay = 0; }
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
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    textDO.y = defaultHeight * 0.3;
                    //updates text
                    textDO.text = text.toUpperCase();
                    this.addsClickIndicator();
                };
                PopupBot.prototype.addsClickIndicator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getSprite("touch");
                    this.addChild(ind);
                    ind.x = 1250;
                    ind.y = 900;
                };
                return PopupBot;
            })(View.Popup);
            View.PopupBot = PopupBot;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var PopupHelper = (function (_super) {
                __extends(PopupHelper, _super);
                // class contructor
                function PopupHelper() {
                    _super.call(this, true);
                }
                PopupHelper.prototype.showRestartMessage = function () {
                    var _this = this;
                    this.showsPopup(0, 0);
                    //clean display Object
                    this.removeAllChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    // create a text
                    var textDO = new createjs.Text(stringResources.help_restart, defaultFontFamilyNormal, "white");
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    // add Image
                    var img = gameui.AssetsManager.getBitmap("menu/imrestart");
                    this.addChild(img);
                    img.x = 80;
                    img.y = 540;
                    // updates title and text values
                    textDO.y = 550;
                    textDO.x = 1000;
                    // Add Buttons
                    var bt = new gameui.TextButton(stringResources.help_restart_bt, defaultFontFamilyNormal, "white", "menu/btoptions", function () {
                        _this.closePopUp();
                    });
                    this.addChild(bt);
                    bt.x = 1000;
                    bt.y = 1100;
                };
                PopupHelper.prototype.showItemMessage = function (item, price, accept, cancel, customImage) {
                    var _this = this;
                    this.showsPopup(0, 0);
                    //clean display Object
                    this.removeAllChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    // create a text
                    var textDO = new createjs.Text(stringResources["help_" + item], defaultFontFamilyNormal, "white");
                    textDO.textAlign = "center";
                    textDO.textBaseline = "middle";
                    textDO.x = defaultWidth / 2;
                    textDO.y = 550;
                    textDO.x = 1000;
                    this.addChild(textDO);
                    // add Image
                    var img = gameui.AssetsManager.getBitmap(customImage || "menu/imitem");
                    this.addChild(img);
                    img.x = 80;
                    img.y = 740;
                    img.regY = img.getBounds().height / 2;
                    // Add cancel Buttons
                    var cancelButton = new gameui.TextButton(stringResources.help_cancel_bt, defaultFontFamilyNormal, "white", "menu/btoptions", function () {
                        _this.closePopUp();
                        cancel();
                    });
                    this.addChild(cancelButton);
                    cancelButton.x = defaultWidth / 4;
                    cancelButton.y = 1150;
                    // Add ok Buttons
                    var acceptBt = new gameui.TextButton(stringResources["help_" + item + "_bt"], defaultFontFamilyNormal, "white", "menu/btoptions", function () {
                        _this.closePopUp();
                        accept();
                    });
                    this.addChild(acceptBt);
                    acceptBt.text.y -= 50;
                    acceptBt.x = defaultWidth / 4 * 3;
                    acceptBt.y = 1150;
                    //add stuff on button
                    acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + item).set({ x: -170, y: 0 }));
                    acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_coin").set({ x: 90, y: 20, scaleX: 0.8, scaleY: 0.8 }));
                    acceptBt.addChild(new createjs.Text(price.toString(), defaultFontFamilyNormal, "white").set({ x: 10 }));
                };
                return PopupHelper;
            })(View.Popup);
            View.PopupHelper = PopupHelper;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // Class
            var ProjectWorkshopView = (function (_super) {
                __extends(ProjectWorkshopView, _super);
                // Constructor
                function ProjectWorkshopView(project) {
                    var _this = this;
                    _super.call(this);
                    this.headerY = 0;
                    this.footerY = 0;
                    this.project = project;
                    this.name = project.name;
                    this.onShowPage = function () {
                        //add hitArea
                        _this.addHitArea();
                        //add levels information
                        _this.addObjects(project);
                        //activate layer
                        _this.activate();
                        _this.redim(_this.headerY, _this.footerY);
                    };
                    this.onHidePage = function () {
                        _this.removeAllChildren();
                    };
                }
                //--------------------- Initialization ---------------------
                ProjectWorkshopView.prototype.addHitArea = function () {
                    var hit = new createjs.Container;
                    hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, defaultWidth, defaultHeight)));
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
                    this.robotPreview.x = defaultWidth / 2;
                    this.robotPreview.y = 1100;
                    this.robotPreview.update();
                    this.addChild(this.robotPreview);
                };
                //Adds RobotName
                ProjectWorkshopView.prototype.addStatus = function (project) {
                    this.statusArea = new createjs.Container();
                    this.statusArea.regX = this.statusArea.x = defaultWidth / 2;
                    var bg = gameui.AssetsManager.getBitmap("partshud");
                    bg.y = 0; //150;
                    bg.x = defaultWidth / 2;
                    bg.scaleX = 2;
                    bg.regX = bg.getBounds().width / 2;
                    this.statusArea.addChild(bg);
                    var l = new createjs.Text(project.nickName.toUpperCase(), defaultFontFamilyStrong, defaultFontColor);
                    l.y = 0; //250;
                    l.textAlign = "center";
                    l.textBaseline = "top";
                    l.x = defaultWidth / 2;
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
                                _this.dispatchEvent({ type: "levelClick", level: e.level, parameters: e.parameters });
                            });
                            this.levelGrid.x = 180;
                            this.levelGrid.y = 1538 - 2048;
                            levelMachine.addChild(this.levelGrid);
                        }
                        else {
                            var text = new createjs.Text(stringResources.ws_Locked, defaultFontFamilyStrong, defaultFontColor);
                            text.textAlign = "center";
                            text.y = 1738 - 2048;
                            text.x = defaultWidth / 2;
                            levelMachine.addChild(text);
                        }
                    }
                    else {
                        //TODO mudar o nome disso.
                        var text = new createjs.Text(stringResources.ws_NotFree, defaultFontFamilyStrong, defaultFontColor);
                        text.textAlign = "center";
                        text.y = 1738 - 2048;
                        text.x = defaultWidth / 2;
                        levelMachine.addChild(text);
                    }
                };
                //-Animation------------------------------------------------------------
                ProjectWorkshopView.prototype.setRelativePos = function (pos) {
                    this.robotPreview.x = this.statusArea.x = -pos * 0.35 + defaultWidth / 2;
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
                    this.headerY = headerY;
                    this.footerY = footerY;
                    if (this.levelsMahine)
                        this.levelsMahine.y = footerY;
                    if (this.statusArea)
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
                    if (this.starsIndicator)
                        this.starsIndicator.updateProjectInfo();
                    if (this.robotPreview)
                        this.robotPreview.update(complete);
                    //this.animateIn(complete, direction);
                };
                return ProjectWorkshopView;
            })(View.Page);
            View.ProjectWorkshopView = ProjectWorkshopView;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
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
                    try {
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
                        this.percentMask.graphics.beginFill("#FFF").drawRect(-size / 2, 0, size, -this.fill.getBounds().height)
                            .endFill();
                        this.percentMask.scaleY = 0;
                        this.percentMask.y = 50;
                        this.fill.mask = this.percentMask;
                    }
                    catch (e) { }
                };
                //update percentage
                RobotPreview.prototype.update = function (complete) {
                    if (complete === void 0) { complete = false; }
                    try {
                        if (!complete)
                            if (this.project.UserData.complete) {
                                this.fill.visible = false;
                                this.stroke.visible = false;
                                this.complete.visible = true;
                            }
                            else
                                this.percentMask.scaleY = this.project.UserData.percent;
                        else
                            this.animateLevelComplete();
                    }
                    catch (e) { }
                    ;
                };
                //animate
                RobotPreview.prototype.animateLevelComplete = function (color) {
                    var _this = this;
                    if (color === void 0) { color = "#ffcc2e"; }
                    var newValue = this.project.UserData.percent;
                    //boxShape zoom out to the bot
                    var boxShape = new createjs.Shape();
                    boxShape.graphics.beginFill(color).drawRect(-700, -700, 1400, 1400);
                    boxShape.y = -300;
                    this.addChild(boxShape);
                    createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () { _this.removeChild(boxShape); });
                    createjs.Tween.get(this.percentMask).wait(600).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).call(function () {
                        if (_this.project.UserData.complete) {
                            _this.complete.alpha = 0;
                            _this.complete.visible = true;
                            createjs.Tween.get(_this.fill).wait(300).to({ alpha: 0 }, 600).call(function () { _this.fill.visible = false; });
                            createjs.Tween.get(_this.stroke).wait(300).to({ alpha: 0 }, 600).call(function () { _this.stroke.visible = false; });
                            createjs.Tween.get(_this.complete).wait(300).to({ alpha: 1 }, 600);
                        }
                    });
                };
                return RobotPreview;
            })(createjs.Container);
            View.RobotPreview = RobotPreview;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var View;
        (function (View) {
            // View Class
            var TextEffect = (function (_super) {
                __extends(TextEffect, _super);
                //class contructor
                function TextEffect() {
                    _super.call(this);
                    //centralize the popup on screen
                    this.width = defaultWidth;
                    this.height = defaultHeight;
                    this.x = defaultWidth / 2;
                    this.y = defaultHeight / 2;
                    this.centralize();
                    //hide popup
                    this.visible = false;
                    this.mouseEnabled = false;
                }
                //public method to invoke the popup
                TextEffect.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (timeout === void 0) { timeout = 3000; }
                    if (delay === void 0) { delay = 0; }
                    //clean everything
                    this.removeAllChildren();
                    //create a titleShadow
                    var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
                    titleShadow.textAlign = "center";
                    titleShadow.textBaseline = "middle";
                    titleShadow.x = defaultWidth / 2;
                    this.addChild(titleShadow);
                    //create a title
                    var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
                    titleDO.textAlign = "center";
                    titleDO.textBaseline = "middle";
                    titleDO.x = defaultWidth / 2;
                    this.addChild(titleDO);
                    titleShadow.y = titleDO.y = defaultHeight / 2;
                    titleShadow.y += 15;
                    //updates text
                    titleDO.text = titleShadow.text = text.toUpperCase();
                    var ty = defaultHeight * 0.9;
                    this.set({
                        alpha: 0,
                        y: ty
                    });
                    this.visible = true;
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this)
                        .to({ alpha: 1, y: ty - 50 }, 200, createjs.Ease.quadOut)
                        .to({ alpha: 1, y: ty - 100 }, 1000, createjs.Ease.linear)
                        .to({ alpha: 0, y: ty - 300 }, 200, createjs.Ease.quadIn)
                        .call(function () {
                        _this.visible = false;
                        _this.dispatchEvent("onclose");
                    });
                };
                return TextEffect;
            })(gameui.UIItem);
            View.TextEffect = TextEffect;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var stringResources = {
    ld: "Loading",
    it_text1: "N3-S needs \n repair",
    it_text2: "alone = bad\nfriends=good",
    tut_1_1_title: "The plus shape",
    tut_1_1_text: "flip the white squares to make \nthem color squares",
    tut_1_2_text: "tiles always flip in a \"plus shape\" \nfrom the center",
    tut_1_2_title: "Great",
    tut_2_1_title: "Flip to build",
    tut_2_1_text: "to finish the board, you have to turn \nevery white block in color block",
    tut_2_2_title: "Board complete!",
    tut_2_2_text: "Great, no white tiles in the board",
    tut_2_3_title: "Star",
    tut_2_3_text: "you solved all green blocks",
    tut_3_1_title: "Flip to invert",
    tut_3_1_text: "the plus shape inverts the tiles, \nwhite gets color and color gets white",
    tut_3_2_title: "Nice Work",
    tut_3_2_text: "purple tiles work the \nsame way as green tiles",
    tut_4_1_title: "hints",
    tut_4_1_text: "the light bulb button gives you a hint",
    tut_4_2_title: "too easy?",
    tut_4_2_text: "light bulbs help you out, \nbut they are limited",
    tut_5_1_title: "Bot S-N3S",
    tut_5_1_text: "finish this board \nto complete S-N3S repairs!",
    mm_play: "PLAY",
    op_back: "Back",
    op_erase: "Erase All Data",
    op_options: "Options",
    pr_notStarsTitle: "Not enough stars",
    pr_notStarsText: "you only have # stars. \nYou need at least stars # \nto unlock this project\n play more levels to earn stars.",
    pr_notTimeText: "Not Yet.#You must wait # before play this bonus level",
    ws_Locked: "LOCKED",
    ws_NotFree: "NOT FREE",
    gp_noMoreSkip: "No more Items",
    gp_noMoreHints: "You get itens buy playing the time \n bonus on the projects screen",
    gp_finishPuzzle: "Well done",
    gp_pz_Popup1Title: "Time Attack",
    gp_pz_Popup1Text1: "Solve",
    gp_pz_Popup1Text2: "boards in",
    gp_pz_Popup1Text3: "seconds",
    gp_pz_statusEnd: "END",
    gp_pz_timeUP: "Time's up",
    gp_mv_Popup1Title: "Flip Challenge",
    gp_mv_Popup1Text1: "Solve",
    gp_mv_Popup1Text2: "boards in",
    gp_mv_Popup1Text3: "flips",
    gp_mv_statusEnd: "END",
    gp_mv_noMoreMoves: "No more moves",
    Bonus1_title: "pick 3 Barrels",
    b1_popup1Ttitle: "Pick 3 Barrels",
    b1_popup1Text: "Some Barrels has hidden items",
    Bonus2_title: "find the pairs",
    b2_noMoreChances: "",
    b2_finish: "Well done!",
    Bonus3_title: "Capitain's chest",
    b3_finish: "Well done!",
    b3_noMoreChances: "No more chances",
    desc_item_touch: "More moves",
    desc_item_time: "More time",
    desc_item_hint: "Hint",
    desc_item_skip: "Skip",
    desc_item_solve: "Solve board",
    help_restart: "Are you lost?\nIn the pause menu you can restart!",
    help_skip: "Don't worry, you\ncan use parts\nto skip this board and move on!",
    help_time: "Don't worry, you\ncan use parts\nto get more time!",
    help_touch: "Don't worry, you\ncan use parts\nto get more taps!",
    help_restart_bt: "Great!",
    help_cancel_bt: "Not now",
    help_time_bt: "More Time",
    help_touch_bt: "More Taps",
    skip: "Skip",
    time: "Touch",
    touch: "Time",
    menus: {
        highScore: "High Score",
        loading: "loading",
        score: "score",
        level: "level",
        options: "options",
        gameOver: "GAME OVER",
        pause: "paused",
        sound: "Sound",
        menu: "menu",
        leaderboards: "Leaderboards",
        reset: "Reset All Data",
        restore: "Restore",
        restoreWarning: "It will restore your purchases from store, Continue?",
        resetWarning: "Are you sure. All you progress will be lost",
        about: "About",
        aboutText: "Develop by",
        aboutURL: "www.dia-studio.com",
        tutorial: "Tutorial",
        specialOffer: "Special Offer",
        shop: "shop",
        buy: "Buy",
        playerName: "Player Name",
        playerNameDesc: "Type your name for the leaderboards.",
        error: "Sorry, Something went wrong",
        errorShop: "Sorry, Shop Not avaliable",
        errorAds: "Can't load Ads, try again",
        rating: "Rate us",
        ratingDesc: "Are you enjoying?\nPlease rate us",
        like: "Like us",
        share: "Share",
        watchVideo: "Watch Video",
        gift: "gift in @ minutes"
    }
};
var stringResources_pt = {
    ld: "Carregando",
    it_text1: "N3-S precisa de \n reparos",
    it_text2: "sozinho = ruim \n amigos= bom",
    tut_1_1_title: "Forma de cruz",
    tut_1_1_text: "Vire todos os blocos brancos \n para blocos verdes",
    tut_1_2_text: "Os blocos sempre são invertidos em \"forma de cruz\" quando ativados",
    tut_1_2_title: "Ótimo!",
    tut_2_1_title: "Vire para construir",
    tut_2_1_text: "Para concluir o quadro vire todos os blocos brancos para coloridos.",
    tut_2_2_title: "Nível completo!",
    tut_2_2_text: "Ótimo, sem blocos brancos no quadro",
    tut_2_3_title: "Estrela",
    tut_2_3_text: "Você resolveu todos os quadros verdes.",
    tut_3_1_title: "toque para inverter",
    tut_3_1_text: "A forma de cruz sempre inverte a cor do quadradinho \n entre branco e colorido",
    tut_3_2_title: "Parabéns",
    tut_3_2_text: "Os blocos roxos fucionam da \nmesma forma que os verdes",
    tut_4_1_title: "Dicas",
    tut_4_1_text: "As lâmpadas são uma dica de qual quadradinho tocar",
    tut_4_2_title: "Facil?",
    tut_4_2_text: "As lãmpadas te ajudam, mas elas são limitadas\n você consegue mais lampadas e \n outros items jogando \BONUS",
    tut_5_1_title: "Bot S-N3S",
    tut_5_1_text: "Termine essa tela para \nfinalizar os repados no S-N3S!",
    mm_play: "JOGAR",
    op_back: "Voltar",
    op_erase: "apagar todos os dados",
    op_options: "Opções",
    pr_notStarsTitle: "Você não tem estrelas suficiente",
    pr_notStarsText: "você só tem # estrelas \n Você precisa de pelo menos estrelas # \n para desbloquear este projeto. \n Jogue mais níveis para ganhar estrelas.",
    pr_notTimeText: "Ainda não. Você deve esperar # antes de jogar este bônus",
    ws_Locked: "BLOQUEADO",
    ws_NotFree: "Não gratúito",
    gp_noMoreSkip: "Este item acabou",
    gp_noMoreHints: "Você pode ganhar mais items jogando \n os bonus na tela projetos",
    gp_finishPuzzle: "Muito bem !",
    gp_pz_Popup1Title: "Contra o tempo",
    gp_pz_Popup1Text1: "Resolva",
    gp_pz_Popup1Text2: "quadros em",
    gp_pz_Popup1Text3: "segundos",
    gp_pz_statusEnd: "Fim",
    gp_pz_timeUP: "Acabou o tempo",
    gp_mv_Popup1Title: "Movimentos",
    gp_mv_Popup1Text1: "Resolva",
    gp_mv_Popup1Text2: "quadros com",
    gp_mv_Popup1Text3: "movimentos",
    gp_mv_statusEnd: "fim",
    gp_mv_noMoreMoves: "Não há mais movimentos",
    Bonus1_title: "Escolha 3 Barris",
    b1_popup1Ttitle: "Escolha 3 Barris",
    b1_popup1Text: "Alguns Barris tem itens escondidos",
    Bonus2_title: "Encontre os pares",
    b2_noMoreChances: "acabaram as chances",
    b2_finish: "Bem feito!",
    Bonus3_title: "baú do Capitão",
    b3_finish: "Muito bem!",
    b3_noMoreChances: "acabaram as chances",
    desc_item_touch: "Mais movimentos",
    desc_item_time: "Mais tempo",
    desc_item_hint: "Dica",
    desc_item_skip: "Pular",
    desc_item_solve: "Resolva este quadro",
    help_restart: "Se perdeu? No menu\n de pausa você, pode\nrecomeçar a tela!",
    help_skip: "Não esquenta, você\npode usar peças para\npular esta tela e\nseguir em frente!",
    help_time: "Não esquenta, você\npode usar peças para\nganhar mais tempo!",
    help_touch: "Não esquenta, você\npode usar peças para\nganhar mais toques!",
    help_restart_bt: "Ótimo!",
    help_cancel_bt: "Agora não",
    help_time_bt: "Mais Tempo",
    help_touch_bt: "Mais Toques",
    skip: "Pular",
    time: "Tempo",
    touch: "Toques",
    menus: {
        highScore: "Recorde",
        loading: "Carregando",
        score: "Pontos",
        level: "level",
        options: "opções",
        gameOver: "GAME OVER",
        pause: "pausa",
        sound: "Sons",
        menu: "Menu",
        leaderboards: "Placar",
        reset: "Apagar tudo",
        restore: "Recuperar",
        restoreWarning: "Isso vai recuperar suas compras da loja, quer continuar?",
        resetWarning: "Você tem certeza? tudo que voce consquistou será perdido.",
        about: "Sobre",
        aboutText: "Desenvolvido por",
        aboutURL: "www.dia-studio.com",
        tutorial: "Tutorial",
        shop: "Compras",
        buy: "obter",
        specialOffer: "Oferta!",
        playerName: "Nome do Jogador",
        playerNameDesc: "Digite seu nome para aparecer no placar dos melhores",
        error: "Desculpe, algo deu errado.",
        errorShop: "A loja não está disponível.",
        errorAds: "Tente de novo",
        rating: "Avaliação",
        ratingDesc: "Está gostando? \nNos Ajude. Dê sua avaliação",
        like: "Curtir",
        share: "Compartilhar",
        watchVideo: "Veja um Video",
        gift: "vídeo em @ min"
    }
};
var language = navigator.language || navigator.userLanguage;
if (language == "pt-BR")
    var stringResources = stringResources_pt;
var FlipPlus;
(function (FlipPlus) {
    var UserData;
    (function (UserData) {
        // Class
        var Coins = (function () {
            // class constructor
            function Coins() {
                var data = localStorage.getItem(storagePrefix + "coins");
                if (data)
                    this.ammount = JSON.parse(data);
                else
                    this.ammount = 0;
            }
            // get coins amount
            Coins.prototype.getAmount = function () {
                return this.ammount ? this.ammount : 0;
            };
            // set coins amount
            Coins.prototype.setAmount = function (value) {
                this.ammount = value;
                localStorage.setItem(storagePrefix + "coins", JSON.stringify(value));
            };
            // increase coins ammount
            Coins.prototype.increaseAmount = function (value) {
                if (value === void 0) { value = 1; }
                // doesen't accept zero or negative values
                if (value < 1)
                    return;
                var iq = this.getAmount();
                // limit coins quantity to max
                var total = iq + value;
                if (total >= Coins.max)
                    total = Coins.max;
                // set coins ammount            
                this.setAmount(total);
            };
            // decrease coins value
            Coins.prototype.decreaseAmount = function (value) {
                if (value === void 0) { value = 1; }
                // doesen't accept zero or negative values
                if (value < 1)
                    return;
                var iq = this.getAmount();
                // doesen't allow to decrease less than zero
                if (iq < value)
                    return;
                this.setAmount(iq - value);
            };
            Coins.max = 20;
            return Coins;
        })();
        UserData.Coins = Coins;
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
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
            if (scale === void 0) { scale = 1; }
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
//# sourceMappingURL=script.js.map