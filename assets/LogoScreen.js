(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes

    // stage content:
    (lib.LogoScreen = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.AllScene();
        this.instance.setTransform(769.5, 1136.2, 4, 4, 0, 0, 0, -575.6, -740);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-3.2, 0.2, 1541.5, 2103.7);


    // symbols:
    (lib.bandeira1 = function () {
        this.initialize(img.bandeira1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 118, 107);


    (lib.bandeira2 = function () {
        this.initialize(img.bandeira2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 118, 107);


    (lib.bandeira3 = function () {
        this.initialize(img.bandeira3);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 118, 107);


    (lib.Cenario = function () {
        this.initialize(img.Cenario);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1536, 2048);


    (lib.Cenário = function () {
        this.initialize(img.Cenário);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1536, 2048);


    (lib.coqueiro02 = function () {
        this.initialize(img.coqueiro02);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 273, 446);


    (lib.coqueiro1 = function () {
        this.initialize(img.coqueiro1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 414, 677);


    (lib.coqueiro2 = function () {
        this.initialize(img.coqueiro2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 187, 259);


    (lib.logo = function () {
        this.initialize(img.logo);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 795, 372);


    (lib.matoareia = function () {
        this.initialize(img.matoareia);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1536, 616);


    (lib.onda01 = function () {
        this.initialize(img.onda01);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 264, 88);


    (lib.onda02 = function () {
        this.initialize(img.onda02);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 165, 66);


    (lib.onda04 = function () {
        this.initialize(img.onda04);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 416, 82);


    (lib.vagalume = function () {
        this.initialize(img.vagalume);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 47, 47);


    (lib.Simbolo7 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.onda04();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 104, 20.5);


    (lib.Simbolo6 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.onda02();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 41.3, 16.5);


    (lib.Simbolo5 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.coqueiro02();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 68.3, 111.5);


    (lib.Simbolo4 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.coqueiro2();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 46.8, 64.8);


    (lib.Simbolo3 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.coqueiro1();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 103.5, 169.3);


    (lib.Simbolo2 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.vagalume();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 11.8, 11.8);


    (lib.Simbolo1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.bandeira1();

        this.instance_1 = new lib.bandeira2();

        this.instance_2 = new lib.bandeira3();

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance }] }).to({ state: [{ t: this.instance_1 }] }, 7).to({ state: [{ t: this.instance_2 }] }, 10).wait(6));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 118, 107);


    (lib.onda1 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.onda01();
        this.instance.setTransform(20.1, 0);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(20.1, 0, 264, 88);


    (lib.matoareia_1 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.matoareia();
        this.instance.setTransform(0, 0, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 384, 154);


    (lib.logo_1 = function () {
        this.initialize();

        // Camada 1
        this.instance = new lib.logo();
        this.instance.setTransform(-99.3, -46.4, 0.25, 0.25);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-99.3, -46.4, 198.8, 93);


    (lib.enter = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.text = new cjs.Text("ENTER", "Bold 40px 'Exo 2.0'", "#F8F5F8");
        this.text.textAlign = "center";
        this.text.lineHeight = 42;
        this.text.setTransform(61.6, 0);
        this.text.shadow = new cjs.Shadow("rgba(255,0,0,1)", 0, 0, 5);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text }] }).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).to({ state: [{ t: this.text }] }, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0.8, 0, 125.6, 52);


    (lib.vagalume_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Simbolo2();
        this.instance.setTransform(11.7, -0.8, 1, 1, 0, 0, 0, 5.9, 5.9);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ x: 11.8, y: 2.7 }, 6).to({ y: 6.4 }, 6).to({ x: 11.7, y: 9.4 }, 5).to({ x: 11.4, y: 13 }, 6).to({ x: 10.8, y: 17.8 }, 8).to({ x: 10.1, y: 21.4 }, 6).to({ x: 9.2, y: 24.9 }, 6).to({ x: 7.9, y: 29 }, 7).to({ x: 5.9, y: 33.5 }, 8).to({ x: 2, y: 39.8 }, 12).to({ x: -0.6, y: 43.1 }, 7).to({ x: -4.7, y: 46.9 }, 9).to({ x: -9.2, y: 50.2 }, 9).to({ x: -12.5, y: 52 }, 6).to({ x: -17, y: 54 }, 8).to({ x: -23.4, y: 55.7 }, 11).to({ x: -26.9, y: 50.2 }, 11).to({ x: -31, y: 44.3 }, 12).to({ x: -35.8, y: 38.1 }, 13).to({ x: -41.4, y: 31.8 }, 14).to({ x: -46.3, y: 27.2 }, 11).to({ x: -53.6, y: 21.7 }, 15).to({ x: -58.9, y: 18.7 }, 10).to({ x: -65.2, y: 16.3 }, 11).to({ x: -71.3, y: 15.1 }, 10).to({ x: -74, y: 11.8 }, 8).to({ x: -75.7, y: 5.3 }, 11).to({ x: -76.2, y: -1.8 }, 12).to({ x: -75.7, y: -6.1 }, 7).to({ x: -74.1, y: -11.5 }, 9).to({ x: -71.7, y: -15.9 }, 8).to({ x: -68.6, y: -19.8 }, 8).to({ x: -63.9, y: -24.1 }, 10).to({ x: -59.8, y: -26.9 }, 8).to({ x: -55, y: -29.7 }, 9).to({ x: -51.6, y: -31.3 }, 6).to({ x: -48.6, y: -32 }, 5).to({ x: -44.2, y: -31.6 }, 7).to({ x: -39.5, y: -29.7 }, 8).to({ x: -34.4, y: -25.9 }, 10).to({ x: -30.6, y: -21.7 }, 9).to({ x: -27.7, y: -17.6 }, 8).to({ x: -25.4, y: -13.9 }, 7).to({ x: -21.5, y: -7.6 }, 12).to({ x: -19.9, y: -5.8 }, 4).to({ x: -16.8, y: -2.9 }, 7).to({ x: -13.8, y: -0.7 }, 6).to({ x: -9.9, y: 0.9 }, 7).to({ x: -4.4, y: 2.1 }, 9).to({ x: 1, y: 1.8 }, 9).to({ x: 5.3, y: 0.8 }, 7).to({ x: 8.2, y: 0 }, 5).to({ x: 11, y: -1.3 }, 5).wait(2));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(5.8, -6.7, 11.8, 11.8);


    (lib.coqueiro2_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Simbolo4();

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ scaleY: 1.01, y: -0.7 }, 24).to({ scaleY: 1, y: 0 }, 25).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 46.8, 64.8);


    (lib.coqueiro1_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Camada 1
        this.instance = new lib.Simbolo3();
        this.instance.setTransform(102.8, 138.7, 1, 1, 0, 0, 0, 102.8, 138.7);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ skewX: -1 }, 34).to({ skewX: 0 }, 40).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 103.5, 169.3);


    (lib.AllScene = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.enter("synched", 0);
        this.instance.setTransform(-562.6, -592.3, 1, 1, 0, 0, 0, 76.8, 31);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance }] }).wait(450));

        // Layer 2
        this.instance_1 = new lib.logo_1();
        this.instance_1.setTransform(-572.9, -934.9);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }] }).wait(450));

        // Layer 3
        this.instance_2 = new lib.Simbolo5();
        this.instance_2.setTransform(-734.6, -856, 1, 1, 0, 0, 0, 34.1, 55.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ skewY: -0.6, y: -856.4 }, 40).to({ skewY: 0.5, y: -855.4 }, 39).to({ skewY: 0, y: -855.9 }, 40).to({ skewY: 0.5, y: -855.4 }, 81).to({ skewY: 0, y: -855.9 }, 75).to({ skewY: 0.5, y: -855.4 }, 75).wait(100));

        // Camada 2
        this.instance_3 = new lib.coqueiro1_1("synched", 0);
        this.instance_3.setTransform(-435.6, -809.3, 1, 1, 0, 0, 0, 51.8, 84.6);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_3 }] }).wait(450));

        // Layer 4
        this.instance_4 = new lib.coqueiro2_1("synched", 0);
        this.instance_4.setTransform(-716.5, -752.9, 1, 1, 0, 0, 0, 23.4, 32.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ startPosition: 49 }, 449).wait(1));

        // Layer 5
        this.instance_5 = new lib.vagalume_1("synched", 399);
        this.instance_5.setTransform(-571.2, -593.7, 1, 1, -36.3, 0, 0, 5.9, 5.9);

        this.instance_6 = new lib.vagalume_1("synched", 0);
        this.instance_6.setTransform(-736, -576.8, 1, 1, 80.4, 0, 0, 5.9, 5.9);

        this.instance_7 = new lib.vagalume_1("synched", 339);
        this.instance_7.setTransform(-705.5, -533.4, 1, 1, 156.3, 0, 0, 5.9, 5.9);

        this.instance_8 = new lib.vagalume_1("synched", 259);
        this.instance_8.setTransform(-517.4, -579.1, 1, 1, -123.9, 0, 0, 5.9, 5.9);

        this.instance_9 = new lib.vagalume_1("synched", 69);
        this.instance_9.setTransform(-398.3, -584.3, 1, 1, 0, 0, 0, 5.9, 5.9);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_9 }, { t: this.instance_8 }, { t: this.instance_7 }, { t: this.instance_6 }, { t: this.instance_5 }] }).wait(450));

        // 1
        this.instance_10 = new lib.onda1("synched", 0);
        this.instance_10.setTransform(-469.9, -644.8, 0.25, 0.25, 0, 0, 0, 132, 44);
        this.instance_10.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_10).to({ x: -479.8, y: -655.7, alpha: 1 }, 44).to({ x: -476.8, y: -652.7, alpha: 0 }, 45).to({ x: -469.8, y: -644.7 }, 106).to({ x: -479.8, y: -655.7, alpha: 1 }, 29).to({ x: -475, y: -650.4, alpha: 0 }, 36).to({ x: -469.8, y: -644.7 }, 84).to({ x: -479.8, y: -655.7, alpha: 1 }, 29).to({ x: -475, y: -650.4, alpha: 0 }, 36).to({ startPosition: 0 }, 40).wait(1));

        // 2
        this.instance_11 = new lib.Simbolo6();
        this.instance_11.setTransform(-692, -633.8, 1, 1, 0, 0, 0, 20.6, 8.3);
        this.instance_11.alpha = 0;
        this.instance_11._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(19).to({ _off: false }, 0).to({ x: -682.9, y: -644.7, alpha: 1 }, 54).to({ x: -685.9, y: -640.7, alpha: 0 }, 46).to({ _off: true }, 1).wait(151).wait(1).to({ x: -691.9, y: -633.7, _off: false }, 0).to({ x: -682.9, y: -644.7, alpha: 1 }, 54).to({ x: -689, y: -630.7, alpha: 0 }, 46).to({ _off: true }, 1).wait(77));

        // 3
        this.instance_12 = new lib.Simbolo7();
        this.instance_12.setTransform(-581.9, -636.8, 1, 1, 0, 0, 0, 52, 10.3);
        this.instance_12.alpha = 0;
        this.instance_12._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(72).to({ _off: false }, 0).to({ x: -580.5, y: -640.5, alpha: 0.262 }, 11).to({ x: -579.1, y: -644.2, alpha: 0.531 }, 11).to({ x: -576.9, y: -650.4, alpha: 0.949 }, 21).to({ x: -577.6, y: -648.2, alpha: 0.578 }, 15).to({ x: -578.6, y: -645.3, alpha: 0.09 }, 20).to({ x: -578.8, y: -644.7, alpha: 0 }, 13).wait(100).to({ _off: true }, 7).wait(1).to({ x: -581.8, y: -636.7, _off: false }, 0).to({ x: -579.7, y: -642.5, alpha: 0.41 }, 17).to({ x: -577.8, y: -648, alpha: 0.801 }, 16).to({ x: -577, y: -650, alpha: 0.871 }, 13).to({ x: -577.8, y: -647.6, alpha: 0.48 }, 16).to({ x: -578.4, y: -646, alpha: 0.211 }, 11).to({ x: -578.8, y: -644.7, alpha: 0 }, 9).to({ _off: true }, 1).wait(96));

        // Layer 10
        this.instance_13 = new lib.Simbolo1("synched", 0);
        this.instance_13.setTransform(-548.3, -817.9, 0.25, 0.25, 0, 0, 0, 59, 53.4);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_13 }] }).wait(450));

        // Layer 11
        this.instance_14 = new lib.matoareia_1();
        this.instance_14.setTransform(-575.3, -588.9, 1, 1, 0, 0, 0, 192, 77);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_14 }] }).wait(450));

        // Camada 3
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#010104").s().p("AiaA/IgCguIgyAcIgDgJIAagkIhVgXICQACIAEB5gADbg4IgYABIAcgsIAIAVIAggNIAFABIABAEIgZATIAVAWIgbgHIgLASg");
        this.shape.setTransform(-590.5, -740.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape }] }).wait(450));

        // Layer 12
        this.instance_15 = new lib.Cenario();
        this.instance_15.setTransform(-767.9, -1024 - 339/4, 0.25, 0.25);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_15 }] }).wait(450));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-805.7, -1023.9, 425.5, 542.6);

})(lib_logo = lib_logo || {}, images = images || {}, pixiflash = pixiflash || {});
var lib_logo, images, pixiflash;