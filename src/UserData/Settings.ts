module InvertCross.UserData {

    // Class
    export class Settings {

        private soundFX: boolean = true;
        private music: boolean = true;

        constructor() {
           
            this.soundFX = (localStorage.getItem("sfx") != "false");
            this.music = (localStorage.getItem("mus") != "false");
        }
        
        public getMusic(): boolean { return this.music; }
        public getSoundfx(): boolean { return this.soundFX; }

        public setSoundfX(value: boolean) {
            localStorage.setItem("sfx", ""+value);
            this.soundFX = value;
            
        }

        public setMusic(value: boolean) {
            localStorage.setItem("mus", "" +value);
            this.music = value;
            if (!value)
                InvertCrossaGame.assetsManager.stopMusic();
            else
                InvertCrossaGame.assetsManager.playMusic("");
        }
    }
}




