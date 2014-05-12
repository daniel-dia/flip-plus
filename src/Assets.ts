declare var images: any;
declare var Media: any;
declare var assetscale: number;
declare var spriteSheets : number;

// Class
class Assets {

    ///TODO USAR ISSO
    ///http://www.createjs.com/tutorials/SoundJS%20and%20PreloadJS/

    private static loader: createjs.LoadQueue;

    private static spriteSheets: Array<any>;

    public static loadAssets(): createjs.LoadQueue {

        if (!assetscale) assetscale = 0.5;

        var imagePath = "assets/images_" + assetscale + "x/";
        var audioPath = "assets/sound/";

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


        var manifest = [

            //common
            { id: "partshud", src: imagePath + "partshud.png" },
            { id: "partsicon", src: imagePath + "partsicon.png" },
            { id: "starsicon", src: imagePath + "staricon.png" },
            { id: "MenuBt", src: imagePath + "MenuBt.png" },
            { id: "BackBt", src: imagePath + "BackBt.png" },
            { id: "touch", src: imagePath + "touch.png" },

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

            //Bonus1
            { src: imagePath + "Bonus1/back.png", id: "Bonus1/back" },
            { src: imagePath + "Bonus1/header.png", id: "Bonus1/header" },
            { src: imagePath + "Bonus1/footer.png", id: "Bonus1/footer" },
            { src: imagePath + "Bonus1/icone_lata.png", id: "Bonus1/icone_lata" },
            { src: imagePath + "Bonus1/Bonus1.png", id: "Bonus1/Bonus1" },

            { src: imagePath + "Bonus2/back.jpg", id: "Bonus2/back" },
            { src: imagePath + "Bonus2/header.png", id: "Bonus2/header" },
            { src: imagePath + "Bonus2/footer.png", id: "Bonus2/footer" },
            { src: imagePath + "Bonus2/bonuscard1.png", id: "Bonus2/bonuscard1" },
            { src: imagePath + "Bonus2/bonuscard2.png", id: "Bonus2/bonuscard2" },
            { src: imagePath + "Bonus2/bonusrat.png", id: "Bonus2/bonusrat" },

            //{ id: "projects/teste1", src: imagePath + "projects/teste1.png" },
            //{ id: "projects/teste0", src: imagePath + "projects/teste0.png" },
            { id: "projects/teste20", src: imagePath + "projects/teste20.png" },
            { id: "projects/teste21", src: imagePath + "projects/teste21.png" },

            { id: "projects/bgprojects", src: imagePath + "projects/bgprojects.jpg" },

            //projects
            /*
            
            { id: "projects/bgprojects", src: imagePath + "projects/bgprojects.jpg" },
            { id: "projects/Bonus1", src: imagePath + "projects/Bonus1.png" },
            { id: "projects/Bonus2", src: imagePath + "projects/Bonus2.png" },
            { id: "projects/Bonus3", src: imagePath + "projects/Bonus3.png" },
            { id: "projects/slot1", src: imagePath + "projects/slot1.png" },
            { id: "projects/slot2", src: imagePath + "projects/slot2.png" },
            { id: "projects/slot3", src: imagePath + "projects/slot3.png" },
            { id: "projects/slot0", src: imagePath + "projects/slot0.png" },
            { id: "projects/slotl", src: imagePath + "projects/slotl.png" },
            { id: "projects/star", src: imagePath + "projects/star.png" },
            { id: "projects/pageon", src: imagePath + "projects/pageon.png" },
            { id: "projects/pageoff", src: imagePath + "projects/pageoff.png" },
            { id: "projects/bigslot1", src: imagePath + "projects/bigslot1.png" },
            { id: "projects/btpage", src: imagePath + "projects/btpage.png" },

            //projects
            { id: "projects/bots/Bot01", src: imagePath + "projects/bots/Bot01.png" },
            { id: "projects/bots/Bot02", src: imagePath + "projects/bots/Bot02.png" },
            { id: "projects/bots/Bot03", src: imagePath + "projects/bots/Bot03.png" },
            { id: "projects/bots/Bot04", src: imagePath + "projects/bots/Bot04.png" },
            { id: "projects/bots/Bot05", src: imagePath + "projects/bots/Bot05.png" },
            { id: "projects/bots/Bot06", src: imagePath + "projects/bots/Bot06.png" },
            { id: "projects/bots/Bot07", src: imagePath + "projects/bots/Bot07.png" },
            { id: "projects/bots/Bot08", src: imagePath + "projects/bots/Bot08.png" },
            { id: "projects/bots/Bot09", src: imagePath + "projects/bots/Bot09.png" },
            { id: "projects/bots/Bot10", src: imagePath + "projects/bots/Bot10.png" },
            { id: "projects/bots/Bot11", src: imagePath + "projects/bots/Bot11.png" },
            { id: "projects/bots/Bot12", src: imagePath + "projects/bots/Bot12.png" },
            { id: "projects/bots/Bot13", src: imagePath + "projects/bots/Bot13.png" },
            { id: "projects/bots/Bot14", src: imagePath + "projects/bots/Bot14.png" },
            { id: "projects/bots/Bot15", src: imagePath + "projects/bots/Bot15.png" },
            { id: "projects/bots/Bot16", src: imagePath + "projects/bots/Bot16.png" },
            { id: "projects/bots/Bot17", src: imagePath + "projects/bots/Bot17.png" },
            { id: "projects/bots/Bot18", src: imagePath + "projects/bots/Bot18.png" },
            { id: "projects/bots/Bot01_shadow", src: imagePath + "projects/bots/Bot01_shadow.png" },
            { id: "projects/bots/Bot02_shadow", src: imagePath + "projects/bots/Bot02_shadow.png" },
            { id: "projects/bots/Bot03_shadow", src: imagePath + "projects/bots/Bot03_shadow.png" },
            { id: "projects/bots/Bot04_shadow", src: imagePath + "projects/bots/Bot04_shadow.png" },
            { id: "projects/bots/Bot05_shadow", src: imagePath + "projects/bots/Bot05_shadow.png" },
            { id: "projects/bots/Bot06_shadow", src: imagePath + "projects/bots/Bot06_shadow.png" },
            { id: "projects/bots/Bot07_shadow", src: imagePath + "projects/bots/Bot07_shadow.png" },
            { id: "projects/bots/Bot08_shadow", src: imagePath + "projects/bots/Bot08_shadow.png" },
            { id: "projects/bots/Bot09_shadow", src: imagePath + "projects/bots/Bot09_shadow.png" },
            { id: "projects/bots/Bot10_shadow", src: imagePath + "projects/bots/Bot10_shadow.png" },
            { id: "projects/bots/Bot11_shadow", src: imagePath + "projects/bots/Bot11_shadow.png" },
            { id: "projects/bots/Bot12_shadow", src: imagePath + "projects/bots/Bot12_shadow.png" },
            { id: "projects/bots/Bot13_shadow", src: imagePath + "projects/bots/Bot13_shadow.png" },
            { id: "projects/bots/Bot14_shadow", src: imagePath + "projects/bots/Bot14_shadow.png" },
            { id: "projects/bots/Bot15_shadow", src: imagePath + "projects/bots/Bot15_shadow.png" },
            { id: "projects/bots/Bot16_shadow", src: imagePath + "projects/bots/Bot16_shadow.png" },
            { id: "projects/bots/Bot17_shadow", src: imagePath + "projects/bots/Bot17_shadow.png" },
            { id: "projects/bots/Bot18_shadow", src: imagePath + "projects/bots/Bot18_shadow.png" },
            */

            //workshop
            { id: "workshop/workshop1", src: imagePath + "workshop/workshop1.png" },
            { id: "workshop/workshop2", src: imagePath + "workshop/workshop2.png" },
            { id: "workshop/workshop0", src: imagePath + "workshop/workshop0.png" },
            
            /*
            { src: imagePath + "workshop/bots/Bot01.png", id: "workshop/bots/Bot01" },
            { src: imagePath + "workshop/bots/Bot02.png", id: "workshop/bots/Bot02" },
            { src: imagePath + "workshop/bots/Bot03.png", id: "workshop/bots/Bot03" },
            { src: imagePath + "workshop/bots/Bot04.png", id: "workshop/bots/Bot04" },
            { src: imagePath + "workshop/bots/Bot05.png", id: "workshop/bots/Bot05" },
            { src: imagePath + "workshop/bots/Bot06.png", id: "workshop/bots/Bot06" },
            { src: imagePath + "workshop/bots/Bot07.png", id: "workshop/bots/Bot07" },
            { src: imagePath + "workshop/bots/Bot08.png", id: "workshop/bots/Bot08" },
            { src: imagePath + "workshop/bots/Bot09.png", id: "workshop/bots/Bot09" },
            { src: imagePath + "workshop/bots/Bot10.png", id: "workshop/bots/Bot10" },
            { src: imagePath + "workshop/bots/Bot11.png", id: "workshop/bots/Bot11" },
            { src: imagePath + "workshop/bots/Bot12.png", id: "workshop/bots/Bot12" },
            { src: imagePath + "workshop/bots/Bot13.png", id: "workshop/bots/Bot13" },
            { src: imagePath + "workshop/bots/Bot14.png", id: "workshop/bots/Bot14" },
            { src: imagePath + "workshop/bots/Bot15.png", id: "workshop/bots/Bot15" },
            { src: imagePath + "workshop/bots/Bot16.png", id: "workshop/bots/Bot16" },
            { src: imagePath + "workshop/bots/Bot17.png", id: "workshop/bots/Bot17" },
            { src: imagePath + "workshop/bots/Bot18.png", id: "workshop/bots/Bot18" },
            { src: imagePath + "workshop/bots/Bot01_fill.png", id: "workshop/bots/Bot01_fill" },
            { src: imagePath + "workshop/bots/Bot02_fill.png", id: "workshop/bots/Bot02_fill" },
            { src: imagePath + "workshop/bots/Bot03_fill.png", id: "workshop/bots/Bot03_fill" },
            { src: imagePath + "workshop/bots/Bot04_fill.png", id: "workshop/bots/Bot04_fill" },
            { src: imagePath + "workshop/bots/Bot05_fill.png", id: "workshop/bots/Bot05_fill" },
            { src: imagePath + "workshop/bots/Bot06_fill.png", id: "workshop/bots/Bot06_fill" },
            { src: imagePath + "workshop/bots/Bot07_fill.png", id: "workshop/bots/Bot07_fill" },
            { src: imagePath + "workshop/bots/Bot08_fill.png", id: "workshop/bots/Bot08_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot09_fill" },
            { src: imagePath + "workshop/bots/Bot10_fill.png", id: "workshop/bots/Bot10_fill" },
            { src: imagePath + "workshop/bots/Bot11_fill.png", id: "workshop/bots/Bot11_fill" },
            { src: imagePath + "workshop/bots/Bot12_fill.png", id: "workshop/bots/Bot12_fill" },
            { src: imagePath + "workshop/bots/Bot13_fill.png", id: "workshop/bots/Bot13_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot14_fill" },
            { src: imagePath + "workshop/bots/Bot15_fill.png", id: "workshop/bots/Bot15_fill" },
            { src: imagePath + "workshop/bots/Bot09_fill.png", id: "workshop/bots/Bot16_fill" },
            { src: imagePath + "workshop/bots/Bot17_fill.png", id: "workshop/bots/Bot17_fill" },
            { src: imagePath + "workshop/bots/Bot18_fill.png", id: "workshop/bots/Bot18_fill" },
            { src: imagePath + "workshop/bots/Bot01_stroke.png", id: "workshop/bots/Bot01_stroke" },
            { src: imagePath + "workshop/bots/Bot02_stroke.png", id: "workshop/bots/Bot02_stroke" },
            { src: imagePath + "workshop/bots/Bot03_stroke.png", id: "workshop/bots/Bot03_stroke" },
            { src: imagePath + "workshop/bots/Bot04_stroke.png", id: "workshop/bots/Bot04_stroke" },
            { src: imagePath + "workshop/bots/Bot05_stroke.png", id: "workshop/bots/Bot05_stroke" },
            { src: imagePath + "workshop/bots/Bot06_stroke.png", id: "workshop/bots/Bot06_stroke" },
            { src: imagePath + "workshop/bots/Bot07_stroke.png", id: "workshop/bots/Bot07_stroke" },
            { src: imagePath + "workshop/bots/Bot08_stroke.png", id: "workshop/bots/Bot08_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot09_stroke" },
            { src: imagePath + "workshop/bots/Bot10_stroke.png", id: "workshop/bots/Bot10_stroke" },
            { src: imagePath + "workshop/bots/Bot11_stroke.png", id: "workshop/bots/Bot11_stroke" },
            { src: imagePath + "workshop/bots/Bot12_stroke.png", id: "workshop/bots/Bot12_stroke" },
            { src: imagePath + "workshop/bots/Bot13_stroke.png", id: "workshop/bots/Bot13_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot14_stroke" },
            { src: imagePath + "workshop/bots/Bot15_stroke.png", id: "workshop/bots/Bot15_stroke" },
            { src: imagePath + "workshop/bots/Bot09_stroke.png", id: "workshop/bots/Bot16_stroke" },
            { src: imagePath + "workshop/bots/Bot17_stroke.png", id: "workshop/bots/Bot17_stroke" },
            { src: imagePath + "workshop/bots/Bot18_stroke.png", id: "workshop/bots/Bot18_stroke" },

            //My bots
            { src: imagePath + "myBots/mybotsbg.jpg", id: "mybotsbg" },
            { src: imagePath + "myBots/Bot01.png", id: "Bot01" },
            { src: imagePath + "myBots/Bot02.png", id: "Bot02" },
            { src: imagePath + "myBots/Bot03.png", id: "Bot03" },
            { src: imagePath + "myBots/Bot04.png", id: "Bot04" },
            { src: imagePath + "myBots/Bot05.png", id: "Bot05" },
            { src: imagePath + "myBots/Bot06.png", id: "Bot06" },
            { src: imagePath + "myBots/Bot07.png", id: "Bot07" },
            { src: imagePath + "myBots/Bot08.png", id: "Bot08" },
            { src: imagePath + "myBots/Bot09.png", id: "Bot09" },
            { src: imagePath + "myBots/Bot10.png", id: "Bot10" },
            { src: imagePath + "myBots/Bot11.png", id: "Bot11" },
            { src: imagePath + "myBots/Bot12.png", id: "Bot12" },
            { src: imagePath + "myBots/Bot13.png", id: "Bot13" },
            { src: imagePath + "myBots/Bot14.png", id: "Bot14" },
            { src: imagePath + "myBots/Bot15.png", id: "Bot15" },
            { src: imagePath + "myBots/Bot16.png", id: "Bot16" },
            { src: imagePath + "myBots/Bot17.png", id: "Bot17" },
            { src: imagePath + "myBots/Bot18.png", id: "Bot18" },

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
            { id: "workshop/paginacaoworkshop", src: imagePath + "workshop/paginacaoworkshop.png" },
            { id: "workshop/painelworkshop", src: imagePath + "workshop/painelworkshop.png" },
            { id: "workshop/stargreen", src: imagePath + "workshop/stargreen.png" },
            { id: "workshop/starpurple", src: imagePath + "workshop/starpurple.png" },
            { id: "workshop/staryellow", src: imagePath + "workshop/staryellow.png" },
            */
            //puzzle

            { id: "puzzle/Puzzle", src: imagePath + "puzzle/Puzzle.png" },

            /*
            { id: "puzzle/bg", src: imagePath + "puzzle/bg.jpg" },
            { id: "puzzle/btplay1", src: imagePath + "puzzle/btplay1.png" },
            { id: "puzzle/btplay2", src: imagePath + "puzzle/btplay2.png" },
            { id: "puzzle/btplay3", src: imagePath + "puzzle/btplay3.png" },
            { id: "puzzle/btpowerup", src: imagePath + "puzzle/btpowerup.png" },
            { id: "puzzle/btrestartpause", src: imagePath + "puzzle/btrestartpause.png" },
            { id: "puzzle/btsair", src: imagePath + "puzzle/btsair.png" },
            { id: "puzzle/btsom1", src: imagePath + "puzzle/btsom1.png" },
            { id: "puzzle/btsom2", src: imagePath + "puzzle/btsom2.png" },
            { id: "puzzle/iconemoves", src: imagePath + "puzzle/iconemoves.png" },
            { id: "puzzle/iconepause", src: imagePath + "puzzle/iconepause.png" },
            { id: "puzzle/iconeplay", src: imagePath + "puzzle/iconeplay.png" },
            { id: "puzzle/iconepuzzle", src: imagePath + "puzzle/iconepuzzle.png" },
            { id: "puzzle/iconerestart", src: imagePath + "puzzle/iconerestart.png" },
            { id: "puzzle/paginacaopuzzle", src: imagePath + "puzzle/paginacaopuzzle.png" },
            { id: "puzzle/painelpuzzle1", src: imagePath + "puzzle/painelpuzzle1.png" },
            { id: "puzzle/painelpuzzle2", src: imagePath + "puzzle/painelpuzzle2.png" },
            { id: "puzzle/tile0", src: imagePath + "puzzle/tile0.png" },
            { id: "puzzle/indicator", src: imagePath + "puzzle/indicator.png" },

            { id: "puzzle/icon_hint", src: imagePath + "puzzle/icon_hint.png" },
            { id: "puzzle/icon_time", src: imagePath + "puzzle/icon_time.png" },
            { id: "puzzle/icon_skip", src: imagePath + "puzzle/icon_skip.png" },
            { id: "puzzle/icon_touch", src: imagePath + "puzzle/icon_touch.png" },
            { id: "puzzle/icon_solve", src: imagePath + "puzzle/icon_solve.png" },

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

            { id: "puzzle/tileD", src: imagePath + "puzzle/tileD.png" },
            { id: "puzzle/tilexD", src: imagePath + "puzzle/tilexD.png" },
            */

            //popup
            { id: "popups/popup", src: imagePath + "popups/popup.png" },
            { id: "popups/message", src: imagePath + "popups/message.png" },
            { id: "popups/popupTutorial", src: imagePath + "popups/popupbot.png" },

            //Legacy
            { id: "bolinhas", src: "assets/" + "bolinhas.png" },
            { id: "smokePart", src: "assets/" + "smokePart.png" },


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

        //loads entire manifest
        this.loader.loadManifest(manifest);

        return this.loader;
    }


    public static getBitmap(name: string): createjs.DisplayObject {
        if (spriteSheets[name])
            return this.getSprite(name);
        else
        return new createjs.Bitmap(this.getImage(name));
    }

    private static getImage(name: string): HTMLImageElement {
        return <HTMLImageElement>this.loader.getResult(name);
    }

    public static getMovieClip(name: string): createjs.Sprite {
        var t: createjs.Sprite = new window[name];
        return t;
    }

    public static getSprite
        (name: string): createjs.Sprite {
        var data = spriteSheets[name];
        for (var i in data.images) if(typeof data.images[i] == "string") data.images[i] = this.getImage(data.images[i]);
            
        var spritesheet = new createjs.SpriteSheet(data);

        var sprite = new createjs.Sprite(spritesheet);
        sprite.play();
        return sprite;
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