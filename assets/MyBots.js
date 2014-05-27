(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.MyBots = function() {
	this.initialize();

	// S-H06
	this.Bot12 = new lib.SH06();
	this.Bot12.setTransform(192.9,1781.7,0.65,0.65);

	// B-GH
	this.Bot16 = new lib.GGH();
	this.Bot16.setTransform(1074.1,1829.9,0.5,0.5);

	// P4C-M
	this.Bot15 = new lib.P4CM();
	this.Bot15.setTransform(1370.3,1791.7,0.7,0.7);

	// R-GH
	this.Bot14 = new lib.RGH();
	this.Bot14.setTransform(724.1,1797.9,0.5,0.5);

	// B-GH
	this.Bot09 = new lib.BGH();
	this.Bot09.setTransform(933.8,1730.8,0.5,0.5);

	// B00-M
	this.Bot05 = new lib.B00M();
	this.Bot05.setTransform(514.2,1632.4,0.6,0.6);

	// S-NE5
	this.Bot01 = new lib.SNES();
	this.Bot01.setTransform(816.6,1438.3,0.6,0.6);

	// ME64-X
	this.Bot07 = new lib.ME64X();
	this.Bot07.setTransform(1312.3,1416.3,0.6,0.6);

	// L-1NK
	this.Bot04 = new lib.L1NK();
	this.Bot04.setTransform(278.1,1362.4,0.6,0.6);

	// P1K-U
	this.Bot03 = new lib.P1K4();
	this.Bot03.setTransform(1212.8,1226,0.5,0.5);

	// K-R8Y
	this.Bot06 = new lib.KR8Y();
	this.Bot06.setTransform(1276.9,876.7,0.6,0.6);

	// B-MS
	this.Bot11 = new lib.BMSM();
	this.Bot11.setTransform(847.6,895.8,0.5,0.5);

	// R-MS
	this.Bot02 = new lib.RMS();
	this.Bot02.setTransform(596.1,888.3,0.5,0.5);

	// T-BLK
	this.Bot17 = new lib.TBLK();
	this.Bot17.setTransform(242.1,343.7,0.5,0.5);

	// K-0N6
	this.Bot08 = new lib.K0N6();
	this.Bot08.setTransform(246.1,1080.3,0.7,0.7);

	// D-D1
	this.Bot13 = new lib.DD1();
	this.Bot13.setTransform(212,624.2,0.5,0.5);

	// Y05-1
	this.Bot18 = new lib.Y051();
	this.Bot18.setTransform(1429.5,732.2,0.698,0.698);

	// BJ-KZ
	this.Bot10 = new lib.BJKZ();
	this.Bot10.setTransform(662.6,420.1,0.5,0.5);

	// Background
	this.instance = new lib.mybotsbg();

	this.addChild(this.instance,this.Bot10,this.Bot18,this.Bot13,this.Bot08,this.Bot17,this.Bot02,this.Bot11,this.Bot06,this.Bot03,this.Bot04,this.Bot07,this.Bot01,this.Bot05,this.Bot09,this.Bot14,this.Bot15,this.Bot16,this.Bot12);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-71,0,2116.1,2048);


// symbols:
(lib.B00M_01 = function() {
	this.initialize(img.B00M_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,562,583);


(lib.B00M_02 = function() {
	this.initialize(img.B00M_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,562,583);


(lib.B00M_03 = function() {
	this.initialize(img.B00M_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,562,583);


(lib.B00M_04 = function() {
	this.initialize(img.B00M_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,562,583);


(lib.BGH_01 = function() {
	this.initialize(img.BGH_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.BGH_02 = function() {
	this.initialize(img.BGH_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.BGH_03 = function() {
	this.initialize(img.BGH_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.BGH_04 = function() {
	this.initialize(img.BGH_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.BJKZ_01 = function() {
	this.initialize(img.BJKZ_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_02 = function() {
	this.initialize(img.BJKZ_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_03 = function() {
	this.initialize(img.BJKZ_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_04 = function() {
	this.initialize(img.BJKZ_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_05 = function() {
	this.initialize(img.BJKZ_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_06 = function() {
	this.initialize(img.BJKZ_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_07 = function() {
	this.initialize(img.BJKZ_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BJKZ_08 = function() {
	this.initialize(img.BJKZ_08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,877,945);


(lib.BMSM_01 = function() {
	this.initialize(img.BMSM_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,474,605);


(lib.BMSM_02 = function() {
	this.initialize(img.BMSM_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,474,605);


(lib.BMSM_03 = function() {
	this.initialize(img.BMSM_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,474,605);


(lib.BMSM_04 = function() {
	this.initialize(img.BMSM_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,474,605);


(lib.Bot01 = function() {
	this.initialize(img.Bot01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,828,636);


(lib.Bot02 = function() {
	this.initialize(img.Bot02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,920,627);


(lib.Bot03 = function() {
	this.initialize(img.Bot03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,833,760);


(lib.Bot04 = function() {
	this.initialize(img.Bot04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,797,635);


(lib.Bot05 = function() {
	this.initialize(img.Bot05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,465,606);


(lib.Bot06 = function() {
	this.initialize(img.Bot06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,461,608);


(lib.Bot07 = function() {
	this.initialize(img.Bot07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,513,491);


(lib.Bot08 = function() {
	this.initialize(img.Bot08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,567,586);


(lib.Bot09 = function() {
	this.initialize(img.Bot09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,556,728);


(lib.Bot10 = function() {
	this.initialize(img.Bot10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.Bot11 = function() {
	this.initialize(img.Bot11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.Bot12 = function() {
	this.initialize(img.Bot12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.Bot13 = function() {
	this.initialize(img.Bot13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,583,609);


(lib.Bot14 = function() {
	this.initialize(img.Bot14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,906,886);


(lib.Bot15 = function() {
	this.initialize(img.Bot15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,762,776);


(lib.Bot16 = function() {
	this.initialize(img.Bot16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,801,568);


(lib.Bot17 = function() {
	this.initialize(img.Bot17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1767,1670);


(lib.Bot18 = function() {
	this.initialize(img.Bot18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,855,940);


(lib.DD1_01 = function() {
	this.initialize(img.DD1_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,781,807);


(lib.DD1_02 = function() {
	this.initialize(img.DD1_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,781,807);


(lib.DD1_03 = function() {
	this.initialize(img.DD1_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,781,807);


(lib.DD1_04 = function() {
	this.initialize(img.DD1_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,781,807);


(lib.GGH_01 = function() {
	this.initialize(img.GGH_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.GGH_02 = function() {
	this.initialize(img.GGH_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.GGH_03 = function() {
	this.initialize(img.GGH_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.GGH_04 = function() {
	this.initialize(img.GGH_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.GGH_05 = function() {
	this.initialize(img.GGH_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,402,788);


(lib.K0N6_01 = function() {
	this.initialize(img.K0N6_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,906,888);


(lib.K0N6_02 = function() {
	this.initialize(img.K0N6_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,906,888);


(lib.K0N6_03 = function() {
	this.initialize(img.K0N6_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,906,888);


(lib.KR8Y_01 = function() {
	this.initialize(img.KR8Y_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_02 = function() {
	this.initialize(img.KR8Y_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_03 = function() {
	this.initialize(img.KR8Y_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_04 = function() {
	this.initialize(img.KR8Y_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_05 = function() {
	this.initialize(img.KR8Y_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_06 = function() {
	this.initialize(img.KR8Y_06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_07 = function() {
	this.initialize(img.KR8Y_07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.KR8Y_08 = function() {
	this.initialize(img.KR8Y_08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,490);


(lib.L1NK_01 = function() {
	this.initialize(img.L1NK_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,626);


(lib.L1NK_02 = function() {
	this.initialize(img.L1NK_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,626);


(lib.L1NK_03 = function() {
	this.initialize(img.L1NK_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,626);


(lib.L1NK_04 = function() {
	this.initialize(img.L1NK_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,626);


(lib.ME64X_01 = function() {
	this.initialize(img.ME64X_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,858,760);


(lib.ME64X_02 = function() {
	this.initialize(img.ME64X_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,858,760);


(lib.ME64X_03 = function() {
	this.initialize(img.ME64X_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,858,760);


(lib.ME64X_04 = function() {
	this.initialize(img.ME64X_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,858,760);


(lib.mybotsbg = function() {
	this.initialize(img.mybotsbg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2048);


(lib.P1K4_01 = function() {
	this.initialize(img.P1K4_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,635);


(lib.P1K4_02 = function() {
	this.initialize(img.P1K4_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,635);


(lib.P1K4_03 = function() {
	this.initialize(img.P1K4_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,635);


(lib.P1K4_04 = function() {
	this.initialize(img.P1K4_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,635);


(lib.P1K4_05 = function() {
	this.initialize(img.P1K4_05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,635);


(lib.P4CM_01 = function() {
	this.initialize(img.P4CM_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,588,614);


(lib.P4CM_02 = function() {
	this.initialize(img.P4CM_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,588,614);


(lib.P4CM_03 = function() {
	this.initialize(img.P4CM_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,588,614);


(lib.RGH_01 = function() {
	this.initialize(img.RGH_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,408,790);


(lib.RGH_02 = function() {
	this.initialize(img.RGH_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,408,790);


(lib.RGH_03 = function() {
	this.initialize(img.RGH_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,408,790);


(lib.RMS_01 = function() {
	this.initialize(img.RMS_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,473,607);


(lib.RMS_02 = function() {
	this.initialize(img.RMS_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,473,607);


(lib.RMS_03 = function() {
	this.initialize(img.RMS_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,473,607);


(lib.RMS_04 = function() {
	this.initialize(img.RMS_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,473,607);


(lib.SH06_01 = function() {
	this.initialize(img.SH06_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,558,726);


(lib.SH06_02 = function() {
	this.initialize(img.SH06_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,558,726);


(lib.SH06_03 = function() {
	this.initialize(img.SH06_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,558,726);


(lib.SH06_04 = function() {
	this.initialize(img.SH06_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,558,726);


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


(lib.TBLK_01 = function() {
	this.initialize(img.TBLK_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,826,680);


(lib.TBLK_02 = function() {
	this.initialize(img.TBLK_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,826,680);


(lib.TBLK_03 = function() {
	this.initialize(img.TBLK_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,826,680);


(lib.TBLK_04 = function() {
	this.initialize(img.TBLK_04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,826,680);


(lib.Y0S1_01 = function() {
	this.initialize(img.Y0S1_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1764,1675);


(lib.Y0S1_02 = function() {
	this.initialize(img.Y0S1_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1764,1675);


(lib.Y0S1_03 = function() {
	this.initialize(img.Y0S1_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1764,1675);


(lib.Y051 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.Y0S1_02();
	this.instance.setTransform(-881.9,-837.4);

	this.instance_1 = new lib.Y0S1_01();
	this.instance_1.setTransform(-881.9,-837.4);

	this.instance_2 = new lib.Y0S1_03();
	this.instance_2.setTransform(-881.9,-837.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},11).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance_2}]},11).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-881.9,-837.4,1764,1675);


(lib.TBLK = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.TBLK_04();
	this.instance.setTransform(-412.9,-339.9);

	this.instance_1 = new lib.TBLK_03();
	this.instance_1.setTransform(-412.9,-339.9);

	this.instance_2 = new lib.TBLK_02();
	this.instance_2.setTransform(-412.9,-339.9);

	this.instance_3 = new lib.TBLK_01();
	this.instance_3.setTransform(-412.9,-339.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-412.9,-339.9,826,680);


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


(lib.SH06 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.SH06_04();
	this.instance.setTransform(-278.9,-362.9);

	this.instance_1 = new lib.SH06_03();
	this.instance_1.setTransform(-278.9,-362.9);

	this.instance_2 = new lib.SH06_02();
	this.instance_2.setTransform(-278.9,-362.9);

	this.instance_3 = new lib.SH06_01();
	this.instance_3.setTransform(-278.9,-362.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-278.9,-362.9,558,726);


(lib.RMS = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.RMS_03();
	this.instance.setTransform(-236.4,-303.4);

	this.instance_1 = new lib.RMS_02();
	this.instance_1.setTransform(-236.4,-303.4);

	this.instance_2 = new lib.RMS_01();
	this.instance_2.setTransform(-236.4,-303.4);

	this.instance_3 = new lib.RMS_04();
	this.instance_3.setTransform(-236.4,-303.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},18).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_2}]},18).to({state:[{t:this.instance_1}]},6).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-236.4,-303.4,473,607);


(lib.RGH = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.RGH_01();
	this.instance.setTransform(-203.9,-394.9);

	this.instance_1 = new lib.RGH_03();
	this.instance_1.setTransform(-203.9,-394.9);

	this.instance_2 = new lib.RGH_02();
	this.instance_2.setTransform(-203.9,-394.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance_2}]},6).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-203.9,-394.9,408,790);


(lib.P4CM = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.P4CM_01();
	this.instance.setTransform(-293.9,-306.9);

	this.instance_1 = new lib.P4CM_02();
	this.instance_1.setTransform(-293.9,-306.9);

	this.instance_2 = new lib.P4CM_03();
	this.instance_2.setTransform(-293.9,-306.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},9).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293.9,-306.9,588,614);


(lib.P1K4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.P1K4_05();
	this.instance.setTransform(-407.9,-317.4);

	this.instance_1 = new lib.P1K4_04();
	this.instance_1.setTransform(-407.9,-317.4);

	this.instance_2 = new lib.P1K4_02();
	this.instance_2.setTransform(-407.9,-317.4);

	this.instance_3 = new lib.P1K4_01();
	this.instance_3.setTransform(-407.9,-317.4);

	this.instance_4 = new lib.P1K4_03();
	this.instance_4.setTransform(-407.9,-317.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_3}]},8).to({state:[{t:this.instance_4}]},10).to({state:[{t:this.instance_3}]},12).to({state:[{t:this.instance_4}]},12).wait(12));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-407.9,-317.4,816,635);


(lib.ME64X = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.ME64X_03();
	this.instance.setTransform(-428.9,-379.9);

	this.instance_1 = new lib.ME64X_02();
	this.instance_1.setTransform(-428.9,-379.9);

	this.instance_2 = new lib.ME64X_01();
	this.instance_2.setTransform(-428.9,-379.9);

	this.instance_3 = new lib.ME64X_04();
	this.instance_3.setTransform(-428.9,-379.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},13).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-428.9,-379.9,858,760);


(lib.L1NK = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.L1NK_01();
	this.instance.setTransform(-468.9,-312.9);

	this.instance_1 = new lib.L1NK_02();
	this.instance_1.setTransform(-468.9,-312.9);

	this.instance_2 = new lib.L1NK_03();
	this.instance_2.setTransform(-468.9,-312.9);

	this.instance_3 = new lib.L1NK_04();
	this.instance_3.setTransform(-468.9,-312.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_1}]},6).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-468.9,-312.9,938,626);


(lib.K0N6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.K0N6_02();
	this.instance.setTransform(-452.9,-443.9);

	this.instance_1 = new lib.K0N6_01();
	this.instance_1.setTransform(-452.9,-443.9);

	this.instance_2 = new lib.K0N6_03();
	this.instance_2.setTransform(-452.9,-443.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance_2}]},5).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-452.9,-443.9,906,888);


(lib.KR8Y = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.KR8Y_08();
	this.instance.setTransform(-257.4,-244.9);

	this.instance_1 = new lib.KR8Y_07();
	this.instance_1.setTransform(-257.4,-244.9);

	this.instance_2 = new lib.KR8Y_06();
	this.instance_2.setTransform(-257.4,-244.9);

	this.instance_3 = new lib.KR8Y_05();
	this.instance_3.setTransform(-257.4,-244.9);

	this.instance_4 = new lib.KR8Y_04();
	this.instance_4.setTransform(-257.4,-244.9);

	this.instance_5 = new lib.KR8Y_03();
	this.instance_5.setTransform(-257.4,-244.9);

	this.instance_6 = new lib.KR8Y_02();
	this.instance_6.setTransform(-257.4,-244.9);

	this.instance_7 = new lib.KR8Y_01();
	this.instance_7.setTransform(-257.4,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_7}]},5).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.4,-244.9,515,490);


(lib.GGH = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.GGH_01();
	this.instance.setTransform(-200.9,-393.9);

	this.instance_1 = new lib.GGH_02();
	this.instance_1.setTransform(-200.9,-393.9);

	this.instance_2 = new lib.GGH_03();
	this.instance_2.setTransform(-200.9,-393.9);

	this.instance_3 = new lib.GGH_04();
	this.instance_3.setTransform(-200.9,-393.9);

	this.instance_4 = new lib.GGH_05();
	this.instance_4.setTransform(-200.9,-393.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_1}]},4).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200.9,-393.9,402,788);


(lib.DD1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.DD1_01();
	this.instance.setTransform(-390.4,-403.4);

	this.instance_1 = new lib.DD1_02();
	this.instance_1.setTransform(-390.4,-403.4);

	this.instance_2 = new lib.DD1_03();
	this.instance_2.setTransform(-390.4,-403.4);

	this.instance_3 = new lib.DD1_04();
	this.instance_3.setTransform(-390.4,-403.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_2}]},11).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance_3}]},12).to({state:[{t:this.instance_1}]},13).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-390.4,-403.4,781,807);


(lib.BJKZ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.BJKZ_08();
	this.instance.setTransform(-438.4,-472.4);

	this.instance_1 = new lib.BJKZ_07();
	this.instance_1.setTransform(-438.4,-472.4);

	this.instance_2 = new lib.BJKZ_06();
	this.instance_2.setTransform(-438.4,-472.4);

	this.instance_3 = new lib.BJKZ_05();
	this.instance_3.setTransform(-438.4,-472.4);

	this.instance_4 = new lib.BJKZ_04();
	this.instance_4.setTransform(-438.4,-472.4);

	this.instance_5 = new lib.BJKZ_03();
	this.instance_5.setTransform(-438.4,-472.4);

	this.instance_6 = new lib.BJKZ_02();
	this.instance_6.setTransform(-438.4,-472.4);

	this.instance_7 = new lib.BJKZ_01();
	this.instance_7.setTransform(-438.4,-472.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_7}]},5).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-438.4,-472.4,877,945);


(lib.B00M = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.B00M_04();
	this.instance.setTransform(-280.9,-291.4);

	this.instance_1 = new lib.B00M_03();
	this.instance_1.setTransform(-280.9,-291.4);

	this.instance_2 = new lib.B00M_02();
	this.instance_2.setTransform(-280.9,-291.4);

	this.instance_3 = new lib.B00M_01();
	this.instance_3.setTransform(-280.9,-291.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280.9,-291.4,562,583);


(lib.BMSM = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.BMSM_04();
	this.instance.setTransform(-236.9,-302.4);

	this.instance_1 = new lib.BMSM_03();
	this.instance_1.setTransform(-236.9,-302.4);

	this.instance_2 = new lib.BMSM_02();
	this.instance_2.setTransform(-236.9,-302.4);

	this.instance_3 = new lib.BMSM_01();
	this.instance_3.setTransform(-236.9,-302.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_3}]},8).wait(8));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-236.9,-302.4,474,605);


(lib.BGH = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 1
	this.instance = new lib.BGH_01();
	this.instance.setTransform(-200.9,-393.9);

	this.instance_1 = new lib.BGH_02();
	this.instance_1.setTransform(-200.9,-393.9);

	this.instance_2 = new lib.BGH_03();
	this.instance_2.setTransform(-200.9,-393.9);

	this.instance_3 = new lib.BGH_04();
	this.instance_3.setTransform(-200.9,-393.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},5).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200.9,-393.9,402,788);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;