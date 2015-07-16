//module gameui {

//    // Class
//    export class WPAudioManager{

//        // #region sound
//        private static currentMusicName: string;
//        private static currentMusic: HTMLAudioElement;
//        private static musicVolue: number;
//        private static soundVolume: number;

//        private static limit = 3;
//        private static effects = [];
//        private static musicWatchdogInterval;

//        // set and get music volume
//        public static setMusicVolume(volume: number) {
//            if (this.currentMusic) this.currentMusic.volume = volume;
//            this.musicVolue = volume; 
//        }

//        public static setSoundVeolume(volume: number) { 
//            this.soundVolume = volume;
//        }

//        public static getMusicVolume(): number { return this.musicVolue; }

//        public static getSoundVolume(): number { return this.soundVolume; } 

//        // play a music
//        public static playMusic(name: string,volume:number=1) {
//            if (!name) {
//                this.stopCurrentMusic();
//                return;
//            }

//            if (this.currentMusicName != name) {
//                // if is there a music, then end it
//                if (this.currentMusic) this.removeAudio(this.currentMusic);

//                // create audio
//                var music = this.createAudioElement(name);
//                music.volume = this.getMusicVolume() * volume;
//                music.play();

//                // create loop for music
//                music.onended = function () { music.play() };

//                // create watchDogInterval for music accidentaly ended.
//                this.musicWatchdogInterval = setInterval(function () {
//                    if (music) try { music.play() } catch (e) { }
//                }, 100);

//                this.currentMusicName = name;
//                this.currentMusic = music
//            }
//        }

//        // play a sound
//        public static playSound(name: string, interrupt?: boolean, delay: number= 0, offset?: number, loop?: number, volume: number= 1): HTMLAudioElement {

//            if (this.getSoundVolume() * volume == 0) return;

//            // create HTML Audio Tag
//            var sfx = this.createAudioElement(name);
//            sfx.volume = this.getSoundVolume() * volume;

//            // add to the effects list
//            this.effects.push(sfx);

//            //removes sound greater than device limit
//            while (this.effects.length >= this.limit)
//                this.removeAudio(this.effects[0]);

//            //remove sound when it ends.
//            sfx.onended = function () {
//                WPAudioManager.removeAudio(sfx);
//            }

//            // play the sound
//            try { sfx.play(); } catch (e) { }

//            return sfx;
        
//        }
        
//        // stops currentMusic
//        private static stopCurrentMusic() {
//            if (!this.currentMusic) return;
//            clearInterval(this.musicWatchdogInterval);
//            this.removeAudio(this.currentMusic);
//        }
          
//        // create audio Element
//        private static createAudioElement(src) {
//            var audio = new Audio();
//            //audio.msAudioCategory = 2
//            audio.src = "assets/sounds/" + src + ".mp3";
//            return audio;
//        }
        
//        // remove sound from the device
//        private static removeAudio(audio) {
//            if (!audio) return;
//            audio.pause();
//            audio.src = null;

//            // if the sound is on list, remove it
//            if (this.effects.indexOf(audio) >= 0)
//                this.effects.splice(this.effects.indexOf(audio), 1);

//            // delete variable
//            delete audio;
//        }
//    }
//}

//gameui.AudiosManager  = <any>gameui.WPAudioManager;