module FlipPlus.Menu.View {

    export class LevelThumb extends gameui.Button {

        private theme: string;

        //Display Objects
        private badges: createjs.DisplayObject;

        private level: Projects.Level;

        // Constructor
        constructor(level: FlipPlus.Projects.Level) {
            super();
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
            
            this.removeAllChildren();

            var color1: string;
            var color2: string;
            var assetSufix: string;

            var assetName = this.defineAssetName(level);

            var thumbContainer: createjs.Container = new createjs.Container();
            this.addChild(thumbContainer);
            
            //defines thumb state
            //
            if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                assetSufix = "1";
                color1 = "rgba(255,255,255,0.5)";
                color2 = "rgba(0,0,0,0.3)";
                this.setSound(null);
            }

            // locked
            if (!level.userdata.unlocked || level.userdata.skip || level.userdata.item) {
                assetSufix = "2";
                color1 = "rgba(0,0,0,0.5)";
                color2 = "rgba(0,0,0,0.3)";
                this.setSound("buttonOff");
            }
                        
            // next playable
            if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                assetSufix = "3";
                color1 = "rgba(255,255,255,0.9)";
                color2 = "rgba(0,0,0,0.3)";
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
            thumbContainer.addChild(this.createBlocks(level,color1,color2,1,4));

            //Adds thumb tags
            thumbContainer.addChild(this.createTags(level,assetName,assetSufix));

            //Adds level modificator
            thumbContainer.addChild(this.createLevelModificator(level));

            //cache thumb
            //thumbContainer.cache(-99, -102, 198, 204);
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
        protected createLevelModificator(level: Projects.Level):createjs.DisplayObject {

            if (level.userdata.skip) {
                var sk = gameui.AssetsManager.getBitmap("puzzle/icon_skip");
                sk.regX = sk.getBounds().width / 2;
                sk.regY = sk.getBounds().height / 2;
                return sk;
            }

            if (level.userdata.item) {
                var sk = gameui.AssetsManager.getBitmap("puzzle/icon_" + level.userdata.item);
                sk.regX = sk.getBounds().width / 2;
                sk.regY = sk.getBounds().height / 2;
                return sk;
            }
                
        }

        //adds thumb background
        protected createBackgroud(level: Projects.Level,assetName,assetSufix): createjs.DisplayObject {

            var sbg = gameui.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
            sbg.regX = sbg.regY = 98;
            return sbg;
        }
        
        //adds thumb blocks
        protected createBlocks(level: Projects.Level, color1: string, color2: string, sizeStart?: number, sizeEnd?: number): createjs.DisplayObject {
          
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
            var s = new createjs.Shape();
          
            for (var row = row0; row < rowf; row++) {
                for (var col = col0; col < colf; col++) {
                    var color: string;
                    if (blocks[row * level.width + col]) color = color1; else color = color2;
                    s.graphics.beginFill(color).drawRect(spacing * (col - col0), spacing * (row - row0), size, size);
                }
            }

            // scale for fit on square
            s.scaleX = s.scaleY = Math.min(3 / (colf - col0), 3 / (rowf - row0));

            // centralize thumg
            s.regX = spacing*(colf-col0)/ 2;
            s.regY = spacing*(rowf-row0)/ 2;

            return s;
        }

        //Adds Thumb Tag
        protected createTags(level: Projects.Level, assetName,assetSufix) :createjs.DisplayObject{
            //TODO: essas string devem estar em um enum
            if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                var tag = gameui.AssetsManager.getBitmap("workshop/" + assetName + (level.type=="moves"?"flip":level.type )+ assetSufix);
                tag.regX = tag.regY = 100;
                return tag;
            }
        }
    }
}
