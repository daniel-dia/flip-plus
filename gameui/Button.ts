module gameui {

    // Class
    export class Button extends UIItem  {

        public static DefaultSoundId: string;
        public static setDefaultSoundId(soundId: string) {
            this.DefaultSoundId = soundId;
        }


        private soundId: string;


        public enableAnimation = true;
        private originalScaleX: number;
        private originalScaleY: number;
        private mouse = false;

        constructor(soundId?:string) {
            super();
            this.addEventListener("mousedown", (event: createjs.MouseEvent) => { this.onPress(event); });
            this.addEventListener("pressup", (event: createjs.MouseEvent) => { this.onPressUp(event); });

            this.addEventListener("mouseover", () => { this.mouse = true; });
            this.addEventListener("mouseout", () => { this.mouse = false; });

            this.soundId = soundId;

 
        }                                      

        public returnStatus(): void {
            if (!this.mouse) {
                this.scaleX = this.originalScaleX;
                this.scaleY = this.originalScaleY;
            }
        }

        private onPressUp(Event: createjs.MouseEvent) {
            this.mouse = false;
            this.set({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 });
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 200, createjs.Ease.backOut);
        }

        private onPress(Event: createjs.MouseEvent) {
            if (!this.enableAnimation) return

            this.mouse = true;
            if (this.originalScaleX == null) {
                this.originalScaleX = this.scaleX;
                this.originalScaleY = this.scaleY;
            }
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(() => {
                if (!this.mouse) {
                    createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 300, createjs.Ease.backOut);
                }
            });

            if (!this.soundId) 
                this.soundId = Button.DefaultSoundId;

            if (this.soundId)  
                 AudiosManager.playSound(this.soundId);
            
        }

        public setSound(soundId:string) {
            this.soundId = soundId;
        }

    }

    export class ImageButton extends Button {

        public background: createjs.Bitmap;

        constructor(image: string, event?: (event?: createjs.MouseEvent) => any, soundId?:string) {
            super(soundId);

            if (event != null) this.addEventListener("click", event);
           
            //adds image into it
            if (image != null) {

                this.background = <createjs.Bitmap>AssetsManager.getBitmap(image);
                this.addChildAt(this.background, 0);

                //Sets the image into the pivot center.
                if (this.background.getBounds()) {
                    this.centralizeImage();
                }
                else
                    if (this.background["image"])
                    this.background["image"].onload = () => {this.centralizeImage() }
            }

            
            this.createHitArea();
        }

        centralizeImage() {
            this.width = this.background.getBounds().width;
            this.height = this.background.getBounds().height;
            this.background.regX = this.width / 2;
            this.background.regY = this.height / 2;
            this.centered = true; 
        }
    }

    export class TextButton extends ImageButton {

        public text: createjs.Text;

        constructor(text: string = "", font?: string, color?: string, background?: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string) {
            super(background,event,soundId);

            //add text into it.
            text = text.toUpperCase();

            this.text = new createjs.Text(text, font, color);
            this.text.textBaseline = "middle";
            this.text.textAlign = "center";
            
            //createHitArea
            if (background == null)
            {
                this.width = this.text.getMeasuredWidth() *1.5;
                this.height= this.text.getMeasuredHeight()*1.5;
            }
            
            this.addChild(this.text);
            this.createHitArea();

            this.createHitArea();
        }
    }

    export class BitmapTextButton extends ImageButton {

        public bitmapText: createjs.BitmapText;

        constructor(text: string, bitmapFontId: string, background?: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string) {
            super(background, event, soundId);

            //add text into it.
            text = text.toUpperCase();

            this.bitmapText = AssetsManager.getBitmapText(text, bitmapFontId);
            this.addChild(this.bitmapText);
             
            this.bitmapText.regX = this.bitmapText.getBounds().width / 2;
            this.bitmapText.regY = this.bitmapText.lineHeight/2 ;

            this.createHitArea();
        }
    }


    export class IconButton extends TextButton {

        public icon: createjs.DisplayObject;

        constructor(icon: string = "", text = "", font: string = null, color?: string, background?: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string) {

            //add space before text
            if (text != "") text = " " + text;
            
            super(text, font, color ,background, event,soundId);

            //loads icon Image
            this.icon = AssetsManager.getBitmap(icon);
            this.addChild(this.icon);
            this.text.textAlign = "left";

            if (this.icon.getBounds())
                this.icon.regY = this.icon.getBounds().height / 2;
            else 
                if(this.icon["image"])
                    this.icon["image"].onload = () => {
                        this.icon.regY = this.icon.getBounds().height / 2;
                    }
            
            this.updateLabel(text);

            this.createHitArea();
        }

        public updateLabel(value: string) {
            this.text.text = value;
            if (this.icon.getBounds()) {
                this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getMeasuredWidth()) / 2;
                this.text.x = this.icon.x + this.icon.getBounds().width + 10;
            }
        }

        centralizeIcon() {
        }
    }
}