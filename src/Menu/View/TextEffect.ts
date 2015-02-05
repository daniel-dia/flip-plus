module FlipPlus.Menu.View {

    // View Class
    export class TextEffect extends gameui.UIItem{

        private closeinterval;

        //class contructor
        constructor() {
            super();
              
            //centralize the popup on screen
            this.width = defaultWidth;
            this.height = defaultHeight;
            this.x = defaultWidth / 2;
            this.y = defaultHeight / 2;
            this.centralize();
            
            //hide popup
            this.visible = false;

            this.mouseEnabled = false;
        }

        //public method to invoke the popup
        public showtext(text: string, timeout: number= 3000,delay:number=0) {

            //clean everything
            this.removeAllChildren();
                       
            //create a titleShadow
            var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
            titleShadow.textAlign = "center";
            titleShadow.textBaseline = "middle";
            titleShadow.x = defaultWidth / 2;
            this.addChild(titleShadow);

            //create a title
            var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
            titleDO.textAlign = "center";
            titleDO.textBaseline = "middle";
            titleDO.x = defaultWidth / 2;
            this.addChild(titleDO);

            titleShadow.y = titleDO.y = defaultHeight /2;
            titleShadow.y += 15;

            //updates text
            titleDO.text = titleShadow.text = text.toUpperCase();

            var ty = defaultHeight * 0.9;

            this.set({
                alpha: 0,
                y: ty
            });

            this.visible = true;

            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this)
                .to({ alpha: 1, y: ty - 50 }, 200, createjs.Ease.quadOut)
                .to({ alpha: 1, y: ty - 100 }, 1000, createjs.Ease.linear)
                .to({ alpha: 0, y: ty - 300 }, 200, createjs.Ease.quadIn)
                .call(() => {
                    this.visible = false;
                    this.dispatchEvent("onclose");
                });
        }
    }
}
