module SmokeFX {

    // Class
    export class SmokeFXEmmiter extends createjs.Container {

        public birthrate: number=1;
        public aging: number=1000;
        public ageVariation: number=50;

        public spin: number=90;
        public spinVariation: number=180;

        public speedX: number = -0.03;
        public speedY: number = 0;
        public speedVariationX: number = 0;
        public speedVariationY: number = 0;

        public scale: number = 1;
        public scaleFinal: number = 2;
        public scaleVariation: number = 0.1;

        public alpha: number=1;
        public alphaVariation: number=0.1;
        public finalAlpha: number=0;

        public imageFile: string;

        public imageRegX: number;
        public imageRegY: number;

        private rateCount: number = 0;

        private emmiterWidth: number=500;
        private emmiterHeight: number=100;

        private particles: Array<createjs.DisplayObject>;

        constructor(imageFile: string, width: number, height: number) {
            super();
            this.imageFile = imageFile;
            this.emmiterWidth = width;
            this.emmiterHeight = height;

            var test = new createjs.Bitmap(imageFile);
            this.addChild(test);

            createjs.Ticker.addEventListener("tick", () => { this.tickrate() });
        
        }

        private tickrate() {

            if (Math.random() > this.birthrate) return;

            var imageFile: string = this.imageFile;

            var x: number = Math.random() * this.emmiterWidth;
            var y: number = Math.random() * this.emmiterHeight;
            var speedX: number = 0.5 - Math.random() * this.speedVariationX + this.speedX;
            var speedY: number = 0.5 -Math.random() * this.speedVariationY + this.speedY;
            var spin: number = 0.5 - Math.random() * this.spinVariation + this.spin;
            var age: number = 0.5 -Math.random() * this.ageVariation + this.aging;
            var alpha: number = 0.5 -Math.random() * this.alphaVariation + this.alpha;
            var finalAlpha: number = this.finalAlpha;

            var scale: number = Math.random() * this.scaleVariation + this.scale;
            var finalScale: number = Math.random() * this.scaleVariation + this.scaleFinal;

            this.emmit(imageFile, x, y, speedX, speedY,scale,finalScale, spin, age, alpha, finalAlpha);

        }

        private emmit(imageFile: string, x: number, y: number, speedX: number, speedY: number,scale:number,finalScale:number, spin: number, age: number, alpha: number, finalAlpha: number) {

            var asset = new createjs.Bitmap(imageFile);
            this.addChild(asset);



            asset.regX = this.imageRegX;
            asset.regY = this.imageRegY;

            asset.x = x;
            asset.y = y;
            asset.scaleX = asset.scaleY = scale;
           
           createjs.Tween.get(asset).to({
               x: x + speedX * age/1000,
               y: y + speedY * age/1000,
               rotation: spin * age / 1000,
               scaleX:finalScale,
               scaleY:finalScale,
           }, age*1.1).call((e) => { this.removeChild(asset) });


          asset.alpha = 0;
            createjs.Tween.get(asset).to({ alpha: alpha }, age * 0.1).call((e) => {
                createjs.Tween.get(asset).to({ alpha: finalAlpha }, age * 0.9);
                
                });
        }
    }
}