module FlipPlus.Menu.View
{
    //View
    export class Terminal extends PIXI.Container
    {

        private screenContaier: PIXI.Container;
        private textBox: PIXI.extras.BitmapText;

        private secondsInteval: number;
        private rotationInterval: number;
        
        private intervalTimeout = 4000;
        private saleChance = 0.05;
        private bonuses = ["Bonus1", "Bonus2", "Bonus3"];
        
        
        constructor()
        {
            super();

            //set informations container
            this.screenContaier = new PIXI.Container();
            this.addChild(this.screenContaier);

            //textBox
            this.textBox = gameui.AssetsManager.getBitmapText("", "fontWhite");
            this.screenContaier.addChild(this.textBox);

            //set its own position
            this.x = 361;
            this.y = 451;

            this.once("touch", () => { this.emit("terminalAction") });
            this.once("click", () => { this.emit("terminalAction") });

            this.activate();

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

        // show bonus rotation or bonus ready
        public showBonusStatus() {

            var bonusready: string;
            // verifies in all bonuses if there is one ready.
            for (var b in this.bonuses) {
                var bonusId = this.bonuses[b];
                var timer = FlipPlusGame.timersData.getTimer(bonusId);
                //if there is a bonus ready, shows it
                if (timer <= 0) bonusready = bonusId;
            }

            if (bonusready)
                this.showBonusReady(bonusready)
            else
                this.startBonusRotation();
        }
        
        // start showing all bonus status in a rotation
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

            if (this.secondsInteval) clearInterval(this.secondsInteval);
            this.secondsInteval = setInterval(() => {

                var timeout = FlipPlusGame.timersData.getTimer(bonusId);
                this.textBox.text = bonusId + " " + this.toHHMMSS(timeout);

            }, 1000);
            // Todo make it better
        }


        // show a bonus screen ready to play
        private showBonusReady(bonusId: string) {
            this.textBox.text = bonusId + " ready \n tap to play";

            this.once("touch", () => { FlipPlusGame.showBonus(bonusId) });
            this.once("click", () => { FlipPlusGame.showBonus(bonusId) });
        }


        private showSale() {
        }



        private toHHMMSS(sec_num: number): string {
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = 0 + hours; }
            if (minutes < 10) { minutes = 0 + minutes; }
            if (seconds < 10) { seconds = 0 + seconds; }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }
    
    }
}