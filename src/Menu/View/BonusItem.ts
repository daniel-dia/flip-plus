declare var bonusData: Array<any>;

module FlipPlus.Menu.View {

    export class BonusItem extends gameui.ImageButton {

        public bonusId: string;
        private timerText: PIXI.extras.BitmapText;

        private updateInterval: number;

        constructor(bonusId:string, action) {
            super("projects/bigslot1", action);

            this.bonusId = bonusId;
            this.y = 470;
            this.x = 768;
            
            this.pivot.x = 1458 / 2;
            this.pivot.y = 410  / 2;
            
            this.updateProjectInfo()
             
        }

        //createObjects
        private createObjects(bonusId:string) {

            var color = "#cfe3ec"
            var font = "Bold 100px " + defaultFont ;

            //clean all objects
            this.removeChildren();

            //if unlocked
            var stars = FlipPlusGame.projectManager.getStarsCount();
            if ( stars >= bonusData[bonusId].cost) {

                //background
                var bg = "projects/" + bonusId;
                var s = gameui.AssetsManager.getBitmap(bg);
                this.addChild(s);

                //timer text 
                this.timerText = gameui.AssetsManager.getBitmapText("00:00:00", "fontTitle");
                this.timerText.pivot.x = this.timerText.getLocalBounds().width / 2;
                this.timerText.x = 1000;
                this.timerText.y = 100;
                this.addChild(this.timerText)

                //auto updateObject
                this.timerintervalTick();
                if (this.updateInterval) clearInterval(this.updateInterval);
                this.updateInterval = setInterval(() => { this.timerintervalTick(); }, 900);

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
                var tx = gameui.AssetsManager.getBitmapText(bonusData[bonusId].cost.toString(), "fontBlue");
                this.addChild(tx);
                tx.pivot.x = tx.getLocalBounds().width;
                tx.x = 650;
                tx.y = 155;
            }

            //create hitArea
            this.createHitArea();
        }

        //updates based on porject 
        public updateProjectInfo() {

            //update the objects display     
            this.createObjects(this.bonusId);
        }

        private timerintervalTick() {

            var time = FlipPlusGame.timersData.getTimer(this.bonusId);

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
            
            
        }

        private toHHMMSS(sec_num:number):string {
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