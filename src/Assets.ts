/// <reference path="../lib/easeljs.d.ts" />
/// <reference path="../lib/soundjs.d.ts" /> 
 
/// <reference path="userdata/storydata.ts" />


declare var images: any;
declare var Media: any;
declare var assetscale: number;

module InvertCross {



    // Class
    export class Assets {

        ///TODO USAR ISSO
        ///http://www.createjs.com/tutorials/SoundJS%20and%20PreloadJS/

        private static loader: createjs.LoadQueue;

        public static loadAssets(): createjs.LoadQueue {

            if (!assetscale) assetscale = 0.5;

            var imagePath = "assets/images_" + assetscale + "x/";
            var audioPath = "assets/sound/";

            var manifest = [

                //common
                { id: "partshud", src: imagePath + "partshud.png" },
                { id: "partsicon", src: imagePath + "partsicon.png" },
                { id: "starsicon", src: imagePath + "starsicon.png" },
                { id: "MenuBt", src: imagePath + "MenuBt.png" },
                { id: "BackBt", src: imagePath + "BackBt.png" },

                //title
                //{ id: "title/LogoScreen", src: imagePath + "title/LogoScreen.jpg" },
                { src: imagePath + "logo/bandeira1.png", id: "bandeira1" },
                { src: imagePath + "logo/bandeira2.png", id: "bandeira2" },
                { src: imagePath + "logo/bandeira3.png", id: "bandeira3" },
                { src: imagePath + "logo/Cenario.jpg", id: "Cenario" },
                { src: imagePath + "logo/Cenário.jpg", id: "Cenário" },
                { src: imagePath + "logo/coqueiro02.png", id: "coqueiro02" },
                { src: imagePath + "logo/coqueiro1.png", id: "coqueiro1" },
                { src: imagePath + "logo/coqueiro2.png", id: "coqueiro2" },
                { src: imagePath + "logo/logo.png", id: "logo" },
                { src: imagePath + "logo/matoareia.png", id: "matoareia" },
                { src: imagePath + "logo/onda01.png", id: "onda01" },
                { src: imagePath + "logo/onda02.png", id: "onda02" },
                { src: imagePath + "logo/onda04.png", id: "onda04" },
                { src: imagePath + "logo/vagalume.png", id: "vagalume" },


                //intro
                { src: imagePath + "intro/bot.png", id: "bot" },
                { src: imagePath + "intro/Bot01.png", id: "Bot01" },
                { src: imagePath + "intro/botLight.png", id: "botLight" },
                { src: imagePath + "intro/fundoEscuro.jpg", id: "fundoEscuro" },

                //projects
                { id: "projects/bgprojects", src: imagePath + "projects/bgprojects.jpg" },
                { id: "projects/slot1", src: imagePath + "projects/slot1.png" },
                { id: "projects/slot2", src: imagePath + "projects/slot2.png" },
                { id: "projects/slot3", src: imagePath + "projects/slot3.png" },
                { id: "projects/slot0", src: imagePath + "projects/slot0.png" },
                { id: "projects/slotl", src: imagePath + "projects/slotl.png" },
                { id: "projects/star", src: imagePath + "projects/star.png" },
                { id: "projects/pageon", src: imagePath + "projects/pageon.png" },
                { id: "projects/pageoff", src: imagePath + "projects/pageoff.png" },
                { id: "projects/bigslot1", src: imagePath + "projects/bigslot1.png" },
                      

                //projects
                { id: "projects/bots/Bot01", src: imagePath + "projects/bots/bot1.png" },
                { id: "projects/bots/Bot10", src: imagePath + "projects/bots/bot10.png" },
                { id: "projects/bots/Bot11", src: imagePath + "projects/bots/bot11.png" },
                { id: "projects/bots/Bot12", src: imagePath + "projects/bots/bot12.png" },
                { id: "projects/bots/Bot13", src: imagePath + "projects/bots/bot13.png" },
                { id: "projects/bots/Bot14", src: imagePath + "projects/bots/bot14.png" },
                { id: "projects/bots/Bot15", src: imagePath + "projects/bots/bot15.png" },
                { id: "projects/bots/Bot16", src: imagePath + "projects/bots/bot16.png" },
                { id: "projects/bots/Bot17", src: imagePath + "projects/bots/bot17.png" },
                { id: "projects/bots/Bot18", src: imagePath + "projects/bots/bot18.png" },
                { id: "projects/bots/Bot02", src: imagePath + "projects/bots/bot2.png" },
                { id: "projects/bots/Bot03", src: imagePath + "projects/bots/bot3.png" },
                { id: "projects/bots/Bot04", src: imagePath + "projects/bots/bot4.png" },
                { id: "projects/bots/Bot05", src: imagePath + "projects/bots/bot5.png" },
                { id: "projects/bots/Bot06", src: imagePath + "projects/bots/bot6.png" },
                { id: "projects/bots/Bot07", src: imagePath + "projects/bots/bot7.png" },
                { id: "projects/bots/Bot08", src: imagePath + "projects/bots/bot8.png" },
                { id: "projects/bots/Bot09", src: imagePath + "projects/bots/bot9.png" },
                { id: "projects/bots/shadowBot01", src: imagePath + "projects/bots/botshadow1.png" },
                { id: "projects/bots/shadowBot10", src: imagePath + "projects/bots/botshadow10.png" },
                { id: "projects/bots/shadowBot11", src: imagePath + "projects/bots/botshadow11.png" },
                { id: "projects/bots/shadowBot12", src: imagePath + "projects/bots/botshadow12.png" },
                { id: "projects/bots/shadowBot13", src: imagePath + "projects/bots/botshadow13.png" },
                { id: "projects/bots/shadowBot14", src: imagePath + "projects/bots/botshadow14.png" },
                { id: "projects/bots/shadowBot15", src: imagePath + "projects/bots/botshadow15.png" },
                { id: "projects/bots/shadowBot16", src: imagePath + "projects/bots/botshadow16.png" },
                { id: "projects/bots/shadowBot17", src: imagePath + "projects/bots/botshadow17.png" },
                { id: "projects/bots/shadowBot18", src: imagePath + "projects/bots/botshadow18.png" },
                { id: "projects/bots/shadowBot02", src: imagePath + "projects/bots/botshadow2.png" },
                { id: "projects/bots/shadowBot03", src: imagePath + "projects/bots/botshadow3.png" },
                { id: "projects/bots/shadowBot04", src: imagePath + "projects/bots/botshadow4.png" },
                { id: "projects/bots/shadowBot05", src: imagePath + "projects/bots/botshadow5.png" },
                { id: "projects/bots/shadowBot06", src: imagePath + "projects/bots/botshadow6.png" },
                { id: "projects/bots/shadowBot07", src: imagePath + "projects/bots/botshadow7.png" },
                { id: "projects/bots/shadowBot08", src: imagePath + "projects/bots/botshadow8.png" },
                { id: "projects/bots/shadowBot09", src: imagePath + "projects/bots/botshadow9.png" },

                //workshop
                { src: imagePath + "myBots/Bot01.png", id: "myBots/Bot01" },
                { src: imagePath + "myBots/Bot01_fill.png", id: "myBots/Bot01_fill" },
                { src: imagePath + "myBots/Bot01_stroke.png", id: "myBots/Bot01_stroke" },
                { src: imagePath + "myBots/Bot02.png", id: "myBots/Bot02" },
                { src: imagePath + "myBots/Bot02_fill.png", id: "myBots/Bot02_fill" },
                { src: imagePath + "myBots/Bot02_stroke.png", id: "myBots/Bot02_stroke" },
                { src: imagePath + "myBots/Bot03.png", id: "myBots/Bot03" },
                { src: imagePath + "myBots/Bot03_fill.png", id: "myBots/Bot03_fill" },
                { src: imagePath + "myBots/Bot03_stroke.png", id: "myBots/Bot03_stroke" },
                { src: imagePath + "myBots/Bot04.png", id: "myBots/Bot04" },
                { src: imagePath + "myBots/Bot04_fill.png", id: "myBots/Bot04_fill" },
                { src: imagePath + "myBots/Bot04_stroke.png", id: "myBots/Bot04_stroke" },
                { src: imagePath + "myBots/Bot05.png", id: "myBots/Bot05" },
                { src: imagePath + "myBots/Bot05_fill.png", id: "myBots/Bot05_fill" },
                { src: imagePath + "myBots/Bot05_stroke.png", id: "myBots/Bot05_stroke" },
                { src: imagePath + "myBots/Bot06.png", id: "myBots/Bot06" },
                { src: imagePath + "myBots/Bot06_fill.png", id: "myBots/Bot06_fill" },
                { src: imagePath + "myBots/Bot06_stroke.png", id: "myBots/Bot06_stroke" },
                { src: imagePath + "myBots/Bot07.png", id: "myBots/Bot07" },
                { src: imagePath + "myBots/Bot07_fill.png", id: "myBots/Bot07_fill" },
                { src: imagePath + "myBots/Bot07_stroke.png", id: "myBots/Bot07_stroke" },
                { src: imagePath + "myBots/Bot08.png", id: "myBots/Bot08" },
                { src: imagePath + "myBots/Bot08_fill.png", id: "myBots/Bot08_fill" },
                { src: imagePath + "myBots/Bot08_stroke.png", id: "myBots/Bot08_stroke" },
                { src: imagePath + "myBots/Bot09.png", id: "myBots/Bot09" },
                { src: imagePath + "myBots/Bot09_fill.png", id: "myBots/Bot09_fill" },
                { src: imagePath + "myBots/Bot09_stroke.png", id: "myBots/Bot09_stroke" },
                { src: imagePath + "myBots/Bot10.png", id: "myBots/Bot10" },
                { src: imagePath + "myBots/Bot10_fill.png", id: "myBots/Bot10_fill" },
                { src: imagePath + "myBots/Bot10_stroke.png", id: "myBots/Bot10_stroke" },
                { src: imagePath + "myBots/Bot11.png", id: "myBots/Bot11" },
                { src: imagePath + "myBots/Bot10_fill.png", id: "myBots/Bot11_fill" },
                { src: imagePath + "myBots/Bot10_stroke.png", id: "myBots/Bot11_stroke" },
                { src: imagePath + "myBots/Bot12.png", id: "myBots/Bot12" },
                { src: imagePath + "myBots/Bot10_fill.png", id: "myBots/Bot12_fill" },
                { src: imagePath + "myBots/Bot10_stroke.png", id: "myBots/Bot12_stroke" },
                { src: imagePath + "myBots/Bot13.png", id: "myBots/Bot13" },
                { src: imagePath + "myBots/Bot13_fill.png", id: "myBots/Bot13_fill" },
                { src: imagePath + "myBots/Bot13_stroke.png", id: "myBots/Bot13_stroke" },
                { src: imagePath + "myBots/Bot14.png", id: "myBots/Bot14" },
                { src: imagePath + "myBots/Bot14_fill.png", id: "myBots/Bot14_fill" },
                { src: imagePath + "myBots/Bot14_stroke.png", id: "myBots/Bot14_stroke" },
                { src: imagePath + "myBots/Bot15.png", id: "myBots/Bot15" },
                { src: imagePath + "myBots/Bot15_fill.png", id: "myBots/Bot15_fill" },
                { src: imagePath + "myBots/Bot15_stroke.png", id: "myBots/Bot15_stroke" },
                { src: imagePath + "myBots/Bot16.png", id: "myBots/Bot16" },
                { src: imagePath + "myBots/Bot16_fill.png", id: "myBots/Bot16_fill" },
                { src: imagePath + "myBots/Bot16_stroke.png", id: "myBots/Bot16_stroke" },
                { src: imagePath + "myBots/Bot17.png", id: "myBots/Bot17" },
                { src: imagePath + "myBots/Bot17_fill.png", id: "myBots/Bot17_fill" },
                { src: imagePath + "myBots/Bot17_stroke.png", id: "myBots/Bot17_stroke" },
                { src: imagePath + "myBots/Bot18.png", id: "myBots/Bot18" },
                { src: imagePath + "myBots/Bot18_fill.png", id: "myBots/Bot18_fill" },
                { src: imagePath + "myBots/Bot18_stroke.png", id: "myBots/Bot18_stroke" },

                //bots
                { src: imagePath + "mybots/mybotsbg.jpg", id: "mybotsbg" },
                { src: imagePath + "mybots/Bot01.png", id: "Bot01" },
                { src: imagePath + "mybots/Bot02.png", id: "Bot02" },
                { src: imagePath + "mybots/Bot03.png", id: "Bot03" },
                { src: imagePath + "mybots/Bot04.png", id: "Bot04" },
                { src: imagePath + "mybots/Bot05.png", id: "Bot05" },
                { src: imagePath + "mybots/Bot06.png", id: "Bot06" },
                { src: imagePath + "mybots/Bot07.png", id: "Bot07" },
                { src: imagePath + "mybots/Bot08.png", id: "Bot08" },
                { src: imagePath + "mybots/Bot09.png", id: "Bot09" },
                { src: imagePath + "mybots/Bot10.png", id: "Bot10" },
                { src: imagePath + "mybots/Bot11.png", id: "Bot11" },
                { src: imagePath + "mybots/Bot12.png", id: "Bot12" },
                { src: imagePath + "mybots/Bot13.png", id: "Bot13" },
                { src: imagePath + "mybots/Bot14.png", id: "Bot14" },
                { src: imagePath + "mybots/Bot15.png", id: "Bot15" },
                { src: imagePath + "mybots/Bot16.png", id: "Bot16" },
                { src: imagePath + "mybots/Bot17.png", id: "Bot17" },
                { src: imagePath + "mybots/Bot18.png", id: "Bot18" },

                //workshow
                { id: "workshop/basefases", src: imagePath + "workshop/basefases.png" },
                { id: "workshop/bgworkshop", src: imagePath + "workshop/bgworkshop.png" },
                { id: "workshop/estrelaworkshop", src: imagePath + "workshop/estrelaworkshop.png" },
                { id: "workshop/faseamarela1", src: imagePath + "workshop/faseamarela1.png" },
                { id: "workshop/faseamarela2", src: imagePath + "workshop/faseamarela2.png" },
                { id: "workshop/faseamarela3", src: imagePath + "workshop/faseamarela3.png" },
                { id: "workshop/faseamarelaflip1", src: imagePath + "workshop/faseamarelaflip1.png" },
                { id: "workshop/faseamarelaflip2", src: imagePath + "workshop/faseamarelaflip2.png" },
                { id: "workshop/faseamarelaflip3", src: imagePath + "workshop/faseamarelaflip3.png" },
                { id: "workshop/faseamarelatime1", src: imagePath + "workshop/faseamarelatime1.png" },
                { id: "workshop/faseamarelatime2", src: imagePath + "workshop/faseamarelatime2.png" },
                { id: "workshop/faseamarelatime3", src: imagePath + "workshop/faseamarelatime3.png" },
                { id: "workshop/faseroxa1", src: imagePath + "workshop/faseroxa1.png" },
                { id: "workshop/faseroxa2", src: imagePath + "workshop/faseroxa2.png" },
                { id: "workshop/faseroxa3", src: imagePath + "workshop/faseroxa3.png" },
                { id: "workshop/faseroxaflip1", src: imagePath + "workshop/faseroxaflip1.png" },
                { id: "workshop/faseroxaflip2", src: imagePath + "workshop/faseroxaflip2.png" },
                { id: "workshop/faseroxaflip3", src: imagePath + "workshop/faseroxaflip3.png" },
                { id: "workshop/faseroxatime1", src: imagePath + "workshop/faseroxatime1.png" },
                { id: "workshop/faseroxatime2", src: imagePath + "workshop/faseroxatime2.png" },
                { id: "workshop/faseroxatime3", src: imagePath + "workshop/faseroxatime3.png" },
                { id: "workshop/faseverde1", src: imagePath + "workshop/faseverde1.png" },
                { id: "workshop/faseverde2", src: imagePath + "workshop/faseverde2.png" },
                { id: "workshop/faseverde3", src: imagePath + "workshop/faseverde3.png" },
                { id: "workshop/faseverdeflip1", src: imagePath + "workshop/faseverdeflip1.png" },
                { id: "workshop/faseverdeflip2", src: imagePath + "workshop/faseverdeflip2.png" },
                { id: "workshop/faseverdeflip3", src: imagePath + "workshop/faseverdeflip3.png" },
                { id: "workshop/faseverdetime1", src: imagePath + "workshop/faseverdetime1.png" },
                { id: "workshop/faseverdetime2", src: imagePath + "workshop/faseverdetime2.png" },
                { id: "workshop/faseverdetime3", src: imagePath + "workshop/faseverdetime3.png" },
                { id: "workshop/iconeskip", src: imagePath + "workshop/iconeskip.png" },
                { id: "workshop/paginacaoworkshop", src: imagePath + "workshop/paginacaoworkshop.png" },
                { id: "workshop/painelworkshop", src: imagePath + "workshop/painelworkshop.png" },
                { id: "workshop/skip", src: imagePath + "workshop/skip.png" },
                { id: "workshop/stargreen", src: imagePath + "workshop/stargreen.png" },
                { id: "workshop/starpurple", src: imagePath + "workshop/starpurple.png" },
                { id: "workshop/staryellow", src: imagePath + "workshop/staryellow.png" },
                             
                //puzzle
                { id: "puzzle/bg", src: imagePath + "puzzle/bg.jpg" },
                { id: "puzzle/btplay1", src: imagePath + "puzzle/btplay1.png" },
                { id: "puzzle/btplay2", src: imagePath + "puzzle/btplay2.png" },
                { id: "puzzle/btplay3", src: imagePath + "puzzle/btplay3.png" },
                { id: "puzzle/btpowerup", src: imagePath + "puzzle/btpowerup.png" },
                { id: "puzzle/btrestartpause", src: imagePath + "puzzle/btrestartpause.png" },
                { id: "puzzle/btsair", src: imagePath + "puzzle/btsair.png" },
                { id: "puzzle/btsom1", src: imagePath + "puzzle/btsom1.png" },
                { id: "puzzle/btsom2", src: imagePath + "puzzle/btsom2.png" },
                { id: "puzzle/iconehint", src: imagePath + "puzzle/iconehint.png" },
                { id: "puzzle/iconemoves", src: imagePath + "puzzle/iconemoves.png" },
                { id: "puzzle/iconepause", src: imagePath + "puzzle/iconepause.png" },
                { id: "puzzle/iconeplay", src: imagePath + "puzzle/iconeplay.png" },
                { id: "puzzle/iconepuzzle", src: imagePath + "puzzle/iconepuzzle.png" },
                { id: "puzzle/iconerestart", src: imagePath + "puzzle/iconerestart.png" },
                { id: "puzzle/iconeskip", src: imagePath + "puzzle/iconeskip.png" },
                { id: "puzzle/iconetime", src: imagePath + "puzzle/iconetime.png" },
                { id: "puzzle/paginacaopuzzle", src: imagePath + "puzzle/paginacaopuzzle.png" },
                { id: "puzzle/painelpuzzle1", src: imagePath + "puzzle/painelpuzzle1.png" },
                { id: "puzzle/painelpuzzle2", src: imagePath + "puzzle/painelpuzzle2.png" },
                { id: "puzzle/tile0", src: imagePath + "puzzle/tile0.png" },
                { id: "puzzle/indicator", src: imagePath + "puzzle/indicator.png" },

                { id: "puzzle/tile_yellow_1", src: imagePath + "puzzle/tile_yellow_1.png" },
                { id: "puzzle/tile_yellow_2", src: imagePath + "puzzle/tile_yellow_2.png" },
                { id: "puzzle/tile_yellow_3", src: imagePath + "puzzle/tile_yellow_3.png" },
                { id: "puzzle/tile_yellow_4", src: imagePath + "puzzle/tile_yellow_4.png" },

                { id: "puzzle/tile_green_1", src: imagePath + "puzzle/tile_green_1.png" },
                { id: "puzzle/tile_green_2", src: imagePath + "puzzle/tile_green_2.png" },
                { id: "puzzle/tile_green_3", src: imagePath + "puzzle/tile_green_3.png" },
                { id: "puzzle/tile_green_4", src: imagePath + "puzzle/tile_green_4.png" },

                { id: "puzzle/tile_purple_1", src: imagePath + "puzzle/tile_purple_1.png" },
                { id: "puzzle/tile_purple_2", src: imagePath + "puzzle/tile_purple_2.png" },
                { id: "puzzle/tile_purple_3", src: imagePath + "puzzle/tile_purple_3.png" },
                { id: "puzzle/tile_purple_4", src: imagePath + "puzzle/tile_purple_4.png" },
                { id: "puzzle/tilex", src: imagePath + "puzzle/tilex.png" },

                //popup
                { id: "popups/popup", src: imagePath + "popups/popup.png" },
                { id: "popups/message", src: imagePath + "popups/message.png" },
                { id: "popups/popupTutorial", src: imagePath + "popups/popupbot.png" },

                //Legacy
                { id: "bolinhas", src: "assets/" + "bolinhas.png" },
                { id: "smokePart", src: "assets/" + "smokePart.png" },
                
                //slides
                { src: imagePath + "slides/sl1.jpg", id: "sl1" },
                { src: imagePath + "slides/sl2.jpg", id: "sl2" },
                { src: imagePath + "slides/sl3.jpg", id: "sl3" },
                { src: imagePath + "slides/sl4.jpg", id: "sl4" },
                { src: imagePath + "slides/sl5.jpg", id: "sl5" },


                ////Sound
                // { id: "tile1", src: audioPath + "tile_inverte1.mp3" },
                // { id: "tile2", src: audioPath + "tile_inverte2.mp3" },
                // { id: "tile3", src: audioPath + "tile_inverte3.mp3" },
                // { id: "tile4", src: audioPath + "tile_inverte4.mp3" },
                // 
                // { id: "win", src: audioPath + "tiles_explosao.mp3" },
                // { id: "prize", src: audioPath + "tiles_premio.mp3" },
                // { id: "trilha", src: audioPath + "trilha_principal.mp3" },
                // { id: "navigatedown", src: audioPath + "botao_abrir_down.mp3" },
                // { id: "navigateup", src: audioPath + "botao_abrir_up.mp3" },
                // { id: "navigateOutdown", src: audioPath + "botao_abrir_up.mp3" },
                // { id: "navigateOutup", src: audioPath + "botao_abrir_down.mp3" },
            ];

            //create a image array
            images = images || {};

            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);

            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image") images[evt.item.id] = evt.result;
                return true;
            });

            //loads entire manifest
            this.loader.loadManifest(manifest);

            return this.loader;
        }


        public static getImage(name: string): createjs.Bitmap {
            var img = new createjs.Bitmap(<HTMLImageElement>this.loader.getResult(name));
            //Bimg.scaleX = img.scaleY = 2;
            return img
        }


        public static getMovieClip(name: string): createjs.Sprite {
            var t: createjs.Sprite = new window[name];
            return t;
        }


        public static playSound(name: string) {
            if (!InvertCross.InvertCrossaGame.settings.getSoundfx())return;
            
            //wp8// this.mediaDic[name].play()
            createjs.Sound.play(name);
        }

        // -----------------------------------  Music ------------------------------

        private static currentMusic: createjs.SoundInstance;
        private static currentMusicname: string;

        public static playMusic(name: string) {
            if (!InvertCross.InvertCrossaGame.settings.getMusic()) return;

            //WP8//var media = this.mediaDic[name];
            if (name == "") name = this.currentMusicname;
            if (this.currentMusicname == name) {
                if (this.currentMusic.playState == createjs.Sound.PLAY_SUCCEEDED)//wp8commenthere//
                    return;
            }

            if (this.currentMusic != null)
                this.currentMusic.stop();

            this.currentMusic = createjs.Sound.play(name, "none", 0, 0, -1);
            //wp8//this.currentMusic = media;
            //wp8//media.play()
            this.currentMusicname = name;


        }

        public static stopMusic() {
            if (this.currentMusic != null)
                this.currentMusic.stop();
        }
    }
}



///depreciated
/* public static initSound(): boolean {
     // if initializeDefaultPlugins returns false, we cannot play sound in this browser
     if (!createjs.Sound.initializeDefaultPlugins()) { return false; }
          
     var manifest = [
               
     ];

     //createjs.Sound.addEventListener("loadComplete", (event: any): boolean => {
     //    return true;
     //});

     createjs.Sound.registerManifest(manifest);

     //wp7 8 compatibility cordova
     //this.mediaDic = new Object();
     //for (var i = 0; i < manifest.length; i++)
     //    this.mediaDic[manifest[i].id] = new Media(manifest[i].src);

     return true;
 }*/
