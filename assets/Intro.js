(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.Intro = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{part1:0,lightOn:30,project:58,part2:102,friends:141});

	// timeline functions:
	this.frame_57 = function() {
		this.stop();
		this.dispatchEvent("onstop","d1");
	}
	this.frame_98 = function() {
		this.stop();
		this.dispatchEvent("onstop","readyToPlay");
	}
	this.frame_101 = function() {
		this.stop();
		this.dispatchEvent("onstop","gotoProject");
	}
	this.frame_140 = function() {
		this.stop();
		this.dispatchEvent("onstop","d2");
	}
	this.frame_145 = function() {
		this.stop();
		this.dispatchEvent("onstop","end");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(57).call(this.frame_57).wait(41).call(this.frame_98).wait(3).call(this.frame_101).wait(39).call(this.frame_140).wait(5).call(this.frame_145));

	// Layer 6
	this.instance = new lib.TvFx();
	this.instance.setTransform(772,672.3,0.321,0.321,0,0,0,351.7,146.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(74).to({_off:false},0).to({scaleX:1,scaleY:1,x:772.1,alpha:1},27).to({_off:true},1).wait(44));

	// Camada 13
	this.instance_1 = new lib.botLight();
	this.instance_1.setTransform(508.2,1250.6);

	this.instance_2 = new lib.Bot01();
	this.instance_2.setTransform(475.6,1286,0.6,0.6,-25.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},30).to({state:[{t:this.instance_2}]},72).to({state:[{t:this.instance_1}]},25).wait(19));

	// Layer 2
	this.instance_3 = new lib.mybotsbg();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_3}]},72).wait(44));

	// Layer 1
	this.instance_4 = new lib.bot();
	this.instance_4.setTransform(508.2,1250.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[]},30).to({state:[]},72).wait(44));

	// Camada 1
	this.instance_5 = new lib.fundoEscuro();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_5}]},102).wait(44));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


// symbols:
(lib.bot = function() {
	this.initialize(img.bot);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,548,431);


(lib.Bot01 = function() {
	this.initialize(img.Bot01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,828,636);


(lib.botLight = function() {
	this.initialize(img.botLight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,548,431);


(lib.fundoEscuro = function() {
	this.initialize(img.fundoEscuro);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


(lib.mybotsbg = function() {
	this.initialize(img.mybotsbg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


(lib.TvFx = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Eg27AW8MAAAgt3MBt3AAAMAAAAt3g");
	this.shape.setTransform(351.7,146.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,703.4,293.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;