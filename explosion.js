////// EXPLOSION METHODS START
function Explosion(ctx){
this.ctx=ctx;
this.particles=[];
function randVal(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
 function Particle(){
/*
 * A single explosion particle
 */
    this.scale = 1.0;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.color = "#000";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;

    this.update = function(ms)
    {
        // shrinking
        this.scale -= this.scaleSpeed * ms / 1000.0;

        if (this.scale <= 0)
        {
            this.scale = 0;
        }
        // moving away from explosion center
        this.x += this.velocityX * ms/1000.0;
        this.y += this.velocityY * ms/1000.0;
    };

    this.draw = function(context2D)
    {
        // translating the 2D context to the particle coordinates
        context2D.save();
        context2D.translate(this.x, this.y);
        context2D.scale(this.scale, this.scale);

        // drawing a filled circle in the particle's local space
        context2D.beginPath();
        context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
        context2D.closePath();

        context2D.fillStyle = this.color;
        context2D.fill();

        context2D.restore();
    };
}


this.createExplosion=function(x, y, color){
/*
 * Advanced Explosion effect
 * Each particle has a different size, move speed and scale speed.
 * 
 * Parameters:
 *     x, y - explosion center
 *     color - particles' color
 */
    var minSize = 10;
    var maxSize = 30;
    var count = 10;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minScaleSpeed = 1.0;
    var maxScaleSpeed = 4.0;

    for (var angle=0; angle<360; angle += Math.round(360/count))
    {
        var particle = new Particle();

        particle.x = x;
        particle.y = y;

        particle.radius = randVal(minSize, maxSize);

        particle.color = color;

        particle.scaleSpeed = randVal(minScaleSpeed, maxScaleSpeed);

        var speed = randVal(minSpeed, maxSpeed);

        particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

        this.particles.push(particle);
    }
}

this.update=function(frameDelay)
{
    // update and draw particles
    for(var i=0; i<this.particles.length;i++){
        var particle = this.particles[i];

       particle.update(frameDelay);
        particle.draw(this.ctx);
        if(this.particles.scale===0){
            this.particles.splice(i,1);
        }
    }
}

}
////// EXPLOSION METHODS END
