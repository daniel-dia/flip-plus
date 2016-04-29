declare var Cocoon:any;
declare function initSocialServices();

module FlipPlus {
    export class GameServices {

        private socialService: any;

        constructor() {
            if (!navigator.onLine) return;
            if (!Cocoon) return;
            this.socialService = initSocialServices();
        }

        // show native leaderboards
        public showLeaderboard() {
            if (!navigator.onLine) return;
            if (!this.socialService) return;

            this.socialService.showLeaderboard(function (error) {
                if (error)
                    console.error("showLeaderbord error: " + error.message);
            });

        }

        // show a achievement.
        public showAchievements() {
            if (!navigator.onLine) return;
            if (!this.socialService) return;

            this.socialService.showAchievements(function (error) {
                if (error)
                    console.error("showAchievements error: " + error.message);
            });

        }

        // submit a score
        public submitScore(score: number) {

            if (!this.socialService) return;
            if (!navigator.onLine) return;


            this.socialService.submitScore(score.toString(), function (error) {
                if (error)
                    console.error("submitScore error: " + error.message);
            });
        }

        // submit an achievement
        public submitAchievent(achievementId: string) {
             
            if (!navigator.onLine) return;
            if (!this.socialService) return;

            var id = "";
            if (Cocoon.getPlatform() === 'ios') {
                id = constantsiOS[achievementId];
            } else if (Cocoon.getPlatform() === 'android') {
                id = contantsAndroid[achievementId];
            }
           
            if(id)
                this.socialService.submitAchievement(id, function (error) {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.error("submited");
            });

        }
    }
}