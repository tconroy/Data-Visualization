function initDesktop(stage){
	// clear out the stage
	createjs.Tween.removeAllTweens();
	stage.removeAllChildren();


	var bg = new HexBackground();
	bg.alpha = 0.5;
	stage.addChild( bg );
}



// creates the hexagonal background
var HexBackground = function(){

	var hexbgContainer    = new createjs.Container();
	hexbgContainer.width  = stage.canvas.width - 10;
	hexbgContainer.height = stage.canvas.height - 10;

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
var TerminalWindow = function(){

	// setup container object
	var termContainer    = new createjs.Container();
	termContainer.width  = 400;
	termContainer.height = 400;

	// add border
	var border = new createjs.Shape();

	// return the finished container
	return termContainer;
};