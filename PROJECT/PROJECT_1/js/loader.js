    $(document).ready(function(){       
        init();
    });

    function init() {

        var stage           = new createjs.Stage("localCanvas");
        stage.canvas.width  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 20;
        stage.canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 20;

        var stageCenterX = stage.canvas.width / 2;
        var stageCenterY = stage.canvas.height / 2;

        // logo icon
        var hexagon = new createjs.Shape();
        hexagon.addEventListener("click", gotoNextScript);
        hexagon.graphics
                   .setStrokeStyle(3,'square','bevel')
                   .beginStroke('white')
                   .drawPolyStar(0, 0, 30, 6, 0, -90);
        hexagon.alpha = 0;
        hexagon.x    = stageCenterX;
        hexagon.y    = stageCenterY-150;
        hexagon.regX = hexagon.regY = 0;
        
        // ## logo text
        // first half
        var hexText             = new createjs.Text("HEX", "25px Orbitron", "#FFF"); 
        hexText.x               = (stageCenterX - 93);
        hexText.y               = (stageCenterY - 140); 
        hexText.textBaseline    = "alphabetic";
        hexText.alpha           = 0;
        // second half
        var osText              = new createjs.Text("OS", "25px Orbitron", "#FFF"); 
        osText.x                = (stageCenterX + 35);
        osText.y                = (stageCenterY - 140); 
        osText.textBaseline     = "alphabetic";
        osText.alpha            = 0;

        

        // fade in the hexagon symbol
        createjs.Tween.get(hexagon).to({alpha:1}, 3000).call(function(){
            // once complete, fade in the text
            createjs.Tween.get(hexText).to({alpha:1},1500);
            createjs.Tween.get(osText).to({alpha:1},1500);
            // load textfile binary data 
            var binaryDataText;
            $.get('res/randomBytecode.txt', function(data){
                binaryDataText              = new createjs.Text(data, "9px Orbitron", "#FFF");
                binaryDataText.x            = 10;
                binaryDataText.y            = stage.canvas.height;
                binaryDataText.textBaseline = "alphabetic";
                binaryDataText.alpha        = 0;
                
                createjs.Tween.get(binaryDataText).wait(1500).to({alpha:0.4, y:-10000}, 4500);
                stage.addChild(binaryDataText);
            });
            // wait a bit, then start rotating the hexagon
            createjs.Tween.get(hexagon).wait(1500).to({rotation: 720},4500).call(function(){
                
                //after hexagon completes spinning, show success message.
                var successLoadText = new createjs.Text('DECRYPTING...', '15px Orbitron', '#00CC00');
                successLoadText.x   = hexagon.x-50;
                successLoadText.y   = hexagon.y+50;
                
                // blink the success message
                createjs.Tween.get(successLoadText,{loop:true})
                              .to({alpha:0},100)
                              .to({alpha:1},100);
                
                // add the success message to the stage
                stage.addChild(successLoadText);
            }).wait(1500).call(function(){
                
                // create 2 scanlines that go up/down the screen
                var line = new createjs.Shape();
                var startY = 5;
                line.graphics.setStrokeStyle(1);
                line.graphics.beginStroke("#00CC00");
                line.graphics.moveTo(0, startY);
                line.graphics.lineTo(stage.canvas.width, 5);
                line.graphics.endStroke();
                var line2 = new createjs.Shape();
                line2.graphics.setStrokeStyle(1);
                line2.graphics.beginStroke("#00CC00");
                line2.graphics.moveTo(0, stage.canvas.height);
                line2.graphics.lineTo(stage.canvas.width, stage.canvas.height);
                line2.graphics.endStroke();

                // grid pattern
                var bgGrid = createBgGrid(stage, 6,8);

                // add new objects to stage
                stage.addChild(line, line2);
                stage.addChildAt(bgGrid, 0);
                createjs.Tween.get(line).to({x:0, y:stage.canvas.height}, 2000);
                createjs.Tween.get(line2).to({x:0, y:stage.canvas.height*-1},2000);
            }).wait(2300).call(function(){
                stage.removeAllChildren();
                stage.update();
                initDesktop(stage); // call next script
            });
        });

        stage.addChild(hexagon);
        stage.addChild(hexText);
        stage.addChild(osText); 
        createjs.Ticker.addEventListener("tick", stage);
    }






// FUNCTIONS
    var createBgGrid = function(stage, numX, numY) {
    
    var grid = new createjs.Container();
    grid.snapToPixel = true;
    // calculating the distance between
    // the grid-lines
    var gw = stage.canvas.width/numX;
    var gh = stage.canvas.height/numY;
    // drawing the vertical line
    var verticalLine = new createjs.Graphics();
    verticalLine.beginFill(createjs.Graphics.getRGB(0, 204, 0));
    verticalLine.drawRect(0,0,gw * 0.02,gh*(numY+2));
    var vs;
    // placing the vertical lines:
    // we're placing 1 more than requested
    // to have seamless scrolling later
    for ( var c = -1; c < numX+1; c++) {
        vs = new createjs.Shape(verticalLine);
        vs.snapToPixel = true;
        vs.x = c * gw;
        vs.y = -gh;
        grid.addChild(vs);
    }
    // drawing a horizontal line
    var horizontalLine = new createjs.Graphics();
    horizontalLine.beginFill(createjs.Graphics.getRGB(0, 204, 0));
    horizontalLine.drawRect(0,0,gw*(numX+1),gh * 0.02);
    var hs;
    // placing the horizontal lines:
    // we're placing 1 more than requested
    // to have seamless scrolling later
    for ( c = -1; c < numY+1; c++ ) {
        hs = new createjs.Shape(horizontalLine);
        hs.snapToPixel = true;
        hs.x = 0;
        hs.y = c * gh;
        grid.addChild(hs);
    }
 
    // return the grid-object
    return grid;
};

var gotoNextScript = function(stage){
    console.dir(e);
    initDesktop(stage);
};