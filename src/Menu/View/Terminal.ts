module InvertCross.Menu.View
{
    //View
    export class Terminal extends createjs.Container
    {
        private screenContaier: createjs.Container;
        private textBox: createjs.Text;

        constructor()
        {
            super();

            //set informations container
            this.screenContaier = new createjs.Container();
            this.addChild(this.screenContaier);

            //textBox
            this.textBox = new createjs.Text("", defaultFontFamilyNormal, defaultFontColor);
            this.textBox.lineWidth = 840;
            this.screenContaier.addChild(this.textBox);

            //set its own position
            this.x = 361;
            this.y = 451;
        }

        //Set Text on Screen
        //and animate it
        public setText(text: string)
        {
            //this.animateTransition(() =>
            //{
                this.textBox.text = text;
            //});
        }

        public animateTransition(action: () => void)
        {
            //createjs.Tween.get(this.screenContaier).to({ alpha: 0, x: -100 }, 200, createjs.Ease.quadIn).call(() =>
            //{
            //    action();
            //    this.screenContaier.set({ alpha: 0, x: 100 });
            //    createjs.Tween.get(this.screenContaier).to({ y: 0, alpha: 1 }, 200, createjs.Ease.quadOut)
            //});
        }
    }
}