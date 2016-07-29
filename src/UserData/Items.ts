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
    export class ItemsManager {

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

        // set current item for a user
        public getItemQuantity(item: string): number {
            if (this.itensDictionary[item])
                return this.itensDictionary[item];
            else
                return 0;
        }

        // set number of a item
        public setQuantityItem(item: string, value: number) {
            this.itensDictionary[item] = value;
            localStorage.setItem(storagePrefix + "items", JSON.stringify(this.itensDictionary));
        }

        // decrease items quantity (when earned in bonus)
        public increaseItemQuantity(item: string, value: number = 1) {
            if (value < 1) return;
            var iq: number = this.getItemQuantity(item);
            if (iq >= 10) return;
            this.setQuantityItem(item, value + iq);
        }

        // decrease items quantity (when purchased)
        public decreaseItemQuantity(item: string, value: number = 1) {
            if (value < 1) return;
            var iq: number = this.getItemQuantity(item);
            if (iq < value) return;
            this.setQuantityItem(item, iq - value);
        }

        // calculate item price based in level number and quantity of item used
        public static calculateItemPrice(item: string, levelSetId: number, timesUsed: number = 0) {
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
            var price = Math.pow(base, timesUsed + 1) * levelSetId * factor ;

            //roud the number
            if (price > 300) price = Math.ceil(price / 100) * 100;
            if (price > 100) price = Math.ceil(price / 50) * 50;
            if (price > 50) price = Math.ceil(price / 20) * 20;
            if (price > 30) price = Math.ceil(price / 10) * 10;
            if (price > 7) price = Math.ceil(price / 5) * 5;
            if (price > 5) price = Math.ceil(price / 2) * 2;
            price = Math.ceil(price)

            return price;
        }

        // print item prices for debug
        public static printItemsPrices() {

            for (var p = 1; p <= 18; p++)
                console.log(
                    p + " - \t" +
                    this.calculateItemPrice(Items.HINT, p, 0) + "\t" +
                    this.calculateItemPrice(Items.HINT, p, 1) + "\t" +
                    this.calculateItemPrice(Items.HINT, p, 2) + "\t" +
                    this.calculateItemPrice(Items.HINT, p, 3) + "\t" +
                    this.calculateItemPrice(Items.HINT, p, 4) + "\t"
                );

            for (var p = 1; p <= 18; p++)
                console.log(
                    p + " - \t" +
                    this.calculateItemPrice(Items.TAP, p, 0) + "\t" +
                    this.calculateItemPrice(Items.TAP, p, 1) + "\t" +
                    this.calculateItemPrice(Items.TAP, p, 2) + "\t" +
                    this.calculateItemPrice(Items.TAP, p, 3) + "\t" +
                    this.calculateItemPrice(Items.TAP, p, 4) + "\t"
                );

        }
    }
}

