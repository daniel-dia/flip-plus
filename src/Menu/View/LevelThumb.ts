module InvertCross.Menu.View {

    export class LevelThumb extends Gbase.UI.Button {

        private theme: string;

        //Display Objects
        private badges: createjs.DisplayObject;

        private locked: createjs.DisplayObject;
        private active: createjs.DisplayObject;
        private skiped: createjs.DisplayObject;

        private level: Projects.Level;

        // Constructor
        constructor(level: InvertCross.Projects.Level) {
            super();
            this.level = level;
            this.name = level.name;
            this.theme = level.theme;
            
            this.skiped = this.createSkip();
            this.addChild(this.skiped);

            this.height = this.width = 150;
            this.createHitArea();
        }
        
        //updates thumbnail with user data information
        public updateUserData() {
            var u = this.level.userdata;
            this.skiped.visible = u.skip;

            //create a new thumb
            this.createThumbs(this.level);

            //cache thumb
            this.cache(-99, -102, 198, 204);
        } 

        //create a skip tag
        private createSkip(): createjs.DisplayObject {
            var sk: createjs.Bitmap = Assets.getImage("workshop/skip");
            sk.regX = sk.getBounds().width/2;
            sk.regY = sk.getBounds().height/2;
            return sk;
        }

        //Create a container with a level thumbnail and evel name
        private createThumbs(level: InvertCross.Projects.Level) {
            
            this.removeAllChildren();

            var thumbContainer: createjs.Container = new Gbase.UI.Button();

            var color1:string;
            var color2:string;
            var assetSufix: string;

            //defines accentColor based on level type.
            var assetname = "faseamarela";
            if (level.theme == "green") assetname = "faseverde";
            if (level.theme == "purple") assetname = "faseroxa";
            if (level.theme== "yellow") assetname = "faseamarela";

            //defines thumb state
            if (level.userdata.unlocked && level.userdata.solved || level.userdata.skip) {
                assetSufix = "1";
                color1 = "rgba(255,255,255,0.5)";
                color2 = "rgba(0,0,0,0.3)";
            }

            if (!level.userdata.unlocked) {
                assetSufix = "2";
                color1 = "rgba(0,0,0,0.5)";
                color2 = "rgba(0,0,0,0.3)";
            }

            if (level.userdata.unlocked && !level.userdata.solved && !level.userdata.skip) {
                assetSufix = "3";
                color1 = "rgba(255,255,255,0.9)";
                color2 = "rgba(0,0,0,0.3)";

                //create bounce effect if is active
                this.set({ scaleX: 1, scaleY: 1 })
                createjs.Tween.get(this, { loop: true }).to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut).to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
           }

            //Adds Thumb Backgroud
            this.addBackgroud(level);

            //Adds Thumb Blocks
            this.addBlocks(level);

            //Adds thumb tags
            this.addTags(level);

        }
        
        //adds thumb background
        private addBackgroud(level: Projects.Level) {
            var sbg: createjs.Bitmap = Assets.getImage("workshop/" + assetname + assetSufix);
            this.addChild(sbg);
            sbg.regX = sbg.regY = 98;
        }
        
        //adds thumb blocks
        private addBlocks(level: Projects.Level) {

            var spacing = 45;
            var size = 40;

            var marginLeft = (spacing * level.width) / 2;
            var marginTop = (spacing * level.height) / 2;
            var totalSize = level.width * level.height;
            var blocks: boolean[] = [];

            //clean blocks
            for (var i = 0; i < totalSize; i++) blocks[i] = false;

            //invert a crosses in the block
            for (var i = 0; i < level.blocksData.length; i++) {
                var n = level.blocksData[i];
                blocks[n] = !blocks[n];
                blocks[n + level.width] = !blocks[n + level.width];
                blocks[n - level.width] = !blocks[n - level.width];
                if (n % level.width != 0) blocks[n - 1] = !blocks[n - 1];
                if (n % level.width != level.width - 1) blocks[n + 1] = !blocks[n + 1];
            }

            for (var col = 1; col < 4; col++) {
                for (var row = 1; row < 4; row++) {

                    var s = new createjs.Shape();
                    var color: string;

                    if (blocks[col * level.width + row]) color = color1; else color = color2;

                    s.graphics.beginFill(color).drawRect(spacing * col - marginLeft, spacing * row - marginTop, size, size);
                    this.addChild(s);
                }
            }
        }

        //Adds Thumb Tag
        private addTags(level: Projects.Level) {
            
            //TODO: essas string devem estar em um enum
            if (level.type == "time" || level.type == "flip") {
                var tag = Assets.getImage("workshop/" + assetname + level.type + assetSufix);
                this.addChild(tag);
                tag.regX = tag.regY = 100;
            }
        }

    }
}
