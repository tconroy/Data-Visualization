function ooRect(x, y, w, h, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    
}
ooRect.prototype.update = function(ctx) {
    this.x += this.dx;
    this.y += this.dy;

    if( this.x > canvas.width || this.x < 0 ){
        this.x = canvas.width;
        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    } 
    else if( this.y > canvas.width || this.y < 0 ){
        this.y = canvas.height;
        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    }

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

var ctx = canvas.getContext('2d'),
    objects = [
        new ooRect(10, 20, 50, 70, 'blue', 2, 3),
        new ooRect(200, 300, 50, 70, 'red', -3, 2),
        new ooRect(200, 400, 50, 60, 'green', -3, 2)
    ];

// immediately-invoked enclosed function
(function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for(var i = 0, o; o = objects[i++];)
        o.update(ctx);
    requestAnimationFrame(loop);
})();
