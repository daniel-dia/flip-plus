module InvertCross.UserData {

    // Class
    export class ItensData{

        private itensDictionary: any;

        constructor() {
            var data = localStorage.getItem("items");
            if (data)
                this.itensDictionary = JSON.parse(data);

            else this.itensDictionary = new Object();
        }

        getItemQuantity(item: string): number {
            if (this.itensDictionary[item])
                return this.itensDictionary[item];
            else
                return 0;
        }

        saveQuantityItem(item: string, value: number) {
            this.itensDictionary[item] = value;
            localStorage.setItem("items", JSON.stringify(this.itensDictionary));
        }

    }
}