/// <reference path="../../../lib/easeljs.d.ts" />

/// <reference path="../../InvertCrossGame.ts" /> 

/// <reference path="../../GamePlay/Model/Level.ts" /> 

/// <reference path="../../userdata/projectsdata.ts" />

/// <reference path="../../../Gbase/ScreenState.ts" /> 
/// <reference path="../../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../../Gbase/UI/Button.ts" /> 

module InvertCross.Menu.View {

    export class LevelThumb extends Gbase.UI.Button {

        private theme: string;

        //Display Objects
        private badges: createjs.DisplayObject;

        private locked: createjs.DisplayObject;
        private active: createjs.DisplayObject;
        private skiped: createjs.DisplayObject;
        private thumb: createjs.Container;

        private level: Projects.Level;

        // Constructor
        constructor(level: InvertCross.Projects.Level) {
            super();
            this.level = level;
            this.name = level.name;
            this.theme = level.theme;

            this.thumb = new createjs.Container();
            this.addChild(this.thumb);


            this.skiped = this.createSkip();
            this.addChild(this.skiped);

            this.height = this.width = 150;
            this.createHitArea();
        }
        
        //updates thumbnail with user data information
        public updateUserData() {
            var u = this.level.userdata;
            this.skiped.visible = u.skip;

            //replace with a new thumb
            while (this.thumb.getNumChildren() > 0) this.thumb.removeChild(this.thumb.getChildAt(0));
            this.thumb.addChild(this.createThumbs(this.level));

            //cache thumb
            this.cache(-99, -102, 198, 204);

            //create bounce effect if is active
            this.scaleX = this.scaleY = 1;
            if (u.unlocked && !u.solved && !u.skip) {
                this.set({ scaleX: 1, scaleY: 1 })
                createjs.Tween.get(this, { loop: true })
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 700  ,createjs.Ease.sineInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 700  ,createjs.Ease.sineInOut)
           }
      
        } 
        
        //Create a Lock Symbol instead of level Thumb
        private createLocked(): createjs.DisplayObject {
            var img: createjs.DisplayObject = InvertCross.Assets.getImage("locked.jpg");
            img.x = img.y = 33;
            img.scaleX = img.scaleY = 0.3;
            return img;
        }

        //create a skip tag
        private createSkip(): createjs.DisplayObject {
            var sk: createjs.Bitmap = Assets.getImage("workshop/skip");
            sk.regX = sk.getBounds().width/2;
            sk.regY = sk.getBounds().height/2;
            return sk;
        }

        //Create a container with a level thumbnail and evel name
        private createThumbs(level: InvertCross.Projects.Level): createjs.Container {

            var thumbContainer: createjs.Container = new Gbase.UI.Button();

            var spacing = 45;
            var size = 40;

            //defines accentColor based on level type.
            var assetname = "faseamarela";
            if (level.type == "puzzle") assetname = "faseverde";
            if (level.type == "time") assetname = "faseroxa";
            if (level.type == "combo") assetname = "faseamarela";

            var marginLeft = (spacing * level.width) / 2;
            var marginTop = (spacing * level.height) / 2;

            var totalSize = level.width * level.height;
            var blocks: boolean[] = [];

            for (var i = 0; i < totalSize; i++) blocks[i] = false;

            if (level.type != "time") {//TODO, anything better than it
                //invert a crosses in the block
                for (var i = 0; i < level.blocksData.length; i++) {
                    var n = level.blocksData[i];
                    blocks[n] = !blocks[n];
                    blocks[n + level.width] = !blocks[n + level.width];
                    blocks[n - level.width] = !blocks[n - level.width];
                    if (n % level.width != 0) blocks[n - 1] = !blocks[n - 1];
                    if (n % level.width != level.width - 1) blocks[n + 1] = !blocks[n + 1];
                }
            }


            var sbg: createjs.Bitmap = Assets.getImage("workshop/" + assetname + (level.userdata.solved ? "f" : ""));
            thumbContainer.addChild(sbg);
            sbg.regX = sbg.regY = 98;

            if (level.type != "time") {//TODO, anything better than it
                //create all tiny block
                // var i = 0;
                //for (var col = 0; col < level.width; col++) {
                //    for (var row = 0; row < level.height; row++) {


                for (var col = 1; col < 4; col++) {
                    for (var row = 1; row < 4; row++) {

                        var s = new createjs.Shape();
                        var color: string;

                        if (!level.userdata.unlocked) 
                            if (blocks[col * level.width + row]) color = "rgba(0,0,0,0.5)"; else color = "rgba(0,0,0,0.3)";
                        else 
                            if (blocks[col * level.width + row]) color = "rgba(255,255,255,0.9)"; else color = "rgba(0,0,0,0.3)";

                        s.graphics.beginFill(color).drawRect(spacing * col - marginLeft, spacing * row - marginTop, size, size);
                        thumbContainer.addChild(s);
                    }
                }
            }            
            return thumbContainer;

        }
    }
}
