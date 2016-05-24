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
        
        
        // current Actions
        private currentAction: string;
        private currentParameter: string;

        // chance to get a sale
        private saleChance = 0.00;

        // interval for changing bonus
        private rotationInterval: number;
        private secondsIntevalUpdate: number;
        private intervalTimeout = 5000;
        private bonuses = ["Bonus1", "Bonus2", "Bonus3"];
            
        // #region initialization    
        constructor()
        {
            super();

            //set informations container
            this.screenContaier = new PIXI.Container();
            this.addChild(this.content);
            this.addChild(this.screenContaier);

            //textBox
            this.textBox = gameui.AssetsManager.getBitmapText("", "fontWhite");
            this.screenContaier.addChild(this.textBox);

            //set its own position
            this.x = 361;
            this.y = 451;

            //add static
            this.staticFX = gameui.AssetsManager.getBitmap("static");
            this.addChild(this.staticFX);
            this.staticFX.set({ x: -60, y: -73 });

            //add static
            this.mymask = gameui.AssetsManager.getBitmap("terminalMask");
            this.addChild(this.mymask);
            this.mymask.set({ x: -60, y: -73 });
            this.mask = this.mymask;
            this.staticFX.alpha = 0.1;
            
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
            if (this.currentAction) this.emit(this.currentAction, this.currentParameter) 
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

            if (Math.random() < this.saleChance)
                this.showSale();
            else
                this.showBonusStatus();
        }
        
        // Stops all processing in the terminal
        public desactivate() {
            // clear current interval
            if (this.secondsIntevalUpdate)   clearInterval(this.secondsIntevalUpdate);
            if (this.rotationInterval) clearInterval(this.rotationInterval);
        }
              
        // #endregion

        // #region content

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

        public setTextIcon(title: string, text: string, icon: string, iconText: string ) {
            var space = 20;
            var fl = -210;
            var ll = 110;
            var md = (fl + ll) / 2;

            var content = new PIXI.Container();
            
            var titleDO = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "fontStrong");
            var iconTextDO = gameui.AssetsManager.getBitmapText(iconText.toUpperCase(), "fontWhite");
            var iconDO = gameui.AssetsManager.getBitmap(icon);
            var textDO = gameui.AssetsManager.getBitmapText(text, "fontWhite");

            titleDO.regX = titleDO.textWidth / 2;
            titleDO.regY = titleDO.textHeight / 2;
            titleDO.y = fl;
            titleDO.name = "title";
            titleDO.scaleX = titleDO.scaleY = 850 / Math.max(titleDO.textWidth, 850)


            textDO.regX = textDO.textWidth / 2;
            textDO.regY = textDO.textHeight / 2;
            textDO.y = md
            textDO.name = "text";
            
            iconTextDO.regX = iconTextDO.textWidth / 2;
            iconTextDO.regY = iconTextDO.textHeight / 2;
            iconTextDO.name = "iconText";
            iconTextDO.scaleX = titleDO.scaleY = 850 / Math.max(titleDO.textWidth, 850)

            iconDO.regX = iconDO.width / 2;
            iconDO.regY = iconDO.height / 2;
            iconDO.name = "icon";

            iconDO.x = - iconTextDO.width / 2 - space;
            iconTextDO.x = iconDO.width / 2 + space;
            iconDO.y =     ll;
            iconTextDO.y = ll;
            


            content.addChild(titleDO);
            content.addChild(iconTextDO);
            content.addChild(iconDO);
            content.addChild(textDO);
            
            content.x = 420;
            content.y = 250;
            
            this.setContent(content); 

            return content;
        }

        public setText(text: string, timeout: number = 8000) {

            this.currentAction = null;

            clearInterval(this.rotationInterval);

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

            this.rotationInterval = setInterval(() => {
                this.startBonusRotation()
            }, timeout);


        }

        public setTextImediate(text: string, timeout: number = 8000) {

            this.currentAction = null;

            clearInterval(this.rotationInterval);

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

            this.rotationInterval = setInterval(() => {
                this.startBonusRotation()
            }, timeout);


        }

        // #endregion

        // #region sale

        private showSale() {
            this.setTextIcon("SALE","Sale", "buy for 1usd", "partsicon");
        }
        // #endregion

        // #region bonus

        // show bonus rotation or bonus ready
        public showBonusStatus() {

            var bonusready: string;
            // verifies in all bonuses if there is one ready.
            for (var b in this.bonuses) {
                var bonusId = this.bonuses[b];
                var timer = FlipPlusGame.timersData.getTimer(bonusId);
                var unlockedBots = FlipPlusGame.BotsLevelManager.getFinihedProjects().length;
                 

                //if there is a bonus ready, shows it
                if (timer <= 0 && !(unlockedBots < bonusData[bonusId].unlock)) {
                    bonusready = bonusId;
                    break;
                }
            }
            
            if (bonusready)
                this.showBonusInfo(bonusready)
            else
                this.startBonusRotation();
        } 

        // starts bonus channels rotations
        private startBonusRotation() {
            
            // clear current interval
            if (this.rotationInterval) clearInterval(this.rotationInterval);

            // set a new rotation interval
            this.showBonusInfo(this.bonuses[0]);
            var currentBonus = 1;
            this.rotationInterval = setInterval(() => {

                // show a bonus current timer info in loop.
                this.showBonusInfo(this.bonuses[currentBonus]);

                currentBonus++;

                if (currentBonus >= this.bonuses.length)
                    currentBonus = 0;

            }, this.intervalTimeout);
        }

        // show a single bonus timeout info.
        private showBonusInfo(bonusId: string) {
            
            var timeout = FlipPlusGame.timersData.getTimer(bonusId);
            var content = this.setTextIcon(StringResources[bonusId], StringResources[bonusId + "_title"], "partsicon", this.toHHMMSS(timeout));

            this.currentParameter = bonusId;
            this.currentAction = "bonus";

            // update texts
            var update = () => {

                var text;
                timeout = FlipPlusGame.timersData.getTimer(bonusId);

                var unlockedBots = FlipPlusGame.BotsLevelManager.getFinihedProjects().length;

                if (unlockedBots < bonusData[bonusId].unlock) {
                    text = StringResources.bonusLocked;
                    this.currentAction = null;
                }
               
                else if (timeout > 0) {
                    text = this.toHHMMSS(timeout);
                    this.currentAction = null;
                }
                else {
                    this.currentParameter = bonusId;
                    this.currentAction = "bonus";
                    text = StringResources.mm_play;
                }
                var iconTextDO = <PIXI.extras.BitmapText>content.getChildByName("iconText")

                iconTextDO.text = text;
            }

            if (this.secondsIntevalUpdate) clearInterval(this.secondsIntevalUpdate);
            this.secondsIntevalUpdate = setInterval(update, 500);

            update();

            
                var iconTextDO = <PIXI.extras.BitmapText>content.getChildByName("iconText")
                var iconDO = <PIXI.extras.BitmapText>content.getChildByName("icon")

                iconTextDO.pivot.x = iconTextDO.getLocalBounds().width / 2 * iconTextDO.scaleX;
                iconDO.x = - iconTextDO.width / 2 - 20;
                iconTextDO.x = iconDO.width / 2 + 20;
            

        }
 
        // #endregion

        // #region ending

        public showEnding() {
            this.setText(StringResources.endingText, 1000);
        }


        // #endregion

        // #region utils

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

        // #endregion
    
    }
}