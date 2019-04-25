var circle = 200;
  var rot;
  var col;
  var freq = 0.000005; 
  var cont = 0;
  var r;
  
function faster() {
    freq *= 2;
  }
  
  function slower() {
    freq /= 2;
  }
  
var s1 = function( sketch ) {
  
  sketch.setup = function() {
    sketch.createCanvas(700,800);
  };
  
  sketch.draw = function() {
    sketch.background(32);
    sketch.translate(300, 300);
    sketch.rotate(sketch.radians(rot));
  
   sketch.ellipseMode(sketch.RADIUS);
    for (var i=0; i<500; i ++) {
      circle= 200 + 50*sketch.sin(sketch.millis()*freq*i);
      col=sketch.map(circle,150,250,255,60);
      r=sketch.map(circle,150,250,5,2);
      sketch.fill(col,0,74);
      sketch.noStroke();
      sketch.ellipse(circle*sketch.cos(i), circle*sketch.sin(i),r,r);    
      rot=rot+0.00005;
    }
  };
};
var first_p5 = new p5(s1, document.getElementById('s1'));

//second one

var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////
var s2 = function( sketch ) {
sketch.setup = function() {
  sketch.createCanvas(700, 800);
  sketch.noStroke();
  sketch.fill(150,250,255,60);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

sketch.draw = function() {
  sketch.background(32);
  
  for (var particleA = 0; particleA < mass.length; particleA++) {
    var accelerationX = 0, accelerationY = 0;
    
    for (var particleB = 0; particleB < mass.length; particleB++) {
      if (particleA != particleB) {
        var distanceX = positionX[particleB] - positionX[particleA];
        var distanceY = positionY[particleB] - positionY[particleA];

        var distance = sketch.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 1) distance = 1;

        var force = (distance - 320) * mass[particleB] / distance;
        accelerationX += force * distanceX;
        accelerationY += force * distanceY;
      }
    }
    
    velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
    velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
  }
  
  for (var particle = 0; particle < mass.length; particle++) {
    positionX[particle] += velocityX[particle];
    positionY[particle] += velocityY[particle];
    
    sketch.ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

sketch.addNewParticle = function() {
  mass.push(sketch.random(0.003, 0.03));
  positionX.push(sketch.mouseX);
  positionY.push(sketch.mouseY);
  velocityX.push(0);
  velocityY.push(0);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

sketch.mouseClicked = function() {
  sketch.addNewParticle();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

sketch.mouseDragged = function() {
  sketch.addNewParticle();
};
};
var second_p5 = new p5(s2, document.getElementById('s2'));

/*
var s3 = function( sketch ) {
  var imgs = [];
  var imgIndex = -1;
  var img;
  var paint;
  var subStep = 800;
  var z = 0;
  var isStop = false;
  var count = 0;
  
  sketch.preload = function() {
  imgs[0] = sketch.loadImage("obama.png");
  imgs[1] = sketch.loadImage("head.jpg");
  //imgs[2] = loadImage("test3.png");
  };
  
  sketch.setup = function() {
    sketch.createCanvas(600, 600);
    img = sketch.createImage(600, 600);
    sketch.nextImage();
    paint = new Paint(createVector(600/2, 600/2));
    sketch.background(255, 255, 255);
    sketch.colorMode(sketch.RGB, 255, 255, 255, 255);
  };
  

}
var third_p5 = new p5(s3, document.getElementById('s3'));
*/

  
