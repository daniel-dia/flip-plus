(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.Intro = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{part1:0,lightOn:10,project:21,part2:102,friends:193});

	// timeline functions:
	this.frame_20 = function() {
		this.stop();
		this.dispatchEvent("onstop","d1");
	}
	this.frame_61 = function() {
		this.stop();
		this.dispatchEvent("onstop","readyToPlay");
	}
	this.frame_64 = function() {
		this.stop();
		this.dispatchEvent("onstop","gotoProject");
	}
	this.frame_177 = function() {
		this.stop();
		this.dispatchEvent("onstop","d2");
	}
	this.frame_193 = function() {
		this.stop();
		this.dispatchEvent("onstop","end");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(20).call(this.frame_20).wait(41).call(this.frame_61).wait(3).call(this.frame_64).wait(113).call(this.frame_177).wait(16).call(this.frame_193));

	// Layer 6
	this.instance = new lib.TvFx();
	this.instance.setTransform(772,672.3,0.321,0.321,0,0,0,351.7,146.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(37).to({_off:false},0).to({scaleX:1,scaleY:1,x:772.1,alpha:1},27).to({_off:true},1).wait(129));

	// Layer 5
	this.p2 = new lib.SNES3();
	this.p2.setTransform(800.1,1459,0.574,0.574);
	this.p2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p2).wait(102).to({_off:false},0).to({_off:true},75).wait(17));

	// Layer 7
	this.instance_1 = new lib.SNES();
	this.instance_1.setTransform(798.1,1460.4,0.56,0.56);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(102).wait(75).to({_off:false},0).wait(17));

	// Camada 13
	this.Bot01 = new lib.SNES();
	this.Bot01.setTransform(798.1,1464.4,0.56,0.56);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("A/vfwMAAAg/fMA/fAAAMAAAA/fg");
	this.shape.setTransform(734.2,1468.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.Bot01}]}).to({state:[]},102).to({state:[]},54).to({state:[]},1).wait(37));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(531,1265,508.5,406.5);


// symbols:
(lib.SN3S_02 = function() {
	this.initialize(img.SN3S_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,862,645);


(lib.SN3S_04 = function() {
	this.initialize(img.SN3S_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,862,645);


(lib.SN3S_05 = function() {
	this.initialize(img.SN3S_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,862,645);


(lib.SN3S_07 = function() {
	this.initialize(img.SN3S_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,902,677);


(lib.SN3S_08 = function() {
	this.initialize(img.SN3S_08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,929,785);


(lib.TvFx = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Eg27AW8MAAAgt3MBt3AAAMAAAAt3g");
	this.shape.setTransform(351.7,146.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,703.4,293.8);


(lib.SNES = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.SN3S_02();
	this.instance.setTransform(-430.9,-322.4);

	this.instance_1 = new lib.SN3S_04();
	this.instance_1.setTransform(-430.9,-322.4);

	this.instance_2 = new lib.SN3S_05();
	this.instance_2.setTransform(-430.9,-322.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_2,p:{scaleY:1,y:-322.4}}]},5).to({state:[{t:this.instance_2,p:{scaleY:0.975,y:-306.4}}]},11).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-430.9,-322.4,862,645);


    (lib.Interpolar1SN3S_08 = function () {
	this.initialize();

	// Camada 1
	this.instance = new lib.SN3S_08();
	this.instance.setTransform(-459.9,-382.7,1,0.975);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-459.9,-382.7,929,765.5);


(lib.SNES3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.Interpolar1SN3S_08("synched", 0);
	this.instance.setTransform(-37.9,-153.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(47).to({startPosition:0,_off:false},0).to({y:-183.6},10).wait(6).to({startPosition:0},0).to({y:-103.6},8).to({_off:true},2).wait(3));

	// Camada 1
	this.instance_1 = new lib.SN3S_02();
	this.instance_1.setTransform(-430.9,-322.4);

	this.instance_2 = new lib.SN3S_04();
	this.instance_2.setTransform(-430.9,-322.4);

	this.instance_3 = new lib.SN3S_05();
	this.instance_3.setTransform(-430.9,-322.4);

	this.instance_4 = new lib.SN3S_07();
	this.instance_4.setTransform(-467.4,-414.8,1,0.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_3,p:{scaleY:1,y:-322.4}}]},6).to({state:[{t:this.instance_3,p:{scaleY:0.975,y:-306.4}}]},12).to({state:[{t:this.instance_4}]},10).to({state:[]},8).to({state:[{t:this.instance_3,p:{scaleY:0.975,y:-306.4}}]},26).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-430.9,-322.4,862,645);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;