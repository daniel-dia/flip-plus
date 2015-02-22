module FlipPlus.Menu.View {

    export class LevelThumb2 extends LevelThumb {

    
        // Constructor
        constructor(level: FlipPlus.Projects.Level) {
            super(level);
            this.mouseEnabled = false;
            this.updateUserData();
     
        }
        protected createBackgroud(level: Projects.Level, assetName, assetSufix): createjs.DisplayObject {

            var sbg = new createjs.Bitmap("assets/images_1x/workshop/" + assetName + assetSufix + ".png");
            sbg.image.onload = () => { this.getStage().update() }
            if (this.getStage()) this.getStage().update();
            sbg.regX = sbg.regY = 98;
            return sbg;
        }

        protected createTags(level: Projects.Level, assetName, assetSufix): createjs.DisplayObject {
            //TODO: essas string devem estar em um enum
            if (level.type == "time" || level.type == "flip" || level.type == "moves") {
                var tag = new createjs.Bitmap("assets/images_1x/workshop/" + assetName + (level.type == "moves" ? "flip" : level.type) + assetSufix + ".png");
                tag.image.onload = () => { this.getStage().update() }
                if(this.getStage())this.getStage().update();
                tag.regX = tag.regY = 100;
                tag.scaleX = tag.scaleY = 0.5
                tag.x = tag.y = 70;
                return tag;
            }
        }

        protected createThumbs(level: FlipPlus.Projects.Level) {

            this.removeAllChildren();

            var color1: string;
            var color2: string;
            var assetSufix: string;

            var assetName = this.defineAssetName(level);

            var thumbContainer: createjs.Container = new createjs.Container();
            this.addChild(thumbContainer);

            assetSufix = "3";
            color1 = "rgba(255,255,255,0.9)";
            color2 = "rgba(0,0,0,0.3)";
            this.setSound(null);
            
            //Adds Thumb Backgroud
            thumbContainer.addChild(this.createBackgroud(level, assetName, assetSufix));

            //Adds Thumb Blocks
            thumbContainer.addChild(this.createBlocks(level, color1, color2));

            //Adds thumb tags
            thumbContainer.addChild(this.createTags(level, assetName, assetSufix));

        }
    }
}
