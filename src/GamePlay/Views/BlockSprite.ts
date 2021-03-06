declare var blockIn;
declare var blockOut;

module FlipPlus.GamePlay.Views {
    export class BlockSprite extends PIXI.Container{

        public static defaultBlockSize: number = 187;
        
        //---------------------------------------------------

        private container: PIXI.Container;
        private stateImage: PIXI.DisplayObject;
        
        //block state
        private state: string;

        //images assets
        private assetsImages:any[][] = [];

        //hint image
        private hintimage: PIXI.DisplayObject;
        private mirrorImage : PIXI.DisplayObject;
        private memoryImage: PIXI.DisplayObject;
        
        //block address
        public col;
        public row;

        //item state
        private hintEnalble = false;

        //block model
        private block: Logic.Block;

        //draw mode
        private levelType: string;

        //tutorialHighlighted
        public tutorialHighLighted:boolean
        
        //highlight
        private highlight: PIXI.DisplayObject;

        public pressed: boolean;

        //Constructor
        constructor(col: number, row: number, theme: string, levelType?: string) {
            super();
            
            this.levelType = levelType;
            this.col = col;
            this.row = row;

            //load highlight
            this.highlight = gameui.AssetsManager.getBitmap("puzzle/highlight");
            this.addChild(this.highlight);
            this.highlight.x = -8;
            this.highlight.y = -8;
            this.highlight.scale.x = this.highlight.scale.y = 1.05;
            this.highlight.visible = false;


            //add Container for sprites
            this.container = new PIXI.Container();
            this.container.pivot.x = this.container.pivot.y = BlockSprite.defaultBlockSize / 2;
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

        public disableHint() {
            this.hintEnalble = false;
            this.updateSprite();
        }

        public isHintEnabled(): boolean {
            return this.hintEnalble;
        }

        //create the hitArea
        private createHitArea() {
            var hit = new PIXI.Graphics().beginFill(0).drawRect(0, 0, BlockSprite.defaultBlockSize, BlockSprite.defaultBlockSize);
            /// Check this.hitArea = hit;
        }

        //update the blockSprite based on the block information
        public updateSprite(block?: Logic.Block,delay?:number) {

            if(block) this.block = block;

            if (!this.block) return;

            //shows or hide hint
            if (this.hintEnalble && this.block.inverted) {
                //shows hint image
                if (!this.hintimage.visible){
                    this.hintimage.visible = true;
                    //animate it
                    createjs.Tween.get(this.hintimage).to({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticOut);            }
                }
            else
                this.hintimage.visible = false;

            //show mirrored
            this.mirrorImage.visible = this.block.mirror;

            //show hidden
            this.memoryImage.visible = this.block.hidden;


            //calculate new state
            var newState: string = this.CalculateSpriteStatus(this.block.state, this.block.draw,this.levelType);

            //veifies if there was any change
            if (this.state == newState) return;

            //set this state
            var oldState = this.state;
            this.state = newState;

            //get state images
            var newStateImage: PIXI.DisplayObject = this.getStateImage(newState);
            var oldStateImage: PIXI.DisplayObject = this.stateImage;
            this.stateImage = newStateImage;

            var time = 150;

            // shame
            if (delay == null) delay = Math.random()*5;
            

            //animate them
            if (newStateImage != null) {
                newStateImage.scale.y = 0;
                newStateImage.scale.x = 1;
                newStateImage.visible = true;
                createjs.Tween.removeTweens(newStateImage);
                createjs.Tween.get(newStateImage).wait(delay * 50).wait(time).to({ scaleY: 1, scaleX: 1 }, time , createjs.Ease.backOut);
            }

            if (oldStateImage != null) {
                createjs.Tween.removeTweens(oldStateImage);
                createjs.Tween.get(oldStateImage).wait(delay * 50).to({ scaleY: 0, scaleX: 1 }, time , createjs.Ease.cubicIn).call(() => {
                    oldStateImage.visible = false;
                });
                oldStateImage.scale.y = 1;
                oldStateImage.scale.x = 1;
            }

        }
                  
        //calculate status baset on provided properties
        private CalculateSpriteStatus(inverted: boolean, draw: boolean, levelType?: string): string {
            if (!draw)
                if (inverted)
                    if (levelType == "draw") return "null"
                    else return "Inv";
                else
                    if (levelType == "draw") return "DInv"
                    else return "Nor";
            else
                if (!inverted) return "Nor"
                    else return "DNor";

            //return "Nor";
        }  
        
        //gets the current state image based on string
        private getStateImage(state: string): PIXI.DisplayObject {
            if(state == undefined) return;
            var index = Math.floor(Math.random() * this.assetsImages[state].length)
            return this.assetsImages[state][index];
        }

        //Load assets and adds it to the container
        private loadAssets(theme: string) {

            //load tiles
            var manifest = [
                { name: "Nor", images: ["puzzle/tile_" + theme + "_1", "puzzle/tile_" + theme + "_2", "puzzle/tile_" + theme + "_3", "puzzle/tile_" + theme + "_4", ] },
                { name: "Inv", images: ["puzzle/tilex"] },
                { name: "DInv", images: ["puzzle/tileDgray"] },
                { name: "DNor", images: ["puzzle/tileD"+theme] },
                //{ name: "DInv", images: ["puzzle/tilexD"] },
                { name: "null", images: ["puzzle/tile0"] },
            ];

            for (var state = 0; state < manifest.length; state++) {
                this.assetsImages[manifest[state].name] = [];

                for (var image = 0; image < manifest[state].images.length; image++) {
                    var img = this.loadAsset(manifest[state].images[image])
                    if (manifest[state].images[image][0] == 'D') img.scale.x = img.scale.y = 1.3;
                    this.assetsImages[manifest[state].name].push(img);
                }
            }

            //Modificators

            //load hint symbol
            this.hintimage = gameui.AssetsManager.getBitmap("puzzle/icon_hint");
            this.container.addChild(this.hintimage);
            this.hintimage.pivot.x = 139/2;
            this.hintimage.pivot.y = 148/2;
            this.hintimage.x = this.hintimage.y = 90;
            this.hintimage.visible = false;

            //load nurrir modificator tile
            this.mirrorImage = gameui.AssetsManager.getBitmap("puzzle/tilemirror");
            this.container.addChild(this.mirrorImage);
            this.mirrorImage.visible = false;
            this.mirrorImage.x = this.mirrorImage.y = - 12;

            //load memoryModificator tile
            this.memoryImage = gameui.AssetsManager.getBitmap("puzzle/tilememory");
            this.container.addChild(this.memoryImage);
            this.memoryImage.visible = false;
            this.memoryImage.alpha = 0;
            this.memoryImage.scale.x = this.memoryImage.scale.y = 1.1;
            this.memoryImage.x = this.memoryImage.y = -BlockSprite.defaultBlockSize * 0.05;
            createjs.Tween.get(this.memoryImage)
                .to({ alpha: 1 }).wait(500)
                .to({ alpha: 0 }).wait(500)
                .to({ alpha: 1 }).wait(500)
                .to({ alpha: 0 }).wait(500)
                .to({ alpha: 1 }).wait(500)
                .to({ alpha: 0 }).wait(500)
                .to({ alpha: 1 }).wait(250)
                .to({ alpha: 0 }).wait(250)
                .to({ alpha: 1 }).wait(250)
                .to({ alpha: 0 }).wait(250)
                .to({ alpha: 1 })
        }

        public reveal() {
            this.memoryImage.alpha = 0;
        }

        //load a single asset and adds it to this
        private loadAsset(assetName: string): PIXI.DisplayObject {
           
            var asset: PIXI.DisplayObject = gameui.AssetsManager.getBitmap(assetName);
            asset.name = assetName;
        
            this.container.addChild(asset);
            asset.visible = false;
            asset.pivot.x = BlockSprite.defaultBlockSize / 2;
            asset.pivot.y = BlockSprite.defaultBlockSize / 2;

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
            createjs.Tween.removeTweens(this.highlight);
            createjs.Tween.removeTweens(this.container);

            this.highlight.visible = true;
            this.highlight.alpha = 0;
            createjs.Tween.get(this.highlight).to({ alpha: 1 }, 200, createjs.Ease.quadOut);
            createjs.Tween.get(this.container).to({ scaleX: 0.90, scaleY: 0.90 }, 200, createjs.Ease.quadOut);
        }

        public animatePreInvertRelease() {
            
            createjs.Tween.removeTweens(this.highlight);
            createjs.Tween.removeTweens(this.container);
            this.container.scale.x = 0.8,
            this.container.scale.y = 0.8;
            createjs.Tween.removeTweens(this.highlight);
            createjs.Tween.get(this.highlight).to({ alpha: 0 }, 400, createjs.Ease.backOut).call(() => {this.highlight.visible=false });
            createjs.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 400, createjs.Ease.backOut);
        
        }

        public applyBounceEffect(delay: number) {

            createjs.Tween.removeTweens(this.container);
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

