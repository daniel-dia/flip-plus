var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this.interactiveChildren = true;
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
            }
        };
        Button.prototype.onPress = function (Event) {
            this.pressed = true;
            if (!this.enableAnimation)
                return;
            if (this.originalScaleX == null) {
                this.originalScaleX = this.scaleX;
                this.originalScaleY = this.scaleY;
            }
            // createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(() => {
            if (!this.pressed) {
                createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 300, createjs.Ease.backOut);
            }
        };
        ;
        Button.prototype.if = ;
        return Button;
    })(UIItem);
    gameui.Button = Button;
    !this.soundId;
    this.soundId = Button.DefaultSoundId;
    if (this.soundId)
        AudiosManager.playSound(this.soundId);
})(gameui || (gameui = {}));
setSound(soundId, string);
{
    this.soundId = soundId;
}
var ImageButton = (function (_super) {
    __extends(ImageButton, _super);
    function ImageButton(image, event, soundId) {
        var _this = this;
        _super.call(this, event, soundId);
        //adds image into it
        if (image != null) {
            this.background = AssetsManager.getBitmap(image);
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
exports.ImageButton = ImageButton;
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
exports.TextButton = TextButton;
var BitmapTextButton = (function (_super) {
    __extends(BitmapTextButton, _super);
    function BitmapTextButton(text, bitmapFontId, background, event, soundId) {
        _super.call(this, background, event, soundId);
        //add text into it.
        text = text.toUpperCase();
        this.bitmapText = AssetsManager.getBitmapText(text, bitmapFontId);
        this.addChild(this.bitmapText);
        this.bitmapText.pivot.x = this.bitmapText.textWidth / 2;
        this.bitmapText.pivot.y = this.bitmapText.textHeight / 2;
        this.createHitArea();
    }
    return BitmapTextButton;
})(ImageButton);
exports.BitmapTextButton = BitmapTextButton;
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
        this.icon = AssetsManager.getBitmap(icon);
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
exports.IconTextButton = IconTextButton;
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
        this.icon = AssetsManager.getBitmap(icon);
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
exports.IconBitmapTextButton = IconBitmapTextButton;
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton(icon, background, event, soundId) {
        if (icon === void 0) { icon = ""; }
        _super.call(this, icon, "", "", 0xFFFFFF, background, event, soundId);
    }
    return IconButton;
})(IconTextButton);
exports.IconButton = IconButton;
//# sourceMappingURL=Button.js.map