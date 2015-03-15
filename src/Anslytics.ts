declare var CryptoJS;

class Analytics {

    private userId: string;
    private sessionId: string;

    //create a random user ID
    private getUser(): string {

        if (!this.userId)
            this.userId = localStorage.getItem("dia_userID");

        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("dia_userID", this.userId);
        }

        return this.userId;
    }

    private getSession(): string {

        if (!this.sessionId)
                this.sessionId = (Math.random() * 9999999999).toString();

        return this.sessionId;
    }

    private getBuild(): string {
        return "alpha1";
    }

    public logGameStart() {
        this.sendEvent("game", "start",1);
    }

    public logClick(levelId: string, blockX: number, blockY: number) {
        this.sendEvent("click", "click", 1, levelId, blockX, blockY);
    }

    public logLevelWin(levelId: string, time: number, clicks?: number) {
        this.sendEvent("level", "complete", clicks, levelId, time);
    }

    public logLevelRestart(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "restart", clicks, levelId, time);
    }

    public logLevelExit(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "exit", clicks, levelId, time);
    }

    public logLevelLoose(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "loose", clicks, levelId, time);
    }

    public logLevelStart(levelId: string, time: number, clicks: number) {
        this.sendEvent("level", "start", 1, levelId, time);
    }

    public logUsedItem(itemId: string, levelId: string) {
        this.sendEvent("item", itemId, 1, levelId);
    }
    public loglevelTime(levelId: string, time: number,final:string) {
        this.sendEvent("time", final, time/1000, levelId);
    }

    public logBonus(bonusid: string, items: number) {
        this.sendEvent("bonus", bonusid.toString(), items,bonusid);
    }

    private sendEvent(eventId: string,subEventId,value:number, level?:string,x?:number,y?:number) {
        return;
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
            "area": level,
            "x": x,
            "y": y,
        };
 
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
        //xhr.addEventListener('load', function (e) {}, false);

        xhr.send(JSON.stringify(data));
    }
}
