module InvertCross.UserData {

    // Class
    export class Items{

        private itensDictionary: any;

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
            this.setQuantityItem(item, value + iq);
        }

        public decreaseItemQuantity(item: string, value: number= 1) {
            if (value < 1) return;
            var iq: number = this.getItemQuantity(item);
            if (iq<value) return;
            this.setQuantityItem(item, iq-value);
        }
    }
}