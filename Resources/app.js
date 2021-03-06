var window = Ti.UI.createWindow({
	backgroundColor: "#000000"
});
var view = Ti.UI.createView({
	backgroundColor: "#ffffff",
	height: 300
});
window.add(view);
window.open();

// load the module
var box2d = require("ti.box2d");

// create the world, using view as the surface
var world = box2d.createWorld(view);
var bodies = [];

function createSprite(){
	var left = Math.random() * Ti.Platform.displayCaps.platformWidth - 50;
	var top = Math.random() * 10;	
	
	var color = "#000000";
	
	var box = Ti.UI.createView({
		width: 50,
		height: 50,
		top: top,
		left: left,
		backgroundColor: color
	});
	
	
	var b = world.addBody(box, {
		density: 4,
		restitution: Math.random()
	});
	
	
	
	//world.removeBody(b.body);
	bodies.push(b);
}

var base = Ti.UI.createView({
		height: 50,
		bottom: 0,
		left: 0,
		backgroundColor: "red"
	});

//view.add(base);
var baseBody = world.addBody(base,{
	density: 100, 
	restitution: 0,
	type: 'static'
	});

//Ti.API.log(baseBody.getPosition());

Ti.Accelerometer.addEventListener("update", function(e){
	world.setGravity(e.x * 9.81, e.y * 9.81);
});

 Ti.Gesture.addEventListener('shake',function(e){
	// //world.dealloc();
	// //world = box2d.createWorld(view);
	Ti.API.info(bodies.length);
	for(var i = 0; i<=bodies.length;i++){
		var b = bodies[i];
		// //Ti.API.info(.body());
		// //Ti.API.info(b.getLocalCenter());
		world.removeBody(b);
	}
	// //bodies = [];
	// //Ti.Media.vibrate();
});
// world.addEventListener("collision",function(e){
	// Ti.API.info("collision between: " + e.a + " -> " +e.b + " -> phase: "+e.phase);
// });

function randomColor(){
	var color = "#";
	for (var i=0; i<3; i++){	
		var icolor = Math.round(Math.random() * 255);
		if (icolor < 16){
			icolor += 16;	
		}
		icolor = icolor.toString(16);
		Ti.API.info(icolor);	
		color += icolor;		
	}
	//Ti.API.info(color);
	return color;	
}

function randomColor2(){
	var icolor = Math.round(Math.random() * 1);
	//Ti.API.info(icolor);
	var acolor = ["#000000","#ffffff"];
	var color = acolor[icolor];
	return color;
}
base.addEventListener("click",function(e){
	Ti.API.info('create -> ');
	var tcolor = "#000000";
	//var tcolor = randomColor2();
	var box = Ti.UI.createView({
		width: 50,
		height: 50,
		center: {x:e.x,y:e.y},
		backgroundColor: tcolor
	});

	box.addEventListener("click",function(e){
		Ti.API.info(e.x + ' -> '+ e.y);
	});

	var player = Ti.UI.createView({
		width: 25,
		height: 25,
		center: {x:e.x,y:e.y - 25},
		backgroundColor: 'blue'
	});

	var b = world.addBody(box, {
		density: 4,
		restitution: Math.random()
	});
	
	var a = world.addBody(player, {
		density: 4,
		restitution: 100
	});
		
	//bodies.push(b);
	//world.removeBody(b.body);
});
// create a block 
// var redBlock = Ti.UI.createView({
	// backgroundColor: "red",
	// width: 50,
	// height: 50,
	// top: 0
// });

// redBlock.addEventListener('click',function(e){
	// Ti.API.info('click' + e.x);
// 	
	// //redBodyRef.applyForce([1,0], [1,2]);
// });
// var redBodyRef = world.addBody(redBlock, {
	// density: 12.0,
	// friction: 0.3,
	// restitution: 0.4,
	// type: "dynamic"
// });

Ti.Gesture.addEventListener('orientationchange', function(e) {
	if (e.orientation == Titanium.UI.LANDSCAPE_LEFT) {
		view.backgroundColor = "#000000";
		window.backgroundColor = "#ffffff";
		world.setGravity(9.91, 0);
	} else if (e.orientation == Titanium.UI.LANDSCAPE_RIGHT) {
		view.backgroundColor = "#000000";
		window.backgroundColor = "#ffffff";
		world.setGravity(-9.91, 0);
	} else if (e.orientation == Titanium.UI.UPSIDE_PORTRAIT) {
		view.backgroundColor = "#ffffff";
		window.backgroundColor = "#000000";
		world.setGravity(0, 9.91);
	} else if (e.orientation == Titanium.UI.PORTRAIT) {
		view.backgroundColor = "#ffffff";
		window.backgroundColor = "#000000";
		world.setGravity(0, -9.91);
	}
});

world.addEventListener("collision", function(e) {
	// if ((e.a == redBodyRef || e.b == redBodyRef) && e.phase == "begin") {
		//Ti.API.info("the red block collided with something");
		//Ti.API.info(e.phase);
		if (e.phase == "begin" && e.a == baseBody){
			world.removeBody(e.b);	
		}
		//Ti.API.info(e.a);
		//Ti.API.info(e.b);

// 
		// Ti.API.info(JSON.stringify(e));
		// Ti.Media.vibrate();
	// }
});

// start the world
world.start();