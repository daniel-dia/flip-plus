/// <reference path="shopmenu.ts" />

module FlipPlus.Menu {
    export class SpecialOfferMenu extends ShopMenu {

        constructor(previousScreen: gameui.ScreenState) {
            super(previousScreen, ["100parts"]);
            FlipPlusGame.analytics.logSpecialOfferShow();
        }

        // add all products in the list
        protected fillProducts(productList: Array<any>, inappsService:any) {
            super.fillProducts(productList, inappsService);
            this.productsContainer.visible = false;

            var bt = new gameui.ImageButton("menu/specialOffer", () => {
                if (this.inappsService) this.inappsService.purchase(productList[0].productId, 1);
                bt.fadeOut();
                this.productsContainer.visible = true;
                FlipPlusGame.analytics.logSpecialOfferClick();
            });

            this.content.addChild(bt);

            // adds price
            if (productList[0])
                bt.addChild(gameui.AssetsManager.getBitmapText(productList[0].localizedPrice,"fontStrong").set({ x: -210, y: 190}));
         }

        protected buildHeader(title, previousScreen, color?: string) {
            super.buildHeader(StringResources.menus.specialOffer, previousScreen, color);
        }


    }
}