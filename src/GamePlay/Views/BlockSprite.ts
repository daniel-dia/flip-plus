declare var blockIn;
declare var blockOut;

module InvertCross.GamePlay.Views {
    export class BlockSprite extends createjs.Container{

        public static defaultBlockSize: number = 187;

        //---------------------------------------------------

        private container: createjs.Container;
        private stateImage: createjs.DisplayObject;
        
        //block state
        private state: string;

        //images assets
        private assetsImages:any[][] = [];

        //hint image
        private hintimage: createjs.DisplayObject;

        //block address
        public col;
        public row;

        //item state
        private hintEnalble = false;

        //block model
        private block: Model.Block;

        //draw mode
        private levelType: string;

        //tutorialHighlighted
        public tutorialHighLighted:boolean

        //Constructor
        constructor(col: number, row: number, theme: string, levelType: string) {
            super();
            
            this.levelType = levelType;
            this.col = col;
            this.row = row;

            //add Container for sprites
            this.container = new createjs.Container();
            this.container.regX = this.container.regY = BlockSprite.defaultBlockSize / 2;
            this.container.x = this.container.y = BlockSprite.defaultBlockSize / 2;
            this.addChild(this.container);

            //create hit area
            this.createHitArea();

            //Load assets based on the theme
            this.loadAssets(theme);

            //set position
            this.x = col * BlockSprite.defaultBlockSize;
            this.y = row * BlockSprite.defaultBlockSize;

            //set tutorial state
            this.tutorialHighLighted = false;
        }
        
        public enableHint() {
            this.hintEnalble = true;
            this.updateSprite();
        }

        public isHintEnabled(): boolean {
            return this.hintEnalble;
        }

        //create the hitArea
        private createHitArea() {
            var hit = new createjs.Shape();
            hit.graphics.beginFill("#000").drawRect(0, 0, BlockSprite.defaultBlockSize, BlockSprite.defaultBlockSize );
            this.hitArea = hit;
        }

        //update the blockSprite based on the block information
        public updateSprite( block?: Model.Block) {

            if(block) this.block = block;

            if (!this.block) return;

            //shows or hide hint
            if (this.hintEnalble && this.block.inverted)
                this.hintimage.visible = true;
            else
                this.hintimage.visible = false;


            //calculate new state
            var newState: string = this.CalculateSpriteStatus(this.block.state, this.block.draw,this.levelType);

            //veifies if there was any change
            if (this.state == newState) return;

            //set this state
            var oldState = this.state;
            this.state = newState;

            //get state images
            var newStateImage: createjs.DisplayObject = this.getStateImage(newState);
            var oldStateImage: createjs.DisplayObject = this.stateImage;
            this.stateImage = newStateImage;

            //animate them
            if (newStateImage != null) {
                newStateImage.scaleY = 0;
                newStateImage.scaleX = 0;
                newStateImage.visible = true;
                createjs.Tween.removeTweens(newStateImage);
                createjs.Tween.get(newStateImage).wait(100).to({ scaleY: 1, scaleX: 1  }, 200, createjs.Ease.backOut);
            }

            if (oldStateImage != null) {
                createjs.Tween.removeTweens(oldStateImage);
                createjs.Tween.get(oldStateImage).to({ scaleY: 0, scaleX: 0 }, 100, createjs.Ease.cubicIn).call(() => { oldStateImage.visible = false; });
                oldStateImage.scaleY = 1;
                oldStateImage.scaleX = 1;
            }

        }
                  
        //calculate status baset on provided properties
        private CalculateSpriteStatus(inverted: boolean, draw: boolean, levelType?: string): string {
            if (!draw)
                if (inverted)
                    if (levelType == "draw") return "null"
                    else return "Inv";
                else
                    if (levelType == "draw") return "Inv"
                    else return "Nor";
            else
                if (!inverted) return "Nor"
                    else return "DNor";

            //return "Nor";
        }  
        
        //gets the current state image based on string
        private getStateImage(state: string): createjs.DisplayObject {
            if(state == undefined) return;
            var index = Math.floor(Math.random() * this.assetsImages[state].length)
            return this.assetsImages[state][index];
        }

        //Load assets and adds it to the container
        private loadAssets(theme: string) {



            //load tiles
            var manifest = [
                { name: "Nor", images: ["puzzle/tile_" + theme + "_1", "puzzle/tile_" + theme + "_2", "puzzle/tile_" + theme + "_3", "puzzle/tile_" + theme + "_4", ] },
                { name: "Inv", images:  ["puzzle/tilex"] },
                { name: "DNor", images: ["puzzle/tileD"] },
                { name: "DInv", images: ["puzzle/tilexD"] },
                { name: "null", images: ["puzzle/tile0"] },
            ];

            for (var state = 0; state < manifest.length; state++) {
                this.assetsImages[manifest[state].name] = [];

                for (var image = 0; image < manifest[state].images.length; image++) {
                    var img = this.loadAsset(manifest[state].images[image])
                    this.assetsImages[manifest[state].name].push(img);
                }
            }

            //load hint symbol
            this.hintimage = Assets.getBitmap("puzzle/icon_hint");
            this.container.addChild(this.hintimage);
            this.hintimage.visible = false;

        


        }
        
        //load a single asset and adds it to this
        private loadAsset(assetName: string): createjs.DisplayObject {
           
            var asset: createjs.DisplayObject = Assets.getBitmap(assetName);
            asset.name = assetName;
        
            this.container.addChild(asset);
            asset.visible = false;
            asset.regX = BlockSprite.defaultBlockSize / 2;
            asset.regY = BlockSprite.defaultBlockSize / 2;

            asset.x =  BlockSprite.defaultBlockSize / 2;
            asset.y =  BlockSprite.defaultBlockSize / 2;
           
            return asset;
        }

        // =================== Tutorial Lock ===============================================================

        public tutorialLock() {
            this.mouseEnabled = false;
            this.tutorialHighLighted = false;

            
        }

        public tutorialUnlock() {
            this.mouseEnabled = true;
            this.tutorialHighLighted = false;

        }


        public tutorialHighLight() {
            this.mouseEnabled = true;
            this.tutorialHighLighted = true;
        }

        public tutorialBlur() {
            this.mouseEnabled = true;
            this.tutorialHighLighted = false;
        }

        // =================== Animation ==========================================================

        public animatePreInvert() {
            
            createjs.Tween.get(this.container).to({ scaleX: 0.86, scaleY: 0.86 }, 200, createjs.Ease.backOut);
        }

        public animatePreInvertRelease() {
            
            createjs.Tween.removeTweens(this);
            this.container.scaleX = 0.8,
            this.container.scaleY = 0.8;
            createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.backOut);
        
        }

        public applyBounceEffect(delay:number) {
            createjs.Tween.get(this.container).wait(delay).to({ scaleX: 1.1, scaleY: 1.1 }, 60, createjs.Ease.linear).call(() => {
                createjs.Tween.get(this.container).to({ scaleX: 0.9, scaleY: 0.9 }, 60, createjs.Ease.linear).call(() => {
                    createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 60, createjs.Ease.linear)

                });
            });

        }

        public applyHideEffect(delay: number, hide=true) {
            createjs.Tween.get(this.container).wait(delay).to({ scaleX: 1.1, scaleY: 1.1 }, 60, createjs.Ease.linear).call(() => {
                if (this.state == "DNor" || hide==false)
                    createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1}, 60, createjs.Ease.linear)
                else
                    createjs.Tween.get(this.container).to({ alpha: 0 }, 60, createjs.Ease.linear)
            });
        }
    }
}