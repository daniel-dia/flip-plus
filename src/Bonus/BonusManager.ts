module InvertCross.Bonus{

    // Class
    export class BonusManager {

        private bonusTimers: Array<number>;

        constructor() {
            this.bonusTimers = [];
        }

        //set time for bonus
        public setBonustime(bonusId: string="bonus", time?: number) {
            if (!time) time = Date.now();
            this.bonusTimers[bonusId] = time;
        }

        //get seconds left to the next release
        public getBonusSecondsLeft(bonusId: string= "bonus"): number {
            var time = this.bonusTimers[bonusId]
            if (time)
                return  Math.floor( time - Date.now()/1000);
            else
                return 0;
        }
    }
} 