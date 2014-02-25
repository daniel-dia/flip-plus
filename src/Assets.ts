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

            if (!assetscale) assetscale = 1;

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
                { id: "title/LogoScreen", src: imagePath + "title/LogoScreen.jpg" },

                //intro
                { src: "intro/bot.png", id: "bot" },
                { src: "intro/Bot01.png", id: "Bot01" },
                { src: "intro/botLight.png", id: "botLight" },
                { src: "intro/fundoEscuro.jpg", id: "fundoEscuro" },
                { src: "intro/mybotsbg.jpg", id: "mybotsbg" },

                //projects
                { id: "projects/bg", src: imagePath + "projects/bg.jpg" },
                { id: "projects/projectActiveBg", src: imagePath + "projects/projectActiveBg.png" },

                //my bots
                { id: "mybots/greenbox", src: imagePath + "mybots/greenbox.png" },
                { id: "mybots/greenshadow", src: imagePath + "mybots/greenshadow.png" },
                { id: "mybots/mybotsbg", src: imagePath + "mybots/mybotsbg.png" },
                { id: "mybots/trash01", src: imagePath + "mybots/trash01.png" },
                { id: "mybots/trash02", src: imagePath + "mybots/trash02.png" },
                { id: "mybots/trash03", src: imagePath + "mybots/trash03.png" },
                { id: "mybots/trash04", src: imagePath + "mybots/trash04.png" },
                { id: "mybots/trash05", src: imagePath + "mybots/trash05.png" },
                { id: "mybots/trash06", src: imagePath + "mybots/trash06.png" },

                { id: "mybots/RobotPreviewFill", src: imagePath + "mybots/RobotPreviewFill.png" },
                { id: "mybots/RobotPreview", src: imagePath +       "mybots/RobotPreview.png" },

                //workshow
                { id: "workshop/basefases", src: imagePath + "workshop/basefases.png" },
                { id: "workshop/bgworkshop", src: imagePath + "workshop/bgworkshop.png" },
                { id: "workshop/estrelaworkshop", src: imagePath + "workshop/estrelaworkshop.png" },
                { id: "workshop/faseamarelaf", src: imagePath + "workshop/faseamarelaf.png" },
                { id: "workshop/faseamarela", src: imagePath + "workshop/faseamarela.png" },
                { id: "workshop/faseroxaf", src: imagePath + "workshop/faseroxaf.png" },
                { id: "workshop/faseroxa", src: imagePath + "workshop/faseroxa.png" },
                { id: "workshop/faseverdef", src: imagePath + "workshop/faseverdef.png" },
                { id: "workshop/faseverde", src: imagePath + "workshop/faseverde.png" },
                { id: "workshop/skip", src: imagePath + "workshop/skip.png" },
                { id: "workshop/paginacaoworkshop", src: imagePath + "workshop/paginacaoworkshop.png" },
                { id: "workshop/painelworkshop", src: imagePath + "workshop/painelworkshop.png" },
               
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


                //Legacy
                { id: "114", src: "assets/" + "114.png" },
                { id: "57", src: "assets/" + "57.png" },
                { id: "72", src: "assets/" + "72.png" },
                { id: "acabouotempo", src: "assets/" + "acabouotempo.png" },
                { id: "anim test", src: "assets/" + "anim test.png" },
                { id: "animtest", src: "assets/" + "animtest.png" },
                { id: "basebotoes1", src: "assets/" + "basebotoes1.png" },
                { id: "basebotoes2", src: "assets/" + "basebotoes2.png" },
                { id: "bolinhas", src: "assets/" + "bolinhas.png" },
                { id: "botao2", src: "assets/" + "botao2.png" },
                { id: "botao3", src: "assets/" + "botao3.png" },
                { id: "botaodenovo", src: "assets/" + "botaodenovo.png" },
                { id: "botaodenovo2", src: "assets/" + "botaodenovo2.png" },
                { id: "botaofxoff", src: "assets/" + "botaofxoff.png" },
                { id: "botaofxon", src: "assets/" + "botaofxon.png" },
                { id: "botaojogar", src: "assets/" + "botaojogar.png" },
                { id: "botaomenu", src: "assets/" + "botaomenu.png" },
                { id: "botaomusicaoff", src: "assets/" + "botaomusicaoff.png" },
                { id: "botaomusicaon", src: "assets/" + "botaomusicaon.png" },
                { id: "botaoproximo", src: "assets/" + "botaoproximo.png" },
                { id: "botaopular", src: "assets/" + "botaopular.png" },
                { id: "botaopular2", src: "assets/" + "botaopular2.png" },
                { id: "botaosettings", src: "assets/" + "botaosettings.png" },
                { id: "botaosom", src: "assets/" + "botaosom.png" },
                { id: "botaotrofeus", src: "assets/" + "botaotrofeus.png" },
                { id: "botaovoltar", src: "assets/" + "botaovoltar.png" },
                { id: "BoxBallon", src: "assets/" + "BoxBallon.png" },
                { id: "boxesBg", src: "assets/" + "boxesBg.png" },
                { id: "boxesBgTop", src: "assets/" + "boxesBgTop.png" },
                { id: "bt", src: "assets/" + "bt.png" },
                { id: "done01", src: "assets/" + "done01.png" },
                { id: "fundoporcasparafusos", src: "assets/" + "fundoporcasparafusos.png" },
                { id: "green", src: "assets/" + "green.png" },
                { id: "green_bg", src: "assets/" + "green_bg.png" },
                { id: "green_bg_main", src: "assets/" + "green_bg_main.png" },
                { id: "Ground", src: "assets/" + "Ground.png" },
                { id: "homeback", src: "assets/" + "homeback.png" },
                { id: "icon", src: "assets/" + "icon.png" },
                { id: "icon2", src: "assets/" + "icon2.png" },
                { id: "iconebotaojogar", src: "assets/" + "iconebotaojogar.png" },
                { id: "iconShadow", src: "assets/" + "iconShadow.png" },
                { id: "luzfundo", src: "assets/" + "luzfundo.png" },
                { id: "porcasparafusos1", src: "assets/" + "porcasparafusos1.png" },
                { id: "porcasparafusos2", src: "assets/" + "porcasparafusos2.png" },
                { id: "prize", src: "assets/" + "prize.png" },
                { id: "simple", src: "assets/" + "simple.png" },
                { id: "simpleC", src: "assets/" + "simpleC.png" },
                { id: "smokePart", src: "assets/" + "smokePart.png" },
                { id: "bggeneric", src: "assets/" + "bggeneric.jpg" },
                { id: "green_bg", src: "assets/" + "green_bg.jpg" },
                { id: "locked", src: "assets/" + "locked.jpg" },
                { id: "pr", src: "assets/" + "pr.jpg" },
                { id: "win", src: "assets/" + "win.jpg" }, 

                //lobby
                { src: imagePath + "lobbyImages/greenbox.png", id: "greenbox" },
                { src: imagePath + "lobbyImages/Bitmap4.png", id: "Bitmap4" },
                { src: imagePath + "lobbyImages/Bitmap5.png", id: "Bitmap5" },
                { src: imagePath + "lobbyImages/Bitmap6.png", id: "Bitmap6" },
                { src: imagePath + "lobbyImages/Bitmap7.png", id: "Bitmap7" },
                { src: imagePath + "lobbyImages/Bitmap8.png", id: "Bitmap8" },

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
