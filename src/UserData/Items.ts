class Items {

    // static items
    public static HINT = "hint";
    public static SKIP = "skip";
    public static SOLVE = "solve";
    public static TIME = "time";
    public static TAP = "tap";
}

module FlipPlus.UserData {

    // Class
    export class ItemsManager{

        private itensDictionary: any;

        //defines existent Itens
        //TODO shall not be in userData
        public static itemsNames: Array<string> = [Items.TAP, Items.HINT, Items.SKIP, Items.SOLVE, Items.TIME];
        
        constructor() {
            var data = localStorage.getItem(storagePrefix + "items");
            if (data)
                this.itensDictionary = JSON.parse(data);

            else this.itensDictionary = new Object();
        }

        public getItemQuantity(item: string): number {
            if (this.itensDictionary[item])
                return this.itensDictionary[item];
            else
                return 0;
        }

        public setQuantityItem(item: string, value: number) {
            this.itensDictionary[item] = value;
            localStorage.setItem(storagePrefix + "items", JSON.stringify(this.itensDictionary));
        }

        public increaseItemQuantity(item: string, value: number= 1) {
            if (value < 1) return;
            var iq: number = this.getItemQuantity(item);
            if (iq >= 10) return;
            this.setQuantityItem(item, value + iq);
        }

        public decreaseItemQuantity(item: string, value: number= 1) {
            if (value < 1) return;
            var iq: number = this.getItemQuantity(item);
            if (iq<value) return;
            this.setQuantityItem(item, iq-value);
        }

        public static calculateItemPrice(item: string, levelSetId: number, timesUsed: number =  0) {
            var base = 2.2;
            var factor = 0.3;

            switch (item) {

                case Items.TAP: case Items.SOLVE: case Items.TIME:
                    factor = 1;
                    break;

                case Items.SKIP:
                    factor = 1;
                    timesUsed = 2;
                    break;
                
                case Items.HINT:
                    factor = 0.3;
                    break;
            }

            //calculates number
            var price = Math.pow(base, timesUsed+1) * levelSetId * factor * 0.5;

            //roud the number
            if (price > 300) price = Math.ceil(price / 100) * 100;
            if (price > 100) price = Math.ceil(price / 50)  *  50;
            if (price > 50) price =  Math.ceil(price / 20)  *  20;
            if (price > 30) price =  Math.ceil(price / 10)  *  10;
            if (price > 7) price =   Math.ceil(price / 5)   *  5;
            if (price > 5) price =   Math.ceil(price / 2)   *  2;
            price = Math.ceil(price)

            return price;
        }
    }
}

