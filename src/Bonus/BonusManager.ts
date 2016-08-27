module FlipPlus.Bonus {

    // Class
    export class BonusManager {

        private bonusData: Array<BonusData>;

        constructor(bonusData: Array<BonusData>) {
            this.bonusData = bonusData;
        }

        // get seconds left to the next release
        public getBonusTimeoutSeconds(bonusId: string): number {
            return FlipPlusGame.timersData.getTimer(bonusId);
        }

        // set seconds left to the next release
        public setBonusTimeoutMinutes(bonusId: string,time:number) {
            FlipPlusGame.timersData.setTimer(bonusId,time);
        }

        // restart a bonus timer, and cut time in a half 
        public restartBonusTimer(bonusId: string, half: boolean = false) {
            var timeOut = this.bonusData[bonusId].timeOut;
            if (half) timeOut = timeOut / 2;
            FlipPlusGame.timersData.setTimer(bonusId, timeOut);
        }

        // restart all bonus timer, and cut time in a half 
        public restartAllBonusTimers(half: boolean=false) {
            for (var bonusId in this.bonusData)
                this.restartBonusTimer(bonusId, half);
        }


        // get if a bonus can be playable in the current Level
        public getBonusUnlocked(bonusId) {
            var unlockedBots = FlipPlusGame.levelsManager.getFinihedProjectsCount();
            return this.bonusData[bonusId].unlock <= unlockedBots;
        }

        // get if a bonus timespan is done
        public getBonusTimeReady(bonusId) {
            var timer = FlipPlusGame.timersData.getTimer(bonusId);
            if (timer != 0) return false;
            return true;
        }

        // get if bonus is avaliable
        public getBonusAvaliable(bonusId: string) {
            return this.getBonusTimeReady(bonusId) && this.getBonusUnlocked(bonusId);
        }

        public setHalfTime(halfTime: boolean) {
            for (var bonusId in this.bonusData)
                this.setBonusTimeoutMinutes(bonusId, this.getBonusTimeoutSeconds(bonusId) / 60 / 2);
        }
    }


    interface BonusData {
        id: string;
        unlock: number;
        cost: number;
        timeOut: number;
    }
} 