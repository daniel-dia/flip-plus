module InvertCross.Menu.View {

    export class BonusItem extends Gbase.UI.ImageButton {

        private bonusId: number;
        private timerText: createjs.Text;

        private updateInterval: number;

        constructor(bonusId:number, action) {
            super("projects/bigslot1", action);
            
            this.bonusId=bonusId
            this.y = 470;
            this.x = 768;
            
            this.regX = 1430 / 2;
            this.regY = 410 / 2;

            this.updateProjectInfo()

            this.updateInterval = setInterval(() => { this.timerintervalTick(); }, 1000);

            InvertCrossaGame.timersData.setTimer("bonus" + this.bonusId.toString(),0*this.bonusId);
        }

        //createObjects
        private createObjects(bonusId:string) {

            var color = "#cfe3ec"
            var font = "Bold 100px " + defaultFont ;

            //clean all objects
            this.removeAllChildren();

            //if unlocked
            if (true) {

                //background
                var bg = "projects/bonus" + bonusId;
                var s: createjs.Bitmap = Assets.getBitmap(bg);
                this.addChild(s);

                //robot name text
                //var title = new createjs.Text("Bonus " + bonusId, font, color);
                //title.x = 14;
                //title.y = 00;
                //this.addChild(title)

                //timer text 
                this.timerText = new createjs.Text(("0:58:45").toString() , font, color);
                this.timerText.textBaseline = "middle";
                this.timerText.textAlign= "center";
                this.timerText.x = 970;
                this.timerText.y = 180;
                this.addChild(this.timerText)

            } else {

                //adds Background
                var bg = "projects/bigslot1";
                var s: createjs.Bitmap = Assets.getBitmap(bg);
                this.addChild(s);

                //adds lock indicator
                var star = Assets.getBitmap("projects/star");
                this.addChild(star);
                star.x = 670;
                star.y = 150;

                //addsText
                //TODO da onde vai tirar as estrelas?
                var tx = new createjs.Text("1", "Bold 100px " + defaultFont, "#565656");
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
            this.createObjects(this.bonusId.toString());

            //if is unlocked and timer is done than play animation
            if (false) {
                this.set({ scaleX: 1, scaleY: 1 })
                createjs.Tween.get(this, { loop: true })
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
            }
            else {
                this.scaleX = this.scaleY = 1;
            }


        }

        private timerintervalTick() {
            var time = InvertCrossaGame.timersData.getTimer("bonus" + this.bonusId.toString());
            this.timerText.text = this.toHHMMSS(time);
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