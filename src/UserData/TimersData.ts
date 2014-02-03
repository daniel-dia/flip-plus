
module InvertCross.UserData {

    // Class
    export class TimersData {
        
        private timers: Object
    
        //Constructor
        constructor() {
            //load timers from storage
            this.timers = this.loadTimers();

            //TODO. nao deve estar aqui. 
            //initialize all timers
            this.initializeAllTimers();

            //sync at first use
            this.syncLastTime();
        }

        private initializeAllTimers() {
        //    var fp = InvertCrossaGame.projectManager.getFinihedProjects();
        //    for (var p in fp) {
        //        var name = fp[p].name;
        //        if (this.timers[name] == null)
        //            this.setTimer(name, fp[p].timer);
        //    }
        //    //TODO naaaaaaaao gambiarra 2
        //    var name = "main";
        //    if (this.timers[name] == null)
        //        this.setTimer(name, 1);
        //
        }

        //Get if timers is ready
        public getTimer(name: string): number {
            if (this.timers[name] == null) return null;

            return this.getLastTime() - this.timers[name];
        }

        //sets a new timer 
        //only sets if timer is spanned //TODO eh esta palavra mesmo?
        public setTimer(name: string, minutes: number) {

            //verifies if timer is active
            if (this.getTimer(name) > 0) return;

            //set time interval
            var timeSpan: number = 1000 * 60 * minutes;

            //set timer
            this.timers[name] = Date.now() + timeSpan;

            //save to storage
            this.saveTimers(this.timers);
        }



        //------------------------Security-------------------------
        private lastTime: number;

        //get last time between now and last utilization time
        //to avoid adjusting the clock cheat
        private getLastTime(): number {

           //verifies if last utilization time is greater than time now
            if (Date.now() > this.lastTime)
                return Date.now();
            else
                return this.lastTime;
        }

        //at firts use, sync last utilizatio time.
        private syncLastTime(){
            var now = Date.now();

            //caches lastTime
            this.lastTime = this.loadLastTime();

            //verifies if last utilization time is greater than time now
            if (now > this.lastTime) {
                this.saveLastTime(now);
                this.lastTime = now;
            }
        }

        //------------------------Storage--------------------------

        //save timers to local storage
        private saveTimers(timers: any) {
            localStorage.setItem("Timers", JSON.stringify(timers));
        }

        //load timers from local storage
        private loadTimers(): any {
            var value = localStorage.getItem("Timers");
            if (value) return JSON.parse(value);
            else return {};
        }

        //store the last utilization time,
        private saveLastTime(time:number) {
            localStorage.setItem("LastTime", time.toString());
        }

        //loads and set the last utilization time,
        private loadLastTime(): number {
            var value = localStorage.getItem("LastTime")
            if (!value) value = Date.now();
            return value;
        }

    }

}
