
module FlipPlus.UserData {

    // Class
    export class Timers {
        
        private timers: Object
    
        //Constructor
        constructor() {
            //load timers from storage
            this.timers = this.loadTimers();

         
            //sync at first use
            this.syncLastTime();
        }
 
        //Get if timers is ready
        public getTimer(name: string): number {
            
            if (this.timers[name] == null) return 0;

            var remaning = this.timers[name] - this.getLastTime();

            if (remaning < 0) return 0;

            return  Math.floor((this.timers[name] - this.getLastTime())/1000);
        }

        //sets a new timer 
        //only sets if timer is spanned
        public setTimer(name: string, minutes: number=0,seconds:number=0) {

            //verifies if timer is active
            //if (this.getTimer(name) > 0) return;

            //set time interval
            var timeSpan: number = 1000 * (60 * minutes + seconds);

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
            localStorage.setItem(storagePrefix + "Timers", JSON.stringify(timers));
        }

        //load timers from local storage
        private loadTimers(): any {
            var value = localStorage.getItem(storagePrefix + "Timers");
            if (value) return JSON.parse(value);
            else return {};
        }

        //store the last utilization time,
        private saveLastTime(time:number) {
            localStorage.setItem(storagePrefix + "LastTime", time.toString());
        }

        //loads and set the last utilization time,
        private loadLastTime(): number {
            var value = parseInt(localStorage.getItem(storagePrefix + "LastTime"));
            if (!value) value = Date.now();
            return value;
        }

    }

}
