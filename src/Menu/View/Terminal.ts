module FlipPlus.Menu.View
{
    //View
    export class Terminal extends PIXI.Container
    {
        private screenContaier: PIXI.Container;
        private content: PIXI.Container;
        private textBox: PIXI.extras.BitmapText;
        private staticFX: PIXI.DisplayObject;
        private mymask: PIXI.Sprite;
        private highlight: PIXI.DisplayObject;

        // current Actions
        private currentAction: string;
        private currentParameter: string;

        // interval for changing bonus
        private rotationTimeout: number;
        private secondsIntevalUpdate: number;
        private intervalTimeoutSeconds = 5000;
        private bonuses = ["Bonus1", "Bonus2", "Bonus3"];
        private currentBonus: number = 0;

        constructor()
        {
            super();

            // set informations container
            this.screenContaier = new PIXI.Container();
            this.addChild(this.content);
            this.addChild(this.screenContaier);

            // textBox
            this.textBox = gameui.AssetsManager.getBitmapText("", "fontWhite");
            this.screenContaier.addChild(this.textBox);

            // set its own position
            this.x = 361;
            this.y = 451;

            // add static
            this.staticFX = gameui.AssetsManager.getBitmap("static");
            this.addChild(this.staticFX);
            this.staticFX.set({ x: -60, y: -73 });

            // add Mask
            this.mymask = gameui.AssetsManager.getBitmap("terminalMask");
            this.addChild(this.mymask);
            this.mymask.set({ x: -60, y: -73 });
            this.mask = this.mymask;

            // add Highlight Effect
            this.highlight = gameui.AssetsManager.getBitmap("terminalMask");
            this.addChild(this.highlight);
            this.highlight.set({ x: -60, y: -73 });
            this.highlight.visible = false;
            
            // add click callback
            this.on("tap", () => { this.interaction() });
            this.on("click", () => { this.interaction() });
            
            // add Effects
            this.on("mousedown", (event: any) => { this.effectClickOn(); })
            this.on("touchstart", (event: any) => { this.effectClickOn(); })

            this.on("touchend", (event: any) => { this.effectClickOff(); })
            this.on("mouseup", (event: any) => { this.effectClickOff(); })
            this.on("mouseupoutside", (event: any) => { this.effectClickOff(); });
            this.on("touchendoutside", (event: any) => { this.effectClickOff(); });
            
            this.interactive = true;
            this.hitArea = new PIXI.Rectangle(0, 0, 976, 527);
        }

        private interaction() {
            if (this.currentAction) {
                if (this.currentAction == "next") {
                     
                }
                else {
                    this.emit(this.currentAction, this.currentParameter)
                }
            }
        }

        private effectClickOn() {
            if (!this.currentAction) return;
            gameui.AudiosManager.playSound("button");
            this.staticFX.visible = true;
            this.staticFX.alpha = 1;
        }

        private effectClickOff() {
            this.staticFX.visible = false;
        }

        // Activate, Or show bonus, or show a sale.
        public activate() {
            //this.showBonusStatus();
        }
        
        // Stops all processing in the terminal
        public desactivate() {
            // clear current interval
            if (this.secondsIntevalUpdate)   clearInterval(this.secondsIntevalUpdate);
            if (this.rotationTimeout) clearInterval(this.rotationTimeout);
        }

        // set a container graphic into the Terminal.
        public setContent(content: PIXI.Container) {
            this.textBox.text = "";
            var oldContent = this.content;
            
            // play Sound
            gameui.AudiosManager.playSound("terminal")

            // animates out the monitor content
            if (oldContent) {
                createjs.Tween.get(oldContent).to({ scaleX: 3, scaleY: 0, alpha: 0},200, createjs.Ease.quadOut).call(() => {
                    this.removeChild(oldContent);
                });
            }

            // animates static
            createjs.Tween.get(this.staticFX).
                to({ alpha: 0.1, y: -400 }, 50).
                to({ alpha: 0.7, y: -300 }, 50).
                to({ alpha: 0.1, y: -200 }, 50).
                to({ alpha: 0.7, y: -100 }, 50).
                to({ alpha: 0.1, y:  0   }, 50);
            
            // animates in the new content
            this.content = content;
            this.addChild(content);
            content.rotation = -0.015
            content.scaleX = content.scaleY = 0.8;
            createjs.Tween.get(content).to({ scaleX: 0, scaleY: 3, alpha: 0 }).wait(200).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1}, 200, createjs.Ease.quadOut);
        }

        public setTextIcon(title: string, text: string, icon: string, iconText: string) {

            clearInterval(this.rotationTimeout);

            var space = 20;
            var firstLine = -210;
            var lastLine = 110;
            var middleLine = (firstLine + lastLine) / 2;

            var content = new PIXI.Container();
            
            var titleDO = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "fontStrong",0xffffff,1);
            var smallText = gameui.AssetsManager.getBitmapText(iconText.toUpperCase(), "fontWhite");
            var iconDO = gameui.AssetsManager.getBitmap(icon);
            var textDO = gameui.AssetsManager.getBitmapText(text, "fontWhite");

            titleDO.y = firstLine;
            titleDO.regX = titleDO.textWidth / 2;
            titleDO.regY = titleDO.textHeight / 2;

            titleDO.name = "title";
            titleDO.scaleX = titleDO.scaleY = 950 / Math.max(titleDO.textWidth * titleDO.scaleX, 950) * titleDO.scaleX

            iconDO.y = firstLine;
            iconDO.regX = iconDO.width / 2;
            iconDO.regY = iconDO.height / 2;
            iconDO.scaleX = iconDO.scaleY = 1;
            iconDO.name = "icon";

            iconDO.x = -(titleDO.width) / 2 - space
            titleDO.x = iconDO.width * iconDO.scaleX / 2 + space;
            
            textDO.regX = textDO.textWidth / 2;
            textDO.regY = textDO.textHeight / 2;
            textDO.y = middleLine
            textDO.name = "text";

            smallText.y = lastLine;
            smallText.regX = smallText.textWidth / 2;
            smallText.regY = smallText.textHeight / 2;
            smallText.name = "iconText";
            smallText.scaleX = smallText.scaleY = 850 / Math.max(smallText.textWidth, 850)

            content.addChild(titleDO);
            content.addChild(smallText);
            content.addChild(iconDO);
            content.addChild(textDO);
            
            content.x = 420;
            content.y = 250;
            
            this.setContent(content); 

            return content;
        }

        public setText(text: string, timeout: number = 8000) {

            this.currentAction = null;

            clearInterval(this.rotationTimeout);

            var content = new PIXI.Container();
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.maxWidth = 920;
            textDO.x = - 500;
            textDO.y = - 330;

            content.addChild(textDO);

            content.x = 420;
            content.y = 250;

            this.setContent(content);

            var char = 0;

            //textDO.text = text;
            //return;
            var i = setInterval(() => {
                textDO.text = "";
                textDO.text = text.substring(0, char++);
                gameui.AudiosManager.playSound("terminalChar", true);
                if (char > text.length)
                    clearInterval(i);
            }, 40);

 


        }

        public setTextImediate(text: string, timeout: number = 8000) {

            this.currentAction = null;

            clearInterval(this.rotationTimeout);

            var content = new PIXI.Container();
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.maxWidth = 820;
            textDO.x = - 400;
            textDO.y = - 250;

            content.addChild(textDO);

            content.x = 420;
            content.y = 250;

            this.setContent(content);

            var char = 0;
             
            var i = setInterval(() => {
                textDO.text = "";
                textDO.text = text.substring(0, char++);
                gameui.AudiosManager.playSound("terminalChar", true);
                if (char > text.length)
                    clearInterval(i);
            }, 40);

  
        }

        private hightlighTerminal() {
            this.highlight.visible = true;
            if (!createjs.Tween.hasActiveTweens(this.highlight)) {
                var x = new createjs.Tween(this.highlight)
                    .to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 900,createjs.Ease.quadOut)
                    .to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 900,createjs.Ease.quadOut)
                    .to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 900,createjs.Ease.quadOut)
                    .call(() => {
                        this.highlight.visible = false;
                    });
            }
        }
 
        public showEnding() {
            this.setText(StringResources.endingText, 1000);
        }
         
        private toHHMMSS(sec_num: number): string {
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            var s_hours = hours.toString();
            var s_minutes = minutes.toString();
            var s_seconds = seconds.toString();
            if (hours   < 10) { s_hours   = "0" + hours;   }
            if (minutes < 10) { s_minutes = "0" + minutes; }
            if (seconds < 10) { s_seconds = "0" + seconds; }
            var time = s_hours + ':' + s_minutes + ':' + s_seconds;
            return time;
        }
 

    }
}