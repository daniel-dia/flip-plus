module InvertCross.Bonus {

    // Class
    export class Bonus2 extends BonusScreen {

        private currentCard: createjs.Container;
        private pairsMatched: number;
        private pairs: number;
        private lives: number;

        constructor(itemsArray: Array<string>, sufix: string= "1") {
            super(itemsArray, "Bonus2");
            this.pairsMatched = 0;
        }

        addObjects() {
            super.addObjects();
            var cards = this.generateCards(12, 5, this.itemsArray);
            this.pairs= 5;
            this.addCards(cards);
        }
        
        //===============================================================================

        private match(card1: createjs.Container, card2: createjs.Container):boolean {
            if (card1.name == card2.name && card1 != card2) {
                this.userAquireItem(card1.name);
                this.userAquireItem(card1.name);

                this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);
                return true;

            } else {
                this.content.mouseEnabled = false;
                setTimeout(() => {
                    this.closeCard(card1);
                    this.closeCard(card2);
                    this.content.mouseEnabled = true;
                }, 500);

                return false;
            }
        }

        private closeOppened() {
            
        }

        //===============================================================================

        private cardClick(card: createjs.Container) {

            this.openCard(card);

            //if card is Jocker (Rat)
            if (card.name == null) {
                this.lives--;
                card.mouseEnabled = false;
                if (this.lives == 0) {
                    this.content.mouseEnabled = false;
                    this.message.showtext("No more chances", 2000, 500);
                    this.message.addEventListener("onclose", () => { this.endBonus();});
                }
                return;
            }

            if (this.currentCard) {
                var match = this.match(this.currentCard, card);
                if (match) this.pairsMatched++;
                if (this.pairsMatched >= this.pairs) {
                    this.message.showtext("Well done!", 2000, 500);
                    this.message.addEventListener("onclose", () => { this.endBonus(); });
                    this.endBonus();
                }

                this.currentCard = null;
            }


            else this.currentCard = card;
        }

        
        private addCards(cards:Array<string>) {
            var cols = 3;
            var width = 450;
            var height = 320;

            var cardsContainer = new createjs.Container();
            cardsContainer.x = 184 + 93 + 45;
            cardsContainer.y = 135 +400;

            for (var c in cards) {
                var card = this.createCard(cards[c]);
                card.x = c % cols * width;
                card.y = Math.floor(c / cols) * height;
                cardsContainer.addChild(card);

                card.addEventListener("click", (e:MouseEvent) => { this.cardClick(<createjs.Container>e.currentTarget)});
            }

            this.content.addChild(cardsContainer);
        }

        private generateCards(cardsCount: number, pairs: number, items: Array<string>): Array<string> {
            var cards = new Array<string>();

            //set number of lives
            this.lives = cardsCount - pairs * 2;

            //add Cards Pairs
            for (var p = 0; p < pairs; p++) {
                var itemIndex = Math.floor(Math.random() * items.length);
                cards.push(items[itemIndex]);
                cards.push(items[itemIndex]);
            }
            
            //Adds empty spaces
            for (var p = 0; p < cardsCount- pairs*2; p++) 
                cards.push(null);

            //randomize cards
            var randomizedCards = new Array<string>();
            while (cards.length > 0) {
                var index = Math.floor(Math.random() * cards.length);
                randomizedCards.push(cards[index]);
                cards.splice(index, 1);
            }

            return randomizedCards;
        }

        private createCard(item: string):createjs.DisplayObject {
            var card = new createjs.Container;
            card.name = item;

            //background
            card.addChild(Gbase.AssetsManager.getBitmap("Bonus2/bonuscard2"));

            //adds item Image or empty image
            var itemImage: string = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
            var itemDO = Gbase.AssetsManager.getBitmap(itemImage);
            itemDO.name = "item";
            itemDO.x = 368 / 2;
            itemDO.y = 279 / 2;
            itemDO.x -= itemDO.getBounds().width / 2;
            itemDO.y -= itemDO.getBounds().height / 2;
            card.addChild(itemDO);
            
            //add cover image
            var cover = new Gbase.UI.ImageButton("Bonus2/bonuscard1");
            cover.x = 368 / 2;
            cover.y = 279 / 2;
            cover.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(-368 / 2, -279/2, 368, 279));
            cover.name = "cover";
            card.addChild(cover);

            //card.createHitArea();
            
            card.regX = 184;
            card.regY = 135;

            return card;
        }

        private openCard(card: createjs.Container) {
            var cover = card.getChildByName("cover");
            createjs.Tween.removeTweens(cover);
            createjs.Tween.get(cover).to({ scaleY: 0 }, 200, createjs.Ease.quadIn).call(() => { cover.visible = false });
            card.mouseEnabled = false;

        }

        private closeCard(card: createjs.Container) {
            var cover = card.getChildByName("cover");
            cover.visible = true;
            createjs.Tween.removeTweens(cover);
            createjs.Tween.get(cover).to({ scaleY: 1 }, 200, createjs.Ease.quadIn);
            card.mouseEnabled = true;
        }

        
    }
}   