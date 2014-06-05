(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.LogoScreen = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.AllScene();
	this.instance.setTransform(769.5,1136.2,4,4,0,0,0,-575.6,-740);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0.2,1538.3,2305.3);


// symbols:
(lib.bandeira1 = function() {
	this.initialize(img.bandeira1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,118,107);


(lib.bandeira2 = function() {
	this.initialize(img.bandeira2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,118,107);


(lib.bandeira3 = function() {
	this.initialize(img.bandeira3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,118,107);


(lib.Cenario = function() {
	this.initialize(img.Cenario);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


(lib.Cenário = function() {
	this.initialize(img.Cenário);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


(lib.coqueiro02 = function() {
	this.initialize(img.coqueiro02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,273,446);


(lib.coqueiro1 = function() {
	this.initialize(img.coqueiro1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,414,677);


(lib.coqueiro2 = function() {
	this.initialize(img.coqueiro2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,187,259);


(lib.logo = function() {
	this.initialize(img.logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,795,372);


(lib.matoareia = function() {
	this.initialize(img.matoareia);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,616);


(lib.onda01 = function() {
	this.initialize(img.onda01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,88);


(lib.onda02 = function() {
	this.initialize(img.onda02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,165,66);


(lib.onda04 = function() {
	this.initialize(img.onda04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,416,82);


(lib.vagalume = function() {
	this.initialize(img.vagalume);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,47,47);


(lib.Símbolo7 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.onda04();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,104,20.5);


(lib.Símbolo6 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.onda02();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,41.3,16.5);


(lib.Símbolo5 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro02();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,68.3,111.5);


(lib.Símbolo4 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro2();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,46.8,64.8);


(lib.Símbolo3 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro1();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,103.5,169.3);


(lib.Símbolo2 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.vagalume();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,11.8,11.8);


(lib.Símbolo1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.bandeira1();

	this.instance_1 = new lib.bandeira2();

	this.instance_2 = new lib.bandeira3();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_2}]},10).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,118,107);


(lib.onda1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.onda01();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,264,88);


(lib.matoareia_1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.matoareia();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,384,154);


(lib.enter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.text = new cjs.Text("ENTER", "bold 40px Exo 2.0", "#F8F5F8");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.setTransform(61.6,0);
	this.text.shadow = new cjs.Shadow("rgba(255,0,0,1)",0,0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text}]}).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).to({state:[{t:this.text}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,0,128.9,52);


(lib.vagalume_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo2();
	this.instance.setTransform(11.7,-0.8,1,1,0,0,0,5.9,5.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({guide:{path:[11.5,-0.7,13.9,45.8,-23.4,55.9,-47,16.8,-72.9,14.8,-85.6,-16.4,-50.8,-31.7,-35.8,-34.5,-23.6,-10,-10,9,10.9,-1.3]}},448).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.8,-6.7,11.8,11.8);


(lib.coqueiro2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:23.4,regY:32.4,x:23.4,y:32.4},0).wait(1).to({y:32.5},0).wait(2).wait(1).to({y:32.6},0).wait(2).wait(1).to({y:32.7},0).wait(2).wait(1).to({y:32.8},0).wait(2).wait(1).to({y:32.9},0).wait(2).wait(1).to({y:33},0).wait(1).wait(1).to({y:33.1},0).wait(10).wait(1).to({y:33},0).wait(2).wait(1).to({y:32.9},0).wait(2).wait(1).to({y:32.8},0).wait(2).wait(1).to({y:32.7},0).wait(2).wait(1).to({y:32.6},0).wait(2).wait(1).to({y:32.5},0).wait(2).wait(1).to({y:32.4},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46.8,64.8);


(lib.coqueiro1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo3();
	this.instance.setTransform(102.8,138.7,1,1,0,0,0,102.8,138.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:51.8,regY:84.6,x:51.8,y:84.6},0).wait(2).wait(1).to({x:51.7},0).wait(1).to({skewX:0},0).wait(1).wait(1).to({x:51.6},0).wait(1).to({skewX:-0.1},0).wait(1).wait(1).to({x:51.5},0).wait(1).to({skewX:-0.2},0).wait(1).wait(1).to({x:51.4},0).wait(1).to({skewX:-0.3},0).wait(2).wait(1).to({skewX:-0.4,x:51.3},0).wait(2).wait(1).to({skewX:-0.5,x:51.2},0).wait(2).wait(1).to({skewX:-0.6,x:51.1},0).wait(2).wait(1).to({skewX:-0.7,x:51},0).wait(2).wait(1).to({skewX:-0.8,x:50.9},0).wait(2).wait(1).to({skewX:-0.9},0).wait(1).to({x:50.8},0).wait(1).wait(1).to({skewX:-1},0).wait(1).to({x:50.7},0).wait(2).wait(1).to({x:50.8},0).wait(1).to({skewX:-0.9},0).wait(1).wait(1).to({x:50.9},0).wait(1).to({skewX:-0.8},0).wait(2).wait(1).to({skewX:-0.7,x:51},0).wait(2).wait(1).to({skewX:-0.6,x:51.1},0).wait(2).wait(1).to({skewX:-0.5,x:51.2},0).wait(2).wait(1).to({skewX:-0.4,x:51.3},0).wait(2).wait(1).to({skewX:-0.3,x:51.4},0).wait(2).wait(1).to({skewX:-0.2},0).wait(1).to({x:51.5},0).wait(1).wait(1).to({skewX:-0.1},0).wait(1).to({x:51.6},0).wait(1).wait(1).to({skewX:0},0).wait(1).to({x:51.7},0).wait(1).wait(1).to({skewX:0},0).wait(1).to({x:51.8},0).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,103.5,169.3);


(lib.Tween1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.coqueiro2_1("synched",0);
	this.instance.setTransform(-154.5,54.3,1,1,0,0,0,23.4,32.4);

	this.instance_1 = new lib.coqueiro1_1("synched",0);
	this.instance_1.setTransform(126.3,-2,1,1,0,0,0,51.8,84.6);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-177.9,-86.7,356.6,174.1);


(lib.AllScene = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.enter();
	this.instance.setTransform(-562.6,-592.3,1,1,0,0,0,76.8,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(450));

	// Layer 2
	this.instance_1 = new lib.logo();
	this.instance_1.setTransform(-672.3,-981.4,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(450));

	// Layer 3
	this.instance_2 = new lib.Símbolo5();
	this.instance_2.setTransform(-732.1,-856,1,1,0,0,0,34.1,55.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({skewY:-0.6,y:-856.4},40).to({skewY:0.5,y:-855.4},39).to({skewY:0,y:-855.9},40).to({skewY:0.5,y:-855.4},81).to({skewY:0,y:-855.9},75).to({skewY:0.5,y:-855.4},75).wait(100));

	// Layer 4
	this.instance_3 = new lib.Tween1("synched",0);
	this.instance_3.setTransform(-561.9,-807.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(450));

	// Layer 5
	this.instance_4 = new lib.vagalume_1("synched",0);
	this.instance_4.setTransform(-542,-463.9,1,1,156.3,0,0,5.9,5.9);

	this.instance_5 = new lib.vagalume_1("synched",0);
	this.instance_5.setTransform(-752,-578.8,1,1,80.4,0,0,5.9,5.9);

	this.instance_6 = new lib.vagalume_1("synched",0);
	this.instance_6.setTransform(-705.5,-533.4,1,1,156.3,0,0,5.9,5.9);

	this.instance_7 = new lib.vagalume_1("synched",0);
	this.instance_7.setTransform(-535.4,-542.4,1,1,-123.9,0,0,5.9,5.9);

	this.instance_8 = new lib.vagalume_1("synched",0);
	this.instance_8.setTransform(-398.3,-584.3,1,1,0,0,0,5.9,5.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).wait(450));

	// 1
	this.instance_9 = new lib.onda1("synched",0);
	this.instance_9.setTransform(-469.9,-644.8,0.25,0.25,0,0,0,132,44);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({x:-479.8,y:-655.7,alpha:1},44).to({x:-476.8,y:-652.7,alpha:0},45).to({x:-469.8,y:-644.7},106).to({x:-479.8,y:-655.7,alpha:1},29).to({x:-475,y:-650.4,alpha:0},36).to({x:-469.8,y:-644.7},84).to({x:-479.8,y:-655.7,alpha:1},29).to({x:-475,y:-650.4,alpha:0},36).wait(41));

	// 2
	this.instance_10 = new lib.Símbolo6();
	this.instance_10.setTransform(-692,-633.8,1,1,0,0,0,20.6,8.3);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(19).to({_off:false},0).to({x:-682.9,y:-644.7,alpha:1},54).to({x:-685.9,y:-640.7,alpha:0},46).wait(76).to({_off:true},76).wait(1).to({x:-691.9,y:-633.7,_off:false},0).to({x:-682.9,y:-644.7,alpha:1},54).to({_off:true},47).wait(77));

	// 3
	this.instance_11 = new lib.Símbolo7();
	this.instance_11.setTransform(-581.9,-636.8,1,1,0,0,0,52,10.3);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(72).to({_off:false},0).to({x:-580.5,y:-640.5,alpha:0.262},11).to({x:-579.1,y:-644.2,alpha:0.531},11).to({x:-576.9,y:-650.4,alpha:0.949},21).to({x:-577.6,y:-648.2,alpha:0.578},15).to({x:-578.6,y:-645.3,alpha:0.09},20).to({x:-578.8,y:-644.7,alpha:0},13).wait(100).to({_off:true},7).wait(1).to({x:-581.8,y:-636.7,_off:false},0).to({x:-579.7,y:-642.5,alpha:0.41},17).to({x:-577.8,y:-648,alpha:0.801},16).to({x:-577,y:-650,alpha:0.871},13).to({x:-577.8,y:-647.6,alpha:0.48},16).to({x:-578.4,y:-646,alpha:0.211},11).to({x:-578.8,y:-644.7,alpha:0},9).to({_off:true},1).wait(96));

	// Layer 10
	this.instance_12 = new lib.Símbolo1("synched",0);
	this.instance_12.setTransform(-548.3,-817.9,0.25,0.25,0,0,0,59,53.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12}]}).wait(450));

	// Layer 11
	this.instance_13 = new lib.matoareia_1();
	this.instance_13.setTransform(-575.3,-588.9,1,1,0,0,0,192,77);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13}]}).wait(450));

	// Layer 12
	this.instance_14 = new lib.Cenario();
	this.instance_14.setTransform(-767.9, -1024 - 339 / 4, 0.25, 0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).wait(450));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-821.9,-1023.9,438.6,605.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;