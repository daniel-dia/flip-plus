module FlipPlus.Menu {
    export class SoundMenu extends createjs.Container{
        // Constructor
        
        constructor() {
            super();

            this.createObjects();
        }

        private createObjects() {
            
            var sfxon: createjs.DisplayObject = new gameui.IconTextButton("botaofxon.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setSoundfX(0);
                sfxon.visible = false;
                sfxoff.visible = true;
            });
            var sfxoff: createjs.DisplayObject = new gameui.IconTextButton("botaofxoff.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setSoundfX(0);
                sfxoff.visible = false;
                sfxon.visible = true;
            });
            var muson: createjs.DisplayObject = new gameui.IconTextButton("botaomusicaon.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setMusic(0);
                muson.visible = false;
                musoff.visible = true;
            });
            var musoff: createjs.DisplayObject = new gameui.IconTextButton("botaomusicaoff.png", "", "", "", "botaosom.png", () => {
                FlipPlusGame.settings.setMusic(0);
                musoff.visible = false;
                muson.visible = true;
            });

            musoff.visible = FlipPlusGame.settings.getMusic() <=0;
            muson.visible =  FlipPlusGame.settings.getMusic()>0;
            sfxoff.visible = FlipPlusGame.settings.getSoundfx() <= 0;
            sfxon.visible =  FlipPlusGame.settings.getSoundfx()>0;

            //Add Sound Buttons
            var soundMenuOn: gameui.Grid = new gameui.Grid(2, 1, 600, 372, null, true);
            var soundMenuOff: gameui.Grid = new gameui.Grid(2, 1, 600, 372, null, true);
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
