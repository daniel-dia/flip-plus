var WindowsInappsService = {}

WindowsInappsService.callbacks = {};

WindowsInappsService.initialize = function (parameters, onInitialized, simulated) {
    simulated = false;
    if (typeof Windows == "undefined") return;
    if (simulated) currentApp = Windows.ApplicationModel.Store.CurrentAppSimulator;
    else currentApp = Windows.ApplicationModel.Store.CurrentApp;
    licenseInformation = currentApp.licenseInformation;

    // initialization Callback
    if (onInitialized) onInitialized();
}

WindowsInappsService.fetchProducts = function (products, callback) {

    // send start callback
    //WindowsDoNativeCallback("onProductsFetchStarted")();

    currentApp.loadListingInformationAsync().then(
    function (listing) {
        var productListing = [];
        //create a new products array
        for (var p in listing.productListings)
            //if is a product
            if (listing.productListings[p].productId) {
                var product = listing.productListings[p];
                productListing.push({
                    productId: product.productId,
                    productAlias: product.name,
                    productType: product.productType,
                    title: product.name,
                    description: product.description,
                    localizedPrice: product.formattedPrice,
                    price: 1,
                    downloadURL: "",
                })
            }

        //send sucess callback
        callback(productListing)
    },
    function (error) {
        //send error callback
        callback([], error.message)
    }
    );

}

WindowsInappsService.purchase = function (productId, ammount) {

    var _this = this;

    // call purchase started
    _this.emit("purchase", "start", productId)

    currentApp.requestProductPurchaseAsync(productId, false).then(
        function (purchaseResults) {
            // call purchase complete
            if (purchaseResults)
                var purchaseInfo = { productId: productId, quantity: 1, transactionId: purchaseResults.transactionId }
            else
                var purchaseInfo = { productId: productId, quantity: 1 };

            _this.emit("purchase", "complete", purchaseInfo);
        },

        function (error) {
            // call purchased failed
            _this.emit("purchase", "error", productId, error.message);
        }
    )
}

WindowsInappsService.consume = function (productId, ammount, callback, transactionId) {

    var _this = this;
        
    if (transactionId && productId)
    currentApp.reportConsumableFulfillmentAsync(productId, transactionId).then(
        function (fulfillmentResult) {
            // call purchase started
            //WindowsDoNativeCallback("onConsumePurchaseCompleted")(transactionId);
            _this.emit("onConsumePurchase", "complete")
        },
        function (error) {
            // call purchase started
            //WindowsDoNativeCallback("onConsumePurchaseFailed")(transactionId, error.message);
            _this.emit("onConsumePurchase", "error")

        })
}

WindowsInappsService.restorePurchases = function (arguments) { // PAREI AQUI
    //
    //     // call purchase started
    //     WindowsDoNativeCallback("onRestorePurchasesStarted")();
    //     WindowsDoNativeCallback("onRestorePurchasesFailed")("not implemented");
    //     var licenses = licenseInformation.ProductLicenses;
    //     if (licenses.Count > 0) {
    //         //WindowsDoNativeCallback("onRestorePurchasesCompleted")(); 
    //     }
}

WindowsInappsService.on = function (event, callbacks) {
    this.callbacks[event] = callbacks;
}

WindowsInappsService.emit = function (event, subevent, args1, arg2, arg3) {

    if (this.callbacks[event] && this.callbacks[event][subevent])
        this.callbacks[event][subevent](args1, arg2, arg3);
}
