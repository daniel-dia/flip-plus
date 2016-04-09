declare var CryptoJS;

class Analytics {

    private userId: string;
    private sessionId: string;
        
    // #region Level events

    public logLevelBlockClick(levelId: string, blockX: number, blockY: number) {
        this.sendEvent("level", "blockclick", 1, levelId, blockX, blockY);
    }

    public logLevelStart(levelId: string) {
        this.sendEvent("level", "start", 1, levelId);
    }

    public logLevelUnlock(levelId: string) {
        this.sendEvent("level", "unlock", 1, levelId);
    }

    public logLevelWin(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "complete", 1, levelId);
        this.sendEvent("click", "complete", clicks, levelId);
        this.sendEvent("time", "complete", time / 1000, levelId);
    }

    public logLevelRestart(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "restart", 1, levelId);
        this.sendEvent("click", "restart", clicks, levelId);
        this.sendEvent("time", "restart", time / 1000, levelId);
    }

    public logLevelExit(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "exit", 1, levelId);
        this.sendEvent("click", "exit", clicks, levelId);
        this.sendEvent("time", "exit", time / 1000, levelId);
    }

    public logLevelLoose(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "loose", 1, levelId);
        this.sendEvent("click", "loose", clicks, levelId);
        this.sendEvent("time", "loose", time / 1000, levelId);
    }
    
    // #endregion

    // #region others events

    public logGameStart() {
        this.sendEvent("game", "start");
    }

    public logBotClick(botId: string) {
        this.sendEvent("bot", botId, 1);
    }

    public logUsedItem(itemId: string, levelId: string) {
        this.sendEvent("item", itemId, 1, levelId);
    }

    public logBonusParts(bonusid: string, parts: number) {
        this.sendEvent("bonus", "parts", parts, bonusid);
    }

    // #endregion

    // #region post event 

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
        return "alpha1";
    }

    private sendEvent(eventId: string, subEventId: string, value: number = 1, level?: string, x?: number, y?: number) {
     
        var game_key = '1fc43682061946f75bfbecd4bbb2718b'
        var secret_key = '9b4ab4006d241ab5042eb3a730eec6c3e171d483'
        var data_api_key = 'd519f8572c1893fb49873fa2345d444c03afa172'

        var category = "design"

        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
        };

        if (x) message["area"] = level;
        if (x) message["x"] = x;
        if (x) message["y"] = y;


        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);

        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;


        this.postAjax(url, message, header_auth_hex);
    }

    private postAjax(url: string, data: any, header_auth_hex: string) {

        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", url, true)

        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Content-Length', JSON.stringify(data).length.toString());
        xhr.setRequestHeader("Authorization", header_auth_hex);
        //xhr.addEventListener('load', function (e) {console.log("anl");}, false);

        xhr.send(JSON.stringify(data));
    }

    // #endregion
}
