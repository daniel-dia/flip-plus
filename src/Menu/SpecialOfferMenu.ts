/// <reference path="shopmenu.ts" />

module FlipPlus.Menu {
    export class SpecialOfferMenu extends ShopMenu {

        protected productIdList = ["100parts"];

        // add all products in the list
        protected fillProducts(productList: Array<any>, inappsService:any) {
            super.fillProducts(productList, inappsService);

            var bt = new gameui.ImageButton("menu/specialOffer", () => {
                if (this.inappsService) this.inappsService.purchase(productList[0].productId, 1);
                bt.fadeOut();
            });

            this.content.addChild(bt);

            // adds price
            bt.addChild(gameui.AssetsManager.getBitmapText(productList[0].localizedPrice,"fontStrong").set({ x: -210, y: 190}));
         }

        protected buildHeader(title, previousScreen, color?: string) {
            super.buildHeader(StringResources.menus.specialOffer, previousScreen, color);
        }


    }
}