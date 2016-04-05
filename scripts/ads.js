/*var ad_interstitial
var ad_loaded;
var ad_callback;
var ad_timeout;

function ad_initialize() {
    console.log(1)
    if (!window.Cocoon || !Cocoon.Ad || !Cocoon.Ad.MoPub) {
         alert('Cocoon AdMob plugin not installed'); 
         return; 
    }

    adService = Cocoon.Ad.MoPub;
    adService.configure({
        ios: {
            interstitial: "1a895b1b280d48d88ab5ddce11633701",
            //jj 884d50c2c33a437cab51071d14983cfb
            //fp 1a895b1b280d48d88ab5ddce11633701
         },
        android: { 
            interstitial: "5c4ca98862a04ee09f2f9a67c5b95d80"
        }
    });
   

    if (!ad_interstitial) ad_interstitial = Cocoon.Ad.MoPub.createInterstitial();

    ad_interstitial.on("load", function (e) {
        alert("Interstitial loaded");
        console.log(JSON.stringify(e));
        ad_loaded = true;
    });

    ad_interstitial.on("fail", function (e) {
        alert("Interstitial failed");
        console.log(JSON.stringify(e));
        ad_loaded = false;
        ad_callback(false);

    });

    ad_interstitial.on("show", function (e) {
        alert("Interstitial shown");
        console.log(JSON.stringify(e));
        ad_loaded = false;
        ad_load();
        ad_callback(true);
    });

    ad_interstitial.on("dismiss", function (e) {
        alert("Interstitial dismissed");
        console.log(JSON.stringify(e));
        ad_loaded = false;
        ad_load();
        ad_callback(true);
    });

    ad_load();
}

function ad_load() {
    console.log("loading")
    ad_interstitial.load();

    ad_timeout = setTimeout(function () {
        alert("timeout");
        ad_callback(false);
    }, 15000)

}
function ad_show(callback) {
    ad_callback = callback;
    ad_interstitial.show()
    if (ad_loaded) {
        console.log("show")
    } else {
        console.log("not loaded yet");
        ad_load();
    }
}*/