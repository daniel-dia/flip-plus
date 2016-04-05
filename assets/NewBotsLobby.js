(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes
    var rect; // used to reference frame bounds

    // library properties:
    lib.properties = {
        width: 1536,
        height: 2048,
        fps: 60,
        color: "#FFFFFF",
        manifest: [
            { src: "images/arm1.png", id: "arm1" },
            { src: "images/arm2.png", id: "arm2" },
            { src: "images/B00Mbody.png", id: "B00Mbody" },
            { src: "images/B00Mleg.png", id: "B00Mleg" },
            { src: "images/BGSTbody1.png", id: "BGSTbody1" },
            { src: "images/BGSTbody2.png", id: "BGSTbody2" },
            { src: "images/BGSTleg.png", id: "BGSTleg" },
            { src: "images/BGSTpart.png", id: "BGSTpart" },
            { src: "images/BJKZarm1.png", id: "BJKZarm1" },
            { src: "images/BJKZarm2.png", id: "BJKZarm2" },
            { src: "images/BJKZbody.png", id: "BJKZbody" },
            { src: "images/BJKZpart.png", id: "BJKZpart" },
            { src: "images/body.png", id: "body" },
            { src: "images/BUMbody.png", id: "BUMbody" },
            { src: "images/BUMleg1.png", id: "BUMleg1" },
            { src: "images/BUMleg2.png", id: "BUMleg2" },
            { src: "images/BUMpart.png", id: "BUMpart" },
            { src: "images/DD1arm1.png", id: "DD1arm1" },
            { src: "images/DD1arm2.png", id: "DD1arm2" },
            { src: "images/DD1body.png", id: "DD1body" },
            { src: "images/DD1leg1.png", id: "DD1leg1" },
            { src: "images/DD1leg2.png", id: "DD1leg2" },
            { src: "images/DD1part.png", id: "DD1part" },
            { src: "images/GGSTbody1.png", id: "GGSTbody1" },
            { src: "images/GGSTbody2.png", id: "GGSTbody2" },
            { src: "images/GGSTleg.png", id: "GGSTleg" },
            { src: "images/GGSTpart.png", id: "GGSTpart" },
            { src: "images/KON6arm1.png", id: "KON6arm1" },
            { src: "images/KON6arm2.png", id: "KON6arm2" },
            { src: "images/KON6body.png", id: "KON6body" },
            { src: "images/KON6leg1.png", id: "KON6leg1" },
            { src: "images/KON6leg2.png", id: "KON6leg2" },
            { src: "images/KR8Ybody.png", id: "KR8Ybody" },
            { src: "images/KR8Yleg.png", id: "KR8Yleg" },
            { src: "images/L1NKarm1.png", id: "L1NKarm1" },
            { src: "images/L1NKarm2.png", id: "L1NKarm2" },
            { src: "images/L1NKbody.png", id: "L1NKbody" },
            { src: "images/L1NKleg.png", id: "L1NKleg" },
            { src: "images/L1NKpart.png", id: "L1NKpart" },
            { src: "images/leg1.png", id: "leg1" },
            { src: "images/leg2.png", id: "leg2" },
            { src: "images/ME64arm1.png", id: "ME64arm1" },
            { src: "images/ME64arm2.png", id: "ME64arm2" },
            { src: "images/ME64body.png", id: "ME64body" },
            { src: "images/ME64leg1.png", id: "ME64leg1" },
            { src: "images/ME64leg2.png", id: "ME64leg2" },
            { src: "images/ME64part.png", id: "ME64part" },
            { src: "images/MyBots2.jpg", id: "MyBots2" },
            { src: "images/P1K4body.png", id: "P1K4body" },
            { src: "images/P1K4part1.png", id: "P1K4part1" },
            { src: "images/P1K4part2.png", id: "P1K4part2" },
            { src: "images/P1K4part3.png", id: "P1K4part3" },
            { src: "images/P4CMbody1.png", id: "P4CMbody1" },
            { src: "images/P4CMbody2.png", id: "P4CMbody2" },
            { src: "images/P4CMleg.png", id: "P4CMleg" },
            { src: "images/P4CMpart.png", id: "P4CMpart" },
            { src: "images/RGSTbody1.png", id: "RGSTbody1" },
            { src: "images/RGSTbody2.png", id: "RGSTbody2" },
            { src: "images/RGSTleg.png", id: "RGSTleg" },
            { src: "images/RGSTpart.png", id: "RGSTpart" },
            { src: "images/RDMbody.png", id: "RDMbody" },
            { src: "images/RDMleg1.png", id: "RDMleg1" },
            { src: "images/RDMleg2.png", id: "RDMleg2" },
            { src: "images/RDMpart.png", id: "RDMpart" },
            { src: "images/SH06body.png", id: "SH06body" },
            { src: "images/SH06leg1.png", id: "SH06leg1" },
            { src: "images/SH06leg2.png", id: "SH06leg2" },
            { src: "images/SH06leg3.png", id: "SH06leg3" },
            { src: "images/TBLKarm.png", id: "TBLKarm" },
            { src: "images/TBLKbody.png", id: "TBLKbody" },
            { src: "images/TBLKleg.png", id: "TBLKleg" },
            { src: "images/Y05Yarm1.png", id: "Y05Yarm1" },
            { src: "images/Y05Yarm2.png", id: "Y05Yarm2" },
            { src: "images/Y05Ybody.png", id: "Y05Ybody" },
            { src: "images/Y05Yleg.png", id: "Y05Yleg" }
        ]
    };

    // stage content:
    (lib.NewBotsLobby = function () {
        this.initialize();

        // Layer 2
        this.Bot15 = new lib.Bot15();
        this.Bot15.setTransform(1453.3, 1796.5, 0.736, 0.736, 0, 0, 0, 40.1, 22.4);

        this.Bot12 = new lib.Bot12();
        this.Bot12.setTransform(184.8, 1846, 0.641, 0.641, 0, 0, 0, -0.1, -0.1);

        this.Bot14 = new lib.Bot14();
        this.Bot14.setTransform(720.4, 1857.5, 0.5, 0.5);

        this.Bot16 = new lib.Bot16();
        this.Bot16.setTransform(1068.2, 1890.2, 0.5, 0.5);

        this.Bot05 = new lib.Bot05();
        this.Bot05.setTransform(509.3, 1616.2, 0.612, 0.612, 0, 0, 0, 0.1, 0);

        this.Bot09 = new lib.Bot09();
        this.Bot09.setTransform(929.6, 1790.6, 0.5, 0.5);

        // Layer 10
        this.Bot04 = new lib.Bot04();
        this.Bot04.setTransform(357.5, 1362.4, 0.647, 0.647, 0, 0, 0, 0, -0.1);

        // Layer 9
        this.Bot08 = new lib.Bot08();
        this.Bot08.setTransform(206.4, 1070.9, 0.7, 0.7);

        // Layer 8
        this.Bot17 = new lib.Bot17();
        this.Bot17.setTransform(222.9, 415.2, 0.5, 0.5);

        // Layer 7
        this.Bot02 = new lib.Bot02();
        this.Bot02.setTransform(592.7, 909.6, 0.5, 0.5);

        this.Bot07 = new lib.Bot07();
        this.Bot07.setTransform(1343.8, 1457.7, 0.622, 0.622, 0, 0, 0, 0, -0.1);

        this.Bot06 = new lib.Bot06();
        this.Bot06.setTransform(1196.7, 1000, 0.752, 0.752);

        this.Bot13 = new lib.Bot13();
        this.Bot13.setTransform(217.9, 655.4, 0.5, 0.5);

        // Layer 6
        this.Bot10 = new lib.Bot10();
        this.Bot10.setTransform(656.8, 265.8, 0.5, 0.5, 0, 0, 0, 0.6, -33.1);

        this.Bot11 = new lib.Bot11();
        this.Bot11.setTransform(834.8, 916.2, 0.5, 0.5);

        // Layer 1
        this.Bot18 = new lib.Bot18();
        this.Bot18.setTransform(1540, 657, 0.694, 0.694);

        // Layer 14
        this.Bot01 = new lib.Bot01();
        this.Bot01.setTransform(815.7, 1448.2, 0.611, 0.611);

        // Layer 15
        this.Bot01b = new lib.SN35jump();
        this.Bot01b.setTransform(815.7, 1448.2, 0.611, 0.611);

        // Layer 13
        this.Bot01a = new lib.SN35noarm();
        this.Bot01a.setTransform(820, 1444.6, 0.611, 0.611);

        // Layer 16
        this.Bot03 = new lib.Bot03();
        this.Bot03.setTransform(1154.7, 1314.7, 0.545, 0.545, 0, 0, 0, 22.3, 40.1);

        this.addChild(this.Bot03, this.Bot01a, this.Bot01b, this.Bot01, this.Bot18, this.Bot11, this.Bot10, this.Bot13, this.Bot06, this.Bot07, this.Bot02, this.Bot17, this.Bot08, this.Bot04, this.Bot09, this.Bot05, this.Bot16, this.Bot14, this.Bot12, this.Bot15);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(695.2, 1166.8, 2074.1, 1899.8);
    p.frameBounds = [rect];


    // symbols:
    (lib.arm1 = function () {
        this.initialize(img.arm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 171, 217);


    (lib.arm2 = function () {
        this.initialize(img.arm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 203, 214);


    (lib.B00Mbody = function () {
        this.initialize(img.B00Mbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 562, 561);


    (lib.B00Mleg = function () {
        this.initialize(img.B00Mleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 556, 230);


    (lib.BGSTbody1 = function () {
        this.initialize(img.BGSTbody1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 402, 499);


    (lib.BGSTbody2 = function () {
        this.initialize(img.BGSTbody2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 385, 284);


    (lib.BGSTleg = function () {
        this.initialize(img.BGSTleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 369, 134);


    (lib.BGSTpart = function () {
        this.initialize(img.BGSTpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 80, 186);


    (lib.BJKZarm1 = function () {
        this.initialize(img.BJKZarm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 257, 223);


    (lib.BJKZarm2 = function () {
        this.initialize(img.BJKZarm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 183, 259);


    (lib.BJKZbody = function () {
        this.initialize(img.BJKZbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 651, 651);


    (lib.BJKZpart = function () {
        this.initialize(img.BJKZpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 599, 339);


    (lib.body = function () {
        this.initialize(img.body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 522, 447);


    (lib.BUMbody = function () {
        this.initialize(img.BUMbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 461, 392);


    (lib.BUMleg1 = function () {
        this.initialize(img.BUMleg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 251, 80);


    (lib.BUMleg2 = function () {
        this.initialize(img.BUMleg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 165, 79);


    (lib.BUMpart = function () {
        this.initialize(img.BUMpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 52, 124);


    (lib.DD1arm1 = function () {
        this.initialize(img.DD1arm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 231, 328);


    (lib.DD1arm2 = function () {
        this.initialize(img.DD1arm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 238, 310);


    (lib.DD1body = function () {
        this.initialize(img.DD1body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 338, 433);


    (lib.DD1leg1 = function () {
        this.initialize(img.DD1leg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 256);


    (lib.DD1leg2 = function () {
        this.initialize(img.DD1leg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 144, 249);


    (lib.DD1part = function () {
        this.initialize(img.DD1part);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 298, 244);


    (lib.GGSTbody1 = function () {
        this.initialize(img.GGSTbody1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 402, 536);


    (lib.GGSTbody2 = function () {
        this.initialize(img.GGSTbody2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 385, 285);


    (lib.GGSTleg = function () {
        this.initialize(img.GGSTleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 369, 134);


    (lib.GGSTpart = function () {
        this.initialize(img.GGSTpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 80, 186);


    (lib.KON6arm1 = function () {
        this.initialize(img.KON6arm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 391, 837);


    (lib.KON6arm2 = function () {
        this.initialize(img.KON6arm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 394, 773);


    (lib.KON6body = function () {
        this.initialize(img.KON6body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 683, 488);


    (lib.KON6leg1 = function () {
        this.initialize(img.KON6leg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 893, 271);


    (lib.KON6leg2 = function () {
        this.initialize(img.KON6leg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 219, 348);


    (lib.KR8Ybody = function () {
        this.initialize(img.KR8Ybody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 501, 428);


    (lib.KR8Yleg = function () {
        this.initialize(img.KR8Yleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 124, 107);


    (lib.L1NKarm1 = function () {
        this.initialize(img.L1NKarm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 344, 444);


    (lib.L1NKarm2 = function () {
        this.initialize(img.L1NKarm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 175, 233);


    (lib.L1NKbody = function () {
        this.initialize(img.L1NKbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 550, 554);


    (lib.L1NKleg = function () {
        this.initialize(img.L1NKleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 425, 113);


    (lib.L1NKpart = function () {
        this.initialize(img.L1NKpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 95, 100);


    (lib.leg1 = function () {
        this.initialize(img.leg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 143, 222);


    (lib.leg2 = function () {
        this.initialize(img.leg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 132, 233);


    (lib.ME64arm1 = function () {
        this.initialize(img.ME64arm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 275, 311);


    (lib.ME64arm2 = function () {
        this.initialize(img.ME64arm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 195, 363);


    (lib.ME64body = function () {
        this.initialize(img.ME64body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 468, 395);


    (lib.ME64leg1 = function () {
        this.initialize(img.ME64leg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 385, 221);


    (lib.ME64leg2 = function () {
        this.initialize(img.ME64leg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 260, 176);


    (lib.ME64part = function () {
        this.initialize(img.ME64part);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 129, 117);


    (lib.MyBots2 = function () {
        this.initialize(img.MyBots2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 2116, 2048);


    (lib.P1K4body = function () {
        this.initialize(img.P1K4body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 408, 451);


    (lib.P1K4part1 = function () {
        this.initialize(img.P1K4part1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 128, 277);


    (lib.P1K4part2 = function () {
        this.initialize(img.P1K4part2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 159, 306);


    (lib.P1K4part3 = function () {
        this.initialize(img.P1K4part3);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 334, 419);


    (lib.P4CMbody1 = function () {
        this.initialize(img.P4CMbody1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 550, 451);


    (lib.P4CMbody2 = function () {
        this.initialize(img.P4CMbody2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 582, 358);


    (lib.P4CMleg = function () {
        this.initialize(img.P4CMleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 364, 136);


    (lib.P4CMpart = function () {
        this.initialize(img.P4CMpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 110, 126);


    (lib.RGSTbody1 = function () {
        this.initialize(img.RGSTbody1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 402, 497);


    (lib.RGSTbody2 = function () {
        this.initialize(img.RGSTbody2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 385, 285);


    (lib.RGSTleg = function () {
        this.initialize(img.RGSTleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 369, 134);


    (lib.RGSTpart = function () {
        this.initialize(img.RGSTpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 80, 186);


    (lib.RDMbody = function () {
        this.initialize(img.RDMbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 461, 392);


    (lib.RDMleg1 = function () {
        this.initialize(img.RDMleg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 192, 82);


    (lib.RDMleg2 = function () {
        this.initialize(img.RDMleg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 109, 111);


    (lib.RDMpart = function () {
        this.initialize(img.RDMpart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 52, 126);


    (lib.SH06body = function () {
        this.initialize(img.SH06body);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 557, 466);


    (lib.SH06leg1 = function () {
        this.initialize(img.SH06leg1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 196, 293);


    (lib.SH06leg2 = function () {
        this.initialize(img.SH06leg2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 205, 294);


    (lib.SH06leg3 = function () {
        this.initialize(img.SH06leg3);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 272, 254);


    (lib.TBLKarm = function () {
        this.initialize(img.TBLKarm);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 136, 112);


    (lib.TBLKbody = function () {
        this.initialize(img.TBLKbody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 800, 531);


    (lib.TBLKleg = function () {
        this.initialize(img.TBLKleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 323, 155);


    (lib.Y05Yarm1 = function () {
        this.initialize(img.Y05Yarm1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 272, 257);


    (lib.Y05Yarm2 = function () {
        this.initialize(img.Y05Yarm2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 337, 240);


    (lib.Y05Ybody = function () {
        this.initialize(img.Y05Ybody);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1767, 1032);


    (lib.Y05Yleg = function () {
        this.initialize(img.Y05Yleg);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 758, 889);


    (lib.Interpolar46 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.DD1leg1();
        this.instance.setTransform(-71, -128);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-71, -128, 142, 256);
    p.frameBounds = [rect];


    (lib.Interpolar45 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.DD1leg1();
        this.instance.setTransform(-71, -128);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-71, -128, 142, 256);
    p.frameBounds = [rect];


    (lib.Interpolar44 = function () {
        this.initialize();

        // Camada 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpKiRAAjKQAAjJJKiRQJKiQM5AAQM6AAJKCQQJKCRAADJQAADKpKCRQpKCQs6AAQs5AApKiQg");

        this.addChild(this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-199.8, -49.1, 399.6, 98.3);
    p.frameBounds = [rect];


    (lib.Interpolar43 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKarm1();
        this.instance.setTransform(-172, -222);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-172, -222, 344, 444);
    p.frameBounds = [rect];


    (lib.Interpolar39 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKarm1();
        this.instance.setTransform(-172, -222);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-172, -222, 344, 444);
    p.frameBounds = [rect];


    (lib.Interpolar38 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKarm1();
        this.instance.setTransform(-172, -222);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-172, -222, 344, 444);
    p.frameBounds = [rect];


    (lib.Interpolar37 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKarm2();
        this.instance.setTransform(-87.5, -116.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-87.5, -116.5, 175, 233);
    p.frameBounds = [rect];


    (lib.Interpolar36 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKarm2();
        this.instance.setTransform(-87.5, -116.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-87.5, -116.5, 175, 233);
    p.frameBounds = [rect];


    (lib.Interpolar34 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKpart();
        this.instance.setTransform(-47.5, -50);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-47.5, -50, 95, 100);
    p.frameBounds = [rect];


    (lib.Interpolar33 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKpart();
        this.instance.setTransform(-47.5, -50);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-47.5, -50, 95, 100);
    p.frameBounds = [rect];


    (lib.Interpolar32 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.L1NKpart();
        this.instance.setTransform(-47.5, -50);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-47.5, -50, 95, 100);
    p.frameBounds = [rect];


    (lib.Interpolar29 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.ME64part();
        this.instance.setTransform(-64.5, -58.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-64.5, -58.5, 129, 117);
    p.frameBounds = [rect];


    (lib.Interpolar28 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.ME64part();
        this.instance.setTransform(-64.5, -58.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-64.5, -58.5, 129, 117);
    p.frameBounds = [rect];


    (lib.Interpolar26 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMleg2();
        this.instance.setTransform(-54.5, -55.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-54.5, -55.5, 109, 111);
    p.frameBounds = [rect];


    (lib.Interpolar24 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMpart();
        this.instance.setTransform(-26, -63);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-26, -63, 52, 126);
    p.frameBounds = [rect];


    (lib.Interpolar23 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMleg2();
        this.instance.setTransform(-54.5, -55.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-54.5, -55.5, 109, 111);
    p.frameBounds = [rect];


    (lib.Interpolar22 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMleg2();
        this.instance.setTransform(-54.5, -55.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-54.5, -55.5, 109, 111);
    p.frameBounds = [rect];


    (lib.Interpolar21 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMpart();
        this.instance.setTransform(-26, -63);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-26, -63, 52, 126);
    p.frameBounds = [rect];


    (lib.Interpolar20 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.RDMpart();
        this.instance.setTransform(-26, -63);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-26, -63, 52, 126);
    p.frameBounds = [rect];


    (lib.Interpolar19 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part1();
        this.instance.setTransform(-64, -138.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-64, -138.5, 128, 277);
    p.frameBounds = [rect];


    (lib.Interpolar18 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part2();
        this.instance.setTransform(-74.1, -142.7, 0.933, 0.933);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-74.1, -142.7, 148.3, 285.4);
    p.frameBounds = [rect];


    (lib.Interpolar17 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part3();
        this.instance.setTransform(-167, -209.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-167, -209.5, 334, 419);
    p.frameBounds = [rect];


    (lib.Interpolar15 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part3();
        this.instance.setTransform(-167, -209.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-167, -209.5, 334, 419);
    p.frameBounds = [rect];


    (lib.Interpolar13 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part1();
        this.instance.setTransform(-64, -138.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-64, -138.5, 128, 277);
    p.frameBounds = [rect];


    (lib.Interpolar11 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.P1K4part2();
        this.instance.setTransform(-74.1, -142.7, 0.933, 0.933);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-74.1, -142.7, 148.3, 285.4);
    p.frameBounds = [rect];


    (lib.Interpolar9 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.arm2();
        this.instance.setTransform(-101.5, -107);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-101.5, -107, 203, 214);
    p.frameBounds = [rect];


    (lib.Interpolar7 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.arm1();
        this.instance.setTransform(-85.5, -108.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-85.5, -108.5, 171, 217);
    p.frameBounds = [rect];


    (lib.Interpolar5 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.leg1();
        this.instance.setTransform(-71.5, -111);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-71.5, -111, 143, 222);
    p.frameBounds = [rect];


    (lib.Interpolar3 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.leg2();
        this.instance.setTransform(-66, -116.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-66, -116.5, 132, 233);
    p.frameBounds = [rect];


    (lib.Interpolar1 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.body();
        this.instance.setTransform(-261, -223.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-261, -223.5, 522, 447);
    p.frameBounds = [rect];


    (lib.Bot18 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 3
        this.instance = new lib.Y05Yarm1();
        this.instance.setTransform(-528.1, 119.6);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({ rotation: 15, x: -513.8, y: 75.3 }, 0).wait(20).to({ rotation: -8.2, x: -529.2, y: 137.6 }, 0).wait(22).to({ rotation: 0, x: -528.1, y: 119.6 }, 0).wait(1));

        // Camada 4
        this.instance_1 = new lib.Y05Ybody();
        this.instance_1.setTransform(-996.6, -718.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ y: -702.5 }, 0).wait(20).to({ y: -734.5 }, 0).wait(22).to({ y: -718.5 }, 0).wait(1));

        // Camada 2
        this.instance_2 = new lib.Y05Yarm2();
        this.instance_2.setTransform(-790.6, 68);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ rotation: 7.2, x: -782.1, y: 51.4 }, 0).wait(20).to({ rotation: -5.7, x: -794.5, y: 78.3 }, 0).wait(22).to({ rotation: 0, x: -790.6, y: 68 }, 0).wait(1));

        // Camada 5
        this.instance_3 = new lib.Y05Yleg();
        this.instance_3.setTransform(-351, 49.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(17).to({ scaleX: 1.01, scaleY: 0.98, x: -355, y: 69.6 }, 0).wait(20).to({ scaleX: 0.99, scaleY: 1.01, x: -343, y: 37.5 }, 0).wait(22).to({ scaleX: 1, scaleY: 1, x: -351, y: 49.5 }, 0).wait(1));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("EgqoALYQxskuABmqQgBmoRskvQRskvY8AAQY9AARsEvQRrEvABGoQgBGqxrEuQxsEw49gBQ48ABxskwg");
        this.shape.setTransform(43.1, 859.7);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-996.6, -718.5, 1767, 1681.4);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-996.6, -732.9, 1767, 1695.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-996.6, -734.5, 1767, 1697.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-996.6, -718.5, 1767, 1681.4)];


    (lib.Bot17 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.TBLKarm();
        this.instance.setTransform(-70.1, 94.6, 1, 1, -39.9);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({ rotation: -47.9, x: -69.1, y: 129.3 }, 0).wait(12).to({ rotation: -39.9, x: -70.1, y: 94.6 }, 0).wait(13).to({ rotation: -47.9, x: -69.1, y: 129.3 }, 0).wait(25).to({ rotation: -39.9, x: -70.1, y: 94.6 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.TBLKarm();
        this.instance_1.setTransform(259.7, -164.6, 1, 1, -39.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({ rotation: -47.4, x: 269.1, y: -144.6 }, 0).wait(12).to({ rotation: -39.9, x: 259.7, y: -164.6 }, 0).wait(13).to({ rotation: -47.4, x: 269.1, y: -144.6 }, 0).wait(25).to({ rotation: -39.9, x: 259.7, y: -164.6 }, 0).wait(1));

        // Camada 3
        this.instance_2 = new lib.TBLKbody();
        this.instance_2.setTransform(-383.7, -31.8, 1, 1, -39.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({ y: -3.8 }, 0).wait(12).to({ y: -31.8 }, 0).wait(13).to({ y: -3.8 }, 0).wait(25).to({ y: -31.8 }, 0).wait(1));

        // Camada 4
        this.instance_3 = new lib.TBLKleg();
        this.instance_3.setTransform(66.6, 143.8, 1, 1, -39.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({ y: 171.8 }, 0).wait(12).to({ y: 143.8 }, 0).wait(13).to({ y: 171.8 }, 0).wait(25).to({ y: 143.8 }, 0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-383.7, -544.8, 954.4, 944.6);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-383.7, -541.6, 954.4, 945.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-383.7, -544.8, 954.4, 945.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-383.7, -542.9, 954.4, 946.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-383.7, -544.8, 954.4, 920.5)];


    (lib.Bot16 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 4
        this.instance = new lib.GGSTpart();
        this.instance.setTransform(-26.6, -516.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({ rotation: 4.7, x: -11.8, y: -493 }, 0).wait(20).to({ x: -7.8 }, 0).wait(22).to({ rotation: 0, x: -26.6, y: -516.5 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.GGSTbody2();
        this.instance_1.setTransform(-183.4, -350.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ y: -326.2 }, 0).wait(20).to({ y: -330.2 }, 0).wait(22).to({ y: -350.2 }, 0).wait(1));

        // Camada 1
        this.instance_2 = new lib.GGSTbody1();
        this.instance_2.setTransform(-187.6, -290.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ y: -282.8 }, 0).wait(42).to({ y: -290.8 }, 0).wait(1));

        // Camada 3
        this.instance_3 = new lib.GGSTleg();
        this.instance_3.setTransform(-167.2, 133.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFaQpJiQAAjKQAAjJJJiRQJJiQM6AAQM7AAJJCQQJJCRABDJQgBDKpJCQQpJCRs7AAQs6AApJiRg");
        this.shape.setTransform(13.7, 218.3);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-187.6, -516.5, 402, 784);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-187.6, -493, 402, 760.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-187.6, -515.3, 402, 782.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-187.6, -516.5, 402, 784)];


    (lib.Bot15 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 2
        this.instance = new lib.P4CMpart();
        this.instance.setTransform(2.9, -56.9);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

        // Camada 3
        this.instance_1 = new lib.P4CMbody2();
        this.instance_1.setTransform(-355.7, -297.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ rotation: 4.7, x: -329.4, y: -324.5 }, 0).wait(20).to({ rotation: -3, x: -370.8, y: -276 }, 0).wait(22).to({ rotation: 0, x: -355.7, y: -297.7 }, 0).wait(1));

        // Camada 4
        this.instance_2 = new lib.P4CMbody1();
        this.instance_2.setTransform(-323.7, -192);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ y: -186 }, 0).wait(20).to({ y: -195 }, 0).wait(22).to({ y: -192 }, 0).wait(1));

        // Camada 5
        this.instance_3 = new lib.P4CMleg();
        this.instance_3.setTransform(-178.9, 158.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpJiRgBjKQABjKJJiPQJJiRM6AAQM7AAJJCRQJJCPAADKQAADKpJCRQpJCQs7AAQs6AApJiQg");
        this.shape.setTransform(5.3, 257.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-358.4, -322.1, 607.1, 628.8);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-368.5, -324.5, 619.2, 631.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-370.8, -306, 599.7, 612.7), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-355.7, -297.7, 582, 604.4)];


    (lib.Bot14 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 4
        this.instance = new lib.RGSTpart();
        this.instance.setTransform(-26.6, -516.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({ rotation: -15, x: -73.3, y: -490.6 }, 0).wait(20).to({ rotation: 4.7, x: -12.8, y: -519.5 }, 0).wait(22).to({ rotation: 0, x: -26.6, y: -516.5 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.RGSTbody2();
        this.instance_1.setTransform(-187.4, -350.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ y: -338 }, 0).wait(20).to({ y: -356.2 }, 0).wait(22).to({ y: -350.2 }, 0).wait(1));

        // Camada 1
        this.instance_2 = new lib.RGSTbody1();
        this.instance_2.setTransform(-187.6, -248.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ y: -254.2 }, 0).wait(20).to({ y: -245.1 }, 0).wait(22).to({ y: -248.1 }, 0).wait(1));

        // Camada 3
        this.instance_3 = new lib.RGSTleg();
        this.instance_3.setTransform(-167.2, 133.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFaQpJiQAAjKQAAjJJJiRQJJiQM6AAQM7AAJJCQQJJCRABDJQgBDKpJCQQpJCRs7AAQs6AApJiRg");
        this.shape.setTransform(13.7, 218.3);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-187.6, -516.5, 402, 784);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-187.6, -518.3, 402, 785.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-187.6, -519.5, 402, 787), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-187.6, -516.5, 402, 784)];


    (lib.Bot12 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 2
        this.instance = new lib.SH06leg1();
        this.instance.setTransform(-215.9, -110.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({ y: -106.5 }, 0).wait(4).to({ y: -102.5 }, 0).wait(4).to({ y: -106.5 }, 0).wait(4).to({ y: -102.5 }, 0).wait(4).to({ y: -106.5 }, 0).wait(4).to({ y: -102.5 }, 0).wait(4).to({ y: -106.5 }, 0).wait(4).to({ y: -102.5 }, 0).wait(14).to({ y: -110.5 }, 0).wait(1));

        // Camada 1
        this.instance_1 = new lib.SH06body();
        this.instance_1.setTransform(-240, -444.9);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ y: -436.9 }, 0).wait(4).to({ y: -432.9 }, 0).wait(4).to({ y: -436.9 }, 0).wait(4).to({ y: -432.9 }, 0).wait(4).to({ y: -436.9 }, 0).wait(4).to({ y: -432.9 }, 0).wait(4).to({ y: -436.9 }, 0).wait(4).to({ y: -432.9 }, 0).wait(14).to({ y: -444.9 }, 0).wait(1));

        // Camada 3
        this.instance_2 = new lib.SH06leg3();
        this.instance_2.setTransform(-128, 32);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ scaleX: 1.04, scaleY: 0.96, x: -134, y: 42 }, 0).wait(42).to({ scaleX: 1, scaleY: 1, x: -128, y: 32 }, 0).wait(1));

        // Camada 4
        this.instance_3 = new lib.SH06leg2();
        this.instance_3.setTransform(-49, -79);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(17).to({ y: -71 }, 0).wait(4).to({ y: -67 }, 0).wait(4).to({ y: -71 }, 0).wait(4).to({ y: -67 }, 0).wait(4).to({ y: -71 }, 0).wait(4).to({ y: -67 }, 0).wait(4).to({ y: -71 }, 0).wait(4).to({ y: -67 }, 0).wait(14).to({ y: -79 }, 0).wait(1));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpJiRgBjKQABjKJJiPQJJiRM6AAQM7AAJJCRQJJCPAADKQAADKpJCRQpJCQs7AAQs6AApJiQg");
        this.shape.setTransform(5.3, 257.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-240, -444.9, 557, 751.6);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-240, -436.9, 557, 743.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -435.9, 557, 742.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -436.9, 557, 743.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -435.9, 557, 742.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -436.9, 557, 743.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -435.9, 557, 742.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -436.9, 557, 743.6), rect, rect, rect, rect = new cjs.Rectangle(-240, -444.1, 557, 750.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-240, -444.9, 557, 751.6)];


    (lib.Bot11 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 7
        this.instance = new lib.BUMpart();
        this.instance.setTransform(-56.8, -334);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(13).to({ rotation: 5.7, x: -47.6, y: -330.7 }, 0).wait(15).to({ rotation: 0, x: -56.8, y: -334 }, 0).wait(15).to({ rotation: 5.7, x: -47.6, y: -330.7 }, 0).wait(16).to({ rotation: 0, x: -56.8, y: -334 }, 0).wait(1));

        // Camada 1
        this.instance_1 = new lib.BUMbody();
        this.instance_1.setTransform(-213.1, -238.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(13).to({ y: -230.2 }, 0).wait(15).to({ y: -238.6 }, 0).wait(15).to({ y: -230.2 }, 0).wait(16).to({ y: -238.6 }, 0).wait(1));

        // Camada 3
        this.instance_2 = new lib.BUMleg1();
        this.instance_2.setTransform(-123.8, 183.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

        // Camada 6
        this.instance_3 = new lib.BUMleg2();
        this.instance_3.setTransform(-79.7, 137.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(13).to({ scaleX: 1.03, scaleY: 0.89, x: -82.5, y: 144.2 }, 0).wait(15).to({ scaleX: 1, scaleY: 1, x: -79.7, y: 137.2 }, 0).wait(15).to({ scaleX: 1.03, scaleY: 0.89, x: -82.5, y: 144.2 }, 0).wait(16).to({ scaleX: 1, scaleY: 1, x: -79.7, y: 137.2 }, 0).wait(1));

        // Camada 2
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("AxaERQnOhxAAigQAAifHOhyQHPhxKLAAQKMAAHOBxQHOByABCfQgBCgnOBxQnOBzqMgBQqLABnPhzg");
        this.shape.setTransform(5.3, 251.9);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-213.1, -334, 461, 624.8);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-213.1, -333.8, 461, 624.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-213.1, -334, 461, 624.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-213.1, -333.8, 461, 624.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-213.1, -334, 461, 624.8)];


    (lib.Bot10 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.BJKZarm2();
        this.instance.setTransform(212.6, 18.6);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({ rotation: -15, x: 203.3, y: 46.7 }, 0).wait(15).to({ rotation: 0, x: 212.6, y: 18.6 }, 0).wait(15).to({ rotation: -15, x: 203.3, y: 46.7 }, 0).wait(15).to({ rotation: 0, x: 212.6, y: 18.6 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.BJKZpart();
        this.instance_1.setTransform(-362.8, -599.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({ y: -578.3 }, 0).wait(15).to({ y: -599.5 }, 0).wait(15).to({ y: -578.3 }, 0).wait(15).to({ y: -599.5 }, 0).wait(1));

        // Camada 3
        this.instance_2 = new lib.BJKZbody();
        this.instance_2.setTransform(-357.5, -312.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({ y: -285.7 }, 0).wait(15).to({ y: -312.2 }, 0).wait(15).to({ y: -285.7 }, 0).wait(15).to({ y: -312.2 }, 0).wait(1));

        // Camada 4
        this.instance_3 = new lib.BJKZarm1();
        this.instance_3.setTransform(-478.3, 75.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({ rotation: 15, x: -461, y: 51.3 }, 0).wait(15).to({ rotation: 0, x: -478.3, y: 75.5 }, 0).wait(15).to({ rotation: 15, x: -461, y: 51.3 }, 0).wait(15).to({ rotation: 0, x: -478.3, y: 75.5 }, 0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-515.8, -599.5, 959.3, 962.9);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-518.7, -598.1, 965.8, 963.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-516, -599.5, 959.6, 963.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-518.7, -598.1, 965.8, 963.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-478.3, -599.5, 873.9, 938.3)];


    (lib.Bot09 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 4
        this.instance = new lib.BGSTpart();
        this.instance.setTransform(-26.6, -516.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({ rotation: -7, x: -45.7, y: -516.3 }, 0).wait(20).to({ rotation: 3.7, x: -15.1, y: -518.9 }, 0).wait(22).to({ rotation: 0, x: -26.6, y: -516.5 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.BGSTbody2();
        this.instance_1.setTransform(-187.4, -350.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(17).to({ rotation: 2, x: -182.5, y: -361.9 }, 0).wait(20).to({ rotation: -2.2, x: -192.7, y: -342.6 }, 0).wait(22).to({ rotation: 0, x: -187.4, y: -350.2 }, 0).wait(1));

        // Camada 1
        this.instance_2 = new lib.BGSTbody1();
        this.instance_2.setTransform(-187.6, -248.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({ y: -242.8 }, 0).wait(20).to({ y: -248.1 }, 0).wait(23));

        // Camada 3
        this.instance_3 = new lib.BGSTleg();
        this.instance_3.setTransform(-167.2, 133.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFaQpJiQAAjKQAAjJJJiRQJJiQM6AAQM7AAJJCQQJJCRABDJQgBDKpJCQQpJCRs7AAQs6AApJiRg");
        this.shape.setTransform(13.7, 218.3);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-191.7, -525.4, 406.1, 792.9);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-192.2, -526, 406.5, 793.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-192.7, -518.9, 407.1, 786.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-187.6, -516.5, 402, 784)];


    (lib.Bot08 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 2
        this.instance = new lib.KON6arm1();
        this.instance.setTransform(-271.2, -435.3);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({ y: -429.7 }, 0).wait(12).to({ y: -435.3 }, 0).wait(13).to({ y: -429.7 }, 0).wait(25).to({ y: -435.3 }, 0).wait(1));

        // Camada 3
        this.instance_1 = new lib.KON6body();
        this.instance_1.setTransform(-358.3, -389.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({ y: -373 }, 0).wait(12).to({ y: -389.8 }, 0).wait(13).to({ y: -373 }, 0).wait(25).to({ y: -389.8 }, 0).wait(1));

        // Camada 4
        this.instance_2 = new lib.KON6arm2();
        this.instance_2.setTransform(114.2, -391.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({ y: -385.7 }, 0).wait(12).to({ y: -391.3 }, 0).wait(13).to({ y: -385.7 }, 0).wait(25).to({ y: -391.3 }, 0).wait(1));

        // Camada 5
        this.instance_3 = new lib.KON6leg2();
        this.instance_3.setTransform(-388.5, -19.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({ y: -2.9 }, 0).wait(12).to({ y: -19.7 }, 0).wait(13).to({ y: -2.9 }, 0).wait(25).to({ y: -19.7 }, 0).wait(1));

        // Camada 1
        this.instance_4 = new lib.KON6leg1();
        this.instance_4.setTransform(-398.8, 191.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({ scaleX: 1.01, scaleY: 0.97, x: -404.4, y: 199.6 }, 0).wait(12).to({ scaleX: 1, scaleY: 1, x: -398.8, y: 191.2 }, 0).wait(13).to({ scaleX: 1.01, scaleY: 0.97, x: -404.4, y: 199.6 }, 0).wait(25).to({ scaleX: 1, scaleY: 1, x: -398.8, y: 191.2 }, 0).wait(1));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("EgpIAIjQxEjjABlAQgBk/REjkQRDjkYFABQYFgBREDkQRDDkAAE/QAAFAxDDjQxEDk4FAAQ4FAAxDjkg");
        this.shape.setTransform(47.7, 382.6);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-403.8, -435.3, 912, 897.6);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-404.4, -434.8, 912.6, 897.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-404, -435.3, 912.2, 897.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-404.4, -435.1, 912.6, 897.4), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-398.8, -435.3, 907, 897.5)];


    (lib.Bot06 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 2
        this.instance = new lib.KR8Ybody();
        this.instance.setTransform(-232.4, -301.9);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({ y: -293.9 }, 0).wait(13).to({ y: -301.9 }, 0).wait(13).to({ y: -309.9 }, 0).wait(13).to({ y: -301.9 }, 0).wait(1));

        // Camada 3
        this.instance_1 = new lib.KR8Yleg();
        this.instance_1.setTransform(187.9, 110.1, 0.998, 0.998, -109.9);

        this.instance_2 = new lib.KR8Yleg();
        this.instance_2.setTransform(-38.3, 103.3, 0.998, 0.998, -34.9);

        this.instance_3 = new lib.KR8Yleg();
        this.instance_3.setTransform(-237.1, -22, 0.998, 0.998, -4.9);

        this.instance_4 = new lib.KR8Yleg();
        this.instance_4.setTransform(-80.3, -30.4, 0.998, 0.998, -34.9);

        this.instance_5 = new lib.KR8Yleg();
        this.instance_5.setTransform(-80.3, -30.4, 0.998, 0.998, -34.9);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }, 3).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }, 3).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }, 3).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }, 3).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -4.9, x: -237.1, y: -22 } }, { t: this.instance_2, p: { rotation: -34.9, x: -38.3, y: 103.3 } }, { t: this.instance_1, p: { rotation: -109.9, x: 187.9, y: 110.1 } }] }, 3).to({ state: [{ t: this.instance_5 }, { t: this.instance_4, p: { rotation: -19.9, x: -184.9, y: 40.8 } }, { t: this.instance_3, p: { rotation: -64.9, x: 47.2, y: 139.5 } }, { t: this.instance_2, p: { rotation: -109.9, x: 175.9, y: 90.1 } }, { t: this.instance_1, p: { rotation: 2.6, x: -216.1, y: -82.5 } }] }, 3).to({ state: [{ t: this.instance_4, p: { rotation: -34.9, x: -80.3, y: -30.4 } }, { t: this.instance_3, p: { rotation: -34.9, x: -110.5, y: 90.3 } }, { t: this.instance_2, p: { rotation: -79.9, x: 132.3, y: 126.4 } }, { t: this.instance_1, p: { rotation: -4.9, x: -237.1, y: -42 } }] }, 3).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-237.1, -301.9, 525.5, 492.9);
    p.frameBounds = [rect, rect, rect, rect = new cjs.Rectangle(-232.4, -301.9, 508.8, 486.8), rect, rect, rect = new cjs.Rectangle(-237.1, -301.9, 505.7, 479.9), rect, rect, rect = new cjs.Rectangle(-237.1, -301.9, 525.5, 492.9), rect, rect, rect = new cjs.Rectangle(-232.4, -301.3, 508.8, 486.2), rect, rect, rect = new cjs.Rectangle(-237.1, -301.3, 505.7, 479.3), rect, rect, rect = new cjs.Rectangle(-237.1, -301.3, 525.5, 492.3), rect, rect, rect = new cjs.Rectangle(-232.4, -301.3, 508.8, 486.2), rect, rect, new cjs.Rectangle(-237.1, -301.3, 505.7, 479.3), rect = new cjs.Rectangle(-237.1, -309.3, 505.7, 487.3), rect, rect = new cjs.Rectangle(-237.1, -309.3, 525.5, 500.3), rect, rect, rect = new cjs.Rectangle(-232.4, -309.3, 508.8, 494.2), rect, rect, rect = new cjs.Rectangle(-237.1, -309.3, 505.7, 487.3), rect, rect, rect = new cjs.Rectangle(-237.1, -309.3, 525.5, 500.3), rect, new cjs.Rectangle(-237.1, -309.9, 525.5, 500.9), rect = new cjs.Rectangle(-232.4, -309.9, 508.8, 494.8), rect, rect, rect = new cjs.Rectangle(-237.1, -309.9, 505.7, 487.9), rect, rect, rect = new cjs.Rectangle(-237.1, -309.9, 525.5, 500.9), rect, rect, rect = new cjs.Rectangle(-232.4, -309.9, 508.8, 494.8), rect, rect, new cjs.Rectangle(-237.1, -301.9, 505.7, 479.9)];


    (lib.Bot05 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.B00Mbody();
        this.instance.setTransform(-270.3, -257.7);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({ y: -255 }, 0).wait(3).to({ y: -257.7 }, 0).wait(3).to({ y: -260.4 }, 0).wait(1));

        // Camada 2
        this.instance_1 = new lib.B00Mleg();
        this.instance_1.setTransform(-270.3, 90.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("EgiDAIXQuIjegBk5QABk4OIjeQOHjfT8AAQT9AAOHDfQOIDeABE4QgBE5uIDeQuHDfz9AAQz8AAuHjfg");
        this.shape.setTransform(15.8, 239.7);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(10));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-292.7, -257.7, 617, 578.5);
    p.frameBounds = [rect, rect, rect, rect = new cjs.Rectangle(-292.7, -256.8, 617, 577.6), rect, rect, rect = new cjs.Rectangle(-292.7, -259.5, 617, 580.3), rect, rect, new cjs.Rectangle(-292.7, -260.4, 617, 581.2)];


    (lib.SN35jump = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Interpolar1()//;("synched", 0);
        this.instance.setTransform(-14, -126.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ y: -80.8 }, 6).to({ scaleY: 1.03, rotation: -15, x: -38, y: -242.7 }, 6).to({ y: -258.7 }, 6).to({ y: -242.7 }, 6).to({ scaleY: 1, rotation: 0, x: -14, y: -126.5 }, 5).to({ y: -116.8 }, 8).to({ y: -126.5 }, 7).wait(1));

        // Camada 2
        this.instance_1 = new lib.Interpolar3()//;("synched", 0);
        this.instance_1.setTransform(169, 157.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleX: 1.03, scaleY: 0.96, x: 185, y: 163.8 }, 6).to({ scaleX: 1.02, scaleY: 1.1, rotation: -45, x: 265.5, y: -36.3 }, 6).to({ scaleX: 1, scaleY: 1, rotation: 15, x: 195, y: -24 }, 6).to({ rotation: -15, x: 235, y: -28 }, 6).to({ rotation: 0, x: 169, y: 157.5 }, 5).to({ scaleX: 1.03, scaleY: 0.96, x: 185, y: 163.8 }, 8).to({ scaleX: 1, scaleY: 1, x: 169, y: 157.5 }, 7).wait(1));

        // Camada 3
        this.instance_2 = new lib.Interpolar5()//;("synched", 0);
        this.instance_2.setTransform(-143.5, 173);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ scaleX: 1.04, scaleY: 0.97, x: -159.5, y: 175 }, 6).to({ scaleX: 1.03, scaleY: 1.19, x: -93.5, y: 86.3 }, 6).to({ scaleX: 1, scaleY: 1, rotation: -60, x: -11.5, y: 43 }, 6).to({ y: 59 }, 6).to({ rotation: 0, x: -143.5, y: 173 }, 5).to({ scaleX: 1.04, scaleY: 0.97, x: -159.5, y: 175 }, 8).to({ scaleX: 1, scaleY: 1, x: -143.5, y: 173 }, 7).wait(1));

        // Camada 4
        this.instance_3 = new lib.Interpolar7()//;("synched", 0);
        this.instance_3.setTransform(-329.5, -41.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ rotation: 52.2, x: -379.7, y: -90.7 }, 6).to({ scaleX: 1, scaleY: 1.1, rotation: -20.2, x: -312.1, y: -82.8 }, 6).to({ scaleX: 1, scaleY: 1, rotation: 0, x: -351, y: -114 }, 6).to({ y: -98 }, 6).to({ x: -329.5, y: -41.4 }, 5).to({ rotation: 22.2, x: -363.7, y: -72.7 }, 8).to({ rotation: 0, x: -329.5, y: -41.4 }, 7).wait(1));

        // Camada 5
        this.instance_4 = new lib.Interpolar9()//;("synched", 0);
        this.instance_4.setTransform(314.7, -73);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ rotation: -60, x: 346.3, y: -145.8 }, 6).to({ scaleX: 1, scaleY: 1.11, rotation: -9.8, x: 283.8, y: -260.8 }, 6).to({ rotation: -24.8, x: 303.8, y: -300.8 }, 6).to({ y: -284.8 }, 6).to({ scaleX: 1, scaleY: 1, rotation: 0, x: 314.7, y: -73 }, 5).to({ rotation: -15, x: 334.3, y: -91.8 }, 8).to({ rotation: 0, x: 314.7, y: -73 }, 7).wait(1));

        // Camada 6
        this.instance_5 = new lib.Interpolar44()//;("synched", 0);
        this.instance_5.setTransform(5.3, 257.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ startPosition: 0 }, 8).to({ scaleX: 0.75, scaleY: 0.75 }, 10).to({ startPosition: 0 }, 6).to({ scaleX: 1, scaleY: 1 }, 5).wait(16));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-507.9, -350, 995.9, 656.7);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-517.9, -495.8, 1007.6, 802.5), rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-436.1, -546.1, 875.3, 852.8), rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-436.5, -549.6, 882.2, 844), rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-436.5, -533.6, 882.2, 837.8), rect, rect, rect, rect, rect = new cjs.Rectangle(-475.9, -350, 930.7, 656.7), rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-483.9, -348.6, 944, 655.3), rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-415, -350, 831.2, 656.7)];


    (lib.SN35noarm = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Interpolar1()//;("synched", 0);
        this.instance.setTransform(-14, -126.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ y: -120.8 }, 17).to({ y: -122.7 }, 20).to({ y: -126.5 }, 22).wait(1));

        // Camada 2
        this.instance_1 = new lib.Interpolar3()//;("synched", 0);
        this.instance_1.setTransform(169, 157.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleX: 1.03, scaleY: 0.96, y: 163.8 }, 17).to({ scaleX: 1.02, scaleY: 0.97, y: 161.7 }, 20).to({ scaleX: 1, scaleY: 1, y: 157.5 }, 22).wait(1));

        // Camada 3
        this.instance_2 = new lib.Interpolar5()//;("synched", 0);
        this.instance_2.setTransform(-143.5, 173);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ scaleX: 1.04, scaleY: 0.97, y: 175 }, 17).to({ scaleX: 1.03, scaleY: 0.98, y: 174.3 }, 20).to({ scaleX: 1, scaleY: 1, y: 173 }, 22).wait(1));

        // Camada 4
        this.instance_3 = new lib.Interpolar7()//;("synched", 0);
        this.instance_3.setTransform(-265.5, -1.4, 1, 1, -30);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ rotation: -22.4, x: -279.5, y: -3.4 }, 17).to({ rotation: -26.6, x: -273.5, y: -1.4 }, 20).to({ rotation: -30, x: -265.5 }, 22).wait(1));

        // Camada 5
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpJiRgBjKQABjKJJiPQJJiRM6AAQM7AAJJCRQJJCPAADKQAADKpJCRQpJCQs7AAQs6AApJiQg");
        this.shape.setTransform(5.3, 257.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-399.4, -350, 646.5, 656.7);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-399.9, -346.1, 647, 652.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-398.6, -349.8, 645.6, 656.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-393.8, -350, 640.9, 656.7)];


    (lib.Bot13 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.DD1arm1();
        this.instance.setTransform(-357.7, -430.2);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({ rotation: 15, x: -277.7, y: -443.3 }, 0).wait(12).to({ rotation: 0, x: -357.7, y: -430.2 }, 0).wait(13).to({ rotation: 15, x: -277.7, y: -443.3 }, 0).wait(25).to({ rotation: 0, x: -357.7, y: -430.2 }, 0).wait(1));

        // Camada 3
        this.instance_1 = new lib.DD1body();
        this.instance_1.setTransform(-166.3, -290.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({ y: -250.9 }, 0).wait(12).to({ y: -290.1 }, 0).wait(13).to({ y: -250.9 }, 0).wait(25).to({ y: -290.1 }, 0).wait(1));

        // Camada 2
        this.instance_2 = new lib.DD1arm2();
        this.instance_2.setTransform(164.6, -414.8, 1, 1, 10);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({ rotation: -1.5, x: 106.6, y: -371.9 }, 0).wait(12).to({ rotation: 10, x: 164.6, y: -414.8 }, 0).wait(13).to({ rotation: -1, x: 109.3, y: -372.4 }, 0).wait(25).to({ rotation: 10, x: 164.6, y: -414.8 }, 0).wait(1));

        // Camada 8
        this.instance_3 = new lib.Interpolar45()//;("synched", 0);
        this.instance_3.setTransform(-146.7, 219.5);

        this.instance_4 = new lib.Interpolar46()//;("synched", 0);
        this.instance_4.setTransform(-146.7, 247.5);
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ _off: true, y: 247.5 }, 9).to({ _off: false, y: 219.5 }, 12).to({ _off: true, y: 247.5 }, 13).to({ _off: false, y: 219.5 }, 25).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ _off: false }, 9).to({ _off: true, y: 219.5 }, 12).to({ _off: false, y: 247.5 }, 13).to({ _off: true, y: 219.5 }, 25).wait(1));

        // Camada 5
        this.instance_5 = new lib.DD1leg2();
        this.instance_5.setTransform(77.5, 92.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({ y: 120.4 }, 0).wait(12).to({ y: 92.4 }, 0).wait(13).to({ y: 120.4 }, 0).wait(25).to({ y: 92.4 }, 0).wait(1));

        // Camada 4
        this.instance_6 = new lib.DD1part();
        this.instance_6.setTransform(-373.7, -97.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(9).to({ rotation: 15, x: -320.3, y: -115.2 }, 0).wait(12).to({ rotation: 0, x: -373.7, y: -97.6 }, 0).wait(13).to({ rotation: 15, x: -320.3, y: -115.2 }, 0).wait(25).to({ rotation: 0, x: -373.7, y: -97.6 }, 0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-382.7, -442.3, 781.7, 814.7);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-383.4, -443.3, 778, 818.9), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-382.9, -442.5, 781.9, 815.9), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-383.4, -443.3, 780.2, 818.9), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-373.7, -430.2, 772.8, 777.8)];


    (lib.Bot07 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 5
        this.instance = new lib.ME64arm2();
        this.instance.setTransform(174.9, -178.8);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({ rotation: -5.4, y: -173.4 }, 0).wait(24).to({ rotation: 0, y: -178.8 }, 0).wait(17));

        // Camada 1
        this.instance_1 = new lib.ME64body();
        this.instance_1.setTransform(-239.4, -340.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({ y: -335.1 }, 0).wait(24).to({ y: -340.5 }, 0).wait(17));

        // Camada 6
        this.instance_2 = new lib.Interpolar28()//;("synched", 0);
        this.instance_2.setTransform(203, -373.9);

        this.instance_3 = new lib.Interpolar29()//;("synched", 0);
        this.instance_3.setTransform(194.8, -381.7, 1, 1, -7.4);
        this.instance_3._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ _off: true, rotation: -7.4, x: 194.8, y: -381.7 }, 9).wait(4).to({ _off: false, rotation: 0, x: 203, y: -373.9 }, 20).to({ rotation: 6, x: 208.7, y: -366.8 }, 8).to({ rotation: 0, x: 203, y: -373.9 }, 8).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ _off: false }, 9).to({ rotation: -12.6, x: 188.6, y: -386.6 }, 4).to({ _off: true, rotation: 0, x: 203, y: -373.9 }, 20).wait(17));

        // Camada 2
        this.instance_4 = new lib.ME64leg1();
        this.instance_4.setTransform(-233.9, 75.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({ scaleX: 1.01, scaleY: 0.97, x: -236.5, y: 81.8 }, 0).wait(24).to({ scaleX: 1, scaleY: 1, x: -233.9, y: 75.2 }, 0).wait(17));

        // Camada 3
        this.instance_5 = new lib.ME64leg2();
        this.instance_5.setTransform(-159.4, -11.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({ y: -6.2 }, 0).wait(24).to({ y: -11.6 }, 0).wait(17));

        // Camada 4
        this.instance_6 = new lib.ME64arm1();
        this.instance_6.setTransform(-454.4, -140.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(9).to({ rotation: 4.2, x: -453.7, y: -155.3 }, 0).wait(24).to({ rotation: 0, x: -454.4, y: -140.5 }, 0).wait(17));

        // Camada 7
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A5AGJQqXikAAjlQAAjkKXikQKYijOogBQOpABKXCjQKYCkAADkQAADlqYCkQqXCkupAAQuoAAqYikg");
        this.shape.setTransform(-38.1, 264.1);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-474.1, -446.3, 873.7, 766.1);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-476.6, -455.4, 880, 775.2), rect, rect, rect, rect = new cjs.Rectangle(-476.6, -457.8, 880, 777.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-454.4, -432.4, 824.3, 752.2), rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-454.4, -432.1, 824.3, 751.9), rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-454.4, -432.4, 824.3, 752.2)];


    (lib.Bot04 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 6
        this.instance = new lib.Interpolar32()//;("synched", 0);
        this.instance.setTransform(191.5, -308.6);

        this.instance_1 = new lib.Interpolar33()//;("synched", 0);
        this.instance_1.setTransform(191.5, -300.5);
        this.instance_1._off = true;

        this.instance_2 = new lib.Interpolar34()//;("synched", 0);
        this.instance_2.setTransform(191.5, -292.4);
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true, y: -300.5 }, 12).wait(29).to({ _off: false, y: -308.6 }, 18).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ _off: false }, 12).to({ _off: true, y: -292.4 }, 14).to({ _off: false, y: -300.5 }, 15).to({ _off: true, y: -308.6 }, 18).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(12).to({ _off: false }, 14).to({ _off: true, y: -300.5 }, 15).wait(19));

        // Camada 8
        this.instance_3 = new lib.Interpolar36()//;("synched", 0);
        this.instance_3.setTransform(255.2, 78.8);

        this.instance_4 = new lib.Interpolar37()//;("synched", 0);
        this.instance_4.setTransform(252.5, 84.2);
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ _off: true, x: 252.5, y: 84.2 }, 14).wait(34).to({ _off: false, x: 255.2, y: 78.8 }, 11).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ _off: false }, 14).to({ y: 92.3 }, 15).to({ x: 255.2, y: 86.9 }, 19).to({ _off: true, y: 78.8 }, 11).wait(1));

        // Camada 7
        this.instance_5 = new lib.Interpolar38()//;("synched", 0);
        this.instance_5.setTransform(-406.1, -109.7);

        this.instance_6 = new lib.Interpolar39()//;("synched", 0);
        this.instance_6.setTransform(-422.3, -96.2, 1, 1, -5.7);
        this.instance_6._off = true;

        this.instance_7 = new lib.Interpolar43()//;("synched", 0);
        this.instance_7.setTransform(-406.1, -109.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_5 }] }).to({ state: [{ t: this.instance_6 }] }, 14).to({ state: [{ t: this.instance_6 }] }, 15).to({ state: [{ t: this.instance_6 }] }, 19).to({ state: [{ t: this.instance_7 }] }, 11).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ _off: true, rotation: -5.7, x: -422.3, y: -96.2 }, 14).wait(46));
        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ _off: false }, 14).to({ rotation: -8.7, x: -427.7, y: -80 }, 15).to({ rotation: -5.7, x: -422.3, y: -96.2 }, 19).to({ _off: true, rotation: 0, x: -406.1, y: -109.7 }, 11).wait(1));

        // Camada 1
        this.instance_8 = new lib.L1NKbody();
        this.instance_8.setTransform(-311, -331.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(14).to({ y: -337.1 }, 0).wait(15).to({ y: -331.7 }, 0).wait(19).to({ y: -337.1 }, 0).wait(11).to({ y: -331.7 }, 0).wait(1));

        // Camada 2
        this.instance_9 = new lib.L1NKleg();
        this.instance_9.setTransform(-216.5, 171);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(60));

        // Camada 9
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A5xGVQqsioAAjtQAAjsKsioQKsipPFAAQPFAAKtCpQKsCoAADsQAADtqsCoQqtCpvFAAQvFAAqsipg");
        this.shape.setTransform(-28.4, 249.2);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-612.8, -358.6, 955.5, 665.3);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-612.8, -350.5, 955.5, 657.2), rect, rect = new cjs.Rectangle(-629.6, -350.5, 969.6, 657.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-629.6, -350, 969.6, 656.7), rect, rect, rect = new cjs.Rectangle(-631.3, -350, 973.8, 656.7), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-631.3, -358.2, 973.8, 664.8), rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-615.6, -358.2, 958.3, 664.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-578.1, -358.6, 920.8, 665.3)];


    (lib.Bot03 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 7
        this.instance = new lib.Interpolar11()//;("synched", 0);
        this.instance.setTransform(-164.5, -202.3);

        this.instance_1 = new lib.Interpolar18()//;("synched", 0);
        this.instance_1.setTransform(-164.5, -202.3);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance }] }).to({ state: [{ t: this.instance }] }, 17).to({ state: [{ t: this.instance }] }, 20).to({ state: [{ t: this.instance_1 }] }, 22).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance).to({ rotation: -6.7, x: -180.7, y: -196.9 }, 17).to({ y: -188.8 }, 20).to({ _off: true, rotation: 0, x: -164.5, y: -202.3 }, 22).wait(1));

        // Camada 6
        this.instance_2 = new lib.Interpolar13()//;("synched", 0);
        this.instance_2.setTransform(213.2, -188.1);

        this.instance_3 = new lib.Interpolar19()//;("synched", 0);
        this.instance_3.setTransform(213.2, -188.1);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_2 }] }).to({ state: [{ t: this.instance_2 }] }, 17).to({ state: [{ t: this.instance_2 }] }, 20).to({ state: [{ t: this.instance_3 }] }, 22).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ rotation: 4.2, x: 221.1, y: -185.2 }, 17).to({ y: -177.1 }, 20).to({ _off: true, rotation: 0, x: 213.2, y: -188.1 }, 22).wait(1));

        // Camada 1
        this.instance_4 = new lib.P1K4body();
        this.instance_4.setTransform(-194.8, -170.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(37).to({ scaleX: 1.03, scaleY: 0.97, x: -200.1, y: -158.7 }, 0).wait(22).to({ scaleX: 1, scaleY: 1, x: -194.8, y: -170.7 }, 0).wait(1));

        // Camada 8
        this.instance_5 = new lib.Interpolar15()//;("synched", 0);
        this.instance_5.setTransform(329.9, 4.1);

        this.instance_6 = new lib.Interpolar17()//;("synched", 0);
        this.instance_6.setTransform(329.9, 4.1);

        this.instance_7 = new lib.P1K4part3();
        this.instance_7.setTransform(162.9, -205.4);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_5 }] }).to({ state: [{ t: this.instance_5 }] }, 17).to({ state: [{ t: this.instance_6 }] }, 20).to({ state: [{ t: this.instance_7 }] }, 22).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ rotation: 4.7, x: 346.6, y: 18.7 }, 17).to({ _off: true, rotation: 0, x: 329.9, y: 4.1 }, 20).wait(23));

        // Camada 9
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpJiRAAjKQAAjJJJiRQJJiQM6AAQM7AAJJCQQJJCRABDJQgBDKpJCRQpJCQs7AAQs6AApJiQg");
        this.shape.setTransform(10.9, 254.7);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-269.1, -347.1, 796.9, 651);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-271, -347.3, 801.3, 651.2), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-271, -344.8, 767.9, 648.7), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-238.7, -345, 735.6, 648.9)];


    (lib.Bot02 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 7
        this.instance = new lib.Interpolar20()//;("synched", 0);
        this.instance.setTransform(-24.9, -276.8, 1, 1, 9.2);

        this.instance_1 = new lib.Interpolar21()//;("synched", 0);
        this.instance_1.setTransform(-27.4, -278.3, 1, 1, 15);
        this.instance_1._off = true;

        this.instance_2 = new lib.Interpolar24()//;("synched", 0);
        this.instance_2.setTransform(-26.6, -276.4);
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true, rotation: 15, x: -27.4, y: -278.3 }, 13).to({ _off: false, rotation: 9.2, x: -24.9, y: -276.8 }, 15).to({ _off: true, rotation: 0, x: -26.6, y: -276.4 }, 15).to({ _off: false, rotation: 9.2, x: -24.9, y: -276.8 }, 16).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ _off: false }, 13).to({ _off: true, rotation: 9.2, x: -24.9, y: -276.8 }, 15).wait(32));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(28).to({ _off: false }, 15).to({ _off: true, rotation: 9.2, x: -24.9, y: -276.8 }, 16).wait(1));

        // Camada 1
        this.instance_3 = new lib.RDMbody();
        this.instance_3.setTransform(-213.1, -238.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(13).to({ x: -221.2 }, 0).wait(15).to({ x: -213.1 }, 0).wait(15).to({ x: -205 }, 0).wait(16).to({ x: -213.1 }, 0).wait(1));

        // Camada 3
        this.instance_4 = new lib.RDMleg1();
        this.instance_4.setTransform(-97.3, 183.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60));

        // Camada 6
        this.instance_5 = new lib.Interpolar22()//;("synched", 0);
        this.instance_5.setTransform(2.7, 181.8);

        this.instance_6 = new lib.Interpolar23()//;("synched", 0);
        this.instance_6.setTransform(0.2, 180.9, 1.05, 1.007, 0, -6.9, 0);
        this.instance_6._off = true;

        this.instance_7 = new lib.Interpolar26()//;("synched", 0);
        this.instance_7.setTransform(2.7, 181.8);
        this.instance_7._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ _off: true, scaleX: 1.05, scaleY: 1.01, skewX: -6.9, x: 0.2, y: 180.9 }, 13).wait(30).to({ _off: false, scaleX: 1, scaleY: 1, skewX: 0, x: 2.7, y: 181.8 }, 16).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ _off: false }, 13).to({ _off: true, scaleX: 1, scaleY: 1, skewX: 0, x: 2.7, y: 181.8 }, 15).wait(32));
        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(13).to({ _off: false }, 15).to({ scaleX: 1.02, scaleY: 1, skewX: 4.1, x: 3, y: 181.3 }, 15).to({ _off: true, scaleX: 1, scaleY: 1, skewX: 0, x: 2.7, y: 181.8 }, 16).wait(1));

        // Camada 8
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("AxQEPQnKhxAAieQAAidHKhxQHKhxKGAAQKHAAHKBxQHKBxAACdQAACenKBxQnKBxqHAAQqGAAnKhxg");
        this.shape.setTransform(-5.9, 251.9);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-220.6, -345.7, 468.5, 636.1);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-221.2, -345.9, 468.6, 636.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-213.1, -343.2, 468.6, 633.6), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-212.6, -342.9, 468.6, 633.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-213.1, -343.2, 461, 633.6)];


    (lib.Bot01 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Interpolar1()//;("synched", 0);
        this.instance.setTransform(-14, -126.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ y: -120.8 }, 17).to({ y: -122.7 }, 20).to({ y: -126.5 }, 22).wait(1));

        // Camada 2
        this.instance_1 = new lib.Interpolar3()//;("synched", 0);
        this.instance_1.setTransform(169, 157.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleX: 1.03, scaleY: 0.96, y: 163.8 }, 17).to({ scaleX: 1.02, scaleY: 0.97, y: 161.7 }, 20).to({ scaleX: 1, scaleY: 1, y: 157.5 }, 22).wait(1));

        // Camada 3
        this.instance_2 = new lib.Interpolar5()//;("synched", 0);
        this.instance_2.setTransform(-143.5, 173);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ scaleX: 1.04, scaleY: 0.97, y: 175 }, 17).to({ scaleX: 1.03, scaleY: 0.98, y: 174.3 }, 20).to({ scaleX: 1, scaleY: 1, y: 173 }, 22).wait(1));

        // Camada 4
        this.instance_3 = new lib.Interpolar7()//;("synched", 0);
        this.instance_3.setTransform(-329.5, -41.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ rotation: 15, x: -355.7, y: -70.7 }, 17).to({ scaleX: 1, scaleY: 1, rotation: 9.8, x: -347, y: -61 }, 20).to({ scaleX: 1, scaleY: 1, rotation: 0, x: -329.5, y: -41.4 }, 22).wait(1));

        // Camada 5
        this.instance_4 = new lib.Interpolar9()//;("synched", 0);
        this.instance_4.setTransform(314.7, -73);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ rotation: -15, x: 334.3, y: -93.8 }, 17).to({ scaleX: 1, scaleY: 1, rotation: -9.8, x: 327.8, y: -86.9 }, 20).to({ scaleX: 1, scaleY: 1, rotation: 0, x: 314.7, y: -73 }, 22).wait(1));

        // Camada 6
        this.shape = new cjs.Shape();
        this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A2DFbQpJiRgBjKQABjKJJiPQJJiRM6AAQM7AAJJCRQJJCPAADKQAADKpJCRQpJCQs7AAQs6AApJiQg");
        this.shape.setTransform(5.3, 257.5);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = rect = new cjs.Rectangle(-463.4, -350, 920.9, 656.7);
    p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-466.4, -346.1, 926.5, 652.8), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect = new cjs.Rectangle(-449.7, -349.8, 895.7, 656.5), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, new cjs.Rectangle(-415, -350, 831.2, 656.7)];

})(libmybots = libmybots || {}, images = images || {}, pixiflash = pixiflash || {});
var libmybots, images, pixiflash;