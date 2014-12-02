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
        private createThumbs(level: FlipPlus.Projects.Level) {
            
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
                createjs.Tween.get(thumbContainer, { loop: true })
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1.00, scaleY: 1.00 }, 500, createjs.Ease.sineInOut);
           }

            //Adds Thumb Backgroud
            thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));

            //Adds Thumb Blocks
            thumbContainer.addChild(this.createBlocks(level,color1,color2));

            //Adds thumb tags
            thumbContainer.addChild(this.createTags(level,assetName,assetSufix));

            //Adds level modificator
            thumbContainer.addChild(this.createLevelModificator(level));

            //cache thumb
            thumbContainer.cache(-99, -102, 198, 204);

        }

        //defines accentColor based on level type.
        private defineAssetName(level: Projects.Level) :string{
            var assetname = "faseamarela";
            if (level.theme == "green") assetname = "faseverde";
            if (level.theme == "purple") assetname = "faseroxa";
            if (level.theme == "yellow") assetname = "faseamarela";
            return assetname;
        }

        private createLevelModificator(level: Projects.Level):createjs.DisplayObject {

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
        private createBackgroud(level: Projects.Level,assetName,assetSufix): createjs.DisplayObject {

            var sbg = gameui.AssetsManager.getBitmap("workshop/" + assetName + assetSufix);
            sbg.regX = sbg.regY = 98;
            return sbg;
        }
        
        //adds thumb blocks
        private createBlocks(level: Projects.Level,color1:string, color2:string): createjs.DisplayObject {

            var spacing = 45;
            var size = 40;

            var marginLeft = spacing * 5/2;
            var marginTop = spacing * 5/2;
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

            for (var col = 1; col < 4; col++) {
                for (var row = 1; row < 4; row++) {
                    
                    var color: string;
                    if (blocks[col * level.width + row]) color = color1; else color = color2;
                    s.graphics.beginFill(color).drawRect(spacing * col - marginLeft, spacing * row - marginTop, size, size);
                }
            }

            return s;
        }

        //Adds Thumb Tag
        private createTags(level: Projects.Level, assetName,assetSufix) :createjs.DisplayObject{
            //TODO: essas string devem estar em um enum
            if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                var tag = gameui.AssetsManager.getBitmap("workshop/" + assetName + (level.type=="moves"?"flip":level.type )+ assetSufix);
                tag.regX = tag.regY = 100;
                return tag;
            }
        }
    }
}
