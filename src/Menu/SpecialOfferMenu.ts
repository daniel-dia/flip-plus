/// <reference path="shopmenu.ts" />

module FlipPlus.Menu {
    export class SpecialOfferMenu extends ShopMenu {

        protected productIdList = ["100"];

        constructor(previousScreen: gameui.ScreenState) {
            super( previousScreen);
        }

        // add all products in the list
        protected fillProducts(productList: Array<Cocoon.Store.ProductInfo>) {

            var bt = new gameui.ImageButton("menu/specialOffer");
            this.content.addChild(bt);
            // add function callback
            bt.addEventListener("click", (event: createjs.Event) => { Cocoon.Store.purchase(productList[0].productId); });

            // adds Value
            bt.addChild(new gameui.Label(productList[0].localizedPrice, defaultFontFamilyNormal, "white").set({ x: -210, y: 255 }));

            // adds buy text
            bt.addChild(new gameui.Label(StringResources.menus.buy, defaultFontFamilyHighlight, "#86c0f1").set({ x: 165, y: 250 }));

        }

        protected buildHeader(title, previousScreen, color?: string) {
            super.buildHeader(StringResources.menus.specialOffer, previousScreen, color);
        }
    }
}