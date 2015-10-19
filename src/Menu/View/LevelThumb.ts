module FlipPlus.Menu.View {

    export class LevelThumb extends gameui.Button {

        private theme: string;

        //Display Objects
        private badges: PIXI.DisplayObject;

        private level: Projects.Level;

        // Constructor
        constructor(level: FlipPlus.Projects.Level, event?: (event?: any) => any) {
            super(event);
            this.level = level;
            this.name = level.name;
            this.theme = level.theme;
            
        }
        
        //updates thumbnail with user data information
        public updateUserData() {

            //create a new thumb
            this.createThumbs(this.level);
            this.createHitArea();
        } 

        //Create a container with a level thumbnail and evel name
        protected createThumbs(level: FlipPlus.Projects.Level) {
            
            this.removeChildren();

            var color1: number = 0xFFFFFF ;
            var color2: number = 0;
            var alpha1: number = 0.5;
            var alpha2: number = 0.3;
            var assetSufix: string;

            var assetName = this.defineAssetName(level);

            var thumbContainer: PIXI.Container = new PIXI.Container();
            this.addChild(thumbContainer);
            
            //defines thumb state
            if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                assetSufix = "1";
                this.setSound(null);
            }

            // locked
            if (!level.userdata.unlocked || level.userdata.skip || level.userdata.item) {
                assetSufix = "2";
                color1 = 0;
                this.setSound("buttonOff");
            }
                        
            // next playable
            if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                assetSufix = "3";
                alpha1 = 0.9;
                
                this.setSound(null);

                //create bounce effect if is active
                thumbContainer.set({ scaleX: 1, scaleY: 1 })
                createjs.Tween.get(thumbContainer)
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut)
           }

            //Adds Thumb Backgroud
            thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));

            //Adds Thumb Blocks
            thumbContainer.addChild(this.createBlocks(level,color1,color2,alpha1,alpha2,1,4));

            //Adds thumb tags
            thumbContainer.addChild(this.createTags(level,assetName,assetSufix));

            //Adds level modificator
            thumbContainer.addChild(this.createLevelModificator(level));

            //cache thumb
            thumbContainer.cacheAsBitmap = true;
        }

        //defines accentColor based on level type.
        protected defineAssetName(level: Projects.Level) :string{
            var assetname = "faseamarela";
            if (level.theme == "green") assetname = "faseverde";
            if (level.theme == "purple") assetname = "faseroxa";
            if (level.theme == "yellow") assetname = "faseamarela";
            return assetname;
        }

        // add items modification
        protected createLevelModificator(level: Projects.Level):PIXI.DisplayObject {

            if (level.userdata.skip) {
                var sk = gameui.AssetsManager.getBitmap("puzzle/icon_skip");
                sk.pivot.x = sk.getLocalBounds().width / 2;
                sk.pivot.y = sk.getLocalBounds().height / 2;
                return sk;
            }

            if (level.userdata.item) {
                var sk = gameui.AssetsManager.getBitmap("puzzle/icon_" + level.userdata.item);
                sk.pivot.x = sk.getLocalBounds().width / 2;
                sk.pivot.y = sk.getLocalBounds().height / 2;
                return sk;
            }
                
        }

        //adds thumb background
        protected createBackgroud(level: Projects.Level,assetName,assetSufix): PIXI.DisplayObject {

            var sbg = gameui.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
            sbg.pivot.x = sbg.pivot.y = 98;
            return sbg;
        }
        
        //adds thumb blocks
        protected createBlocks(level: Projects.Level, color1: number, color2: number, alpha1: number, alpha2: number, sizeStart?: number, sizeEnd?: number): PIXI.DisplayObject {
           
            var col0 = sizeStart ? sizeStart : 0;
            var colf = sizeEnd ? sizeEnd :level.width ;
            var row0 = sizeStart ? sizeStart : 0;
            var rowf = sizeEnd ? sizeEnd: level.height ;

            var spacing = 45;
            var size = 40;

            var totalSize = level.width * level.height;
            var blocks: boolean[] = [];

            //clean blocks
            for (var i = 0; i < totalSize; i++) blocks[i] = false;

            //invert a crosses in the block
            if(level.blocksData)
            for (var i = 0; i < level.blocksData.length; i++) {
                var n = level.blocksData[i];
                blocks[n] = !blocks[n];
                blocks[n + level.width] = !blocks[n + level.width];
                blocks[n - level.width] = !blocks[n - level.width];
                if (n % level.width != 0) blocks[n - 1] = !blocks[n - 1];
                if (n % level.width != level.width - 1) blocks[n + 1] = !blocks[n + 1];
                }
            var s = new PIXI.Graphics();
          
            for (var row = row0; row < rowf; row++) {
                for (var col = col0; col < colf; col++) {
                    var color: number;
                    var alpha: number;
                    if (blocks[row * level.width + col]) {
                        color = color1;
                        alpha = alpha1;
                    }
                    else {
                        color = color2;
                        alpha = alpha2;
                    }
                    s.beginFill(color,alpha).drawRect(spacing * (col - col0), spacing * (row - row0), size, size);
                }
            }

            // scale for fit on square
            s.scale.x = s.scale.y = Math.min(3 / (colf - col0), 3 / (rowf - row0));

            // centralize thumg
            s.pivot.x = spacing*(colf-col0)/ 2;
            s.pivot.y = spacing*(rowf-row0)/ 2;

            return s;
        }

        //Adds Thumb Tag
        protected createTags(level: Projects.Level, assetName,assetSufix) :PIXI.DisplayObject{
            //TODO: essas string devem estar em um enum
            if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                var tag = gameui.AssetsManager.getBitmap("workshop/" + assetName + (level.type=="moves"?"flip":level.type )+ assetSufix);
                tag.pivot.x = tag.pivot.y = 100;
                return tag;
            }
        }
    }
}
