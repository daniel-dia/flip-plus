module FlipPlus.Menu {
    export class SoundMenu extends createjs.Container{
        // Constructor



        constructor() {
            super();

            this.createObjects();
        }

        private createObjects() {
            
            var sfxon: createjs.DisplayObject = new gameui.ui.IconButton("botaofxon.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setSoundfX(false);
                sfxon.visible = false;
                sfxoff.visible = true;
            });
            var sfxoff: createjs.DisplayObject = new gameui.ui.IconButton("botaofxoff.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setSoundfX(true);
                sfxoff.visible = false;
                sfxon.visible = true;
            });
            var muson: createjs.DisplayObject = new gameui.ui.IconButton("botaomusicaon.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setMusic(false);
                muson.visible = false;
                musoff.visible = true;
            });
            var musoff: createjs.DisplayObject = new gameui.ui.IconButton("botaomusicaoff.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setMusic(true);
                musoff.visible = false;
                muson.visible = true;
            });

            musoff.visible =   !FlipPlusGame.settings.getMusic();
            muson.visible =     FlipPlusGame.settings.getMusic();
            sfxoff.visible =   !FlipPlusGame.settings.getSoundfx();
            sfxon.visible =     FlipPlusGame.settings.getSoundfx();

            //Add Sound Buttons
            var soundMenuOn: gameui.ui.Grid = new gameui.ui.Grid(2, 1, 600, 372, null, true);
            var soundMenuOff: gameui.ui.Grid = new gameui.ui.Grid(2, 1, 600, 372, null, true);
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
