module FlipPlus.UserData {

    // Class
    export class Coins {
        
        // coins amount
        private ammount: number;

        // class constructor
        constructor() {
            var data = localStorage.getItem(storagePrefix + "Coins");
            if (data)
                this.ammount = JSON.parse(data);
            else this.ammount = 0;
        }

        // get coins amount
        public getAmount(): number {
           return this.ammount ? this.ammount : 0;
        }

        // set coins amount
        public setAmount(value: number) {
            this.ammount = value;
            localStorage.setItem(storagePrefix + "Coins", JSON.stringify(Coins));
        }

        // increase coins ammount
        public increaseAmount(value: number= 1) {

            // doesen't accept zero or negative values
            if (value < 1) return;

            var iq: number = this.getAmount();
            
            // limit coins quantity to 10
            // TODO : verify if coins must be less than 10
            var total = iq + value;
            if (total >= 10) total = 10;

            // set coins ammount            
            this.setAmount(total);
        }

        // decrease coins value
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