module FlipPlus.Menu {
    export class ShopMenu extends GenericMenu {

        private productsListItems: Array<View.ProductListItem>;
        private statusText: PIXI.extras.BitmapText;
        private loadingObject: PIXI.DisplayObject;
        private products: Array<Cocoon.Store.ProductInfo>;

        private productInfo: Array<Cocoon.Store.ProductInfo> = [
            { productId: "50",   description: "50",   productAlias: "50",   title: "50",   localizedPrice: "U$ 0,99" },
            { productId: "200",  description: "200",  productAlias: "200",  title: "200",  localizedPrice: "U$ 1,99" },
            { productId: "500",  description: "500",  productAlias: "500",  title: "500",  localizedPrice: "U$ 3,99" },
            { productId: "1000", description: "1000", productAlias: "1000", title: "1000", localizedPrice: "U$ 4,99" },

            //{ productId: "p100",  description: "100",  productAlias: "100", title: "100", localizedPrice: "U$ 1,99" },
        ];

        protected productIdList = ["50", "200", "500", "1000"];

        constructor(previousScreen: gameui.ScreenState) {

            super(StringResources.menus.shop, previousScreen, "menu/titleRed");

            this.initializeScreen();

            this.initializeStore();

            //this.fillProducts(this.productInfo);

            this.coinsIndicator.interactive = false;
        }

        //#region Interface =====================================================================================

        protected initializeScreen() {
            this.loadingObject = new PIXI.Container();
            this.statusText = gameui.AssetsManager.getBitmapText(StringResources.menus.errorShop, "fontBlue");
            this.content.addChild(this.loadingObject);
            this.content.addChild(this.statusText);
            this.statusText.y = -400;
            this.statusText.regX = this.statusText.textWidth / 2;
        }

        // add all products in the list
        protected fillProducts(productList: Array<Cocoon.Store.ProductInfo>) {
            var dic = {};
            this.productsListItems = <Array<View.ProductListItem>>dic;
            this.showLoaded();

            for (var p in productList) {
                var productListItem = this.createProduct(productList[p]);
                productListItem.y = p * 320 - 380;
                productListItem.x = 0;
                this.content.addChild(productListItem);
            }
        }

        // add a single product in the list
        protected createProduct(product: Cocoon.Store.ProductInfo): PIXI.DisplayObject {

            var productListItem = new View.ProductListItem(product.productId, product.title.replace("(Flip +)", ""), product.description, product.localizedPrice, "store/" + product.productId);

            this.productsListItems[product.productId] = productListItem;
          
            // add function callback
            productListItem.addEventListener("pressed",
                () => {
                    Cocoon.Store.purchase(product.productId);
                    productListItem.setNotAvaliable();
                    
                    ////TEST
                    //var productId = product.productId;
                    //this.animateItem(productId);
                    //this.updateUI();
                    //this.unlockUI();
                    //this.getProductListItem(productId).setPurchased();

                });

            return productListItem;
        }

        // show a loading message
        private showLoading() {
            this.statusText.text = StringResources.menus.loading;
            this.statusText.pivot.x = this.statusText.getLocalBounds().width / 2;
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
        private getProductListItem(productId): View.ProductListItem {
            return this.productsListItems[productId];
        }

        // animate footer item
        private animateItem(productId: string) { 
            var price = 5;
            var bt: View.ProductListItem = this.productsListItems[productId];
            
            if (bt) this.coinsIndicator.createCoinEffect(bt.x - 458, bt.y + 1125 - this.header.y - 100, price,true);
            else    this.coinsIndicator.createCoinEffect(0, 1024 - this.header.y, price, true);

         }

        //#endregion 
        
        //#region Store =====================================================================================

        // initialize product listing
        private initializeStore() {
            if (!Cocoon.Store.nativeAvailable) return;
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

            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());

            return true;
        }
        
        //#endregion 

    }

}