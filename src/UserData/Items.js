var FlipPlus;
(function (FlipPlus) {
    var UserData;
    (function (UserData) {
        // Class
        var Items = (function () {
            function Items() {
                var data = localStorage.getItem(storagePrefix + "items");
                if (data)
                    this.itensDictionary = JSON.parse(data);
                else
                    this.itensDictionary = new Object();
            }
            Items.prototype.getItemQuantity = function (item) {
                if (this.itensDictionary[item])
                    return this.itensDictionary[item];
                else
                    return 0;
            };
            Items.prototype.setQuantityItem = function (item, value) {
                this.itensDictionary[item] = value;
                localStorage.setItem(storagePrefix + "items", JSON.stringify(this.itensDictionary));
            };
            Items.prototype.increaseItemQuantity = function (item, value) {
                if (value === void 0) { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq >= 10)
                    return;
                this.setQuantityItem(item, value + iq);
            };
            Items.prototype.decreaseItemQuantity = function (item, value) {
                if (value === void 0) { value = 1; }
                if (value < 1)
                    return;
                var iq = this.getItemQuantity(item);
                if (iq < value)
                    return;
                this.setQuantityItem(item, iq - value);
            };
            //defines existent Itens
            //TODO shall not be in userData
            Items.itemsNames = [Items.TAP, Items.HINT, Items.SKIP, Items.SOLVE, Items.TIME];
            return Items;
        })();
        UserData.Items = Items;
    })(UserData = FlipPlus.UserData || (FlipPlus.UserData = {}));
})(FlipPlus || (FlipPlus = {}));
var Items = (function () {
    function Items() {
    }
    // static items
    Items.HINT = "hint";
    Items.SKIP = "skip";
    Items.SOLVE = "solve";
    Items.TIME = "time";
    Items.TAP = "tap";
    return Items;
})();
exports.Items = Items;
//# sourceMappingURL=Items.js.map