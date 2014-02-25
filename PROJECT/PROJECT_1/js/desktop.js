function initDesktop(stage){
	console.log('initDesktop called');
	stage.removeAllChildren();

	var circWidget = new CircleWidget();
	circWidget.x = 100;
	circWidget.y = 100;
	stage.addChild( circWidget );
}

// circle widget
var CircleWidget = function() {
	//
	var widgetContainer    = new createjs.Container();
	widgetContainer.width  = 400;
	widgetContainer.height = 400;
	//
	var firstCirc = new createjs.Shape();
	firstCirc.graphics.setStrokeStyle(3, "round");
	firstCirc.graphics.beginStroke("#fff");
	firstCirc.graphics.arc(100, 100, 20, 0, Math.PI); 

	// add the children to the container
	widgetContainer.addChild(firstCirc);

	// return completed container
	return widgetContainer;
};