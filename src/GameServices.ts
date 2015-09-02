module FlipPlus {
    export class GameServices {

        private socialService: Cocoon.Social.Interface;
        constructor() {

            if (!navigator.onLine) return;

            // get device os info
            var os = "web"
            if (Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;

            if (os == "windows" || os == "web") return;


            if (os == "ios") {
                //initializes game services
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(constantsiOS)

            }

            else if (os == "android") {
                //initializes game services
                var gp = Cocoon.Social.GooglePlayGames;
            

                //if (!this.socialService.isLoggedIn()) {
                gp.init({
                    //defaultLeaderboard: contantsAndroid.LEAD_LEADERBOARD
                });

                this.socialService = gp.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(contantsAndroid)
                //}

            }
            else if (os == "web") {
                //initializes game services
                var gp = Cocoon.Social.GooglePlayGames;
                gp.init({
                    clientId: contantsAndroid.CLIENT_ID,
                    //defaultLeaderboard: contantsAndroid.LEAD_LEADERBOARD
                });
                this.socialService = gp.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(contantsAndroid)
                this.socialService.setTemplates("scripts/templates/leaderboards.html", "scripts/templates/achievements.html");
            }  
            
            // login into game Services
            setTimeout(() => {
                if (this.socialService && !this.socialService.isLoggedIn()) {
                    this.socialService.login((loggedIn, error) => {
                        if (error) console.error("login error: " + error.message + " " + error.code);
                        else if (!loggedIn) console.log("login cancelled");
                    });
                }
            }, 10000);
        }

        // show native leaderboards
        public showLeaderboard() {
            if (!navigator.onLine) return;
            if (!this.socialService) return;
            try {
                this.socialService.showLeaderboard();
            } catch (e) { }
        }

        // show a achievement.
        public showAchievements() {
            if (!navigator.onLine) return;
            if (!this.socialService) return;
            try {
                this.socialService.showAchievements();
            } catch (e) { }
        }

        // submit a score
        public submitScore(score: number) {

            if (!this.socialService) {
                console.error("No social Service");
                return;
            }

            if (!navigator.onLine) {
                console.error("No social connection");
                return;
            }

            try {
                var sc;
                sc = score;
                if (Cocoon.Device.getDeviceInfo().os == "android") sc = score.toString();
                this.socialService.submitScore(sc, (error) => {
                    if (error)
                        console.error("score error: " + error.message);
                    else
                        console.log("submited score: " + score);
                });
            } catch (e) {
                console.error("error: " + JSON.stringify(e));
            }
        }

        // submit an achievement
        public submitAchievent(achievementId: string) {
            if (!navigator.onLine) return;
            if (!this.socialService) return;

            try {
                this.socialService.submitAchievement(achievementId, (error) => {
                    if (error) console.error("submitAchievement error: " + error.message);
                    else console.log("submited Achievement: " + achievementId);
                });
            } catch (e) { }
        }
    }
}