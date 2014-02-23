    $(document).ready(function(){       
        init();
    });

    function init() {
        // code here.
        var stage   = new createjs.Stage("localCanvas");
        var stageCenterX = stage.canvas.width / 2;
        var stageCenterY = stage.canvas.height / 2;

        // logo icon
        var hexagon = new createjs.Shape();
        hexagon.graphics
                   .setStrokeStyle(3,'square','bevel')
                   .beginStroke('white')
                   .drawPolyStar(0, 0, 30, 6, 0, -90);
        hexagon.alpha = 0;
        hexagon.x    = stageCenterX;
        hexagon.y    = stageCenterY-150;
        hexagon.regX = hexagon.regY = 0;
        
        // logo text
        var hexText             = new createjs.Text("HEX", "25px Orbitron", "#FFF"); 
        hexText.x               = (stageCenterX - 93);
        hexText.y               = (stageCenterY - 140); 
        hexText.textBaseline    = "alphabetic";
        hexText.alpha = 0;
        
        var osText  = new createjs.Text("OS", "25px Orbitron", "#FFF"); 
        osText.x = (stageCenterX + 35);
        osText.y = (stageCenterY - 140); 
        osText.textBaseline = "alphabetic";
        osText.alpha = 0;

        

        // fade in the hexagon symbol
        createjs.Tween.get(hexagon).to({alpha:1}, 3000).call(function(){
            // once complete, fade in the text
            createjs.Tween.get(hexText).to({alpha:1},1500);
            createjs.Tween.get(osText).to({alpha:1},1500);
            // load textfile binary data 
            var binaryDataText;
            $.get('res/randomBytecode.txt', function(data){
                binaryDataText = new createjs.Text(data, "7px Orbitron", "#FFF");
                binaryDataText.x = 10;
                binaryDataText.y = stageCenterY+150;
                binaryDataText.textBaseline = "alphabetic";
                binaryDataText.alpha = 0.5;
                binaryDataText.lineWidth = null;
                binaryDataText.maxWidth = stage.canvas.width - 100;
                stage.addChild(binaryDataText);
            });
            // wait a bit, then start rotating the hexagon
            createjs.Tween.get(hexagon).wait(1500).to({rotation: 720},4500);

        });

        stage.addChild(hexagon);
        stage.addChild(hexText);
        stage.addChild(osText);            
        createjs.Ticker.addEventListener("tick", stage);
    }