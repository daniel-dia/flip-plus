module FlipPlus.Menu.View {
    export class SoundMenu extends createjs.Container {
        
        private btMusOn: createjs.DisplayObject;
        private btMusOf: createjs.DisplayObject;
        private btSndOn: createjs.DisplayObject;
        private btSndOf: createjs.DisplayObject;
        
        constructor() {
            super();
             

            this.btMusOn = new gameui.IconButton("menu/icmusic", "menu/btmusicon", () => {
                gameui.AudiosManager.setMusicVolume(0);
                this.updateVolumeButtons()
                FlipPlus.FlipPlusGame.settings.setMusic(0)
            }).set({ x: -243.5 })

            this.btMusOf = new gameui.IconButton("menu/icmusic", "menu/btmusicoff", () => {
                gameui.AudiosManager.setMusicVolume(1);
                this.updateVolumeButtons()
                FlipPlus.FlipPlusGame.settings.setMusic(1)
            }).set({ x: -243.5 })

            this.btSndOn = new gameui.IconButton("menu/icsound", "menu/btmusicon", () => {
                gameui.AudiosManager.setSoundVolume(0);
                this.updateVolumeButtons()
                FlipPlus.FlipPlusGame.settings.setSoundfX(0)
            }).set({ x: 243.5 })

            this.btSndOf = new gameui.IconButton("menu/icsound", "menu/btmusicoff", () => {
                gameui.AudiosManager.setSoundVolume(1);
                this.updateVolumeButtons()
                FlipPlus.FlipPlusGame.settings.setSoundfX(1)
            }).set({ x: 243.5 })

            this.addChild(this.btMusOn);
            this.addChild(this.btMusOf);
            this.addChild(this.btSndOn);
            this.addChild(this.btSndOf);

            this.updateVolumeButtons();
             
        }
        
        private updateVolumeButtons() {
            this.btMusOn.visible = gameui.AudiosManager.getMusicVolume() == 1
            this.btMusOf.visible = gameui.AudiosManager.getMusicVolume() == 0
            this.btSndOn.visible = gameui.AudiosManager.getSoundVolume() == 1
            this.btSndOf.visible = gameui.AudiosManager.getSoundVolume() == 0
        }
    }

}
