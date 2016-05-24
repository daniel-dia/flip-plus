declare var Cocoon: any;

module FlipPlus.Menu {
    export class ShopMenu extends GenericMenu {

        private productsListItems: Array<View.ProductListItem>;
        private statusText: PIXI.extras.BitmapText;
        private loadingObject: PIXI.DisplayObject;
        private products: Array<any>;

        private productInfo: Array<any> = [
            { productId: "50parts",   description: "50",   productAlias: "50",   title: "50",   localizedPrice: "U$ 0,99" },
            { productId: "500parts",  description: "500",  productAlias: "500",  title: "500",  localizedPrice: "U$ 3,99" },
            { productId: "1000parts", description: "1000", productAlias: "1000", title: "1000", localizedPrice: "U$ 4,99" },
            { productId: "200parts", description: "200", productAlias: "200", title: "200", localizedPrice: "U$ 1,99" },
            

            //{ productId: "p100",  description: "100",  productAlias: "100", title: "100", localizedPrice: "U$ 1,99" },
        ];

        protected productIdList = ["50parts", "200parts", "500parts", "1000parts"];

        constructor(previousScreen: gameui.ScreenState) {

            super(StringResources.menus.shop, previousScreen, "menu/titleRed");

            this.initializeScreen();

            this.initializeStore();

            this.coinsIndicator.interactive = false;

            this.fillProducts(this.productInfo,null);
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
        protected fillProducts(productList: Array<any>, inappsService) {
            var dic = {};
            this.productsListItems = <Array<View.ProductListItem>>dic;
            this.showLoaded();
 

            function sortByKey(array, key) {
                return array.sort(function (a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }

            productList = sortByKey(productList, 'localizedPrice');

            for (var p in productList) {
                var productListItem = this.createProduct(productList[p], inappsService);
                productListItem.y = p * 320 - 380;
                productListItem.x = 0;
                this.content.addChild(productListItem);
            }
        }

        // add a single product in the list
        protected createProduct(product: any, inappsService:any): PIXI.DisplayObject {

            var productListItem = new View.ProductListItem(product.productId, product.title.replace("(Flip +)", ""), product.description, product.localizedPrice, "store/" + product.productId);

            this.productsListItems[product.productId] = productListItem;
          
            // add function callback
            productListItem.addEventListener("pressed",
                () => {
                    if (inappsService) inappsService.purchase(product.productId, 1);
                    productListItem.setNotAvaliable();
                });

            return productListItem;
        }

        // show a loading message
        private showLoading() {
            this.statusText.text = StringResources.menus.loading;
            this.statusText.pivot.x = this.statusText.textWidth / 2;
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
            this.statusText.pivot.x = this.statusText.textWidth / 2;
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

            this.showLoading();

            if (!Cocoon || !Cocoon["InApp"]) {
                this.showError();
                return;
            }

            var inappsService = Cocoon["InApp"];

            // Service initialization
            
            inappsService.initialize({autofinish: true},
                (error) => {
                    console.log("initialized Store" + error)

                    inappsService.fetchProducts(this.productIdList,  (products, error) => {
                        console.log("fetchProducts" + error)
    
                        this.products = products;
                        this.fillProducts(products, inappsService);
                    });
                }
            );

            inappsService.on("purchase", {
                start: (productId) => {
                    this.getProductListItem(productId).setPurchasing();
                    this.lockUI();
                },
                error: (productId, error) =>{
                    this.getProductListItem(productId).setNormal();
                    this.unlockUI();
                },
                complete: (purchaseInfo) =>{
                    this.fullFillPurchase(purchaseInfo.productId);
                    this.updateUI();
                    this.unlockUI();
                    this.animateItem(purchaseInfo.productId);

                    this.getProductListItem(purchaseInfo.productId).setPurchased(true);
                    this.getProductListItem(purchaseInfo.productId).setPurchased();
                }
            });
        }
 
        // verify product avaliability
        private updateProductsAvaliability() {

        }

        // show that product is consumed
        private fullFillPurchase(productId: string): boolean {

            switch (productId) {
                case "50parts":
                    FlipPlusGame.coinsData.increaseAmount(50);
                    break;

                case "200parts":
                    FlipPlusGame.coinsData.increaseAmount(200);
                    break;

                case "500parts":
                    FlipPlusGame.coinsData.increaseAmount(500);
                    break;

                case "1000parts":
                    FlipPlusGame.coinsData.increaseAmount(1000);
                    break;

                case "100parts":
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