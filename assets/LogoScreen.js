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
p.nominalBounds = new cjs.Rectangle(0,0.2,1538.3,2270.9);


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
	this.instance.setTransform(5.9,5.9,1,1,0,0,0,5.9,5.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:5.3,y:6.1},0).wait(1).to({x:4.9,y:6.3},0).wait(1).to({x:4.5,y:6.4},0).wait(1).to({x:4.1,y:6.6},0).wait(1).to({x:3.6,y:6.7},0).wait(1).to({x:3.1,y:6.8},0).wait(1).to({x:2.7,y:7},0).wait(1).to({x:2.2,y:7.1},0).wait(1).to({x:1.7,y:7.2},0).wait(1).to({x:1.2,y:7.3},0).wait(1).to({x:0.8,y:7.4},0).wait(1).to({x:0.3,y:7.5},0).wait(1).to({x:0,y:7.6},0).wait(1).to({x:-0.5,y:7.7},0).wait(1).to({x:-1,y:7.8},0).wait(1).to({x:-1.5,y:7.9},0).wait(1).to({x:-2},0).wait(1).to({x:-2.4,y:8},0).wait(1).to({x:-2.9},0).wait(1).to({x:-3.4},0).wait(1).to({x:-3.9},0).wait(1).to({x:-4.4},0).wait(1).to({x:-4.9},0).wait(1).to({x:-5.4},0).wait(1).to({x:-5.9},0).wait(1).to({x:-6.4},0).wait(1).to({x:-6.9,y:7.9},0).wait(1).to({x:-7.4},0).wait(1).to({x:-7.8,y:7.8},0).wait(1).to({x:-8.3,y:7.7},0).wait(1).to({x:-8.8,y:7.6},0).wait(1).to({x:-9.3,y:7.5},0).wait(1).to({x:-9.8,y:7.4},0).wait(1).to({x:-10.3,y:7.3},0).wait(1).to({x:-10.7,y:7.1},0).wait(1).to({x:-11.2,y:7},0).wait(1).to({x:-11.7,y:6.8},0).wait(1).to({x:-12.1,y:6.7},0).wait(1).to({x:-12.6,y:6.5},0).wait(1).to({x:-13,y:6.3},0).wait(1).to({x:-13.5,y:6.1},0).wait(1).to({x:-13.9,y:5.9},0).wait(1).to({x:-14.4,y:5.7},0).wait(1).to({x:-14.8,y:5.5},0).wait(1).to({x:-15.2,y:5.3},0).wait(1).to({x:-15.7,y:5},0).wait(1).to({x:-16.1,y:4.8},0).wait(1).to({x:-16.5,y:4.5},0).wait(1).to({x:-16.9,y:4.2},0).wait(1).to({x:-17.3,y:4},0).wait(1).to({x:-17.7,y:3.7},0).wait(1).to({x:-18.1,y:3.4},0).wait(1).to({x:-18.5,y:3.1},0).wait(1).to({x:-18.9,y:2.8},0).wait(1).to({x:-19.3,y:2.5},0).wait(1).to({x:-19.6,y:2.1},0).wait(1).to({x:-20,y:1.8},0).wait(1).to({x:-20.4,y:1.5},0).wait(1).to({x:-20.7,y:1.1},0).wait(1).to({x:-21.1,y:0.8},0).wait(1).to({x:-21.4,y:0.4},0).wait(1).to({x:-21.8,y:0.1},0).wait(1).to({x:-22.1,y:-0.1},0).wait(1).to({x:-22.4,y:-0.4},0).wait(1).to({x:-22.8,y:-0.8},0).wait(1).to({x:-23.1,y:-1.2},0).wait(1).to({x:-23.4,y:-1.6},0).wait(1).to({x:-23.7,y:-1.9},0).wait(1).to({x:-24,y:-2.3},0).wait(1).to({x:-24.3,y:-2.7},0).wait(1).to({x:-24.6,y:-3.1},0).wait(1).to({x:-24.9,y:-3.5},0).wait(1).to({x:-25.2,y:-3.9},0).wait(1).to({x:-25.5,y:-4.3},0).wait(1).to({x:-25.7,y:-4.7},0).wait(1).to({x:-26,y:-5},0).wait(1).to({x:-26.2,y:-5.4},0).wait(1).to({x:-26.5,y:-5.8},0).wait(1).to({x:-26.9,y:-6.4},0).wait(1).to({x:-27.5,y:-6.9},0).wait(1).to({x:-27.9,y:-7.3},0).wait(1).to({x:-28.3,y:-7.6},0).wait(1).to({x:-28.7,y:-7.9},0).wait(1).to({x:-29.2,y:-8.2},0).wait(1).to({x:-29.7,y:-8.6},0).wait(1).to({x:-30.2,y:-8.9},0).wait(1).to({x:-30.6,y:-9.2},0).wait(1).to({x:-31.1,y:-9.6},0).wait(1).to({x:-31.7,y:-9.9},0).wait(1).to({x:-32.2,y:-10.2},0).wait(1).to({x:-32.7,y:-10.4},0).wait(1).to({x:-33.2,y:-10.7},0).wait(1).to({x:-33.7,y:-11},0).wait(1).to({x:-34.3,y:-11.2},0).wait(1).to({x:-34.8,y:-11.5},0).wait(1).to({x:-35.4,y:-11.7},0).wait(1).to({x:-35.9,y:-11.9},0).wait(1).to({x:-36.5,y:-12.1},0).wait(1).to({x:-37.1,y:-12.3},0).wait(1).to({x:-37.6,y:-12.4},0).wait(1).to({x:-38.2,y:-12.6},0).wait(1).to({x:-38.8,y:-12.7},0).wait(1).to({x:-39.4,y:-12.8},0).wait(1).to({x:-40,y:-12.9},0).wait(1).to({x:-40.6,y:-13},0).wait(1).to({x:-41.2},0).wait(1).to({x:-41.7,y:-13.1},0).wait(1).to({x:-42.3},0).wait(1).to({x:-42.9},0).wait(1).to({x:-43.5},0).wait(1).to({x:-44.1,y:-13},0).wait(1).to({x:-44.7},0).wait(1).to({x:-45.3,y:-12.9},0).wait(1).to({x:-45.9,y:-12.8},0).wait(1).to({x:-46.5,y:-12.7},0).wait(1).to({x:-47.1,y:-12.5},0).wait(1).to({x:-47.6,y:-12.4},0).wait(1).to({x:-48.2,y:-12.2},0).wait(1).to({x:-48.8,y:-12.1},0).wait(1).to({x:-49.3,y:-11.9},0).wait(1).to({x:-49.9,y:-11.7},0).wait(1).to({x:-50.5,y:-11.4},0).wait(1).to({x:-51,y:-11.2},0).wait(1).to({x:-51.5,y:-11},0).wait(1).to({x:-52.1,y:-10.7},0).wait(1).to({x:-52.6,y:-10.4},0).wait(1).to({x:-53.1,y:-10.2},0).wait(1).to({x:-53.7,y:-9.9},0).wait(1).to({x:-54.2,y:-9.6},0).wait(1).to({x:-54.7,y:-9.3},0).wait(1).to({x:-55.2,y:-8.9},0).wait(1).to({x:-55.7,y:-8.6},0).wait(1).to({x:-56.2,y:-8.3},0).wait(1).to({x:-56.6,y:-7.9},0).wait(1).to({x:-57.1,y:-7.6},0).wait(1).to({x:-57.6,y:-7.2},0).wait(1).to({x:-58.1,y:-6.9},0).wait(1).to({x:-58.5,y:-6.5},0).wait(1).to({x:-59,y:-6.1},0).wait(1).to({x:-59.4,y:-5.7},0).wait(1).to({x:-59.9,y:-5.3},0).wait(1).to({x:-60.3,y:-4.9},0).wait(1).to({x:-60.8,y:-4.5},0).wait(1).to({x:-61.2,y:-4.1},0).wait(1).to({x:-61.6,y:-3.7},0).wait(1).to({x:-62.1,y:-3.3},0).wait(1).to({x:-62.5,y:-2.9},0).wait(1).to({x:-62.9,y:-2.5},0).wait(1).to({x:-63.3,y:-2},0).wait(1).to({x:-63.7,y:-1.6},0).wait(1).to({x:-64.1,y:-1.2},0).wait(1).to({x:-64.5,y:-0.7},0).wait(1).to({x:-64.9,y:-0.3},0).wait(1).to({x:-65.3,y:0},0).wait(1).to({x:-65.7,y:0.4},0).wait(1).to({x:-66.1,y:0.9},0).wait(1).to({x:-66.5,y:1.3},0).wait(1).to({x:-66.9,y:1.8},0).wait(1).to({x:-67.2,y:2.2},0).wait(1).to({x:-67.6,y:2.7},0).wait(1).to({x:-68,y:3.2},0).wait(1).to({x:-68.3,y:3.6},0).wait(1).to({x:-68.7,y:4.1},0).wait(1).to({x:-69,y:4.5},0).wait(1).to({x:-69.4,y:5},0).wait(1).to({x:-69.8,y:5.5},0).wait(1).to({x:-70.1,y:5.9},0).wait(1).to({x:-70.3,y:6.3},0).wait(1).to({x:-70.6,y:6.7},0).wait(1).to({x:-71,y:7.2},0).wait(1).to({x:-71.4,y:7.7},0).wait(1).to({x:-71.9,y:8.4},0).wait(1).to({x:-71.2},0).wait(1).to({x:-70.7,y:8.5},0).wait(1).to({x:-70.2},0).wait(1).to({x:-69.9},0).wait(1).to({x:-69.5,y:8.6},0).wait(1).to({x:-69},0).wait(1).to({x:-68.6,y:8.7},0).wait(1).to({x:-68.1},0).wait(1).to({x:-67.7,y:8.8},0).wait(1).to({x:-67.2,y:8.9},0).wait(1).to({x:-66.7},0).wait(1).to({x:-66.3,y:9},0).wait(1).to({x:-65.8,y:9.1},0).wait(1).to({x:-65.4,y:9.2},0).wait(1).to({x:-64.9,y:9.3},0).wait(1).to({x:-64.5,y:9.4},0).wait(1).to({x:-64,y:9.5},0).wait(1).to({x:-63.6,y:9.6},0).wait(1).to({x:-63.1,y:9.7},0).wait(1).to({x:-62.7,y:9.8},0).wait(1).to({x:-62.2,y:10},0).wait(1).to({x:-61.8,y:10.1},0).wait(1).to({x:-61.3,y:10.3},0).wait(1).to({x:-60.9,y:10.4},0).wait(1).to({x:-60.4,y:10.5},0).wait(1).to({x:-60,y:10.7},0).wait(1).to({x:-59.6,y:10.9},0).wait(1).to({x:-59.1,y:11},0).wait(1).to({x:-58.7,y:11.2},0).wait(1).to({x:-58.3,y:11.4},0).wait(1).to({x:-57.8,y:11.6},0).wait(1).to({x:-57.4,y:11.8},0).wait(1).to({x:-57,y:12},0).wait(1).to({x:-56.6,y:12.2},0).wait(1).to({x:-56.2,y:12.4},0).wait(1).to({x:-55.7,y:12.6},0).wait(1).to({x:-55.3,y:12.8},0).wait(1).to({x:-54.9,y:13},0).wait(1).to({x:-54.5,y:13.3},0).wait(1).to({x:-54.1,y:13.5},0).wait(1).to({x:-53.7,y:13.8},0).wait(1).to({x:-53.3,y:14},0).wait(1).to({x:-52.9,y:14.3},0).wait(1).to({x:-52.6,y:14.5},0).wait(1).to({x:-52.2,y:14.8},0).wait(1).to({x:-51.8,y:15.1},0).wait(1).to({x:-51.4,y:15.3},0).wait(1).to({x:-51,y:15.6},0).wait(1).to({x:-50.7,y:15.9},0).wait(1).to({x:-50.3,y:16.2},0).wait(1).to({x:-49.9,y:16.5},0).wait(1).to({x:-49.6,y:16.8},0).wait(1).to({x:-49.2,y:17.1},0).wait(1).to({x:-48.9,y:17.4},0).wait(1).to({x:-48.5,y:17.7},0).wait(1).to({x:-48.2,y:18},0).wait(1).to({x:-47.9,y:18.3},0).wait(1).to({x:-47.5,y:18.7},0).wait(1).to({x:-47.2,y:19},0).wait(1).to({x:-46.9,y:19.3},0).wait(1).to({x:-46.6,y:19.7},0).wait(1).to({x:-46.2,y:20},0).wait(1).to({x:-45.9,y:20.4},0).wait(1).to({x:-45.6,y:20.7},0).wait(1).to({x:-45.3,y:21.1},0).wait(1).to({x:-45,y:21.4},0).wait(1).to({x:-44.7,y:21.8},0).wait(1).to({x:-44.4,y:22.1},0).wait(1).to({x:-44.1,y:22.5},0).wait(1).to({x:-43.8,y:22.9},0).wait(1).to({x:-43.6,y:23.2},0).wait(1).to({x:-43.3,y:23.6},0).wait(1).to({x:-43,y:24},0).wait(1).to({x:-42.8,y:24.4},0).wait(1).to({x:-42.5,y:24.8},0).wait(1).to({x:-42.2,y:25.2},0).wait(1).to({x:-42,y:25.5},0).wait(1).to({x:-41.7,y:25.9},0).wait(1).to({x:-41.5,y:26.3},0).wait(1).to({x:-41.2,y:26.7},0).wait(1).to({x:-41,y:27.1},0).wait(1).to({x:-40.7,y:27.5},0).wait(1).to({x:-40.5,y:27.9},0).wait(1).to({x:-40.3,y:28.3},0).wait(1).to({x:-40.1,y:28.7},0).wait(1).to({x:-39.8,y:29.1},0).wait(1).to({x:-39.6,y:29.6},0).wait(1).to({x:-39.4,y:30},0).wait(1).to({x:-39.2,y:30.4},0).wait(1).to({x:-39,y:30.8},0).wait(1).to({x:-38.8,y:31.2},0).wait(1).to({x:-38.6,y:31.6},0).wait(1).to({x:-38.4,y:32.1},0).wait(1).to({x:-38.2,y:32.5},0).wait(1).to({x:-38,y:32.9},0).wait(1).to({x:-37.8,y:33.3},0).wait(1).to({x:-37.6,y:33.8},0).wait(1).to({x:-37.4,y:34.2},0).wait(1).to({x:-37.2,y:34.6},0).wait(1).to({x:-37,y:35},0).wait(1).to({x:-36.9,y:35.5},0).wait(1).to({x:-36.7,y:35.9},0).wait(1).to({x:-36.5,y:36.3},0).wait(1).to({x:-36.4,y:36.8},0).wait(1).to({x:-36.2,y:37.2},0).wait(1).to({x:-36,y:37.7},0).wait(1).to({x:-35.9,y:38.1},0).wait(1).to({x:-35.7,y:38.5},0).wait(1).to({x:-35.6,y:39},0).wait(1).to({x:-35.4,y:39.4},0).wait(1).to({x:-35.3,y:39.8},0).wait(1).to({x:-35.1,y:40.3},0).wait(1).to({x:-35,y:40.7},0).wait(1).to({x:-34.8,y:41.2},0).wait(1).to({x:-34.7,y:41.6},0).wait(1).to({x:-34.6,y:42.1},0).wait(1).to({x:-34.4,y:42.5},0).wait(1).to({x:-34.3,y:43},0).wait(1).to({x:-34.2,y:43.4},0).wait(1).to({x:-34,y:43.9},0).wait(1).to({x:-33.9,y:44.3},0).wait(1).to({x:-33.8,y:44.8},0).wait(1).to({x:-33.7,y:45.2},0).wait(1).to({x:-33.6,y:45.6},0).wait(1).to({x:-33.4,y:46.1},0).wait(1).to({x:-33.3,y:46.5},0).wait(1).to({x:-33.2,y:47},0).wait(1).to({x:-33.1,y:47.5},0).wait(1).to({x:-33,y:47.9},0).wait(1).to({x:-32.9,y:48.4},0).wait(1).to({x:-32.8,y:48.8},0).wait(1).to({x:-32.7,y:49.2},0).wait(1).to({x:-32.6,y:49.7},0).wait(1).to({x:-32.5,y:50.2},0).wait(1).to({x:-32.4,y:50.6},0).wait(1).to({x:-32.3,y:50.9},0).wait(1).to({y:51.3},0).wait(1).to({x:-32.2,y:51.7},0).wait(1).to({x:-32.1,y:52.1},0).wait(1).to({x:-32,y:52.7},0).wait(1).to({x:-31.9,y:53.4},0).wait(1).to({x:-31.1,y:53.5},0).wait(1).to({x:-30.5},0).wait(1).to({x:-30.1},0).wait(1).to({x:-29.7},0).wait(1).to({x:-29.3},0).wait(1).to({x:-28.7},0).wait(1).to({x:-28.2},0).wait(1).to({x:-27.8},0).wait(1).to({x:-27.2},0).wait(1).to({x:-26.8},0).wait(1).to({x:-26.2},0).wait(1).to({x:-25.7},0).wait(1).to({x:-25.2,y:53.4},0).wait(1).to({x:-24.7},0).wait(1).to({x:-24.2},0).wait(1).to({x:-23.7,y:53.3},0).wait(1).to({x:-23.2,y:53.2},0).wait(1).to({x:-22.7},0).wait(1).to({x:-22.2,y:53.1},0).wait(1).to({x:-21.7,y:53},0).wait(1).to({x:-21.2,y:52.9},0).wait(1).to({x:-20.7,y:52.8},0).wait(1).to({x:-20.2,y:52.7},0).wait(1).to({x:-19.7,y:52.6},0).wait(1).to({x:-19.2,y:52.5},0).wait(1).to({x:-18.7,y:52.4},0).wait(1).to({x:-18.2,y:52.2},0).wait(1).to({x:-17.7,y:52.1},0).wait(1).to({x:-17.2,y:51.9},0).wait(1).to({x:-16.7,y:51.8},0).wait(1).to({x:-16.3,y:51.6},0).wait(1).to({x:-15.8,y:51.4},0).wait(1).to({x:-15.3,y:51.3},0).wait(1).to({x:-14.8,y:51.1},0).wait(1).to({x:-14.4,y:50.9},0).wait(1).to({x:-13.9,y:50.6},0).wait(1).to({x:-13.4,y:50.4},0).wait(1).to({x:-13,y:50.2},0).wait(1).to({x:-12.5,y:50},0).wait(1).to({x:-12.1,y:49.7},0).wait(1).to({x:-11.6,y:49.5},0).wait(1).to({x:-11.2,y:49.2},0).wait(1).to({x:-10.8,y:49},0).wait(1).to({x:-10.3,y:48.7},0).wait(1).to({x:-9.9,y:48.4},0).wait(1).to({x:-9.5,y:48.1},0).wait(1).to({x:-9.1,y:47.8},0).wait(1).to({x:-8.7,y:47.5},0).wait(1).to({x:-8.3,y:47.2},0).wait(1).to({x:-7.9,y:46.9},0).wait(1).to({x:-7.5,y:46.6},0).wait(1).to({x:-7.1,y:46.2},0).wait(1).to({x:-6.7,y:45.9},0).wait(1).to({x:-6.3,y:45.5},0).wait(1).to({x:-6,y:45.2},0).wait(1).to({x:-5.6,y:44.8},0).wait(1).to({x:-5.2,y:44.5},0).wait(1).to({x:-4.9,y:44.1},0).wait(1).to({x:-4.5,y:43.7},0).wait(1).to({x:-4.2,y:43.3},0).wait(1).to({x:-3.9,y:43},0).wait(1).to({x:-3.5,y:42.6},0).wait(1).to({x:-3.2,y:42.2},0).wait(1).to({x:-2.9,y:41.8},0).wait(1).to({x:-2.6,y:41.4},0).wait(1).to({x:-2.3,y:41},0).wait(1).to({x:-2,y:40.6},0).wait(1).to({x:-1.7,y:40.1},0).wait(1).to({x:-1.4,y:39.7},0).wait(1).to({x:-1.1,y:39.3},0).wait(1).to({x:-0.8,y:38.9},0).wait(1).to({x:-0.6,y:38.4},0).wait(1).to({x:-0.3,y:38},0).wait(1).to({x:0,y:37.6},0).wait(1).to({x:0,y:37.1},0).wait(1).to({x:0.3,y:36.7},0).wait(1).to({x:0.5,y:36.2},0).wait(1).to({x:0.8,y:35.8},0).wait(1).to({x:1,y:35.3},0).wait(1).to({x:1.2,y:34.9},0).wait(1).to({x:1.5,y:34.4},0).wait(1).to({x:1.7,y:34},0).wait(1).to({x:1.9,y:33.5},0).wait(1).to({x:2.1,y:33},0).wait(1).to({x:2.3,y:32.6},0).wait(1).to({x:2.5,y:32.1},0).wait(1).to({x:2.7,y:31.6},0).wait(1).to({x:2.9,y:31.2},0).wait(1).to({x:3.1,y:30.7},0).wait(1).to({x:3.3,y:30.2},0).wait(1).to({x:3.5,y:29.7},0).wait(1).to({x:3.7,y:29.3},0).wait(1).to({x:3.8,y:28.8},0).wait(1).to({x:4,y:28.3},0).wait(1).to({x:4.2,y:27.8},0).wait(1).to({x:4.3,y:27.3},0).wait(1).to({x:4.5,y:26.9},0).wait(1).to({x:4.7,y:26.4},0).wait(1).to({x:4.8,y:25.9},0).wait(1).to({x:5,y:25.4},0).wait(1).to({x:5.1,y:24.9},0).wait(1).to({x:5.2,y:24.4},0).wait(1).to({x:5.4,y:23.9},0).wait(1).to({x:5.5,y:23.4},0).wait(1).to({x:5.7,y:22.9},0).wait(1).to({x:5.8,y:22.5},0).wait(1).to({x:5.9,y:22},0).wait(1).to({x:6,y:21.5},0).wait(1).to({x:6.1,y:21},0).wait(1).to({x:6.2,y:20.5},0).wait(1).to({x:6.3,y:20},0).wait(1).to({x:6.5,y:19.5},0).wait(1).to({x:6.6,y:19},0).wait(1).to({x:6.7,y:18.5},0).wait(1).to({x:6.8,y:18},0).wait(1).to({x:6.9,y:17.5},0).wait(1).to({x:7,y:17},0).wait(1).to({x:7.1,y:16.5},0).wait(1).to({x:7.2,y:16},0).wait(1).to({y:15.5},0).wait(1).to({x:7.3,y:15},0).wait(1).to({x:7.4,y:14.5},0).wait(1).to({x:7.5,y:14},0).wait(1).to({x:7.6,y:13.5},0).wait(1).to({x:7.7,y:13},0).wait(1).to({y:12.5},0).wait(1).to({x:7.8,y:12},0).wait(1).to({x:7.9,y:11.5},0).wait(1).to({x:8,y:11},0).wait(1).to({y:10.6},0).wait(1).to({x:8.1,y:10.2},0).wait(1).to({y:9.8},0).wait(1).to({x:8.2,y:9.3},0).wait(1).to({y:8.8},0).wait(1).to({x:8.3,y:8.2},0).wait(1).to({x:8.4,y:7.4},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.5,1.5,11.8,11.8);


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
	this.instance_2.setTransform(-733.8,-856.8,1,1,0,0,0,34.1,55.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).wait(1).to({y:-856.8},0).wait(1).to({skewY:0},0).wait(3).wait(1).to({skewY:-0.1},0).wait(1).wait(1).to({y:-856.9},0).wait(1).wait(1).to({skewY:-0.2},0).wait(3).wait(1).to({skewY:-0.3},0).wait(2).wait(1).to({skewY:-0.4,y:-857},0).wait(3).wait(1).to({skewY:-0.5},0).wait(2).wait(1).to({y:-857.1},0).wait(1).to({skewY:-0.6},0).wait(1).to({x:-733.6},0).wait(2).wait(1).to({skewY:-0.7},0).wait(1).to({y:-857.2},0).wait(1).wait(1).to({y:-857.1},0).wait(1).to({skewY:-0.8,y:-857.2},0).wait(3).wait(1).to({skewY:-0.7,y:-857.1},0).wait(2).wait(1).to({skewY:-0.6,x:-733.7},0).wait(1).to({y:-857},0).wait(1).to({skewY:-0.5},0).wait(2).wait(1).to({skewY:-0.4,y:-856.9},0).wait(1).wait(1).to({skewY:-0.3},0).wait(1).wait(1).to({skewY:-0.2,y:-856.8},0).wait(2).wait(1).to({skewY:-0.1},0).wait(1).to({y:-856.7},0).wait(1).to({skewY:0},0).wait(2).wait(1).to({skewY:0,y:-856.6},0).wait(3).wait(1).to({skewY:0.1,y:-856.5},0).wait(2).wait(1).to({skewY:0.2},0).wait(1).to({y:-856.4},0).wait(1).to({skewY:0.3},0).wait(1).to({x:-733.6},0).wait(1).wait(1).to({skewY:0.4,y:-856.3},0).wait(1).wait(1).to({skewY:0.5},0).wait(1).wait(1).to({y:-856.2},0).wait(1).to({skewY:0.6},0).wait(6).wait(1).to({skewY:0.5,y:-856.3},0).wait(4).wait(1).to({y:-856.4},0).wait(1).to({skewY:0.4},0).wait(5).wait(1).to({skewY:0.3},0).wait(3).wait(1).to({y:-856.5},0).wait(2).wait(1).to({skewY:0.2},0).wait(1).wait(1).to({y:-856.6},0).wait(3).wait(1).to({skewY:0.1},0).wait(5).wait(1).to({skewY:0},0).wait(1).to({y:-856.7},0).wait(1).wait(1).to({x:-733.7},0).wait(4).wait(1).to({y:-856.8},0).wait(1).to({skewY:0},0).wait(3).wait(1).to({skewY:-0.1},0).wait(1).wait(1).to({y:-856.9},0).wait(1).wait(1).to({skewY:-0.2},0).wait(3).wait(1).to({skewY:-0.3},0).wait(3).wait(1).to({skewY:-0.4,y:-857},0).wait(3).wait(1).to({skewY:-0.5},0).wait(1).wait(1).to({y:-857.1},0).wait(1).wait(1).to({skewY:-0.6},0).wait(1).to({x:-733.6},0).wait(2).wait(1).to({skewY:-0.7},0).wait(1).to({y:-857.2},0).wait(1).wait(1).to({y:-857.1},0).wait(1).to({skewY:-0.8,y:-857.2},0).wait(3).wait(1).to({skewY:-0.7,y:-857.1},0).wait(2).wait(1).to({skewY:-0.6,x:-733.7},0).wait(1).to({y:-857},0).wait(1).to({skewY:-0.5},0).wait(2).wait(1).to({skewY:-0.4,y:-856.9},0).wait(1).wait(1).to({skewY:-0.3},0).wait(1).wait(1).to({y:-856.8},0).wait(1).to({skewY:-0.2},0).wait(1).wait(1).to({skewY:-0.1},0).wait(1).wait(1).to({y:-856.7},0).wait(1).to({skewY:0},0).wait(1).wait(1).to({skewY:0},0).wait(1).to({y:-856.6},0).wait(3).wait(1).to({skewY:0.1,y:-856.5},0).wait(2).wait(1).to({skewY:0.2},0).wait(1).to({y:-856.4},0).wait(1).to({skewY:0.3},0).wait(1).to({x:-733.6},0).wait(1).wait(1).to({skewY:0.4,y:-856.3},0).wait(1).wait(1).to({skewY:0.5},0).wait(1).wait(1).to({y:-856.2},0).wait(1).to({skewY:0.6},0).wait(10).wait(1).to({skewY:0.5,y:-856.3},0).wait(9).wait(1).to({y:-856.4},0).wait(1).wait(1).to({skewY:0.4},0).wait(11).wait(1).to({skewY:0.3},0).wait(5).wait(1).to({y:-856.5},0).wait(5).wait(1).to({skewY:0.2},0).wait(3).wait(1).to({y:-856.6},0).wait(7).wait(1).to({skewY:0.1},0).wait(11).wait(1).to({skewY:0,y:-856.7},0).wait(4).wait(1).to({x:-733.7},0).wait(1).to({x:-733.6},0).wait(4).wait(1).to({skewY:0.1,y:-856.6},0).wait(11).wait(1).to({skewY:0.2},0).wait(7).wait(1).to({y:-856.5},0).wait(3).wait(1).to({skewY:0.3},0).wait(5).wait(1).to({y:-856.4},0).wait(5).wait(1).to({skewY:0.4},0).wait(11).wait(1).to({skewY:0.5},0).wait(1).wait(1).to({y:-856.3},0).wait(9).wait(1).to({skewY:0.6,y:-856.2},0).wait(21).wait(1).to({skewY:0.5},0).wait(1).to({y:-856.3},0).wait(12).wait(1).to({y:-856.4},0).wait(1).wait(1).to({skewY:0.4},0).wait(15).wait(1).to({skewY:0.3},0).wait(7).wait(1).to({y:-856.5},0).wait(6).wait(1).to({skewY:0.2},0).wait(5).wait(1).to({y:-856.6},0).wait(9).wait(1).to({skewY:0.1},0).wait(15).wait(1).to({skewY:0},0).wait(1).to({y:-856.7},0).wait(5).wait(1).to({x:-733.7},0).wait(1));

	// Layer 4
	this.instance_3 = new lib.coqueiro2_1("synched",0);
	this.instance_3.setTransform(-716.5,-752.9,1,1,0,0,0,23.4,32.4);

	this.instance_4 = new lib.coqueiro1_1("synched",0);
	this.instance_4.setTransform(-435.6,-809.3,1,1,0,0,0,51.8,84.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(450));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).wait(450));

	// 1
	this.instance_10 = new lib.onda1("synched",0);
	this.instance_10.setTransform(-469.9,-644.8,0.25,0.25,0,0,0,132,44);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({x:-470,y:-644.9,alpha:0.023},0).wait(1).to({x:-470.2,y:-645.2,alpha:0.045},0).wait(1).to({x:-470.4,y:-645.4,alpha:0.068},0).wait(1).to({x:-470.7,y:-645.7,alpha:0.091},0).wait(1).to({x:-470.9,y:-645.9,alpha:0.114},0).wait(1).to({x:-471.1,y:-646.1,alpha:0.136},0).wait(1).to({x:-471.3,y:-646.4,alpha:0.159},0).wait(1).to({x:-471.6,y:-646.7,alpha:0.182},0).wait(1).to({x:-471.8,y:-646.9,alpha:0.205},0).wait(1).to({x:-472,y:-647.2,alpha:0.227},0).wait(1).to({x:-472.3,y:-647.4,alpha:0.25},0).wait(1).to({x:-472.5,y:-647.6,alpha:0.273},0).wait(1).to({x:-472.7,y:-647.9,alpha:0.295},0).wait(1).to({x:-472.9,y:-648.1,alpha:0.318},0).wait(1).to({x:-473.2,y:-648.4,alpha:0.341},0).wait(1).to({x:-473.4,y:-648.7,alpha:0.364},0).wait(1).to({x:-473.6,y:-648.9,alpha:0.386},0).wait(1).to({x:-473.8,y:-649.2,alpha:0.409},0).wait(1).to({x:-474.1,y:-649.4,alpha:0.432},0).wait(1).to({x:-474.3,y:-649.7,alpha:0.455},0).wait(1).to({x:-474.5,y:-649.9,alpha:0.477},0).wait(1).to({x:-474.8,y:-650.2,alpha:0.5},0).wait(1).to({x:-475,y:-650.4,alpha:0.523},0).wait(1).to({x:-475.2,y:-650.6,alpha:0.545},0).wait(1).to({x:-475.4,y:-650.9,alpha:0.568},0).wait(1).to({x:-475.7,y:-651.2,alpha:0.591},0).wait(1).to({x:-475.9,y:-651.4,alpha:0.614},0).wait(1).to({x:-476.1,y:-651.6,alpha:0.636},0).wait(1).to({x:-476.3,y:-651.9,alpha:0.659},0).wait(1).to({x:-476.6,y:-652.1,alpha:0.682},0).wait(1).to({x:-476.8,y:-652.4,alpha:0.705},0).wait(1).to({x:-477,y:-652.7,alpha:0.727},0).wait(1).to({x:-477.2,y:-652.9,alpha:0.75},0).wait(1).to({x:-477.5,y:-653.2,alpha:0.773},0).wait(1).to({x:-477.7,y:-653.4,alpha:0.795},0).wait(1).to({x:-477.9,y:-653.7,alpha:0.818},0).wait(1).to({x:-478.2,y:-653.9,alpha:0.841},0).wait(1).to({x:-478.4,y:-654.2,alpha:0.864},0).wait(1).to({x:-478.6,y:-654.4,alpha:0.886},0).wait(1).to({x:-478.8,y:-654.7,alpha:0.909},0).wait(1).to({x:-479.1,y:-654.9,alpha:0.932},0).wait(1).to({x:-479.3,y:-655.2,alpha:0.955},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.977},0).wait(1).to({x:-479.8,y:-655.7,alpha:1},0).wait(1).to({x:-479.7,y:-655.6,alpha:0.978},0).wait(1).to({x:-479.6,y:-655.5,alpha:0.956},0).wait(1).to({alpha:0.933},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.911},0).wait(1).to({x:-479.4,y:-655.3,alpha:0.889},0).wait(1).to({alpha:0.867},0).wait(1).to({x:-479.3,y:-655.2,alpha:0.844},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.822},0).wait(1).to({alpha:0.8},0).wait(1).to({x:-479.1,y:-655,alpha:0.778},0).wait(1).to({x:-479,y:-654.9,alpha:0.756},0).wait(1).to({alpha:0.733},0).wait(1).to({x:-478.9,y:-654.8,alpha:0.711},0).wait(1).to({x:-478.8,y:-654.7,alpha:0.689},0).wait(1).to({alpha:0.667},0).wait(1).to({x:-478.7,y:-654.6,alpha:0.644},0).wait(1).to({x:-478.6,y:-654.5,alpha:0.622},0).wait(1).to({alpha:0.6},0).wait(1).to({x:-478.5,y:-654.4,alpha:0.578},0).wait(1).to({x:-478.4,y:-654.3,alpha:0.556},0).wait(1).to({alpha:0.533},0).wait(1).to({x:-478.3,y:-654.2,alpha:0.511},0).wait(1).to({x:-478.2,y:-654.1,alpha:0.489},0).wait(1).to({alpha:0.467},0).wait(1).to({x:-478.1,y:-654,alpha:0.444},0).wait(1).to({x:-478,y:-653.9,alpha:0.422},0).wait(1).to({alpha:0.4},0).wait(1).to({x:-477.9,y:-653.8,alpha:0.378},0).wait(1).to({x:-477.8,y:-653.7,alpha:0.356},0).wait(1).to({alpha:0.333},0).wait(1).to({x:-477.7,y:-653.6,alpha:0.311},0).wait(1).to({x:-477.6,y:-653.5,alpha:0.289},0).wait(1).to({alpha:0.267},0).wait(1).to({x:-477.5,y:-653.4,alpha:0.244},0).wait(1).to({x:-477.4,y:-653.3,alpha:0.222},0).wait(1).to({alpha:0.2},0).wait(1).to({x:-477.3,y:-653.2,alpha:0.178},0).wait(1).to({x:-477.2,y:-653.1,alpha:0.156},0).wait(1).to({alpha:0.133},0).wait(1).to({x:-477.1,y:-653,alpha:0.111},0).wait(1).to({x:-477,y:-652.9,alpha:0.089},0).wait(1).to({alpha:0.067},0).wait(1).to({x:-476.9,y:-652.8,alpha:0.044},0).wait(1).to({x:-476.8,y:-652.7,alpha:0.022},0).wait(1).to({alpha:0},0).wait(1).to({x:-476.7,y:-652.6},0).wait(1).to({x:-476.6,y:-652.5},0).wait(1).to({y:-652.4},0).wait(1).to({x:-476.5,y:-652.3},0).wait(1).to({x:-476.4},0).wait(1).to({y:-652.2},0).wait(1).to({x:-476.3,y:-652.1},0).wait(1).to({x:-476.2,y:-652},0).wait(1).to({startPosition:0},0).wait(1).to({x:-476.1,y:-651.9},0).wait(1).to({x:-476,y:-651.8},0).wait(1).to({y:-651.7},0).wait(1).to({x:-475.9},0).wait(1).to({x:-475.8,y:-651.6},0).wait(1).to({y:-651.5},0).wait(1).to({x:-475.7,y:-651.4},0).wait(1).to({x:-475.6},0).wait(1).to({y:-651.3},0).wait(1).to({x:-475.5,y:-651.2},0).wait(1).to({x:-475.4,y:-651.1},0).wait(1).to({startPosition:0},0).wait(1).to({x:-475.3,y:-651},0).wait(1).to({x:-475.2,y:-650.9},0).wait(1).to({y:-650.8},0).wait(1).to({x:-475.1},0).wait(1).to({x:-475,y:-650.7},0).wait(1).to({y:-650.6},0).wait(1).to({x:-474.9,y:-650.5},0).wait(1).to({x:-474.8},0).wait(1).to({y:-650.4},0).wait(1).to({x:-474.7,y:-650.3},0).wait(1).to({x:-474.6,y:-650.2},0).wait(1).to({startPosition:0},0).wait(1).to({x:-474.5,y:-650.1},0).wait(1).to({x:-474.4,y:-650},0).wait(1).to({y:-649.9},0).wait(1).to({x:-474.3},0).wait(1).to({x:-474.2,y:-649.8},0).wait(1).to({y:-649.7},0).wait(1).to({x:-474.1,y:-649.6},0).wait(1).to({x:-474},0).wait(1).to({y:-649.5},0).wait(1).to({x:-473.9,y:-649.4},0).wait(1).to({x:-473.8,y:-649.3},0).wait(1).to({startPosition:0},0).wait(1).to({x:-473.7,y:-649.2},0).wait(1).to({x:-473.6,y:-649.1},0).wait(1).to({y:-649},0).wait(1).to({x:-473.5},0).wait(1).to({x:-473.4,y:-648.9},0).wait(1).to({y:-648.8},0).wait(1).to({x:-473.3,y:-648.7},0).wait(1).to({startPosition:0},0).wait(1).to({x:-473.2,y:-648.6},0).wait(1).to({x:-473.1,y:-648.5},0).wait(1).to({y:-648.4},0).wait(1).to({x:-473,y:-648.3},0).wait(1).to({x:-472.9},0).wait(1).to({y:-648.2},0).wait(1).to({x:-472.8,y:-648.1},0).wait(1).to({x:-472.7,y:-648},0).wait(1).to({startPosition:0},0).wait(1).to({x:-472.6,y:-647.9},0).wait(1).to({x:-472.5,y:-647.8},0).wait(1).to({y:-647.7},0).wait(1).to({x:-472.4},0).wait(1).to({x:-472.3,y:-647.6},0).wait(1).to({y:-647.5},0).wait(1).to({x:-472.2,y:-647.4},0).wait(1).to({x:-472.1},0).wait(1).to({y:-647.3},0).wait(1).to({x:-472,y:-647.2},0).wait(1).to({x:-471.9,y:-647.1},0).wait(1).to({startPosition:0},0).wait(1).to({x:-471.8,y:-647},0).wait(1).to({x:-471.7,y:-646.9},0).wait(1).to({y:-646.8},0).wait(1).to({x:-471.6},0).wait(1).to({x:-471.5,y:-646.7},0).wait(1).to({y:-646.6},0).wait(1).to({x:-471.4,y:-646.5},0).wait(1).to({x:-471.3},0).wait(1).to({y:-646.4},0).wait(1).to({x:-471.2,y:-646.3},0).wait(1).to({x:-471.1,y:-646.2},0).wait(1).to({startPosition:0},0).wait(1).to({x:-471,y:-646.1},0).wait(1).to({x:-470.9,y:-646},0).wait(1).to({y:-645.9},0).wait(1).to({x:-470.8},0).wait(1).to({x:-470.7,y:-645.8},0).wait(1).to({y:-645.7},0).wait(1).to({x:-470.6,y:-645.6},0).wait(1).to({x:-470.5},0).wait(1).to({y:-645.5},0).wait(1).to({x:-470.4,y:-645.4},0).wait(1).to({x:-470.3,y:-645.3},0).wait(1).to({startPosition:0},0).wait(1).to({x:-470.2,y:-645.2},0).wait(1).to({x:-470.1,y:-645.1},0).wait(1).to({y:-645},0).wait(1).to({x:-470},0).wait(1).to({x:-469.9,y:-644.9},0).wait(1).to({y:-644.8},0).wait(1).to({x:-469.8,y:-644.7},0).wait(1).to({startPosition:0},0).wait(1).to({x:-470.1,y:-645,alpha:0.034},0).wait(1).to({x:-470.4,y:-645.4,alpha:0.069},0).wait(1).to({x:-470.8,y:-645.8,alpha:0.103},0).wait(1).to({x:-471.1,y:-646.2,alpha:0.138},0).wait(1).to({x:-471.5,y:-646.5,alpha:0.172},0).wait(1).to({x:-471.8,y:-646.9,alpha:0.207},0).wait(1).to({x:-472.2,y:-647.3,alpha:0.241},0).wait(1).to({x:-472.5,y:-647.7,alpha:0.276},0).wait(1).to({x:-472.9,y:-648.1,alpha:0.31},0).wait(1).to({x:-473.2,y:-648.4,alpha:0.345},0).wait(1).to({x:-473.5,y:-648.8,alpha:0.379},0).wait(1).to({x:-473.9,y:-649.2,alpha:0.414},0).wait(1).to({x:-474.2,y:-649.6,alpha:0.448},0).wait(1).to({x:-474.6,y:-650,alpha:0.483},0).wait(1).to({x:-474.9,y:-650.3,alpha:0.517},0).wait(1).to({x:-475.3,y:-650.7,alpha:0.552},0).wait(1).to({x:-475.6,y:-651.1,alpha:0.586},0).wait(1).to({x:-476,y:-651.5,alpha:0.621},0).wait(1).to({x:-476.3,y:-651.9,alpha:0.655},0).wait(1).to({x:-476.6,y:-652.2,alpha:0.69},0).wait(1).to({x:-477,y:-652.6,alpha:0.724},0).wait(1).to({x:-477.3,y:-653,alpha:0.759},0).wait(1).to({x:-477.7,y:-653.4,alpha:0.793},0).wait(1).to({x:-478,y:-653.8,alpha:0.828},0).wait(1).to({x:-478.4,y:-654.1,alpha:0.862},0).wait(1).to({x:-478.7,y:-654.5,alpha:0.897},0).wait(1).to({x:-479.1,y:-654.9,alpha:0.931},0).wait(1).to({x:-479.4,y:-655.3,alpha:0.966},0).wait(1).to({x:-479.8,y:-655.7,alpha:1},0).wait(1).to({x:-479.6,y:-655.5,alpha:0.972},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.944},0).wait(1).to({x:-479.4,y:-655.2,alpha:0.917},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.889},0).wait(1).to({x:-479.1,y:-654.9,alpha:0.861},0).wait(1).to({x:-479,y:-654.8,alpha:0.833},0).wait(1).to({x:-478.8,y:-654.6,alpha:0.806},0).wait(1).to({x:-478.7,y:-654.5,alpha:0.778},0).wait(1).to({x:-478.6,y:-654.3,alpha:0.75},0).wait(1).to({x:-478.4,y:-654.2,alpha:0.722},0).wait(1).to({x:-478.3,y:-654,alpha:0.694},0).wait(1).to({x:-478.2,y:-653.9,alpha:0.667},0).wait(1).to({x:-478,y:-653.8,alpha:0.639},0).wait(1).to({x:-477.9,y:-653.6,alpha:0.611},0).wait(1).to({x:-477.8,y:-653.5,alpha:0.583},0).wait(1).to({x:-477.6,y:-653.3,alpha:0.556},0).wait(1).to({x:-477.5,y:-653.2,alpha:0.528},0).wait(1).to({x:-477.4,y:-653,alpha:0.5},0).wait(1).to({x:-477.2,y:-652.9,alpha:0.472},0).wait(1).to({x:-477.1,y:-652.7,alpha:0.444},0).wait(1).to({x:-477,y:-652.6,alpha:0.417},0).wait(1).to({x:-476.8,y:-652.4,alpha:0.389},0).wait(1).to({x:-476.7,y:-652.3,alpha:0.361},0).wait(1).to({x:-476.6,y:-652.2,alpha:0.333},0).wait(1).to({x:-476.5,y:-652,alpha:0.306},0).wait(1).to({x:-476.3,y:-651.9,alpha:0.278},0).wait(1).to({x:-476.2,y:-651.7,alpha:0.25},0).wait(1).to({x:-476.1,y:-651.6,alpha:0.222},0).wait(1).to({x:-475.9,y:-651.4,alpha:0.194},0).wait(1).to({x:-475.8,y:-651.3,alpha:0.167},0).wait(1).to({x:-475.7,y:-651.1,alpha:0.139},0).wait(1).to({x:-475.5,y:-651,alpha:0.111},0).wait(1).to({x:-475.4,y:-650.8,alpha:0.083},0).wait(1).to({x:-475.3,y:-650.7,alpha:0.056},0).wait(1).to({x:-475.1,y:-650.5,alpha:0.028},0).wait(1).to({x:-475,y:-650.4,alpha:0},0).wait(1).to({x:-474.9,y:-650.3},0).wait(1).to({startPosition:0},0).wait(1).to({x:-474.8,y:-650.2},0).wait(1).to({y:-650.1},0).wait(1).to({x:-474.7},0).wait(1).to({x:-474.6,y:-650},0).wait(1).to({y:-649.9},0).wait(1).to({x:-474.5},0).wait(1).to({x:-474.4,y:-649.8},0).wait(1).to({y:-649.7},0).wait(1).to({x:-474.3,y:-649.6},0).wait(1).to({startPosition:0},0).wait(1).to({x:-474.2,y:-649.5},0).wait(1).to({x:-474.1,y:-649.4},0).wait(1).to({startPosition:0},0).wait(1).to({x:-474,y:-649.3},0).wait(1).to({x:-473.9,y:-649.2},0).wait(1).to({startPosition:0},0).wait(1).to({x:-473.8,y:-649.1},0).wait(1).to({y:-649},0).wait(1).to({x:-473.7},0).wait(1).to({x:-473.6,y:-648.9},0).wait(1).to({y:-648.8},0).wait(1).to({x:-473.5},0).wait(1).to({x:-473.4,y:-648.7},0).wait(1).to({y:-648.6},0).wait(1).to({x:-473.3},0).wait(1).to({y:-648.5},0).wait(1).to({x:-473.2,y:-648.4},0).wait(1).to({x:-473.1,y:-648.3},0).wait(1).to({startPosition:0},0).wait(1).to({x:-473,y:-648.2},0).wait(1).to({x:-472.9,y:-648.1},0).wait(1).to({startPosition:0},0).wait(1).to({x:-472.8,y:-648},0).wait(1).to({y:-647.9},0).wait(1).to({x:-472.7},0).wait(1).to({x:-472.6,y:-647.8},0).wait(1).to({y:-647.7},0).wait(1).to({x:-472.5},0).wait(1).to({x:-472.4,y:-647.6},0).wait(1).to({y:-647.5},0).wait(1).to({x:-472.3},0).wait(1).to({y:-647.4},0).wait(1).to({x:-472.2,y:-647.3},0).wait(1).to({x:-472.1},0).wait(1).to({y:-647.2},0).wait(1).to({x:-472,y:-647.1},0).wait(1).to({x:-471.9,y:-647},0).wait(1).to({startPosition:0},0).wait(1).to({x:-471.8,y:-646.9},0).wait(1).to({y:-646.8},0).wait(1).to({x:-471.7},0).wait(1).to({x:-471.6,y:-646.7},0).wait(1).to({y:-646.6},0).wait(1).to({x:-471.5},0).wait(1).to({x:-471.4,y:-646.5},0).wait(1).to({y:-646.4},0).wait(1).to({x:-471.3},0).wait(1).to({y:-646.3},0).wait(1).to({x:-471.2,y:-646.2},0).wait(1).to({x:-471.1},0).wait(1).to({y:-646.1},0).wait(1).to({x:-471,y:-646},0).wait(1).to({x:-470.9},0).wait(1).to({y:-645.9},0).wait(1).to({x:-470.8,y:-645.8},0).wait(1).to({y:-645.7},0).wait(1).to({x:-470.7},0).wait(1).to({x:-470.6,y:-645.6},0).wait(1).to({y:-645.5},0).wait(1).to({x:-470.5},0).wait(1).to({x:-470.4,y:-645.4},0).wait(1).to({y:-645.3},0).wait(1).to({x:-470.3},0).wait(1).to({y:-645.2},0).wait(1).to({x:-470.2,y:-645.1},0).wait(1).to({x:-470.1},0).wait(1).to({y:-645},0).wait(1).to({x:-470,y:-644.9},0).wait(1).to({x:-469.9},0).wait(1).to({y:-644.8},0).wait(1).to({x:-469.8,y:-644.7},0).wait(1).to({startPosition:0},0).wait(1).to({x:-470.1,y:-645,alpha:0.034},0).wait(1).to({x:-470.4,y:-645.4,alpha:0.069},0).wait(1).to({x:-470.8,y:-645.8,alpha:0.103},0).wait(1).to({x:-471.1,y:-646.2,alpha:0.138},0).wait(1).to({x:-471.5,y:-646.5,alpha:0.172},0).wait(1).to({x:-471.8,y:-646.9,alpha:0.207},0).wait(1).to({x:-472.2,y:-647.3,alpha:0.241},0).wait(1).to({x:-472.5,y:-647.7,alpha:0.276},0).wait(1).to({x:-472.9,y:-648.1,alpha:0.31},0).wait(1).to({x:-473.2,y:-648.4,alpha:0.345},0).wait(1).to({x:-473.5,y:-648.8,alpha:0.379},0).wait(1).to({x:-473.9,y:-649.2,alpha:0.414},0).wait(1).to({x:-474.2,y:-649.6,alpha:0.448},0).wait(1).to({x:-474.6,y:-650,alpha:0.483},0).wait(1).to({x:-474.9,y:-650.3,alpha:0.517},0).wait(1).to({x:-475.3,y:-650.7,alpha:0.552},0).wait(1).to({x:-475.6,y:-651.1,alpha:0.586},0).wait(1).to({x:-476,y:-651.5,alpha:0.621},0).wait(1).to({x:-476.3,y:-651.9,alpha:0.655},0).wait(1).to({x:-476.6,y:-652.2,alpha:0.69},0).wait(1).to({x:-477,y:-652.6,alpha:0.724},0).wait(1).to({x:-477.3,y:-653,alpha:0.759},0).wait(1).to({x:-477.7,y:-653.4,alpha:0.793},0).wait(1).to({x:-478,y:-653.8,alpha:0.828},0).wait(1).to({x:-478.4,y:-654.1,alpha:0.862},0).wait(1).to({x:-478.7,y:-654.5,alpha:0.897},0).wait(1).to({x:-479.1,y:-654.9,alpha:0.931},0).wait(1).to({x:-479.4,y:-655.3,alpha:0.966},0).wait(1).to({x:-479.8,y:-655.7,alpha:1},0).wait(1).to({x:-479.6,y:-655.5,alpha:0.972},0).wait(1).to({x:-479.5,y:-655.4,alpha:0.944},0).wait(1).to({x:-479.4,y:-655.2,alpha:0.917},0).wait(1).to({x:-479.2,y:-655.1,alpha:0.889},0).wait(1).to({x:-479.1,y:-654.9,alpha:0.861},0).wait(1).to({x:-479,y:-654.8,alpha:0.833},0).wait(1).to({x:-478.8,y:-654.6,alpha:0.806},0).wait(1).to({x:-478.7,y:-654.5,alpha:0.778},0).wait(1).to({x:-478.6,y:-654.3,alpha:0.75},0).wait(1).to({x:-478.4,y:-654.2,alpha:0.722},0).wait(1).to({x:-478.3,y:-654,alpha:0.694},0).wait(1).to({x:-478.2,y:-653.9,alpha:0.667},0).wait(1).to({x:-478,y:-653.8,alpha:0.639},0).wait(1).to({x:-477.9,y:-653.6,alpha:0.611},0).wait(1).to({x:-477.8,y:-653.5,alpha:0.583},0).wait(1).to({x:-477.6,y:-653.3,alpha:0.556},0).wait(1).to({x:-477.5,y:-653.2,alpha:0.528},0).wait(1).to({x:-477.4,y:-653,alpha:0.5},0).wait(1).to({x:-477.2,y:-652.9,alpha:0.472},0).wait(1).to({x:-477.1,y:-652.7,alpha:0.444},0).wait(1).to({x:-477,y:-652.6,alpha:0.417},0).wait(1).to({x:-476.8,y:-652.4,alpha:0.389},0).wait(1).to({x:-476.7,y:-652.3,alpha:0.361},0).wait(1).to({x:-476.6,y:-652.2,alpha:0.333},0).wait(1).to({x:-476.5,y:-652,alpha:0.306},0).wait(1).to({x:-476.3,y:-651.9,alpha:0.278},0).wait(1).to({x:-476.2,y:-651.7,alpha:0.25},0).wait(1).to({x:-476.1,y:-651.6,alpha:0.222},0).wait(1).to({x:-475.9,y:-651.4,alpha:0.194},0).wait(1).to({x:-475.8,y:-651.3,alpha:0.167},0).wait(1).to({x:-475.7,y:-651.1,alpha:0.139},0).wait(1).to({x:-475.5,y:-651,alpha:0.111},0).wait(1).to({x:-475.4,y:-650.8,alpha:0.083},0).wait(1).to({x:-475.3,y:-650.7,alpha:0.056},0).wait(1).to({x:-475.1,y:-650.5,alpha:0.028},0).wait(1).to({x:-475,y:-650.4,alpha:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// 2
	this.instance_11 = new lib.Símbolo6();
	this.instance_11.setTransform(-692,-633.8,1,1,0,0,0,20.6,8.3);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(19).to({_off:false},0).wait(1).to({x:-691.7,y:-633.9,alpha:0.019},0).wait(1).to({x:-691.6,y:-634.1,alpha:0.037},0).wait(1).to({x:-691.4,y:-634.3,alpha:0.056},0).wait(1).to({x:-691.2,y:-634.5,alpha:0.074},0).wait(1).to({x:-691.1,y:-634.7,alpha:0.093},0).wait(1).to({x:-690.9,y:-634.9,alpha:0.111},0).wait(1).to({x:-690.7,y:-635.1,alpha:0.13},0).wait(1).to({x:-690.6,y:-635.3,alpha:0.148},0).wait(1).to({x:-690.4,y:-635.5,alpha:0.167},0).wait(1).to({x:-690.2,y:-635.7,alpha:0.185},0).wait(1).to({x:-690.1,y:-635.9,alpha:0.204},0).wait(1).to({x:-689.9,y:-636.1,alpha:0.222},0).wait(1).to({x:-689.7,y:-636.3,alpha:0.241},0).wait(1).to({x:-689.6,y:-636.6,alpha:0.259},0).wait(1).to({x:-689.4,y:-636.8,alpha:0.278},0).wait(1).to({x:-689.2,y:-637,alpha:0.296},0).wait(1).to({x:-689.1,y:-637.2,alpha:0.315},0).wait(1).to({x:-688.9,y:-637.4,alpha:0.333},0).wait(1).to({x:-688.7,y:-637.6,alpha:0.352},0).wait(1).to({x:-688.6,y:-637.8,alpha:0.37},0).wait(1).to({x:-688.4,y:-638,alpha:0.389},0).wait(1).to({x:-688.2,y:-638.2,alpha:0.407},0).wait(1).to({x:-688.1,y:-638.4,alpha:0.426},0).wait(1).to({x:-687.9,y:-638.6,alpha:0.444},0).wait(1).to({x:-687.7,y:-638.8,alpha:0.463},0).wait(1).to({x:-687.6,y:-639,alpha:0.481},0).wait(1).to({x:-687.4,y:-639.2,alpha:0.5},0).wait(1).to({x:-687.2,y:-639.4,alpha:0.519},0).wait(1).to({x:-687.1,y:-639.6,alpha:0.537},0).wait(1).to({x:-686.9,y:-639.8,alpha:0.556},0).wait(1).to({x:-686.7,y:-640,alpha:0.574},0).wait(1).to({x:-686.6,y:-640.2,alpha:0.593},0).wait(1).to({x:-686.4,y:-640.4,alpha:0.611},0).wait(1).to({x:-686.2,y:-640.6,alpha:0.63},0).wait(1).to({x:-686.1,y:-640.8,alpha:0.648},0).wait(1).to({x:-685.9,y:-641,alpha:0.667},0).wait(1).to({x:-685.7,y:-641.2,alpha:0.685},0).wait(1).to({x:-685.6,y:-641.4,alpha:0.704},0).wait(1).to({x:-685.4,y:-641.6,alpha:0.722},0).wait(1).to({x:-685.2,y:-641.8,alpha:0.741},0).wait(1).to({x:-685.1,y:-642.1,alpha:0.759},0).wait(1).to({x:-684.9,y:-642.3,alpha:0.778},0).wait(1).to({x:-684.7,y:-642.5,alpha:0.796},0).wait(1).to({x:-684.6,y:-642.7,alpha:0.815},0).wait(1).to({x:-684.4,y:-642.9,alpha:0.833},0).wait(1).to({x:-684.2,y:-643.1,alpha:0.852},0).wait(1).to({x:-684.1,y:-643.3,alpha:0.87},0).wait(1).to({x:-683.9,y:-643.5,alpha:0.889},0).wait(1).to({x:-683.7,y:-643.7,alpha:0.907},0).wait(1).to({x:-683.6,y:-643.9,alpha:0.926},0).wait(1).to({x:-683.4,y:-644.1,alpha:0.944},0).wait(1).to({x:-683.2,y:-644.3,alpha:0.963},0).wait(1).to({x:-683.1,y:-644.5,alpha:0.981},0).wait(1).to({x:-682.9,y:-644.7,alpha:1},0).wait(1).to({x:-683,y:-644.6,alpha:0.978},0).wait(1).to({y:-644.5,alpha:0.957},0).wait(1).to({x:-683.1,y:-644.4,alpha:0.935},0).wait(1).to({x:-683.2,alpha:0.913},0).wait(1).to({y:-644.3,alpha:0.891},0).wait(1).to({x:-683.3,y:-644.2,alpha:0.87},0).wait(1).to({x:-683.4,y:-644.1,alpha:0.848},0).wait(1).to({y:-644,alpha:0.826},0).wait(1).to({x:-683.5,y:-643.9,alpha:0.804},0).wait(1).to({x:-683.6,y:-643.8,alpha:0.783},0).wait(1).to({y:-643.7,alpha:0.761},0).wait(1).to({x:-683.7,alpha:0.739},0).wait(1).to({y:-643.6,alpha:0.717},0).wait(1).to({x:-683.8,y:-643.5,alpha:0.696},0).wait(1).to({x:-683.9,y:-643.4,alpha:0.674},0).wait(1).to({y:-643.3,alpha:0.652},0).wait(1).to({x:-684,y:-643.2,alpha:0.63},0).wait(1).to({x:-684.1,y:-643.1,alpha:0.609},0).wait(1).to({y:-643,alpha:0.587},0).wait(1).to({x:-684.2,alpha:0.565},0).wait(1).to({x:-684.3,y:-642.9,alpha:0.543},0).wait(1).to({y:-642.8,alpha:0.522},0).wait(1).to({x:-684.4,y:-642.7,alpha:0.5},0).wait(1).to({x:-684.5,y:-642.6,alpha:0.478},0).wait(1).to({y:-642.5,alpha:0.457},0).wait(1).to({x:-684.6,y:-642.4,alpha:0.435},0).wait(1).to({x:-684.7,alpha:0.413},0).wait(1).to({y:-642.3,alpha:0.391},0).wait(1).to({x:-684.8,y:-642.2,alpha:0.37},0).wait(1).to({x:-684.9,y:-642.1,alpha:0.348},0).wait(1).to({y:-642,alpha:0.326},0).wait(1).to({x:-685,y:-641.9,alpha:0.304},0).wait(1).to({x:-685.1,y:-641.8,alpha:0.283},0).wait(1).to({y:-641.7,alpha:0.261},0).wait(1).to({x:-685.2,alpha:0.239},0).wait(1).to({y:-641.6,alpha:0.217},0).wait(1).to({x:-685.3,y:-641.5,alpha:0.196},0).wait(1).to({x:-685.4,y:-641.4,alpha:0.174},0).wait(1).to({y:-641.3,alpha:0.152},0).wait(1).to({x:-685.5,y:-641.2,alpha:0.13},0).wait(1).to({x:-685.6,y:-641.1,alpha:0.109},0).wait(1).to({y:-641,alpha:0.087},0).wait(1).to({x:-685.7,alpha:0.065},0).wait(1).to({x:-685.8,y:-640.9,alpha:0.043},0).wait(1).to({y:-640.8,alpha:0.022},0).wait(1).to({x:-685.9,y:-640.7,alpha:0},0).wait(151).to({_off:true},1).wait(1).to({x:-691.9,y:-633.7,_off:false},0).wait(1).to({x:-691.7,y:-633.9,alpha:0.019},0).wait(1).to({x:-691.6,y:-634.1,alpha:0.037},0).wait(1).to({x:-691.4,y:-634.3,alpha:0.056},0).wait(1).to({x:-691.2,y:-634.5,alpha:0.074},0).wait(1).to({x:-691.1,y:-634.7,alpha:0.093},0).wait(1).to({x:-690.9,y:-634.9,alpha:0.111},0).wait(1).to({x:-690.7,y:-635.1,alpha:0.13},0).wait(1).to({x:-690.6,y:-635.3,alpha:0.148},0).wait(1).to({x:-690.4,y:-635.5,alpha:0.167},0).wait(1).to({x:-690.2,y:-635.7,alpha:0.185},0).wait(1).to({x:-690.1,y:-635.9,alpha:0.204},0).wait(1).to({x:-689.9,y:-636.1,alpha:0.222},0).wait(1).to({x:-689.7,y:-636.3,alpha:0.241},0).wait(1).to({x:-689.6,y:-636.6,alpha:0.259},0).wait(1).to({x:-689.4,y:-636.8,alpha:0.278},0).wait(1).to({x:-689.2,y:-637,alpha:0.296},0).wait(1).to({x:-689.1,y:-637.2,alpha:0.315},0).wait(1).to({x:-688.9,y:-637.4,alpha:0.333},0).wait(1).to({x:-688.7,y:-637.6,alpha:0.352},0).wait(1).to({x:-688.6,y:-637.8,alpha:0.37},0).wait(1).to({x:-688.4,y:-638,alpha:0.389},0).wait(1).to({x:-688.2,y:-638.2,alpha:0.407},0).wait(1).to({x:-688.1,y:-638.4,alpha:0.426},0).wait(1).to({x:-687.9,y:-638.6,alpha:0.444},0).wait(1).to({x:-687.7,y:-638.8,alpha:0.463},0).wait(1).to({x:-687.6,y:-639,alpha:0.481},0).wait(1).to({x:-687.4,y:-639.2,alpha:0.5},0).wait(1).to({x:-687.2,y:-639.4,alpha:0.519},0).wait(1).to({x:-687.1,y:-639.6,alpha:0.537},0).wait(1).to({x:-686.9,y:-639.8,alpha:0.556},0).wait(1).to({x:-686.7,y:-640,alpha:0.574},0).wait(1).to({x:-686.6,y:-640.2,alpha:0.593},0).wait(1).to({x:-686.4,y:-640.4,alpha:0.611},0).wait(1).to({x:-686.2,y:-640.6,alpha:0.63},0).wait(1).to({x:-686.1,y:-640.8,alpha:0.648},0).wait(1).to({x:-685.9,y:-641,alpha:0.667},0).wait(1).to({x:-685.7,y:-641.2,alpha:0.685},0).wait(1).to({x:-685.6,y:-641.4,alpha:0.704},0).wait(1).to({x:-685.4,y:-641.6,alpha:0.722},0).wait(1).to({x:-685.2,y:-641.8,alpha:0.741},0).wait(1).to({x:-685.1,y:-642.1,alpha:0.759},0).wait(1).to({x:-684.9,y:-642.3,alpha:0.778},0).wait(1).to({x:-684.7,y:-642.5,alpha:0.796},0).wait(1).to({x:-684.6,y:-642.7,alpha:0.815},0).wait(1).to({x:-684.4,y:-642.9,alpha:0.833},0).wait(1).to({x:-684.2,y:-643.1,alpha:0.852},0).wait(1).to({x:-684.1,y:-643.3,alpha:0.87},0).wait(1).to({x:-683.9,y:-643.5,alpha:0.889},0).wait(1).to({x:-683.7,y:-643.7,alpha:0.907},0).wait(1).to({x:-683.6,y:-643.9,alpha:0.926},0).wait(1).to({x:-683.4,y:-644.1,alpha:0.944},0).wait(1).to({x:-683.2,y:-644.3,alpha:0.963},0).wait(1).to({x:-683.1,y:-644.5,alpha:0.981},0).wait(1).to({x:-682.9,y:-644.7,alpha:1},0).wait(1).to({x:-683,y:-644.6,alpha:0.978},0).wait(1).to({y:-644.5,alpha:0.957},0).wait(1).to({x:-683.1,y:-644.4,alpha:0.935},0).wait(1).to({x:-683.2,alpha:0.913},0).wait(1).to({y:-644.3,alpha:0.891},0).wait(1).to({x:-683.3,y:-644.2,alpha:0.87},0).wait(1).to({x:-683.4,y:-644.1,alpha:0.848},0).wait(1).to({y:-644,alpha:0.826},0).wait(1).to({x:-683.5,y:-643.9,alpha:0.804},0).wait(1).to({x:-683.6,y:-643.8,alpha:0.783},0).wait(1).to({y:-643.7,alpha:0.761},0).wait(1).to({x:-683.7,alpha:0.739},0).wait(1).to({y:-643.6,alpha:0.717},0).wait(1).to({x:-683.8,y:-643.5,alpha:0.696},0).wait(1).to({x:-683.9,y:-643.4,alpha:0.674},0).wait(1).to({y:-643.3,alpha:0.652},0).wait(1).to({x:-684,y:-643.2,alpha:0.63},0).wait(1).to({x:-684.1,y:-643.1,alpha:0.609},0).wait(1).to({y:-643,alpha:0.587},0).wait(1).to({x:-684.2,alpha:0.565},0).wait(1).to({x:-684.3,y:-642.9,alpha:0.543},0).wait(1).to({y:-642.8,alpha:0.522},0).wait(1).to({x:-684.4,y:-642.7,alpha:0.5},0).wait(1).to({x:-684.5,y:-642.6,alpha:0.478},0).wait(1).to({y:-642.5,alpha:0.457},0).wait(1).to({x:-684.6,y:-642.4,alpha:0.435},0).wait(1).to({x:-684.7,alpha:0.413},0).wait(1).to({y:-642.3,alpha:0.391},0).wait(1).to({x:-684.8,y:-642.2,alpha:0.37},0).wait(1).to({x:-684.9,y:-642.1,alpha:0.348},0).wait(1).to({y:-642,alpha:0.326},0).wait(1).to({x:-685,y:-641.9,alpha:0.304},0).wait(1).to({x:-685.1,y:-641.8,alpha:0.283},0).wait(1).to({y:-641.7,alpha:0.261},0).wait(1).to({x:-685.2,alpha:0.239},0).wait(1).to({y:-641.6,alpha:0.217},0).wait(1).to({x:-685.3,y:-641.5,alpha:0.196},0).wait(1).to({x:-685.4,y:-641.4,alpha:0.174},0).wait(1).to({y:-641.3,alpha:0.152},0).wait(1).to({x:-685.5,y:-641.2,alpha:0.13},0).wait(1).to({x:-685.6,y:-641.1,alpha:0.109},0).wait(1).to({y:-641,alpha:0.087},0).wait(1).to({x:-685.7,alpha:0.065},0).wait(1).to({x:-685.8,y:-640.9,alpha:0.043},0).wait(1).to({y:-640.8,alpha:0.022},0).wait(1).to({x:-685.9,y:-640.7,alpha:0},0).to({_off:true},1).wait(77));

	// 3
	this.instance_12 = new lib.Símbolo7();
	this.instance_12.setTransform(-581.9,-636.8,1,1,0,0,0,52,10.3);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(72).to({_off:false},0).wait(1).to({x:-581.6,y:-637,alpha:0.024},0).wait(1).to({x:-581.5,y:-637.4,alpha:0.049},0).wait(1).to({x:-581.4,y:-637.7,alpha:0.073},0).wait(1).to({x:-581.3,y:-638.1,alpha:0.098},0).wait(1).to({x:-581.1,y:-638.4,alpha:0.122},0).wait(1).to({x:-581,y:-638.7,alpha:0.146},0).wait(1).to({x:-580.9,y:-639.1,alpha:0.171},0).wait(1).to({x:-580.8,y:-639.4,alpha:0.195},0).wait(1).to({x:-580.7,y:-639.8,alpha:0.22},0).wait(1).to({x:-580.5,y:-640.1,alpha:0.244},0).wait(1).to({x:-580.4,y:-640.5,alpha:0.268},0).wait(1).to({x:-580.3,y:-640.8,alpha:0.293},0).wait(1).to({x:-580.2,y:-641.1,alpha:0.317},0).wait(1).to({x:-580,y:-641.5,alpha:0.341},0).wait(1).to({x:-579.9,y:-641.8,alpha:0.366},0).wait(1).to({x:-579.8,y:-642.2,alpha:0.39},0).wait(1).to({x:-579.7,y:-642.5,alpha:0.415},0).wait(1).to({x:-579.6,y:-642.8,alpha:0.439},0).wait(1).to({x:-579.4,y:-643.2,alpha:0.463},0).wait(1).to({x:-579.3,y:-643.5,alpha:0.488},0).wait(1).to({x:-579.2,y:-643.9,alpha:0.512},0).wait(1).to({x:-579.1,y:-644.2,alpha:0.537},0).wait(1).to({x:-578.9,y:-644.6,alpha:0.561},0).wait(1).to({x:-578.8,y:-644.9,alpha:0.585},0).wait(1).to({x:-578.7,y:-645.2,alpha:0.61},0).wait(1).to({x:-578.6,y:-645.6,alpha:0.634},0).wait(1).to({x:-578.5,y:-645.9,alpha:0.659},0).wait(1).to({x:-578.3,y:-646.3,alpha:0.683},0).wait(1).to({x:-578.2,y:-646.6,alpha:0.707},0).wait(1).to({x:-578.1,y:-646.9,alpha:0.732},0).wait(1).to({x:-578,y:-647.3,alpha:0.756},0).wait(1).to({x:-577.8,y:-647.6,alpha:0.78},0).wait(1).to({x:-577.7,y:-648,alpha:0.805},0).wait(1).to({x:-577.6,y:-648.3,alpha:0.829},0).wait(1).to({x:-577.5,y:-648.7,alpha:0.854},0).wait(1).to({x:-577.4,y:-649,alpha:0.878},0).wait(1).to({x:-577.2,y:-649.3,alpha:0.902},0).wait(1).to({x:-577.1,y:-649.7,alpha:0.927},0).wait(1).to({x:-577,y:-650,alpha:0.951},0).wait(1).to({x:-576.9,y:-650.4,alpha:0.976},0).wait(1).to({x:-576.8,y:-650.7,alpha:1},0).wait(1).to({y:-650.6,alpha:0.976},0).wait(1).to({y:-650.4,alpha:0.951},0).wait(1).to({x:-576.9,y:-650.3,alpha:0.927},0).wait(1).to({y:-650.1,alpha:0.902},0).wait(1).to({x:-577,y:-650,alpha:0.878},0).wait(1).to({y:-649.8,alpha:0.854},0).wait(1).to({x:-577.1,y:-649.7,alpha:0.829},0).wait(1).to({y:-649.5,alpha:0.805},0).wait(1).to({x:-577.2,y:-649.4,alpha:0.78},0).wait(1).to({y:-649.2,alpha:0.756},0).wait(1).to({x:-577.3,y:-649.1,alpha:0.732},0).wait(1).to({y:-648.9,alpha:0.707},0).wait(1).to({x:-577.4,y:-648.8,alpha:0.683},0).wait(1).to({y:-648.7,alpha:0.659},0).wait(1).to({x:-577.5,y:-648.5,alpha:0.634},0).wait(1).to({y:-648.4,alpha:0.61},0).wait(1).to({x:-577.6,y:-648.2,alpha:0.585},0).wait(1).to({y:-648.1,alpha:0.561},0).wait(1).to({x:-577.7,y:-647.9,alpha:0.537},0).wait(1).to({y:-647.8,alpha:0.512},0).wait(1).to({x:-577.8,y:-647.6,alpha:0.488},0).wait(1).to({y:-647.5,alpha:0.463},0).wait(1).to({x:-577.9,y:-647.3,alpha:0.439},0).wait(1).to({y:-647.2,alpha:0.415},0).wait(1).to({x:-578,y:-647,alpha:0.39},0).wait(1).to({y:-646.9,alpha:0.366},0).wait(1).to({x:-578.1,y:-646.7,alpha:0.341},0).wait(1).to({y:-646.6,alpha:0.317},0).wait(1).to({x:-578.2,y:-646.5,alpha:0.293},0).wait(1).to({y:-646.3,alpha:0.268},0).wait(1).to({x:-578.3,y:-646.2,alpha:0.244},0).wait(1).to({y:-646,alpha:0.22},0).wait(1).to({x:-578.4,y:-645.9,alpha:0.195},0).wait(1).to({y:-645.7,alpha:0.171},0).wait(1).to({x:-578.5,y:-645.6,alpha:0.146},0).wait(1).to({y:-645.4,alpha:0.122},0).wait(1).to({x:-578.6,y:-645.3,alpha:0.098},0).wait(1).to({y:-645.1,alpha:0.073},0).wait(1).to({x:-578.7,y:-645,alpha:0.049},0).wait(1).to({y:-644.8,alpha:0.024},0).wait(1).to({x:-578.8,y:-644.7,alpha:0},0).wait(115).to({_off:true},1).wait(1).to({x:-581.8,y:-636.7,_off:false},0).wait(1).to({x:-581.6,y:-637,alpha:0.024},0).wait(1).to({x:-581.5,y:-637.4,alpha:0.049},0).wait(1).to({x:-581.4,y:-637.7,alpha:0.073},0).wait(1).to({x:-581.3,y:-638.1,alpha:0.098},0).wait(1).to({x:-581.1,y:-638.4,alpha:0.122},0).wait(1).to({x:-581,y:-638.7,alpha:0.146},0).wait(1).to({x:-580.9,y:-639.1,alpha:0.171},0).wait(1).to({x:-580.8,y:-639.4,alpha:0.195},0).wait(1).to({x:-580.7,y:-639.8,alpha:0.22},0).wait(1).to({x:-580.5,y:-640.1,alpha:0.244},0).wait(1).to({x:-580.4,y:-640.5,alpha:0.268},0).wait(1).to({x:-580.3,y:-640.8,alpha:0.293},0).wait(1).to({x:-580.2,y:-641.1,alpha:0.317},0).wait(1).to({x:-580,y:-641.5,alpha:0.341},0).wait(1).to({x:-579.9,y:-641.8,alpha:0.366},0).wait(1).to({x:-579.8,y:-642.2,alpha:0.39},0).wait(1).to({x:-579.7,y:-642.5,alpha:0.415},0).wait(1).to({x:-579.6,y:-642.8,alpha:0.439},0).wait(1).to({x:-579.4,y:-643.2,alpha:0.463},0).wait(1).to({x:-579.3,y:-643.5,alpha:0.488},0).wait(1).to({x:-579.2,y:-643.9,alpha:0.512},0).wait(1).to({x:-579.1,y:-644.2,alpha:0.537},0).wait(1).to({x:-578.9,y:-644.6,alpha:0.561},0).wait(1).to({x:-578.8,y:-644.9,alpha:0.585},0).wait(1).to({x:-578.7,y:-645.2,alpha:0.61},0).wait(1).to({x:-578.6,y:-645.6,alpha:0.634},0).wait(1).to({x:-578.5,y:-645.9,alpha:0.659},0).wait(1).to({x:-578.3,y:-646.3,alpha:0.683},0).wait(1).to({x:-578.2,y:-646.6,alpha:0.707},0).wait(1).to({x:-578.1,y:-646.9,alpha:0.732},0).wait(1).to({x:-578,y:-647.3,alpha:0.756},0).wait(1).to({x:-577.8,y:-647.6,alpha:0.78},0).wait(1).to({x:-577.7,y:-648,alpha:0.805},0).wait(1).to({x:-577.6,y:-648.3,alpha:0.829},0).wait(1).to({x:-577.5,y:-648.7,alpha:0.854},0).wait(1).to({x:-577.4,y:-649,alpha:0.878},0).wait(1).to({x:-577.2,y:-649.3,alpha:0.902},0).wait(1).to({x:-577.1,y:-649.7,alpha:0.927},0).wait(1).to({x:-577,y:-650,alpha:0.951},0).wait(1).to({x:-576.9,y:-650.4,alpha:0.976},0).wait(1).to({x:-576.8,y:-650.7,alpha:1},0).wait(1).to({y:-650.6,alpha:0.976},0).wait(1).to({y:-650.4,alpha:0.951},0).wait(1).to({x:-576.9,y:-650.3,alpha:0.927},0).wait(1).to({y:-650.1,alpha:0.902},0).wait(1).to({x:-577,y:-650,alpha:0.878},0).wait(1).to({y:-649.8,alpha:0.854},0).wait(1).to({x:-577.1,y:-649.7,alpha:0.829},0).wait(1).to({y:-649.5,alpha:0.805},0).wait(1).to({x:-577.2,y:-649.4,alpha:0.78},0).wait(1).to({y:-649.2,alpha:0.756},0).wait(1).to({x:-577.3,y:-649.1,alpha:0.732},0).wait(1).to({y:-648.9,alpha:0.707},0).wait(1).to({x:-577.4,y:-648.8,alpha:0.683},0).wait(1).to({y:-648.7,alpha:0.659},0).wait(1).to({x:-577.5,y:-648.5,alpha:0.634},0).wait(1).to({y:-648.4,alpha:0.61},0).wait(1).to({x:-577.6,y:-648.2,alpha:0.585},0).wait(1).to({y:-648.1,alpha:0.561},0).wait(1).to({x:-577.7,y:-647.9,alpha:0.537},0).wait(1).to({y:-647.8,alpha:0.512},0).wait(1).to({x:-577.8,y:-647.6,alpha:0.488},0).wait(1).to({y:-647.5,alpha:0.463},0).wait(1).to({x:-577.9,y:-647.3,alpha:0.439},0).wait(1).to({y:-647.2,alpha:0.415},0).wait(1).to({x:-578,y:-647,alpha:0.39},0).wait(1).to({y:-646.9,alpha:0.366},0).wait(1).to({x:-578.1,y:-646.7,alpha:0.341},0).wait(1).to({y:-646.6,alpha:0.317},0).wait(1).to({x:-578.2,y:-646.5,alpha:0.293},0).wait(1).to({y:-646.3,alpha:0.268},0).wait(1).to({x:-578.3,y:-646.2,alpha:0.244},0).wait(1).to({y:-646,alpha:0.22},0).wait(1).to({x:-578.4,y:-645.9,alpha:0.195},0).wait(1).to({y:-645.7,alpha:0.171},0).wait(1).to({x:-578.5,y:-645.6,alpha:0.146},0).wait(1).to({y:-645.4,alpha:0.122},0).wait(1).to({x:-578.6,y:-645.3,alpha:0.098},0).wait(1).to({y:-645.1,alpha:0.073},0).wait(1).to({x:-578.7,y:-645,alpha:0.049},0).wait(1).to({y:-644.8,alpha:0.024},0).wait(1).to({x:-578.8,y:-644.7,alpha:0},0).to({_off:true},1).wait(96));

	// Layer 10
	this.instance_13 = new lib.Símbolo1("synched",0);
	this.instance_13.setTransform(-548.3,-817.9,0.25,0.25,0,0,0,59,53.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13}]}).wait(450));

	// Layer 11
	this.instance_14 = new lib.matoareia_1();
	this.instance_14.setTransform(-575.3,-588.9,1,1,0,0,0,192,77);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).wait(450));

	// Layer 12
	this.instance_15 = new lib.Cenario();
	this.instance_15.setTransform(-767.9,-1023.9,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).wait(450));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-818.8,-1023.9,435.5,586.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;