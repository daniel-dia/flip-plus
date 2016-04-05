﻿/// <reference path="shopmenu.ts" />

module FlipPlus.Menu {
    export class SpecialOfferMenu extends ShopMenu {

        protected productIdList = ["100"];

        constructor(previousScreen: gameui.ScreenState) {
            super( previousScreen);
        }

        // add all products in the list
        protected fillProducts(productList: Array<any>) {

            var bt = new gameui.ImageButton("menu/specialOffer");
            this.content.addChild(bt);
            // add function callback
            bt.addEventListener("mousedown", (event: PIXI.interaction.InteractionEvent) => { Cocoon.Store.purchase(productList[0].productId); });

            // adds Value
            bt.addChild(gameui.AssetsManager.getBitmapText(productList[0].localizedPrice,"fontWhite").set({ x: -210, y: 255 }));

            // adds buy text
            bt.addChild(gameui.AssetsManager.getBitmapText(StringResources.menus.buy, "fontBlue").set({ x: 165, y: 250 }));

        }

        protected buildHeader(title, previousScreen, color?: string) {
            super.buildHeader(StringResources.menus.specialOffer, previousScreen, color);
        }
    }
}