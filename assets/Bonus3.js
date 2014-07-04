(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1536,
	height: 2048,
	fps: 60,
	color: "#FFFFFF",
	manifest: [

	]
};

// stage content:
(lib.Bonus3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"1Wrong":23,"1Ok":140,"2Wrong":282,"2Ok":398,"3Wrong":539,"3Ok":656});

	// timeline functions:
	this.frame_22 = function() {
		this.dispatchEvent("ready")
	}
	this.frame_139 = function() {
		this.dispatchEvent("wrongEnd");
	}
	this.frame_162 = function() {
		this.dispatchEvent("OkEnd")
	}
	this.frame_281 = function() {
		this.dispatchEvent("ready")
	}
	this.frame_397 = function() {
		this.dispatchEvent("wrongEnd");
	}
	this.frame_420 = function() {
		this.dispatchEvent("OkEnd")
	}
	this.frame_537 = function() {
		this.dispatchEvent("ready")
	}
	this.frame_655 = function() {
		this.dispatchEvent("wrongEnd");
	}
	this.frame_679 = function() {
		this.dispatchEvent("OkEnd")
	}
	this.frame_762 = function() {
		this.dispatchEvent("End");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(22).call(this.frame_22).wait(117).call(this.frame_139).wait(23).call(this.frame_162).wait(119).call(this.frame_281).wait(116).call(this.frame_397).wait(23).call(this.frame_420).wait(117).call(this.frame_537).wait(118).call(this.frame_655).wait(24).call(this.frame_679).wait(83).call(this.frame_762).wait(1));

	// Contador
	this.instance = new lib.contador();
	this.instance.setTransform(1361.9,388.6,1,1,0,0,0,135.1,34);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},340).wait(423));

	// c_amarel
	this.key3 = new lib.Key3anim();
	this.key3.setTransform(1300.3,1436.4,1,1,0,0,0,-445,422.2);

	this.key2 = new lib.Key2anim();
	this.key2.setTransform(836.2,1624.4,1,1,0,0,0,-445,422.2);

	this.key1 = new lib.Key1anim();
	this.key1.setTransform(893.4,1198.2,1,1,0,0,0,123,150);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.key1},{t:this.key2},{t:this.key3}]}).wait(763));

	// Chest1
	this.instance_1 = new lib.ChestAnim("synched",0);
	this.instance_1.setTransform(2011.2,987.9,1,1,0,0,0,1235.2,-42.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(517).to({_off:false},0).wait(246));

	// Chest1
	this.instance_2 = new lib.ChestAnim_1("synched",0);
	this.instance_2.setTransform(2011.2,987.9,1,1,0,0,0,1235.2,-42.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(258).to({_off:false},0).to({_off:true},267).wait(238));

	// Chest1
	this.instance_3 = new lib.ChestAnim_2("synched",0);
	this.instance_3.setTransform(2011.2,987.9,1,1,0,0,0,1235.2,-42.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},267).wait(496));

	// Camada 1
	this.instance_4 = new lib.bg_bonus3();
	this.instance_4.setTransform(0,-339);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(763));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.9,685,3298.6,3237.7);


// symbols:
(lib.bg_bonus3 = function() {
	this.initialize(img.bg_bonus3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2726);


(lib.chest_1 = function() {
	this.initialize(img.chest_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,695,370);


(lib.chest_2 = function() {
	this.initialize(img.chest_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,701,337);


(lib.chest_3 = function() {
	this.initialize(img.chest_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,698,273);


(lib.chest_4 = function() {
	this.initialize(img.chest_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,706,415);


(lib.chest_x = function() {
	this.initialize(img.chest_x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,538,557);


(lib.icon_o = function() {
	this.initialize(img.icon_o);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,86,68);


(lib.icon_x = function() {
	this.initialize(img.icon_x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,86,68);


(lib.key_1 = function() {
	this.initialize(img.key_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,246,300);


(lib.key_2 = function() {
	this.initialize(img.key_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,246,300);


(lib.key_3 = function() {
	this.initialize(img.key_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,246,300);


(lib.number_1 = function() {
	this.initialize(img.number_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,136,154);


(lib.number_2 = function() {
	this.initialize(img.number_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,136,154);


(lib.number_3 = function() {
	this.initialize(img.number_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,136,154);


(lib.o_x = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.icon_o();
	this.instance.setTransform(-43,-34);

	this.instance_1 = new lib.icon_x();
	this.instance_1.setTransform(-43,-34);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43,-34,86,68);


(lib.Interpolação47 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.number_3();
	this.instance.setTransform(-68,-77);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolação44 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_4();
	this.instance.setTransform(-353,-212.2,1,1.023);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-353,-212.2,706,424.5);


(lib.Interpolação43 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_3();
	this.instance.setTransform(-349,-136.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-136.5,698,273);


(lib.Interpolação42 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_3();
	this.instance.setTransform(-349,-126.5,1,0.927);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-126.5,698,253);


(lib.Interpolação41 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_3();
	this.instance.setTransform(-321.3,-143.6,0.986,1.073,0,9,-0.2);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-366.9,-145.6,733.9,291.2);


(lib.Interpolação39 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_2();
	this.instance.setTransform(-374.5,-162.3,1.069,0.963);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-374.5,-162.3,749.1,324.7);


(lib.Interpolação26 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_1();
	this.instance.setTransform(-371.3,-178.2,1.069,0.963);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-371.3,-178.2,742.7,356.5);


(lib.Interpolação19 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_2();
	this.instance.setTransform(-350.5,-168.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação14 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_1();
	this.instance.setTransform(-352.4,-180.5,1.014,0.976);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-352.4,-180.5,704.9,361);


(lib.Interpolação10 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_2();
	this.instance.setTransform(-350.5,-168.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.number_3();
	this.instance.setTransform(-68,-77);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolar1 = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.chest_x();
	this.instance.setTransform(-269,-278.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-269,-278.5,538,557);


(lib.chest = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.number_3();
	this.instance.setTransform(-43.9,95.3);

	this.instance_1 = new lib.chest_2();
	this.instance_1.setTransform(-274.5,-183.8);

	this.instance_2 = new lib.chest_1();
	this.instance_2.setTransform(-272.7,-61.4);

	this.addChild(this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-274.5,-183.8,701,492.4);


(lib.c_vermelha = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.key_1();
	this.instance.setTransform(-123,-150);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-123,-150,246,300);


(lib.c_verde = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.key_3();
	this.instance.setTransform(-123,-150);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-123,-150,246,300);


(lib.c_amarela = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.key_2();
	this.instance.setTransform(-123,-150);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-123,-150,246,300);


(lib.Interpolação47_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.number_2();
	this.instance_1.setTransform(-68,-77);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolação44_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_4();
	this.instance_1.setTransform(-353,-212.2,1,1.023);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-353,-212.2,706,424.5);


(lib.Interpolação43_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_3();
	this.instance_1.setTransform(-349,-136.5);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-136.5,698,273);


(lib.Interpolação42_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_3();
	this.instance_1.setTransform(-349,-126.5,1,0.927);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-126.5,698,253);


(lib.Interpolação41_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_3();
	this.instance_1.setTransform(-321.3,-143.6,0.986,1.073,0,9,-0.2);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-366.9,-145.6,733.9,291.2);


(lib.Interpolação39_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_2();
	this.instance_1.setTransform(-374.5,-162.3,1.069,0.963);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-374.5,-162.3,749.1,324.7);


(lib.Interpolação26_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_1();
	this.instance_1.setTransform(-371.3,-178.2,1.069,0.963);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-371.3,-178.2,742.7,356.5);


(lib.Interpolação19_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_2();
	this.instance_1.setTransform(-350.5,-168.5);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação14_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_1();
	this.instance_1.setTransform(-352.4,-180.5,1.014,0.976);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-352.4,-180.5,704.9,361);


(lib.Interpolação10_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_2();
	this.instance_1.setTransform(-350.5,-168.5);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação1_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.number_2();
	this.instance_1.setTransform(-68,-77);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolar1_1 = function() {
	this.initialize();

	// Camada 1
	this.instance_1 = new lib.chest_x();
	this.instance_1.setTransform(-269,-278.5);

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-269,-278.5,538,557);


(lib.chest_5 = function() {
	this.initialize();

	// Camada 1
	this.instance_3 = new lib.number_2();
	this.instance_3.setTransform(-38,107.1);

	this.instance_4 = new lib.chest_2();
	this.instance_4.setTransform(-274.5,-183.8);

	this.instance_5 = new lib.chest_1();
	this.instance_5.setTransform(-272.7,-61.4);

	this.addChild(this.instance_5,this.instance_4,this.instance_3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-274.5,-183.8,701,492.4);


(lib.Interpolação47_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.number_1();
	this.instance_2.setTransform(-68,-77);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolação44_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_4();
	this.instance_2.setTransform(-353,-212.2,1,1.023);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-353,-212.2,706,424.5);


(lib.Interpolação43_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_3();
	this.instance_2.setTransform(-349,-136.5);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-136.5,698,273);


(lib.Interpolação42_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_3();
	this.instance_2.setTransform(-349,-126.5,1,0.927);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-349,-126.5,698,253);


(lib.Interpolação41_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_3();
	this.instance_2.setTransform(-321.3,-143.6,0.986,1.073,0,9,-0.2);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-366.9,-145.6,733.9,291.2);


(lib.Interpolação39_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_2();
	this.instance_2.setTransform(-374.5,-162.3,1.069,0.963);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-374.5,-162.3,749.1,324.7);


(lib.Interpolação26_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_1();
	this.instance_2.setTransform(-371.3,-178.2,1.069,0.963);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-371.3,-178.2,742.7,356.5);


(lib.Interpolação19_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_2();
	this.instance_2.setTransform(-350.5,-168.5);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação14_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_1();
	this.instance_2.setTransform(-352.4,-180.5,1.014,0.976);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-352.4,-180.5,704.9,361);


(lib.Interpolação10_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_2();
	this.instance_2.setTransform(-350.5,-168.5);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-350.5,-168.5,701,337);


(lib.Interpolação1_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.number_1();
	this.instance_2.setTransform(-68,-77);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-68,-77,136,154);


(lib.Interpolar1_2 = function() {
	this.initialize();

	// Camada 1
	this.instance_2 = new lib.chest_x();
	this.instance_2.setTransform(-269,-278.5);

	this.addChild(this.instance_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-269,-278.5,538,557);


(lib.chest_6 = function() {
	this.initialize();

	// Camada 1
	this.instance_6 = new lib.number_1();
	this.instance_6.setTransform(-43.9,95.3);

	this.instance_7 = new lib.chest_2();
	this.instance_7.setTransform(-274.5,-183.8);

	this.instance_8 = new lib.chest_1();
	this.instance_8.setTransform(-272.7,-61.4);

	this.addChild(this.instance_8,this.instance_7,this.instance_6);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-274.5,-183.8,701,492.4);


(lib.Key3anim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{start:0,loop:24,key:102});

	// timeline functions:
	this.frame_101 = function() {
		this.gotoAndPlay("loop");
	}
	this.frame_164 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(101).call(this.frame_101).wait(63).call(this.frame_164).wait(64));

	// Camada 3
	this.instance = new lib.c_vermelha();
	this.instance.setTransform(-445,1546.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-477,y:422.2},24,cjs.Ease.get(0.93)).wait(1).to({y:422.5},0).wait(1).to({y:423.3},0).wait(1).to({y:424.6},0).wait(1).to({y:426.4},0).wait(1).to({y:428.6},0).wait(1).to({y:431.4},0).wait(1).to({y:434.6},0).wait(1).to({y:438.2},0).wait(1).to({y:442.3},0).wait(1).to({y:446.7},0).wait(1).to({y:451.4},0).wait(1).to({y:456.4},0).wait(1).to({y:461.7},0).wait(1).to({y:467.2},0).wait(1).to({y:472.9},0).wait(1).to({y:478.7},0).wait(1).to({y:484.6},0).wait(1).to({y:490.5},0).wait(1).to({y:496.4},0).wait(1).to({y:502.3},0).wait(1).to({y:508.2},0).wait(1).to({y:513.9},0).wait(1).to({y:519.5},0).wait(1).to({y:524.9},0).wait(1).to({y:530},0).wait(1).to({y:535},0).wait(1).to({y:539.7},0).wait(1).to({y:544},0).wait(1).to({y:548.1},0).wait(1).to({y:551.9},0).wait(1).to({y:555.4},0).wait(1).to({y:558.5},0).wait(1).to({y:561.2},0).wait(1).to({y:563.6},0).wait(1).to({y:565.6},0).wait(1).to({y:567.3},0).wait(1).to({y:568.6},0).wait(1).to({y:569.5},0).wait(1).to({y:570.1},0).wait(1).to({y:570.3},0).wait(1).to({y:570},0).wait(1).to({y:569.2},0).wait(1).to({y:567.9},0).wait(1).to({y:566.2},0).wait(1).to({y:563.9},0).wait(1).to({y:561.2},0).wait(1).to({y:558.1},0).wait(1).to({y:554.5},0).wait(1).to({y:550.6},0).wait(1).to({y:546.2},0).wait(1).to({y:541.6},0).wait(1).to({y:536.6},0).wait(1).to({y:531.4},0).wait(1).to({y:525.9},0).wait(1).to({y:520.2},0).wait(1).to({y:514.4},0).wait(1).to({y:508.4},0).wait(1).to({y:502.3},0).wait(1).to({y:496.2},0).wait(1).to({y:490.1},0).wait(1).to({y:484.1},0).wait(1).to({y:478.1},0).wait(1).to({y:472.2},0).wait(1).to({y:466.6},0).wait(1).to({y:461.1},0).wait(1).to({y:455.8},0).wait(1).to({y:450.9},0).wait(1).to({y:446.2},0).wait(1).to({y:441.9},0).wait(1).to({y:437.9},0).wait(1).to({y:434.4},0).wait(1).to({y:431.2},0).wait(1).to({y:428.5},0).wait(1).to({y:426.3},0).wait(1).to({y:424.5},0).wait(1).to({y:423.2},0).wait(1).to({y:422.5},0).wait(1).to({y:422.2},0).wait(1).to({rotation:10.2,x:-475.2,y:421.3},0).wait(1).to({rotation:38.1,x:-470.2,y:418.8},0).wait(1).to({rotation:76.8,x:-463.3,y:415.4},0).wait(1).to({rotation:117.3,x:-456.1,y:411.8},0).wait(1).to({rotation:151,x:-450.1,y:408.8},0).wait(1).to({rotation:172.7,x:-446.3,y:406.9},0).wait(1).to({rotation:180,x:-445,y:406.2},0).to({rotation:285,y:410.2},7).to({scaleX:1,scaleY:1,rotation:429.9,y:414.2},7).to({scaleX:1,scaleY:1,rotation:457.4,y:416.2},8,cjs.Ease.get(0.99)).to({scaleX:0.88,scaleY:0.88,rotation:457.3,x:-572.9,y:230.2},16,cjs.Ease.get(-1)).to({scaleX:0.76,scaleY:0.76,rotation:457.4,x:-755.6,y:85.6},12,cjs.Ease.get(1)).to({alpha:0},6).to({_off:true},11).wait(52));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-568,1396.5,246,300);


(lib.Key2anim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"start":0,"loop":45,"key":123});

	// timeline functions:
	this.frame_122 = function() {
		this.gotoAndPlay("loop");
	}
	this.frame_185 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(122).call(this.frame_122).wait(63).call(this.frame_185).wait(1));

	// Camada 3
	this.instance = new lib.c_verde();
	this.instance.setTransform(-445,1546.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-477,y:422.2},45,cjs.Ease.get(0.93)).wait(1).to({y:422.5},0).wait(1).to({y:423.3},0).wait(1).to({y:424.6},0).wait(1).to({y:426.4},0).wait(1).to({y:428.6},0).wait(1).to({y:431.4},0).wait(1).to({y:434.6},0).wait(1).to({y:438.2},0).wait(1).to({y:442.3},0).wait(1).to({y:446.7},0).wait(1).to({y:451.4},0).wait(1).to({y:456.4},0).wait(1).to({y:461.7},0).wait(1).to({y:467.2},0).wait(1).to({y:472.9},0).wait(1).to({y:478.7},0).wait(1).to({y:484.6},0).wait(1).to({y:490.5},0).wait(1).to({y:496.4},0).wait(1).to({y:502.3},0).wait(1).to({y:508.2},0).wait(1).to({y:513.9},0).wait(1).to({y:519.5},0).wait(1).to({y:524.9},0).wait(1).to({y:530},0).wait(1).to({y:535},0).wait(1).to({y:539.7},0).wait(1).to({y:544},0).wait(1).to({y:548.1},0).wait(1).to({y:551.9},0).wait(1).to({y:555.4},0).wait(1).to({y:558.5},0).wait(1).to({y:561.2},0).wait(1).to({y:563.6},0).wait(1).to({y:565.6},0).wait(1).to({y:567.3},0).wait(1).to({y:568.6},0).wait(1).to({y:569.5},0).wait(1).to({y:570.1},0).wait(1).to({y:570.3},0).wait(1).to({y:570},0).wait(1).to({y:569.2},0).wait(1).to({y:567.9},0).wait(1).to({y:566.2},0).wait(1).to({y:563.9},0).wait(1).to({y:561.2},0).wait(1).to({y:558.1},0).wait(1).to({y:554.5},0).wait(1).to({y:550.6},0).wait(1).to({y:546.2},0).wait(1).to({y:541.6},0).wait(1).to({y:536.6},0).wait(1).to({y:531.4},0).wait(1).to({y:525.9},0).wait(1).to({y:520.2},0).wait(1).to({y:514.4},0).wait(1).to({y:508.4},0).wait(1).to({y:502.3},0).wait(1).to({y:496.2},0).wait(1).to({y:490.1},0).wait(1).to({y:484.1},0).wait(1).to({y:478.1},0).wait(1).to({y:472.2},0).wait(1).to({y:466.6},0).wait(1).to({y:461.1},0).wait(1).to({y:455.8},0).wait(1).to({y:450.9},0).wait(1).to({y:446.2},0).wait(1).to({y:441.9},0).wait(1).to({y:437.9},0).wait(1).to({y:434.4},0).wait(1).to({y:431.2},0).wait(1).to({y:428.5},0).wait(1).to({y:426.3},0).wait(1).to({y:424.5},0).wait(1).to({y:423.2},0).wait(1).to({y:422.5},0).wait(1).to({y:422.2},0).wait(1).to({rotation:10.2,x:-475.2,y:421.3},0).wait(1).to({rotation:38.1,x:-470.2,y:418.8},0).wait(1).to({rotation:76.8,x:-463.3,y:415.4},0).wait(1).to({rotation:117.3,x:-456.1,y:411.8},0).wait(1).to({rotation:151,x:-450.1,y:408.8},0).wait(1).to({rotation:172.7,x:-446.3,y:406.9},0).wait(1).to({rotation:180,x:-445,y:406.2},0).to({rotation:285,y:410.2},7).to({scaleX:1,scaleY:1,rotation:429.9,y:414.2},7).to({scaleX:1,scaleY:1,rotation:457.4,y:416.2},8,cjs.Ease.get(0.99)).to({scaleX:0.88,scaleY:0.88,rotation:457.3,x:-376.8,y:46.2},16,cjs.Ease.get(-1)).to({scaleX:0.76,scaleY:0.76,rotation:457.4,x:-303.5,y:-110.4},12,cjs.Ease.get(1)).to({alpha:0},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-568,1396.5,246,300);


(lib.Key1anim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"start":0,"loop":36,"key":114});

	// timeline functions:
	this.frame_113 = function() {
		this.gotoAndPlay("loop");
	}
	this.frame_193 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(113).call(this.frame_113).wait(80).call(this.frame_193).wait(1));

	// Layer 1
	this.instance = new lib.c_amarela();
	this.instance.setTransform(-445,1546.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-477,y:422.2},36,cjs.Ease.get(0.93)).wait(1).to({y:422.5},0).wait(1).to({y:423.3},0).wait(1).to({y:424.6},0).wait(1).to({y:426.4},0).wait(1).to({y:428.6},0).wait(1).to({y:431.4},0).wait(1).to({y:434.6},0).wait(1).to({y:438.2},0).wait(1).to({y:442.3},0).wait(1).to({y:446.7},0).wait(1).to({y:451.4},0).wait(1).to({y:456.4},0).wait(1).to({y:461.7},0).wait(1).to({y:467.2},0).wait(1).to({y:472.9},0).wait(1).to({y:478.7},0).wait(1).to({y:484.6},0).wait(1).to({y:490.5},0).wait(1).to({y:496.4},0).wait(1).to({y:502.3},0).wait(1).to({y:508.2},0).wait(1).to({y:513.9},0).wait(1).to({y:519.5},0).wait(1).to({y:524.9},0).wait(1).to({y:530},0).wait(1).to({y:535},0).wait(1).to({y:539.7},0).wait(1).to({y:544},0).wait(1).to({y:548.1},0).wait(1).to({y:551.9},0).wait(1).to({y:555.4},0).wait(1).to({y:558.5},0).wait(1).to({y:561.2},0).wait(1).to({y:563.6},0).wait(1).to({y:565.6},0).wait(1).to({y:567.3},0).wait(1).to({y:568.6},0).wait(1).to({y:569.5},0).wait(1).to({y:570.1},0).wait(1).to({y:570.3},0).wait(1).to({y:570},0).wait(1).to({y:569.2},0).wait(1).to({y:567.9},0).wait(1).to({y:566.2},0).wait(1).to({y:563.9},0).wait(1).to({y:561.2},0).wait(1).to({y:558.1},0).wait(1).to({y:554.5},0).wait(1).to({y:550.6},0).wait(1).to({y:546.2},0).wait(1).to({y:541.6},0).wait(1).to({y:536.6},0).wait(1).to({y:531.4},0).wait(1).to({y:525.9},0).wait(1).to({y:520.2},0).wait(1).to({y:514.4},0).wait(1).to({y:508.4},0).wait(1).to({y:502.3},0).wait(1).to({y:496.2},0).wait(1).to({y:490.1},0).wait(1).to({y:484.1},0).wait(1).to({y:478.1},0).wait(1).to({y:472.2},0).wait(1).to({y:466.6},0).wait(1).to({y:461.1},0).wait(1).to({y:455.8},0).wait(1).to({y:450.9},0).wait(1).to({y:446.2},0).wait(1).to({y:441.9},0).wait(1).to({y:437.9},0).wait(1).to({y:434.4},0).wait(1).to({y:431.2},0).wait(1).to({y:428.5},0).wait(1).to({y:426.3},0).wait(1).to({y:424.5},0).wait(1).to({y:423.2},0).wait(1).to({y:422.5},0).wait(1).to({y:422.2},0).wait(1).to({rotation:10.2,x:-475.2,y:421.3},0).wait(1).to({rotation:38.1,x:-470.2,y:418.8},0).wait(1).to({rotation:76.8,x:-463.3,y:415.4},0).wait(1).to({rotation:117.3,x:-456.1,y:411.8},0).wait(1).to({rotation:151,x:-450.1,y:408.8},0).wait(1).to({rotation:172.7,x:-446.3,y:406.9},0).wait(1).to({rotation:180,x:-445,y:406.2},0).to({rotation:285,y:410.2},7).to({scaleX:1,scaleY:1,rotation:429.9,y:414.2},7).to({scaleX:1,scaleY:1,rotation:457.4,y:416.2},8,cjs.Ease.get(0.99)).to({scaleX:0.88,scaleY:0.88,rotation:457.3,x:-152.8,y:230.2},16,cjs.Ease.get(-1)).to({scaleX:0.76,scaleY:0.76,rotation:457.4,x:220.6,y:41.6},12,cjs.Ease.get(1)).to({alpha:0},4).wait(19));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-568,1396.5,246,300);


(lib.contador = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.o_x("single",0);
	this.instance.setTransform(135.1,34);

	this.instance_1 = new lib.o_x("single",0);
	this.instance_1.setTransform(43,34);

	this.instance_2 = new lib.o_x("single",0);
	this.instance_2.setTransform(227.3,34);

	this.addChild(this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,270.3,68);


(lib.chestmove = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance = new lib.number_3();
	this.instance.setTransform(-43.9,95.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(36));

	// Camada 1
	this.instance_1 = new lib.Interpolação19("synched",0);
	this.instance_1.setTransform(76,-15.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).wait(4));

	// Layer 2
	this.instance_2 = new lib.chest_1();
	this.instance_2.setTransform(-272.7,-61.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(36));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277.5,-183.8,704,492.4);


(lib.chest_x_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.Interpolar1("synched",0);
	this.instance.setTransform(122.2,68.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59).to({_off:false},0).to({alpha:0},15).wait(1));

	// Camada 2
	this.instance_1 = new lib.chest_x();
	this.instance_1.setTransform(-146.8,-210.4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},15).wait(16));

	// Camada 5
	this.instance_2 = new lib.Interpolação1("synched",0);
	this.instance_2.setTransform(27.1,179.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:20.1,y:147.3},4).to({x:23.1,y:114.3},4).to({scaleX:0.97,scaleY:1.02,x:24.6,y:176},4).to({scaleX:1,scaleY:1,rotation:2.5,x:23.2,y:173.3},4).to({rotation:-1.3,x:23.1,y:173.2},4).to({rotation:0,x:24.1,y:172.3},4).wait(51));

	// Camada 1
	this.instance_3 = new lib.Interpolação10("synched",0);
	this.instance_3.setTransform(81,-7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.98,scaleY:1.03,x:65,y:-47.2},4).to({scaleX:1,scaleY:1,x:76,y:-75.3},4).to({scaleX:0.97,scaleY:1.02,x:75.9,y:-17.2},4).to({scaleX:1,scaleY:1,rotation:2.5,x:83.4},4).to({rotation:-1.3,x:72.3},4).to({rotation:0,x:76,y:-15.3},4).wait(51));

	// Layer 3
	this.instance_4 = new lib.Interpolação14("synched",0);
	this.instance_4.setTransform(79.7,128.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:0.98,scaleY:1.03,x:69.8,y:96.8},4).to({scaleX:1,scaleY:1,x:74.8,y:63.6},4).to({scaleX:0.97,scaleY:1.02,y:125.1},4).to({scaleX:1,scaleY:1,rotation:2.5,x:76.1,y:121.4},4).to({rotation:-1.3,x:74.1,y:121.7},4).to({rotation:0,x:74.8,y:123.6},4).wait(51));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276.3,-209.5,708.5,518.1);


(lib.chest_ok = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance = new lib.Interpolação47("synched",0);
	this.instance.setTransform(18.1,178.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:28.1,y:136.3},4).to({x:24.1,y:164.3},4).to({y:172.3},4).wait(34));

	// Camada 4
	this.instance_1 = new lib.Interpolação44("synched",0);
	this.instance_1.setTransform(86,-116.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(8).to({_off:false},0).to({y:-101},4).to({startPosition:0},4).wait(30));

	// Camada 3
	this.instance_2 = new lib.Interpolação39("synched",0);
	this.instance_2.setTransform(76,-3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.94,scaleY:1.03,y:-64.3},4).to({scaleX:0.89,scaleY:1,x:72,y:-48.3},3).to({_off:true},1).wait(38));

	// Camada 1
	this.instance_3 = new lib.Interpolação26("synched",0);
	this.instance_3.setTransform(74.7,130.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.94,scaleY:1.03,x:74.8,y:87},4).to({scaleX:0.89,scaleY:1.03,y:113.4},4).to({scaleX:0.92,scaleY:1,y:123.6},4).to({startPosition:0},4).wait(30));

	// Camada 5
	this.instance_4 = new lib.Interpolação41("synched",0);
	this.instance_4.setTransform(-86.3,-89.6);
	this.instance_4._off = true;

	this.instance_5 = new lib.Interpolação42("synched",0);
	this.instance_5.setTransform(-89.9,-65.1);
	this.instance_5._off = true;

	this.instance_6 = new lib.Interpolação43("synched",0);
	this.instance_6.setTransform(-89.9,-71.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_6}]},4).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(12).to({_off:false},0).to({_off:true,x:-89.9,y:-65.1},4).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(12).to({_off:false},4).to({_off:true,y:-71.1},4).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-298.6,-215.1,749.1,523.7);


(lib.chestmove_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance_3 = new lib.number_2();
	this.instance_3.setTransform(-43.9,95.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(36));

	// Camada 1
	this.instance_4 = new lib.Interpolação19_1("synched",0);
	this.instance_4.setTransform(76,-15.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).wait(4));

	// Layer 2
	this.instance_5 = new lib.chest_1();
	this.instance_5.setTransform(-272.7,-61.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(36));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277.5,-183.8,704,492.4);


(lib.chest_x_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance_5 = new lib.Interpolar1_1("synched",0);
	this.instance_5.setTransform(122.2,68.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(59).to({_off:false},0).to({alpha:0},15).wait(1));

	// Camada 2
	this.instance_6 = new lib.chest_x();
	this.instance_6.setTransform(-146.8,-210.4);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(12).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},15).wait(16));

	// Camada 5
	this.instance_7 = new lib.Interpolação1_1("synched",0);
	this.instance_7.setTransform(27.1,179.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:20.1,y:147.3},4).to({x:23.1,y:114.3},4).to({scaleX:0.97,scaleY:1.02,x:24.6,y:176},4).to({scaleX:1,scaleY:1,rotation:2.5,x:23.2,y:173.3},4).to({rotation:-1.3,x:23.1,y:173.2},4).to({rotation:0,x:24.1,y:172.3},4).wait(51));

	// Camada 1
	this.instance_8 = new lib.Interpolação10_1("synched",0);
	this.instance_8.setTransform(81,-7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({scaleX:0.98,scaleY:1.03,x:65,y:-47.2},4).to({scaleX:1,scaleY:1,x:76,y:-75.3},4).to({scaleX:0.97,scaleY:1.02,x:75.9,y:-17.2},4).to({scaleX:1,scaleY:1,rotation:2.5,x:83.4},4).to({rotation:-1.3,x:72.3},4).to({rotation:0,x:76,y:-15.3},4).wait(51));

	// Layer 3
	this.instance_9 = new lib.Interpolação14_1("synched",0);
	this.instance_9.setTransform(79.7,128.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({scaleX:0.98,scaleY:1.03,x:69.8,y:96.8},4).to({scaleX:1,scaleY:1,x:74.8,y:63.6},4).to({scaleX:0.97,scaleY:1.02,y:125.1},4).to({scaleX:1,scaleY:1,rotation:2.5,x:76.1,y:121.4},4).to({rotation:-1.3,x:74.1,y:121.7},4).to({rotation:0,x:74.8,y:123.6},4).wait(51));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276.3,-209.5,708.5,518.1);


(lib.chest_ok_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance_7 = new lib.Interpolação47_1("synched",0);
	this.instance_7.setTransform(18.1,178.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:28.1,y:136.3},4).to({x:24.1,y:164.3},4).to({y:172.3},4).wait(34));

	// Camada 4
	this.instance_8 = new lib.Interpolação44_1("synched",0);
	this.instance_8.setTransform(86,-116.3);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(8).to({_off:false},0).to({y:-101},4).to({startPosition:0},4).wait(30));

	// Camada 3
	this.instance_9 = new lib.Interpolação39_1("synched",0);
	this.instance_9.setTransform(76,-3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({scaleX:0.94,scaleY:1.03,y:-64.3},4).to({scaleX:0.89,scaleY:1,x:72,y:-48.3},3).to({_off:true},1).wait(38));

	// Camada 1
	this.instance_10 = new lib.Interpolação26_1("synched",0);
	this.instance_10.setTransform(74.7,130.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({scaleX:0.94,scaleY:1.03,x:74.8,y:87},4).to({scaleX:0.89,scaleY:1.03,y:113.4},4).to({scaleX:0.92,scaleY:1,y:123.6},4).to({startPosition:0},4).wait(30));

	// Camada 5
	this.instance_11 = new lib.Interpolação41_1("synched",0);
	this.instance_11.setTransform(-86.3,-89.6);
	this.instance_11._off = true;

	this.instance_12 = new lib.Interpolação42_1("synched",0);
	this.instance_12.setTransform(-89.9,-65.1);
	this.instance_12._off = true;

	this.instance_13 = new lib.Interpolação43_1("synched",0);
	this.instance_13.setTransform(-89.9,-71.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[]},4).to({state:[{t:this.instance_11}]},4).to({state:[{t:this.instance_12}]},4).to({state:[{t:this.instance_13}]},4).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(12).to({_off:false},0).to({_off:true,x:-89.9,y:-65.1},4).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(12).to({_off:false},4).to({_off:true,y:-71.1},4).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-298.6,-215.1,749.1,523.7);


(lib.chestmove_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance_6 = new lib.number_1();
	this.instance_6.setTransform(-43.9,95.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(36));

	// Camada 1
	this.instance_7 = new lib.Interpolação19_2("synched",0);
	this.instance_7.setTransform(76,-15.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).to({rotation:0,x:76,y:-15.3},4).to({x:72},4).to({rotation:2.2,x:78.9,y:-16.3},4).wait(4));

	// Layer 2
	this.instance_8 = new lib.chest_1();
	this.instance_8.setTransform(-272.7,-61.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(36));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277.5,-183.8,704,492.4);


(lib.chest_x_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance_10 = new lib.Interpolar1_2("synched",0);
	this.instance_10.setTransform(122.2,68.1);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(59).to({_off:false},0).to({alpha:0},15).wait(1));

	// Camada 2
	this.instance_11 = new lib.chest_x();
	this.instance_11.setTransform(-146.8,-210.4);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(12).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},8).wait(8).to({_off:false},0).to({_off:true},15).wait(16));

	// Camada 5
	this.instance_12 = new lib.Interpolação1_2("synched",0);
	this.instance_12.setTransform(27.1,179.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({x:20.1,y:147.3},4).to({x:23.1,y:114.3},4).to({scaleX:0.97,scaleY:1.02,x:24.6,y:176},4).to({scaleX:1,scaleY:1,rotation:2.5,x:23.2,y:173.3},4).to({rotation:-1.3,x:23.1,y:173.2},4).to({rotation:0,x:24.1,y:172.3},4).wait(51));

	// Camada 1
	this.instance_13 = new lib.Interpolação10_2("synched",0);
	this.instance_13.setTransform(81,-7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({scaleX:0.98,scaleY:1.03,x:65,y:-47.2},4).to({scaleX:1,scaleY:1,x:76,y:-75.3},4).to({scaleX:0.97,scaleY:1.02,x:75.9,y:-17.2},4).to({scaleX:1,scaleY:1,rotation:2.5,x:83.4},4).to({rotation:-1.3,x:72.3},4).to({rotation:0,x:76,y:-15.3},4).wait(51));

	// Layer 3
	this.instance_14 = new lib.Interpolação14_2("synched",0);
	this.instance_14.setTransform(79.7,128.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({scaleX:0.98,scaleY:1.03,x:69.8,y:96.8},4).to({scaleX:1,scaleY:1,x:74.8,y:63.6},4).to({scaleX:0.97,scaleY:1.02,y:125.1},4).to({scaleX:1,scaleY:1,rotation:2.5,x:76.1,y:121.4},4).to({rotation:-1.3,x:74.1,y:121.7},4).to({rotation:0,x:74.8,y:123.6},4).wait(51));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276.3,-209.5,708.5,518.1);


(lib.chest_ok_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance_14 = new lib.Interpolação47_2("synched",0);
	this.instance_14.setTransform(18.1,178.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({x:28.1,y:136.3},4).to({x:24.1,y:164.3},4).to({y:172.3},4).wait(34));

	// Camada 4
	this.instance_15 = new lib.Interpolação44_2("synched",0);
	this.instance_15.setTransform(86,-116.3);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(8).to({_off:false},0).to({y:-101},4).to({startPosition:0},4).wait(30));

	// Camada 3
	this.instance_16 = new lib.Interpolação39_2("synched",0);
	this.instance_16.setTransform(76,-3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).to({scaleX:0.94,scaleY:1.03,y:-64.3},4).to({scaleX:0.89,scaleY:1,x:72,y:-48.3},3).to({_off:true},1).wait(38));

	// Camada 1
	this.instance_17 = new lib.Interpolação26_2("synched",0);
	this.instance_17.setTransform(74.7,130.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({scaleX:0.94,scaleY:1.03,x:74.8,y:87},4).to({scaleX:0.89,scaleY:1.03,y:113.4},4).to({scaleX:0.92,scaleY:1,y:123.6},4).to({startPosition:0},4).wait(30));

	// Camada 5
	this.instance_18 = new lib.Interpolação41_2("synched",0);
	this.instance_18.setTransform(-86.3,-89.6);
	this.instance_18._off = true;

	this.instance_19 = new lib.Interpolação42_2("synched",0);
	this.instance_19.setTransform(-89.9,-65.1);
	this.instance_19._off = true;

	this.instance_20 = new lib.Interpolação43_2("synched",0);
	this.instance_20.setTransform(-89.9,-71.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[]},4).to({state:[{t:this.instance_18}]},4).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_20}]},4).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(12).to({_off:false},0).to({_off:true,x:-89.9,y:-65.1},4).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(12).to({_off:false},4).to({_off:true,y:-71.1},4).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-298.6,-215.1,749.1,523.7);


(lib.ChestAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// chest1
	this.instance = new lib.chest_ok("synched",0,false);
	this.instance.setTransform(-45,-104.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(154).to({_off:false},0).wait(28).to({mode:"single",startPosition:28},0).wait(33).to({startPosition:45},0).wait(30).to({startPosition:45},0).to({skewX:-8,x:-1245},21,cjs.Ease.get(-1)).wait(1));

	// chest1
	this.instance_1 = new lib.chest_x_1("synched",0,false);
	this.instance_1.setTransform(-45,-104.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(38).to({_off:false},0).to({_off:true},103).wait(126));

	// chest1
	this.instance_2 = new lib.chestmove("synched",0,false);
	this.instance_2.setTransform(-45,-104.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(25).to({_off:false},0).to({_off:true},13).wait(103).to({_off:false},0).to({_off:true},13).wait(113));

	// chest1
	this.instance_3 = new lib.chest("synched",0,false);
	this.instance_3.setTransform(1159.3,-104.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:-45},22,cjs.Ease.get(1)).to({_off:true},3).wait(242));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.1,-288.3,1902.8,492.4);


(lib.ChestAnim_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// chest1
	this.instance_4 = new lib.chest_ok_1("synched",0,false);
	this.instance_4.setTransform(-45,-104.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(154).to({_off:false},0).wait(28).to({mode:"single",startPosition:28},0).wait(33).to({startPosition:45},0).wait(30).to({startPosition:45},0).to({skewX:-8,x:-1245},21,cjs.Ease.get(-1)).wait(1));

	// chest1
	this.instance_5 = new lib.chest_x_2("synched",0,false);
	this.instance_5.setTransform(-45,-104.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(38).to({_off:false},0).to({_off:true},103).wait(126));

	// chest1
	this.instance_6 = new lib.chestmove_1("synched",0,false);
	this.instance_6.setTransform(-45,-104.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(25).to({_off:false},0).to({_off:true},13).wait(103).to({_off:false},0).to({_off:true},13).wait(113));

	// chest1
	this.instance_7 = new lib.chest_5("synched",0,false);
	this.instance_7.setTransform(1159.3,-104.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:-45},22,cjs.Ease.get(1)).to({_off:true},3).wait(242));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.1,-288.3,1902.8,492.4);


(lib.ChestAnim_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// chest1
	this.instance_8 = new lib.chest_ok_2("synched",0,false);
	this.instance_8.setTransform(-45,-104.5);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(154).to({_off:false},0).wait(28).to({mode:"single",startPosition:28},0).wait(33).to({startPosition:45},0).wait(30).to({startPosition:45},0).to({skewX:-8,x:-1245},21,cjs.Ease.get(-1)).wait(1));

	// chest1
	this.instance_9 = new lib.chest_x_3("synched",0,false);
	this.instance_9.setTransform(-45,-104.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(38).to({_off:false},0).to({_off:true},103).wait(126));

	// chest1
	this.instance_10 = new lib.chestmove_2("synched",0,false);
	this.instance_10.setTransform(-45,-104.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(25).to({_off:false},0).to({_off:true},13).wait(103).to({_off:false},0).to({_off:true},13).wait(113));

	// chest1
	this.instance_11 = new lib.chest_6("synched",0,false);
	this.instance_11.setTransform(1159.3,-104.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({x:-45},22,cjs.Ease.get(1)).to({_off:true},3).wait(242));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.1,-288.3,1902.8,492.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;