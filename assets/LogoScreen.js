(function (lib, img, cjs) {

var p; // shortcut to reference prototypes
var rect; // used to reference frame bounds

// stage content:
(lib.LogoScreen = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.AllScene();
	this.instance.setTransform(769.5,1136.1,4,4,0,0,0,-575.6,-740);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0.1,1538.4,2270.9);
p.frameBounds = [rect];


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
p.nominalBounds = rect = new cjs.Rectangle(0,0,104,20.5);
p.frameBounds = [rect];


(lib.Símbolo6 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.onda02();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,41.3,16.5);
p.frameBounds = [rect];


(lib.Símbolo5 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro02();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,68.3,111.5);
p.frameBounds = [rect];


(lib.Símbolo4 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro2();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,46.8,64.8);
p.frameBounds = [rect];


(lib.Símbolo3 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.coqueiro1();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,103.5,169.3);
p.frameBounds = [rect];


(lib.Símbolo2 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.vagalume();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,11.8,11.8);
p.frameBounds = [rect];


(lib.Símbolo1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.bandeira1();

	this.instance_1 = new lib.bandeira2();

	this.instance_2 = new lib.bandeira3();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},5).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,118,107);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.onda1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.onda01();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,264,88);
p.frameBounds = [rect];


(lib.matoareia_1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.matoareia();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,384,154);
p.frameBounds = [rect];


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
p.nominalBounds = rect = new cjs.Rectangle(-0.8,0,128.9,52);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.vagalume_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo2();
	this.instance.setTransform(5.9,5.9,1,1,0,0,0,5.9,5.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:5.1,y:6.2},0).wait(1).to({x:4.3,y:6.5},0).wait(1).to({x:3.7,y:6.7},0).wait(1).to({x:2.9,y:6.9},0).wait(1).to({x:2.2,y:7.1},0).wait(1).to({x:1.4,y:7.3},0).wait(1).to({x:0.6,y:7.5},0).wait(1).to({x:0,y:7.6},0).wait(1).to({x:-0.7,y:7.8},0).wait(1).to({x:-1.5,y:7.9},0).wait(1).to({x:-2.3},0).wait(1).to({x:-3.1,y:8},0).wait(1).to({x:-3.9},0).wait(1).to({x:-4.7},0).wait(1).to({x:-5.5},0).wait(1).to({x:-6.3},0).wait(1).to({x:-7.1,y:7.9},0).wait(1).to({x:-7.9,y:7.8},0).wait(1).to({x:-8.6,y:7.7},0).wait(1).to({x:-9.4,y:7.5},0).wait(1).to({x:-10.2,y:7.3},0).wait(1).to({x:-10.9,y:7.1},0).wait(1).to({x:-11.7,y:6.8},0).wait(1).to({x:-12.4,y:6.6},0).wait(1).to({x:-13.2,y:6.3},0).wait(1).to({x:-13.9,y:5.9},0).wait(1).to({x:-14.6,y:5.6},0).wait(1).to({x:-15.3,y:5.2},0).wait(1).to({x:-16,y:4.8},0).wait(1).to({x:-16.7,y:4.4},0).wait(1).to({x:-17.3,y:4},0).wait(1).to({x:-18,y:3.5},0).wait(1).to({x:-18.6,y:3},0).wait(1).to({x:-19.2,y:2.5},0).wait(1).to({x:-19.8,y:2},0).wait(1).to({x:-20.4,y:1.5},0).wait(1).to({x:-21,y:0.9},0).wait(1).to({x:-21.5,y:0.4},0).wait(1).to({x:-22.1,y:0},0).wait(1).to({x:-22.6,y:-0.6},0).wait(1).to({x:-23.1,y:-1.2},0).wait(1).to({x:-23.6,y:-1.8},0).wait(1).to({x:-24.1,y:-2.4},0).wait(1).to({x:-24.6,y:-3.1},0).wait(1).to({x:-25,y:-3.7},0).wait(1).to({x:-25.5,y:-4.4},0).wait(1).to({x:-25.9,y:-4.9},0).wait(1).to({x:-26.3,y:-5.5},0).wait(1).to({x:-26.9,y:-6.4},0).wait(1).to({x:-27.8,y:-7.2},0).wait(1).to({x:-28.6,y:-7.8},0).wait(1).to({x:-29.5,y:-8.4},0).wait(1).to({x:-30.4,y:-9.1},0).wait(1).to({x:-31.3,y:-9.7},0).wait(1).to({x:-32.3,y:-10.2},0).wait(1).to({x:-33.2,y:-10.7},0).wait(1).to({x:-34.2,y:-11.2},0).wait(1).to({x:-35.2,y:-11.6},0).wait(1).to({x:-36.3,y:-12},0).wait(1).to({x:-37.3,y:-12.3},0).wait(1).to({x:-38.4,y:-12.6},0).wait(1).to({x:-39.5,y:-12.8},0).wait(1).to({x:-40.6,y:-13},0).wait(1).to({x:-41.7,y:-13.1},0).wait(1).to({x:-42.8},0).wait(1).to({x:-43.9,y:-13},0).wait(1).to({x:-45,y:-12.9},0).wait(1).to({x:-46.1,y:-12.8},0).wait(1).to({x:-47.2,y:-12.5},0).wait(1).to({x:-48.2,y:-12.2},0).wait(1).to({x:-49.3,y:-11.9},0).wait(1).to({x:-50.3,y:-11.5},0).wait(1).to({x:-51.3,y:-11.1},0).wait(1).to({x:-52.3,y:-10.6},0).wait(1).to({x:-53.3,y:-10.1},0).wait(1).to({x:-54.3,y:-9.5},0).wait(1).to({x:-55.2,y:-8.9},0).wait(1).to({x:-56.1,y:-8.3},0).wait(1).to({x:-57,y:-7.7},0).wait(1).to({x:-57.9,y:-7},0).wait(1).to({x:-58.8,y:-6.3},0).wait(1).to({x:-59.6,y:-5.6},0).wait(1).to({x:-60.4,y:-4.8},0).wait(1).to({x:-61.2,y:-4.1},0).wait(1).to({x:-62,y:-3.3},0).wait(1).to({x:-62.8,y:-2.5},0).wait(1).to({x:-63.6,y:-1.7},0).wait(1).to({x:-64.3,y:-0.9},0).wait(1).to({x:-65.1,y:-0.1},0).wait(1).to({x:-65.8,y:0.5},0).wait(1).to({x:-66.5,y:1.4},0).wait(1).to({x:-67.2,y:2.2},0).wait(1).to({x:-67.9,y:3.1},0).wait(1).to({x:-68.5,y:3.9},0).wait(1).to({x:-69.2,y:4.8},0).wait(1).to({x:-69.8,y:5.6},0).wait(1).to({x:-70.4,y:6.4},0).wait(1).to({x:-71.1,y:7.3},0).wait(1).to({x:-71.9,y:8.4},0).wait(1).to({x:-70.4,y:8.5},0).wait(1).to({x:-69.2,y:8.6},0).wait(1).to({x:-67.9,y:8.8},0).wait(1).to({x:-66.7,y:8.9},0).wait(1).to({x:-65.4,y:9.2},0).wait(1).to({x:-64.2,y:9.5},0).wait(1).to({x:-62.9,y:9.8},0).wait(1).to({x:-61.7,y:10.1},0).wait(1).to({x:-60.5,y:10.5},0).wait(1).to({x:-59.3,y:11},0).wait(1).to({x:-58.1,y:11.5},0).wait(1).to({x:-56.9,y:12},0).wait(1).to({x:-55.8,y:12.6},0).wait(1).to({x:-54.6,y:13.2},0).wait(1).to({x:-53.5,y:13.9},0).wait(1).to({x:-52.5,y:14.6},0).wait(1).to({x:-51.4,y:15.3},0).wait(1).to({x:-50.4,y:16.1},0).wait(1).to({x:-49.4,y:16.9},0).wait(1).to({x:-48.4,y:17.8},0).wait(1).to({x:-47.5,y:18.7},0).wait(1).to({x:-46.6,y:19.6},0).wait(1).to({x:-45.7,y:20.6},0).wait(1).to({x:-44.9,y:21.5},0).wait(1).to({x:-44.1,y:22.5},0).wait(1).to({x:-43.3,y:23.6},0).wait(1).to({x:-42.6,y:24.6},0).wait(1).to({x:-41.9,y:25.7},0).wait(1).to({x:-41.2,y:26.8},0).wait(1).to({x:-40.5,y:27.9},0).wait(1).to({x:-39.9,y:29},0).wait(1).to({x:-39.3,y:30.2},0).wait(1).to({x:-38.7,y:31.3},0).wait(1).to({x:-38.2,y:32.5},0).wait(1).to({x:-37.6,y:33.7},0).wait(1).to({x:-37.1,y:34.8},0).wait(1).to({x:-36.6,y:36},0).wait(1).to({x:-36.2,y:37.2},0).wait(1).to({x:-35.7,y:38.4},0).wait(1).to({x:-35.3,y:39.7},0).wait(1).to({x:-34.9,y:40.9},0).wait(1).to({x:-34.5,y:42.1},0).wait(1).to({x:-34.2,y:43.3},0).wait(1).to({x:-33.8,y:44.6},0).wait(1).to({x:-33.5,y:45.8},0).wait(1).to({x:-33.2,y:47},0).wait(1).to({x:-32.9,y:48.3},0).wait(1).to({x:-32.6,y:49.5},0).wait(1).to({x:-32.4,y:50.6},0).wait(1).to({x:-32.1,y:51.9},0).wait(1).to({x:-31.9,y:53.4},0).wait(1).to({x:-30.3,y:53.5},0).wait(1).to({x:-29.1},0).wait(1).to({x:-27.9},0).wait(1).to({x:-26.7},0).wait(1).to({x:-25.4},0).wait(1).to({x:-24.1,y:53.4},0).wait(1).to({x:-22.9,y:53.2},0).wait(1).to({x:-21.6,y:53},0).wait(1).to({x:-20.3,y:52.8},0).wait(1).to({x:-19.1,y:52.5},0).wait(1).to({x:-17.9,y:52.1},0).wait(1).to({x:-16.6,y:51.7},0).wait(1).to({x:-15.4,y:51.3},0).wait(1).to({x:-14.2,y:50.8},0).wait(1).to({x:-13.1,y:50.3},0).wait(1).to({x:-12,y:49.7},0).wait(1).to({x:-10.8,y:49},0).wait(1).to({x:-9.8,y:48.3},0).wait(1).to({x:-8.7,y:47.6},0).wait(1).to({x:-7.7,y:46.8},0).wait(1).to({x:-6.7,y:45.9},0).wait(1).to({x:-5.8,y:45},0).wait(1).to({x:-4.9,y:44.1},0).wait(1).to({x:-4,y:43.2},0).wait(1).to({x:-3.2,y:42.2},0).wait(1).to({x:-2.4,y:41.2},0).wait(1).to({x:-1.7,y:40.1},0).wait(1).to({x:-1,y:39.1},0).wait(1).to({x:-0.3,y:38},0).wait(1).to({x:0.2,y:36.9},0).wait(1).to({x:0.8,y:35.8},0).wait(1).to({x:1.4,y:34.6},0).wait(1).to({x:1.9,y:33.5},0).wait(1).to({x:2.5,y:32.3},0).wait(1).to({x:3,y:31.1},0).wait(1).to({x:3.4,y:29.9},0).wait(1).to({x:3.9,y:28.7},0).wait(1).to({x:4.3,y:27.5},0).wait(1).to({x:4.7,y:26.3},0).wait(1).to({x:5.1,y:25},0).wait(1).to({x:5.4,y:23.8},0).wait(1).to({x:5.8,y:22.6},0).wait(1).to({x:6,y:21.3},0).wait(1).to({x:6.3,y:20.1},0).wait(1).to({x:6.6,y:18.8},0).wait(1).to({x:6.9,y:17.6},0).wait(1).to({x:7.1,y:16.4},0).wait(1).to({x:7.3,y:15},0).wait(1).to({x:7.5,y:13.9},0).wait(1).to({x:7.7,y:12.6},0).wait(1).to({x:7.9,y:11.4},0).wait(1).to({x:8.1,y:10.3},0).wait(1).to({x:8.2,y:9},0).wait(1).to({x:8.4,y:7.4},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,11.8,11.8);
p.frameBounds = [rect, new cjs.Rectangle(-0.8,0.3,11.8,11.8), new cjs.Rectangle(-1.5,0.6,11.8,11.8), new cjs.Rectangle(-2.2,0.8,11.8,11.8), new cjs.Rectangle(-3,1,11.8,11.8), new cjs.Rectangle(-3.7,1.2,11.8,11.8), new cjs.Rectangle(-4.5,1.4,11.8,11.8), new cjs.Rectangle(-5.2,1.6,11.8,11.8), new cjs.Rectangle(-6,1.7,11.8,11.8), new cjs.Rectangle(-6.8,1.9,11.8,11.8), new cjs.Rectangle(-7.6,2,11.8,11.8), new cjs.Rectangle(-8.4,2,11.8,11.8), new cjs.Rectangle(-9.2,2.1,11.8,11.8), new cjs.Rectangle(-10,2.1,11.8,11.8), new cjs.Rectangle(-10.7,2.1,11.8,11.8), new cjs.Rectangle(-11.5,2.1,11.8,11.8), new cjs.Rectangle(-12.3,2.1,11.8,11.8), new cjs.Rectangle(-13.1,2,11.8,11.8), new cjs.Rectangle(-13.9,1.9,11.8,11.8), new cjs.Rectangle(-14.7,1.8,11.8,11.8), new cjs.Rectangle(-15.5,1.6,11.8,11.8), new cjs.Rectangle(-16.2,1.4,11.8,11.8), new cjs.Rectangle(-17,1.2,11.8,11.8), new cjs.Rectangle(-17.8,0.9,11.8,11.8), new cjs.Rectangle(-18.5,0.7,11.8,11.8), new cjs.Rectangle(-19.2,0.4,11.8,11.8), new cjs.Rectangle(-20,0,11.8,11.8), new cjs.Rectangle(-20.7,-0.2,11.8,11.8), new cjs.Rectangle(-21.4,-0.6,11.8,11.8), new cjs.Rectangle(-22,-1,11.8,11.8), new cjs.Rectangle(-22.7,-1.4,11.8,11.8), new cjs.Rectangle(-23.4,-1.9,11.8,11.8), new cjs.Rectangle(-24,-2.3,11.8,11.8), new cjs.Rectangle(-24.6,-2.8,11.8,11.8), new cjs.Rectangle(-25.3,-3.3,11.8,11.8), new cjs.Rectangle(-25.9,-3.8,11.8,11.8), new cjs.Rectangle(-26.4,-4.4,11.8,11.8), new cjs.Rectangle(-27,-4.9,11.8,11.8), new cjs.Rectangle(-27.6,-5.5,11.8,11.8), new cjs.Rectangle(-28.1,-6.1,11.8,11.8), new cjs.Rectangle(-28.6,-6.7,11.8,11.8), new cjs.Rectangle(-29.2,-7.3,11.8,11.8), new cjs.Rectangle(-29.7,-7.9,11.8,11.8), new cjs.Rectangle(-30.2,-8.5,11.8,11.8), new cjs.Rectangle(-30.6,-9.1,11.8,11.8), new cjs.Rectangle(-31.1,-9.7,11.8,11.8), new cjs.Rectangle(-31.6,-10.4,11.8,11.8), new cjs.Rectangle(-32,-10.9,11.8,11.8), new cjs.Rectangle(-32.4,-11.6,11.8,11.8), new cjs.Rectangle(-32.9,-12.4,11.8,11.8), new cjs.Rectangle(-33.9,-13.2,11.8,11.8), new cjs.Rectangle(-34.7,-13.9,11.8,11.8), new cjs.Rectangle(-35.5,-14.5,11.8,11.8), new cjs.Rectangle(-36.4,-15.1,11.8,11.8), new cjs.Rectangle(-37.4,-15.7,11.8,11.8), new cjs.Rectangle(-38.3,-16.3,11.8,11.8), new cjs.Rectangle(-39.3,-16.8,11.8,11.8), new cjs.Rectangle(-40.3,-17.3,11.8,11.8), new cjs.Rectangle(-41.3,-17.7,11.8,11.8), new cjs.Rectangle(-42.3,-18.1,11.8,11.8), new cjs.Rectangle(-43.4,-18.4,11.8,11.8), new cjs.Rectangle(-44.5,-18.7,11.8,11.8), new cjs.Rectangle(-45.5,-18.9,11.8,11.8), new cjs.Rectangle(-46.6,-19,11.8,11.8), new cjs.Rectangle(-47.7,-19.1,11.8,11.8), new cjs.Rectangle(-48.8,-19.1,11.8,11.8), new cjs.Rectangle(-49.9,-19.1,11.8,11.8), new cjs.Rectangle(-51,-19,11.8,11.8), new cjs.Rectangle(-52.1,-18.8,11.8,11.8), new cjs.Rectangle(-53.2,-18.6,11.8,11.8), new cjs.Rectangle(-54.3,-18.3,11.8,11.8), new cjs.Rectangle(-55.3,-17.9,11.8,11.8), new cjs.Rectangle(-56.4,-17.5,11.8,11.8), new cjs.Rectangle(-57.4,-17.1,11.8,11.8), new cjs.Rectangle(-58.4,-16.6,11.8,11.8), new cjs.Rectangle(-59.4,-16.1,11.8,11.8), new cjs.Rectangle(-60.3,-15.6,11.8,11.8), new cjs.Rectangle(-61.3,-15,11.8,11.8), new cjs.Rectangle(-62.2,-14.4,11.8,11.8), new cjs.Rectangle(-63.1,-13.7,11.8,11.8), new cjs.Rectangle(-64,-13,11.8,11.8), new cjs.Rectangle(-64.8,-12.3,11.8,11.8), new cjs.Rectangle(-65.7,-11.6,11.8,11.8), new cjs.Rectangle(-66.5,-10.9,11.8,11.8), new cjs.Rectangle(-67.3,-10.1,11.8,11.8), new cjs.Rectangle(-68.1,-9.4,11.8,11.8), new cjs.Rectangle(-68.9,-8.6,11.8,11.8), new cjs.Rectangle(-69.6,-7.8,11.8,11.8), new cjs.Rectangle(-70.4,-7,11.8,11.8), new cjs.Rectangle(-71.1,-6.2,11.8,11.8), new cjs.Rectangle(-71.8,-5.3,11.8,11.8), new cjs.Rectangle(-72.6,-4.5,11.8,11.8), new cjs.Rectangle(-73.2,-3.6,11.8,11.8), new cjs.Rectangle(-74,-2.8,11.8,11.8), new cjs.Rectangle(-74.6,-1.9,11.8,11.8), new cjs.Rectangle(-75.3,-1,11.8,11.8), new cjs.Rectangle(-75.9,-0.2,11.8,11.8), new cjs.Rectangle(-76.5,0.5,11.8,11.8), new cjs.Rectangle(-77.1,1.4,11.8,11.8), new cjs.Rectangle(-77.9,2.5,11.8,11.8), new cjs.Rectangle(-76.4,2.6,11.8,11.8), new cjs.Rectangle(-75.2,2.7,11.8,11.8), new cjs.Rectangle(-74,2.9,11.8,11.8), new cjs.Rectangle(-72.8,3,11.8,11.8), new cjs.Rectangle(-71.5,3.3,11.8,11.8), new cjs.Rectangle(-70.2,3.6,11.8,11.8), new cjs.Rectangle(-69,3.9,11.8,11.8), new cjs.Rectangle(-67.8,4.2,11.8,11.8), new cjs.Rectangle(-66.5,4.6,11.8,11.8), new cjs.Rectangle(-65.3,5.1,11.8,11.8), new cjs.Rectangle(-64.1,5.6,11.8,11.8), new cjs.Rectangle(-63,6.1,11.8,11.8), new cjs.Rectangle(-61.8,6.7,11.8,11.8), new cjs.Rectangle(-60.7,7.3,11.8,11.8), new cjs.Rectangle(-59.6,8,11.8,11.8), new cjs.Rectangle(-58.5,8.7,11.8,11.8), new cjs.Rectangle(-57.5,9.4,11.8,11.8), new cjs.Rectangle(-56.4,10.2,11.8,11.8), new cjs.Rectangle(-55.4,11,11.8,11.8), new cjs.Rectangle(-54.5,11.9,11.8,11.8), new cjs.Rectangle(-53.6,12.8,11.8,11.8), new cjs.Rectangle(-52.7,13.7,11.8,11.8), new cjs.Rectangle(-51.8,14.7,11.8,11.8), new cjs.Rectangle(-51,15.6,11.8,11.8), new cjs.Rectangle(-50.1,16.6,11.8,11.8), new cjs.Rectangle(-49.4,17.7,11.8,11.8), new cjs.Rectangle(-48.6,18.7,11.8,11.8), new cjs.Rectangle(-47.9,19.8,11.8,11.8), new cjs.Rectangle(-47.2,20.9,11.8,11.8), new cjs.Rectangle(-46.6,22,11.8,11.8), new cjs.Rectangle(-45.9,23.1,11.8,11.8), new cjs.Rectangle(-45.3,24.3,11.8,11.8), new cjs.Rectangle(-44.8,25.4,11.8,11.8), new cjs.Rectangle(-44.2,26.6,11.8,11.8), new cjs.Rectangle(-43.7,27.8,11.8,11.8), new cjs.Rectangle(-43.2,28.9,11.8,11.8), new cjs.Rectangle(-42.7,30.1,11.8,11.8), new cjs.Rectangle(-42.2,31.3,11.8,11.8), new cjs.Rectangle(-41.8,32.5,11.8,11.8), new cjs.Rectangle(-41.4,33.8,11.8,11.8), new cjs.Rectangle(-41,35,11.8,11.8), new cjs.Rectangle(-40.6,36.2,11.8,11.8), new cjs.Rectangle(-40.2,37.4,11.8,11.8), new cjs.Rectangle(-39.9,38.7,11.8,11.8), new cjs.Rectangle(-39.6,39.9,11.8,11.8), new cjs.Rectangle(-39.3,41.1,11.8,11.8), new cjs.Rectangle(-39,42.4,11.8,11.8), new cjs.Rectangle(-38.7,43.6,11.8,11.8), new cjs.Rectangle(-38.4,44.7,11.8,11.8), new cjs.Rectangle(-38.2,46,11.8,11.8), new cjs.Rectangle(-37.9,47.5,11.8,11.8), new cjs.Rectangle(-36.4,47.6,11.8,11.8), new cjs.Rectangle(-35.2,47.6,11.8,11.8), new cjs.Rectangle(-34,47.6,11.8,11.8), new cjs.Rectangle(-32.7,47.6,11.8,11.8), new cjs.Rectangle(-31.4,47.6,11.8,11.8), new cjs.Rectangle(-30.2,47.5,11.8,11.8), new cjs.Rectangle(-28.9,47.3,11.8,11.8), new cjs.Rectangle(-27.7,47.1,11.8,11.8), new cjs.Rectangle(-26.4,46.9,11.8,11.8), new cjs.Rectangle(-25.1,46.6,11.8,11.8), new cjs.Rectangle(-23.9,46.2,11.8,11.8), new cjs.Rectangle(-22.7,45.8,11.8,11.8), new cjs.Rectangle(-21.5,45.4,11.8,11.8), new cjs.Rectangle(-20.3,44.9,11.8,11.8), new cjs.Rectangle(-19.1,44.4,11.8,11.8), new cjs.Rectangle(-18,43.8,11.8,11.8), new cjs.Rectangle(-16.9,43.1,11.8,11.8), new cjs.Rectangle(-15.8,42.4,11.8,11.8), new cjs.Rectangle(-14.8,41.7,11.8,11.8), new cjs.Rectangle(-13.8,40.9,11.8,11.8), new cjs.Rectangle(-12.8,40,11.8,11.8), new cjs.Rectangle(-11.9,39.1,11.8,11.8), new cjs.Rectangle(-11,38.2,11.8,11.8), new cjs.Rectangle(-10.1,37.3,11.8,11.8), new cjs.Rectangle(-9.3,36.3,11.8,11.8), new cjs.Rectangle(-8.5,35.3,11.8,11.8), new cjs.Rectangle(-7.7,34.2,11.8,11.8), new cjs.Rectangle(-7,33.2,11.8,11.8), new cjs.Rectangle(-6.3,32.1,11.8,11.8), new cjs.Rectangle(-5.7,31,11.8,11.8), new cjs.Rectangle(-5.1,29.9,11.8,11.8), new cjs.Rectangle(-4.5,28.7,11.8,11.8), new cjs.Rectangle(-3.9,27.6,11.8,11.8), new cjs.Rectangle(-3.4,26.4,11.8,11.8), new cjs.Rectangle(-2.9,25.2,11.8,11.8), new cjs.Rectangle(-2.4,24,11.8,11.8), new cjs.Rectangle(-2,22.8,11.8,11.8), new cjs.Rectangle(-1.6,21.6,11.8,11.8), new cjs.Rectangle(-1.2,20.4,11.8,11.8), new cjs.Rectangle(-0.8,19.1,11.8,11.8), new cjs.Rectangle(-0.4,17.9,11.8,11.8), new cjs.Rectangle(-0.1,16.7,11.8,11.8), new cjs.Rectangle(0.1,15.4,11.8,11.8), new cjs.Rectangle(0.4,14.2,11.8,11.8), new cjs.Rectangle(0.7,12.9,11.8,11.8), new cjs.Rectangle(1,11.7,11.8,11.8), new cjs.Rectangle(1.2,10.5,11.8,11.8), new cjs.Rectangle(1.4,9.1,11.8,11.8), new cjs.Rectangle(1.6,8,11.8,11.8), new cjs.Rectangle(1.8,6.7,11.8,11.8), new cjs.Rectangle(2,5.5,11.8,11.8), new cjs.Rectangle(2.2,4.4,11.8,11.8), new cjs.Rectangle(2.3,3.1,11.8,11.8), new cjs.Rectangle(2.5,1.5,11.8,11.8)];


(lib.coqueiro2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo4();
	this.instance.setTransform(23.4,32.4,1,1,0,0,0,23.4,32.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1,y:32.5},0).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1,y:32.6},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99,y:32.7},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99,y:32.8},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99,y:32.9},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:0.98,y:33},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:0.98,y:32.9},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({y:32.8},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99,y:32.7},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:0.99,y:32.6},0).wait(1).to({scaleY:0.99},0).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1,y:32.5},0).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1},0).wait(1).to({scaleY:1,y:32.4},0).wait(1).to({scaleY:1},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,46.8,64.8);
p.frameBounds = [rect, new cjs.Rectangle(0,0.1,46.8,64.7), new cjs.Rectangle(0,0.1,46.8,64.6), new cjs.Rectangle(0,0.2,46.8,64.6), new cjs.Rectangle(0,0.3,46.8,64.5), new cjs.Rectangle(0,0.3,46.8,64.4), new cjs.Rectangle(0,0.4,46.8,64.4), new cjs.Rectangle(0,0.5,46.8,64.3), new cjs.Rectangle(0,0.5,46.8,64.2), new cjs.Rectangle(0,0.6,46.8,64.2), rect=new cjs.Rectangle(0,0.7,46.8,64.1), rect, new cjs.Rectangle(0,0.8,46.8,64), rect=new cjs.Rectangle(0,0.9,46.8,63.9), rect, new cjs.Rectangle(0,1,46.8,63.8), rect=new cjs.Rectangle(0,1.1,46.8,63.7), rect, new cjs.Rectangle(0,1.2,46.8,63.6), new cjs.Rectangle(0,1.3,46.8,63.5), new cjs.Rectangle(0,1.2,46.8,63.6), new cjs.Rectangle(0,1.1,46.8,63.6), new cjs.Rectangle(0,1.1,46.8,63.7), new cjs.Rectangle(0,1,46.8,63.8), new cjs.Rectangle(0,0.9,46.8,63.8), new cjs.Rectangle(0,0.9,46.8,63.9), new cjs.Rectangle(0,0.8,46.8,64), new cjs.Rectangle(0,0.7,46.8,64), new cjs.Rectangle(0,0.7,46.8,64.1), new cjs.Rectangle(0,0.6,46.8,64.1), new cjs.Rectangle(0,0.6,46.8,64.2), new cjs.Rectangle(0,0.5,46.8,64.3), new cjs.Rectangle(0,0.4,46.8,64.3), new cjs.Rectangle(0,0.4,46.8,64.4), new cjs.Rectangle(0,0.3,46.8,64.5), new cjs.Rectangle(0,0.2,46.8,64.5), new cjs.Rectangle(0,0.2,46.8,64.6), new cjs.Rectangle(0,0.1,46.8,64.6), new cjs.Rectangle(0,0.1,46.8,64.7), new cjs.Rectangle(0,0,46.8,64.8)];


(lib.coqueiro1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Símbolo3();
	this.instance.setTransform(102.8,138.7,1,1,0,0,0,102.8,138.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:51.8,regY:84.6,x:51.8,y:84.6},0).wait(1).wait(1).to({skewX:0,x:51.7},0).wait(1).wait(1).to({skewX:-0.1,x:51.6},0).wait(1).wait(1).to({skewX:-0.2,x:51.5},0).wait(1).wait(1).to({skewX:-0.3,x:51.4},0).wait(1).wait(1).to({skewX:-0.4,x:51.3},0).wait(1).wait(1).to({skewX:-0.5,x:51.2},0).wait(1).wait(1).to({skewX:-0.6,x:51.1},0).wait(1).wait(1).to({skewX:-0.7,x:51},0).wait(1).wait(1).to({skewX:-0.8,x:50.9},0).wait(1).to({x:50.8},0).wait(1).to({skewX:-0.9},0).wait(1).wait(1).to({skewX:-1,x:50.7},0).wait(2).wait(1).to({skewX:-0.9,x:50.8},0).wait(1).wait(1).to({skewX:-0.8,x:50.9},0).wait(1).wait(1).to({skewX:-0.7,x:51},0).wait(1).wait(1).to({skewX:-0.6,x:51.1},0).wait(1).wait(1).to({skewX:-0.5,x:51.2},0).wait(1).wait(1).to({skewX:-0.4},0).wait(1).to({x:51.3},0).wait(1).to({skewX:-0.3},0).wait(1).to({x:51.4},0).wait(1).to({skewX:-0.2},0).wait(1).to({x:51.5},0).wait(1).to({skewX:-0.1},0).wait(1).to({x:51.6},0).wait(1).to({skewX:0},0).wait(1).to({x:51.7},0).wait(1).to({skewX:0},0).wait(1).to({x:51.8},0).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,103.5,169.3);
p.frameBounds = [rect, rect=new cjs.Rectangle(0,0,103.6,169.3), rect, rect, new cjs.Rectangle(0,0,103.7,169.3), new cjs.Rectangle(-0.5,0,104.3,169.3), rect=new cjs.Rectangle(-0.6,0,104.3,169.3), rect, new cjs.Rectangle(-0.6,0,104.4,169.3), new cjs.Rectangle(-0.7,0,104.4,169.3), new cjs.Rectangle(-1.1,0,105,169.3), rect=new cjs.Rectangle(-1.2,0,105.1,169.3), rect, rect, new cjs.Rectangle(-1.3,0,105.2,169.3), rect=new cjs.Rectangle(-1.8,0,105.8,169.3), rect, rect, new cjs.Rectangle(-1.8,0,105.9,169.3), new cjs.Rectangle(-1.9,0,105.9,169.3), rect=new cjs.Rectangle(-2.4,0,106.5,169.3), rect, new cjs.Rectangle(-2.4,0,106.6,169.3), new cjs.Rectangle(-2.5,0,106.6,169.3), new cjs.Rectangle(-2.5,0,106.7,169.3), new cjs.Rectangle(-2.5,0,106.6,169.3), new cjs.Rectangle(-2.4,0,106.6,169.3), rect=new cjs.Rectangle(-2.4,0,106.5,169.3), rect, rect=new cjs.Rectangle(-1.9,0,105.9,169.3), rect, rect=new cjs.Rectangle(-1.8,0,105.8,169.3), rect, rect, new cjs.Rectangle(-1.3,0,105.2,169.3), new cjs.Rectangle(-1.3,0,105.1,169.3), rect=new cjs.Rectangle(-1.2,0,105.1,169.3), rect, new cjs.Rectangle(-1.2,0,105,169.3), new cjs.Rectangle(-0.7,0,104.4,169.3), rect=new cjs.Rectangle(-0.6,0,104.4,169.3), rect, rect=new cjs.Rectangle(-0.6,0,104.3,169.3), rect, new cjs.Rectangle(-0.1,0,103.7,169.3), new cjs.Rectangle(0,0,103.7,169.3), rect=new cjs.Rectangle(0,0,103.6,169.3), rect, rect, new cjs.Rectangle(0,0,103.5,169.3)];


(lib.AllScene = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.enter();
	this.instance.setTransform(-562.6,-592.3,1,1,0,0,0,76.8,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(120));

	// Layer 2
	this.instance_1 = new lib.logo();
	this.instance_1.setTransform(-672.3,-981.4,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(120));

	// Layer 3
	this.instance_2 = new lib.Símbolo5();
	this.instance_2.setTransform(-733.8,-856.8,1,1,0,0,0,34.1,55.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).wait(1).to({skewY:0,y:-856.8},0).wait(1).wait(1).to({skewY:-0.1},0).wait(1).to({y:-856.9},0).wait(1).to({skewY:-0.2},0).wait(1).wait(1).to({skewY:-0.3},0).wait(1).wait(1).to({skewY:-0.4,y:-857},0).wait(1).wait(1).to({skewY:-0.5},0).wait(1).to({skewY:-0.6,y:-857.1},0).wait(1).to({x:-733.6},0).wait(1).to({skewY:-0.7},0).wait(1).to({y:-857.2},0).wait(1).to({skewY:-0.8},0).wait(1).wait(1).to({skewY:-0.7,y:-857.1},0).wait(1).wait(1).to({skewY:-0.6,x:-733.7,y:-857},0).wait(1).to({skewY:-0.5},0).wait(1).to({skewY:-0.4,y:-856.9},0).wait(1).to({skewY:-0.3},0).wait(1).to({skewY:-0.2,y:-856.8},0).wait(1).wait(1).to({skewY:-0.1,y:-856.7},0).wait(1).to({skewY:0},0).wait(1).to({skewY:0,y:-856.6},0).wait(1).wait(1).to({skewY:0.1,y:-856.5},0).wait(1).wait(1).to({skewY:0.2,y:-856.4},0).wait(1).to({skewY:0.3,x:-733.6},0).wait(1).to({skewY:0.4,y:-856.3},0).wait(1).to({skewY:0.5},0).wait(1).to({y:-856.2},0).wait(1).to({skewY:0.6},0).wait(2).wait(1).to({skewY:0.5,y:-856.3},0).wait(2).wait(1).to({skewY:0.4,y:-856.4},0).wait(2).wait(1).to({skewY:0.3},0).wait(1).wait(1).to({y:-856.5},0).wait(1).wait(1).to({skewY:0.2},0).wait(1).to({y:-856.6},0).wait(1).wait(1).to({skewY:0.1},0).wait(2).wait(1).to({skewY:0,y:-856.7},0).wait(1).to({x:-733.7},0).wait(2).wait(1).to({skewY:0,y:-856.8},0).wait(1).wait(1).to({skewY:-0.1},0).wait(1).to({y:-856.9},0).wait(1).to({skewY:-0.2},0).wait(1).wait(1).to({skewY:-0.3},0).wait(1).wait(1).to({skewY:-0.4,y:-857},0).wait(1).wait(1).to({skewY:-0.5},0).wait(1).to({y:-857.1},0).wait(1).to({skewY:-0.6},0).wait(1).to({x:-733.6},0).wait(1).to({skewY:-0.7},0).wait(1).to({y:-857.2},0).wait(1).to({skewY:-0.8},0).wait(1).wait(1).to({skewY:-0.7,y:-857.1},0).wait(1).wait(1).to({skewY:-0.6,x:-733.7,y:-857},0).wait(1).to({skewY:-0.5},0).wait(1).to({skewY:-0.4,y:-856.9},0).wait(1).wait(1).to({skewY:-0.3},0).wait(1).to({skewY:-0.2,y:-856.8},0).wait(1).to({skewY:-0.1},0).wait(1).to({skewY:0,y:-856.7},0).wait(1).wait(1).to({skewY:0,y:-856.6},0).wait(1).wait(1).to({skewY:0.1,y:-856.5},0).wait(1).to({skewY:0.2},0).wait(1).to({y:-856.4},0).wait(1).to({skewY:0.3,x:-733.6},0).wait(1).to({skewY:0.4,y:-856.3},0).wait(1).to({skewY:0.5},0).wait(1).to({skewY:0.6,y:-856.2},0).wait(3).wait(1).to({skewY:0.5,y:-856.3},0).wait(2).wait(1).to({skewY:0.4,y:-856.4},0).wait(2).wait(1).to({skewY:0.3},0).wait(1).wait(1).to({y:-856.5},0).wait(1).to({skewY:0.2},0).wait(1).to({y:-856.6},0).wait(1).wait(1).to({skewY:0.1},0).wait(2).wait(1).to({skewY:0,y:-856.7},0).wait(1).to({x:-733.7},0).wait(1));

	// Layer 4
	this.instance_3 = new lib.coqueiro2_1("synched",0);
	this.instance_3.setTransform(-715.7,-752.2,1,1,0,0,0,23.4,32.4);

	this.instance_4 = new lib.coqueiro1_1("synched",0);
	this.instance_4.setTransform(-435.6,-809.3,1,1,0,0,0,51.8,84.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(120));

	// Layer 5
	this.instance_5 = new lib.vagalume_1("synched",0);
	this.instance_5.setTransform(-542,-463.9,1,1,156.3,0,0,5.9,5.9);

	this.instance_6 = new lib.vagalume_1("synched",0);
	this.instance_6.setTransform(-752,-578.8,1,1,80.4,0,0,5.9,5.9);

	this.instance_7 = new lib.vagalume_1("synched",0);
	this.instance_7.setTransform(-705.5,-533.4,1,1,156.3,0,0,5.9,5.9);

	this.instance_8 = new lib.vagalume_1("synched",0);
	this.instance_8.setTransform(-535.4,-542.4,1,1,-123.9,0,0,5.9,5.9);

	this.instance_9 = new lib.vagalume_1("synched",0);
	this.instance_9.setTransform(-398.3,-584.3,1,1,0,0,0,5.9,5.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).wait(120));

	// 1
	this.instance_10 = new lib.onda1("synched",0);
	this.instance_10.setTransform(-469.9,-644.8,0.25,0.25,0,0,0,132,44);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({x:-470.2,y:-645.1,alpha:0.042},0).wait(1).to({x:-470.6,y:-645.6,alpha:0.083},0).wait(1).to({x:-471,y:-646,alpha:0.125},0).wait(1).to({x:-471.4,y:-646.5,alpha:0.167},0).wait(1).to({x:-471.8,y:-646.9,alpha:0.208},0).wait(1).to({x:-472.3,y:-647.4,alpha:0.25},0).wait(1).to({x:-472.7,y:-647.9,alpha:0.292},0).wait(1).to({x:-473.1,y:-648.3,alpha:0.333},0).wait(1).to({x:-473.5,y:-648.8,alpha:0.375},0).wait(1).to({x:-473.9,y:-649.2,alpha:0.417},0).wait(1).to({x:-474.3,y:-649.7,alpha:0.458},0).wait(1).to({x:-474.8,y:-650.2,alpha:0.5},0).wait(1).to({x:-475.2,y:-650.6,alpha:0.542},0).wait(1).to({x:-475.6,y:-651.1,alpha:0.583},0).wait(1).to({x:-476,y:-651.5,alpha:0.625},0).wait(1).to({x:-476.4,y:-652,alpha:0.667},0).wait(1).to({x:-476.8,y:-652.4,alpha:0.708},0).wait(1).to({x:-477.3,y:-652.9,alpha:0.75},0).wait(1).to({x:-477.7,y:-653.4,alpha:0.792},0).wait(1).to({x:-478.1,y:-653.8,alpha:0.833},0).wait(1).to({x:-478.5,y:-654.3,alpha:0.875},0).wait(1).to({x:-478.9,y:-654.7,alpha:0.917},0).wait(1).to({x:-479.3,y:-655.2,alpha:0.958},0).wait(1).to({x:-479.8,y:-655.7,alpha:1},0).wait(1).to({x:-479.6,y:-655.5,alpha:0.96},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.92},0).wait(1).to({x:-479.4,y:-655.3,alpha:0.88},0).wait(1).to({x:-479.3,y:-655.2,alpha:0.84},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.8},0).wait(1).to({x:-479,y:-654.9,alpha:0.76},0).wait(1).to({x:-478.9,y:-654.8,alpha:0.72},0).wait(1).to({x:-478.8,y:-654.7,alpha:0.68},0).wait(1).to({x:-478.7,y:-654.6,alpha:0.64},0).wait(1).to({x:-478.6,y:-654.5,alpha:0.6},0).wait(1).to({x:-478.4,y:-654.3,alpha:0.56},0).wait(1).to({x:-478.3,y:-654.2,alpha:0.52},0).wait(1).to({x:-478.2,y:-654.1,alpha:0.48},0).wait(1).to({x:-478.1,y:-654,alpha:0.44},0).wait(1).to({x:-478,y:-653.9,alpha:0.4},0).wait(1).to({x:-477.8,y:-653.7,alpha:0.36},0).wait(1).to({x:-477.7,y:-653.6,alpha:0.32},0).wait(1).to({x:-477.6,y:-653.5,alpha:0.28},0).wait(1).to({x:-477.5,y:-653.4,alpha:0.24},0).wait(1).to({x:-477.4,y:-653.3,alpha:0.2},0).wait(1).to({x:-477.2,y:-653.1,alpha:0.16},0).wait(1).to({x:-477.1,y:-653,alpha:0.12},0).wait(1).to({x:-477,y:-652.9,alpha:0.08},0).wait(1).to({x:-476.9,y:-652.8,alpha:0.04},0).wait(1).to({x:-476.8,y:-652.7,alpha:0},0).wait(1).to({x:-476.6,y:-652.5},0).wait(1).to({x:-476.4,y:-652.3},0).wait(1).to({x:-476.3,y:-652.1},0).wait(1).to({x:-476.1,y:-652},0).wait(1).to({x:-476,y:-651.8},0).wait(1).to({x:-475.8,y:-651.6},0).wait(1).to({x:-475.7,y:-651.4},0).wait(1).to({x:-475.5,y:-651.3},0).wait(1).to({x:-475.4,y:-651.1},0).wait(1).to({x:-475.2,y:-650.9},0).wait(1).to({x:-475.1,y:-650.7},0).wait(1).to({x:-474.9,y:-650.6},0).wait(1).to({x:-474.8,y:-650.4},0).wait(1).to({x:-474.6,y:-650.2},0).wait(1).to({x:-474.5,y:-650},0).wait(1).to({x:-474.3,y:-649.9},0).wait(1).to({x:-474.2,y:-649.7},0).wait(1).to({x:-474,y:-649.5},0).wait(1).to({x:-473.9,y:-649.3},0).wait(1).to({x:-473.7,y:-649.2},0).wait(1).to({x:-473.6,y:-649},0).wait(1).to({x:-473.4,y:-648.8},0).wait(1).to({x:-473.3,y:-648.7},0).wait(1).to({x:-473.1,y:-648.5},0).wait(1).to({x:-472.9,y:-648.3},0).wait(1).to({x:-472.8,y:-648.1},0).wait(1).to({x:-472.6,y:-648},0).wait(1).to({x:-472.5,y:-647.8},0).wait(1).to({x:-472.3,y:-647.6},0).wait(1).to({x:-472.2,y:-647.4},0).wait(1).to({x:-472,y:-647.3},0).wait(1).to({x:-471.9,y:-647.1},0).wait(1).to({x:-471.7,y:-646.9},0).wait(1).to({x:-471.6,y:-646.7},0).wait(1).to({x:-471.4,y:-646.6},0).wait(1).to({x:-471.3,y:-646.4},0).wait(1).to({x:-471.1,y:-646.2},0).wait(1).to({x:-471,y:-646},0).wait(1).to({x:-470.8,y:-645.9},0).wait(1).to({x:-470.7,y:-645.7},0).wait(1).to({x:-470.5,y:-645.5},0).wait(1).to({x:-470.4,y:-645.3},0).wait(1).to({x:-470.2,y:-645.2},0).wait(1).to({x:-470.1,y:-645},0).wait(1).to({x:-469.9,y:-644.8},0).wait(1).to({x:-469.8,y:-644.7},0).wait(1).to({x:-470.3,y:-645.2,alpha:0.053},0).wait(1).to({x:-470.8,y:-645.8,alpha:0.105},0).wait(1).to({x:-471.3,y:-646.4,alpha:0.158},0).wait(1).to({x:-471.9,y:-647,alpha:0.211},0).wait(1).to({x:-472.4,y:-647.5,alpha:0.263},0).wait(1).to({x:-472.9,y:-648.1,alpha:0.316},0).wait(1).to({x:-473.4,y:-648.7,alpha:0.368},0).wait(1).to({x:-474,y:-649.3,alpha:0.421},0).wait(1).to({x:-474.5,y:-649.9,alpha:0.474},0).wait(1).to({x:-475,y:-650.4,alpha:0.526},0).wait(1).to({x:-475.5,y:-651,alpha:0.579},0).wait(1).to({x:-476.1,y:-651.6,alpha:0.632},0).wait(1).to({x:-476.6,y:-652.2,alpha:0.684},0).wait(1).to({x:-477.1,y:-652.8,alpha:0.737},0).wait(1).to({x:-477.6,y:-653.3,alpha:0.789},0).wait(1).to({x:-478.2,y:-653.9,alpha:0.842},0).wait(1).to({x:-478.7,y:-654.5,alpha:0.895},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.947},0).wait(1).to({x:-479.8,y:-655.7,alpha:1},0).wait(1).to({x:-479.6,y:-655.5,alpha:0.95},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.9},0).wait(1).to({x:-479.3,y:-655.2,alpha:0.85},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.8},0).wait(1).to({x:-479,y:-654.9,alpha:0.75},0).wait(1));

	// 2
	this.instance_11 = new lib.Símbolo6();
	this.instance_11.setTransform(-692,-633.8,1,1,0,0,0,20.6,8.3);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(9).to({_off:false},0).wait(1).to({x:-691.5,y:-634.2,alpha:0.042},0).wait(1).to({x:-691.2,y:-634.6,alpha:0.083},0).wait(1).to({x:-690.8,y:-635.1,alpha:0.125},0).wait(1).to({x:-690.4,y:-635.5,alpha:0.167},0).wait(1).to({x:-690,y:-636,alpha:0.208},0).wait(1).to({x:-689.7,y:-636.5,alpha:0.25},0).wait(1).to({x:-689.3,y:-636.9,alpha:0.292},0).wait(1).to({x:-688.9,y:-637.4,alpha:0.333},0).wait(1).to({x:-688.5,y:-637.8,alpha:0.375},0).wait(1).to({x:-688.2,y:-638.3,alpha:0.417},0).wait(1).to({x:-687.8,y:-638.7,alpha:0.458},0).wait(1).to({x:-687.4,y:-639.2,alpha:0.5},0).wait(1).to({x:-687,y:-639.7,alpha:0.542},0).wait(1).to({x:-686.7,y:-640.1,alpha:0.583},0).wait(1).to({x:-686.3,y:-640.6,alpha:0.625},0).wait(1).to({x:-685.9,y:-641,alpha:0.667},0).wait(1).to({x:-685.5,y:-641.5,alpha:0.708},0).wait(1).to({x:-685.2,y:-642,alpha:0.75},0).wait(1).to({x:-684.8,y:-642.4,alpha:0.792},0).wait(1).to({x:-684.4,y:-642.9,alpha:0.833},0).wait(1).to({x:-684,y:-643.3,alpha:0.875},0).wait(1).to({x:-683.7,y:-643.8,alpha:0.917},0).wait(1).to({x:-683.3,y:-644.2,alpha:0.958},0).wait(1).to({x:-682.9,y:-644.7,alpha:1},0).wait(1).to({x:-683,y:-644.5,alpha:0.962},0).wait(1).to({x:-683.1,y:-644.4,alpha:0.923},0).wait(1).to({x:-683.2,y:-644.2,alpha:0.885},0).wait(1).to({x:-683.4,y:-644.1,alpha:0.846},0).wait(1).to({x:-683.5,y:-643.9,alpha:0.808},0).wait(1).to({x:-683.6,y:-643.8,alpha:0.769},0).wait(1).to({x:-683.7,y:-643.6,alpha:0.731},0).wait(1).to({x:-683.8,y:-643.5,alpha:0.692},0).wait(1).to({x:-683.9,y:-643.3,alpha:0.654},0).wait(1).to({x:-684.1,y:-643.2,alpha:0.615},0).wait(1).to({x:-684.2,y:-643,alpha:0.577},0).wait(1).to({x:-684.3,y:-642.9,alpha:0.538},0).wait(1).to({x:-684.4,y:-642.7,alpha:0.5},0).wait(1).to({x:-684.5,y:-642.5,alpha:0.462},0).wait(1).to({x:-684.6,y:-642.4,alpha:0.423},0).wait(1).to({x:-684.7,y:-642.2,alpha:0.385},0).wait(1).to({x:-684.9,y:-642.1,alpha:0.346},0).wait(1).to({x:-685,y:-641.9,alpha:0.308},0).wait(1).to({x:-685.1,y:-641.8,alpha:0.269},0).wait(1).to({x:-685.2,y:-641.6,alpha:0.231},0).wait(1).to({x:-685.3,y:-641.5,alpha:0.192},0).wait(1).to({x:-685.4,y:-641.3,alpha:0.154},0).wait(1).to({x:-685.6,y:-641.2,alpha:0.115},0).wait(1).to({x:-685.7,y:-641,alpha:0.077},0).wait(1).to({x:-685.8,y:-640.9,alpha:0.038},0).wait(1).to({x:-685.9,y:-640.7,alpha:0},0).wait(61));

	// 3
	this.instance_12 = new lib.Símbolo7();
	this.instance_12.setTransform(-581.9,-636.8,1,1,0,0,0,52,10.3);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(32).to({_off:false},0).wait(1).to({x:-581.5,y:-637.4,alpha:0.048},0).wait(1).to({x:-581.3,y:-638,alpha:0.095},0).wait(1).to({x:-581,y:-638.7,alpha:0.143},0).wait(1).to({x:-580.8,y:-639.4,alpha:0.19},0).wait(1).to({x:-580.6,y:-640,alpha:0.238},0).wait(1).to({x:-580.3,y:-640.7,alpha:0.286},0).wait(1).to({x:-580.1,y:-641.4,alpha:0.333},0).wait(1).to({x:-579.8,y:-642,alpha:0.381},0).wait(1).to({x:-579.6,y:-642.7,alpha:0.429},0).wait(1).to({x:-579.4,y:-643.4,alpha:0.476},0).wait(1).to({x:-579.1,y:-644,alpha:0.524},0).wait(1).to({x:-578.9,y:-644.7,alpha:0.571},0).wait(1).to({x:-578.7,y:-645.4,alpha:0.619},0).wait(1).to({x:-578.4,y:-646,alpha:0.667},0).wait(1).to({x:-578.2,y:-646.7,alpha:0.714},0).wait(1).to({x:-577.9,y:-647.4,alpha:0.762},0).wait(1).to({x:-577.7,y:-648,alpha:0.81},0).wait(1).to({x:-577.5,y:-648.7,alpha:0.857},0).wait(1).to({x:-577.2,y:-649.4,alpha:0.905},0).wait(1).to({x:-577,y:-650,alpha:0.952},0).wait(1).to({x:-576.8,y:-650.7,alpha:1},0).wait(1).to({y:-650.4,alpha:0.952},0).wait(1).to({x:-576.9,y:-650.1,alpha:0.905},0).wait(1).to({x:-577,y:-649.8,alpha:0.857},0).wait(1).to({x:-577.1,y:-649.6,alpha:0.81},0).wait(1).to({x:-577.2,y:-649.3,alpha:0.762},0).wait(1).to({x:-577.3,y:-649,alpha:0.714},0).wait(1).to({x:-577.4,y:-648.7,alpha:0.667},0).wait(1).to({x:-577.5,y:-648.4,alpha:0.619},0).wait(1).to({x:-577.6,y:-648.1,alpha:0.571},0).wait(1).to({x:-577.7,y:-647.8,alpha:0.524},0).wait(1).to({x:-577.8,y:-647.6,alpha:0.476},0).wait(1).to({x:-577.9,y:-647.3,alpha:0.429},0).wait(1).to({x:-578,y:-647,alpha:0.381},0).wait(1).to({x:-578.1,y:-646.7,alpha:0.333},0).wait(1).to({x:-578.2,y:-646.4,alpha:0.286},0).wait(1).to({x:-578.3,y:-646.1,alpha:0.238},0).wait(1).to({x:-578.4,y:-645.8,alpha:0.19},0).wait(1).to({x:-578.5,y:-645.6,alpha:0.143},0).wait(1).to({x:-578.6,y:-645.3,alpha:0.095},0).wait(1).to({x:-578.7,y:-645,alpha:0.048},0).wait(1).to({x:-578.8,y:-644.7,alpha:0},0).wait(46));

	// Layer 10
	this.instance_13 = new lib.Símbolo1("synched",0);
	this.instance_13.setTransform(-548.3,-817.9,0.25,0.25,0,0,0,59,53.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13}]}).wait(120));

	// Layer 11
	this.instance_14 = new lib.matoareia_1();
	this.instance_14.setTransform(-575.3,-588.9,1,1,0,0,0,192,77);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).wait(120));

	// Layer 12
	this.instance_15 = new lib.Cenario();
	this.instance_15.setTransform(-767.9,-1023.9,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).wait(120));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-767.9,-1023.9,384.6,567.8);
p.frameBounds = [rect, new cjs.Rectangle(-767.9,-1023.9,384.6,567.2), new cjs.Rectangle(-767.9,-1023.9,384.6,566.7), new cjs.Rectangle(-767.9,-1023.9,384.6,566.2), new cjs.Rectangle(-767.9,-1023.9,384.6,565.7), new cjs.Rectangle(-767.9,-1023.9,384.6,565.2), new cjs.Rectangle(-767.9,-1023.9,384.6,564.7), new cjs.Rectangle(-767.9,-1023.9,384.6,564.3), new cjs.Rectangle(-767.9,-1023.9,384.6,563.8), new cjs.Rectangle(-767.9,-1023.9,384.6,563.3), new cjs.Rectangle(-767.9,-1023.9,384.6,562.9), new cjs.Rectangle(-767.9,-1023.9,384.6,562.6), new cjs.Rectangle(-767.9,-1023.9,384.6,562.2), new cjs.Rectangle(-767.9,-1023.9,384.6,561.9), new cjs.Rectangle(-767.9,-1023.9,384.6,561.6), new cjs.Rectangle(-767.9,-1023.9,384.6,561.2), new cjs.Rectangle(-767.9,-1023.9,384.6,560.9), new cjs.Rectangle(-767.9,-1023.9,384.6,560.7), new cjs.Rectangle(-767.9,-1023.9,384.6,560.5), new cjs.Rectangle(-767.9,-1023.9,384.6,560.3), new cjs.Rectangle(-767.9,-1023.9,384.6,560.1), rect=new cjs.Rectangle(-767.9,-1023.9,384.6,559.9), rect, new cjs.Rectangle(-767.9,-1023.9,384.6,559.8), rect=new cjs.Rectangle(-767.9,-1023.9,384.6,559.7), rect, rect, rect, new cjs.Rectangle(-767.9,-1023.9,384.6,559.8), new cjs.Rectangle(-767.9,-1023.9,384.6,559.9), new cjs.Rectangle(-767.9,-1023.9,384.6,560), new cjs.Rectangle(-767.9,-1023.9,384.6,560.2), new cjs.Rectangle(-767.9,-1023.9,384.6,560.3), new cjs.Rectangle(-767.9,-1023.9,384.6,560.5), new cjs.Rectangle(-767.9,-1023.9,384.6,560.7), new cjs.Rectangle(-767.9,-1023.9,384.6,560.9), new cjs.Rectangle(-767.9,-1023.9,384.6,561.2), new cjs.Rectangle(-767.9,-1023.9,384.6,561.5), new cjs.Rectangle(-767.9,-1023.9,384.6,561.8), new cjs.Rectangle(-767.9,-1023.9,384.6,562.1), new cjs.Rectangle(-767.9,-1023.9,384.6,562.5), new cjs.Rectangle(-767.9,-1023.9,384.6,562.8), new cjs.Rectangle(-767.9,-1023.9,384.6,563.1), new cjs.Rectangle(-767.9,-1023.9,384.6,563.5), new cjs.Rectangle(-767.9,-1023.9,384.6,563.9), new cjs.Rectangle(-767.9,-1023.9,384.6,564.2), new cjs.Rectangle(-767.9,-1023.9,384.6,564.7), new cjs.Rectangle(-767.9,-1023.9,384.6,565), new cjs.Rectangle(-767.9,-1023.9,384.6,565.4), new cjs.Rectangle(-767.9,-1023.9,384.6,566), new cjs.Rectangle(-767.9,-1023.9,384.6,566.4), new cjs.Rectangle(-767.9,-1023.9,384.6,566.6), new cjs.Rectangle(-767.9,-1023.9,384.6,566.8), new cjs.Rectangle(-767.9,-1023.9,384.6,567), new cjs.Rectangle(-767.9,-1023.9,384.6,567.2), new cjs.Rectangle(-767.9,-1023.9,384.6,567.3), new cjs.Rectangle(-767.9,-1023.9,384.6,567.4), new cjs.Rectangle(-767.9,-1023.9,384.6,567.5), rect=new cjs.Rectangle(-767.9,-1023.9,384.6,567.4), rect, new cjs.Rectangle(-767.9,-1023.9,384.6,567.2), new cjs.Rectangle(-767.9,-1023.9,384.6,567), new cjs.Rectangle(-767.9,-1023.9,384.6,566.8), new cjs.Rectangle(-767.9,-1023.9,384.6,566.5), new cjs.Rectangle(-767.9,-1023.9,384.6,566.2), new cjs.Rectangle(-767.9,-1023.9,384.6,565.7), new cjs.Rectangle(-767.9,-1023.9,384.6,565.3), new cjs.Rectangle(-767.9,-1023.9,384.6,564.7), new cjs.Rectangle(-767.9,-1023.9,384.6,564.1), new cjs.Rectangle(-767.9,-1023.9,384.6,563.5), new cjs.Rectangle(-767.9,-1023.9,384.6,562.8), new cjs.Rectangle(-767.9,-1023.9,384.6,562), new cjs.Rectangle(-767.9,-1023.9,384.6,561.2), new cjs.Rectangle(-767.9,-1023.9,384.6,560.5), new cjs.Rectangle(-767.9,-1023.9,384.6,559.6), new cjs.Rectangle(-767.9,-1023.9,384.6,558.8), new cjs.Rectangle(-767.9,-1023.9,384.6,557.9), new cjs.Rectangle(-767.9,-1023.9,384.6,556.9), new cjs.Rectangle(-767.9,-1023.9,384.6,556), new cjs.Rectangle(-767.9,-1023.9,384.6,555.1), new cjs.Rectangle(-767.9,-1023.9,384.6,554.1), new cjs.Rectangle(-767.9,-1023.9,384.6,553.1), new cjs.Rectangle(-767.9,-1023.9,384.6,552.1), new cjs.Rectangle(-767.9,-1023.9,384.6,551.1), new cjs.Rectangle(-767.9,-1023.9,384.6,551.2), new cjs.Rectangle(-767.9,-1023.9,384.6,551.4), new cjs.Rectangle(-767.9,-1023.9,384.6,551.7), new cjs.Rectangle(-767.9,-1023.9,384.6,551.8), new cjs.Rectangle(-767.9,-1023.9,384.6,552), rect=new cjs.Rectangle(-767.9,-1023.9,384.6,552.2), rect, new cjs.Rectangle(-767.9,-1023.9,384.6,552.4), new cjs.Rectangle(-767.9,-1023.9,384.6,552.5), new cjs.Rectangle(-768.4,-1023.9,385.1,552.6), new cjs.Rectangle(-769.3,-1023.9,386,552.6), new cjs.Rectangle(-770.3,-1023.9,387,552.7), new cjs.Rectangle(-771.2,-1023.9,387.9,552.8), new cjs.Rectangle(-772.1,-1023.9,388.8,552.9), new cjs.Rectangle(-773,-1023.9,389.7,552.9), new cjs.Rectangle(-774.3,-1023.9,391,552.9), new cjs.Rectangle(-774.1,-1023.9,390.8,551.6), new cjs.Rectangle(-774.1,-1023.9,390.8,550.6), new cjs.Rectangle(-774,-1023.9,390.7,549.4), new cjs.Rectangle(-774,-1023.9,390.7,548.3), new cjs.Rectangle(-774,-1023.9,390.7,547.2), new cjs.Rectangle(-774.1,-1023.9,390.8,545.9), new cjs.Rectangle(-774.2,-1023.9,390.9,544.7), new cjs.Rectangle(-774.3,-1023.9,391,543.5), new cjs.Rectangle(-774.5,-1023.9,391.2,542.3), new cjs.Rectangle(-774.7,-1023.9,391.4,541), new cjs.Rectangle(-775,-1023.9,391.7,539.8), new cjs.Rectangle(-775.4,-1023.9,392.1,538.5), new cjs.Rectangle(-775.7,-1023.9,392.4,537.3), new cjs.Rectangle(-776.2,-1023.9,392.9,536.7), new cjs.Rectangle(-776.6,-1023.9,393.3,536.5), new cjs.Rectangle(-777.1,-1023.9,393.8,536.4), new cjs.Rectangle(-777.7,-1023.9,394.4,536.1), new cjs.Rectangle(-778.3,-1023.9,395,535.7), new cjs.Rectangle(-779,-1023.9,395.7,535.4), new cjs.Rectangle(-779.6,-1023.9,396.3,535)];

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;