declare var CryptoJS;

class Analytics {

    private static game_key = '1fc43682061946f75bfbecd4bbb2718b'
    private static secret_key = '9b4ab4006d241ab5042eb3a730eec6c3e171d483'
    private static data_api_key = 'd519f8572c1893fb49873fa2345d444c03afa172'

    private userId: string;
    private sessionId: string;
        
    // #region Level events
    
    public logLevelUnlock(levelId: string) {
        this.sendDesignEvent("level", "unlock", 1, levelId);
    }
    
    public logLevelBlockClick(levelId: string, blockX: number, blockY: number) {
        this.sendDesignEvent("level", "blockclick", 1, levelId, blockX, blockY);
    }

    public logLevelStart(projectId:number, levelId: number, atempts:number) {
        //this.sendDesignEvent("level", "start", 1, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts)
    }

    public logLevelWin(projectId: number, levelId: number, atempts:number, time: number, clicks: number) {
        //this.sendDesignEvent("level", "complete", 1, levelId);
        //this.sendDesignEvent("click", "complete", clicks, levelId);
        //this.sendDesignEvent("time", "complete", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts,true)
    }

    public logLevelRestart(projectId: number, levelId: number, atempts: number, time: number, clicks: number) {
        //this.sendDesignEvent("level", "restart", 1, levelId);
        //this.sendDesignEvent("click", "restart", clicks, levelId);
        //this.sendDesignEvent("time", "restart", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, false, true)

    }

    public logLevelExit(projectId: number, levelId: number, atempts: number, time?: number, clicks?: number) {
        //this.sendDesignEvent("level", "exit", 1, levelId);
        //this.sendDesignEvent("click", "exit", clicks, levelId);
        //this.sendDesignEvent("time", "exit", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts, false, true)

    }

    public logLevelLoose(projectId: number, levelId: number,atempts: number, time: number, clicks: number) {
     //   this.sendDesignEvent("level", "loose", 1, levelId);
     //   this.sendDesignEvent("click", "loose", clicks, levelId);
     //   this.sendDesignEvent("time", "loose", time / 1000, levelId);
        this.sendProgressionEvent(projectId, levelId, atempts,false,true)
    }
    
    // #endregion

    // #region others events

    public logGameStart() {
        this.sendDesignEvent("game", "start");
    }

    public logBotClick(botId: string) {
        this.sendDesignEvent("bot", botId, 1);
    }

    // #endregion

    // #region resources

    public logUsedItem(itemId: string, levelId: string, price:number) {
        this.sendDesignEvent("item", itemId, 1, levelId);
        this.sendResourceEvent("Sink", "parts", price, itemId, itemId);
    }
   
    public logBonusParts(bonusid: string, parts: number) {
        this.sendDesignEvent("bonus", "parts", parts, bonusid);
        this.sendResourceEvent("Source", "parts", parts);
    }

    // #endregion

    // #region business events

    public purchaseParts(itemType: string, itemId: string, price: any, localizedPrice: string, transaction_num: number) {

        var price_number = parseFloat(price);
        var cents = price_number * 100;
        var currency = getCurrencyFromLocalizedPrice(localizedPrice);
        alert(cents + " " + currency);
        this.sendBusinessEvent(itemType + ":" + itemId, cents, currency, transaction_num);
    }

    // #endregion

    // #region send event 

    private levelStart(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num);
    }
        
    private levelComplete(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num,true);
    }

    private levelFail(project: number, level: number, attempt_num: number) {
        this.sendProgressionEvent(project, level, attempt_num,false, true);
    }

    private sendResourceEvent(flowType: string, virtualCurrency: string, amount: number,itemType?, itemId?) {
        var category = "resource"

        //normalize numbers
        var event_id = flowType + ":" + virtualCurrency + ":" + itemType + ":" + itemId;
        
        // get Status
      
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
            "attempt_num": 1,
            "score": 1
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
            "receipt_info": {
                "receipt":1,
                "store":1,
                "signature":1

            }
        };

        this.sendMessage(message, category);
    }

    private sendDesignEvent(eventId: string, subEventId: string, value: number = 1, level?: string, x?: number, y?: number) {

        var category = "design"

        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
        };

        if (level) message["area"] = level;
        if (y) message["y"] = y;
        if (x) message["x"] = x;

        this.sendMessage(message, category);
    }

    // #endregion

    // #region Session Variables

    private getUser(): string {

        if (!this.userId) this.userId = localStorage.getItem("dia_userID");

        if (!this.userId) {
            this.userId = Math.floor(Math.random() * 9999999999).toString();
            localStorage.setItem("dia_userID", this.userId);
        }

        return this.userId;
    }

    private getSession(): string {

        if (!this.sessionId) this.sessionId = Math.floor(Math.random() * 9999999999).toString();

        return this.sessionId;
    }

    private getBuild(): string {
        return version;
    }

    // #endregion

    // #region ponst Event

    private sendMessage(message: Object, category: string) {

        message["category"] = category;
        message["user_id"] = this.getUser();
        message["session_id"] = this.getSession();
        message["build"] = this.getBuild();

        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + Analytics.secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);

        var url = 'http://api-eu.gameanalytics.com/1/' + Analytics.game_key + '/' + category;

        this.postAjax(url, message, header_auth_hex);
    }

    private postAjax(url: string, data: any, header_auth_hex: string) {

        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", url, true)

        xhr.setRequestHeader('Content-Type', 'text/plain');
        //xhr.setRequestHeader('Content-Length', JSON.stringify(data).length.toString());
        xhr.setRequestHeader("Authorization", header_auth_hex);
        xhr.addEventListener('load', function (e) {
            alert(e.target["response"]);
        }, false);

        xhr.send(JSON.stringify(data));
    }

    // #endregion
}





function getCurrencyFromLocalizedPrice(localizedPrice: string) {
    for (var c in currencies)
        if (localizedPrice.indexOf(currencies[c]) > -1)
            return c;

    return "USD"
}

var currencies = {
    "USD": "$",
    "CAD": "CA$",
    "EUR": "€",
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
    "VND": "₫",
    "XAF": "FCFA",
    "XOF": "CFA",
    "YER": "YR",
    "ZAR": "R",
    "ZMK": "ZK"
}