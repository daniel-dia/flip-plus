(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.lobby = function() {
	this.initialize();

	// Layer 2
	this.main = new lib.Bot();
	this.main.setTransform(929.5,1790,1,1,0,0,0,96,174.4);

	this.Robot3 = new lib.Bot();
	this.Robot3.setTransform(940.8,2070.4,0.707,0.614,0,0,0,96,174.4);

	this.Robot4 = new lib.Bot();
	this.Robot4.setTransform(345.6,2176,0.535,1,0,0,0,96,174.4);

	this.Robot2 = new lib.Bot();
	this.Robot2.setTransform(1449.6,2176.1,0.751,1.312,0,0,0,96,174.5);

	this.Robot1 = new lib.Bot();
	this.Robot1.setTransform(1481,1600,1.453,0.696,0,0,0,96,174.4);

	this.Robot5 = new lib.Bot();
	this.Robot5.setTransform(384,1680,1,1.663,0,0,0,96,174.4);

	this.addChild(this.Robot5,this.Robot1,this.Robot2,this.Robot4,this.Robot3,this.main);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-25,739.5,1704.2,1324.3);


// symbols:
(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,250,220);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,67,86);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,102);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,81);


(lib.Bitmap8 = function() {
	this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,56,86);


(lib.greenbox = function() {
	this.initialize(img.greenbox);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,389,377);


(lib.Tween18 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.greenbox();
	this.instance.setTransform(-194.4,-188.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#D6D6D6").ss(1,1,1).p("EAqnAAAQAAEbsfDIQsfDIxpAAQxpAAsejIQsfjIAAkbQAAkZMfjIQMejIRpAAQRpAAMfDIQMfDIAAEZg");
	this.shape.setTransform(10.8,196.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.251)").s().p("A+HHjQsfjJAAkaQAAkZMfjIQMejJRpAAQRpAAMfDJQMfDIAAEZQAAEasfDJQsfDIxpgBQxpABsejIg");
	this.shape_1.setTransform(10.8,196.4);

	this.addChild(this.shape_1,this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-261.9,-188.4,545.5,453.2);


(lib.Tween13 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap5();
	this.instance.setTransform(-33.4,-42.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-33.4,-42.9,67,86);


(lib.Tween10 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap6();
	this.instance.setTransform(-31.9,-50.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-31.9,-50.9,64,102);


(lib.Tween7 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap8();
	this.instance.setTransform(-27.9,-42.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-27.9,-42.9,56,86);


(lib.Tween4 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(-36.9,-40.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36.9,-40.4,74,81);


(lib.Tween1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(-124.9,-109.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-124.9,-109.9,250,220);


(lib.light2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,0,0,0.71)","rgba(255,0,0,0)"],[0,0.475,1],0,0,0,0,0,53).s().p("AltFuQiXiYAAjWQAAjVCXiYQCYiXDVAAQDWAACYCXQCXCYAADVQAADWiXCYQiYCXjWAAQjVAAiYiXg");
	this.shape.setTransform(51.8,-51.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-103.4,103.5,103.5);


(lib.Light = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.light2("synched",0);
	this.instance.setTransform(51.8,-51.6,1,1,0,0,0,51.8,-51.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({alpha:0},0).wait(20).to({alpha:1},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-103.4,103.5,103.5);


(lib.Bot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{closed:0,opening:1,idle:30,alert:69,touch:108});

	// timeline functions:
	this.frame_68 = function() {
		this.gotoAndPlay("idle")
	}
	this.frame_107 = function() {
		gotoAndPlay("parts")
	}
	this.frame_119 = function() {
		this.gotoAndPlay("idle")
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(68).call(this.frame_68).wait(39).call(this.frame_107).wait(12).call(this.frame_119));

	// Hit
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,51,0,0.008)").s().p("Ay3ZsMAAAgzXMAlvAAAMAAAAzXg");
	this.shape.setTransform(-27.5,-167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(120));

	// Layer 11
	this.instance = new lib.Light();
	this.instance.setTransform(-27.1,-297,1,1,0,0,0,51.8,-51.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).to({_off:true},38).wait(13));

	// Layer13
	this.instance_1 = new lib.Tween18("synched",0);
	this.instance_1.setTransform(-51.1,-202.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleY:0.09,y:-27.4},29).to({_off:true},1).wait(90));

	// Layer 10
	this.instance_2 = new lib.Tween1("synched",0);
	this.instance_2.setTransform(-34.4,-201.9);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({startPosition:0,_off:false},0).to({startPosition:0},106).to({scaleY:1.2},5).to({scaleY:1},7).wait(1));

	// Layer 9
	this.instance_3 = new lib.Tween4("synched",0);
	this.instance_3.setTransform(-100.9,-58.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({startPosition:0,_off:false},0).to({startPosition:0},29).to({y:-77.4},7).to({y:-58.4},17).to({startPosition:0},14).to({y:-77.4},8).to({y:-58.4},17).to({startPosition:0},14).to({startPosition:0},5).to({startPosition:0},7).wait(1));

	// Layer 8
	this.instance_4 = new lib.Tween7("synched",0);
	this.instance_4.setTransform(41,-56);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({startPosition:0,_off:false},0).to({startPosition:0},29).to({startPosition:0},7).to({x:28,y:-92.9},17).to({x:41,y:-55.9},14).to({startPosition:0},8).to({x:28,y:-92.9},17).to({x:41,y:-55.9},14).to({startPosition:0},5).to({startPosition:0},7).wait(1));

	// Layer 7
	this.instance_5 = new lib.Tween10("synched",0);
	this.instance_5.setTransform(80.6,-198.8,1,1,0,0,0,-31.9,-50.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({startPosition:0,_off:false},0).to({startPosition:0},29).to({regX:-31.7,rotation:-37.3,x:80.7,y:-198.8},10).to({regX:-31.8,rotation:7.5,x:80.6,y:-198.7},15).to({rotation:0},13).to({scaleY:0.99,skewX:180,y:-198.8},1).to({regY:-50.9,scaleY:1.18,skewX:142.5,skewY:-37.3,x:80.5,y:-198.9},10).to({regX:-31.7,regY:-50.8,scaleY:1.09,skewX:187.6,skewY:7.5,x:80.7,y:-199.1},15).to({regX:-31.8,scaleY:1.08,skewX:180,skewY:0,x:80.6,y:-198.9},13).to({regY:-50.9,skewX:218.9,skewY:38.8,x:80.7,y:-195.8},5).to({scaleY:0.88,skewX:360,skewY:0,x:80.6,y:-198.6},7).wait(1));

	// Layer 6
	this.instance_6 = new lib.Tween13("synched",0);
	this.instance_6.setTransform(-159.4,-201.8,1,1,0,0,0,25,-42.9);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({startPosition:0,_off:false},0).to({startPosition:0},29).to({rotation:30},10).to({rotation:-14.8},15).to({regY:-42.9,rotation:5,x:-159.4,y:-201.8},13).to({regY:-42.8,scaleY:1.12,rotation:0,skewX:180,x:-159.3,y:-201.9},1).to({regX:24.9,scaleY:1.21,skewX:210.1,skewY:30,x:-159.2,y:-202},10).to({regX:25,scaleY:1.19,skewX:165,skewY:-14.8,x:-159.3,y:-201.9},15).to({regY:-42.9,scaleY:1.19,skewX:185.1,skewY:5,y:-202},13).to({regX:25.1,regY:-42.8,skewX:140,skewY:-39.8,x:-159.4},5).to({scaleY:1.13,rotation:5,skewX:0,skewY:0,x:-159.2,y:-201.9},7).wait(1));

	// Layer 12
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.251)").s().p("AytDTQnxhXAAh8QAAh7HxhYQHxhXK8gBQK9ABHxBXQHxBYAAB7QAAB8nxBXQnxBZq9AAQq8AAnxhZg");
	this.shape_1.setTransform(-36.4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).wait(120));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-313,-390.9,545.5,453.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;