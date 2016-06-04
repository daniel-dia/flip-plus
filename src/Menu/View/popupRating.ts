module FlipPlus.Menu.View {

    // View Class
    export class PopupRating extends Popup {

        public showRatingMessage(accept:()=>void) {

            this.showsPopup(0,0);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create Title
            var titleDO = gameui.AssetsManager.getBitmapText(StringResources.ratingText, "fontStrong");
            this.addChild(titleDO);
            titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            titleDO.x = defaultWidth / 2;

            titleDO.y = 450;

            // create a text
            var textDO = gameui.AssetsManager.getBitmapText(StringResources.ratingText, "fontWhite");
            this.addChild(textDO);
            textDO.pivot.x = textDO.getLocalBounds().width / 2;
            textDO.x = defaultWidth / 2;
            
            textDO.y = 650;
            
            // Add Buttons
            for (var i = 0; i < 5; i++) {
                var bt = new gameui.ImageButton("starsicon", (e) => {
                    this.closePopUp();
                    if (e.target.rate > 2)
                        this.gotoStore();
                });
                bt["rate"] = i+1;
                bt.y = 1100;
                bt.x = 370 + 200 * i; 
                this.addChild(bt);
            }
        }

        private gotoStore() {
            
            var IOS_RATING_URL = "http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=519623307&onlyLatestVersion=false&type=Purple+Software";
            var ANDROID_RATING_URL = "market://details?id=com.diastudio.flipplus";
            var ratingURL = null;

            var os = "web"
            if (Cocoon && Cocoon.getPlatform()) os = Cocoon.getPlatform();
                 
            if (os == "ios") ratingURL = IOS_RATING_URL;
            if (os == "android") ratingURL = ANDROID_RATING_URL;
            if (os == "windows") {

                Windows.System.Launcher.launchUriAsync(
                    new Windows.Foundation.Uri("ms-windows-store:REVIEW?PFN=DIAStudio.JoinJelly_gs119xcmtqkqr")
                );

                return;
            } 

            // opens URL
            if (typeof Cocoon !== 'undefined')
                Cocoon.App.openURL(ratingURL); 
            else if (typeof Windows !== 'undefined')
                Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(ratingURL))
            else window.open(ratingURL);

        }
    }
}
