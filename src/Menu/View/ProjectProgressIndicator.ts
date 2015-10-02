module FlipPlus.Menu.View {

    //View
    export class ProjectProgressIndicator extends PIXI.Container {

        private progressBar: PIXI.DisplayObject;

        constructor() {
            super();

            this.createObjects();

        }

        //create objects
        private createObjects() {
            var bg: PIXI.Graphics = new PIXI.Graphics();
            bg.beginFill(0xFFAA00).drawRect(0, 0, 400, 150);
            this.addChild(bg);

            var pbarbg: PIXI.Graphics = new PIXI.Graphics();
            pbarbg.beginFill(0x662200).drawRect(50, 50, 300, 50);
            this.addChild(pbarbg);

            var pbar: PIXI.Graphics = new PIXI.Graphics();
            pbar.beginFill(0xFFFF00).drawRect(50, 50, 300, 50);
            this.addChild(pbar);
            this.progressBar = pbar;

        }



        // update object based on its info
        public updateProjectInfo(progress: number) {
            if (progress > 1) progress = 1;
            if (progress < 0) progress = 0;

            if (progress == undefined) progress = 0;
            this.progressBar.scale.x = progress;

        }
    }
}
