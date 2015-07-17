module FlipPlus.Bonus {

    // Class
    export class Bonus2 extends BonusScreen {

        private pairs: number;
        private lives: number;

        private cards: Array<Card>;
        private cardsContainer: createjs.Container;

        private matchesFound: number;

        constructor(itemsArray: Array<string>, sufix: string= "1") {
            this.cards = [];
            this.matchesFound = 0;
            super(itemsArray, "Bonus2");
        }

        addObjects() {
            super.addObjects();
            var cards = this.generateCards(12, 5, ["coin", "coin", "coin", "2coin", "3coin"]);
            this.pairs = 5;
            this.addCards(cards);
        }

        //===============================================================================

        //verifies all matches in oppened cards 
        private matchAll(newCard: Card, openedCards: Array<Card>){
            for (var oc in openedCards)
                this.matchPair(newCard, openedCards[oc])
        }

        //verifies if two cards matches
        private matchPair(card1: Card, card2: Card): boolean {
            if (card1.name == card2.name && card1 != card2) {

                var multiplier = 1;

                if (card1.name == "2coin") {
                    card1.name = card2.name = "coin";
                    multiplier = 2;
                }
                if (card1.name == "3coin") {
                    card1.name = card2.name = "coin";
                    multiplier = 3;
                }

                for (var i = 0; i < multiplier*2; i++)
                    this.userAquireItem(card1.name);
                
                card1.opened = false;
                card2.opened = false;
                //animate itens

                this.animateItemObjectToFooter(card1.getChildByName("item"), card1.name);
                setTimeout(() => {
                    this.animateItemObjectToFooter(card2.getChildByName("item"), card2.name);
                }, 200);

                // play sound
                gameui.AudiosManager.playSound("Correct Answer");

                this.matchesFound++;
                return true;
            }
        }

        //===============================================================================

        //handler when click cards
        private cardClick(card: Card) {

            card.open();
            this.cardsContainer.setChildIndex(card, this.cardsContainer.getNumChildren() - 1);

            //if card is Jocker (Rat)
            if (card.name == null) {
                //shake the card
                card.shakeObj();

                //decrase lives number
                this.lives--;
                card.mouseEnabled = false;

                // play sound
                gameui.AudiosManager.playSound("wrong");

                if (this.lives == 0) {
                    //if there is no more lives, than end game
                    this.content.mouseEnabled = false;
                    this.message.showtext(stringResources.b2_noMoreChances, 2000, 500);
                    this.message.addEventListener("onclose", () => { this.endBonus(); });


                    // play sound
                    gameui.AudiosManager.playSound("Wrong Answer");
                }
                return;
            }

            //if cards matches
            var matches = this.matchAll(card, this.getOpenedCards());

            //verifies if matches all cards
            if (this.matchesFound >= this.pairs) {
                //ends the game
                this.content.mouseEnabled = false;
                this.message.showtext(stringResources.b2_finish, 2000, 500);
                this.message.addEventListener("onclose", () => { this.endBonus(); });
            }


        }

        //retuns all oppened cards
        private getOpenedCards(): Array<Card> {

            var openedCards: Array<Card> = new Array<Card>();
            for (var c in this.cards) {
                var card = this.cards[c];
                if (card["opened"]) openedCards.push(card);
            }
            return openedCards;
        }

        //adds cards to the board
        private addCards(cards: Array<string>) {
            var cols = 3;
            var width = 450;
            var height = 320;

            //create cards container
            var cardsContainer = new createjs.Container();
            cardsContainer.x = 184 + 93 + 45;
            cardsContainer.y = 135 + 400;
            this.cardsContainer = cardsContainer;

            //for each cards
            for (var c in cards) {
                var card =new Card(cards[c]);
                card.x = c % cols * width;
                card.y = Math.floor(c / cols) * height;
                cardsContainer.addChild(card);
                this.cards.push(card);

                //add cards event listener
                card.addEventListener("click", (e: MouseEvent) => { this.cardClick(<Card>e.currentTarget) });
            }

            this.content.addChild(cardsContainer);
        }

        //generate cards itens to be randomized
        private generateCards(cardsCount: number, pairs: number, items: Array<string>): Array<string> {
            var cards = new Array<string>();
            var items2:Array<string> = new Array<string>();
            items2 = items2.concat(items);

            //set number of lives
            this.lives = cardsCount - pairs * 2;

            //add Cards Pairs
            for (var p = 0; p < pairs; p++) {
                var itemIndex = Math.floor(Math.random() * items2.length);
                cards.push(items2[itemIndex]);
                cards.push(items2[itemIndex]);
                items2.splice(itemIndex, 1);
            }

            //Adds empty spaces
            for (var p = 0; p < cardsCount - pairs * 2; p++)
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
    }

    class Card extends createjs.Container{

        public opened: boolean;
        public item: string;

        constructor(item: string) {
            super();
            this.item = item;

            this.name = item;

            //background
            var bg = gameui.AssetsManager.getBitmap("Bonus2/bonuscard2");
            bg.name = "background";
            this.addChild(bg);

            //adds item Image or empty image
            var itemImage: string = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
            var itemDO = gameui.AssetsManager.getBitmap(itemImage);
            itemDO.name = "item";
            itemDO.x = 368 / 2;
            itemDO.y = 279 / 2;
            itemDO.regX = itemDO.getBounds().width / 2;
            itemDO.regY = itemDO.getBounds().height / 2;
            itemDO.visible = false;
            this.addChild(itemDO);

            //add cover image
            var cover = new gameui.ImageButton("Bonus2/bonuscard1");
            cover.x = 368 / 2;
            cover.y = 279 / 2;
            cover.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(-368 / 2, -279 / 2, 368, 279));
            cover.name = "cover";
            this.addChild(cover);

         
            this.regX = 184;
            this.regY = 135;
        }

        //open a card animation
        public open() {

            this.getChildByName("item").visible = true;

            var cover = this.getChildByName("cover");
            createjs.Tween.removeTweens(cover);
            
            createjs.Tween.get(cover).to({ rotation: 90, y: 1000, alpha: 0 }, 500, createjs.Ease.sineIn).call(() => { cover.visible = false });
            this.mouseEnabled = false;
            this.opened = true;
        }

        public shakeObj() {

            var item = this.getChildByName("item");
            createjs.Tween.removeTweens(item);

            createjs.Tween.get(item)
                .to({ x: 184 + - 25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut)
                .to({ x: 184 + + 25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut)
                .to({ x: 184 + - 25, scaleX: 1.3, scaleY: 1.3 }, 150, createjs.Ease.quadInOut)
                .to({ x: 184 + + 25, scaleX: 1.1, scaleY: 1.1 }, 150, createjs.Ease.quadInOut)
                .to({ x: 184 + +  0, scaleX: 1.0, scaleY: 1.0 }, 150, createjs.Ease.quadInOut);

        }
    }
}   