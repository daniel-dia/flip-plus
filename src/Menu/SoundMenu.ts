module InvertCross.Menu {
    export class SoundMenu extends createjs.Container{
        // Constructor



        constructor() {
            super();

            this.createObjects();
        }

        private createObjects() {
            
            var sfxon: createjs.DisplayObject = new Gbase.UI.IconButton("botaofxon.png", "", "botaosom.png", () => {
                InvertCrossaGame.settings.setSoundfX(false);
                sfxon.visible = false;
                sfxoff.visible = true;
            });
            var sfxoff: createjs.DisplayObject = new Gbase.UI.IconButton("botaofxoff.png", "", "botaosom.png", () => {
                InvertCrossaGame.settings.setSoundfX(true);
                sfxoff.visible = false;
                sfxon.visible = true;
            });
            var muson: createjs.DisplayObject = new Gbase.UI.IconButton("botaomusicaon.png", "", "botaosom.png", () => {
                InvertCrossaGame.settings.setMusic(false);
                muson.visible = false;
                musoff.visible = true;
            });
            var musoff: createjs.DisplayObject = new Gbase.UI.IconButton("botaomusicaoff.png", "", "botaosom.png", () => {
                InvertCrossaGame.settings.setMusic(true);
                musoff.visible = false;
                muson.visible = true;
            });

            musoff.visible =   !InvertCrossaGame.settings.getMusic();
            muson.visible =     InvertCrossaGame.settings.getMusic();
            sfxoff.visible =   !InvertCrossaGame.settings.getSoundfx();
            sfxon.visible =     InvertCrossaGame.settings.getSoundfx();

            //Add Sound Buttons
            var soundMenuOn: Gbase.UI.Grid = new Gbase.UI.Grid(2, 1, 600, 372, null, true);
            var soundMenuOff: Gbase.UI.Grid = new Gbase.UI.Grid(2, 1, 600, 372, null, true);
            soundMenuOn.addObject(sfxon);
            soundMenuOn.addObject(muson);
            soundMenuOff.addObject(sfxoff);
            soundMenuOff.addObject(musoff);

            this.addChild(soundMenuOff);
            this.addChild(soundMenuOn);
            
            this.regX = 300;
            this.regY = 186;
        }
    }
}
