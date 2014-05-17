declare var bonusData: Array<any>;

module InvertCross.Menu.View {

    export class BonusItem extends Gbase.UI.ImageButton {

        public bonusId: string;
        private timerText: createjs.Text;

        private updateInterval: number;

        constructor(bonusId:string, action) {
            super("projects/bigslot1", action);

            this.bonusId = bonusId;
            this.y = 470;
            this.x = 768;
            
            this.regX = 1430 / 2;
            this.regY = 410  / 2;
            
            this.updateProjectInfo()
             
        }

        //createObjects
        private createObjects(bonusId:string) {

            var color = "#cfe3ec"
            var font = "Bold 100px " + defaultFont ;

            //clean all objects
            this.removeAllChildren();

            //if unlocked
            var stars = InvertCrossaGame.projectManager.getStarsCount();
            if ( stars >= bonusData[bonusId].cost) {

                //background
                var bg = "projects/" + bonusId;
                var s = Gbase.AssetsManager.getBitmap(bg);
                this.addChild(s);

                //timer text 
                this.timerText = new createjs.Text(("--:--:--").toString() , font, color);
                this.timerText.textBaseline = "middle";
                this.timerText.textAlign= "center";
                this.timerText.x = 970;
                this.timerText.y = 180;
                this.addChild(this.timerText)

                //auto updateObject
                this.timerintervalTick();
                if (this.updateInterval) clearInterval(this.updateInterval);
                this.updateInterval = setInterval(() => { this.timerintervalTick(); }, 900);

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
        }

        //updates based on porject 
        public updateProjectInfo() {

            //update the objects display     
            this.createObjects(this.bonusId);
        }

        private timerintervalTick() {

            var time = InvertCrossaGame.timersData.getTimer(this.bonusId);

            if (time == 0) {
                this.timerText.text = "PLAY";

                if(!createjs.Tween.hasActiveTweens(this.timerText)) {
                    this.timerText.cache(-200, -50, 400, 100);
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
                this.timerText.cache(-200, -50, 400, 100);
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