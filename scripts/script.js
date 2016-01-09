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
            this.assetsManifest = manifest;
            if (!images)
                images = images ? images : new Array();
            if (!this.loader) {
                //creates a preload queue
                this.loader = new PIXI.loaders.Loader(path);
                ///Check	//install sound plug-in for sounds format
                ///this.loader.installPlugin(createjs.Sound);
                ///createjs.Sound.alternateExtensions = ["mp3"];
                // Adds callbacks
                //this.loader.addEventListener("filestart", (evt: any) => { console.log("loading " + evt.item.src) })
                this.loader.on("error ", function (evt) { console.log("error " + evt.item.src); });
                this.loader.on("fileerror ", function (evt) { console.log("ferror " + evt.item.src); });
                this.loader.on("progress", function (evt) { if (_this.onProgress)
                    _this.onProgress(evt.progress); });
                this.loader.on("fileload", function (evt) {
                    if (evt.item.type == "image")
                        images[evt.item.id] = evt.result;
                    return true;
                });
                this.loader.on("complete", function (loader, resources) {
                    for (var r in resources)
                        images[r] = resources[r].texture;
                    if (_this.onComplete)
                        _this.onComplete();
                });
            }
            //loads entire manifest 
            for (var m in manifest) {
                this.loader.add(manifest[m].id, manifest[m].src);
            }
            this.loader.load();
        };
        AssetsManager.reset = function () {
            this.loader.reset();
        };
        // load a font spritesheet
        AssetsManager.loadFontSpriteSheet = function (id, fontFile) {
            this.loader.add(id, fontFile);
            this.loader.load();
        };
        AssetsManager.loadSpriteSheet = function (id, fontFile) {
            this.loader.add(id, fontFile);
            this.loader.load();
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
            //if image is preloaded
            var texture = this.getLoadedImage(name);
            if (texture) {
                var imgobj = new PIXI.Sprite(texture);
                imgobj.texture.resolution = assetscale;
                imgobj.interactive = AssetsManager.defaultMouseEnabled;
                return imgobj;
            }
            //or else try grab by filename
            var imgobj = PIXI.Sprite.fromImage(name);
            imgobj.interactive = AssetsManager.defaultMouseEnabled;
            imgobj.texture.resolution = assetscale;
            return imgobj;
        };
        //get a bitmap Text
        AssetsManager.getBitmapText = function (text, bitmapFontId) {
            var bitmapText = new PIXI.extras.BitmapText(text, { font: bitmapFontId });
            bitmapText.maxLineHeight = 100;
            ///CHECK bitmapText.letterSpacing = 7;
            bitmapText.interactiveChildren = AssetsManager.defaultMouseEnabled;
            return bitmapText;
        };
        //Get a preloaded Image from assets
        AssetsManager.getLoadedImage = function (name) {
            if (this.loader)
                if (!this.loader.resources[name])
                    return null;
            return this.loader.resources[name].texture;
            return null;
        };
        //return a sprite according to the image
        AssetsManager.getMovieClip = function (name) {
            var textures = [];
            var n2 = function (n) { return n > 9 ? "" + n : "0" + n; };
            for (var i = 0; i < 999; i++) {
                var id = name + n2(i);
                if (!PIXI.utils.TextureCache[id])
                    break;
                var texture = PIXI.Texture.fromFrame(id);
                textures.push(texture);
            }
            var mc = new PIXI.extras.MovieClip(textures);
            mc.play();
            return mc;
        };
        AssetsManager.defaultMouseEnabled = false;
        return AssetsManager;
    })();
    gameui.AssetsManager = AssetsManager;
})(gameui || (gameui = {}));
//TODO remove universal variable defaultWidth and DefaultHeigth
var gameui;
(function (gameui) {
    var PIXIrenderer;
    var PIXIstage;
    var updateFn;
    var minfps = 100;
    var last = 0;
    var doing = false;
    var GameScreen = (function () {
        //-----------------------------------------------------------------------
        function GameScreen(divId, gameWidth, gameHeight, fps, showFps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            // create a renderer instance.
            PIXIstage = new PIXI.Container();
            PIXIrenderer = new PIXI.WebGLRenderer(gameWidth, gameHeight, { backgroundColor: 0 });
            var interactionManager = new PIXI.interaction.InteractionManager(PIXIrenderer);
            createjs.Ticker.setFPS(fps);
            // add the renderer view element to the DOM
            document.getElementById(divId).appendChild(PIXIrenderer.view);
            var x = 0;
            this.screenContainer = new PIXI.Container();
            PIXIstage.addChild(this.screenContainer);
            //var windowWidth = window.innerWidth;
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () { _this.resizeGameScreen(window.innerWidth, window.innerHeight); };
            updateFn = this.update;
            requestAnimationFrame(this.update);
        }
        GameScreen.prototype.update = function () {
            var time = Date.now();
            if (doing)
                alert("strange");
            if (!doing) {
                //if (time - last > minfps) {
                doing = true;
                last = time;
                // render the stage   
                // RENDER MUST BE BEFORE REQUEST
                PIXIrenderer.render(PIXIstage);
                doing = false;
            }
            requestAnimationFrame(updateFn);
        };
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
                    newScreen.view.interactive = false;
                    oldScreen.view.interactive = false;
                    //fade between transitions
                    newScreen.view.alpha = alpha;
                    newScreen.view.x = -x;
                    newScreen.view.y = -y;
                    oldScreen.view.alpha = 1;
                    oldScreen.view.x = 0;
                    oldScreen.view.y = 0;
                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: 1, x: x, y: y }, transition.time, createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(function () {
                        oldScreen.view.set({ alpha: 0, x: 0, y: 0 });
                        newScreen.view.set({ alpha: 1, x: 0, y: 0 });
                        newScreen.view.interactive = true;
                        oldScreen.view.interactive = true;
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
            PIXIrenderer.resize(deviceWidth, deviceHeight);
            // this.PIXIrenderer.width = deviceWidth;
            // this.PIXIrenderer.height = deviceHeight;
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
var gameui;
(function (gameui) {
    var ScreenState = (function () {
        function ScreenState() {
            this.view = new PIXI.Container();
            this.content = new PIXI.Container();
            this.overlay = new PIXI.Container();
            this.header = new PIXI.Container();
            this.footer = new PIXI.Container();
            this.background = new PIXI.Container();
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
                    this.background.scale.x = this.background.scale.y = scale;
                }
                else {
                    this.background.x = 0;
                    this.background.scaleY = scale;
                }
            }
            ///Check
            //  var mask = new PIXI.Graphics().beginFill(0x000000).drawRect(0, -(heigth - defaultHeight) / 2, width, heigth)
            //  this.background.mask = mask;
            //  this.footer.mask = mask;
            //  this.header.mask = mask;
            //  this.content.mask = mask;
        };
        return ScreenState;
    })();
    gameui.ScreenState = ScreenState;
})(gameui || (gameui = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.pivot.x = this.width / 2;
            this.pivot.y = this.height / 2;
            this.centered = true;
        };
        UIItem.prototype.fadeOut = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.resetFade();
            if (!this.scale.x)
                this.scale.x = 1;
            if (!this.scale.y)
                this.scale.y = 1;
            this.oldScaleX = this.scale.x;
            this.oldScaleY = this.scale.y;
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
                _this.scale.x = _this.oldScaleX;
                _this.scale.y = _this.oldScaleY;
                _this.alpha = 1;
                _this.animating = false;
                _this.interactive = true;
                ;
            });
        };
        UIItem.prototype.resetFade = function () {
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.scale.x = this.oldScaleX;
            this.scale.y = this.oldScaleY;
            this.interactive = false;
            createjs.Tween.removeTweens(this);
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            if (this.visible = true)
                this.antX = null;
            if (!this.scale.x)
                this.scale.x = 1;
            if (!this.scale.y)
                this.scale.y = 1;
            this.oldScaleX = this.scale.x;
            this.oldScaleY = this.scale.y;
            this.visible = true;
            this.animating = true;
            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }
            this.scale.x = scaleX,
                this.scale.y = scaleY,
                this.alpha = 0,
                this.x = this.x;
            this.y = this.y;
            this.interactive = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: this.oldScaleX,
                scaleY: this.oldScaleY,
                alpha: 1,
                x: this.antX,
                y: this.antY
            }, 400, createjs.Ease.quadOut)
                .call(function () {
                _this.interactive = true;
                _this.animating = false;
            });
        };
        //calcula
        UIItem.prototype.createHitArea = function () {
            var b = this.getLocalBounds();
            //if (b)
            //    if (this.hitPadding)
            //        hit.beginFill("#000").drawRect(b.x - this.hitPadding, b.y - this.hitPadding, b.width + this.hitPadding, b.height + this.hitPadding);
            //    else
            //         hit.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            //TODO. se for texto colocar uma sobra. !
            this.hitArea = new PIXI.Rectangle(b.x, b.y, b.width, b.height);
        };
        return UIItem;
    })(PIXI.Container);
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
        function Button(event, soundId) {
            var _this = this;
            _super.call(this);
            this.enableAnimation = true;
            this.pressed = false;
            this.event = event;
            this.interactive = true;
            this.on("click", this.event);
            this.on("tap", this.event);
            this.on("mousedown", function (event) { _this.onPress(event); });
            this.on("touchstart", function (event) { _this.onPress(event); });
            this.on("touchend", function (event) { _this.onOut(event); });
            this.on("mouseup", function (event) { _this.onOut(event); });
            this.on("mouseupoutside", function (event) { _this.onOut(event); });
            this.on("touchendoutside", function (event) { _this.onOut(event); });
            this.soundId = soundId;
        }
        Button.setDefaultSoundId = function (soundId) {
            this.DefaultSoundId = soundId;
        };
        Button.prototype.returnStatus = function () {
            if (!this.pressed) {
                this.scale.x = this.originalScaleX;
                this.scale.y = this.originalScaleY;
            }
        };
        Button.prototype.onOut = function (Event) {
            if (this.pressed) {
                this.pressed = false;
                this.set({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 });
                createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 200, createjs.Ease.backOut);
            }
        };
        Button.prototype.onPress = function (Event) {
            var _this = this;
            this.pressed = true;
            if (!this.enableAnimation)
                return;
            if (this.originalScaleX == null) {
                this.originalScaleX = this.scaleX;
                this.originalScaleY = this.scaleY;
            }
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(function () {
                if (!_this.pressed) {
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
            _super.call(this, event, soundId);
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
            this.background.pivot.x = this.width / 2;
            this.background.pivot.y = this.height / 2;
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
            this.text = new PIXI.Text(text, { font: font, fill: color, align: "center", textBaseline: "middle" });
            //createHitArea
            if (background == null) {
                this.width = this.text.getBounds().width * 1.5;
                this.height = this.text.getBounds().height * 1.5;
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
            this.bitmapText.pivot.x = this.bitmapText.textWidth / 2;
            this.bitmapText.pivot.y = this.bitmapText.textHeight / 2;
            this.createHitArea();
        }
        return BitmapTextButton;
    })(ImageButton);
    gameui.BitmapTextButton = BitmapTextButton;
    var IconTextButton = (function (_super) {
        __extends(IconTextButton, _super);
        function IconTextButton(icon, text, font, color, background, event, soundId, align) {
            var _this = this;
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            if (align === void 0) { align = "center"; }
            this.align = align;
            _super.call(this, text, font, color, background, event, soundId);
            //loads icon Image
            this.icon = gameui.AssetsManager.getBitmap(icon);
            this.addChild(this.icon);
            this.text.style.align = "left";
            if (this.icon.getBounds())
                this.icon.pivot.y = this.icon.getBounds().height / 2;
            else if (this.icon["image"])
                this.icon["image"].onload = function () {
                    _this.icon.pivot.y = _this.icon.getBounds().height / 2;
                };
            this.updateLabel(text);
            this.createHitArea();
        }
        IconTextButton.prototype.updateLabel = function (value) {
            this.text.text = value;
            if (!this.icon.getBounds())
                return;
            switch (this.align) {
                case "center":
                    this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getBounds().width) / 2;
                    this.text.x = this.icon.x + this.icon.getBounds().width + 10;
                    break;
                case "left":
                    this.icon.x = -this.width / 2 + 80;
                    this.text.x = -this.width / 2 + 80 + this.icon.getBounds().width + 100;
                    break;
            }
        };
        IconTextButton.prototype.centralizeIcon = function () {
        };
        return IconTextButton;
    })(TextButton);
    gameui.IconTextButton = IconTextButton;
    var IconBitmapTextButton = (function (_super) {
        __extends(IconBitmapTextButton, _super);
        function IconBitmapTextButton(icon, text, font, background, event, soundId, align) {
            var _this = this;
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            if (align === void 0) { align = "center"; }
            this.align = align;
            _super.call(this, text, font, background, event, soundId);
            //loads icon Image
            this.icon = gameui.AssetsManager.getBitmap(icon);
            this.addChild(this.icon);
            if (this.icon.getBounds())
                this.icon.pivot.y = this.icon.getBounds().height / 2;
            else if (this.icon["image"])
                this.icon["image"].onload = function () {
                    _this.icon.pivot.y = _this.icon.getBounds().height / 2;
                };
            this.updateLabel(text);
            this.createHitArea();
        }
        IconBitmapTextButton.prototype.updateLabel = function (value) {
            this.bitmapText.text = value;
            if (!this.icon.getBounds())
                return;
            switch (this.align) {
                case "center":
                    this.icon.x = -(this.icon.getBounds().width + 10 + this.bitmapText.getBounds().width) / 2;
                    this.bitmapText.x = this.icon.x + this.icon.getBounds().width + 10;
                    break;
                case "left":
                    this.icon.x = -this.width / 2 + 80;
                    this.bitmapText.pivot.x = 0;
                    this.bitmapText.x = -this.width / 2 + 80 + this.icon.getBounds().width + 100;
                    break;
            }
        };
        IconBitmapTextButton.prototype.centralizeIcon = function () {
        };
        return IconBitmapTextButton;
    })(BitmapTextButton);
    gameui.IconBitmapTextButton = IconBitmapTextButton;
    var IconButton = (function (_super) {
        __extends(IconButton, _super);
        function IconButton(icon, background, event, soundId) {
            if (icon === void 0) { icon = ""; }
            _super.call(this, icon, "", "", 0xFFFFFF, background, event, soundId);
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
            Cocoon.Utils.setNPOTEnabled(true);
            this.gameScreen = new gameui.GameScreen("gameDiv", defaultWidth, defaultHeight, 60);
            // userData
            this.levelsUserDataManager = new FlipPlus.UserData.LevelsUserDataManager();
            this.settingsUserData = new FlipPlus.UserData.SettingsUserDataManager();
            this.coinsData = new FlipPlus.UserData.Coins();
            this.storyData = new FlipPlus.UserData.Story();
            this.timersData = new FlipPlus.UserData.Timers();
            // load options
            gameui.AudiosManager.setSoundVolume(this.settingsUserData.getSoundfx());
            gameui.AudiosManager.setMusicVolume(this.settingsUserData.getMusic());
            // game service
            this.gameServices = new FlipPlus.GameServices();
            // analytics
            this.analytics = new Analytics();
            this.analytics.logGameStart();
            //managers
            this.projectManager = new FlipPlus.Levels.ProjectManager(levelsData, this.levelsUserDataManager);
            this.actionLevelsManager = new FlipPlus.Levels.ActionLevelsManager(ActionLevelsData, this.levelsUserDataManager);
            //go to First Screen
            this.loadingScreen = new FlipPlus.Menu.Loading();
            this.gameScreen.switchScreen(this.loadingScreen);
            this.loadingScreen.loaded = function () {
                if (levelCreatorMode == true && !levelCreatorTestMode) {
                    _this.toLevelCreator();
                }
                else
                    _this.showMainScreen();
            };
            // give 10 coins to user first time
            if (!this.storyData.getStoryPlayed("coins")) {
                this.storyData.setStoryPlayed("coins");
                this.coinsData.setAmount(10);
            }
            // back callback
            // add back button callback
            Cocoon.App.exitCallback(function () {
                return _this.gameScreen.sendBackButtonEvent();
            });
            var ps = this.projectManager.getAllProjects();
            ps[0].UserData.unlocked = true;
            ps[1].UserData.unlocked = true;
            ps[2].UserData.unlocked = true;
            // for (var p in ps) {
            //     ps[p].UserData.unlocked = true;
            //     ps[p].UserData.stars=0;
            //     for (var l in ps[p].levels) {
            //         ps[p].levels[l].userdata.solved = false;
            //         ps[p].levels[l].userdata.unlocked = true;
            //
            //     }
            // }
        };
        FlipPlusGame.initializeAds = function () {
            var _this = this;
            Cocoon.Ad.interstitial.on("ready", function () {
                // tells that a ads s loaded
                Cocoon.Ad.interstitial["loaded"] = true;
                // once a ads is loaded so it is avaliable for this app.
                _this.storyData.setStoryPlayed("ads_avaliable");
                console.log("ads loaded");
            });
            console.log("ads initialized");
            Cocoon.Ad.loadInterstitial();
        };
        FlipPlusGame.initializeSocial = function () {
            try {
                var os = "web";
                if (Cocoon.Device.getDeviceInfo())
                    os = Cocoon.Device.getDeviceInfo().os;
                if (os == "windows")
                    return;
                //initialize the Facebook Service the same way as the Official JS SDK
                if (navigator.onLine) {
                    var fb = Cocoon.Social.Facebook;
                    fb.init({ appId: fbAppId });
                    this.FBSocialService = fb.getSocialInterface();
                }
            }
            catch (e) { }
        };
        // ----------------------------- Game Methods ---------------------------------------------//
        FlipPlusGame.toLevelCreator = function (level, callback) {
            if (!level) {
                level = new FlipPlus.Levels.Level();
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
            //if (project == null) return;
            var projects = this.projectManager.getAllProjects();
            //create a new levels menu, if needed
            if (this.levelsMenu == undefined)
                this.levelsMenu = new FlipPlus.Menu.WorkshopMenu(this.projectManager);
            //switch screens
            this.gameScreen.switchScreen(this.levelsMenu, parameters);
        };
        FlipPlusGame.showActionLevelsMenu = function () {
            //create a new levels menu, if needed
            if (this.actionlevelsMenu == undefined)
                this.actionlevelsMenu = new FlipPlus.Menu.ActionlevelsMenu(this.actionLevelsManager);
            //switch screens
            this.gameScreen.switchScreen(this.actionlevelsMenu);
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
            var timeout = bonusData[bonusId].timeOut;
            if (FlipPlusGame.storyData.getStoryPlayed("halfTime"))
                timeout = timeout / 2;
            this.timersData.setTimer(bonusId, timeout);
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
                    return new FlipPlus.GamePlay.LevelPuzzle(level);
                case "moves":
                case "flip":
                case "combo":
                    return new FlipPlus.GamePlay.LevelTaps(level);
                case "tutorial":
                    return new FlipPlus.GamePlay.Tutorial(level);
                case "time":
                    return new FlipPlus.GamePlay.LevelTimeAttack(level);
                case "action":
                    return new FlipPlus.GamePlay.LevelTimeAttack(level);
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
        FlipPlusGame.showMainScreen = function () {
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
        FlipPlusGame.endGame = function () {
        };
        FlipPlusGame.showOptions = function (previousScreen) {
            this.gameScreen.switchScreen(new FlipPlus.Menu.OptionsMenu(previousScreen));
        };
        // ---------------------------- license --------------------------------------------------//
        FlipPlusGame.isFree = function () {
            return true;
        };
        return FlipPlusGame;
    })();
    FlipPlus.FlipPlusGame = FlipPlusGame;
})(FlipPlus || (FlipPlus = {}));
window.onload = function () {
    FlipPlus.FlipPlusGame.initializeGame();
};
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
        var LevelsUserDataManager = (function () {
            // ----------------------- Game Data ----------------------------------------------------------
            function LevelsUserDataManager() {
                this.projectKey = "Flipp_userData";
                this.loadFromStorage();
            }
            //Adds user data to a project
            LevelsUserDataManager.prototype.addUserData = function (botLevelSet) {
                for (var p = 0; p < botLevelSet.length; p++) {
                    var project = botLevelSet[p];
                    var pd = this.getProjectData(project.name);
                    project.UserData = pd;
                    for (var l = 0; l < botLevelSet[p].levels.length; l++) {
                        var level = botLevelSet[p].levels[l];
                        var ld = this.getLevelData(level.name);
                        level.userdata = ld;
                    }
                }
            };
            //gets user data from storage and store it to a level data
            LevelsUserDataManager.prototype.getLevelData = function (LevelId) {
                var key = LevelId;
                var value = this.levelsSavedData[key];
                if (value == null) {
                    var ud = new FlipPlus.Levels.LevelUserData();
                    ud.solved = false;
                    ud.skip = false;
                    ud.unlocked = false;
                    return ud;
                }
                return value;
            };
            //gets user data from storage and store it to a project data
            LevelsUserDataManager.prototype.getProjectData = function (botId) {
                var key = botId;
                var value = this.levelsSavedData[key];
                if (value == null) {
                    var ud = new FlipPlus.Levels.ProjectUserData();
                    ud.unlocked = false;
                    ud.percent = 0;
                    ud.complete = false;
                    return ud;
                }
                else
                    return value;
            };
            //updates storage with curret level user data 
            LevelsUserDataManager.prototype.saveLevelData = function (level) {
                var key = level.name;
                this.levelsSavedData[key] = level.userdata;
                this.saveToStorage();
            };
            //updates storage with curret project user data 
            LevelsUserDataManager.prototype.saveProjectData = function (botLevelSet) {
                var key = botLevelSet.name;
                this.levelsSavedData[key] = botLevelSet.UserData;
                this.saveToStorage();
            };
            LevelsUserDataManager.prototype.saveToStorage = function () {
                if (this.levelsSavedData) {
                    var str = JSON.stringify(this.levelsSavedData);
                    localStorage.setItem(this.projectKey, str);
                }
            };
            LevelsUserDataManager.prototype.loadFromStorage = function () {
                var data = localStorage.getItem(this.projectKey);
                if (data)
                    this.levelsSavedData = JSON.parse(data);
                else
                    this.levelsSavedData = {};
            };
            //-------------------------------------------------------------------------------------------
            //clear all storage data
            LevelsUserDataManager.prototype.clearAllData = function () {
                localStorage.clear();
            };
            return LevelsUserDataManager;
        })();
        UserData.LevelsUserDataManager = LevelsUserDataManager;
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var UserData;
    (function (UserData) {
        // Class
        var SettingsUserDataManager = (function () {
            function SettingsUserDataManager() {
                this.soundFX = 1;
                this.music = 1;
                this.soundFX = parseInt(localStorage.getItem("sfx"));
                this.music = parseInt(localStorage.getItem("mus"));
                if (isNaN(this.soundFX))
                    this.soundFX = 1;
                if (isNaN(this.music))
                    this.music = 1;
            }
            SettingsUserDataManager.prototype.getMusic = function () { return this.music; };
            SettingsUserDataManager.prototype.getSoundfx = function () { return this.soundFX; };
            SettingsUserDataManager.prototype.setSoundfX = function (value) {
                localStorage.setItem("sfx", value.toString());
                this.soundFX = value;
            };
            SettingsUserDataManager.prototype.setMusic = function (value) {
                localStorage.setItem("mus", value.toString());
                this.music = value;
            };
            return SettingsUserDataManager;
        })();
        UserData.SettingsUserDataManager = SettingsUserDataManager;
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
                var _this = this;
                _super.call(this);
                this.itemsFunctions = {};
                this.itemTimes = new Object();
                this.clicks = 0;
                // Store level data;
                this.levelData = leveldata;
                // initializate level Model
                this.levelLogic = new GamePlay.Logic.Level(leveldata);
                // creates all screen objects
                this.createScene(leveldata);
                // incremente played times
                if (!this.levelData.userdata.playedTimes)
                    this.levelData.userdata.playedTimes = 0;
                this.levelData.userdata.playedTimes++;
                this.onback = function () {
                    if (_this.paused)
                        _this.unPauseGame();
                    else
                        _this.pauseGame();
                };
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
                this.overlay.addChild(this.popup);
                this.popupHelper = new FlipPlus.Menu.View.PopupHelper();
                this.overlay.addChild(this.popupHelper);
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
                gameui.AudiosManager.playSound("Power Up");
            };
            LevelScreen.prototype.addBackground = function () {
                var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
                this.content.addChild(bg);
                bg.y = -339;
                bg.scale.y = 1.3310546875;
                bg.tint = 0x646464;
            };
            LevelScreen.prototype.initializeOverlays = function () {
                var _this = this;
                //intialize  menu overlay
                this.gameplayMenu = new GamePlay.Views.GamePlayMenu();
                this.gameplayMenu.y = -100;
                this.gameplayMenu.x = this.gameplayMenu.pivot.x = 1500;
                this.footer.addChild(this.gameplayMenu);
                //level control
                this.gameplayMenu.addEventListener("pause", function () { _this.pauseGame(); });
                this.gameplayMenu.addEventListener("unpause", function () { _this.unPauseGame(); });
                this.gameplayMenu.addEventListener("restart", function () { _this.restart(); });
                this.gameplayMenu.addEventListener("back", function () { _this.exit(); });
                // parts Indicator
                this.coinsIndicator = new FlipPlus.Menu.View.CoinsIndicator(function () {
                    FlipPlus.FlipPlusGame.showShopMenu(_this);
                });
                this.header.addChild(this.coinsIndicator);
                this.coinsIndicator.x = defaultWidth / 2;
                //upper staus area
                if (FlipPlus.FlipPlusGame.projectManager.getCurrentProject() != undefined) {
                    var levels = FlipPlus.FlipPlusGame.projectManager.getCurrentProject().levels;
                    this.statusArea = new GamePlay.Views.StatusArea();
                    this.statusArea.y += 80;
                    this.statusArea.setText1("");
                    this.statusArea.setText3("");
                    this.header.addChild(this.statusArea);
                }
                //pause menu
                this.pauseMenu = new FlipPlus.Menu.View.PauseMenu();
                this.pauseMenu.x = defaultWidth / 2;
                this.pauseMenu.y = defaultHeight / 2;
                this.pauseMenu.addEventListener("continue", function () { _this.unPauseGame(); });
                this.pauseMenu.addEventListener("restart", function () { _this.restart(); });
                this.pauseMenu.addEventListener("skip", function () { _this.unPauseGame(); _this.gameplayMenu.fadeOut(); _this.useItem("skip"); });
                this.pauseMenu.addEventListener("leave", function () { _this.exit(); });
                this.content.addChild(this.pauseMenu);
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
            LevelScreen.prototype.exit = function () {
                FlipPlus.FlipPlusGame.analytics.logLevelRestart(this.levelData.name, Date.now() - this.startedTime, this.clicks);
                FlipPlus.FlipPlusGame.exitLevel();
                gameui.AudiosManager.playSound("Power Down");
            };
            LevelScreen.prototype.restart = function () {
                FlipPlus.FlipPlusGame.analytics.logLevelRestart(this.levelData.name, Date.now() - this.startedTime, this.clicks);
                FlipPlus.FlipPlusGame.replayLevel();
                gameui.AudiosManager.playSound("Power Down");
            };
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
                var projectCompleted = FlipPlus.FlipPlusGame.projectManager.getCurrentProject().UserData.complete;
                FlipPlus.FlipPlusGame.projectManager.completeLevel(this.levelData);
                // send achievement if project was completed
                if (!projectCompleted && FlipPlus.FlipPlusGame.projectManager.getCurrentProject().UserData.complete)
                    FlipPlus.FlipPlusGame.gameServices.submitAchievent("ACH_" + FlipPlus.FlipPlusGame.projectManager.getCurrentProject().name);
                //change screen and animate.
                if (messageText)
                    this.textEffext.showtext(StringResources.gp_finishPuzzle, 2000, 1200);
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
                //animate to out
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
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
            LevelScreen.prototype.useItem = function (item, parameters, free) {
                //analytics
                FlipPlus.FlipPlusGame.analytics.logUsedItem(item, this.levelData.name);
                // define item value based on how many times it was used on the level
                var price = this.getItemPrice(item);
                // if item is skip and the level was already skipped, then does not waste parts.
                if (item == Items.SKIP && (this.levelData.userdata.skip || this.levelData.userdata.solved))
                    price = 0;
                //if user is able to use this item
                var coinsAmount = FlipPlus.FlipPlusGame.coinsData.getAmount();
                if (free || coinsAmount >= price) {
                    if (!free) {
                        // saves item used information
                        if (!this.itemTimes[item])
                            this.itemTimes[item] = 0;
                        this.itemTimes[item]++;
                        // updates data
                        if (item != Items.HINT)
                            this.usedItem = item;
                        // updates player coins
                        FlipPlus.FlipPlusGame.coinsData.decreaseAmount(price);
                        // animate coins
                        var btx = this.gameplayMenu.getButtonPosition(item);
                        if (btx)
                            this.coinsIndicator.createCoinEffect(btx - 768, this.footer.y - this.header.y - 100, price);
                        else
                            this.coinsIndicator.createCoinEffect(0, 1024 - this.header.y, price);
                        //show text effect
                        this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());
                        //updates Items buttons labels Quantity on footer
                        this.coinsIndicator.updateAmmount(FlipPlus.FlipPlusGame.coinsData.getAmount());
                    }
                    this.gameplayMenu.updateItemsPrice(this.listItemPrices());
                    // use the item
                    switch (item) {
                        case Items.SKIP:
                            this.useItemSkip();
                            break;
                        case Items.SOLVE:
                            this.useItemSolve();
                            break;
                        case Items.HINT:
                            this.useItemHint(parameters);
                            break;
                        case Items.TIME:
                            this.useItemTime();
                            break;
                        case Items.TAP:
                            this.useItemTap();
                            break;
                    }
                    return true;
                }
                else {
                    //show text effect
                    this.textEffext.showtext(StringResources["desc_item_" + item].toUpperCase());
                    this.popup.showtextBuy(StringResources.gp_noMoreSkip, StringResources.gp_noMoreHints, this);
                    return false;
                }
            };
            //skips the level
            LevelScreen.prototype.useItemSkip = function () {
                var _this = this;
                this.boardSprite.mouseEnabled = false;
                this.gameplayMenu.mouseEnabled = false;
                setTimeout(function () {
                    if (_this.levelData.userdata.skip || _this.levelData.userdata.solved)
                        FlipPlus.FlipPlusGame.skipLevel(false);
                    else
                        FlipPlus.FlipPlusGame.skipLevel(true);
                }, 3000);
            };
            //set hint for a block
            LevelScreen.prototype.useItemHint = function (blockId) {
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
                    if (filtredInvertedBlocks.length == 0)
                        return;
                    //randomly select one from the list
                    var index = Math.floor(Math.random() * filtredInvertedBlocks.length);
                    blockId = filtredInvertedBlocks[index];
                    // save used hint on level
                    this.levelData.userdata.hints = this.levelData.userdata.hints || [];
                    this.levelData.userdata.hints.push(blockId);
                    // saves 
                    FlipPlus.FlipPlusGame.levelsUserDataManager.saveLevelData(this.levelData);
                }
                // enablehint for the selected block;
                this.boardSprite.getBlockById(blockId).enableHint();
            };
            //set hint for a solve
            LevelScreen.prototype.useItemSolve = function () {
                this.win(0, 0);
            };
            //ovveridable
            LevelScreen.prototype.useItemTime = function () {
            };
            //ovveridable
            LevelScreen.prototype.useItemTap = function () {
            };
            // #endregion
            // #region Menus ====================================================================================================================
            LevelScreen.prototype.pauseGame = function () {
                var _this = this;
                this.paused = true;
                this.boardSprite.lock();
                var med = defaultWidth / 4;
                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(function () {
                    _this.boardSprite.visible = false;
                });
                this.gameplayMenu.fadeOut();
                this.pauseMenu.fadeIn();
                this.pauseMenu.updateSkipPrice(this.getItemPrice("skip"));
            };
            LevelScreen.prototype.unPauseGame = function () {
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
            };
            LevelScreen.prototype.animatePuzzle = function (parameters) {
                this.boardSprite.x = parameters.x;
                this.boardSprite.y = parameters.y + 2048;
                this.boardSprite.scale.x = parameters.scaleX;
                this.boardSprite.scale.y = parameters.scaleY;
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
                this.coinsIndicator.updateAmmount(FlipPlus.FlipPlusGame.coinsData.getAmount());
                this.gameplayMenu.updateItemsPrice(this.listItemPrices());
                // update hints already used
                if (this.levelData.userdata.hints)
                    for (var h in this.levelData.userdata.hints)
                        this.useItem(Items.HINT, this.levelData.userdata.hints[h], true);
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
        var LevelPuzzle = (function (_super) {
            __extends(LevelPuzzle, _super);
            function LevelPuzzle(levelData) {
                var _this = this;
                _super.call(this, levelData);
                if (levelData.customItems)
                    this.gameplayMenu.addItemsButtons(levelData.customItems);
                else
                    this.gameplayMenu.addItemsButtons([Items.HINT]);
                this.gameplayMenu.addEventListener(Items.SKIP, function (parameter) { _this.useItem(Items.SKIP); });
                this.gameplayMenu.addEventListener(Items.HINT, function (parameter) { _this.useItem(Items.HINT, parameter.parameters); }); //solve this problem
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
            LevelPuzzle.prototype.userInput = function (col, row) {
                _super.prototype.userInput.call(this, col, row);
                this.trySuggestHelp();
            };
            // #region  Helpers ==================================================================================================================
            // user helper
            LevelPuzzle.prototype.trySuggestHelp = function () {
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
            LevelPuzzle.prototype.showRestartMessage = function () {
                this.popupHelper.showRestartMessage();
            };
            // show a message asking for user to skip
            LevelPuzzle.prototype.showSkipMessage = function () {
                var _this = this;
                this.popupHelper.showItemMessage(Items.SKIP, this.getItemPrice(Items.SKIP), function () { _this.useItem(Items.SKIP); }, function () { }, "menu/imskip");
            };
            return LevelPuzzle;
        })(GamePlay.LevelScreen);
        GamePlay.LevelPuzzle = LevelPuzzle;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
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
                        levelData = new FlipPlus.Levels.Level();
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
                var levelData = new FlipPlus.Levels.Level();
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
        })(GamePlay.LevelPuzzle);
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
        })(GamePlay.LevelPuzzle);
        GamePlay.LevelCreator2 = LevelCreator2;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var LevelTaps = (function (_super) {
            __extends(LevelTaps, _super);
            function LevelTaps(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;
                //threat user input
                this.loosing = false;
                if (this.levelData.puzzlesToSolve > 1)
                    this.gameplayMenu.addItemsButtons([Items.SOLVE]);
                //adds buttons and items
                this.gameplayMenu.addItemsButtons([Items.TAP, Items.HINT]);
                this.gameplayMenu.addEventListener(Items.TAP, function () { _this.useItem(Items.TAP); });
                this.gameplayMenu.addEventListener(Items.SOLVE, function () { _this.useItem(Items.SOLVE); });
                this.gameplayMenu.addEventListener(Items.HINT, function () { _this.useItem(Items.HINT); });
                this.gameplayMenu.addEventListener(Items.SKIP, function () { _this.useItem(Items.SKIP); });
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
                //this.popup.showTimeAttack(StringResources.gp_mv_Popup1Title, StringResources.gp_mv_Popup1Text1, this.levelData.moves.toString(), this.levelData.puzzlesToSolve.toString(), StringResources.gp_mv_Popup1Text2, StringResources.gp_mv_Popup1Text3); 
                this.popup.showTaps(this.levelData.moves.toString());
                this.statusArea.setMode("moves");
                this.statusArea.setText3(this.moves.toString());
            }
            LevelTaps.prototype.userInput = function (col, row) {
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
                                    _this.message.showtext(StringResources.gp_mv_noMoreMoves);
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
            LevelTaps.prototype.win = function (col, row) {
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
            LevelTaps.prototype.randomBoard = function (minMoves, maxMoves) {
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
            LevelTaps.prototype.useItemTouch = function () {
                this.moves += 2;
            };
            return LevelTaps;
        })(GamePlay.LevelScreen);
        GamePlay.LevelTaps = LevelTaps;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var LevelTimeAttack = (function (_super) {
            __extends(LevelTimeAttack, _super);
            function LevelTimeAttack(levelData) {
                var _this = this;
                _super.call(this, levelData);
                this.currentPuzzle = 1;
                this.puzzlesToSolve = 0;
                this.gameplayMenu.addItemsButtons([Items.SOLVE, Items.HINT]);
                this.gameplayMenu.addEventListener(Items.SKIP, function () { _this.useItem(Items.SKIP); });
                this.gameplayMenu.addEventListener(Items.TIME, function () { _this.useItem(Items.TIME); });
                this.gameplayMenu.addEventListener(Items.SOLVE, function () { _this.useItem(Items.SOLVE); });
                this.gameplayMenu.addEventListener(Items.HINT, function () { _this.useItem(Items.HINT); });
                this.puzzlesToSolve = levelData.puzzlesToSolve;
                this.currentTime = levelData.time;
                this.randomBoard(levelData.randomMinMoves, levelData.randomMaxMoves);
                this.statusArea.setMode(Items.TIME);
                this.statusArea.setText3(levelData.time.toString());
                this.createsTimer();
            }
            LevelTimeAttack.prototype.createsTimer = function () {
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
                            _this.useItem(Items.TIME);
                            _this.boardSprite.mouseEnabled = true;
                            _this.timer.start();
                        }, function () {
                            gameui.AudiosManager.playSound("Power Down");
                            _this.statusArea.setText3(StringResources.gp_pz_statusEnd);
                            _this.message.showtext(StringResources.gp_pz_timeUP);
                            _this.loose();
                        });
                    }
                    if (_this.currentTime == 4) {
                        // play sound
                        gameui.AudiosManager.playSound("Ticking Clock");
                    }
                });
            };
            LevelTimeAttack.prototype.desactivate = function () {
                this.timer.stop();
            };
            //Overriding methods.
            LevelTimeAttack.prototype.win = function (col, row) {
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
            LevelTimeAttack.prototype.pauseGame = function () {
                _super.prototype.pauseGame.call(this);
                this.timer.stop();
            };
            LevelTimeAttack.prototype.unPauseGame = function () {
                _super.prototype.unPauseGame.call(this);
                this.timer.start();
            };
            LevelTimeAttack.prototype.randomBoard = function (minMoves, maxMoves) {
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
            LevelTimeAttack.prototype.useItemTime = function () {
                this.currentTime += 10;
            };
            LevelTimeAttack.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this);
                this.boardSprite.visible = false;
                //shows popup
                this.popup.showTimeAttack(this.levelData.time.toString(), this.levelData.puzzlesToSolve.toString());
                this.popup.addEventListener("onclose", function () {
                    _this.boardSprite.visible = true;
                    //shows puzzle
                    if (parameters)
                        _this.animatePuzzle(parameters);
                    _this.timer.start();
                });
            };
            return LevelTimeAttack;
        })(GamePlay.LevelScreen);
        GamePlay.LevelTimeAttack = LevelTimeAttack;
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
                    var text = StringResources[step.text];
                    var title = StringResources[step.title];
                    this.popup.showtext(title, text);
                    var listener = this.popup.once("onclose", function () {
                        _this.playNextTurorialStep();
                    });
                }
                //create for menu item step
                if (step.item) {
                    this.boardSprite.tutorialLockBlocks();
                    this.gameplayMenu.tutorial_HighlightItem(step.item, step.parameter);
                    var listener2 = this.gameplayMenu.once(step.item, function () {
                        _this.boardSprite.tutorialRelease();
                        _this.gameplayMenu.tutorial_unlockAllButtons();
                        _this.playNextTurorialStep();
                    });
                }
                //create for block click item
                if (step.click != undefined) {
                    this.boardSprite.tutorialHighlightBlocks(step.click);
                    this.gameplayMenu.tutorial_lockAllButtons();
                    var listener3 = this.boardSprite.once("ontutorialclick", function () {
                        _this.playNextTurorialStep();
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
        })(GamePlay.LevelPuzzle);
        GamePlay.Tutorial = Tutorial;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Logic;
        (function (Logic) {
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
            Logic.Block = Block;
        })(Logic = GamePlay.Logic || (GamePlay.Logic = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Logic;
        (function (Logic) {
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
                            var b = new Logic.Block(col, row);
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
            Logic.Board = Board;
        })(Logic = GamePlay.Logic || (GamePlay.Logic = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
/// <reference path="Board.ts" />
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Logic;
        (function (Logic) {
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
                    this.board = new Logic.Board(leveldata.width, leveldata.height);
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
            Logic.Level = Level;
        })(Logic = GamePlay.Logic || (GamePlay.Logic = {}));
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
                    this.highlight.scale.x = this.highlight.scale.y = 1.05;
                    this.highlight.visible = false;
                    //add Container for sprites
                    this.container = new PIXI.Container();
                    this.container.pivot.x = this.container.pivot.y = BlockSprite.defaultBlockSize / 2;
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
                    var hit = new PIXI.Graphics().beginFill(0).drawRect(0, 0, BlockSprite.defaultBlockSize, BlockSprite.defaultBlockSize);
                    /// Check this.hitArea = hit;
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
                        newStateImage.scale.y = 0;
                        newStateImage.scale.x = 0;
                        newStateImage.visible = true;
                        createjs.Tween.removeTweens(newStateImage);
                        createjs.Tween.get(newStateImage).wait(100).to({ scaleY: 1, scaleX: 1 }, 200, createjs.Ease.backOut);
                    }
                    if (oldStateImage != null) {
                        createjs.Tween.removeTweens(oldStateImage);
                        createjs.Tween.get(oldStateImage).to({ scaleY: 0, scaleX: 0 }, 100, createjs.Ease.cubicIn).call(function () { oldStateImage.visible = false; });
                        oldStateImage.scale.y = 1;
                        oldStateImage.scale.x = 1;
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
                                img.scale.x = img.scale.y = 1.3;
                            this.assetsImages[manifest[state].name].push(img);
                        }
                    }
                    //Modificators
                    //load hint symbol
                    this.hintimage = gameui.AssetsManager.getBitmap("puzzle/icon_hint");
                    this.container.addChild(this.hintimage);
                    this.hintimage.pivot.x = 139 / 2;
                    this.hintimage.pivot.y = 148 / 2;
                    this.hintimage.x = this.hintimage.y = 90;
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
                    this.memoryImage.scale.x = this.memoryImage.scale.y = 1.1;
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
                    asset.pivot.x = BlockSprite.defaultBlockSize / 2;
                    asset.pivot.y = BlockSprite.defaultBlockSize / 2;
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
                    createjs.Tween.removeTweens(this.container);
                    this.highlight.visible = true;
                    this.highlight.alpha = 0;
                    createjs.Tween.get(this.highlight).to({ alpha: 1 }, 200, createjs.Ease.quadOut);
                    createjs.Tween.get(this.container).to({ scaleX: 0.90, scaleY: 0.90 }, 200, createjs.Ease.quadOut);
                };
                BlockSprite.prototype.animatePreInvertRelease = function () {
                    var _this = this;
                    createjs.Tween.removeTweens(this.highlight);
                    createjs.Tween.removeTweens(this.container);
                    this.container.scale.x = 0.8,
                        this.container.scale.y = 0.8;
                    createjs.Tween.removeTweens(this.highlight);
                    createjs.Tween.get(this.highlight).to({ alpha: 0 }, 400, createjs.Ease.backOut).call(function () { _this.highlight.visible = false; });
                    createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.backOut);
                };
                BlockSprite.prototype.applyBounceEffect = function (delay) {
                    var _this = this;
                    createjs.Tween.removeTweens(this.container);
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
            })(PIXI.Container);
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
                    this.pivot.x = boardWidth / 2;
                    this.pivot.y = boardHeight / 2;
                    //load click indicator
                    this.tutorialIndiatcor = gameui.AssetsManager.getMovieClip("touch");
                    this.tutorialIndiatcor.pivot.x = this.tutorialIndiatcor.pivot.y = -55;
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
                            blockSprite.interactive = true;
                            //Add event listener to the boardSprite
                            blockSprite.on("mousedown", function (event) { _this.presdown(event); });
                            blockSprite.on("touchstart", function (event) { _this.presdown(event); });
                            blockSprite.on("touchend", function (event) { _this.tap(event); });
                            blockSprite.on("mouseup", function (event) { _this.tap(event); });
                            blockSprite.on("mouseupoutside", function (event) { _this.pressRelease(event); });
                            blockSprite.on("touchendoutside", function (event) { _this.pressRelease(event); });
                        }
                    }
                };
                BoardSprite.prototype.presdown = function (event) {
                    if (this.locked)
                        return;
                    event.target.pressed = true;
                    this.preInvertCross(event.target);
                };
                BoardSprite.prototype.tap = function (event) {
                    if (!event.target.pressed)
                        return;
                    if (this.locked)
                        return;
                    event.target.pressed = false;
                    this.preInvertRelease(event.target);
                    var b = event.target;
                    this.callback(b.col, b.row);
                    // play a Radom Sounds
                    var randomsound = Math.ceil(Math.random() * 4);
                    gameui.AudiosManager.playSound("Mecanical Click" + randomsound, true);
                    //tutorialrelease
                    if (b.tutorialHighLighted) {
                        this.tutorialRelease();
                        this.emit("ontutorialclick");
                    }
                };
                BoardSprite.prototype.pressRelease = function (event) {
                    if (!event.target.pressed)
                        return;
                    event.target.pressed = false;
                    this.preInvertRelease(event.target);
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
            })(PIXI.Container);
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
            var GamePlayMenu = (function (_super) {
                __extends(GamePlayMenu, _super);
                function GamePlayMenu() {
                    _super.call(this);
                    this.xstart = 320;
                    this.xstep = 600;
                    this.currentItem = 0;
                    this.items = [];
                    this.createGamePlayMenu();
                    this.addTutorialIndicator();
                    this.buttons = new Object();
                    this.parameters = new Object();
                }
                //adds tutorial touch indicator
                GamePlayMenu.prototype.addTutorialIndicator = function () {
                    this.tutorial_highlightSprite = gameui.AssetsManager.getMovieClip("touch");
                    this.tutorial_highlightSprite.visible = false;
                    this.tutorial_highlightSprite.mouseEnabled = false;
                    this.addChild(this.tutorial_highlightSprite);
                };
                //creates all menu butons
                GamePlayMenu.prototype.createGamePlayMenu = function () {
                    var _this = this;
                    this.width = 2 * defaultWidth;
                    this.height = 0;
                    var pauseBt = new gameui.ImageButton("puzzle/btpause", function () { _this.emit("pause"); });
                    this.addChild(pauseBt),
                        pauseBt.x = 1360;
                };
                // ================ Add Items ==========================================
                // add alls items buttons
                GamePlayMenu.prototype.addItemsButtons = function (ItemId) {
                    var _this = this;
                    for (var i in ItemId) {
                        this.items.push(ItemId[i]);
                        var bt = new Views.ItemButton(ItemId[i], function (buttonId) {
                            var parameter;
                            if (_this.parameters)
                                parameter = _this.parameters[buttonId];
                            _this.emit(buttonId, { parameters: parameter });
                            _this.parameters[buttonId] = null;
                        });
                        this.addChild(bt);
                        bt.x = this.xstart + this.xstep * this.currentItem;
                        this.buttons[ItemId[i]] = bt;
                        this.currentItem++;
                    }
                };
                // Update all items prices
                GamePlayMenu.prototype.updateItemsPrice = function (prices) {
                    for (var item in prices)
                        if (this.buttons[item])
                            this.buttons[item].updatePrice(prices[item]);
                };
                // 
                GamePlayMenu.prototype.getButtonPosition = function (item) {
                    if (!this.buttons[item])
                        return null;
                    return this.buttons[item].x;
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
                    this.bg3 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle2");
                    this.bg3.scale.x = -1;
                    this.bg1.x = defaultWidth * 0.01;
                    this.bg3.x = defaultWidth * 0.98;
                    this.bg1.y = 30;
                    this.bg3.y = 30;
                    this.addChild(this.bg1);
                    this.addChild(this.bg3);
                    //Icons
                    this.rightIcon = new PIXI.Container();
                    var rightIconContainer = new PIXI.Container();
                    this.iconepuzzle = gameui.AssetsManager.getBitmap("puzzle/iconepuzzle");
                    this.iconemoves = gameui.AssetsManager.getBitmap("puzzle/iconemoves");
                    this.iconetime = gameui.AssetsManager.getBitmap("puzzle/iconetime");
                    this.iconepuzzle.x = defaultWidth * 0.01 + 3;
                    rightIconContainer.x = defaultWidth * 0.98;
                    rightIconContainer.scale.x = -1;
                    this.iconepuzzle.y = 33;
                    rightIconContainer.y = 33;
                    this.rightIcon.pivot.x = this.rightIcon.x = this.iconemoves.getLocalBounds().width / 2;
                    this.rightIcon.pivot.y = this.rightIcon.y = this.iconemoves.getLocalBounds().height / 2;
                    this.addChild(this.iconepuzzle);
                    this.rightIcon.addChild(this.iconemoves);
                    this.rightIcon.addChild(this.iconetime);
                    rightIconContainer.addChild(this.rightIcon);
                    this.addChild(rightIconContainer);
                    //Text
                    this.text1 = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");
                    this.text3 = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");
                    this.text1.x = defaultWidth * 0.13;
                    this.text3.x = defaultWidth * 0.79;
                    //this.text1.textAlign = this.text2.textAlign = this.text3.textAlign = "center";
                    this.text1.y = this.text3.y = 55;
                    this.addChild(this.text1);
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
                StatusArea.prototype.setText1 = function (text) {
                    this.bg1.visible = !(text == "" || text == null);
                    this.text1.text = text;
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
            })(PIXI.Container);
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
                //this.addFooter(itemsArray);
                // add parts indicator
                this.partsIndicator = new FlipPlus.Menu.View.CoinsIndicator();
                this.header.addChild(this.partsIndicator);
                this.partsIndicator.x = defaultWidth / 2;
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
                //this.view.setChildIndex(this.content, this.view.children.length - 1); 
            }
            //add Scene objects to the view
            BonusScreen.prototype.addScene = function (bonusId) {
                //adds Background
                var background = gameui.AssetsManager.getBitmap(bonusId + "/back");
                background.scale.x = background.scale.y = 2;
                background.name = "background";
                this.background.addChild(background);
                //adds header
                this.header.addChild(gameui.AssetsManager.getBitmap(bonusId + "/header"));
                //adds footer
                var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
                this.footer.addChild(footer);
                footer.y = -291;
                var titleText = gameui.AssetsManager.getBitmapText(StringResources[bonusId + "_title"].toUpperCase(), "fontWhite");
                titleText.pivot.x = titleText.textWidth / 2;
                titleText.x = defaultWidth / 2;
                titleText.y = -170;
                //titleText.textBaseline = "middle";
                this.footer.addChild(titleText);
            };
            //adds objects to the view <<interface>>
            BonusScreen.prototype.addObjects = function () { };
            //creates a footer
            BonusScreen.prototype.addFooter = function (itemsArray) {
                this.footerContainer = new PIXI.Container();
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
                    itemObj.pivot.x = itemObj.getBounds().width / 2;
                    itemObj.pivot.y = itemObj.getBounds().height / 2;
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
                    var textObj = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textObj.y = 120;
                    textObj.x = defaultWidth / itemsArray.length * i + 190;
                    textObj.name = itemId + "_text";
                    this.footerTexts[itemId] = textObj;
                    this.footerContainer.addChild(textObj);
                }
                this.footer.addChild(this.footerContainer);
            };
            //updates all footer labels 
            BonusScreen.prototype.updatePartsAmmount = function () {
                var qt = FlipPlus.FlipPlusGame.coinsData.getAmount();
                this.partsIndicator.updateAmmount(qt);
            };
            //animate a display object to the menu
            BonusScreen.prototype.animateItemToHeader = function (itemObj, itemId) {
                var _this = this;
                if (itemId === void 0) { itemId = "coin"; }
                if (itemId == "2coin" || itemId == "3coin")
                    itemId = "coin";
                var footerItem = this.partsIndicator.getChildByName("icon");
                if (footerItem && itemObj.parent) {
                    var startPoint = itemObj.position;
                    var endPoint = itemObj.parent.toLocal(footerItem.parent.toGlobal(footerItem.position));
                    var startGlobal = this.content.toLocal(itemObj.pivot, itemObj);
                    var endGlobal = this.content.toLocal(footerItem.pivot, footerItem);
                    // cast effect
                    this.fx.castEffect(startGlobal.x, startGlobal.y - 50, "Bolinhas", 3);
                    // Animate item
                    createjs.Tween.get(itemObj).
                        to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                        to({ x: endPoint.x, y: endPoint.y }, 700, createjs.Ease.quadInOut).
                        call(function () {
                        _this.updatePartsAmmount();
                        // cast effect
                        _this.fx.castEffect(endGlobal.x, endGlobal.y, "Bolinhas", 3);
                        //play Sound
                        gameui.AudiosManager.playSound("Correct Answer 2");
                    }).to({ alpha: 0 }, 300);
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
                var ammount = 1;
                if (itemId == "2coin")
                    ammount = 2;
                if (itemId == "3coin")
                    ammount = 3;
                if (itemId == "2coin" || itemId == "3coin")
                    itemId = "coin";
                FlipPlus.FlipPlusGame.coinsData.increaseAmount(ammount);
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
                this.updatePartsAmmount();
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
                bg.scale.x = bg.scale.y = 4;
            };
            BonusBarrel.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);
                this.setNewGame();
                this.popup.showtext(StringResources.b1_popup1Ttitle, StringResources.b1_popup1Text);
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
                var barrelsContainer = new PIXI.Container();
                //adds 3 barrels
                for (var b = 0; b < barrelsCount; b++) {
                    var barrel = new gameui.Button();
                    barrel.on("mousedown", function (event) { _this.barrelTap(event); });
                    //adds Barrel 
                    var spriteBarrel = gameui.AssetsManager.getBitmap("Bonus1/barrel" + b);
                    spriteBarrel.rotation = 10;
                    spriteBarrel.pivot.y = 300;
                    spriteBarrel.y = 270;
                    barrel.addChild(spriteBarrel);
                    //adds reflection
                    var spriteReflection = gameui.AssetsManager.getBitmap("Bonus1/barrelReflect");
                    spriteReflection.y = 200;
                    spriteReflection.x = -15;
                    spriteReflection["skewX"] = -10;
                    spriteReflection.scale.x = 1.02;
                    barrel.addChild(spriteReflection);
                    var bn = barrel.getBounds();
                    /// Check barrel.hitArea = (new PIXI.Graphics().beginFill(0xFFFFFF).drawRect(bn.x,bn.y,bn.width,bn.height));
                    //var spriteWater = gameui.AssetsManager.getSprite("Bonus1/agua");
                    //barrel.addChild(spriteWater);
                    //spriteWater.gotoAndPlay(Math.random() * 120)
                    barrelsContainer.addChild(barrel);
                    barrelsContainer.y = defaultHeight / 2 - 1024;
                    //positionning
                    barrel.set(positions[b]);
                    barrel.pivot.x = 180;
                    barrel.pivot.y = 180;
                    barrel.x += 180;
                    barrel.y += 180;
                    if (Math.random() > 0.5)
                        barrel.scale.x = -1;
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
                    var barrelCcontent = new PIXI.Container();
                    barrelCcontent.x = barrel.x - 50;
                    barrelCcontent.y = barrel.y - 150;
                    this.BarrelsItens.push(barrelCcontent);
                    this.content.addChild(barrelCcontent);
                    //instantiate a new shadow for content
                    var shadow = new PIXI.Graphics().beginFill(0xF00).drawEllipse(0, 0, 150, 50);
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
                    this.barrels[ba].interactive = true;
                }
                //show all contents
                for (var co in this.BarrelsItens)
                    this.BarrelsItens[co].removeChildren();
                //clean all items
                this.items = this.randomItensInArray(itemsCount, barrelsCount);
                //adds objects in barrel
                for (var b = 0; b < this.barrels.length; b++) {
                    //show the item
                    if (this.items[b]) {
                        var itemDO = gameui.AssetsManager.getBitmap("puzzle/icon_" + this.items[b]);
                        itemDO.name = "item";
                        this.BarrelsItens[b].addChild(itemDO);
                        itemDO.pivot.x = itemDO.getLocalBounds().width / 2;
                        itemDO.pivot.y = itemDO.getLocalBounds().height / 2;
                        this.BarrelsItens[b].x += itemDO.pivot.x;
                        this.BarrelsItens[b].y += itemDO.pivot.y;
                    }
                    else {
                        this.BarrelsItens[b].addChild(gameui.AssetsManager.getBitmap("Bonus1/icone_lata"));
                    }
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
                var itemArray = ["coin", "coin", "2coin", "3coin"];
                var i = Math.floor(Math.random() * itemArray.length);
                var itemId = itemArray[i];
                return itemId;
            };
            //when player tap a barrel
            BonusBarrel.prototype.barrelTap = function (event) {
                //identify tapped barrel
                var barrelId = this.barrels.indexOf(event.target);
                var barrelObj = this.barrels[barrelId];
                //remove barrel mouse interactivity 
                barrelObj.interactive = false;
                //hide barrel
                createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);
                //show item in barrel
                this.BarrelsItens[barrelId].visible = true;
                //verifies item
                if (this.items[barrelId]) {
                    // play sound
                    gameui.AudiosManager.playSound("Correct Answer");
                    this.userAquireItem(this.items[barrelId]);
                    this.animateItemToHeader(this.BarrelsItens[barrelId].getChildByName("item"));
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
                    this.barrels[barrel].interactive = false;
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
                    this.userAquireItem(card1.name);
                    this.userAquireItem(card2.name);
                    card1.opened = false;
                    card2.opened = false;
                    //animate itens
                    this.animateItemToHeader(card1.getChildByName("item"), card1.name);
                    setTimeout(function () {
                        _this.animateItemToHeader(card2.getChildByName("item"), card2.name);
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
                this.cardsContainer.setChildIndex(card, this.cardsContainer.children.length - 1);
                //if card is Jocker (Rat)
                if (card.name == null) {
                    //shake the card
                    card.shakeObj();
                    //decrase lives number
                    this.lives--;
                    card.interactive = false;
                    // play sound
                    gameui.AudiosManager.playSound("wrong");
                    if (this.lives == 0) {
                        //if there is no more lives, than end game
                        this.content.interactive = false;
                        this.content.interactiveChildren = false;
                        this.message.showtext(StringResources.b2_noMoreChances, 2000, 500);
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
                    this.content.interactive = false;
                    this.content.interactiveChildren = false;
                    this.message.showtext(StringResources.b2_finish, 2000, 500);
                    this.message.on("onclose", function () { _this.endBonus(); });
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
                var cardsContainer = new PIXI.Container();
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
                    card.interactive = true;
                    //add cards event listener
                    card.addEventListener("tap", function (e) {
                        _this.cardClick(e.target);
                    });
                    card.addEventListener("click", function (e) {
                        _this.cardClick(e.target);
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
                itemDO.pivot.x = itemDO.getBounds().width / 2;
                itemDO.pivot.y = itemDO.getBounds().height / 2;
                itemDO.visible = false;
                this.addChild(itemDO);
                //add cover image
                var cover = new gameui.ImageButton("Bonus2/bonuscard1");
                cover.x = 368 / 2;
                cover.y = 279 / 2;
                /// Check cover.hitArea = (new PIXI.Graphics().beginFill(0xFFFFFF).drawRect(-368 / 2, -279 / 2, 368, 279));
                cover.name = "cover";
                this.addChild(cover);
                this.pivot.x = 184;
                this.pivot.y = 135;
            }
            //open a card animation
            Card.prototype.open = function () {
                this.getChildByName("item").visible = true;
                var cover = this.getChildByName("cover");
                createjs.Tween.removeTweens(cover);
                createjs.Tween.get(cover).to({ rotation: Math.PI / 2, y: 1000, alpha: 0 }, 500, createjs.Ease.sineIn).call(function () { cover.visible = false; });
                this.interactive = false;
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
        })(PIXI.Container);
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
                this.itemsContainer = new PIXI.Container();
                this.content.addChild(this.itemsContainer);
                this.currentChestId = 0;
                this.chances = 2;
                this.nextChest();
            }
            Bonus3.prototype.addObjects = function () {
                var _this = this;
                _super.prototype.addObjects.call(this);
                var mc = (new lib["Bonus3"]);
                var temp = mc;
                this.content.addChild(temp);
                this.mainClip = mc;
                //set stops
                this.mainClip.addEventListener("ready", function () { _this.mainClip.stop(); });
                this.mainClip.addEventListener("WrongEnd", function () { _this.mainClip.stop(); });
                this.mainClip.addEventListener("End", function () {
                    _this.mainClip.stop();
                    _this.message.showtext(StringResources.b3_finish, 2000, 1000);
                    _this.message.addEventListener("onclose", function () { _this.endBonus(); });
                });
                //add keys 
                this.keys = new Array();
                this.keys.push(this.mainClip["key1"]);
                this.keys.push(this.mainClip["key2"]);
                this.keys.push(this.mainClip["key3"]);
                this.keys[0].addEventListener("mousedown", function () { _this.pickKey(0); });
                this.keys[1].addEventListener("mousedown", function () { _this.pickKey(1); });
                this.keys[2].addEventListener("mousedown", function () { _this.pickKey(2); });
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
                        //prvide item to user
                        _this.getItems(_this.currentChestId);
                        //go to next chest
                        _this.nextChest();
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
                    this.message.showtext(StringResources.b3_noMoreChances, 2000, 1100);
                    this.message.addEventListener("onclose", function () { _this.endBonus(); });
                    // play sound
                    gameui.AudiosManager.playSound("Wrong Answer");
                }
            };
            //-----------------------------------------------
            //give items to the user
            Bonus3.prototype.getItems = function (chestId) {
                var _this = this;
                this.itemsContainer.removeChildren();
                //barris mais elevados tem mais items
                var numItems = 2;
                if (chestId == 2)
                    numItems = 5;
                if (chestId == 3)
                    numItems = 10;
                var items = this.selectRandomItems(numItems);
                var itemsDo = [];
                //create items objects
                for (var i in items) {
                    FlipPlus.FlipPlusGame.coinsData.increaseAmount(1);
                    var itemObj = this.createItem(items[i]);
                    itemObj.set({ x: defaultWidth / 2, y: defaultHeight / 2 - 100, alpha: 0 });
                    itemObj.pivot.x = itemObj.getLocalBounds().width / 2;
                    itemObj.pivot.y = itemObj.getLocalBounds().height / 2;
                    createjs.Tween.get(itemObj).wait(500 + i * 300)
                        .to({ alpha: 1, x: defaultWidth * 0.15 + i * (defaultWidth * 0.7 / items.length), y: defaultHeight / 2 - 600 }, 500, createjs.Ease.quadInOut)
                        .call(function (itemDo) { _this.animateItemToHeader(itemDo, itemDo.name); }, [itemObj]);
                    this.itemsContainer.addChild(itemObj);
                }
            };
            Bonus3.prototype.createItem = function (item) {
                //adds item Image or empty image
                var itemImage = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
                var itemDO = gameui.AssetsManager.getBitmap(itemImage);
                itemDO.name = item;
                //itemDO.x = 368 / 2;
                //itemDO.y = 279 / 2;
                //itemDO.pivot.x = itemDO.getLocalBounds().width / 2;
                //itemDO.pivot.y = itemDO.getLocalBounds().height / 2;
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
                var _this = this;
                _super.call(this);
                if (!this.originX)
                    this.originX = defaultWidth / 2;
                if (!this.originY)
                    this.originY = defaultHeight / 2;
                this.content.set({ x: defaultWidth / 2, y: defaultHeight / 2 });
                this.buildHeader(title, previousScreen, color);
                this.animateIn(this.content);
                this.onback = function () {
                    _this.back(previousScreen);
                };
            }
            GenericMenu.prototype.back = function (previousScreen) {
                FlipPlus.FlipPlusGame.gameScreen.switchScreen(previousScreen);
                this.animateOut(this.content);
            };
            GenericMenu.prototype.buildHeader = function (title, previousScreen, color) {
                var _this = this;
                // add bg
                this.background.addChild(gameui.AssetsManager.getBitmap("mybotsbg").set({ y: -339, scaleY: 1.3310546875 }));
                // add bg menu
                this.content.addChild(gameui.AssetsManager.getBitmap("menu/menubg").set({ regX: 1536 / 2, regY: 1840 / 2 }));
                this.content.addChild(gameui.AssetsManager.getBitmap(color || "menu/titlePurple").set({ regX: 1536 / 2, regY: 1840 / 2 }));
                //Add Back Button
                var backButton = new gameui.IconButton("menu/x", "", function () {
                    _this.back(previousScreen);
                });
                backButton.set({ x: 550, y: -690, hitPadding: 100 });
                backButton.createHitArea();
                this.content.addChild(backButton);
                //var t = new gameui.Label(title, defaultFontFamilyHighlight, 0xFFFFFF).set({ x: -500, y: -690, textAlign:"left" });
                //this.content.addChild(t);
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
            function WorkshopMenu(levelsManager) {
                var _this = this;
                _super.call(this);
                //just to know when a user finished a project
                this.projectPreviousState = {};
                //inertia fx
                this.offset = 0;
                this.lastx = 0;
                this.levelsManager = levelsManager;
                this.addObjects();
                this.pagesSwipe = new Menu.View.PagesSwiper(this.projectsContainer, this.projectViews, defaultWidth, 200, 1500);
                this.createPaginationButtons(this.projectsContainer);
                this.onback = function () { _this.back(); };
            }
            //--------------------- Initialization ---------------------
            WorkshopMenu.prototype.addObjects = function () {
                //add Background
                var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
                this.content.addChild(bg);
                bg.scale.y = 1.3310546875;
                bg.y = -339;
                //create projects container
                this.projectsContainer = new PIXI.Container();
                //creates projectViews array
                this.projectViews = new Array();
                //add to view
                this.content.addChild(this.projectsContainer);
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
                this.menu.addEventListener("menu", function () { FlipPlus.FlipPlusGame.showOptions(_this); });
                this.menu.addEventListener("back", function () { _this.back(); });
                this.header.addChild(this.menu);
            };
            //adds all projects in swipe view
            WorkshopMenu.prototype.addProjects = function (projects) {
                //add every project
                var _this = this;
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
                var lb = new gameui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoPreviousPage();
                }, "buttonOut");
                lb.y = 1050;
                lb.x = defaultWidth * 0.1;
                this.content.addChild(lb);
                //create right button
                var rb = new gameui.ImageButton("projects/btpage", function () {
                    _this.pagesSwipe.gotoNextPage();
                });
                rb.y = 1050;
                rb.x = defaultWidth * 0.9;
                rb.scale.x = -1;
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
                _super.prototype.activate.call(this);
                // play music
                //gameui.AudiosManager.playMusic("Music Dot Robot",0.5);
                this.factorySound = gameui.AudiosManager.playSound("Factory Ambience", true, 0, 0, 0, 0.4);
                //update enabled Projects
                this.addProjects(this.levelsManager.getUnlockedProjects());
                //update all projects views
                for (var pv in this.projectViews) {
                    var project = this.levelsManager.getProjectByName(this.projectViews[pv].name);
                    if (project == this.levelsManager.getCurrentProject()) {
                        //activate current project
                        this.projectViews[pv].activate(parameters);
                        //goto current project
                        this.pagesSwipe.gotoPage(parseInt(pv), false);
                        //if complete changes to myBotScreen
                        if (project.UserData.complete && this.projectPreviousState[project.name] == false) {
                            setTimeout(function () {
                                FlipPlus.FlipPlusGame.showMainScreen();
                            }, 6000);
                            var proj = project;
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
                _super.call(this);
                PIXI.RETINA_PREFIX = /@(.+)x.+((png)|(jpg)|(xml)|(fnt))$/;
                assetscale = 1;
                if (window.innerWidth <= 1070)
                    assetscale = 0.5;
                if (window.innerWidth <= 384)
                    assetscale = 0.25;
                if (levelCreatorMode) {
                    assetscale = 1;
                }
                this.preLoad();
            }
            Loading.prototype.preLoad = function () {
                var _this = this;
                var imagePath = "assets/images@" + assetscale + "x/";
                //creates load complete action
                gameui.AssetsManager.onComplete = function () {
                    _this.addBeach();
                    gameui.AssetsManager.reset();
                    _this.load();
                };
                gameui.AssetsManager.loadAssets(logoManifest, imagePath);
                //this.load();
            };
            Loading.prototype.load = function () {
                var _this = this;
                var imagePath = "assets/images@" + assetscale + "x/";
                var audioPath = "assets/sound/";
                //creates load complete action
                gameui.AssetsManager.onComplete = function () {
                    if (_this.loaded)
                        _this.loaded();
                };
                //add update % functtion
                gameui.AssetsManager.onProgress = function (progress) {
                    loadinBar.update(progress);
                };
                //load audio
                if (!levelCreatorMode && typeof WPAudioManager == 'undefined') {
                    createjs.Sound.alternateExtensions = ["mp3"];
                    createjs.Sound.registerSounds(audioManifest, audioPath);
                }
                //gameui.AssetsManager.loadAssets(logoManifest, imagePath);
                gameui.AssetsManager.loadAssets(imageManifest, imagePath);
                gameui.AssetsManager.loadFontSpriteSheet("fontWhite", "fontWhite.fnt");
                gameui.AssetsManager.loadFontSpriteSheet("fontBlue", "fontBlue.fnt");
                gameui.AssetsManager.loadFontSpriteSheet("fontTitle", "fontTitle.fnt");
                gameui.AssetsManager.loadSpriteSheet("agua", "agua.json");
                gameui.AssetsManager.loadSpriteSheet("bolinhas", "bolinhas.json");
                gameui.AssetsManager.loadSpriteSheet("touch", "Touch.json");
                gameui.Button.setDefaultSoundId("button");
                // adds a loading bar
                var loadinBar = new LoadingBar(imagePath);
                this.content.addChild(loadinBar);
                loadinBar.x = defaultWidth / 2;
                loadinBar.y = defaultHeight / 2;
            };
            Loading.prototype.addBeach = function () {
                var logo = new lib.LogoScreen();
                this.content.addChild(logo);
                this.beach = logo["instance"]["instance_14"];
            };
            Loading.prototype.redim = function (headerY, footerY, width, height) {
                _super.prototype.redim.call(this, headerY, footerY, width, height);
                if (this.beach)
                    this.beach.y = -headerY / 4 - 616 + 77 / 4 + 9;
            };
            return Loading;
        })(gameui.ScreenState);
        Menu.Loading = Loading;
        var LoadingBar = (function (_super) {
            __extends(LoadingBar, _super);
            function LoadingBar(imagePath) {
                _super.call(this);
                //var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");// defaultFontFamilyNormal, 0xFFFFFF);
                var bg = gameui.AssetsManager.getBitmap(imagePath + "loadingbj.png");
                var bar = gameui.AssetsManager.getBitmap(imagePath + "loadingBar.png");
                this.addChild(bg);
                //this.addChild(text)
                this.addChild(bar);
                var w = 795;
                var h = 104;
                //text.pivot.x = text.getLocalBounds().width / 2;
                bar.pivot.x = Math.floor(bg.pivot.x = w / 2);
                bar.pivot.y = Math.floor(bg.pivot.y = h / 2);
                //text.y = -200;
                this.barMask = new PIXI.Graphics().beginFill(0xFF0000, 1).drawRect(0, -h / 2, w, h).endFill();
                ;
                this.barMask.x = -w / 2;
                bar.mask = this.barMask;
                this.addChild(this.barMask);
                this.update(0);
            }
            LoadingBar.prototype.update = function (value) {
                this.barMask.scale.x = value / 100;
            };
            return LoadingBar;
        })(PIXI.Container);
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                var _this = this;
                _super.call(this);
                var bg = gameui.AssetsManager.getBitmap("mybotsbg");
                bg.y = -339;
                bg.scale.y = 1.3310546875;
                this.content.addChild(bg);
                this.addMyBots();
                this.addMenu();
                this.addTerminal();
                this.addPlayButton();
                this.onback = function () { _this.back(); };
            }
            MainMenu.prototype.activate = function () {
                _super.prototype.activate.call(this);
                // play BgSound
                gameui.AudiosManager.playMusic("Music Dot Robot");
                // Verifies if it is the first time playing
                if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro")) {
                    this.myBots.playIntroPartA();
                    console.log("i1");
                }
                else if (!FlipPlus.FlipPlusGame.storyData.getStoryPlayed("intro2")) {
                    FlipPlus.FlipPlusGame.storyData.setStoryPlayed("intro2");
                    this.myBots.playIntroPartB();
                    console.log("i2");
                }
                else {
                    //updates robots lobby
                    this.myBots.update();
                    console.log("ub");
                }
            };
            MainMenu.prototype.desactivate = function (parameters) {
                _super.prototype.desactivate.call(this, parameters);
                this.myBots.clear();
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
                var playBt = new gameui.BitmapTextButton(StringResources["mm_play"], "fontTitle", "btplay_press", function () {
                    FlipPlus.FlipPlusGame.showProjectsMenu();
                    //FlipPlus.FlipPlusGame.showActionLevelsMenu();
                });
                playBt.interactive = true;
                this.content.addChild(playBt);
                playBt.x = 800;
                playBt.y = 1139;
                this.playBt = playBt;
                var playBt = new gameui.BitmapTextButton(StringResources["mm_play"], "fontTitle", "btplay_press", function () {
                    //FlipPlus.FlipPlusGame.showProjectsMenu(); 
                    FlipPlus.FlipPlusGame.showActionLevelsMenu();
                });
                playBt.interactive = true;
                this.content.addChild(playBt);
                playBt.x = 800;
                playBt.y = 1339;
                this.playBt = playBt;
            };
            MainMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showTitleScreen();
            };
            //------------Robots Behaviour ---------------------------------
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
            function OptionsMenu(previousScreen) {
                var _this = this;
                if (!previousScreen)
                    previousScreen = FlipPlus.FlipPlusGame.mainScreen;
                this.originY = 1;
                this.originX = defaultWidth;
                _super.call(this, StringResources.menus.menu, previousScreen);
                // add menu buttons
                var p0 = -350;
                var p = 0;
                var s = 330;
                var soundMenu = new Menu.View.SoundMenu();
                soundMenu.y = p0;
                this.content.addChild(soundMenu);
                p++;
                this.content.addChild(new gameui.BitmapTextButton("Help", "fontBlue", "menu/btmenu", function () {
                    FlipPlus.FlipPlusGame.showSpecialOffer(_this);
                }).set({ x: 0, y: p0 + p * s }));
                p++;
                this.content.addChild(new gameui.BitmapTextButton("Store", "fontBlue", "menu/btmenu", function () {
                    FlipPlus.FlipPlusGame.showShopMenu(_this);
                }).set({ x: 0, y: p0 + p * s }));
                p++;
                //add Other Buttons
                this.content.addChild(new gameui.BitmapTextButton(StringResources.op_erase, "fontBlue", "", function () {
                    FlipPlus.FlipPlusGame.levelsUserDataManager.clearAllData();
                    window.location.reload();
                }).set({ y: p0 + p * s }));
            }
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
                var _this = this;
                _super.call(this);
                this.projectsItems = [];
                this.bonusItems = [];
                this.createObjects();
                this.onback = function () { _this.back(); };
            }
            //populate View
            ProjectsMenu.prototype.createObjects = function () {
                var bg = gameui.AssetsManager.getBitmap("projects/bgprojects");
                bg.scale.y = bg.scale.x = 2;
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
                this.menu.addEventListener("menu", function () { FlipPlus.FlipPlusGame.showOptions(_this); });
                this.menu.addEventListener("back", function () { _this.back(); });
                this.header.addChild(this.menu);
                //create starsIndicator
                this.starsIndicator = new Menu.View.StarsIndicator();
                this.header.addChild(this.starsIndicator);
                this.starsIndicator.x = defaultWidth;
                this.starsIndicator.y = 220;
                //create bots statistics
                this.statisticsTextField = gameui.AssetsManager.getBitmapText("0", "fontBlue");
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
                this.projectsGrid = new PIXI.Container();
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
                        this.projectsGrid.addChild(currentPage);
                        this.pages.push(currentPage);
                    }
                    var projectView = new Menu.View.ProjectItem(projects[i], function (e) {
                        _this.projectItemClick(e);
                    });
                    //add item to scene
                    this.projectsItems.push(projectView);
                    currentPage.addChild(projectView);
                    //set item position
                    projectView.x = xspacing * (i % cols) + 260;
                    projectView.y = yspacing * Math.floor((i % (cols * rows)) / cols);
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
                        var bonusId = e.target.bonusId;
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
                var t = e.target;
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
                this.popup.showtext(StringResources.pr_notStarsTitle, StringResources.pr_notStarsText.split("#")[0] + stars.toString() + StringResources.pr_notStarsText.split("#")[1] + cost.toString() + StringResources.pr_notStarsText.split("#")[2], 10000);
            };
            //show there is no time for it
            ProjectsMenu.prototype.showtimeWarning = function (time) {
                this.popup.showtext(StringResources.pr_notTimeText.split("#")[0], StringResources.pr_notTimeText.split("#")[1] + time + StringResources.pr_notTimeText.split("#")[2], 10000);
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
                rb.scale.x = -1;
                this.footer.addChild(rb);
                //create pagination indicator
                var indicatorContainer = new PIXI.Container();
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
                FlipPlus.FlipPlusGame.showMainScreen();
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
        var View;
        (function (View) {
            //View
            var Terminal = (function (_super) {
                __extends(Terminal, _super);
                function Terminal() {
                    _super.call(this);
                    //set informations container
                    this.screenContaier = new PIXI.Container();
                    this.addChild(this.screenContaier);
                    //textBox
                    this.textBox = gameui.AssetsManager.getBitmapText("", "fontWhite");
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
            })(PIXI.Container);
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
                    var menuBt = new gameui.ImageButton("MenuBt", function () { _this.emit("menu", menuBt); });
                    menuBt.y = 90;
                    menuBt.x = defaultWidth - 130;
                    this.addChild(menuBt);
                    //add a bacl buttton
                    var backBt = new gameui.ImageButton("BackBt", function () { _this.emit("back", menuBt); }, "buttonOut");
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
                        //add the click event listener
                        var event = function (e) {
                            var tg = (e.target);
                            var level = _this.challangesMap[tg.name];
                            var parameters = {
                                x: tg.x + tg.parent.x,
                                y: tg.y + tg.parent.y,
                                scaleX: 0.3,
                                scaleY: 0.3
                            };
                            _this.emit("levelClick", { level: level, parameters: parameters });
                        };
                        //create a thumb
                        var challangeThumb = new View.LevelThumb(level, event);
                        this.thumbs.push(challangeThumb);
                        challangeThumb.rotation = (Math.random() * 3 - 1.5) * Math.PI / 180; //Little angle random.
                        ////desactivate animation
                        //challangeThumb.set({ alpha: 0, scaleX: 1.3, scaleY: 1.3 });//animate
                        //createjs.Tween.get(challangeThumb).wait(50+i*50).to({ alpha: 1,scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);
                        //Add object on grid
                        this.addObject(challangeThumb);
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
                function LevelThumb(level, event) {
                    _super.call(this, event);
                    this.level = level;
                    this.name = level.name;
                    this.theme = level.theme;
                }
                //updates thumbnail with user data information
                LevelThumb.prototype.updateUserData = function () {
                    //create a new thumb
                    this.createThumbs(this.level);
                    this.cacheAsBitmap = true;
                    var size = 200;
                    this.createHitArea();
                };
                //Create a container with a level thumbnail and evel name
                LevelThumb.prototype.createThumbs = function (level) {
                    this.removeChildren();
                    var color1 = 0xFFFFFF;
                    var color2 = 0;
                    var alpha1 = 0.5;
                    var alpha2 = 0.3;
                    var assetSufix;
                    var assetName = this.defineAssetName(level);
                    var thumbContainer = new PIXI.Container();
                    this.addChild(thumbContainer);
                    //defines thumb state
                    if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                        assetSufix = "1";
                        this.setSound(null);
                    }
                    // locked
                    if (!level.userdata.unlocked || level.userdata.skip || level.userdata.item) {
                        assetSufix = "2";
                        color1 = 0;
                        this.setSound("buttonOff");
                    }
                    // next playable
                    if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                        assetSufix = "3";
                        alpha1 = 0.9;
                        this.setSound(null);
                        //create bounce effect if is active
                        thumbContainer.set({ scaleX: 1, scaleY: 1 });
                        createjs.Tween.get(thumbContainer)
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                            .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut);
                    }
                    //Adds Thumb Backgroud
                    thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));
                    //Adds Thumb Blocks
                    thumbContainer.addChild(this.createBlocks(level, color1, color2, alpha1, alpha2, 1, 4));
                    //Adds thumb tags
                    thumbContainer.addChild(this.createTags(level, assetName, assetSufix));
                    //Adds level modificator
                    thumbContainer.addChild(this.createLevelModificator(level));
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
                        sk.pivot.x = sk.getLocalBounds().width / 2;
                        sk.pivot.y = sk.getLocalBounds().height / 2;
                        return sk;
                    }
                    if (level.userdata.item) {
                        var sk = gameui.AssetsManager.getBitmap("puzzle/icon_" + level.userdata.item);
                        sk.pivot.x = sk.getLocalBounds().width / 2;
                        sk.pivot.y = sk.getLocalBounds().height / 2;
                        return sk;
                    }
                };
                //adds thumb background
                LevelThumb.prototype.createBackgroud = function (level, assetName, assetSufix) {
                    var sbg = gameui.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
                    sbg.pivot.x = sbg.pivot.y = 98;
                    return sbg;
                };
                //adds thumb blocks
                LevelThumb.prototype.createBlocks = function (level, color1, color2, alpha1, alpha2, sizeStart, sizeEnd) {
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
                    var s = new PIXI.Graphics();
                    for (var row = row0; row < rowf; row++) {
                        for (var col = col0; col < colf; col++) {
                            var color;
                            var alpha;
                            if (blocks[row * level.width + col]) {
                                color = color1;
                                alpha = alpha1;
                            }
                            else {
                                color = color2;
                                alpha = alpha2;
                            }
                            s.beginFill(color, alpha).drawRect(spacing * (col - col0), spacing * (row - row0), size, size);
                        }
                    }
                    // scale for fit on square
                    s.scale.x = s.scale.y = Math.min(3 / (colf - col0), 3 / (rowf - row0));
                    // centralize thumg
                    s.pivot.x = spacing * (colf - col0) / 2;
                    s.pivot.y = spacing * (rowf - row0) / 2;
                    return s;
                };
                //Adds Thumb Tag
                LevelThumb.prototype.createTags = function (level, assetName, assetSufix) {
                    //TODO: essas string devem estar em um enum
                    if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                        var tag = gameui.AssetsManager.getBitmap("workshop/" + assetName + (level.type == "moves" ? "flip" : level.type) + assetSufix);
                        tag.pivot.x = tag.pivot.y = 100;
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
                StarsIndicator.prototype.updateStarsAmount = function (newQuantity, tween) {
                    if (tween === void 0) { tween = true; }
                    this.starsTextField.text = newQuantity.toString();
                    this.starsTextField.pivot.x;
                };
                //add objects to View
                StarsIndicator.prototype.buildView = function () {
                    var si = gameui.AssetsManager.getBitmap("starsicon");
                    si.scale.x = si.scale.y = 0.9;
                    this.starsTextField = gameui.AssetsManager.getBitmapText("0", "fontBlue");
                    this.starsTextField.pivot.x = this.starsTextField.getLocalBounds().width;
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
                function CoinsIndicator(event) {
                    _super.call(this, event);
                    this.buildView();
                    //Add Effects
                    this.fx = new FlipPlus.Effects();
                    this.addChild(this.fx);
                }
                //updates Parts indicator amount
                CoinsIndicator.prototype.updateAmmount = function (newQuantity, tween) {
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
                    icon.scale.x = icon.scale.y = 0.9;
                    icon.pivot.x = 119 / 2;
                    icon.pivot.y = 93 / 2;
                    icon.x = -120 + icon.pivot.x;
                    icon.y = +35 + icon.pivot.y;
                    icon.name = "icon";
                    this.addChild(icon);
                    return icon;
                };
                //add objects to View
                CoinsIndicator.prototype.buildView = function () {
                    // add Background
                    var bg = gameui.AssetsManager.getBitmap("partshud");
                    bg.pivot.x = 190;
                    this.addChild(bg);
                    var icon = this.addCoinIcon();
                    this.coinsTextField = gameui.AssetsManager.getBitmapText("0", "fontWhite");
                    this.coinsTextField.x = 50;
                    this.coinsTextField.y = 30;
                    this.addChild(this.coinsTextField);
                };
                return CoinsIndicator;
            })(gameui.Button);
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
                function ProjectItem(project, event) {
                    _super.call(this, event);
                    this.project = project;
                    this.pivot.x = 480 / 2;
                    this.pivot.y = 480 / 2;
                    this.updateProjectInfo();
                }
                //createObjects
                ProjectItem.prototype.createObjects = function (project) {
                    var color = "#00427b";
                    var font = "50px " + defaultFont;
                    //clean all objects
                    this.removeChildren();
                    if (project.UserData.unlocked) {
                        //background
                        this.addChild(gameui.AssetsManager.getBitmap("projects/slot"));
                        //bars
                        var bar = "projects/bar" + (project.UserData.stars ? project.UserData.stars : 0);
                        this.addChild(gameui.AssetsManager.getBitmap(bar).set({ x: 5, y: 363 }));
                        this.addChild(gameui.AssetsManager.getBitmap(bar + "a"));
                        //robot name text
                        var robotName = gameui.AssetsManager.getBitmapText(project.nickName, "fontBlue");
                        robotName.scale.x = robotName.scale.y = 0.6;
                        robotName.x = 14;
                        robotName.y = 0;
                        this.addChild(robotName);
                        //percentage text 
                        var percenttext = gameui.AssetsManager.getBitmapText((project.UserData.percent * 100).toString() + "%", "fontBlue");
                        percenttext.scale.x = percenttext.scale.y = 0.6;
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
                        starsIndicator.scale.x = starsIndicator.scale.y = 0.7;
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
                        var tx = gameui.AssetsManager.getBitmapText(project.cost.toString(), "fontBlue");
                        this.addChild(tx);
                        tx.pivot.x = tx.getLocalBounds().width;
                        tx.x = 220;
                        tx.y = 195;
                    }
                };
                //updates based on porject 
                ProjectItem.prototype.updateProjectInfo = function () {
                    //verifica se o projeto pode ser destravado
                    //TODO. nao devia acessar metodo global aqui
                    FlipPlus.FlipPlusGame.projectManager.unlockProject(this.project);
                    //update the objects display     
                    this.createObjects(this.project);
                    this.scale.x = this.scale.y = 1;
                    createjs.Tween.removeTweens(this);
                    //if is new (unlocked and not played) do an animation
                    if (this.project.UserData.percent == 0 && this.project.UserData.unlocked) {
                        this.set({ scaleX: 1, scaleY: 1 });
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
                    var bg = new PIXI.Graphics();
                    bg.beginFill(0xFFAA00).drawRect(0, 0, 400, 150);
                    this.addChild(bg);
                    var pbarbg = new PIXI.Graphics();
                    pbarbg.beginFill(0x662200).drawRect(50, 50, 300, 50);
                    this.addChild(pbarbg);
                    var pbar = new PIXI.Graphics();
                    pbar.beginFill(0xFFFF00).drawRect(50, 50, 300, 50);
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
                    this.progressBar.scale.x = progress;
                };
                return ProjectProgressIndicator;
            })(PIXI.Container);
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
                                this.stars[i].set({ scaleX: 4, scaleY: 4, rotation_d: -45, alpha: 0 });
                                createjs.Tween.get(this.stars[i]).wait(300).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 1500, createjs.Ease.bounceOut);
                                // play sound and cast an effect
                                setTimeout(function () {
                                    _this.fx.castEffect(_this.stars[an].x + 100, _this.stars[an].y + 100, "Bolinhas", 4);
                                    gameui.AudiosManager.playSound("star");
                                }, 300 + 500);
                                break;
                            }
                        }
                    }
                };
                return ProjectStarsIndicator;
            })(PIXI.Container);
            View.ProjectStarsIndicator = ProjectStarsIndicator;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Levels;
    (function (Levels) {
        var Level = (function () {
            function Level() {
            }
            return Level;
        })();
        Levels.Level = Level;
        var LevelUserData = (function () {
            function LevelUserData() {
            }
            return LevelUserData;
        })();
        Levels.LevelUserData = LevelUserData;
    })(Levels = FlipPlus.Levels || (FlipPlus.Levels = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Levels;
    (function (Levels) {
        // Class
        // Data Object - Model
        var BotLevelsSet = (function () {
            function BotLevelsSet() {
            }
            return BotLevelsSet;
        })();
        Levels.BotLevelsSet = BotLevelsSet;
        var ProjectUserData = (function () {
            function ProjectUserData() {
            }
            return ProjectUserData;
        })();
        Levels.ProjectUserData = ProjectUserData;
    })(Levels = FlipPlus.Levels || (FlipPlus.Levels = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Levels;
    (function (Levels) {
        // Controls projects and Levels.
        // Model
        var ProjectManager = (function () {
            // ------------------------------- initialization ----------------------------------------//
            function ProjectManager(data, userData) {
                this.levelsUserDataManager = userData;
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
                this.levelsData = data;
                //append the project name in each level.
                //for (var p in this.projects)
                //    for (var l in this.projects[p].levels) {
                //        this.projects[p].levels[l].name = this.projects[p].name + "/" + this.projects[p].levels[l].name;
                //        ///this.projects[p].levels[l].project = this.projects[p];
                //    }
                //create a user data for each level/project
                this.levelsUserDataManager.addUserData(this.levelsData);
            };
            // ------------------------------- manager Levels ----------------------------------------
            //get current Level 
            ProjectManager.prototype.getCurrentLevel = function () {
                return this.currentLevel;
            };
            //set current level
            ProjectManager.prototype.setCurrentLevel = function (level) {
                this.currentLevel = level;
                for (var p in this.levelsData) {
                    if (this.levelsData[p].levels.indexOf(level) >= 0) {
                        this.setCurrentProject(this.levelsData[p]);
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
                    this.levelsUserDataManager.saveLevelData(level);
                    this.levelsUserDataManager.saveProjectData(this.getCurrentProject());
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
                this.levelsUserDataManager.saveLevelData(level);
                this.levelsUserDataManager.saveProjectData(this.getCurrentProject());
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
                return this.levelsData;
            };
            //get a single project by name
            ProjectManager.prototype.getProjectByName = function (name) {
                for (var p in this.levelsData)
                    if (this.levelsData[p].name == name)
                        return this.levelsData[p];
                return null;
            };
            //get all finished Projects
            ProjectManager.prototype.getFinihedProjects = function () {
                this.updateProjectsUserData();
                //return array with avaliable projects
                var finishedProjects = [];
                //verifies all projects and add the non complete to array, till reach max number
                for (var i = 0; i < this.levelsData.length; i++)
                    if (this.levelsData[i].UserData.complete)
                        finishedProjects.push(this.levelsData[i]);
                return finishedProjects;
            };
            //get all unlockedProjects
            ProjectManager.prototype.getUnlockedProjects = function () {
                this.updateProjectsUserData();
                //return array with avaliable projects
                var unlockedProjects = [];
                //verifies all projects and add the non complete to array, till reach max number
                for (var i = 0; i < this.levelsData.length; i++)
                    if (this.levelsData[i].UserData.unlocked)
                        unlockedProjects.push(this.levelsData[i]);
                return unlockedProjects;
            };
            //getProjectStars
            ProjectManager.prototype.getStarsCount = function () {
                var stars = 0;
                for (var p in this.levelsData)
                    if (this.levelsData[p].UserData.stars)
                        stars += this.levelsData[p].UserData.stars;
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
                    this.levelsUserDataManager.saveProjectData(project);
                    this.levelsUserDataManager.saveLevelData(project.levels[0]);
                }
            };
            //unlock a level inside a project
            ProjectManager.prototype.unlockLevel = function (level) {
                //unlock level user data
                level.userdata.unlocked = true;
                this.levelsUserDataManager.saveLevelData(level);
            };
            //Finish a project.
            ProjectManager.prototype.completeProject = function (project) {
                //TODO colocar isso em outro lugar
                //set played the intro when a project is complete
                FlipPlus.FlipPlusGame.storyData.setStoryPlayed("intro");
                if (project.UserData.complete == true)
                    return;
                project.UserData.complete = true;
                this.levelsUserDataManager.saveProjectData(project);
            };
            //Updates user data project status
            ProjectManager.prototype.updateProjectsUserData = function () {
                for (var i = 0; i < this.levelsData.length; i++)
                    this.updateProjectUserData(this.levelsData[i]);
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
        Levels.ProjectManager = ProjectManager;
    })(Levels = FlipPlus.Levels || (FlipPlus.Levels = {}));
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
                    //centralize the popup on screen
                    this.width = defaultWidth;
                    this.height = defaultHeight;
                    this.x = defaultWidth / 2;
                    this.y = defaultHeight / 2;
                    this.pivot = this.position;
                    this.visible = false;
                    if (!disableInput) {
                        //hide popup
                        this.visible = false;
                        //add callback
                        this.addEventListener("click", function () {
                            _this.closePopUp();
                            clearTimeout(_this.closeinterval);
                        });
                        this.addEventListener("tap", function () {
                            _this.closePopUp();
                            clearTimeout(_this.closeinterval);
                        });
                    }
                }
                // public method to invoke the popup
                Popup.prototype.showtext = function (title, text, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
                    //clean display Object
                    this.removeChildren();
                    this.showsPopup(timeout, delay);
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    //create a title 
                    var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    this.addChild(titleDO);
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = defaultHeight / 2;
                    //create a text
                    var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //updates title and text values
                    if (text) {
                        textDO.text = text;
                        textDO.pivot.x = textDO.getLocalBounds().width / 2;
                        titleDO.text = title.toUpperCase();
                        titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
                    }
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    textDO.y = b + 300;
                    this.addsClickIndicator();
                };
                // shows a poput with a purchase button
                Popup.prototype.showtextBuy = function (title, text, previousScreen, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
                    //clean display Object
                    this.removeChildren();
                    this.showsPopup(timeout, delay);
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    //create a title    
                    var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    this.addChild(titleDO);
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = -400;
                    //create a text
                    var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO.y = -200;
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //updates title and text values
                    if (text) {
                        textDO.text = text;
                        textDO.pivot.x = textDO.getLocalBounds().width / 2;
                        titleDO.text = title.toUpperCase();
                        titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
                    }
                    //add buton to store
                    this.addChild(new gameui.BitmapTextButton(StringResources.menus.shop, "fontWhite", "menu/btmenu", function () {
                        FlipPlus.FlipPlusGame.showShopMenu(previousScreen);
                    })).set({ x: defaultWidth / 2, y: defaultHeight / 2 });
                    var b = defaultHeight / 2 - 600;
                    titleDO.y = b;
                    textDO.y = b + 200;
                    this.addsClickIndicator();
                };
                // show a popup for timeAttack
                Popup.prototype.showTimeAttack = function (time, boards, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
                    //clean display Object
                    this.removeChildren();
                    this.showsPopup(timeout, delay);
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    //create a titleShadow
                    var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = defaultHeight / 2;
                    this.addChild(titleDO);
                    //create a text
                    var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //create a text
                    var textDO1 = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO1.x = defaultWidth / 2;
                    this.addChild(textDO1);
                    //create a text
                    var textDO2 = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO2.x = defaultWidth / 2;
                    this.addChild(textDO2);
                    //create a text
                    var timeDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    timeDO.x = defaultWidth / 2;
                    this.addChild(timeDO);
                    //create a text
                    var boardsDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    boardsDO.x = defaultWidth / 2;
                    this.addChild(boardsDO);
                    //updates title and text values
                    titleDO.text = StringResources.gp_pz_Popup1Title.toUpperCase();
                    titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
                    textDO.text = StringResources.gp_pz_Popup1Text1;
                    textDO1.text = StringResources.gp_pz_Popup1Text2;
                    textDO2.text = StringResources.gp_pz_Popup1Text3;
                    timeDO.text = time;
                    boardsDO.text = boards;
                    titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
                    textDO.regX = textDO.getLocalBounds().width / 2;
                    textDO1.regX = textDO1.getLocalBounds().width / 2;
                    textDO2.regX = textDO2.getLocalBounds().width / 2;
                    timeDO.regX = timeDO.getLocalBounds().width / 2;
                    boardsDO.regX = boardsDO.getLocalBounds().width / 2;
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    textDO.y = 300 + b;
                    textDO1.y = 450 + b;
                    textDO2.y = 600 + b;
                    timeDO.y = 450 + b;
                    boardsDO.y = 450 + b;
                    timeDO.x = 500;
                    timeDO.x = defaultWidth / 2 + 400;
                    boardsDO.x = defaultWidth / 2 - 400;
                    this.addsClickIndicator();
                };
                // shows a popup for taps level
                Popup.prototype.showTaps = function (taps, timeout, delay) {
                    if (timeout === void 0) { timeout = 7000; }
                    if (delay === void 0) { delay = 0; }
                    //clean display Object
                    this.removeChildren();
                    this.showsPopup(timeout, delay);
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    //create a titleShadow
                    var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = defaultHeight / 2;
                    this.addChild(titleDO);
                    //create a text
                    var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    //create a text
                    var textDO2 = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    textDO2.x = defaultWidth / 2;
                    this.addChild(textDO2);
                    //create a text
                    var tapsDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    tapsDO.x = defaultWidth / 2;
                    this.addChild(tapsDO);
                    //updates title and text values
                    titleDO.text = StringResources.gp_mv_Popup1Title.toUpperCase();
                    textDO.text = StringResources.gp_mv_Popup1Text1;
                    textDO2.text = StringResources.gp_mv_Popup1Text3;
                    tapsDO.text = taps;
                    titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
                    textDO.pivot.x = textDO.getLocalBounds().width / 2;
                    ;
                    textDO2.pivot.x = textDO2.getLocalBounds().width / 2;
                    tapsDO.pivot.x = tapsDO.getLocalBounds().width / 2;
                    var b = defaultHeight / 2 - 500;
                    titleDO.y = 0 + b + 50;
                    textDO.y = 300 + b;
                    textDO2.y = 600 + b;
                    tapsDO.y = 450 + b;
                    this.addsClickIndicator();
                };
                // other stuff
                Popup.prototype.showsPopup = function (timeout, delay) {
                    var _this = this;
                    //set Hit Area
                    var hit = new PIXI.Graphics().beginFill(0xFF0000, 0).drawRect(0, 0, defaultWidth, defaultHeight);
                    this.addChild(hit);
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
                    this.emit("onshow");
                };
                // method for close popup 
                Popup.prototype.closePopUp = function () {
                    //hide the popup{
                    this.fadeOut(1, 0.5);
                    //dispatch a event for parent objects
                    this.emit("onclose");
                };
                Popup.prototype.addsClickIndicator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getMovieClip("touch");
                    this.addChild(ind);
                    ind.x = 1350;
                    ind.y = 1100;
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
                this.initializeUserFeedback();
            }
            //loads and add lobby graphics to the view
            MyBots.prototype.initializeGraphics = function () {
                this.myBots = new libmybots.NewBotsLobby();
                this.addChild(this.myBots);
                this.popup = new FlipPlus.Menu.View.PopupBot();
                this.addChild(this.popup);
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
                ///Check FlipPlusGame.gameScreen.stage.update();
                var _this = this;
                for (var c = 0; c < this.myBots.children.length; c++) {
                    var robot = this.myBots.getChildAt(c);
                    ;
                    robot.addEventListener("mousedown", function (e) { _this.userfeedback(e); });
                    var hit = new PIXI.Graphics().beginFill(0).drawRect(robot.getLocalBounds().x, robot.getLocalBounds().y, robot.getLocalBounds().width, robot.getLocalBounds().height);
                }
            };
            //User action feedback to user touch
            MyBots.prototype.userfeedback = function (event) {
                var robotMc = event.target;
                var project = this.projectManager.getProjectByName(robotMc.name);
                if (createjs.Tween.hasActiveTweens(robotMc))
                    return;
                //verifies if robot is ready or have parts ready
                if (project && project.UserData.complete || !project) {
                    var px = robotMc.scale.x;
                    var py = robotMc.scale.y;
                    var ot = robotMc.y;
                    /// Depreciated robotMc.gotoAndPlay("touch");
                    this.emit("robot", robotMc.name);
                    gameui.AudiosManager.playSound("Robot Talk_0" + Math.ceil(Math.random() * 7), true);
                    createjs.Tween.get(robotMc)
                        .to({ scaleX: px * 1.1, scaleY: py * 0.9 }, 100)
                        .to({ scaleX: px, scaleY: py }, 1000, createjs.Ease.elasticOut);
                    createjs.Tween.get(robotMc)
                        .to({ y: ot - 50 }, 100, createjs.Ease.quadOut)
                        .to({ y: ot }, 1000, createjs.Ease.bounceOut);
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
                for (var c = 0; c < this.myBots.children.length; c++) {
                    this.myBots.getChildAt(c).visible = false;
                    this.myBots.getChildAt(c).stop();
                }
            };
            //show a robot on screen by name
            MyBots.prototype.showRobot = function (botId) {
                var robotMC = this.myBots[botId];
                if (robotMC != null) {
                    robotMC.visible = true;
                    this.castNewEffect(robotMC);
                    robotMC.play();
                }
            };
            //play robot alert animation
            MyBots.prototype.alertRobot = function (botId) {
                var robotMC = this.myBots[botId];
            };
            // show a new glare into the bot
            MyBots.prototype.castNewEffect = function (botId) {
                var _this = this;
                var robotMC = this.myBots[botId];
                if (robotMC != null) {
                    var bgnewbot = gameui.AssetsManager.getBitmap("bgnewbot");
                    bgnewbot.pivot.x = bgnewbot.getLocalBounds().width / 2;
                    bgnewbot.pivot.y = bgnewbot.getLocalBounds().height / 2;
                    bgnewbot.x = robotMC.x;
                    bgnewbot.y = robotMC.y;
                    bgnewbot.visible = true;
                    this.addChildAt(bgnewbot, 0);
                    createjs.Tween.get(bgnewbot).
                        to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).
                        to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).
                        to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).
                        to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).
                        call(function () { _this.removeChild(bgnewbot); });
                }
            };
            MyBots.prototype.playIntroPartA = function () {
                this.hideAllRobots();
                this.showRobot("Bot01a");
                this.popup.showBotText(StringResources.it_text1, 6000, 1000);
            };
            MyBots.prototype.playIntroPartB = function () {
                this.hideAllRobots();
                this.showRobot("Bot01b");
                this.popup.showBotText(StringResources.it_text2, 6000, 1000);
            };
            MyBots.prototype.clear = function () {
                this.hideAllRobots();
            };
            return MyBots;
        })(PIXI.Container);
        Robots.MyBots = MyBots;
    })(Robots = FlipPlus.Robots || (FlipPlus.Robots = {}));
})(FlipPlus || (FlipPlus = {}));
/// <reference path="typing/createjs/createjs.d.ts" />
/// <reference path="typing/pixi.js.d.ts" />
/// <reference path="gameui/AssetsManager.ts" />
/// <reference path="gameui/GameScreen.ts" />
/// <reference path="gameui/ScreenState.ts" />
/// <reference path="gameui/UIItem.ts" />
/// <reference path="gameui/Grid.ts" /> 
/// <reference path="gameui/Transition.ts" />
/// <reference path="gameui/Button.ts" />
/*scripts*/
/// <reference path="src/FlipPlusGame.ts" />
/// <reference path="src/UserData/Items.ts" /> 
/// <reference path="src/UserData/Story.ts" />
/// <reference path="src/UserData/Timers.ts" /> 
/// <reference path="src/userdata/levelsuserdatamanager.ts" />
/// <reference path="src/userdata/settingsuserdatamanager.ts" />
/// <reference path="src/GamePlay/LevelScreen.ts" /> 
/// <reference path="src/GamePlay/levelpuzzle.ts" />
/// <reference path="src/GamePlay/levelcreator.ts" />
/// <reference path="src/GamePlay/levelcreator2.ts" />
/// <reference path="src/GamePlay/leveltaps.ts" />
/// <reference path="src/GamePlay/leveltimeattack.ts" />
/// <reference path="src/GamePlay/Tutorial.ts" />
/// <reference path="src/GamePlay/Logic/Block.ts" />
/// <reference path="src/GamePlay/Logic/Board.ts" />
/// <reference path="src/GamePlay/Logic/Level.ts" />
/// <reference path="src/GamePlay/Views/BlockSprite.ts" />
/// <reference path="src/GamePlay/Views/BoardSprite.ts" /> 
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
                this.currentMusic.setVolume(volume * this.getMusicVolume() * 0.6);
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
        this.sendEvent("mousedown", "mousedown", 1, levelId, blockX, blockY);
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
var defaultWidth = 1536;
var defaultHeight = 2048;
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
// Store Variables
var fbAppId = "1416523228649363";
var gameWebsite = "http://www.joinjelly.com";
var gameWebsiteIcon = "http://www.joinjelly.com/preview.jpg";
// TODO
var contantsAndroid = {
    ACH_Bot01: '',
    ACH_Bot02: '',
    ACH_Bot03: '',
    ACH_Bot04: '',
    ACH_Bot05: '',
    ACH_Bot06: '',
    ACH_Bot07: '',
    ACH_Bot08: '',
    ACH_Bot09: '',
    ACH_Bot10: '',
    ACH_Bot11: '',
    ACH_Bot12: '',
    ACH_Bot13: '',
    ACH_Bot14: '',
    ACH_Bot15: '',
    ACH_Bot16: '',
    ACH_Bot17: '',
    ACH_Bot18: '',
    CLIENT_ID: ''
};
var constantsiOS = {
    ACH_Bot01: 'Bot01',
    ACH_Bot02: 'Bot02',
    ACH_Bot03: 'Bot03',
    ACH_Bot04: 'Bot04',
    ACH_Bot05: 'Bot05',
    ACH_Bot06: 'Bot06',
    ACH_Bot07: 'Bot07',
    ACH_Bot08: 'Bot08',
    ACH_Bot09: 'Bot09',
    ACH_Bot10: 'Bot10',
    ACH_Bot11: 'Bot11',
    ACH_Bot12: 'Bot12',
    ACH_Bot13: 'Bot13',
    ACH_Bot14: 'Bot14',
    ACH_Bot15: 'Bot15',
    ACH_Bot16: 'Bot16',
    ACH_Bot17: 'Bot17',
    ACH_Bot18: 'Bot18'
};
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var LevelAction = (function (_super) {
            __extends(LevelAction, _super);
            function LevelAction() {
                _super.apply(this, arguments);
            }
            return LevelAction;
        })(GamePlay.LevelTimeAttack);
        GamePlay.LevelAction = LevelAction;
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GamePlay;
    (function (GamePlay) {
        var Views;
        (function (Views) {
            var ItemButton = (function (_super) {
                __extends(ItemButton, _super);
                function ItemButton(item, event) {
                    _super.call(this, "--", "fontWhite", "puzzle/btbuyitem", function () {
                        event(item);
                    });
                    var part = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
                    this.addChild(part);
                    part.pivot.x = 113 / 2;
                    part.pivot.y = 93 / 2;
                    part.x = 250 - 245;
                    part.scale.x = 0.8;
                    part.scale.y = 0.8;
                    var icon = gameui.AssetsManager.getBitmap("puzzle/icon_" + item);
                    this.addChild(icon);
                    icon.pivot.x = 139 / 2;
                    icon.pivot.y = 148 / 2;
                    icon.x = 90 - 245;
                    this.bitmapText.pivot.x = 0;
                    this.bitmapText.x = 330 - 246;
                    this.bitmapText.y -= 0;
                }
                ItemButton.prototype.updatePrice = function (price) {
                    this.bitmapText.text = price.toString();
                };
                return ItemButton;
            })(gameui.BitmapTextButton);
            Views.ItemButton = ItemButton;
        })(Views = GamePlay.Views || (GamePlay.Views = {}));
    })(GamePlay = FlipPlus.GamePlay || (FlipPlus.GamePlay = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var GameServices = (function () {
        function GameServices() {
            var _this = this;
            if (!navigator.onLine)
                return;
            // get device os info
            var os = "web";
            if (Cocoon.Device.getDeviceInfo())
                os = Cocoon.Device.getDeviceInfo().os;
            if (os == "windows" || os == "web")
                return;
            if (os == "ios") {
                //initializes game services
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(constantsiOS);
            }
            else if (os == "android") {
                //initializes game services
                var gp = Cocoon.Social.GooglePlayGames;
                //if (!this.socialService.isLoggedIn()) {
                gp.init({});
                this.socialService = gp.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(contantsAndroid);
            }
            else if (os == "web") {
                //initializes game services
                var gp = Cocoon.Social.GooglePlayGames;
                gp.init({
                    clientId: contantsAndroid.CLIENT_ID
                });
                this.socialService = gp.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(contantsAndroid);
                this.socialService.setTemplates("scripts/templates/leaderboards.html", "scripts/templates/achievements.html");
            }
            // login into game Services
            setTimeout(function () {
                if (_this.socialService && !_this.socialService.isLoggedIn()) {
                    _this.socialService.login(function (loggedIn, error) {
                        if (error)
                            console.error("login error: " + error.message + " " + error.code);
                        else if (!loggedIn)
                            console.log("login cancelled");
                    });
                }
            }, 10000);
        }
        // show native leaderboards
        GameServices.prototype.showLeaderboard = function () {
            if (!navigator.onLine)
                return;
            if (!this.socialService)
                return;
            try {
                this.socialService.showLeaderboard();
            }
            catch (e) { }
        };
        // show a achievement.
        GameServices.prototype.showAchievements = function () {
            if (!navigator.onLine)
                return;
            if (!this.socialService)
                return;
            try {
                this.socialService.showAchievements();
            }
            catch (e) { }
        };
        // submit a score
        GameServices.prototype.submitScore = function (score) {
            if (!this.socialService) {
                console.error("No social Service");
                return;
            }
            if (!navigator.onLine) {
                console.error("No social connection");
                return;
            }
            try {
                var sc;
                sc = score;
                if (Cocoon.Device.getDeviceInfo().os == "android")
                    sc = score.toString();
                this.socialService.submitScore(sc, function (error) {
                    if (error)
                        console.error("score error: " + error.message);
                    else
                        console.log("submited score: " + score);
                });
            }
            catch (e) {
                console.error("error: " + JSON.stringify(e));
            }
        };
        // submit an achievement
        GameServices.prototype.submitAchievent = function (achievementId) {
            if (!navigator.onLine)
                return;
            if (!this.socialService)
                return;
            try {
                this.socialService.submitAchievement(achievementId, function (error) {
                    if (error)
                        console.error("submitAchievement error: " + error.message);
                    else
                        console.log("submited Achievement: " + achievementId);
                });
            }
            catch (e) { }
        };
        return GameServices;
    })();
    FlipPlus.GameServices = GameServices;
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Menu;
    (function (Menu) {
        var ActionlevelsMenu = (function (_super) {
            __extends(ActionlevelsMenu, _super);
            function ActionlevelsMenu() {
                _super.apply(this, arguments);
            }
            ActionlevelsMenu.prototype.back = function () {
                FlipPlus.FlipPlusGame.showMainScreen();
            };
            return ActionlevelsMenu;
        })(Menu.WorkshopMenu);
        Menu.ActionlevelsMenu = ActionlevelsMenu;
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
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
                var temp = this.introMc;
                this.addChild(temp);
                this.introMc.stop();
                this.introMc.addEventListener("d1", function () { ; });
                this.introMc.addEventListener("readyToPlay", function () { _this.emit("readyToPlay"); });
                this.introMc.addEventListener("d2", function () { });
                this.introMc.addEventListener("end", function () { FlipPlus.FlipPlusGame.showProjectsMenu(); _this.emit("end"); });
                this.popup.addEventListener("onclose", function () { _this.introMc.play(); });
                this.addChild(this.popup);
            }
            Intro.prototype.playIntroPart1 = function () {
                this.introMc.gotoAndPlay("part1");
                this.popup.visible = false;
            };
            Intro.prototype.playIntroPart2 = function () {
                this.introMc.gotoAndPlay("part2");
                this.popup.visible = false;
            };
            return Intro;
        })(PIXI.Container);
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
                _super.call(this, StringResources.menus.shop, previousScreen, "menu/titleRed");
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
                this.loadingObject = new PIXI.Container();
                this.statusText = gameui.AssetsManager.getBitmapText("", "fontBlue");
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
                productListItem.addEventListener("mousedown", function (event) { Cocoon.Store.purchase(product.productId); });
                return productListItem;
            };
            // show a loading message
            ShopMenu.prototype.showLoading = function () {
                this.statusText.text = StringResources.menus.loading;
                this.statusText.pivot.x = this.statusText.getLocalBounds().width / 2;
                this.loadingObject.visible = true;
            };
            // show a loading message
            ShopMenu.prototype.showLoaded = function () {
                this.statusText.visible = false;
                this.loadingObject.visible = false;
            };
            // show a error message in it
            ShopMenu.prototype.showError = function () {
                this.statusText.text = StringResources.menus.errorShop;
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
                // TODO
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
                    case "50":
                        FlipPlus.FlipPlusGame.coinsData.increaseAmount(50);
                        break;
                    case "200":
                        FlipPlus.FlipPlusGame.coinsData.increaseAmount(200);
                        break;
                    case "500":
                        FlipPlus.FlipPlusGame.coinsData.increaseAmount(500);
                        break;
                    case "1000":
                        FlipPlus.FlipPlusGame.coinsData.increaseAmount(1000);
                        break;
                    case "100":
                        FlipPlus.FlipPlusGame.coinsData.increaseAmount(100);
                        FlipPlus.FlipPlusGame.storyData.setStoryPlayed("halfTime");
                        break;
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
                this.addChild(gameui.AssetsManager.getBitmapText(name, "fontWhite").set({ x: -100 }));
                // adds Value
                this.addChild(gameui.AssetsManager.getBitmapText(localizedPrice, "fontBlue").set({ x: 375, y: -70 }));
                // adds buy text
                this.addChild(gameui.AssetsManager.getBitmapText(StringResources.menus.shop, "fontBlue").set({ x: 375, y: 40 }));
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
                ///this.content.hitArea = new PIXI.Graphics().drawRect(0, 0, defaultWidth, defaultHeight));
                //adds callback forrr touch
                this.content.addEventListener("mousedown", function () {
                    _this.nextSlide();
                });
                //adds hitarea
                /// check
                /// var s = new PIXI.Graphics().beginFill(0xFFFFFF).drawRect(0, 0, defaultWidth, defaultHeight);
                /// this.content.hitArea = s;
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
                bt.addEventListener("mousedown", function (event) { Cocoon.Store.purchase(productList[0].productId); });
                // adds Value
                bt.addChild(gameui.AssetsManager.getBitmapText(productList[0].localizedPrice, "fontWhite").set({ x: -210, y: 255 }));
                // adds buy text
                bt.addChild(gameui.AssetsManager.getBitmapText(StringResources.menus.buy, "fontBlue").set({ x: 165, y: 250 }));
            };
            SpecialOfferMenu.prototype.buildHeader = function (title, previousScreen, color) {
                _super.prototype.buildHeader.call(this, StringResources.menus.specialOffer, previousScreen, color);
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
                this.addBeach();
                this.content.interactive = true;
                var tap = function () {
                    FlipPlus.FlipPlusGame.showMainScreen();
                    gameui.AudiosManager.playSound("button");
                };
                this.content.on("tap", tap);
                this.content.on("click", tap);
            }
            TitleScreen.prototype.addBeach = function () {
                var logo = new lib.LogoScreen();
                this.content.addChild(logo);
                this.beach = logo["instance"]["instance_14"];
            };
            TitleScreen.prototype.redim = function (headerY, footerY, width, height) {
                _super.prototype.redim.call(this, headerY, footerY, width, height);
                if (this.beach)
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
                    this.pivot.x = 1458 / 2;
                    this.pivot.y = 410 / 2;
                    this.updateProjectInfo();
                }
                //createObjects
                BonusItem.prototype.createObjects = function (bonusId) {
                    var _this = this;
                    var color = "#cfe3ec";
                    var font = "Bold 100px " + defaultFont;
                    //clean all objects
                    this.removeChildren();
                    //if unlocked
                    var stars = FlipPlus.FlipPlusGame.projectManager.getStarsCount();
                    if (stars >= bonusData[bonusId].cost) {
                        //background
                        var bg = "projects/" + bonusId;
                        var s = gameui.AssetsManager.getBitmap(bg);
                        this.addChild(s);
                        //timer text 
                        this.timerText = gameui.AssetsManager.getBitmapText("00:00:00", "fontTitle");
                        this.timerText.pivot.x = this.timerText.getLocalBounds().width / 2;
                        this.timerText.x = 1000;
                        this.timerText.y = 100;
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
                        var tx = gameui.AssetsManager.getBitmapText(bonusData[bonusId].cost.toString(), "fontBlue");
                        this.addChild(tx);
                        tx.pivot.x = tx.getLocalBounds().width;
                        tx.x = 650;
                        tx.y = 155;
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
                        this.timerText.text = StringResources.mm_play;
                        this.timerText.pivot.x = this.timerText.getLocalBounds().width / 2;
                        if (!createjs.Tween.hasActiveTweens(this.timerText)) {
                            this.timerText.set({ scaleX: 1, scaleY: 1 });
                        }
                    }
                    else {
                        createjs.Tween.removeTweens(this.timerText);
                        this.timerText.text = this.toHHMMSS(time);
                        this.timerText.pivot.x = this.timerText.getLocalBounds().width / 2;
                        this.timerText.scale.x = this.scale.y = 1;
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
                    this.pivot = this.position;
                    //hide popup
                    this.visible = false;
                    this.mouseEnabled = true;
                    /// Check this.hitArea = (new PIXI.Graphics().beginFill(0xFFFFFF).drawRect(0, 0, defaultWidth, defaultHeight));
                    this.addEventListener("mousedown", function () { _this.closePopUp(); });
                }
                //public method to invoke the popup
                Message.prototype.showtext = function (text, timeout, delay) {
                    var _this = this;
                    if (timeout === void 0) { timeout = 3000; }
                    if (delay === void 0) { delay = 0; }
                    //clean everything
                    this.removeChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/message");
                    bg.x = 0;
                    bg.y = defaultHeight / 2 - 500;
                    this.addChild(bg);
                    //create a text 
                    var titleDO = gameui.AssetsManager.getBitmapText(text.toUpperCase(), "fontTitle");
                    titleDO.pivot.x = titleDO.textWidth / 2;
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = defaultHeight / 2 - 100;
                    ;
                    this.addChild(titleDO);
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
                    this.emit("onclose");
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
            })(PIXI.Container);
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
                    this.pagesContainer.interactive = true;
                    this.pagesContainer.hitArea = null;
                    //configure pages
                    for (var i in pages)
                        pages[i].x = this.pagewidth * i;
                    //adds event
                    var xpos;
                    var initialclick;
                    var moving = false;
                    var finishedMove = true;
                    var pointerStart = function (e) {
                        var pos = pagesContainer.parent.toLocal(e.data.global);
                        if ((!minY && !maxY) || (pos.y > minY && pos.y < maxY)) {
                            initialclick = pos.x;
                            xpos = pos.x - pagesContainer.x;
                            moving = true;
                            //hide all pages
                            _this.showOlnyPage(_this.currentPageIndex, 1);
                        }
                    };
                    var pointerMove = function (e) {
                        //intervalo de tempo
                        if (!finishedMove)
                            return;
                        finishedMove = false;
                        if (moving) {
                            var pos = pagesContainer.parent.toLocal(e.data.global);
                            pagesContainer.x = pos.x - xpos;
                            if (Math.abs(pos.x - initialclick) > 50)
                                _this.cancelClick = true;
                        }
                        finishedMove = true;
                    };
                    var pointerEnd = function (e) {
                        if (moving) {
                            moving = false;
                            var pos = pagesContainer.parent.toLocal(e.data.global);
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
                    };
                    // records position on mouse down
                    this.pagesContainer.on("mousedown", pointerStart);
                    this.pagesContainer.on("touchstart", pointerStart);
                    //drag the container
                    this.pagesContainer.on("mousemove", pointerMove);
                    this.pagesContainer.on("touchmove", pointerMove);
                    //verifies the relase point to tween to the next page
                    this.pagesContainer.on("mouseup", pointerEnd);
                    this.pagesContainer.on("mouseupoutside", pointerEnd);
                    this.pagesContainer.on("touchend", pointerEnd);
                    this.pagesContainer.on("touchendoutside", pointerEnd);
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
                        this.showPage(pageId);
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
            var PauseMenu = (function (_super) {
                __extends(PauseMenu, _super);
                function PauseMenu() {
                    var _this = this;
                    _super.call(this);
                    this.visible = false;
                    // add menu buttons
                    var p0 = -600;
                    var p = 0;
                    var s = 330;
                    var soundMenu = new FlipPlus.Menu.View.SoundMenu();
                    soundMenu.y = p0;
                    this.addChild(soundMenu);
                    p++;
                    this.addChild(new gameui.IconBitmapTextButton("menu/icleave", StringResources.leave.toUpperCase(), "fontWhite", "menu/btmenu", function () {
                        _this.emit("leave");
                    }, undefined, "left").set({ y: p0 + p * s }));
                    p++;
                    var skipBt = new gameui.IconBitmapTextButton("menu/icskip", StringResources.skip.toUpperCase(), "fontWhite", "menu/btmenu", function () {
                        _this.emit("skip");
                    }, undefined, "left");
                    skipBt.set({ y: p0 + p * s });
                    skipBt.bitmapText.y = -40;
                    this.addChild(skipBt);
                    this.skipPriceText = gameui.AssetsManager.getBitmapText("", "fontWhite");
                    this.skipPriceText.set({ x: skipBt.bitmapText.x });
                    this.skipPriceIcon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
                    this.skipPriceIcon.set({ x: skipBt.bitmapText.x + 100, y: 20, scaleX: 0.8, scaleY: 0.8 });
                    skipBt.addChild(this.skipPriceIcon);
                    skipBt.addChild(this.skipPriceText);
                    p++;
                    this.addChild(new gameui.IconBitmapTextButton("menu/icrestart", StringResources.restart.toUpperCase(), "fontWhite", "menu/btmenu", function () {
                        _this.emit("restart");
                    }, undefined, "left").set({ y: p0 + p * s }));
                    p++;
                    this.addChild(new gameui.IconBitmapTextButton("menu/iccontinue", StringResources.continue.toUpperCase(), "fontWhite", "menu/btmenu", function () {
                        _this.emit("continue");
                    }, undefined, "left").set({ y: p0 + p * s }));
                    p++;
                }
                PauseMenu.prototype.updateSkipPrice = function (price) {
                    this.skipPriceText.text = price.toString();
                    this.skipPriceIcon.x = this.skipPriceText.x + this.skipPriceText.getLocalBounds().width + 30;
                };
                return PauseMenu;
            })(gameui.UIItem);
            View.PauseMenu = PauseMenu;
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
                    this.removeChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popupTutorial");
                    bg.x = 150;
                    bg.y = 250;
                    this.addChild(bg);
                    //create a text
                    //create a titleShadow
                    var textDO = gameui.AssetsManager.getBitmapText("", "fontBlue");
                    textDO.x = defaultWidth / 2;
                    this.addChild(textDO);
                    textDO.y = defaultHeight * 0.2;
                    //updates text
                    textDO.text = text.toUpperCase();
                    textDO.pivot.x = textDO.getLocalBounds().width / 2;
                    this.addsClickIndicator();
                };
                PopupBot.prototype.addsClickIndicator = function () {
                    //add click indicator
                    var ind = gameui.AssetsManager.getMovieClip("touch");
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
                    this.removeChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    // create a text
                    var textDO = gameui.AssetsManager.getBitmapText(StringResources.help_restart, "fontWhite");
                    this.addChild(textDO);
                    textDO.pivot.x = textDO.getLocalBounds().width / 2;
                    textDO.x = defaultWidth / 2;
                    // add Image
                    var img = gameui.AssetsManager.getBitmap("menu/imrestart");
                    this.addChild(img);
                    img.x = 80;
                    img.y = 540;
                    // updates title and text values
                    textDO.y = 550;
                    textDO.x = 1000;
                    // Add Buttons
                    var bt = new gameui.BitmapTextButton(StringResources.help_restart_bt, defaultFontFamilyNormal, "menu/btoptions", function () {
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
                    this.removeChildren();
                    //draw background
                    var bg = gameui.AssetsManager.getBitmap("popups/popup");
                    bg.x = 0;
                    bg.y = 100;
                    this.addChild(bg);
                    // create a text
                    var textDO = gameui.AssetsManager.getBitmapText(StringResources["help_" + item], "fontWhite");
                    this.addChild(textDO);
                    textDO.pivot.x = textDO.getLocalBounds().width / 2;
                    textDO.y = 550;
                    textDO.x = 1100;
                    // add Image
                    var img = gameui.AssetsManager.getBitmap(customImage || "menu/imitem");
                    this.addChild(img);
                    img.x = 80;
                    img.y = 740;
                    img.pivot.y = img.getLocalBounds().height / 2;
                    // Add cancel Buttons
                    var cancelButton = new gameui.BitmapTextButton(StringResources.help_cancel_bt, "fontWhite", "menu/btoptions", function () {
                        _this.closePopUp();
                        cancel();
                    });
                    this.addChild(cancelButton);
                    cancelButton.x = defaultWidth / 4;
                    cancelButton.y = 1150;
                    // Add ok Buttons
                    var acceptBt = new gameui.BitmapTextButton(StringResources[item], "fontWhite", "menu/btoptions", function () {
                        _this.closePopUp();
                        accept();
                    });
                    this.addChild(acceptBt);
                    acceptBt.bitmapText.y -= 50;
                    acceptBt.x = defaultWidth / 4 * 3;
                    acceptBt.y = 1150;
                    //add stuff on button
                    acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + item).set({ x: -170, y: -10 }));
                    acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_coin").set({ x: 90, y: 10, scaleX: 0.8, scaleY: 0.8 }));
                    acceptBt.addChild(gameui.AssetsManager.getBitmapText(price.toString(), "fontWhite").set({ x: 10 }));
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
                        //add levels information
                        _this.addObjects(project);
                        //activate layer
                        _this.activate();
                        _this.redim(_this.headerY, _this.footerY);
                    };
                    this.onHidePage = function () {
                        _this.removeChildren();
                    };
                }
                //--------------------- Initialization ---------------------
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
                    this.statusArea = new PIXI.Container();
                    this.statusArea.pivot.x = this.statusArea.x = defaultWidth / 2;
                    var bg = gameui.AssetsManager.getBitmap("partshud");
                    bg.y = 0; //150;
                    bg.x = defaultWidth / 2;
                    bg.scale.x = 2;
                    bg.pivot.x = bg.getLocalBounds().width / 2;
                    this.statusArea.addChild(bg);
                    var l = gameui.AssetsManager.getBitmapText(project.nickName.toUpperCase(), "fontWhite");
                    l.y = 20; //250;
                    l.pivot.x = l.getLocalBounds().width / 2;
                    l.x = defaultWidth / 2;
                    this.statusArea.addChild(l);
                    this.addChild(this.statusArea);
                };
                //Adds level thumbs to the scene
                ProjectWorkshopView.prototype.addProjectMachine = function (project) {
                    var _this = this;
                    var levelMachine = new PIXI.Container;
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
                                _this.emit("levelClick", { level: e.level, parameters: e.parameters });
                            });
                            this.levelGrid.x = 180;
                            this.levelGrid.y = 1538 - 2048;
                            levelMachine.addChild(this.levelGrid);
                        }
                        else {
                            var text = gameui.AssetsManager.getBitmapText(StringResources.ws_Locked, "fontBlue");
                            text.pivot.x = text.getLocalBounds().width / 2;
                            text.y = 1738 - 2048;
                            text.x = defaultWidth / 2;
                            levelMachine.addChild(text);
                        }
                    }
                    else {
                        //TODO mudar o nome disso.
                        var text = gameui.AssetsManager.getBitmapText(StringResources.ws_NotFree, "fontBlue");
                        text.pivot.x = text.getLocalBounds().width / 2;
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
                    this.createPercentualFill(project);
                    this.update();
                    this.createHitArea();
                }
                // creates hit area
                RobotPreview.prototype.createHitArea = function () {
                    this.hitArea = new PIXI.Rectangle(-768, -900, 1536, 1400);
                };
                //create graphics
                RobotPreview.prototype.createPercentualFill = function (project) {
                    var size = 300;
                    this.fill = gameui.AssetsManager.getBitmap("workshop/" + project.name + "_fill");
                    this.stroke = gameui.AssetsManager.getBitmap("workshop/" + project.name + "_stroke");
                    this.fill.pivot.x = this.stroke.pivot.x = this.fill.getLocalBounds().width / 2;
                    this.fill.pivot.y = this.stroke.pivot.y = this.fill.getLocalBounds().height;
                    this.fill.pivot.x - 25;
                    this.fill.pivot.y - 25;
                    this.addChild(this.fill);
                    this.addChild(this.stroke);
                    //mask
                    this.percentMask = new PIXI.Graphics();
                    this.percentMask.beginFill(0xFFFFFF).drawRect(-size / 2, 0, size, -this.fill.getLocalBounds().height).endFill();
                    this.percentMask.scale.y = 0;
                    this.percentMask.y = -25;
                    this.addChild(this.percentMask);
                    this.fill.mask = this.percentMask;
                };
                // shows up the completed bot
                RobotPreview.prototype.createCompletedBot = function () {
                    // remove fill and stroke
                    this.fill.visible = false;
                    this.stroke.visible = false;
                    this.removeChild(this.fill);
                    this.removeChild(this.stroke);
                    // if final completed bot does not exist, add it
                    if (!this.completeBot) {
                        this.completeBot = new libmybots[this.project.name]();
                        this.addChild(this.completeBot);
                        this.completeBot.y -= 260;
                    }
                };
                //update percentage
                RobotPreview.prototype.update = function (animate) {
                    if (animate === void 0) { animate = false; }
                    try {
                        //já acabou de terminar um level
                        if (animate)
                            this.animateBotFillTo();
                        if (!animate)
                            if (this.project.UserData.complete)
                                this.createCompletedBot();
                            else
                                this.updateFill();
                    }
                    catch (e) { }
                    ;
                };
                // update bot fill based on user data
                RobotPreview.prototype.updateFill = function () {
                    this.percentMask.scale.y = this.project.UserData.percent;
                };
                //animate finishing level
                RobotPreview.prototype.animateBotFillTo = function (color) {
                    var _this = this;
                    if (color === void 0) { color = 0xffcc2e; }
                    var newValue = this.project.UserData.percent;
                    //boxShape zoom out to the bot
                    var boxShape = new PIXI.Graphics();
                    boxShape.beginFill(color).drawRect(-700, -700, 1400, 1400);
                    boxShape.y = -300;
                    this.addChild(boxShape);
                    createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(function () { _this.removeChild(boxShape); });
                    createjs.Tween.get(this.percentMask).wait(900).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).wait(500).call(function () {
                        if (_this.project.UserData.complete) {
                            _this.createCompletedBot();
                            createjs.Tween.get(_this.fill).wait(300).to({ alpha: 0 }, 600).call(function () { _this.fill.visible = false; });
                            createjs.Tween.get(_this.stroke).wait(300).to({ alpha: 0 }, 600).call(function () { _this.stroke.visible = false; });
                            createjs.Tween.get(_this.completeBot).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, createjs.Ease.quadOut);
                            gameui.AudiosManager.playSound("BotComplete");
                            gameui.AudiosManager.playSound("Robot Talk_0" + Math.ceil(Math.random() * 7), true, 300);
                            _this.castNewEffect();
                        }
                    });
                };
                // show a new glare into the bot
                RobotPreview.prototype.castNewEffect = function () {
                    var _this = this;
                    var dark = gameui.AssetsManager.getBitmap("dark");
                    dark.pivot.x = 50;
                    dark.pivot.y = 50;
                    var bgnewbot = gameui.AssetsManager.getBitmap("bgnewbot");
                    bgnewbot.pivot.x = bgnewbot.getLocalBounds().width / 2;
                    bgnewbot.pivot.y = bgnewbot.getLocalBounds().height / 2;
                    dark.y = bgnewbot.y = -260;
                    this.addChildAt(bgnewbot, 0);
                    this.addChildAt(dark, 0);
                    createjs.Tween.get(dark).
                        to({ alpha: 0, scaleX: 0, scaleY: 0 }).
                        to({ alpha: 1, scaleX: 50, scaleY: 50 }, 400).
                        wait(2600).
                        to({ alpha: 0 }, 200).call(function () {
                        _this.removeChild(dark);
                    });
                    createjs.Tween.get(bgnewbot).
                        to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1.8, scaleY: 1.8 }, 300).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 3600).
                        call(function () {
                        _this.removeChild(bgnewbot);
                    });
                };
                return RobotPreview;
            })(PIXI.Container);
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
            var SoundMenu = (function (_super) {
                __extends(SoundMenu, _super);
                function SoundMenu() {
                    var _this = this;
                    _super.call(this);
                    this.btMusOn = new gameui.IconButton("menu/icmusic", "menu/btmusicon", function () {
                        gameui.AudiosManager.setMusicVolume(0);
                        _this.updateVolumeButtons();
                        FlipPlus.FlipPlusGame.settingsUserData.setMusic(0);
                    }).set({ x: -243.5 });
                    this.btMusOf = new gameui.IconButton("menu/icmusic", "menu/btmusicoff", function () {
                        gameui.AudiosManager.setMusicVolume(1);
                        _this.updateVolumeButtons();
                        FlipPlus.FlipPlusGame.settingsUserData.setMusic(1);
                    }).set({ x: -243.5 });
                    this.btSndOn = new gameui.IconButton("menu/icsound", "menu/btmusicon", function () {
                        gameui.AudiosManager.setSoundVolume(0);
                        _this.updateVolumeButtons();
                        FlipPlus.FlipPlusGame.settingsUserData.setSoundfX(0);
                    }).set({ x: 243.5 });
                    this.btSndOf = new gameui.IconButton("menu/icsound", "menu/btmusicoff", function () {
                        gameui.AudiosManager.setSoundVolume(1);
                        _this.updateVolumeButtons();
                        FlipPlus.FlipPlusGame.settingsUserData.setSoundfX(1);
                    }).set({ x: 243.5 });
                    this.addChild(this.btMusOn);
                    this.addChild(this.btMusOf);
                    this.addChild(this.btSndOn);
                    this.addChild(this.btSndOf);
                    this.updateVolumeButtons();
                }
                SoundMenu.prototype.updateVolumeButtons = function () {
                    this.btMusOn.visible = gameui.AudiosManager.getMusicVolume() == 1;
                    this.btMusOf.visible = gameui.AudiosManager.getMusicVolume() == 0;
                    this.btSndOn.visible = gameui.AudiosManager.getSoundVolume() == 1;
                    this.btSndOf.visible = gameui.AudiosManager.getSoundVolume() == 0;
                };
                return SoundMenu;
            })(PIXI.Container);
            View.SoundMenu = SoundMenu;
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
                    this.removeChildren();
                    //create a title
                    var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
                    this.addChild(titleDO);
                    titleDO.x = defaultWidth / 2;
                    titleDO.y = defaultHeight / 2;
                    //updates text
                    titleDO.text = text.toUpperCase();
                    titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
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
                        _this.emit("onclose");
                    });
                };
                return TextEffect;
            })(gameui.UIItem);
            View.TextEffect = TextEffect;
        })(View = Menu.View || (Menu.View = {}));
    })(Menu = FlipPlus.Menu || (FlipPlus.Menu = {}));
})(FlipPlus || (FlipPlus = {}));
var FlipPlus;
(function (FlipPlus) {
    var Levels;
    (function (Levels) {
        // Controls projects and Levels.
        // Model
        var ActionLevelsManager = (function (_super) {
            __extends(ActionLevelsManager, _super);
            function ActionLevelsManager() {
                _super.apply(this, arguments);
            }
            // #region initialization ----------------------------------------//
            ActionLevelsManager.prototype.loadProjects = function (data) {
                for (var p in data) {
                    delete data[p].UserData;
                }
                for (var p in data) {
                    for (var l in data[p].levels) {
                        delete data[p].levels[l].userdata;
                    }
                }
                this.levelsData = data;
                // get a user data for each level/project
                this.levelsUserDataManager.addUserData(this.levelsData);
            };
            // #endregion
            //Updates user data project status
            ActionLevelsManager.prototype.updateProjectUserData = function (project) {
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
            return ActionLevelsManager;
        })(Levels.ProjectManager);
        Levels.ActionLevelsManager = ActionLevelsManager;
    })(Levels = FlipPlus.Levels || (FlipPlus.Levels = {}));
})(FlipPlus || (FlipPlus = {}));
var StringResources = {
    ld: "Loading",
    it_text1: "N3-S needs\nrepair",
    it_text2: "alone = bad\nfriends=good",
    tut_1_1_title: "The plus shape",
    tut_1_1_text: "flip the white squares to make\nthem color squares",
    tut_1_2_text: "tiles always flip in a \"plus shape\"\nfrom the center",
    tut_1_2_title: "Great",
    tut_2_1_title: "Flip to build",
    tut_2_1_text: "to finish the board, you have to turn\nevery white block in color block",
    tut_2_2_title: "Board complete!",
    tut_2_2_text: "Great, no white tiles in the board",
    tut_2_3_title: "Star",
    tut_2_3_text: "you solved all green blocks",
    tut_3_1_title: "Flip to invert",
    tut_3_1_text: "the plus shape inverts the tiles,\nwhite gets color and color gets white",
    tut_3_2_title: "Nice Work",
    tut_3_2_text: "purple tiles work the\nsame way as green tiles",
    tut_4_1_title: "hints",
    tut_4_1_text: "the light bulb button gives you a hint",
    tut_4_2_title: "too easy?",
    tut_4_2_text: "light bulbs help you out,\nbut they are limited",
    tut_5_1_title: "Bot S-N3S",
    tut_5_1_text: "finish this board\nto complete S-N3S repairs!",
    mm_play: "PLAY",
    op_back: "Back",
    op_erase: "Erase All Data",
    op_options: "Options",
    pr_notStarsTitle: "Not enough stars",
    pr_notStarsText: "you only have # stars.\nYou need at least stars #\nto unlock this project\nplay more levels to earn stars.",
    pr_notTimeText: "Not Yet.#You must wait # before play this bonus level",
    ws_Locked: "LOCKED",
    ws_NotFree: "NOT FREE",
    gp_noMoreSkip: "No more parts",
    gp_noMoreHints: "You get itens buy playing the time\nbonus on the projects screen",
    gp_finishPuzzle: "Well done",
    gp_pz_Popup1Title: "Time Attack",
    gp_pz_Popup1Text1: "Solve",
    gp_pz_Popup1Text2: "boards in",
    gp_pz_Popup1Text3: "seconds",
    gp_pz_statusEnd: "END",
    gp_pz_timeUP: "Time's up",
    gp_mv_Popup1Title: "Flip Challenge",
    gp_mv_Popup1Text1: "Solve in",
    gp_mv_Popup1Text3: "taps",
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
    restart: "Restart",
    continue: "Continue",
    leave: "Leave",
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
    it_text1: "N3-S precisa de\nreparos",
    it_text2: "sozinho = ruim\namigos= bom",
    tut_1_1_title: "Forma de cruz",
    tut_1_1_text: "Vire todos os blocos brancos\npara blocos verdes",
    tut_1_2_text: "Os blocos sempre são invertidos\nem \"forma de cruz\" quando ativados",
    tut_1_2_title: "Ótimo!",
    tut_2_1_title: "Vire para construir",
    tut_2_1_text: "Para concluir o quadro vire todos\nos blocos brancos para coloridos.",
    tut_2_2_title: "Nível completo!",
    tut_2_2_text: "Ótimo, sem blocos brancos no quadro",
    tut_2_3_title: "Estrela",
    tut_2_3_text: "Você resolveu todos os quadros verdes.",
    tut_3_1_title: "toque para inverter",
    tut_3_1_text: "A forma de cruz sempre\ninverte a cor do quadradinho\nentre branco e colorido",
    tut_3_2_title: "Parabéns",
    tut_3_2_text: "Os blocos roxos fucionam da\nmesma forma que os verdes",
    tut_4_1_title: "Dicas",
    tut_4_1_text: "As lâmpadas são uma dica\nde qual quadradinho tocar",
    tut_4_2_title: "Facil?",
    tut_4_2_text: "As lâmpadas precisam de peças.\nConsiga peças jogando BONUS",
    tut_5_1_title: "Bot S-N3S",
    tut_5_1_text: "Termine essa tela para\nfinalizar os reparos no S-N3S!",
    mm_play: "JOGAR",
    op_back: "Voltar",
    op_erase: "apagar todos os dados",
    op_options: "Opções",
    pr_notStarsTitle: "sem estrelas",
    pr_notStarsText: "Você tem # estrelas e precisa\nde # estrelas para desbloquear.\nJogue mais para ganhar estrelas.",
    pr_notTimeText: "Ainda não. Você deve esperar # antes de jogar este bônus",
    ws_Locked: "BLOQUEADO",
    ws_NotFree: "Não gratúito",
    gp_noMoreSkip: "Acabaram as peças",
    gp_noMoreHints: "Você pode ganhar mais items jogando\nos bonus na tela projetos",
    gp_finishPuzzle: "Muito bem !",
    gp_pz_Popup1Title: "Contra o tempo",
    gp_pz_Popup1Text1: "Resolva",
    gp_pz_Popup1Text2: "quadros em",
    gp_pz_Popup1Text3: "segundos",
    gp_pz_statusEnd: "Fim",
    gp_pz_timeUP: "Acabou o tempo",
    gp_mv_Popup1Title: "Movimentos",
    gp_mv_Popup1Text1: "Resolva em",
    gp_mv_Popup1Text3: "movimentos",
    gp_mv_statusEnd: "fim",
    gp_mv_noMoreMoves: "Acabou",
    Bonus1_title: "Escolha 3 Barris",
    b1_popup1Ttitle: "Escolha 3 Barris",
    b1_popup1Text: "Alguns Barris tem itens escondidos",
    Bonus2_title: "Encontre os pares",
    b2_noMoreChances: "acabaram as chances",
    b2_finish: "Muito bem!",
    Bonus3_title: "baú do Capitão",
    b3_finish: "Muito bem!",
    b3_noMoreChances: "acabaram as chances",
    desc_item_touch: "Mais movimentos",
    desc_item_time: "Mais tempo",
    desc_item_hint: "Dica",
    desc_item_skip: "Pular",
    desc_item_solve: "Resolva este quadro",
    help_restart: "Se perdeu? No menu\nde pausa você, pode\nrecomeçar a tela!",
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
    restart: "Recomeçar",
    continue: "Continuar",
    leave: "Sair",
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
        ratingDesc: "Está gostando?\nNos Ajude. Dê sua avaliação",
        like: "Curtir",
        share: "Compartilhar",
        watchVideo: "Veja um Video",
        gift: "vídeo em @ min"
    }
};
var language = navigator.language || navigator.userLanguage;
if (language == "pt-BR")
    var StringResources = stringResources_pt;
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
            var fx = gameui.AssetsManager.getMovieClip(effect);
            this.addChild(fx);
            fx.mouseEnabled = false;
            fx.loop = false;
            fx.play();
            fx.x = x;
            fx.y = y;
            fx.scale.y = fx.scale.x = scale;
            fx.onComplete = function () {
                fx.stop();
                _this.removeChild(fx);
            };
        };
        return Effects;
    })(PIXI.Container);
    FlipPlus.Effects = Effects;
})(FlipPlus || (FlipPlus = {}));
//# sourceMappingURL=script.js.map