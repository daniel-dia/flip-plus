module FlipPlus.Menu {
    export class ShopMenu extends GenericMenu {

        private productsListItems: Array<ProductListItem>;
        private statusText: createjs.Text;
        private loadingObject: createjs.DisplayObject;
        private products: Array<Cocoon.Store.ProductInfo>;

        private productInfo = [
            { name: "50", price: "U$ 0,99", img: "partsicon" },
            { name: "200", price: "U$ 1,99", img: "partsicon" },
            { name: "500", price: "U$ 3,99", img: "partsicon" },
            { name: "1000", price: "U$ 4,99", img: "partsicon" },
        ]

        protected productIdList = ["50", "200", "500", "1000"];

        constructor(previousScreen: gameui.ScreenState) {
            super(StringResources.menus.shop, previousScreen, "menu/titleRed");

            this.initializeScreen();

            this.initializeStore();
        }

        //#region Interface =====================================================================================

        protected initializeScreen() {
            this.loadingObject = new createjs.Container();
            this.statusText = new createjs.Text("", defaultFontFamilyNormal, blueColor);
            this.statusText.textAlign = "center";
            this.content.addChild(this.loadingObject);
            this.content.addChild(this.statusText);
            this.statusText.y = -400;
        }

        // add all products in the list
        protected fillProducts(productList: Array<Cocoon.Store.ProductInfo>) {
            var dic = {};
            this.productsListItems = <Array<ProductListItem>>dic;
            this.showLoaded();

            for (var p in productList) {
                var productListItem = this.createProduct(productList[p]);
                productListItem.y = p * 380 + 380;
                productListItem.x = 70;
                this.content.addChild(productListItem);
            }
        }

        // add a single product in the list
        protected createProduct(product: Cocoon.Store.ProductInfo): createjs.DisplayObject {

            var productListItem = new ProductListItem(product.productId, product.title.replace("(Flip +)", ""), product.description, product.localizedPrice);
            this.productsListItems[product.productId] = productListItem;
            console.log(JSON.stringify(product))

            // add function callback
            productListItem.addEventListener("click", (event: createjs.Event) => { Cocoon.Store.purchase(product.productId); });

            return productListItem;
        }

        // show a loading message
        private showLoading() {
            this.statusText.text = StringResources.menus.loading;
            this.loadingObject.visible = true;
        }

        // show a loading message
        private showLoaded() {
            this.statusText.visible = false;
            this.loadingObject.visible = false;
        }

        // show a error message in it
        private showError() {
            this.statusText.text = StringResources.menus.errorShop;
            this.loadingObject.visible = false;
        }

        //lock UI for a time interval
        private lockUI(timeout: number = 5000) {
            this.content.mouseEnabled = false;
            setTimeout(() => { this.unlockUI(); }, timeout);
        }

        //locks unlocks ui
        private unlockUI() {
            this.content.mouseEnabled = true;
        }

        // update footer
        private updateUI() {
            // TODO
        }

        // reurn a object corresponding to productId
        private getProductListItem(productId): ProductListItem {
            return this.productsListItems[productId];
        }

        // animate footer item
        private animateItem(productId: string) {
           // TODO
        }

        //#endregion 


        //#region market =====================================================================================

        // initialize product listing
        private initializeStore() {
            //  if (!Cocoon.Store.nativeAvailable) return;
            this.showError();

            // on loaded products
            Cocoon.Store.on("load", {
                started: () => {
                    this.showLoading();
                },
                success: (products: Array<Cocoon.Store.ProductInfo>) => {
                    this.products = products;
                    this.fillProducts(products);
                },
                error: (errorMessage) => {
                    this.showError();
                }
            }, { once: true })

            // on purchasing products
            Cocoon.Store.on("purchase", {
                started: (productId) => {
                    this.getProductListItem(productId).setPurchasing();
                    this.lockUI();
                },
                success: (purchaseInfo) => {

                    this.fullFillPurchase(purchaseInfo.productId);
                    this.updateUI();
                    this.unlockUI();
                    this.animateItem(purchaseInfo.productId);

                    if (this.products[purchaseInfo.productId].productType == Cocoon.Store.ProductType.CONSUMABLE) {
                        this.getProductListItem(purchaseInfo.productId).setPurchased(true);
                        Cocoon.Store.consume(purchaseInfo.transactionId, purchaseInfo.productId);
                    }

                    this.getProductListItem(purchaseInfo.productId).setPurchased();

                    Cocoon.Store.finish(purchaseInfo.transactionId)
                },
                error: (productId, error) => {
                    this.getProductListItem(productId).setNormal();
                    this.unlockUI();
                }
            }, { once: true });
        
            // initialize store
            Cocoon.Store.initialize({ sandbox: true, managed: true });

            // load products
            Cocoon.Store.loadProducts(this.productIdList);
        }
        

        // verify product avaliability
        private updateProductsAvaliability() {

        }

        // show that product is consumed
        private fullFillPurchase(productId: string): boolean {

            switch (productId) {
                case "50":
                    FlipPlusGame.coinsData.increaseAmount(50);
                    break;

                case "200":
                    FlipPlusGame.coinsData.increaseAmount(200);
                    break;

                case "500":
                    FlipPlusGame.coinsData.increaseAmount(500);
                    break;

                case "1000":
                    FlipPlusGame.coinsData.increaseAmount(1000);
                    break;

                case "100":
                    FlipPlusGame.coinsData.increaseAmount(100);
                    FlipPlusGame.storyData.setStoryPlayed("halfTime");
                    break;
            }

            return true;
        }
        
        //#endregion 

    }

    class ProductListItem extends gameui.Button {

        private purchaseButton: gameui.Button;
        private purchasedIcon: createjs.DisplayObject;
        private loadingIcon: createjs.DisplayObject;
        
        constructor(productId: string, name: string, description: string, localizedPrice: string,image?:string) {
            super();

            // adds BG
            this.addChild(gameui.AssetsManager.getBitmap("menu/storeItem").set({ regX: 1204 / 2, regY: 277 / 2 }));

            // adds icon
            this.addChild(gameui.AssetsManager.getBitmap(image).set({ x: -400, regY: 150, regX: 150 }));

            // adds text
            this.addChild(new gameui.Label(name, defaultFontFamilyHighlight, "#333071").set({ x: -100 }));

            // adds Value
            this.addChild(new gameui.Label(localizedPrice, defaultFontFamilyNormal, "white").set({ x: 375, y: -70 }));

            // adds buy text
            this.addChild(new gameui.Label(StringResources.menus.shop, defaultFontFamilyHighlight, "#86c0f1").set({ x: 375, y: 40 }));

            this.createHitArea();

            
        }
        
        public setPurchasing() {
            this.disable()
            this.loadingIcon.visible = true;
        }

        public loading() {
            this.disable();
            this.loadingIcon.visible = true;
        }

        public setNotAvaliable() {
            this.purchaseButton.fadeOut();
            this.purchasedIcon.visible = false;
            this.loadingIcon.visible = false;
        }

        public setAvaliable() { }

        public setPurchased(timeOut: boolean = false) {
            this.purchaseButton.fadeOut();
            this.purchasedIcon.visible = true;
            this.loadingIcon.visible = false;
            gameui.AudiosManager.playSound("Interface Sound-11");
            if (timeOut) setTimeout(() => { this.setNormal(); }, 1000);
        }

        public setNormal() {
            this.purchaseButton.fadeIn();
            this.purchasedIcon.visible = false;
            this.loadingIcon.visible = false;
        }

        public enable() {
            this.purchaseButton.fadeIn();
            this.loadingIcon.visible = false;
        }

        public disable() {
            this.purchasedIcon.visible = false;
            this.purchaseButton.fadeOut();
        }
    }
}