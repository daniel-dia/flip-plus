declare var Cocoon:any;
declare function initSocialServices();

module FlipPlus {
    export class GameServices {

        private socialService: any;

        constructor() {
            if (!navigator.onLine) return;
            if (!Cocoon) return;
            console.log("before")
            this.socialService = initSocialServices();
            console.log("initialized")
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
            console.log("ach1!");
            if (!navigator.onLine) return;
            console.log("ach2!");
            if (!this.socialService) return;
            console.log("ach3!");
            this.socialService.submitAchievement(achievementId, function (error) {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.error("submited");
            });

        }
    }
}