module FlipPlus.UserData {

    // Class
    export class Money {
        
        // amount of money
        private ammount: number;

        // class constructor
        constructor() {
            var data = localStorage.getItem(storagePrefix + "Money");
            if (data)
                this.ammount = JSON.parse(data);
            else this.ammount = 0;
        }

        // get amount of money
        public getAmount(): number {
           return this.ammount ? this.ammount : 0;
        }

        // set amount of money
        public setAmount(value: number) {
            this.ammount = value;
            localStorage.setItem(storagePrefix + "Money", JSON.stringify(Money));
        }

        // increase money ammount
        public increaseAmount(value: number= 1) {

            // doesen't accept zero or negative values
            if (value < 1) return;

            var iq: number = this.getAmount();
            
            // limit money quantity to 10
            // TODO : verify if money must be less than 10
            var total = iq + value;
            if (total >= 10) total = 10;

            // set money ammount            
            this.setAmount(total);
        }

        // decrease money value
        public decreaseAmount(value: number= 1) {
            
            // doesen't accept zero or negative values
            if (value < 1) return;

            var iq: number = this.getAmount();

            // doesen't allow to decrease less than zero
            if (iq < value) return;
            this.setAmount(iq - value);
        }
    }
}