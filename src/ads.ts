//jj 884d50c2c33a437cab51071d14983cfb
//fp and 5c4ca98862a04ee09f2f9a67c5b95d80
//fp ios 1a895b1b280d48d88ab5ddce11633701

class CocoonAds  {
    private static interstitial
    private static status: CocoonAds.STATUS; 
    private static ad_timeout;
    
    public static show(callback?: (any?) => void) {

        if (!this.interstitial) {
            if (callback) callback();
            return;
        }

        if (this.getStatus() == CocoonAds.STATUS.READY) {
            this.debug("show")
            this.interstitial.on("show", (e) => {
                if (callback) callback(true);
            });
            this.interstitial.show()
        } else {
            this.debug("not loaded yet");
            this.load();
            if (callback) callback();
        }
    }

    public static getStatus(): CocoonAds.STATUS {
        if (!this.interstitial) return CocoonAds.STATUS.NOT_AVALIABLE;
        if (this.interstitial && this.interstitial.isReady()) return CocoonAds.STATUS.READY;
        return this.status;
    }

    private static setCallbacks() {

        this.interstitial.on("show", (e) => {
            this.debug('music paused')
        });


        this.interstitial.on("load", (e) => {
            this.debug("Interstitial loaded " + JSON.stringify(e));
            this.status = CocoonAds.STATUS.READY;
        });

        this.interstitial.on("fail", (e) => {
            if (this.ad_timeout) clearTimeout(this.ad_timeout);
            this.debug("Interstitial failed " + JSON.stringify(e));
            this.status = CocoonAds.STATUS.FAIL;
        });

        this.interstitial.on("dismiss", (e) => {
            this.debug("Interstitial dismissed " + JSON.stringify(e));
            this.status = CocoonAds.STATUS.NOT_LOADED; 
            this.load();
        });

    }

    private static debug(text) { 
        console.log("ads " + text) 
    }

    public static initialize() {

        document.addEventListener('deviceready', () => {

            if (!window["Cocoon"] || !Cocoon.Ad || !Cocoon.Ad.MoPub) {
                this.debug('Cocoon AdMob plugin not installed');
                this.status = CocoonAds.STATUS.FAIL;
                return;
            }

            Cocoon.Ad.MoPub.configure({
                ios: { interstitial: "1a895b1b280d48d88ab5ddce11633701" },
                android: { interstitial: "5c4ca98862a04ee09f2f9a67c5b95d80" }
            });

            if (!this.interstitial) this.interstitial = Cocoon.Ad.MoPub.createInterstitial();

            this.setCallbacks();

        }, false);
       
    }

    public static load() {
        if (!this.interstitial) return;
        this.debug("loading") 
        this.interstitial.load();
        this.status = CocoonAds.STATUS.LOADING;

        if (this.ad_timeout) clearTimeout(this.ad_timeout);

        this.ad_timeout = setTimeout(() => {
            this.debug("timeout");
            this.status = CocoonAds.STATUS.TIMEOUT; 
        }, 15000)

    }

}


module CocoonAds {

    export enum STATUS {
        LOADING,
        READY,
        FAIL,
        NOT_LOADED,
        TIMEOUT,
        NOT_AVALIABLE,
    }

}