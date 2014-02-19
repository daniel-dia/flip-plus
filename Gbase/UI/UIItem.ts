/// <reference path="../../lib/easeljs.d.ts" />

module Gbase.UI {

    // Class
    export class UIItem extends createjs.Container {

        //TODO, replace width height by getBounds...

        //default Variables
        public width: number;
        public height: number;
        public centered: boolean = false;

        public animating = false;

        private antX;
        private antY;

        public centralize() {
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.centered = true;
        }

        public fadeOut() {
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            //this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: 0.5,
                scaleY: 0.5,
                alpha: 0,
                x: this.antX + (this.centered ? 0 : (this.width / 4)),
                y: this.antY + (this.centered ? 0 : (this.height / 4))
            },200, createjs.Ease.quadIn).call(() => {
                    this.visible = false;
                    this.x = this.antX;
                    this.y = this.antY;
                    this.scaleX = this.scaleY = 1;
                    this.alpha = 1;
                    this.animating = false;
                    this.mouseEnabled = true;;
                });
        }

        public fadeIn() {
            this.visible = true;
            this.animating = true;

            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }

            this.scaleX = 0.5,
            this.scaleY = 0.5,
            this.alpha = 0,
            this.x = this.x + (this.centered ? 0 : (this.width / 4)),
            this.y = this.y + (this.centered ? 0 : (this.height / 4))

            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: 1,
                scaleY: 1,
                alpha: 1,
                x: this.antX,
                y: this.antY,
            }, 200,createjs.Ease.quadOut)

                .call(() => {
                    this.mouseEnabled = true;
                    this.animating = false;
                });
        }


        //calcula
        createHitArea(): void {
            var hit = new createjs.Shape();

            var b = this.getBounds();
            
            if (b) hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            //Todo. se for texto colocar uma sobra. !

            this.hitArea = hit;
            
        }
    }
}