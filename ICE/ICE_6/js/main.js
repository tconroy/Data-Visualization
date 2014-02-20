// gvars
var canvas, context, fpsInput, pauseBtn, aboutBtn, mousePos,
	elapsedFrames = 0,
	userFPS       = 30,
	isPaused      = false;

$(document).ready(function(){
	canvas   = $('.view')[0];
	context  = canvas.getContext("2d"); // set the context
	fpsInput = $('input[name=user_fps]');
	pauseBtn = $('button[name=playBtn]');
	aboutBtn = $('a[id=aboutBtn]');

	aboutBtn.on('click', function(event){
		event.preventDefault();
		$('.about-inner').slideToggle();
	} );


	// event listeners
	fpsInput.on('change', updateFPS);
	pauseBtn.on('click', function(){
		isPaused = !isPaused;
		if(isPaused === true){
			pauseBtn.text('Play');
		}else {
			pauseBtn.text('Stop');
		}
		console.log(isPaused);
	});

	canvas.addEventListener('mousemove', function(evt){
		mousePos = getMousePos(canvas,evt);
		console.log(mousePos);
	});

	// init
	draw();
});

var draw = function() {
	// uset setTImeout to allow user-defined framerate.
	setTimeout(function(){
		requestAnimationFrame(draw);
		if (isPaused === false) {
			// drawing code
			
			updateFramerate();

			// we want to clear the canvas but first need to save the context to preserve canvas settings.
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.restore();

			// rows
			for(var i=1; i<23; i++) {
				// columns

				// generate a random number (height) for each column. 1 - 25
				var columnHeight = Math.floor((Math.random()*30)+1);

				// if mouse has same X value as this column, make same color 
				//if (mousePos.x  ) {
				//
				//}

				for (var j=1; j<columnHeight; j++) {
						var rand = '#'+Math.floor(Math.random()*16777215).toString(16);
						if( mousePos.x > 30*i && mousePos.x < 30*i+20 ){
							rand = "white";
						}

						context.globalAlpha = 1 - (j/(Math.random()*25));
						context.strokeStyle = rand;
						context.fillStyle = rand;
						context.lineWidth = 1;
						context.roundRect( 30*i, (460-(15*j)), 20, 10, 3).fill();
				}
			}
		}
	}, 1000 / userFPS);
};

// updates elapsed framerate
var updateFramerate = function() {
	elapsedFrames++;
	$("#elapsed_fps").text("Elapesd Frames: " + elapsedFrames );
};

// updates the active FPS
var updateFPS = function() {
	newVal = $(fpsInput).val();
	if( newVal > 60 ){
		newVal = 60;
	} else if( newVal < 1 ) {
		newVal = 1;
	}
	$(fpsInput).val(newVal);
	userFPS = newVal;
};



// function for creating rounded rectangles
// borrowed from: http://goo.gl/xR62V1
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
};

var getMousePos = function(canvas, evt) {

	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};

};

