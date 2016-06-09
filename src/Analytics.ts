declare var CryptoJS;

class Analytics {

    private userId: string;
    private sessionId: string;
        
    // #region Level events
    
    public logLevelUnlock(levelId: string) {
        this.sendDesignEvent("level:unlock:"+ levelId);
    }
    
    public logLevelBlockClick(levelId: string, blockX: number, blockY: number) {
       // this.sendDesignEvent("level", "blockclick", 1, levelId, blockX, blockY);
    }

        
    // #endregion

    
    // #region progressions
    
    public logLevelStart(projectId: number, levelId: number, atempts: number) {
        this.sendProgressionEvent(projectId, levelId, atempts)
    }

    public logProfessionWin(projectId: number, levelId: number, atempts: number, time: number, clicks: number) {
        //this.sendDesignEvent("level", "complete", 1, levelId);
        //this.sendDesignEvent("click", "complete", clicks, levelId);
        //this.sendDesignEvent("time", "complete", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, true)
    }

    public logProgressionRestart(projectId: number, levelId: number, atempts: number, time: number, clicks: number) {
        //this.sendDesignEvent("level", "restart", 1, levelId);
        //this.sendDesignEvent("click", "restart", clicks, levelId);
        //this.sendDesignEvent("time", "restart", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, false, true)

    }

    public logProgressionExit(projectId: number, levelId: number, atempts: number, time?: number, clicks?: number) {
        //this.sendDesignEvent("level", "exit", 1, levelId);
        //this.sendDesignEvent("click", "exit", clicks, levelId);
        //this.sendDesignEvent("time", "exit", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, false, true)

    }

    public logProfressionLoose(projectId: number, levelId: number, atempts: number, time: number, clicks: number) {
        //   this.sendDesignEvent("level", "loose", 1, levelId);
        //   this.sendDesignEvent("click", "loose", clicks, levelId);
        //   this.sendDesignEvent("time", "loose", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, false, true)
    }

    // #endregion

    // #region others events

    public logGameStart() {
        this.sendUserEvent();
    }

    public logBotClick(botId: string) {
        this.sendDesignEvent("botClick:"+botId);
    }

    // #endregion

    // #region resources

    public logUsedItem(itemId: string, levelId: string, price:number) {
        this.sendDesignEvent("item:" + itemId + ":" + levelId);
        this.sendResourceEvent("Sink", "parts", price, itemId, itemId);
    }
   
    public logBonusParts(bonusid: string, parts: number) {
        this.sendDesignEvent("bonus:" +bonusid+":parts", parts);
        this.sendResourceEvent("Source", "parts", parts);
    }

    // #endregion

    // #region business events

    public purchaseParts(itemType: string, itemId: string, price: any, localizedPrice: string, transaction_num: number) {
        
        var price_number = parseFloat(price);
        var cents = price_number * 100;
        var currency = getCurrencyFromLocalizedPrice(localizedPrice);
                
        this.sendBusinessEvent(itemType + ":" + itemId, cents, currency, transaction_num);
    }

    // #endregion

    // #region send event 

    private sendlevelStart(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num);
    }
        
    private sendlevelComplete(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num,true);
    }

    private sendlevelFail(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num,false, true);
    }
    
    private sendResourceEvent(flowType: string, virtualCurrency: string, amount: number,itemType?, itemId?) {
        var category = "resource"

        //normalize numbers
        var event_id = flowType + ":" + virtualCurrency + ":" + itemType + ":" + itemId;
         
        // compose Message
        var message = {
            "event_id": event_id,
            "amount": amount,
        };

        this.sendMessage(message, category);

    }

    private sendProgressionEvent(project: number, level: number, attempt_num: number, complete?: boolean, fail?: boolean) {
        var category = "progression"

        //normalize numbers
        var project_st = project.toString();
        var level_st = level.toString();
        if (project_st.length < 2) project_st = "0" + project_st;
        if (level_st.length < 2) level_st = "0" + level_st;
        
        // get Status
        var status = "Start";
        if (fail) status = "Fail"
        if (complete) status = "Complete"

        // compose Message
        var message = {
            "event_id": status + ":" + project_st + ":" + level_st,
            "attempt_num": 1
        };

        this.sendMessage(message, category);
    }

    private sendBusinessEvent(eventId: string, amount: number = 1, currency: string, transaction_num: number) {

        var category = "business"

        var message = {
            "event_id": eventId,
            "amount": amount,
            "cart_type": "",
            "transaction_num": transaction_num,
            "currency": currency,
            }
        
        
        this.sendMessage(message, category);
    }

    private sendUserEvent() {
        var category = "user"

        // compose Message
        var message = {};

        this.sendMessage(message, category);
    }

    private sendDesignEvent(eventId: string, value: number = 1) {
        var category = "design"

       // compose Message
        var message = {
            "event_id": eventId,
            "value": value
        };

        this.sendMessage(message, category);
    }

    // send a ajax message
    private sendMessage(message: Object, category: string) {

        var device = this.getDevice();
        message["device"] = device.device;
        message["v"] = 2;
        message["user_id"] = this.getUser();
        message["client_ts"] = Date.now();
        message["sdk_version"] = "rest api v2";
        message["os_version"] = device.os_version;
        message["manufacturer"] = device.manufacturer;
        message["platform"] = device.platform;
        message["session_id"] = this.getSession();
        message["session_num"] = 1;//parseInt( this.getSession());
        message["build"] = this.getBuild();
        message["category"] = category;

        var game_key = '5ae563d276c09115caa349071cdc9e7e'
        var secret_key = '6efb4b569a3de9ed4c769d1f50236b0d10bee99d'
        var url = 'HTTP://api.gameanalytics.com/v2/' + game_key + '/events';

        //// sandbox
        //game_key = "5c6bcb5402204249437fb5a7a80a4959"
        //secret_key = "16813a12f718bc5c620f56944e1abc3ea13ccbac"
        //url = 'http://sandbox-api.gameanalytics.com/v2/' + game_key + '/events';

        var data = JSON.stringify([message]);
        var hash = CryptoJS.HmacSHA256(data, secret_key).toString(CryptoJS.enc.Base64);
        
        // actualy sends the message
        this.postMessage(data, url, hash);
    }

    private postMessage(data, url, hash) {
        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", hash);
        //xhr.setRequestHeader('Content-Encoding', 'gzip');
        //xhr.setRequestHeader('Content-Length', data.length.toString());
        //xhr.addEventListener('load', function (e) {alert(e.target["response"]);});
        //xhr.addEventListener("error", function (e) {});
        xhr.send(data);
    }

    // #endregion
 


    // #region Session Variables

    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    private getUser(): string {

        if (!this.userId) this.userId = localStorage.getItem("dia_userID");

        if (!this.userId) {
            this.userId = this.guid();
            localStorage.setItem("dia_userID", this.userId);
        }

        return this.userId;
    }

    private getSession(): string {

        if (!this.sessionId) this.sessionId = this.guid();

        return this.sessionId;
    }

    private getBuild(): string {
        return version;
    }

    private getDevice(): any {
        if (typeof Cocoon != "undefined" ) {
            var device = Cocoon.Device.getDeviceInfo();
            return {
                device: device.model,
                os_version: device.os+" "+device.version,
                manufacturer: device.brand,
                platform: device.os,
            };
        }
        else if (typeof Windows != "undefined") return {
                device: "Windows Phone",
                os_version: "Windows",
                manufacturer: "Microsoft",
                platform: "Windows Phone",
            };
       else {
        return {
            device: "Web",
            os_version: "webplayer 0.0",
            manufacturer: "Web",
            platform: "webplayer",
        };
        }
    }

    // #endregion

}

function getCurrencyFromLocalizedPrice(localizedPrice: string) {
    var currency = "USD";
    var symbol = "";

    for (var c in currencies)
        if (localizedPrice.indexOf(currencies[c]) > -1) 
            if (symbol.length < currencies[c].length) {
                currency = c;
                symbol = currencies[c];
            }
    return currency;
}

var currencies = {
    
    "CAD": "CA$",
    "AED": "AED",
    "AFN": "Af",
    "ALL": "ALL",
    "AMD": "AMD",
    "ARS": "AR$",
    "AUD": "AU$",
    "AZN": "man.",
    "BAM": "KM",
    "BDT": "Tk",
    "BGN": "BGN",
    "BHD": "BD",
    "BIF": "FBu",
    "BND": "BN$",
    "BOB": "Bs",
    "BRL": "R$",
    "BWP": "BWP",
    "BYR": "BYR",
    "BZD": "BZ$",
    "CDF": "CDF",
    "CHF": "CHF",
    "CLP": "CL$",
    "CNY": "CN¥",
    "COP": "CO$",
    "CRC": "₡",
    "CVE": "CV$",
    "CZK": "Kč",
    "DJF": "Fdj",
    "DKK": "Dkr",
    "DOP": "RD$",
    "DZD": "DA",
    "EEK": "Ekr",
    "EGP": "EGP",
    "ERN": "Nfk",
    "ETB": "Br",
    "GBP": "£",
    "GEL": "GEL",
    "GHS": "GH₵",
    "GNF": "FG",
    "GTQ": "GTQ",
    "HKD": "HK$",
    "HNL": "HNL",
    "HRK": "kn",
    "HUF": "Ft",
    "IDR": "Rp",
    "ILS": "₪",
    "INR": "Rs",
    "IQD": "IQD",
    "IRR": "IRR",
    "ISK": "Ikr",
    "JMD": "J$",
    "JOD": "JD",
    "JPY": "¥",
    "KES": "Ksh",
    "KHR": "KHR",
    "KMF": "CF",
    "KRW": "₩",
    "KWD": "KD",
    "KZT": "KZT",
    "LBP": "LB£",
    "LKR": "SLRs",
    "LTL": "Lt",
    "LVL": "Ls",
    "LYD": "LD",
    "MAD": "MAD",
    "MDL": "MDL",
    "MGA": "MGA",
    "MKD": "MKD",
    "MMK": "MMK",
    "MOP": "MOP$",
    "MUR": "MURs",
    "MXN": "MX$",
    "MYR": "RM",
    "MZN": "MTn",
    "NAD": "N$",
    "NGN": "₦",
    "NIO": "C$",
    "NOK": "Nkr",
    "NPR": "NPRs",
    "NZD": "NZ$",
    "OMR": "OMR",
    "PAB": "B/.",
    "PEN": "S/.",
    "PHP": "₱",
    "PKR": "PKRs",
    "PLN": "zł",
    "PYG": "₲",
    "QAR": "QR",
    "RON": "RON",
    "RSD": "din.",
    "RUB": "RUB",
    "RWF": "RWF",
    "SAR": "SR",
    "SDG": "SDG",
    "SEK": "Skr",
    "SGD": "S$",
    "SOS": "Ssh",
    "SYP": "SY£",
    "THB": "฿",
    "TND": "DT",
    "TOP": "T$",
    "TRY": "TL",
    "TTD": "TT$",
    "TWD": "NT$",
    "TZS": "TSh",
    "UAH": "₴",
    "UGX": "USh",
    "UYU": "$U",
    "UZS": "UZS",
    "VEF": "Bs.F.",
    "XAF": "FCFA",
    "XOF": "CFA",
    "YER": "YR",
    "ZAR": "R",
    "ZMK": "ZK",
    "USD": "$",
    "EUR": "€",
    "VND": "₫",
}
 