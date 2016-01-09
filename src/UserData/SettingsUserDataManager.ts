module FlipPlus.UserData {

    // Class
    export class SettingsUserDataManager {

        private soundFX: number = 1;
        private music: number = 1;

        constructor() {
            this.soundFX =  parseInt(localStorage.getItem("sfx"));
            this.music = parseInt(localStorage.getItem("mus"));
            if (isNaN(this.soundFX)) this.soundFX = 1;
            if (isNaN(this.music)) this.music = 1;
        }
        
        public getMusic(): number {  return this.music; }
        public getSoundfx(): number{ return this.soundFX; }

        public setSoundfX(value: number) {
            localStorage.setItem("sfx", value.toString());
            this.soundFX = value;
            
        }

        public setMusic(value: number) {
            localStorage.setItem("mus", value.toString());
            this.music = value;
        }
    }
}




