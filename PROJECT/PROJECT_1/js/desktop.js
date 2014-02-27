function initDesktop(stage){
	// clear out the stage
	createjs.Tween.removeAllTweens();
	stage.removeAllChildren();

	// instantiate children
	var bg   = new HexBackground( 0.5 );
	var rg   = new randomGraph(stage.canvas.width - 450, stage.canvas.height - 250, 400, 200);
	var menu = new menuBar(stage.canvas.width, 30);
	var termWin = new TerminalWindow(400, 450);

	termWin.x = 100;
	termWin.y = 50;

	// add children to stage
	stage.addChild( bg, menu, rg, termWin );
}


var menuBar = function(thisWidth, thisHeight){

	var menuBarContainer    = new createjs.Container();
	menuBarContainer.width  = thisWidth;
	menuBarContainer.height = thisHeight;
	// menu bar
	var menuBarShape = new createjs.Shape();
	menuBarShape.graphics.setStrokeStyle(1, "square");
	menuBarShape.graphics.beginStroke("#00CC00");
	menuBarShape.graphics.beginFill("black");
	menuBarShape.graphics.drawRect(0, 0, thisWidth, thisHeight);
	// welcome text (left)
	var menuBarWelcomeTxt = new createjs.Text("WELCOME, GUEST", "12px Orbitron", "#FFF");
	menuBarWelcomeTxt.x = 10;
	menuBarWelcomeTxt.y = thisHeight / 2; 
	menuBarWelcomeTxt.textBaseline = "alphabetic";
	// time text (right)
	var now = new Date();
	var menubarTimeTxt = new createjs.Text(now, "12px Orbitron", "#FFF");
	menubarTimeTxt.x = thisWidth - 320;
	menubarTimeTxt.y = thisHeight/2;
	menubarTimeTxt.textBaseline = "alphabetic";

	// Add child animations
	menuBarContainer.addChild(menuBarShape, menuBarWelcomeTxt, menubarTimeTxt);

	// on tick
	menuBarContainer.addEventListener('tick', function(){
		// update time
		now = new Date();
		menubarTimeTxt.text = now;
	});
	// return object
	return menuBarContainer;

};


var randomGraph = function(thisX, thisY, thisWidth, thisHeight){

	var graphContainer    = new createjs.Container();
	var pointCount        = 10;
	var xLabels           = [];
	var yLabels           = [];
	var pointsArray       = [];
	graphContainer.width  = thisWidth;
	graphContainer.height = thisHeight;
	graphContainer.x      = thisX;
	graphContainer.y      = thisY;

	// set styling on graph container
	var containerBg = new createjs.Shape();
	containerBg.graphics.setStrokeStyle(5, "square");
	containerBg.graphics.beginStroke("#00CC00");
	containerBg.graphics.beginFill("#FFF");
	containerBg.graphics.drawRect(0, 0, graphContainer.width, graphContainer.height);
	containerBg.alpha = 0.1;
	graphContainer.addChild(containerBg);

	var intervalWidth =  graphContainer.width / pointCount;
	for( var i=0; i< pointCount; i++ ){
		// setup labels
		xLabels.push( intervalWidth * i );

		// generate point shapes
		var tmpShape = new createjs.Shape();
		tmpShape.graphics.beginFill("red").drawCircle(0,0,3);
		// push to container
		pointsArray.push(tmpShape);
	}

	for( i=0; i<pointsArray.length; i++ ){
		graphContainer.addChild( pointsArray[i] );
	}

	// line we will be drawing lines with
	var line = new createjs.Shape();
	graphContainer.addChild(line);

	// add the tick event listener
	var currTick = 0;
	var currLine = 0;
	graphContainer.addEventListener("tick", function(){
		currTick++;
		if( currTick > 20 ){
			currLine++;
			// clear out old lines
			if( currLine > 2 ){
				line.graphics.clear();
				currLine = 0;
			}

			// start with the first point..
			var point = { 'x': pointsArray[0].x, 'y': pointsArray[0].y };
			var colors = ['red','green','blue'];
			// for each point:
			for( i=0; i<pointCount; i++ ){
				// generate a random number from 0 - container width for Y data
				var randomYValue = Math.floor(Math.random()* graphContainer.height + 1 );
				pointsArray[i].x = xLabels[i];
				pointsArray[i].y = randomYValue;

				// draw a line from point var to our newly generated 
				line.graphics.moveTo(point.x, point.y);
				line.graphics.setStrokeStyle(1,"round").beginStroke(colors[currLine]);
				line.graphics.lineTo( pointsArray[i].x, pointsArray[i].y );
				line.graphics.endStroke();
				point.x = pointsArray[i].x;
				point.y = pointsArray[i].y;
			}
			currTick = 0;
		}
	});


	// return the container object
	return graphContainer;
};


// creates the hexagonal background
var HexBackground = function(alphaLevel){

	var hexbgContainer    = new createjs.Container();
	hexbgContainer.width  = stage.canvas.width - 10;
	hexbgContainer.height = stage.canvas.height - 10;

	// set alpha
	hexbgContainer.alpha = alphaLevel;

	var numRows = hexbgContainer.height / 60;

	// loop to create grid of hexagon objects
	for( var j=0; j<numRows; j++ ){
		for( var i=0; i<(hexbgContainer.width/30); i++ ){
			
			var tmpHexagon = new createjs.Shape();  // create a shape
			var randAlph = Math.random();			// generate alpha to tween to
			var randTime = Math.random() * 10000;	// generate random time interval for tween
			if( randTime < 1000 ) randTime = 1000;
			if( randAlph < 0.25 ) randAlph = 0.25;

			var hexColors = ["gray","darkgray","#00CC00"];

			// set temphexagon graphic settings
			tmpHexagon.alpha = 0;
			tmpHexagon.graphics
						.setStrokeStyle(1,'square','square')
						.beginStroke( hexColors[Math.floor(Math.random()*hexColors.length)] )
						.drawPolyStar(50*i, 60*j, 30, 6, 0, -90);
            
            // set hexagon tween
            createjs.Tween.get(tmpHexagon,{loop:true})
                              .to({alpha:randAlph},randTime)
                              .to({alpha:0},randTime);


            // add the tmp hexagon to the parent container
			hexbgContainer.addChild(tmpHexagon);
		}
	}
	// return the finished container
	return hexbgContainer;
};



// creates the a terminal window
var TerminalWindow = function(thisWidth, thisHeight){


	// TODO: continue terminal window development

	// setup container object
	var termContainer    = new createjs.Container();

	// add border
	var border = new createjs.Shape();
	border.graphics.setStrokeStyle(5, "square");
	border.graphics.beginStroke("#00CC00");
	border.graphics.beginFill("white");
	border.alpha = 0.1;
	border.graphics.drawRect(0,0, thisWidth, thisHeight);
	termContainer.addChild(border);

	// return the finished container
	return termContainer;
};