var waitingLogin

function initSocialServices() {

    //Get specific social service form platform
    if (Cocoon.getPlatform() === 'ios') {
        var gc = Cocoon.Social.GameCenter;
        socialService = gc.getSocialInterface();
        //multiplayerService = gc.getMultiplayerInterface();
        usingGameCenter = true;
    } else if (Cocoon.getPlatform() === 'android') {
        var gp = Cocoon.Social.GooglePlayGames;
        
        //clientId parameter is not required in android
        gp.init({
           // defaultLeaderboard: "CgkIjMC3tPoHEAIQAg"
        });
        socialService = gp.getSocialInterface();
        //multiplayerService = gp.getMultiplayerInterface();
    }

    console.log("init1");
    //Social Service Login and Score Listeners
    if (socialService) {
        socialService.on("loginStatusChanged", function (loggedIn, error) {
            
            if (loggedIn) {
                console.log("Logged into social service");
                socialService.requestScore(function (score, error) {
                    if (error) {
                        console.error("Error getting user score: " + error.message);
                    } else if (score) {
                        console.log("score: " + score.score);
                        model.localUserScore = score.score;
                    }
                }, {
                    //leaderboardID: "tictactoe2"
                });
            }
        });

        //login
        loginSocialService(true);
    }
    return socialService;
}


function loginSocialService(autoLogin) {
    if (!socialService)
        return;

    if (!waitingLogin) {
        waitingLogin = true;
        socialService.login(function (loggedIn, error) {
            if (!loggedIn || error) {
                console.error("Login failed: " + JSON.stringify(error));
                //Tell the user that Game Center is Disabled
                if (!autoLogin && error.code == 2 && usingGameCenter) {
                    Cocoon.Dialog.confirm({
                        title: "Game Center Disabled",
                        message: "Sign in with the Game Center application to enable it",
                        confirmText: "Ok",
                        cancelText: "Cancel"
                    }, function (accepted) {
                        if (accepted) Cocoon.App.openURL("gamecenter:");
                    });
                }
            }
            waitingLogin = false;
        });

    }
}
