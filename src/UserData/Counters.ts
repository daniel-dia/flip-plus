module FlipPlus.UserData {

    export class Counters {

        private counterPrefix = "counter_";
        
        public getCounter(counterId: string): number {
            var counter_str = localStorage.getItem(this.counterPrefix + counterId);
            if (counter_str){
                var counter = parseInt(counter_str);
                if (!isNaN(counter)) return counter;
            }

            return 0;
        }

        public setCounter(counterId: string, value: number) {
            localStorage.setItem(this.counterPrefix + counterId, value.toString());
        }

        public increaseCounter(counterId: string) {
            var counter = this.getCounter(counterId);
            counter++;
            this.setCounter(counterId, counter);
        }

        public resetCounter(counterId: string) {
            this.setCounter(counterId, 0);
        }

    }
}