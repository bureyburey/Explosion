# Explosion

Explosion original code can be found here (site currently under maintnance, so must enter via web archive snapshot):<br />    <a href="https://web.archive.org/web/20160423093009/http://www.gameplaypassion.com/blog/explosion-effect-html5-canvas/">Original Code</a><br />
All credit goes to the original author: 
Zouhair Serrar
 <br />
 Usage:
 <br />
 <pre>
 canvas = document.getElementById("myCanvas"); // get the canvas from html &lt;canvas id="myCanvas"&gt;&lt;/canvas&gt;
 ctx = canvas.getContext("2d"); // your 2D context variable
 exp = new Explosion(ctx); // pass the context variable to the Explosion constructor
 exp.createExplosion(100,100,"blue"); // generate blue explosion at coordinates (100,100)
 // createExplosion(x,y,color)
 // drawing loop
 function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height); // clear the canvas
     exp.update(33); // draws exising explosions on the canvas
     // the parameter passed to update is the update speed (lower = slower; higher = faster)
 }
 drawInterval = setInterval(draw, 33); // create a drawing loop that is called every 33 milliseconds
 </pre>
