module FlipPlus.Menu.View
{
    //View
    export class Terminal extends PIXI.Container
    {

        private screenContaier: PIXI.Container;
        private content: PIXI.Container;
        private textBox: PIXI.extras.BitmapText;
        private static: PIXI.DisplayObject;
        private mymask: PIXI.Sprite;
        private secondsInteval: number;
        private rotationInterval: number;
        
        private intervalTimeout = 7000;
        private saleChance = 0.05;
        private bonuses = ["Bonus1", "Bonus2", "Bonus3"];
                
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
            this.static = gameui.AssetsManager.getBitmap("static");
            this.addChild(this.static);
            this.static.set({ x: -60, y: -73 });

            //add static
            this.mymask = gameui.AssetsManager.getBitmap("terminalMask");
            this.addChild(this.mymask);
            this.mymask.set({ x: -60, y: -73 });
            this.mask = this.mymask;
            this.static.alpha = 0.1;
            

            this.once("touch", () => { this.emit("terminalAction") });
            this.once("click", () => { this.emit("terminalAction") });
            
            this.interactive = true;
            this.hitArea = new PIXI.Rectangle(0, 0, 976, 527);
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
            if (this.secondsInteval) clearInterval(this.secondsInteval);
            if (this.rotationInterval) clearInterval(this.rotationInterval);
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
            createjs.Tween.get(this.static).
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

        public setText(text: string,timeout:number=8000) {

            clearInterval(this.rotationInterval);

            var content = new PIXI.Container();
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");

            textDO.x =  - 400;
            textDO.y = - 250;

            content.addChild(textDO);

            content.x = 420;
            content.y = 250;

            this.setContent(content);

            var char = 0;
            var i = setInterval(() => {
                textDO.text = text.substring(0, char++);
                gameui.AudiosManager.playSound("terminalChar", true);
                if (char > text.length)
                    clearInterval(i);
            }, 40);

            this.rotationInterval = setInterval(() => {
               this.startBonusRotation()
            }, timeout);


        }

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
           //for (var b in this.bonuses) {
           //    var bonusId = this.bonuses[b];
           //    var timer = FlipPlusGame.timersData.getTimer(bonusId);
           //    //if there is a bonus ready, shows it
           //    if (timer <= 0) bonusready = bonusId;
           //}
           //
           //if (bonusready)
           //    this.showBonusReady(bonusready)
           //else
                this.startBonusRotation();
        } 

        // starts bonus channels rotations
        private startBonusRotation() {
            
            // clear current interval
            if (this.rotationInterval) clearInterval(this.rotationInterval);

            // set a new rotation interval
            this.showBonusTimer(this.bonuses[0]);
            var currentBonus = 1;
            this.rotationInterval = setInterval(() => {

                // show a bonus current timer info in loop.
                this.showBonusTimer(this.bonuses[currentBonus]);

                currentBonus++;

                if (currentBonus >= this.bonuses.length)
                    currentBonus = 0;

            }, this.intervalTimeout);
        }

        // show a single bonus timeout info.
        private showBonusTimer(bonusId: string) {

            

            var timeout = FlipPlusGame.timersData.getTimer(bonusId);
            var content = this.setTextIcon(StringResources[bonusId], StringResources[bonusId + "_title"], "partsicon", this.toHHMMSS(timeout));

            this.once("tap", () =>   { this.emit("bonus", bonusId) });
            this.once("click", () => { this.emit("bonus", bonusId) });

            // update texts
            var update = () => {

                var text;
                timeout = FlipPlusGame.timersData.getTimer(bonusId);

                if (timeout > 0) text = this.toHHMMSS(timeout);
                else {
                    if (CocoonAds.getStatus() == CocoonAds.STATUS.READY) text = "ready";
                    if (CocoonAds.getStatus() == CocoonAds.STATUS.LOADING) text = "loading";
                    if (CocoonAds.getStatus() == CocoonAds.STATUS.FAIL) text = "fail";
                    if (CocoonAds.getStatus() == CocoonAds.STATUS.TIMEOUT) text = "timeout";
                }
                content.getChildByName("iconText")["text"] = text;
            }

            createjs.DisplayObject.prototype.dispatchEvent
            if (this.secondsInteval) clearInterval(this.secondsInteval);
            this.secondsInteval = setInterval(update, 500);
            update();
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

            if (hours < 10)   { hours =   "0" + hours;   }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        // #endregion
    
    }
}