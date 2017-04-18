function randVal (min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randColor(){
// generates random color string
    vec="0123456789abcdef";
    color="#";
    for(i=0;i<6;i++){
       color+=vec[randVal(0,vec.length-1)];
    }
    return color;
}

function start(){
   alert("Click/Drag finger on Canvas to generate random explosion");
  
  chkBasic=document.getElementById("chkBasic"); selectAngle=document.getElementById("selectAngle");
  selectBomb=document.getElementById("selectBomb");
   chkBasic.onclick=function(){
      selectBomb.style.display=((!chkBasic.checked)? "inline-block":"none"); selectAngle.style.display=((chkBasic.checked)? "inline-block":"none");
   }
    canvas=document.getElementById("myCanvas");
    ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth*0.95;
    canvas.height=window.innerHeight*0.85;
    // create Explosion instance (the code for this can be found here: https://cdn.rawgit.com/bureyburey/Explosion/master/explosion.js)
    var timers=[];
    exp=new Explosion(ctx);
    // the explosion.js is a modified version for a code i found online, please refer to the HTML page for link
    
    var touchActive=false;
    
   function addExplosion(x,y){
      // create explosion at random position on the canvas and a random color
      // create explosion is a method inside every Explosion instance
      // createExplosion(x,y,color)
      
      
      basic=chkBasic.checked;
      deltaAngle=parseInt(selectAngle.value);
      //document.write(deltaAngle);
      if(document.getElementById("chkRand").checked){
          if(basic){
            exp.createBasicExplosion(x,y,randColor(),deltaAngle);
        }else
            exp.createExplosion(x,y,randColor());
      }else{
          if(basic){
                exp.createBasicExplosion(x,y,"#525252",deltaAngle);
                exp.createBasicExplosion(x,y,"#FFA318",deltaAngle);
                exp.createBasicExplosion(x,y,"red",deltaAngle);
          }else{
          timers.push({
             time:500,
             size:40,
             bomb:selectBomb.value,
             x:x,
             y,y
          }); /*exp.createExplosion(x,y,"#525252");
                exp.createExplosion(x,y,"#FFA318");
                exp.createExplosion(x,y,"red");*/
          }

      }
       
   }
   
   function drawBombs(){
      for(i=0;i<timers.length;i++){
          
          ctx.font=timers[i].size+"px Times New Roman";
         if(timers[i].bomb==="Holy"){
             ctx.drawImage(hhgObj, timers[i].x-timers[i].size/2,timers[i].y-timers[i].size/2, timers[i].size, timers[i].size);
            ctx.font="15px Times New Roman"; ctx.fillText("HALLELUJAH!",canvas.width/2-60,55);
         }
         else{
         ctx.fillText(timers[i].bomb,timers[i].x-timers[i].size/2,timers[i].y);
          }
          timers[i].time-=10;
       if(timers[i].time%50===0){
   timers[i].size=((timers[i].size===40)? 35:40);
         }
          if(timers[i].time<=0){
              x=timers[i].x;
              y=timers[i].y;
              exp.createExplosion(x,y,"#525252");
                exp.createExplosion(x,y,"#FFA318");
                exp.createExplosion(x,y,"red");
                timers.splice(i,1);
          }
      }
   }
  
  var handlerStart=function(evt){
     touchActive=true;
     handlerMove(evt);
  }
  var handlerEnd=function(evt){
     touchActive=false; 
  }
  
  var handlerMove=function (evt) {
  // adds explosion when dragging finger on he screen on the location that is touched
        if(!touchActive){
            return;
        }
        evt.preventDefault();
        var pos=canvas.getBoundingClientRect();
        if(evt.touches){
            var touch=evt.touches[0];
        }
        // find the (x, y) coordinate of the touch
        var xTouch = (evt.clientX-pos.left) || (touch.clientX-pos.left);
        var yTouch = (evt.clientY-pos.top) || (touch.clientY-pos.top);
        
        addExplosion(xTouch,yTouch);
    }
  
  // attach event listener for canvas click (touch/mouse click)
  canvas.onclick=function(){
      addExplosion(randVal(0,canvas.width),randVal(0,canvas.height));
    
  }
  // attach event listeners for touch click and touch drag (continous explosion generation)
   canvas.addEventListener("touchstart",handlerStart,false);
   canvas.addEventListener("touchend",handlerEnd,false); canvas.addEventListener("touchmove",handlerMove,false);

    function draw(){
       // clear the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // update the explosions, 33 is the frame speed (lower=slower;higher=faster)
        drawBombs();
        exp.update(33);
        
        ctx.font="10px Times New Roman";
        ctx.fillStyle="white";
        ctx.fillText("# Particles: "+exp.particles.length, 10, 10);
        ctx.fillText("THANK YOU FOR 100+ 👍👍👍!!!",canvas.width/2-80,40);
    }
    setInterval(draw,33);
    
}

// Holy hand grenade image data in base64 format
var hhgData="data:image/png;base64,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";

var hhgObj=new Image();
hhgObj.src=hhgData;
window.onload=start;
